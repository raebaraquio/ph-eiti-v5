angular.module('secretariatContactMod',[])
.service('secretariatContactDetails',function(){
	this.get = function() {
		return {
	        add_line1: "7th Floor, EDPC Building, BSP Complex, ",
	        add_line2: "Roxas Boulevard, Manila, Philippines",
	        email: "info@ph-eiti.com",
	        phone: "+632 525 0487"
	    }
	}
})