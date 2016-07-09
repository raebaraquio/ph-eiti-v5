newsApp.controller('NewsController',['$scope','NewsFactory','$sce','$rootScope','$location',
	function($scope,NewsFactory,$sce,$rootScope,$location){
	$scope.newsTypes = NewsFactory.getTypes();
	
	$scope.lastUpdated = ""
	$scope.nearticle = {}
	$scope.totalNum = 0
	$scope.page = {
		limit : "5",
		num: 1
	}
	$scope.newspages = [];

	var loc = $location.path().split('/');
	$scope.selected_type = loc[loc.length-1];

	var get = {
		newsCount: function() {
			var obj = {
				id:'',
				section:$scope.newsTypes[$scope.selected_type], //'News and Events'
				published:true,
				page:'index'
			}

			var p = NewsFactory.getcount(obj);
			p.then(function(data){
				if (typeof(data.data) == 'string') {
				}
				else {
					if (data.data.count) {
						$scope.totalNum = data.data.count
						$scope.determineOffset()
					}
				}
			})
		},
		news : function() {
			$scope.nearticle = {}
			$scope.newsandevents = []
			$scope.lastUpdated = ""
			var obj = {
				id:'',
				section:$scope.newsTypes[$scope.selected_type],
				published:true,
				page:'newsIndex',
				pageLimit:$scope.page.limit,
				pageNum:$scope.page.num
			}
			$scope.newspromise = NewsFactory.getpagednews(obj);
			$scope.newspromise.then(function(data){
				if (typeof(data.data) == 'string') {
				}
				else {	
					$scope.newsandevents = data.data
					for (var i in $scope.newsandevents) { 
						if ($scope.newsandevents[i].brief != null && $scope.newsandevents[i].brief != '') {
							$scope.newsandevents[i].brief = $sce.trustAsHtml('<div style="font-size:13px;">'+shorten($scope.newsandevents[i].brief,300)+'</div>');
						}
						if (i==0) {
							$scope.lastUpdated = $scope.newsandevents[i].dateposted
						}
					}
				}
			})
		}
	}

	$rootScope.$on('$routeChangeSuccess', function(next, current) { 
		try {}catch(err){}
	});
	
	get.newsCount();

	$scope.determineOffset = function(action) {	
		$scope.newspages = []
		var newspages = []
		var numpages = Math.floor($scope.totalNum / parseInt($scope.page.limit,10))
		var extra = $scope.totalNum%(parseInt($scope.page.limit,10))
		if (extra > 0) {
			numpages = numpages + 1
		}
		for (var i=1;i<=numpages;i++) {
			newspages.push(i)
		}

		$scope.newspages = newspages;
		if (action) {
			if (action=="p") {
				$scope.page.num = $scope.page.num-1;
			}
			else if (action=="n") {
				$scope.page.num = $scope.page.num+1;	
			}
		}
		get.news()
	}

	function shorten(text, maxLength) {
	    var ret = text;
	    if (ret.length > maxLength) {
	        ret = ret.substr(0,maxLength-3) + "...";
	    }
	    return ret;
	}

	$scope.openNews=function(article){
		$location.path('/'+$scope.selected_type+'/'+article.id)
	}
}])