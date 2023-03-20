const pool = require('../configs/connectDB')

const table = 'likes_post'

const LikePostModel = {
  async getNum(id) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.where('id_post', id).count(table)
      console.log(response)
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
}

module.exports = LikePostModel
