const pool = require('../configs/connectDB')
const CryptoJS = require('crypto-js')

const table = 'users'

const User = {
  // get role
  async add({ name, email, password }) {
    let qb
    try {
      password = CryptoJS.AES.encrypt(password, process.env.PRIVATE_KEY).toString()
      qb = await pool.get_connection()
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
    } finally {
      qb.release()
    }
  },
  async isExist(email) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.query(`SELECT COUNT(*) as count FROM users WHERE email LIKE '${email}'`)
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async getLogin(email) {
    let qb
    try {
      qb = await pool.get_connection()
      const [response] = await qb
        .select('id, email, password, role, name, avartar_cdn, status')
        .where({ email })
        .get(table)
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async update({ id, name, avartar_cdn }) {
    let qb
    try {
      qb = await pool.get_connection()
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
    } finally {
      qb.release()
    }
  },
}

module.exports = User
