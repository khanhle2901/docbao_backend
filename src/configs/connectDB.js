const QueryBuilder = require('node-querybuilder')
const settings = {
  host: process.env.HOST_DB,
  database: 'doc_bao',
  user: 'root',
  password: process.env.PASSWORD_DB,
}
const pool = new QueryBuilder(settings, 'mysql', 'pool')

module.exports = pool
