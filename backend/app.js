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

app.use("/api/posts", postsRoutes);


module.exports = app;
