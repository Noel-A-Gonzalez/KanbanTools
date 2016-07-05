var reportes = function(){
	
	var initEvents = function(){
		$(document).ready(function(){
			user.verifyUser();
		});
		
	}

	return{
		initEvents:initEvents,
	}
}();
reportes.initEvents();