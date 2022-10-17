const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  //store in database encrypted password for security reasons
  if (req.body.password !== undefined) {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user
          .save()
          .then(result => {
            res.status(201).json({
              status: 201,
              message: "User created",
              user: result,
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      });
  }
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: require.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "User not found",
        });
      }
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
          error: err
        });
      }
      const token = jwt.sign({
        email: user.email,
        userId: user._id
      }, 'secret_this_should_be_longer',
      // additional security measurements
        { expiresIn: "1h" } );
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed",
        error: err,
      });
    })
})

module.exports = router;
