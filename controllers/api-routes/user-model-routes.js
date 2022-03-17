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

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    const validPassword = dbUserData.passwordCheck(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    } else {
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are now logged in!" });
        console.log(req.session);
      });
      
    }
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // alert('success')
      console.log("success");
      res.status(204).end();
    });
  } else {
    res.status(404).end();
    // alert('no')
  }
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
