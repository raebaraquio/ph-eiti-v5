angular.module('secretariatContactMod',[])
.service('secretariatContactDetails',['$http',function($http){	
	var __baseURL__ = 'https://api.mlab.com/api/1/databases/pheiti/collections/about-pheiti/';
    var __APIKEY__ = 'AkQtTxgkxLEYOQz9oFH85K3godWJNhtr';

    var dataService  = {
    	get : get,
        info : null
    }

    return dataService; 

    ////// 

	function get(){
		return $http({
            url:__baseURL__+'593caa34734d1d02258f2031?apiKey='+__APIKEY__,
            method:'GET'
        });
	}
    
}]);