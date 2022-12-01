const express = require('express')
const path = require('path')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 访问顾客界面
router.get('/client', function(req, res) {
	res.sendFile('html/client.html', { root: root })
})

// 访问职员界面
router.get('/staff',function(req, res){
	res.sendFile('html/staff.html', { root : root })
})

module.exports = router
 