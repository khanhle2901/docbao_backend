const { check, validationResult } = require('express-validator')

const userValidator = {
  signUp: [
    check('name').trim().not().isEmpty().bail().isLength({ min: 3, max: 30 }).bail(),
    check('email').trim().isEmail().isLength({ max: 50 }).not().isEmpty().bail(),
    check('password').trim().notEmpty().bail().isLength({ min: 6, max: 20 }).bail(),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.json({ code: 400, message: 'invalid data' })
      return res.json({
        code: 123,
      })
      next()
    },
  ],
}

module.exports = { userValidator }
