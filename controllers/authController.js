const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", ({ body }, res) => {
  // hash password

  bcrypt.hash(body.password, 10).then((hashPassword) => {
    // create database user object
    const newUser = {
      email: body.email,
      name: body.name,
      address: body.address,
      password: hashPassword,
    };

    // create user in database
    User.create(newUser)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          const token = jwt.sign(
            { _id: result._id },
            process.env.JWT_SIGNATURE
          );

          if (result) {
            res.json({
              // send login token and userId
              // jwt token has id in it to send back
              token: token,
              _id: user._id,
              role: user.role,
            });
          } else {
            res.status(401).end();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/email", (req, res) => {
  User.findById(req.query.id, "email name")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      //console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
