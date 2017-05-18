cms.factory('CMSFactory', function($http,$location){
	var CMSFactory = {
		news : {
			add : function(data) {
				var promise = $http({
		            url:'../../rest/functions/cms-news/add.php',
		            method: 'POST',
		            data:data
		        })
		        return promise;
			},
			update : function(data) {
				var promise = $http({
		            url:'../../rest/functions/cms-news/update.php',
		            method:'POST',
		            data:data
		        })
		        return promise;
			},
			doAction : function(data) {
				var promise = $http({
		            url:'../../rest/functions/cms-news/update-action.php',
		            method:'POST',
		            data:data
		        })
		        return promise;
			},
			edit: function(data) {
				var promise = $http({
		            url:'../../rest/functions/cms-news/edit.php',
		            method:'POST',
		            data:data
		        })
		        return promise;
			}
		},
		media : {
			get : function(data) {
				var promise = $http({
		            url:'../../rest/functions/cms-media/get.php',
		            method: 'POST',
		            data:data
		        })
		        return promise;	
			}
		}	
	};
	return CMSFactory;
})