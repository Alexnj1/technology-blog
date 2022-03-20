const { Post, User, Comment } = require("../../models");
const express = require("express");
const sequelize = require("../../models/db/database-connection");
const router = express.Router();

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "title",
      "content",
      "createdAt",
      [
        sequelize.literal(
          "(SELECT COUNT (*) FROM comment  WHERE comment.post_id = post.id)"
        ),
        "comment_count",
      ],
    ],
    include: {
      model: User,
      attributes: ["username"],
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

router.get("/:id", (req, res) => {
  Post.findOne({
    attributes: ["title", "content"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["text", "createdAt", "updatedAt"],
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
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
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
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
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
  Post.destroy({
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
