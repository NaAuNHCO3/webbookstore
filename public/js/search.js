$(document).ready(function() {
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			alert(message.data)
		} else {
			alert(message.msg)
		}
	})
})
