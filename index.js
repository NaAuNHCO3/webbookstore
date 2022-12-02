const express = require('express')
const app = express()

// 提供静态资源
app.use('/', express.static('public'))

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

// 监听8080端口
app.listen(8080, function() {
	console.log('server running at http://127.0.0.1:8080')
})
