const express = require('express')
const { config } = require('dotenv')
const CryptoJS = require('crypto-js')
const path = require('path')
const bodyParser = require('body-parser')

const postRoutes = require('./routes/postRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const app = express()
app.use(bodyParser.urlencoded({ extended: true })) // body-paser
app.use(bodyParser.json())
config()

const port = process.env.PORT

app.get('/', (req, res) => {
  const decr = CryptoJS.AES.decrypt(
    'U2FsdGVkX1/2PXQ56o6VdqT/EP1l3+LggFSVFx9FbuEH6+AG8htmbNDSKTt+h1SFH4ycCF1V3ITunetkKBsQug==',
    process.env.PRIVATE_KEY
  )
  const obj = JSON.parse(decr.toString(CryptoJS.enc.Utf8))
  console.log(obj)

  return res.send(decr.toString(CryptoJS.enc.Utf8))
})
postRoutes(app)
categoryRoutes(app)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('listening at' + port)
})
