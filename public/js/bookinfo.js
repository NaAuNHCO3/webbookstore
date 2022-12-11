$(document).ready(function() {
	$.post(
		"/bookinfo",
		{ bookid: window.sessionStorage.getItem("bookid") },
		function(message) {
			if(message.status == 0){
				var data = message.data
				$("#bookname").text(data.bookname)
				$("#author").text(data.author)
				$("#press").text(data.press)
				$("#bookprice").text("￥"+data.bookprice)
				$("#bookinvent").text(data.bookinvent+"本")
				$("#bookabstract").text(data.bookabstract)
			} else {
				alert(message.msg)
			}
		}
	)
	var home = window.sessionStorage.getItem('home')
	if(home == "/client"){
		$("#modify").css("display", "none")
	}
	if(home == "/staff"){
		$("#order").css("display", "none")
	}
})

function addOrder(e){
	var orderStr = window.sessionStorage.getItem("order")
	var orderJson = JSON.parse(orderStr)
	orderJson.booklist.push({
		"bookid": window.sessionStorage.getItem("bookid"),
		"bynum": 1,
	})
	orderStr = JSON.stringify(orderJson)
	console.log(orderStr)
	window.sessionStorage.setItem("order", orderStr)
	e.setAttribute("onClick", "dropOrder(this)
	e.innerHTML = "Drop from order"
}
				   
function dropOrder(e){
	var orderStr = window.sessionStorage.getItem("order")
	var orderJson = JSON.parse(orderStr)
	for(var i = orderJson.booklist.length - 1; i >= 0; i--){
		if(orderJson.booklist[i].bookid == bookid){
			orderJson.booklist.splice(i, 1)
			break
		}
	}
	orderStr = JSON.stringify(orderJson)
	console.log(orderStr)
	window.sessionStorage.setItem("order", orderStr)
	e.setAttribute("onClick", "addOrder(this)")
	e.innerHTML = "Add to order"
}
