const pool = require('../configs/connectDB')

const table = 'posts'
const Post = {
  async list(page, amount) {
    console.log(page, amount)
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
  async get(id) {
    try {
      const qb = await pool.get_connection()
      const response = await qb.query(
        `SELECT ${table}.* ,  categories.name AS category_name FROM ${table} INNER JOIN categories ON ${table}.id_category = categories.id WHERE ${table}.id=${id} AND ${table}.deleted = 0 AND ${table}.id_censor IS NOT NULL`
      )
      console.log(response)
      return response
    } catch (error) {
      return 'fail'
    }
  },
  async updateViewed(id, view) {
    try {
      const qb = await pool.get_connection()
      await qb.update(table, { viewed: view }, { id })
    } catch (error) {}
  },
}

module.exports = Post
