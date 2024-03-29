const express = require('express')
const { config } = require('dotenv')
const CryptoJS = require('crypto-js')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const postRoutes = require('./routes/postRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')
const multiparty = require('connect-multiparty')
const { authMiddleware, writerMiddleWare } = require('./middleware/userMiddleware')

let multer = require('multer')
const { hanleUploadAvartar } = require('./controler/postController')
config()
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/images/avartarPost')
  },
  filename: function (req, file, cb) {
    try {
      const { id } = JSON.parse(
        CryptoJS.AES.decrypt(req.headers.authorization, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8)
      )
      cb(null, `${id}-${Date.now()}.jpg`) //Appending .jpg
    } catch (error) {
      console.log(error)
    }
  },
})

const upload = multer({ storage, limits: { fileSize: 500000 } })

const MultipartyMiddleware = multiparty({ uploadDir: __dirname + '/public/images' })
const MultipartyAvartarPostMiddleware = multiparty({ uploadDir: __dirname + '/public/images/avartarPost' })

const app = express()
app.use(bodyParser.urlencoded({ extended: true })) // body-paser
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT

app.get('/', (req, res) => {
  const obj = {
    id: 9,
    email: 'admin@gmail.com',
    role: 0,
  }

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
app.post('/api/avartar-post', authMiddleware, writerMiddleWare, upload.single('file'), hanleUploadAvartar)

postRoutes(app)
categoryRoutes(app)
userRoutes(app)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('listening at' + port)
})
