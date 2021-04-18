module.exports = {
    index(req, res) {
        res.render('login')
    },

    logout(req, res) {
        req.session = null
        req.logout()
        res.redirect('/')
    }
}