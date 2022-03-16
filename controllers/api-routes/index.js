const express = require("express");
const router = express.Router();
const userRoutes = require("./user-model-routes");
const postRoutes = require("./post-model-routes");
const commentRoutes = require("./comment-model-routes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
