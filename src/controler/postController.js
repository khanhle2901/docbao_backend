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

module.exports = { getPosts }
