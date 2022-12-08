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
})
