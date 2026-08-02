const pool = require("../config/database");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve product"
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      price,
      quantity_stock = 0,
      sku
    } = req.body;

    // Check required fields
    if (!category_id || !name || price === undefined || !sku) {
      return res.status(400).json({
        success: false,
        message: "category_id, name, price and sku are required"
      });
    }

    // Validate price and stock
    if (Number(price) <= 0 || Number(quantity_stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be positive and stock cannot be negative"
      });
    }

    const result = await pool.query(
      `INSERT INTO products
       (category_id, name, description, price, quantity_stock, sku)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        category_id,
        name,
        description || null,
        price,
        quantity_stock,
        sku
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    // PostgreSQL UNIQUE violation
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "SKU already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create product"
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    const {
      category_id,
      name,
      description,
      price,
      quantity_stock,
      sku,
      is_active
    } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET category_id = $1,
           name = $2,
           description = $3,
           price = $4,
           quantity_stock = $5,
           sku = $6,
           is_active = $7,
           updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [
        category_id,
        name,
        description,
        price,
        quantity_stock,
        sku,
        is_active,
        productId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update product"
    });
  }
};
const deactivateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    const result = await pool.query(
      `UPDATE products
       SET is_active = false,
           updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deactivated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate product"
    });
  }
};
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct
};