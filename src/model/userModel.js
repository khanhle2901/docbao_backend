const pool = require('../configs/connectDB')

const table = 'users'

const User = {
  // get role
  async getRole(id) {
    try {
      const qb = await pool.get_connection()
      const [{ role }] = await qb.select('role').where('id', id).limit(1).get(table)
      console.log(role)
      return role
    } catch (error) {
      return 'fail'
    }
  },
}

module.exports = User
