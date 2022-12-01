const mysql = require('mysql')

// 连接数据库
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'king,too,rain',
	database: 'webbookstore',
})

db.connect()

module.exports = db
