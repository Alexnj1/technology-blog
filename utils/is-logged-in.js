function isLoggedIn(req, res, next) {
  if (!req.session.user_id) {
    res.redirect("/home/login")
  } else {
    next();
  }
}

module.exports = isLoggedIn
