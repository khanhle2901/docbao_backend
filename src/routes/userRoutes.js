const express = require('express')

const { addUser, login, updateUser, userRegister } = require('../controler/userController')
const { userValidator } = require('../middleware/validator')
const { authMiddleware } = require('../middleware/userMiddleware')

let router = express.Router()

const userRoutes = (app) => {
  router.post('/', userValidator.signUp, addUser)
  router.patch('/', userValidator.update, authMiddleware, updateUser)
  router.post('/login', userValidator.login, login)
  router.get('/user-register/:token', userRegister)

  return app.use('/api/user', router)
}

module.exports = userRoutes
