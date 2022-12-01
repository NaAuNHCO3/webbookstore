const express = require('express')
const path = require('path')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 访问首页
router.get('/', function(req, res) {
	res.sendFile('index.html', { root: root })
})

// 访问登陆界面
router.get('/login', function(req, res) {
	res.sendFile('html/login.html', { root: root })
})

// 发起登录请求
router.post('/login', function(req, res) {
	res.send({
		status: 0,
		msg: 'sucess',
	})
})

// 访问注册界面
router.get('/register', function(req, res) {
	res.sendFile('html/register.html', { root: root })
})

// 发起注册请求
router.post('/register', function(req, res) {
	// TO DO ...
})

module.exports = router
