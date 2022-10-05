const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")

const app = express();

mongoose
  .connect(
    "mongodb+srv://timon9551:xu1kOTxtZ62pdg8q@cluster0.yvcgnyc.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("mongodb connection established");
  })
  .catch((err) => {
    console.log("Connection error: " + err.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("/backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);


module.exports = app;
