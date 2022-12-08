const mysql = require('mysql')

// 建立连接池
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'king,too,rain',
	database: 'webbookstore',
	connectLimit: 20,
	multipleStatements: true
})

module.exports = db
