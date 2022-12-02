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
    db.getConnection(function(err, conn){
        if (err){
            console.log('connect failed')
            return res.send({
                status: 0,
                msg: 'connect failed'
            })
        }
        var data= {
            bookname: 0,
            press: 0,
            author: 0,
            bookpricemax: 0,
            bookpricemin: 0}
        if(!body.bookname){
            data.bookname= body.bookname
        }else{
            data.bookname= ''
        }
        if(!!body.press){
            data.press= body.press
        }else{
            data.press= ''
        }
        if(!!body.author){
            data.author= body.author
        }else{
            data.author= ''
        }
        if(!!body.bookpricemax){
            data.bookpricemax=body.bookpricemax
        }else{
            data.bookpricemax=9999
        }
        if(!!body.bookpricemin){
            data.bookpricemin=body.bookpricemin
        }else{
            data.bookpricemin=0
        }
        var sql= 'select * from book where (bookname like "%?%" and '+
                'press like "%?%" and '+
                'author like "%?%" and '+
                'bookprice <=? and bookprice >=?)'
        var value= (body.bookname, body.press, body.author, body.bookpricemax, body.bookpricemin)
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
