const express = require('express')
const { config } = require('dotenv')
const CryptoJS = require('crypto-js')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')

const postRoutes = require('./routes/postRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')
const multiparty = require('connect-multiparty')
const { authMiddleware } = require('./middleware/userMiddleware')

let multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  },
})

const upload = multer({ dest: __dirname + '/public/images/avartarPost' })

const MultipartyMiddleware = multiparty({ uploadDir: __dirname + '/public/images' })
const MultipartyAvartarPostMiddleware = multiparty({ uploadDir: __dirname + '/public/images/avartarPost' })

const app = express()
app.use(bodyParser.urlencoded({ extended: true })) // body-paser
app.use(bodyParser.json())
app.use(cors())
config()

const port = process.env.PORT

app.get('/', (req, res) => {
  console.log(__dirname)
  const obj = {
    id: 1,
    email: 'admin@gmail.com',
    role: 0,
  }
  console.log(CryptoJS.AES.encrypt(JSON.stringify(obj), process.env.PRIVATE_KEY).toString())
  return res.send('hi')
})
app.post('/api/upload', MultipartyMiddleware, (req, res) => {
  console.log('http://localhost:4000' + req.files.upload.path.replace(__dirname + '/public', ''))
  return res.status(200).json({
    uploaded: true,
    url: process.env.APP_CDN_URL + req.files.upload.path.replace(__dirname + '/public', ''),
  })
})

//
app.post('/api/avartar-post', upload.single('file'), (req, res) => {
  try {
    console.log(req.body)
    console.log(req.headers)
    console.log(req.file)
    return res.json({
      code: 201,
      message: 'ok',
    })
  } catch (error) {
    console.log(error)
    return res.json({
      code: 500,
      message: 'error',
    })
  }
  // try {
  //   console.log(req.files)
  //   console.log(req.files.upload.path)
  //   return res.json({
  //     code: 201,
  //     message: 'ok',
  //     url: process.env.APP_CDN_URL + req.files.upload.path.replace(__dirname + '/public', ''),
  //   })
  // } catch (error) {
  //   return res.json({
  //     code: 401,
  //     message: 'error',
  //   })
  // }
})

postRoutes(app)
categoryRoutes(app)
userRoutes(app)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('listening at' + port)
})
