$(document).ready(function() {
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.localStorage.setItem("id", message.id)
			if(message.class == 'client') window.localStorage.setItem("class", "/client")
			if(message.class == 'staff') window.localStorage.setItem("class", "/staff")
			window.location.href = window.localStorage.getItem("class")
		} else {
			alert(message.msg)
		}
	})
})
