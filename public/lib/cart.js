const express = require('express')
const path = require('path')
const db = require('./sql')
const exec = require('./exec.js')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 
router.get('/cart',function(req, res){
    res.sendFile('html/cart.html', { root , root })
})

// 下单
router.post('/makeorder', function(req, res){
	const body = JSON.parse(req.body.data)
    db.getConnection(function(err, conn){
		if(err){
			console.log(err.message)
			return res.send({
				status:1,
				msg:'connect failed'
			})
		}
		// 获取orderid
		conn.query('select max(orderid) from orders', function(err, results) {
			if(err) {
				console.log(err.message)
				return res.send({
					status: 1,
					msg: 'get orderid failed',
				})
			}
			for(key in results[0]){
				var orderid = results[0][key] + 1
			}
			// 插入order表
			var sqlArr = [{
				sql: 'insert into orders(ordernum, orderstatus, accountid) values(?, ?, ?)',
				value: [body.booklist.length, 'processing', body.accountid],
			}]
			// 临时取消外键约束
			sqlArr.push({
				sql: 'set foreign_key_checks = ?',
				value: [0],
			})
			// 插入orderdetail表
			var details = body.booklist
			for(var i = 0; i < details.length; i++) {
				sqlArr.push({
					sql: 'insert into orderdetail(orderid, bookid, buynum) values(?, ?, ?)',
					value: [orderid, details[i].bookid, details[i].buynum],
				})
			}
			// 执行数据库事务
			exec(sqlArr).then(function() {
				res.send({
					status: 0,
					msg: 'make order successfully'
				})
			}).catch(function(err) {
				console.log(err)
				return res.send({
					status: 1,
					msg: 'wrong!'
				})
			})
		})
	})
})

module.exports = router
