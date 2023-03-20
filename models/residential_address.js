const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const ResidentialAddress = sequelize.define("residentialAddress", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  street: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
  },
  landMark: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  groupType: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  contactPerson: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  personsNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
  }

});

module.exports = ResidentialAddress;













