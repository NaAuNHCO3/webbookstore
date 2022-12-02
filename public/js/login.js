$(document).ready(function() {
	$("#form").ajaxForm(function(message) {
		if(message.status == 0) {
			window.localStorage.setItem('id', message.id)
			if(message.class == 'client') window.location.href = '/client'
			if(message.class == 'staff') window.location.href = '/staff'
		} else {
			alert(message.msg)
		}
	})
})
