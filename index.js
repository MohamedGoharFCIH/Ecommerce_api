require('dotenv').config()
const sequelize = require("./database/db");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product")
const User = require("./models/user");
const WorkAddress = require("./models/work_address");
const ResidentialAddress = require("./models/residential_address");
const Token = require("./models/token");
const Product = require("./models/product")

const file = require("./middleware/file");

const upload  = file.extractFile;


User.hasOne(WorkAddress, { foreignKey: "userId" });

WorkAddress.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


ResidentialAddress.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasOne(ResidentialAddress, {
  foreignKey: "userId",
});

Token.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Product.belongsTo(User, {
  foreignKey: "addedBy",
  as: "user",
});


const app = express();
app.use(upload);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.get("/", (req, res) => {
  res.send("hello Server running on localhost: 3000");
});

app.get("*", (req, res) => {
  res.send("Error 404 ...! Page Not Found");
});

sequelize
  .sync()
  .then(() => {
    // app.listen(3000, () => {
    //     console.log("server running on localhost:3000")
    // });

    console.log(
      "Connection has been established successfully and databases models created."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = app.listen(3000);
