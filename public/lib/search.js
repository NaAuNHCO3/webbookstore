const express = require('express')
const path = require('path')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 访问图书查询界面
router.get('/search', function(req, res){
    res.sendFile('html/search.html', { root : root })
})

module.exports = router
