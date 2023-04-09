const bcrypt = require("bcrypt");
const Product = require("../models/product");
const { validationResult } = require("express-validator");

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exist = await Product.findOne({ where: { name: req.body.name } });
    if (exist) {
      return res.status(409).json({
        error: "Product with this name aleardy exist",
      });
    }
    const url = req.protocol + "://" + req.get("host");

    const product = await Product.create({
      ...req.body,
      addedBy: req.userData.userId,
      image: req.file ? url + "/images/" + req.file.filename : null,
    });

    return res.status(200).json({
      message: "Product created...",
      product: product,
    });
  } catch (err) {
    console.log("error from create Product", err);
    return res.status(500).json({
      error: "Invalid authentication credentials!",
    });
  }
};


exports.getProducts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  console.log(req.query);
  let query = Product.findAll({});
  let fetchedProducts;
  if (pageSize && currentPage) {
    query = User.findAll({ offset: pageSize * (currentPage - 1), limit: pageSize });
  }
  query
    .then(async (products) => {
      fetchedProducts = products;
      return Product.count();
    })
    .then((count) => {
      return res.status(200).json({
        message: "Products fetched successfully!",
        maxProducts: count,
        products: fetchedProducts,
      });
    })
    .catch((error) => {
      console.log("error from fetch products", error);
      return res.status(500).json({
        message: "Fetching products failed!",
      });
    });
};

exports.getProduct = (req, res, next) => {
  Product.findOne({ where: { id: req.params.id } })
    .then(async (product) => {
      if (product) {
        return res.status(200).json({
          message: "product fetched",
          product: product
        });
      } else {
        res.status(404).json({ error: "product not found!" });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Fetching product failed!",
      });
    });
};

