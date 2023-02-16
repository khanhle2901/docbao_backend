const express = require('express')

const { addCategory } = require('../controler/categoryController')
const { checkAdmin } = require('../middleware/userMiddleware')

let router = express.Router()

const categoryRoutes = (app) => {
  router.post('/', checkAdmin, addCategory)
  return app.use('/api/category', router)
}

module.exports = categoryRoutes
