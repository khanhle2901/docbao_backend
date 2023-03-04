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
  async isExist(email) {
    try {
      const qb = await pool.get_connection()
      const response = await qb.query(`SELECT COUNT(*) as count FROM users WHERE email LIKE '${email}'`)
      return response
    } catch (error) {
      return 'fail'
    }
  },
  async getLogin(email) {
    try {
      const qb = await pool.get_connection()
      const [response] = await qb
        .select('id, email, password, role, name, avartar_cdn, status')
        .where({ email })
        .get(table)
      return response
    } catch (error) {
      return 'fail'
    }
  },
  async update({ id, name, avartar_cdn }) {
    try {
      const qb = await pool.get_connection()
      const response = await qb.update(
        table,
        {
          name,
          avartar_cdn,
          updated_at: Date.now(),
        },
        {
          id,
          'status !=': 1,
        }
      )

      return response
    } catch (error) {
      return 'fail'
    }
  },
}

module.exports = User
