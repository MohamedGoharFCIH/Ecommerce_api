const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Token = sequelize.define("token", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  token: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  tokenExpires: {
    type: Sequelize.DATE,
    // defaultValue: Date.now() + 3600,
  },
});

module.exports = Token;
