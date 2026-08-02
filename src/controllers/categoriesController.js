const pool = require("../config/database");

const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories"
    });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    const result = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [categoryId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
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
      message: "Failed to retrieve category"
    });
  }
};
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const result = await pool.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name, description || null]
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Category already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create category"
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, description, is_active } = req.body;

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const result = await pool.query(
      `UPDATE categories
       SET name = $1,
           description = $2,
           is_active = $3
       WHERE id = $4
       RETURNING *`,
      [name, description || null, is_active, categoryId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update category"
    });
  }
};
module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory
};