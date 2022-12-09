$(document).ready(function() {
	$.post(
		"/orderhistory",
		{ accountid: window.sessionStorage.getItem("accountid") },
		function(message) {
			if(message.status == 0) {
				var data = message.data
				for(var i = 1; i <= data.length; i++){
					var orderdata = data[i-1]
					var orderplace = $("#order:nth-child("+i+")")
					// 修改orderstate
					var orderstate = orderplace.children("#orderstate")
					orderstate.find("#orderid").text(orderdata.orderid)
					orderstate.find("#totalprice").text(orderdata.totalprice)
					orderstate.find("#orderstatus").text(orderdata.orderstatus)
					// 修改orderdetail
					var orderdetail = orderplace.children("#orderdetail")
					var details = orderdata.details
					orderdetail.children("#tablebody").not(":first").remove()
					for(var j = 1; j <= details.length; j++){
						var detail = details[j-1]
						var tablebody = orderdetail.children("#tablebody:nth-child("+(1+j)+")")
						tablebody.find("#detailid").text(detail.detailid)
						tablebody.find("#bookname").text(detail.bookname)
						tablebody.find("#author").text(detail.author)
						tablebody.find("#price").text("￥"+detail.bookprice)
						tablebody.find("#buynum").text(detail.buynum+"本")
						if(j < details.length){
							tablebody.clone().appendTo(orderdetail)
						}
					}
					if(i < data.length){
						orderplace.clone().appendTo("#orderlist")
					}
				}
			} else {
				alert(message.msg)
			}	
		}
	)
})
