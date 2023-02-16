const QueryBuilder = require('node-querybuilder')
const settings = {
  host: 'localhost',
  database: 'doc_bao',
  user: 'root',
  password: '',
}
const pool = new QueryBuilder(settings, 'mysql', 'pool')

module.exports = pool
