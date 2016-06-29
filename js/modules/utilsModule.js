angular.module('utilsModule',[])
.service('utilsService',function(){
	this.inArr = function(arr,val) {
		if (arr) {
			for (var k in arr){
				if(arr[k]===val){
					return true
				}
			}
		}
		return false
	}
	this.inObj = function(ArrayObj,prop,val,idx) {
		if (ArrayObj) {
			/////////////////////////////////
			// ArrayObj is a single Object //
			/////////////////////////////////
			if (!ArrayObj.length || ArrayObj.length===undefined) {
				if (ArrayObj.hasOwnProperty(prop)) { // hasOwnProperty
					if (ArrayObj[prop]===val){
						return true
					}
				}
			}
			/////////////////////////////////////
			// ArrayObj is an array of Objects //
			/////////////////////////////////////
			else {
				for (var k in ArrayObj){
					if (idx===null) {
						if (ArrayObj[k][prop]===val) { // hasOwnProperty
							return true
						}	
					}
					else {
						if (idx!==k) { // exclude given index
							if (ArrayObj[k][prop]===val) { 
								return true
							}			
						}
					}
				}
			}
		}
		return false
	}
	this.indexInObj = function(ArrayObj,prop,val){
		if (ArrayObj) {
			/////////////////////////////////
			// ArrayObj is a single Object //
			/////////////////////////////////
			if (!ArrayObj.length || ArrayObj.length===undefined) {
				return null
			}
			/////////////////////////////////////
			// ArrayObj is an array of Objects //
			/////////////////////////////////////
			else {
				for (var k in ArrayObj){
					if (ArrayObj[k][prop]===val) { // hasOwnProperty
						return k
					}	
				}
			}
		}
		return null
	}
	this.getObjPropVal = function(ArrayObj,prop){
		if (ArrayObj) {
			/////////////////////////////////
			// ArrayObj is a single Object //
			/////////////////////////////////
			if (!ArrayObj.length || ArrayObj.length===undefined) {
				if (ArrayObj[prop]) { // hasOwnProperty
					return ArrayObj[prop]
				}
			}
			/////////////////////////////////////
			// ArrayObj is an array of Objects //
			/////////////////////////////////////
			else {
				for (var k in ArrayObj) {
					if (ArrayObj[k][prop]) { // hasOwnProperty
						return ArrayObj[k][prop]  
					}
				}
			}
		}
		return false
	}
	this.getObjOtherPropVal = function(ArrayObj,prop1,val,prop2){
		if (ArrayObj) {
			/////////////////////////////////////
			// ArrayObj is an array of Objects //
			/////////////////////////////////////	
			for (var k in ArrayObj) {
				if (ArrayObj[k][prop1]!==undefined) {
					if (ArrayObj[k][prop1]==val) { // hasOwnProperty
						return ArrayObj[k][prop2];
					}	
				}
			}
		}
		return false
	}
	this.sortObjKeyVal = function(obj,prop){
		////////////////////////////////////////////////////////////////
		// Pass "-property name" / prefix dash '-' to reverse sorting //
		////////////////////////////////////////////////////////////////
		var sortOrder = 1;
	    if(prop[0] === "-") {
	        sortOrder = -1;
	        prop = prop.substr(1);
	    }
	    return obj.sort(function (a,b) {
	        var result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
	        return result * sortOrder;
	    })
	}
	this.isObjEmpty=function(obj){
		var hasOwnProperty = Object.prototype.hasOwnProperty;

		// null and undefined are "empty"
		if (obj == null) return true;

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0)    return false;
		if (obj.length === 0)  return true;

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
		    if (hasOwnProperty.call(obj, key)) return false;
		}
		return true;
	}
})