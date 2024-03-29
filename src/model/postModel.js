const pool = require('../configs/connectDB')
// const { search } = require('../controler/postController')

const table = 'posts'
const Post = {
  // qb: await pool.get_connection(),
  async list(page, amount) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.select('title').get(table)
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
      let sql = `SELECT ${table}.* ,  categories.name AS category_name, users.name AS author_name FROM ${table} INNER JOIN categories ON ${table}.id_category = categories.id INNER JOIN users ON ${table}.id_author = users.id WHERE ${table}.id=${id} AND ${table}.deleted = 0 AND ${table}.id_censor IS NOT NULL`
      qb = await pool.get_connection()
      const response = await qb.query(sql)
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
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
      const response = await qb.query(
        `SELECT id,title,avartar_cdn, created_at FROM ${table} WHERE id_censor IS NOT null and deleted = 0 ORDER BY censored_at DESC LIMIT ${num}`
      )

      return response
    } catch (error) {
      console.log(error)
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async add(data) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.insert(table, { ...data, created_at: Date.now(), viewed: 0 })
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async postOfCategory(id) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb
        .select(
          // 'id,title,sort_description, avartar_cdn, id_author, viewed, created_at '
          [
            table + '.id',
            table + '.title',
            table + '.sort_description',
            table + '.avartar_cdn',
            table + '.id_author',
            table + '.viewed',
            table + '.created_at',
            'users.name as name_author',
          ]
        )
        .from(table)
        .where('id_category', id)
        .join('users', 'users.id=posts.id_author', 'inner')
        .order_by('id', 'DESC')
        .get()
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async getNumLike(type, id) {
    let qb
    try {
      qb = await pool.get_connection()
      let response = null
      if (type === 'post') {
        response = await qb.where('id_post', id).count('*')
      } else if (type === 'comment') {
        response = await qb.where('id_comment', id).count('*')
      }
      console.log(response)
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async isLikeByUser(type, id, idUser) {
    let qb
    try {
      qb = await pool.get_connection()
      let response = null
      if (type === 'post') {
        response = await qb.where('id_post', id).count('*')
      } else if (type === 'comment') {
        response = await qb.where('id_comment', id).count('*')
      }
      console.log(response)
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
}

module.exports = Post
