const Category = require('../model/categoryModel')

const addCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.json({ code: 301, message: 'missing param' })
    }
    const response = await Category.add(name)
    console.log(response)
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

module.exports = { addCategory }
