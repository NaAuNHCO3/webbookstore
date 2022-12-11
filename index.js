const express = require('express')
const app = express()

// 提供静态资源
app.use('/', express.static('public'))

// 解析表单
app.use(express.urlencoded({ extended:false }))

// base路由，访问首页、登陆界面、注册界面
const base = require('./public/lib/base.js')
app.use('/', base)

// profile路由，访问用户界面，更改个人信息等
const profile = require('./public/lib/profile.js')
app.use('/', profile)

// search路由，访问图书查询界面，执行查询图书操作
const search = require('./public/lib/search.js')
app.use('/', search)

// bookinfo路由，访问图书信息页面，查询返回图书信息
const bookinfo = require('./public/lib/bookinfo.js')
app.use('/', bookinfo)

// order路由，访问当前订单与历史订单，查询历史订单，下单
const order = require('./public/lib/order.js')
app.use('/', order)

// cart路由，购物车操作
const cart = require('./public/lib/cart.js')
app.use('/', cart)


// 监听8080端口
app.listen(8080, function() {
	console.log('server running at http://127.0.0.1:8080')
})
