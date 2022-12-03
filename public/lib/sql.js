const mysql = require('mysql')

// 建立连接池
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'hMp7r_v2yFJ53WK',
	database: 'webbookstore',
	connectLimit: 20,
	multipleStatements: true
})

module.exports = db
