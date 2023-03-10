const Category = require('../model/categoryModel')

const getListCategory = async (req, res) => {
  try {
    const response = await Category.list()
    if (response == 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    return res.json({
      code: 200,
      message: 'success',
      data: response,
    })
  } catch (error) {
    console.log(error)
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

const addCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.json({ code: 301, message: 'missing param' })
    }
    const response = await Category.add(name)
    if (response == 'fail') {
      return res.json({
        code: 500,
        message: 'internal error',
      })
    }
    return res.json({ code: 201, message: 'ok' })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'internal error',
    })
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.json({
        code: 302,
        message: 'missing param',
      })
    }
    const response = await Category.delete(id)
    if (response != 'fail') {
      return res.json({
        code: 200,
        message: 'deleted',
      })
    }
    return res.json({
      code: 304,
      message: 'error',
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id, name, status, idParentCategory } = req.body
    if (!id || (!name && !status && !idParentCategory)) {
      return res.json({
        code: 303,
        message: 'missing param',
      })
    }
    const response = await Category.undate({ id, name, status, idParentCategory })
    if (response != 'fail') {
      return res.json({
        code: 202,
        message: 'updated',
      })
    }
    return res.json({
      code: 500,
      message: 'error',
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

module.exports = { getListCategory, addCategory, deleteCategory, updateCategory }
