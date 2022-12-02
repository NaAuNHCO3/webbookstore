$(document).ready(function() {
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.location.href = "/login"
		} else {
			alert(message.msg)
		}
	})
})
