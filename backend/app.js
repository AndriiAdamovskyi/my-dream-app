const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose.connect(
  "mongodb+srv://timon9551:xu1kOTxtZ62pdg8q@cluster0.yvcgnyc.mongodb.net/node-angular"
).then(() => {
  console.log("mongodb connection established");
}).catch(err => {
  console.log('Connection error: ' + err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "adfsas124ds",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "kjui34o98",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts,
  });
});

module.exports = app;
