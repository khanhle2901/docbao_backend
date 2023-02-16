const express = require('express')

const { getListCategory, addCategory, deleteCategory, updateCategory } = require('../controler/categoryController')
const { checkAdmin } = require('../middleware/userMiddleware')

let router = express.Router()

const categoryRoutes = (app) => {
  router.get('/', getListCategory)
  router.post('/', checkAdmin, addCategory)
  router.delete('/', checkAdmin, deleteCategory)
  router.patch('/', checkAdmin, updateCategory)
  return app.use('/api/category', router)
}

module.exports = categoryRoutes
