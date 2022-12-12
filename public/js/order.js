$(document).ready(function() {
	$.post(
		"/order",
		{ "orderid": window.sessionStorage.getItem("orderid") },
		function(message) {
			if(message.status == 0) {
				var data = message.data
				$("#accountid").text(data.accountid)
				$("#orderstatus").text(data.orderstatus)
				$("#orderid").text(data.orderid)
				$("#totalprice").text(data.totalprice)
				var details = data.details			
				for(var i = 1; i < details.length; i++) {
					$("#item").clone().appendTo("#table")
				}
				var index = 2
				for(var i = 0; i < details.length; i++) {
					var detail = details[i]
					var item = $("#item:nth-child("+index+")")
					item.find("#detailid").text(detail.detailid)
					item.find("#bookname").text(detail.bookname)
					item.find("#author").text(detail.author)
					item.find("#bookprice").text(detail.bookprice)
					item.find("#buynum").text(detail.buynum)
					item.find("#total").text(detail.bookprice * detail.buynum)
					index += 1
				}
			} else {
				alert(message.msg)
			}
		}
	)
})
