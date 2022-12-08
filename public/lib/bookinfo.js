const express = require('express')
const path = require('path')
const db = require('./sql')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 访问图书信息界面
router.get('/bookinfo', function(req, res){
    res.sendFile('html/bookinfo.html', { root : root })
})

// 发起查询图书信息请求
router.post('/bookinfo', function(req, res){
    const body=req.body
    db.getConnection(function(err, conn){
        if(err){
            console.log(err.message)
            return res.send({
                status: 1,
                msg: 'connect failed'
            })
        }
        var sql='select * from book where bookid=?'
        conn.query(sql, body.bookid, function(err,result){
            if(err){
                console.log(err.message)
                return res.send({
                    status: 1,
                    msg: '203'
                })
            }
            conn.release()
            res.send({
                status: 0,
                msg:'success',
                data: result[0]
			})
        })
    })
})

module.exports = router
