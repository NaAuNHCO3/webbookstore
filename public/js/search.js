$(document).ready(function() {
	$("#back").attr("href", window.sessionStorage.getItem("home"))
	$("#form").ajaxForm(function(message) {
		$("#resultpad").children().not(":first").remove()
		if(message.status == 0) {
			var data = message.data
			if(data.length == 0) {
				$(".resultpad").css("display", "none")
			} else {
				$(".resultpad").css("display", "grid")
				for(var i = 1; i <= data.length; i++) {
					$("#bookinfo:nth-child("+i+")").find("#order").attr("onClick", "addOrder(this, "+data[i-1].bookid+")")
					$("#bookinfo:nth-child("+i+")").find("#bookname").text(data[i-1].bookname)
					$("#bookinfo:nth-child("+i+")").find("#author").text(data[i-1].author)
					$("#bookinfo:nth-child("+i+")").find("#press").text(data[i-1].press)
					$("#bookinfo:nth-child("+i+")").find("#price").text(data[i-1].bookprice)
					if(i < data.length) {
						$("#bookinfo:nth-child("+i+")").clone().appendTo("#resultpad")
					}
				}
			}
		} else {
			alert(message.msg)
		}
	})
})
