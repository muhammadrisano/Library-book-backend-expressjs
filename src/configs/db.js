require('dotenv').config()

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'eno',
    password: 'Qwer1234#',
    database: 'library'
})

connection.connect((err) => {
    if (err) console.log(`Error: ${err}`)
})

module.exports = connection