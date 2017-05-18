cms.factory('NewsFactory', function($http,$location){
	var NewsFactory = {
		getnews :  function(data) {
			var promise = $http({
	            url:'../../rest/functions/news-get.php',
	            method: 'POST',
	            data:data
	        })
	        return promise;
		},
		get : {
			pages : function(data){
				var promise = $http({
		            url:'../../rest/functions/news-get-pages.php',
		            method: 'POST',
		            data:data
		        })
		        return promise;		
			},
			total : function(data){
				var promise = $http({
		            url:'../../rest/functions/news-get-total.php',
		            method: 'POST',
		            data:data
		        })
		        return promise;			
			}
		}
	};

	return NewsFactory;
})