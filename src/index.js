const express = require('express')
const { config } = require('dotenv')
const CryptoJS = require('crypto-js')
const path = require('path')
const bodyParser = require('body-parser')

const postRoutes = require('./routes/postRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(bodyParser.urlencoded({ extended: true })) // body-paser
app.use(bodyParser.json())
config()

const port = process.env.PORT

app.get('/', (req, res) => {
  const obj = {
    id: 1,
    email: 'admin@gmail.com',
    role: 0,
  }
  console.log(CryptoJS.AES.encrypt(JSON.stringify(obj), process.env.PRIVATE_KEY).toString())
  return res.send('hi')
})
postRoutes(app)
categoryRoutes(app)
userRoutes(app)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('listening at' + port)
})
