const express = require('express')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
const CategoryController = require('./controllers/CategoryController')

routes.get('/', DashboardController.index)

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
