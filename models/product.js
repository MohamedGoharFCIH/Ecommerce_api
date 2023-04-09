const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    notEmpty: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
  },
  discount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  litrs: {
    type: Sequelize.FLOAT,
    allowNull: false,
    notEmpty: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  currency: {
    type: Sequelize.STRING,
    defaultValue: "AED",
  },
});

module.exports = Product;
