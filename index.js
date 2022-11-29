const express = require('express')
const app = express()

app.use('/', express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/' + 'index.html')
})

app.get('login', function(req, res) {
	res.sendFile(__dirname + '/html' + '/login.html')
})

app.get('register', function(req, res) {
	res.sendFile(__dirname + '/html' + '/register.html')
})
)

app.listen(8080, function() {
	console.log('server running at http://127.0.0.1:8080')
})
