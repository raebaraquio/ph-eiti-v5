angular.module('secretariatContactMod',[])
.service('secretariatContactDetails',function(){
	this.get = function() {
		return {
	        add_line1: "4th Floor, DOF Building, BSP Complex, ",
	        add_line2: "Roxas Boulevard, Manila, Philippines",
	        email: "info@ph-eiti.org",
	        phone: "+632 525 0487"
	    }
	}
})