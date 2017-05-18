cms.factory('UploadFactory',['$http','$location','$q',
	function($http,$location,$q){
	var UploadFactory = {
		newupload : function(data){
			var url = '../../be/functions/upload.php';
			var deferred = $q.defer();
			var promise = $http.post(url, data)
			.success(function (data, status, headers, config) {
				console.log('success')
				console.log(data)
		    	return data;
		    })
		    .error(function (data, status, headers, config) {
		    	console.log('error')
		    	console.log(data)
		    	return {"status": false};
		    });
		    return promise;
		}
	};
	return UploadFactory;
}])

