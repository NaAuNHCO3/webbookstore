const express = require('express')
const path = require('path')
const db = require('./sql')

const router = express.Router()
const root = path.join(__dirname, '../../')

// 访问图书查询界面
router.get('/search', function(req, res){
    res.sendFile('html/search.html', { root : root })
})

// 查询书籍
router.post('/search', function(req, res){
    const body=req.body
    var sql = 'select * from book where bookname like ? and press like ? and author like ? and bookprice <= ? and bookprice >= ?'
	console.log(body)
	console.log(body.bookname)
	var value = [
		body.bookname ? '%'+body.bookname+'%' : '%%',
		body.press ? '%'+body.press+'%' : '%%',
		body.author ? '%'+body.author+'%' : '%%',
		body.bookpricemax ? body.bookpricemax : 999,
		body.bookpricemin ? body.bookpricemin : 0
	]
    db.getConnection(function(err, conn){
        if (err){
            console.log('connect failed')
            return res.send({
                status: 0,
                msg: 'connect failed'
            })
        }
		console.log(value)
        conn.query(sql,value,function(err, result){
            if(err){
                console.log(err.message)
                return res.send({
                    status: 1,
                    msg: '203',
                })
            }
            conn.release()
            res.send({
                status: 0,
                msg: 'success',
                data: result
            })
        })
    })
})

module.exports = router
