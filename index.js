const express = require('express')
const app = express()

// 提供静态资源
app.use('/', express.static('public'))

// 建立路由
const base = require('./public/lib/base.js')
app.use('/', base)

// 监听8080端口
app.listen(8080, function() {
	console.log('server running at http://127.0.0.1:8080')
})
