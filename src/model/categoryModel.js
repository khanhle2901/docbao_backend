const pool = require('../configs/connectDB')

const table = 'categories'
const Category = {
  async list() {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.select(['id', 'name', 'status', 'id_parent_category']).get(table)

      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
    // finally {
    //
    // }
  },
  async add(name, idParent = null) {
    let qb
    try {
      qb = await pool.get_connection()
      let response

      response = await qb.insert(table, {
        name,
        id_parent_category: idParent,
        status: 0,
        created_at: Date.now(),
      })

      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async delete(id) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.delete(table, { id })
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
  async undate({ id, name, status, idParentCategory }) {
    let qb
    try {
      qb = await pool.get_connection()
      const response = await qb.update(
        table,
        {
          name,
          status,
          id_parent_category: idParentCategory,
          updated_at: Date.now(),
        },
        { id }
      )
      return response
    } catch (error) {
      return 'fail'
    } finally {
      qb.release()
    }
  },
}

module.exports = Category
