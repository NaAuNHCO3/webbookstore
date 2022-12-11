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

// 查询单个订单
router.post('/order', function(req, res){
	var orderid = req.body.orderid
	db.getConnection(function(err, conn){
		if(err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: 'connect failed'
			})
		}
		var orderlist= {}
		var sql= 'select accountid,orderstatus from orders where orderid=?'
		conn.query(sql, orderid, function(err, result){
			if (err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			orderlist.accountid=result.accountid
			orderlist.orderstatus=result.orderstatus
			orderlist.orderid=orderid
			// orderlist.details= []
			orderlist.totalprice=0
		})
		var sql = 'select bookname,author,bookprice,detailid,buynum from orderdetail inner join book on orderdetail.bookid=book.bookid where orderid = ?'
		conn.query(sql, orderid, function(err, result){
			if (err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			for(d in result){
				orderlist.totalprice += result[d].bookprice * result[d].buynum
			}
			orderlist.details=result
		})
		console.log(orderlist)
		conn.release()
		return res.send({
			status:0,
			msg:'success',
			data:orderlist
		})
	})
})

// 取消订单
router.post('/cancelorder', function(req, res){
	var orderid= req.body.orderid
	db.getConnection(function(err, conn){
		if (err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: 'connect failed'
			})
		}
		conn.query(sql, orderid,function(err, result){
			if (err){
				console.log(err.message)
				return res.send({
					status:1,
					msg:'203'
				})
			}
			if (result[0].orderstatus=='finished'){
				return res.send({
					status:1,
					msg:'order has finished'
				})
			}
			var sql = "update orders set orderstatus='failed' where orderid=?"
			conn.query(sql,orderid, function(err, result){
				if (err){
					console.log(err.message)
					return res.send({
						status: 1,
						msg: '203'
					})
				}
				conn.release()
				res.send({
					status:0,
					msg : 'change successfully'
				})
			})
		})
		
	})
})

// 订单加急
router.post('/urgeorder', function(req, res){
	orderid=req.orderid
	db.getConnection(function(err, conn){
		if(err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: 'connect failed'
			})
		}
		var sql = 'select orderstatus from order where orderid=?'
		conn.query(sql, orderid,function(err, result){
			if(err){
				console.log(err.message)
				return res.send({
				status: 1,
				msg: 'connect failed'
				})
			}
			if(result[0].orderstatus=='urged'){
				return res.send({
					status:1,
					msg: 'has urged already'
				})
			}
			if(result[0].orderstatus=='finished'){
				return res.send({
					status:1,
					msg:"you can't urge the order having finished"
				})
			}
			var sql = 'update order set orderstatus="urged" where orderid=?'
			conn.query(sql, orderid, function(err, reuslt){
				if (err){
					console.log(err.message)
					return res.send({
						status: 1,
						msg: '203'
					})
				}
			})
			conn.release()
			res.send({
				status:0,
				msg:'urge successfully'
			})
		})
	})
})

// 订单确认
router.post('/confirmorder', function(req, res){
	orderid= req.body.orderid
	db.getConnection(function(err, conn){
		if(err){
			console.log(err.message)
			return res.send({
				status:1,
				msg:'connect failed'
			})
		}
		var sql= 'select orderstatus from orders where orderid=?'
		conn.query(sql,orderid, function(err, result){
			if(err){
				console.log(err.message)
				return res.send({
					status:1,
					msg:'203'
				})
			}
			if(result.orderstatus=='finished'){
				return res.send({
					status:1,
					msg:'confirmed already'
				})
			}
			var sql= 'update orders set orderstatus="finished" where orderid=?'
			conn.query(sql, orderid, function(err, result){
				if(err){
					console.log(err.message)
					return res.send({
						status:1,
						msg:'203'
					})
				}
				conn.release()
				res.send({
					status:0,
					msg:'confirmed already'
				})
			})
		})
	})
})

// 跳转订单管理
router.get('/ordermanage', function(req, res){
	res.sendFile('html/ordermanage', { root , root })
})

// 查询全体订单
router.post('/orderlist', function(req, res){
	db.getConnection(function(err, conn){
		if (err){
			console.log(err.message)
			return res.send({
				status:1,
				msg:'connect failed'
			})
		}
		var sql= 'select * from orders'
		conn.query(sql,function(err, result){
			if(err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: '203'
				})
			}
			conn.release()
			res.send({
				status:0,
				msg: 'success',
				data: result
			})
		})
	})
})

module.exports = router
