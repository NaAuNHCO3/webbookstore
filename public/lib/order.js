const express = require('express')
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
	const body= req.body
	var data=[]
	var metadetail={
		detailid:0,
		bookname:0,
		author:0,
		bookid:0,
		price:0,
		buynum:0}
	var metaorder={
		orderid:0,
		totalprice:0,
		orderstatus:0,
		details:[]
	}
	db.getConnection(function(err, conn){
		if(err){
			console.log(err.message)
			return res.send({
				status: 1,
				msg: 'connect failed'
			})
		}
		// 由accountid查询orders表
		let sql= 'select * from orders where accountid=?'
		// 查询order
		conn.query(sql, body.accountid, function(err, result){
			if(err){
				console.log(err.message)
				return res.send({
					status: 1,
					msg: 'connect failed'
				})
			}

			// 由result中orderid循环查询orderdetail表
			let sql= 'select * from orderdetail where orderid=?'
			for(i=0; i< result.length; i++){   // 第一次循环长度为订单数
				var orderid= result[i].orderid
				// var totalprice= 0
				data.push(metaorder)
				data[i].orderid=orderid
				data[i].orderstatus=result[i].status
				// 查询orderdetail
				conn.query(sql, orderid, function(err, result){
					if(err){
						console.log(err.message)
						return res.send({
							status: 1,
							msg: '203'
						})
					}
					// 由result中bookid循环查询book表
					let sql= 'select * from book where bookid=?'
					for(j=0; j< result.length; j++){   // 第二次循环长度为订单细节数，也是购买图书种类数
						var bookid= result[j].bookid
						var discount= result[j].discount
						var buynum= result[j].buynum
						data[i].details.push(metadetail)
						data[i].details[j].detailid=result[j].detailid
						data[i].details[j].buynum=result[j].buynum
						// 查询book
						conn.query(sql, bookid, function(err, result){
							if(err){
								console.log(err.message)
								return res.send({
									status: 1,
									msg: '203'
								})
							}
							data[i].details[j].bookname=result.bookname
							data[i].details[j].author=result.author
							data[i].details[j].bookid=result.bookid
							data[i].details[j].price=result.bookprice
							data[i].totalprice+= result.bookprice*discount*buynum
							conn.release()
							res.send({
								status: 0,
								msg: 'success',
								data: data
							})
						})
					}
					
				})
			}
		})
	})
})

module.exports = router
