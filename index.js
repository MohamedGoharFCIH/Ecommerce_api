const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, MONGODB_LOCAL_PORT } = process.env;

// mongoose
//   .connect(
//     `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${MONGODB_LOCAL_PORT}/${DB_NAME}?authSource=admin`,
//     { useNewUrlParser: true }
//   )
//   .then(() => {
//     console.log("connect to DB ");
//   })
//   .catch(() => {
//     console.log("Connection Failed");
//   });


mongoose
  .connect("mongodb://mongodb:27017/ecommerce", { useNewUrlParser: true })
  .then(() => {
    console.log("connect to DB ");
  })
  .catch(() => {
    console.log("Connection Failed..");
  });

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello Server running on localhost: 3000");
});

app.get("*", (req, res) => {
  res.send("Error 404 ...! Page Not Found");
});

app.listen(3000, () => {
  console.log("Server is running at port " + 3000);
});
