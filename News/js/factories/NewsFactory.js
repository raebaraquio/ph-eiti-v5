newsApp.factory('NewsFactory',['$http','$location',
	function($http,$location){
	var NewsFactory=null;
	var __baseURL__ = 'https://api.mlab.com/api/1/databases/pheiti/collections/newsletter/';
    var __APIKEY__ = 'AkQtTxgkxLEYOQz9oFH85K3godWJNhtr';
	NewsFactory = {
		getTypes:function(){
			return {
				'Media-Releases': 'Media Releases',
				'PH-EITI-In-the-News':'PH-EITI in the News',
				'PH-EITI-Newsroom':'PH-EITI Newsroom',
				'Archive':'Archive'
			}
		},
		types: {
			'Media-Releases': 'Media Releases',
			'PH-EITI-In-the-News':'PH-EITI In the News',
			'PH-EITI-Newsroom':'PH-EITI Newsroom',
			'Archive':'Archive'
		},
		getnews : function(data){
			var p = $http({
				url: '../rest/functions/news-get.php',
				method: 'POST',
				data: data
			});
			return p;
		},
		getcount: function(data){
			var p = $http({
	            url:'../rest/functions/news-get-count.php',
	            method: 'POST',
	            data:data
	        });
	        return p;
		},
		getpagednews :  function(data) {
			var p = $http({
	            url:'../rest/functions/news-get-pagination.php',
	            method: 'POST',
	            data:data
	        });
	        return p;
		},
		newsletter: function(){
			return $http({
                url:__baseURL__+'59454d31734d1d59b7891061?apiKey='+__APIKEY__,
                method:'GET'
            });
		}
	}
	return NewsFactory;
}]);