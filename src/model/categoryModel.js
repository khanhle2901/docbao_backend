const pool = require('../configs/connectDB')

const table = 'categories'
const Category = {
  async list(page, amount) {
    try {
      const qb = await pool.get_connection()
      const response = await qb.select('title').get(table)
      console.log(response)
      return 'hello'
    } catch (error) {
      return error
    } finally {
    }
  },
  async add(name, idParent = null) {
    console.log(
      new Date().toLocaleString('en-GB', {
        timeZone: 'Asia/ho_chi_minh',
      })
    )
    // return
    try {
      const qb = await pool.get_connection()
      let response

      response = await qb.insert(table, {
        name,
        id_parent_category: idParent,
        status: 0,
      })

      return response
    } catch (error) {
      return 'fail'
    }
  },
}

module.exports = Category
