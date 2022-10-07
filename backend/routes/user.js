const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  //store in database encrypted password for security reasons
  bcrypt.hash(req.params.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save()
        .then(result => {
          res.status(201).json({
            status: 201,
            message: "User created",
            user: result,
          });
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
  });
});

module.exports = router;
