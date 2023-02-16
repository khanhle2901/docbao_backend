const User = require('../model/userModel')
const { body, validationResult } = require('express-validator')

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    body('email').isEmail()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 120,
        error: errors.array(),
      })
    }
    if (!name.trim() || !email.trim() || !password.trim()) {
      return res.json({
        code: 302,
        message: 'missing param',
      })
    }
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!email.match(validRegex)) {
      return res.json({
        code: 302,
        message: 'invalid email',
      })
    }
    if (name.length > 30) {
      return
    }

    const response = await User.add({ name, email, password })
    if (response == 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    return res.json({
      code: 201,
      message: 'success',
      id: response.insertId,
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

module.exports = { addUser }
