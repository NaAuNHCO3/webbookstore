$(document).ready(function() {
	$("#back").attr("href", window.localStorage.getItem("class"))
	$.post(
		"/profile",
		{ accountid: window.sessionStorage.getItem("accountid") },
		function(message) {
			if(message.status == 0) {
				var data = message.data[0]
				$("#accountid").text(window.localStorage.getItem("accountid"))
				$("#username").text(data.username)
				$("#userclass").text(data.userclass)
				$("#email").text(data.email)
				$("#telephone").text(data.telephone)
				$("#address").text(data.address)
				$("#abstract").text(data.abstract)
			} else {
				alert(message.msg)
			}
		}
	)
})
