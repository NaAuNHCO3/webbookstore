$(document).ready(function() {
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.sessionStorage.setItem("accountid", message.id)
			if(message.class == 'client') window.sessionStorage.setItem("home", "/client")
			if(message.class == 'staff') window.sessionStorage.setItem("home", "/staff")
			window.location.href = window.sessionStorage.getItem("home")
		} else {
			alert(message.msg)
		}
	})
})
