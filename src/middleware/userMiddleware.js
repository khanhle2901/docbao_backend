const User = require('../model/userModel')
const CryptoJS = require('crypto-js')

const checkAdmin = async (req, res, next) => {
  try {
    const { userKey } = req.body
    if (!userKey) {
      return res.json({
        code: 300,
        message: 'missing params',
      })
    }
    const { id, email } = JSON.parse(CryptoJS.AES.decrypt(userKey, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8))
    console.log(id)
    const role = await User.getRole(id)
    console.log(role)
    // return
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

module.exports = { checkAdmin }