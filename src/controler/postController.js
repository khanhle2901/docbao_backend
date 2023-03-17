const Post = require('../model/postModel')
const getPosts = async (req, res) => {
  let { page, type } = req.params
  if (!type || type != 'small' || type != 'large') {
    type = 'small'
  }
  if (!page || page <= 1) {
    page = 1
  }
  const result = await Post.list(page, type == 'small' ? 10 : 4)
  return res.send('hi')
}
const getPost = async (req, res) => {
  const { id } = req.params
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
    Post.updateViewed(id, data.viewed)
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
const getSearch = async (req, res) => {
  const { searchData } = req.params
  try {
    if (searchData.trim() == '') {
      return res.json({
        code: 203,
        message: 'missing param',
      })
    }
    const searchArr = searchData.trim().split(' ')
    const response = await Post.search(searchArr)
    if (response == 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    return res.json({
      code: 200,
      messgae: 'ok',
      data: response,
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}
const getNew = async (req, res) => {
  try {
    let num = 5
    const response = await Post.new(num)
    if (response == 'fail') {
      return res.json({
        code: 500,
        message: 'errorC',
      })
    }
    response.forEach((element) => {
      element.avartar_cdn = process.env.APP_CDN_URL + element.avartar_cdn
    })
    return res.json({
      code: 200,
      message: 'ok',
      data: response,
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'errorC',
    })
  }
}
const add = async (req, res) => {
  try {
    return res.json({
      code: 201,
      message: 'ok',
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}
const hanleUploadAvartar = async (req, res) => {
  try {
    const response = await Post.add({
      ...req.body,
      avartar_cdn: '/images/avartarPost/' + req.file.filename,
      id_author: 1 /* get key from token*/,
    })
    return res.json({
      code: 201,
      message: 'ok',
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}
const getPostOfcategory = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.json({
        code: 404,
        message: 'missing params',
      })
    }
    const response = await Post.postOfCategory(id)
    if (response === 'fail') {
      return res.json({
        code: 500,
        message: 'error',
      })
    }
    response.forEach((item) => {
      item.avartar_cdn = process.env.APP_CDN_URL + item.avartar_cdn
    })
    return res.json({
      code: 200,
      message: 'ok',
      data: response,
    })
  } catch (error) {
    return res.json({
      code: 500,
      message: 'error',
    })
  }
}

module.exports = { getPosts, getPost, getSearch, getNew, add, hanleUploadAvartar, getPostOfcategory }
