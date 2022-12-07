$(document).ready(function() {
	$.post(
		"/bookinfo",
		{ bookid: window.sessionStorage.getItem("bookid") },
		function(message) {
			if(message.status == 0){
				alert(message.msg)
			} else {
				alert(message.msg)
			}
		}
	)
})
