newsApp.factory('NewsFactory',['$http','$location',
	function($http,$location){
	var NewsFactory=null;
	NewsFactory = {
		getTypes:function(){
			return {
				'Media-Releases': 'Media Releases',
				'In-the-News':'PH-EITI in the News',
				'Archive':'Archive'
			}
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
		}
	}
	return NewsFactory;
}]);