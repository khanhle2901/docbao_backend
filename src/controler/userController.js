const { body, validationResult } = require('express-validator')
const CryptoJS = require('crypto-js')

const User = require('../model/userModel')

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const isExistUser = await User.isExist(email)
    if (isExistUser === 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    const [{ count }] = isExistUser
    if (count > 0) {
      return res.json({
        code: 305,
        message: 'existed user',
      })
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const response = await User.getLogin(email)
    if (response === 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    if (response === undefined) {
      return res.json({
        code: 401,
        message: 'wrong email',
      })
    }
    const pass = CryptoJS.AES.decrypt(response.password, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8)
    if (pass == password) {
      if (response.status == 1) {
        return res.json({
          code: 204,
          message: 'account banned',
        })
      }
      const tokenStr = CryptoJS.AES.encrypt(
        JSON.stringify({
          id: response.id,
          email: response.email,
          role: response.role,
        }),
        process.env.PRIVATE_KEY
      ).toString()
      const data = {
        token: tokenStr,
        name: response.name,
        avartar_cdn: response.avartar_cdn,
      }
      if (response.role != 3) {
        data.role = response.role
      }
      return res.json({
        code: 201,
        message: 'success',
        data,
      })
    }
    return res.json({
      code: 302,
      message: 'wrong password',
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, avartar_cdn, userKey } = req.body
    const { id, email, role } = JSON.parse(
      CryptoJS.AES.decrypt(userKey, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8)
    )
    if (!id || !email || !role) {
      return res.json({
        code: 300,
        message: 'missing param',
      })
    }
    const response = await User.update({ id, name, avartar_cdn })
    if (response === 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    console.log(response)
    return res.json(response)
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

module.exports = { addUser, login, updateUser }
