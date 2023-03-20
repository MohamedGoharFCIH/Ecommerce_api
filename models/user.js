const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  callNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
  whatsappNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
  emiratesID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
  birthdate: {
    type: Sequelize.STRING,
  },
  emiratesCity:{
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  area:{
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  isAdmin:{
    type: Sequelize.BOOLEAN,
    defaultValue:false
  }

});

module.exports = User;
