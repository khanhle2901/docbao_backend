const User = require('../model/userModel')
const CryptoJS = require('crypto-js')

const checkAdmin = async (req, res, next) => {
  // console.log(req.headers)
  // return
  try {
    const { userKey } = req.headers
    if (!userKey) {
      return res.json({
        code: 300,
        message: 'missing params',
      })
    }
    const { id, email, role } = JSON.parse(
      CryptoJS.AES.decrypt(userKey, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8)
    )
    if (role != 0) {
      return res.json({
        code: 301,
        message: 'invalid user',
      })
    }
    next()
  } catch (error) {
    return res.json({
      code: 400,
      message: 'error',
    })
  }
}

const authMiddleware = async (req, res, next) => {
  try {
    const { userKey } = req.headers
    if (!userKey) {
      return res.json({
        code: 300,
        message: 'missing param',
      })
    }
    next()
  } catch (error) {
    return res.json({
      code: 500,
      messgae: 'error',
    })
  }
}
const writerMiddleWare = (req, res, next) => {
  try {
    const { userKey } = req.headers
    const { role } = CryptoJS.AES.decrypt(userKey, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8)
    if (role != 1) {
      return req.json({
        code: 404,
        message: 'permision denied',
      })
    }
    next()
  } catch (error) {
    return res.json({
      code: 405,
      message: 'error',
    })
  }
}

module.exports = { checkAdmin, authMiddleware, writerMiddleWare }
