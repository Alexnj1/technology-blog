const express = require("express");
const router = express.Router();
const userRoutes = require("./user-model-routes");
const postRoutes = require('./post-model-routes')

router.use("/user", userRoutes);
router.use("/post", postRoutes)

module.exports = router;
