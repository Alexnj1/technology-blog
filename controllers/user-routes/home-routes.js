const express = require("express");
const router = express.Router();
const sequelize = require("../../models/db/database-connection");
const { Post, User, Comment } = require("../../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "title",
      "content",
      "createdAt",
      "updatedAt",
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
    order: [["updatedAt", "DESC"]],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      // console.log(posts);
      res.render("home", { posts, loggedIn:req.session.loggedIn, username: req.session.username });
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
  // res.render('home')
});

router.get('/login', (req,res) => {
    res.render('login')
})

router.get("/post/:id", (req, res) => {
  Post.findOne({
    attributes: ["user_id", "title", "content", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["text", "createdAt", "updatedAt"],
        separate: true,
        order: [["createdAt", "DESC"]],
        include: {
            model:User,
            attributes: ["username"],
            
        }
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      const post = postData.get({ plain: true });
      function ownPost (data) {
        if (data.user_id == req.session.user_id) {
          return true
        } else {
          return false
        }
      }
    //   console.log(post.Comments)
      res.render("single-post", {post, isOwnPost:ownPost(post), loggedIn: req.session.loggedIn, username:req.session.username});
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
    });
});

module.exports = router;
