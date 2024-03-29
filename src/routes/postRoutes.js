const express = require('express')

const { getPosts, getPost, getSearch, getNew, add, getPostOfcategory } = require('../controler/postController')
const { authMiddleware, writerMiddleWare } = require('../middleware/userMiddleware')

let router = express.Router()

const postRoutes = (app) => {
  router.get('/list/:page?/:type?', getPosts)
  router.get('/new', getNew)
  router.get('/:id', getPost)
  router.get('/search/:searchData', getSearch)
  router.get('/of-category/:id', getPostOfcategory)
  router.post('/', add)
  return app.use('/api/post', router)
}

module.exports = postRoutes
