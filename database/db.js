require('dotenv').config()
const Sequelize = require("sequelize");

console.log("connect to db", process.env.DB_NAME)
const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT,
      logging: true
    }
  );


module.exports = sequelize;