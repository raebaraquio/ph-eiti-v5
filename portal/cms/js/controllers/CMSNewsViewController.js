cms.controller('CMSViewNewsController',['$scope','NewsFactory','$location','$sce','UploadFactory','CMSFactory',
	function($scope,NewsFactory,$location,$sce,UploadFactory,CMSFactory){
	$scope.nearticle = {}
	$scope.article = {
		sectionHref:"",
		section: ""
	}

	var loc = $location.path().split("/")
	$scope.article.sectionHref = loc[1];
	switch(loc[1]) {
		case "EITI-in-other-Countries" : $scope.article.section = "EITI in other Countries"; break;
		case "Blogs" : $scope.article.section = "Blogs"; break;
		case "News" : $scope.article.section = "News"; break;
		case "MSG-Member-of-the-Month" : $scope.article.section = "MSG Member of the Month"; break;
		default:
			$scope.article.section = loc[1];
			break;
	}

	var get = {
		news : function() {
			
			$scope.nearticle = {}
			$scope.newsandevents = []
			var section = $scope.article.section;
			if (loc[1]=='News') {
				section = 'News and Events'
			}
			var obj = {
				id:'',
				section:section,
				published:null,
				page:'index'
			}

			$scope.newspromise = NewsFactory.getnews(obj);
			$scope.newspromise.then(function(data){
				if (typeof(data.data) == 'string') {

				}
				else {	
					var loc = $location.path().split("/")
					var articleId = loc[loc.length-1]
					var newsandevents = data.data
					for (var i in newsandevents) {
						if (newsandevents[i].id == articleId) {
							if (newsandevents[i].content != null && newsandevents[i].content != '') {
								newsandevents[i].content = $sce.trustAsHtml('<div style="font-size:13px;">'+newsandevents[i].content+'</div>');
							}
							$scope.nearticle = newsandevents[i]
						}
					}
				}
			})
		}
	}

	get.news();

}]);