const express = require('express')
const { resolve } = require('path')
const path = require('path')

const router = express.Router()
const root = path.join(__dirname, '../../')

const db = require('./sql.js')


// 访问订单页面
router.get('/order', function(req, res){
	res.sendFile('html/order.html', { root : root})
})

// 访问orderhistory页面
router.get('/orderhistory', function(req, res){
	res.sendFile('html/orderhistory.html', { root : root})
})

// 查询历史订单
router.post('/orderhistory', function(req, res){
	var accountid = req.body.accountid
	db.getConnection(function(err, conn){
		if(err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: 'connect failed'
			})
		}
		var orderlist = []
		var sql='select orderid,orderstatus from orders where accountid=?'
		conn.query(sql, accountid, async function(err, result){
			if(err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			orderlist = result.map(function(order){
				return {
					"orderid": order.orderid,
					"orderstatus": order.orderstatus,
					"totalprice": 0,
					"details": [],
				}
			})
			var sql = 'select bookname,author,bookprice,detailid,buynum from orderdetail inner join book on orderdetail.bookid=book.bookid where orderid = ?'
			async function execQuery(index) {
				return new Promise(function(resolve, reject) {
					conn.query(sql, orderlist[index].orderid, function(err, result) {
						if(err) {
							console.log(err)
							return res.send({
								status: 0,
								msg: '503',
							})
						}
						orderlist[index].details = result
						for(d in result){
							orderlist[index].totalprice += result[d].bookprice * result[d].buynum
						}
						resolve()
					})
				})
			}
			for(var i = 0; i < orderlist.length; i++){
				await execQuery(i)
			}
			conn.release()
			res.send({
				status: 0,
				msg: 'success',
				data: orderlist,
			})
		})
	})
})

module.exports = router
