$(document).ready(function() {
	$.post(
		"/profile",
		{ accountid: window.localStorage.getItem("id") },
		function(message) {
			if(message.status == 0) {
				alert(message.data)
			} else {
				alert(message.msg)
			}
		}
	)
})
