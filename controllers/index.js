const express = require("express");
const router = express.Router();
const apiRoutes = require("./api-routes");
const userRoutes = require("./user-routes");

router.use("/api", apiRoutes);
router.use("/", userRoutes);

module.exports = router;
