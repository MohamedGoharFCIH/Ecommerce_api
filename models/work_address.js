const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const WorkAddress = sequelize.define("workAddress", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  workPlaceName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  workPlaceNameNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
  },
  contactPerson: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  staffNumbers: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
  }
});

module.exports = WorkAddress;

