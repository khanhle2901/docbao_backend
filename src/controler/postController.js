const Post = require('../model/postModel')
const getPosts = async (req, res) => {
  let { page, type } = req.params
  console.log(type)
  if (!type || type != 'small' || type != 'large') {
    type = 'small'
  }
  if (!page || page <= 1) {
    page = 1
  }
  const result = await Post.list(page, type == 'small' ? 10 : 4)
  console.log(typeof result)
  return res.send('hi')
}
const getPost = async (req, res) => {
  const { id, slug } = req.params
  try {
    const response = await Post.get(id)
    if (response == 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    if (response.length == 0) {
      return res.json({
        code: 404,
        message: 'not found',
      })
    }
    const [data] = response
    data.viewed = data.viewed + 1
    delete data.id_censor
    delete data.censored_at
    delete data.deleted
    await Post.updateViewed(id, data.viewed)
    return res.json({
      code: 200,
      data: data,
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
  return res.send({ id, slug })
}

module.exports = { getPosts, getPost }
