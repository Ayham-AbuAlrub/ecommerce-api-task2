const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct,
} = require("../controllers/productsController");

const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const {
  createProductSchema,
} = require("../validators/productValidator");

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  updateProduct
);

router.patch(
  "/:id/deactivate",
  authenticate,
  authorize("admin"),
  deactivateProduct
);

module.exports = router;