const { User, Post, Comment } = require("../../models");
const express = require("express");
const sequelize = require("../../models/db/database-connection");
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

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: ["username", "email"],
    include: [
      {
        model: Post,
        attributes: ["title", "content"],
      },
      {
        model: Comment,
        as: "Comments Posted",
        attributes: ["text"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400);
      console.log(err).json(err);
    });
});

router.put("/:id", (req, res) => {
  User.update(
    {
      username: req.body.username,
      email: req.body.email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});
module.exports = router;
