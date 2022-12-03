$(document).ready(function() {
	$("#accountid").attr("value", window.localStorage.getItem("id"))
	$("#back").attr("href", window.localStorage.getItem("class"))
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.location.href = "/profile"
		} else {
			alert(message.msg)
		}
	})
})
