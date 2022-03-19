module.exports = {
    isLoggedIn: (req) => {
        if (req.session.loggedIn) {
            return true
        } else {
            return false
        }
    }
}