const express = require("express");
const { body } = require("express-validator");
const check_auth = require("../middleware/check-auth");
const productController = require("../controllers/product");
const router = express.Router();

router.post(
  "/create",
  body("name", "name cannot be Empty").not().isEmpty(),
  body("price", "price must be number").isNumeric(),
  body("quantity", "quantity must be Integer").isInt(),
  body("litrs", "litrsd must be Integer").isInt(),
  body("discount", "discount must be Integer").optional().isInt(),
  check_auth.checkAuth,
  productController.createProduct
);

router.get("/products/", productController.getProducts);

router.get("/:id", productController.getProduct);

module.exports = router;
