const pool = require('../configs/connectDB')
const { search } = require('../controler/postController')

const table = 'posts'
const Post = {
  // qb: await pool.get_connection(),
  async list(page, amount) {
    console.log(page, amount)
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.select('title').get(table)
      console.log(response)
      return 'hello'
    } catch (error) {
      return error
    } finally {
      qb.release()
    }
  },
  async get(id) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.query(
        `SELECT ${table}.* ,  categories.name AS category_name FROM ${table} INNER JOIN categories ON ${table}.id_category = categories.id WHERE ${table}.id=${id} AND ${table}.deleted = 0 AND ${table}.id_censor IS NOT NULL`
      )
      console.log(response)

      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async updateViewed(id, view) {
    let qb
    try {
      qb = await pool.get_connection()
      await qb.update(table, { viewed: view }, { id })
    } catch (error) {
    } finally {
      qb.release()
    }
  },
  async search(searchArr) {
    let qb
    try {
      qb = await pool.get_connection()
      let sql = `SELECT id,title FROM ${table} WHERE `
      const searchLen = searchArr.length
      for (let i in searchArr) {
        if (i == searchLen - 1) {
          sql += `title LIKE '%${searchArr[i]}%'`
        } else {
          sql += `title LIKE '%${searchArr[i]}%' AND `
        }
      }
      const response = qb.query(sql)

      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async new(num) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.select('id,title,avartar_cdn, created_at').order_by('id').limit(num).get(table)

      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
}

module.exports = Post
