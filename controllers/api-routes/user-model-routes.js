const User = require("../../models/User");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  User.findAll({
    attributes: ["username", "email"],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.post("/", (req,res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then((data) => {
    res.status(200).json(data)
  }).catch((err) => {
    res.status(400)
    console.log(err).json(err)
  })
})

module.exports = router
