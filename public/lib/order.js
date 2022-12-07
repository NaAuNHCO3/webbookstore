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

module.exports = router
