const express = require('express')
const path = require('path')

const router = express.Router()
const root = path.join(__dirname, '../../')

const db = require('./sql.js')

// 访问顾客界面
router.get('/client', function(req, res) {
	res.sendFile('html/client.html', { root: root })
})

// 访问职员界面
router.get('/staff',function(req, res){
	res.sendFile('html/staff.html', { root : root })
})

// 访问用户信息界面
router.get('/profile', function(req ,res){
	res.sendFile('html/profile.html', { root : root })
})

// 查询用户信息
router.post('/profile', function(req, res){
	const body=req.body
	db.getConnection(function(err, conn){
		if(err) {
			console.log(err.message)
			return res.send({
				status: 0,
				msg: 'connect failed'
			})
		}
		var sql = 'select username,abstract,email,telephone,address,userclass from user where user.accountid=?'
		conn.query(sql,body.accountid, function(err, result){
			if (err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			conn.release()
			res.send({
				status: 0,
				msg: 'success',
				data: result
			})
		})
	})

})

// 访问修改用户信息界面
router.get('/changeprofile', function(req ,res){
	res.sendFile('html/changeprofile.html', { root : root })
})

// 修改用户信息
router.post('/changeprofile', function(req, res){
	const body=req.body
	db.getConnection(function(err, conn){
		if(err) {
			console.log(err.message)
			return res.send({
				status: 0,
				msg: 'connect failed'
			})
		}
		var sql= 'update user set email=?,address=?,telephone=?,abstract=? where user.accountid=?'
		console.log(body)
		conn.query(sql,[body.email,body.address,body.telephone,body.abstract,body.accountid], function(err, result){
			if (err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			conn.release()
			res.send({
				status: 0,
				msg: 'success'
			})
		})
	})
})


module.exports = router
