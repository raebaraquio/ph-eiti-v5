angular.module('sessionModule',['utilsModule'])
.service('sessionService',['$cookies','utilsService',
	function($cookies,utilsService){
		this.inSession= function() {
			if (sessionStorage.getItem('id')===null && localStorage.getItem('id')===null){
				return false
			}
			return true
		}
		this.forceLogout = function(){
			// sessionStorage.clear();
			localStorage.clear();
			// location.reload();
		}
		// this.userRole = function(){
		// 	if ($cookies.get(appPrefix)) {
		// 		return $cookies.get(appPrefix)
		// 	}
		// 	if (sessionStorage) {
		// 		for (var k in sessionStorage) {
		// 			if (k.match(appPrefix)!==null) {
		// 				if (sessionStorage.getItem(k)==='true') {
		// 					return k.split('---')[1]
		// 				}
		// 			}
		// 		}
		// 	}
		// 	if (localStorage) {
		// 		for (var k in localStorage) {
		// 			if (k.match(appPrefix)!==null) {
		// 				if (localStorage.getItem(k)==='true') {
		// 					return k.split('---')[1]
		// 				}
		// 			}
		// 		}
		// 	}
		// }
		this.userProperty = function(property){
			if ($cookies.get(property)) {
				return $cookies.get(property)
			}
			
			if (localStorage) {		
				if (localStorage.getItem(property)) {
					return localStorage.getItem(property)
				}
			}
		}
		// this.userFullName=function(){
		// 	if ($cookies.get('fullName')) {
		// 		return $cookies.get('fullName')
		// 	}
		// 	if (sessionStorage) {
		// 		if (sessionStorage.getItem("firstName")) {
		// 			return sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName")
		// 		} 
		// 	}
		// 	if (localStorage) {
		// 		if (localStorage.getItem("firstName")) {
		// 			return localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")
		// 		} 	
		// 	}
		// }
		// this.username=function(){
		// 	if ($cookies.get('username')) {
		// 		return $cookies.get('username')
		// 	}
		// 	if (sessionStorage) {
		// 		if (sessionStorage.getItem("username")) {
		// 			return sessionStorage.getItem("username")
		// 		} 
		// 	}
		// 	if (localStorage) {
		// 		if (localStorage.getItem("username")) {
		// 			return localStorage.getItem("username")
		// 		} 	
		// 	}
		// }
		// this.getPermissions = function(appPermission) {
		// 	if (!$cookies.get(appPermission)) {
		// 		return null
		// 	}
		// 	var permissions = []
		// 	if ($cookies.get(appPermission)) {
		// 		if ($cookies.get(appPermission).match(/,/gi)) {
		// 			permissions = $cookies.get(appPermission).split(',')  
		// 		}
		// 		else {
		// 			permissions.push($cookies.get(appPermission))
		// 		}
		// 		permissions.sort()	
		// 	}
		// 	return permissions
		// }
		// this.checkPermissions=function(appPermission,permission,appRole){
		// 	if (this.userRole(appRole)==='Host'){
		// 		return true
		// 	}
		// 	var permissions = this.getPermissions(appPermission);
		// 	if (permissions!==null) {
		// 		return utilsService.inArr(permissions,permission)	
		// 	}
		// 	return false
		// }
		return this;
}]);