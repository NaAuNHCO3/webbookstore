const express = require('express')
const path = require('path')

const router = express.Router()
const root = path.join(__dirname, '../../')

const db = require('./sql.js')

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
	const body = req.body
	db.query('select accountid, password from user where user.username=?', body.username, function(err, result) {
		if (err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: 'query error'
			})
		}
		if (result.length != 1){
			return res.send({
				status: 1,
				msg: 'no user'
			})
		}
		if (result[0].password != body.password) {
			return res.send({
				status: 1,
				msg: 'password error'
			})	
		}
		res.send({
			status: 0,
			msg: result[0].accountid
		})
	})
})

// 访问注册界面
router.get('/register', function(req, res) {
	res.sendFile('html/register.html', { root: root })
})

// 发起注册请求
router.post('/register', function(req, res) {
	const body= req.body
	db.query('select * from user where user.username=?',body.username, function(err, result){
		if (err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: '203'
			})
		}
		if (result.length!=0){
			return res.send({
				status: 1,
				msg: 'user existing'
			})
		}
		db.query('insert into user (username,password) values (?,?)',[body.username,body.password], function(err, result){
			if (err) {
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			console.log(result)
			res.send({
				status: 0,
				msg: 'register successfully'
			})
		})
	})
})

module.exports = router
