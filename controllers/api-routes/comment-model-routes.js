const { Post, User, Comment } = require("../../models");
const express = require("express");
const isLoggedIn = require("../../utils/is-logged-in");
const router = express.Router();

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "text", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Post,
        attributes: ["title"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
    order: [["createdAt", "DESC"]]
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
  Comment.findOne({
    attributes: ["id", "text"],
    include: {
      model: Post,
      attributes: ["title"],
      include: {
        model: User,
        attributes: ["username"],
      },
    },
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

router.post("/", isLoggedIn, (req, res) => {
  Comment.create({
    text: req.body.text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
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
  Comment.update(
    {
      text: req.body.text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      res.status(200).json({ Status: "Success!" });
    })
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({ Status: "Success!" });
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
});

module.exports = router;
