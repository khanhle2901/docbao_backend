const pool = require('../configs/connectDB')
const CryptoJS = require('crypto-js')

const table = 'users'

const User = {
  // get role
  async add({ name, email, password }) {
    try {
      password = CryptoJS.AES.encrypt(password, process.env.PRIVATE_KEY).toString()
      const qb = await pool.get_connection()
      const response = await qb.insert(table, {
        name,
        email,
        password,
        role: 3,
        created_at: Date.now(),
      })
      return response
    } catch (error) {
      return 'fail'
    }
  },
}

module.exports = User
