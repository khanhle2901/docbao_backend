const express = require('express')

const { addUser } = require('../controler/userController')
const { userValidator } = require('../middleware/validator')

let router = express.Router()

const userRoutes = (app) => {
  router.post('/', userValidator.signUp, addUser)

  return app.use('/api/user', router)
}

module.exports = userRoutes
