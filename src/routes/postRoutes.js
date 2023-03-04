const express = require('express')

const { getPosts, getPost } = require('../controler/postController')

let router = express.Router()

const postRoutes = (app) => {
  router.get('/list/:page?/:type?', getPosts)
  router.get('/:id-:slug', getPost)
  return app.use('/api/post', router)
}

module.exports = postRoutes
