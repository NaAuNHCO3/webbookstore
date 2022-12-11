const express = require('express')
const path = require('path')
const db = require('./sql')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 
router.get('/cart',function(req, res){
    res.sendFile('html/cart.html', { root , root })
})

// 下单
router.post('/makeorder', function(req, res){
    const body=req.body
    db.getConnection(function(err, conn){
        if(err){
            console.log(err.message)
            return res.send({
                status:1,
                msg:'connect failed'
            })
        }
        var sql = 'insert into orders '
    })
})
module.exports = router
