const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const routes = express.Router()
require('./auth/passport')

const auth = require('./middlewares/auth')
const CategoryController = require('./controllers/CategoryController')
const DashboardController = require('./controllers/DashboardController')
const JobController = require('./controllers/JobController')
const LoginController = require('./controllers/LoginController')
const ProfileController = require('./controllers/ProfileController')

routes.use(cookieSession({
    name: 'github-auth-session',
    keys: ['key1', 'key2']
}))

routes.use(passport.initialize())
routes.use(passport.session())

routes.get('/auth/error', (req, res) => res.send('Unknown Error'))
routes.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }))
routes.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/error' }), (req, res) => {
    res.redirect('/dashboard')
})

routes.get('/', LoginController.index)
routes.get('/logout', LoginController.logout)

routes.use(auth.isAuthenticated)

routes.get('/dashboard', DashboardController.index)

routes.get('/category', CategoryController.create)
routes.post('/category', CategoryController.save)
routes.get('/category/:id', CategoryController.edit)
routes.post('/category/:id', CategoryController.update)
routes.post('/category/delete/:id', CategoryController.delete)

routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.edit)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes
