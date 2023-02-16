const express = require('express')

const { getPosts } = require('../controler/postController')

let router = express.Router()

const postRoutes = (app) => {
  router.get('/list/:page?/:type?', getPosts)
  return app.use('/api/post', router)
}

module.exports = postRoutes
