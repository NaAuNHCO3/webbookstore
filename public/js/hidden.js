$(document).ready(function() {
	var home = window.sessionStorage.getItem('home')
	if(home == "/client"){
		$("#modify").css("display", "none")
	}
	if(home == "/staff"){
		$("order").css("display", "none")
	}
})
