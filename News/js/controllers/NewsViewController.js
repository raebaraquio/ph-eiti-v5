newsApp.controller('NewsViewController',['$scope','NewsFactory','$sce','$rootScope','$location',
	function($scope,NewsFactory,$sce,$rootScope,$location){
	
	$scope.newsType = '';
	$scope.newsTypesForDb = NewsFactory.getTypes();
	$scope.article = {};
	$scope.selected_id = '';

	var loc = $location.path().split('/');
	if (loc.length===3) {
		$scope.selected_type = loc[loc.length-2];	
		$scope.selected_id = loc[loc.length-1];	
		$scope.newsType = NewsFactory.types[$scope.selected_type];
	}
	else {
		$location.path('/')
	}
	
	var get = {
		news : function() {
			$scope.article = {}
			$scope.lastUpdated = ""
			var obj = {
				id:'',
				section:$scope.newsTypesForDb[$scope.selected_type],
				published:true,
				page:'index'
			}
			$scope.newspromise = NewsFactory.getnews(obj);
			$scope.newspromise.then(function(data){
				if (typeof(data.data) == 'string') {
				}
				else {
					var news = data.data
					for (var i=0;i<news.length;i++) { 
						if (news[i].id===$scope.selected_id) {
							if (news[i].content != null && news[i].content != '') {
								news[i].content = $sce.trustAsHtml('<div style="font-size:13px;">'+news[i].content+'</div>');
							}
							$scope.article = news[i]
						}						
					}	
				}
				delete $scope.newspromise
			})
		}
	}

	get.news();
	
	function shorten(text, maxLength) {
	    var ret = text;
	    if (ret.length > maxLength) {
	        ret = ret.substr(0,maxLength-3) + "...";
	    }
	    return ret;
	}
}])