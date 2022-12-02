$(document).ready(function() {
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.location.href = "/profile"
		} else {
			alert(message.msg)
		}
	})
})
