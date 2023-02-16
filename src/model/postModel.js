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
}

module.exports = Post
