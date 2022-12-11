const express = require('express')
const path = require('path')
const db = require('./sql')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 
router.get('/cart',function(req, res){
    res.sendFile('html/cart.html', { root , root })
})

module.exports = router
