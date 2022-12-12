$(document).ready(function() {
	var orderStr = window.sessionStorage.getItem("order")
	var orderJson = JSON.parse(orderStr)
	var details = orderJson.booklist
	for(var i = 1; i < details.length; i++){
		$("#item").clone().appendTo("#cart")
	}
	var index = 2
	var totalprice = 0
	for(var i = 0; i < details.length; i++){
		var bookid = details[i].bookid
		$.post(
			"/bookinfo",
			{ "bookid": bookid },
			function(message){
				if(message.status == 0){
					var data = message.data
					var item = $("#item:nth-child("+(index)+")")
					item.find("#bookid").text(data.bookid)
					item.find("#bookname").text(data.bookname)
					item.find("#author").text(data.author)
					item.find("#bookprice").text(data.bookprice)
					item.find("#buynum").val(1)
					item.find("#total").text(data.bookprice)
					item.find("#remove").attr("onClick", "dropOrder("+data.bookid+")")
					index += 1
					all2all()
				}
			}
		)
	}
	$("input").on("change", function() {
		var bookid = $(this).parent().siblings(".bookid").text()
		var buynum = $(this).val()
		var bookprice = $(this).parent().siblings(".bookprice").text()
		// 更改内存中的书本数量
		var orderStr = window.sessionStorage.getItem("order")	
		var orderJson = JSON.parse(orderStr)
		for(var i = orderJson.booklist.length - 1; i >= 0; i--){
			if(orderJson.booklist[i].bookid == bookid){
				orderJson.booklist[i].buynum = buynum
			}
		}
		orderStr = JSON.stringify(orderJson)
		window.sessionStorage.setItem("order", orderStr)
		// 更改页面显示的书本价格
		$(this).parent().siblings(".total").text(buynum * bookprice)
		all2all()
	})
})

function all2all() {
	var buynum = $(".buynum")
	var total = $(".total")
	var len = total.length
	// 更新总数目及总价
	var totalbook = 0
	var totalprice = 0
	for(var i = 0; i < len; i++){
		totalbook += $(buynum[i]).val() * 1
		totalprice += $(total[i]).text() * 1
	}
	$("#totalbook").text(totalbook)
	$("#totalprice").text(totalprice)
}

function dropOrder(bookid) {
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
	window.location.reload()
}

function makeorder() {
	var orderStr = window.sessionStorage.getItem("order")
	$.ajax({
		url: "/makeorder",
		type: "post",
		data: { data: orderStr },
		success: function(message) {
			if(message.status == 0) {
				alert(message.msg)
			} else {
				alert(message.msg)
			}
		}
	})
}
