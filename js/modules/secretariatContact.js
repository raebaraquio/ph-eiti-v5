angular.module('secretariatContactMod',[])
.service('secretariatContactDetails',function(){
	this.get = function() {
		return {
	        add_line1: "5/F DOF building, Roxas Blvd. Corner",
	        add_line2: "Pablo Ocampo St., Manila 1004, Philippines",
	        email: "info@ph-eiti.com",
	        phone: "+632-400-6882"
	    }
	}
})