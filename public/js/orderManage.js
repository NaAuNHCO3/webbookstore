$(document).ready(function() {
	var orderStr = JSON.stringify({
		"accountid": window.sessionStorage.getItem("accountid"),
		"booklist": [],
	})
	if(!window.sessionStorage.getItem("order")){
		window.sessionStorage.setItem("order", orderStr)
	}
})

function addOrder(e, bookid){
	var orderStr = window.sessionStorage.getItem("order")
	var orderJson = JSON.parse(orderStr)
	orderJson.booklist.push({
		"bookid": bookid,
		"buynum": 1,
	})
	orderStr = JSON.stringify(orderJson)
	console.log(orderStr)
	window.sessionStorage.setItem("order", orderStr)
	e.setAttribute("onClick", "dropOrder(this, "+bookid+")")
	e.innerHTML = "Drop an Order"
	e.setAttribute("class", "inorder")
}

function dropOrder(e, bookid){
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
	e.setAttribute("onClick", "addOrder(this, "+bookid+")")
	e.innerHTML = "Add to Order"
	e.setAttribute("class", "outorder")
}
