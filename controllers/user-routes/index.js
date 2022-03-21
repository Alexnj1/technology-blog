const express = require("express");
const router = express.Router();
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes")

router.get('/', (req,res) => {
    res.redirect('/home')
})
router.get('/test', (req,res) => {
    res.render('test')
})
router.use("/home", homeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;