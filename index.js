const express = require('express')
const app = express()

// 提供静态资源
app.use('/', express.static('public'))

// 访问首页
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/' + 'index.html')
})

// 访问登陆界面
app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/html' + '/login.html')
})

// 访问注册界面
app.get('/register', function(req, res) {
	res.sendFile(__dirname + '/html' + '/register.html')
})

// 监听8080端口
app.listen(8080, function() {
	console.log('server running at http://127.0.0.1:8080')
})
