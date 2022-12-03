$(document).ready(function() {
	$("#back").attr("href", window.localStorage.getItem("class"))
	$(".resultpad").css("display", "grid")
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			var data = message.data
			var i = 0
			for(i = 1; i <= data.length; i++) {
				$("#bookinfo:nth-child("+i+")").find("#bookname").text(data[i-1].bookname)
				$("#bookinfo:nth-child("+i+")").find("#author").text(data[i-1].author)
				$("#bookinfo:nth-child("+i+")").find("#press").text(data[i-1].press)
				$("#bookinfo:nth-child("+i+")").find("#price").text(data[i-1].bookprice)
				if(i < data.length) {
					$("#bookinfo:nth-child("+i+")").clone().appendTo("#resultpad")
				}
			}
		} else {
			alert(message.msg)
		}
	})
})
