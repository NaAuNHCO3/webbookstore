$(document).ready(function() {
	$("#accountid").attr("value", window.sessionStorage.getItem("accountid"))
	$("#back").attr("href", window.sessionStorage.getItem("class"))
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.location.href = "/profile"
		} else {
			alert(message.msg)
		}
	})
})
