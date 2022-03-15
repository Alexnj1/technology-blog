const express = require("express");
const router = express.Router();
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes")

router.use("/home", homeRoutes);
router.use("/dashboard", dashboardRoutes)

module.exports = router;