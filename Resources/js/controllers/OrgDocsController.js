resourcesApp.controller('OrgDocsController',['$scope','ResourcesFactory','$location',
	function($scope,ResourcesFactory,$location){
	$scope.orgdocs = ResourcesFactory.orgdocs();
	$scope.selected_folder = {}

	$scope.goto_file = function(link) {
		if (link!=''){
			window.open('../'+link); //window.open('../../'+link)
		}
		else {
			alert('Document not yet available.')
		}
	}

	$scope.openFile=function(link,file){
		try {
			ga('send', 'event', 'Files', 'opened', 'Organizational Documents : '+file.title);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		window.open(link)
	}

	$scope.openFolder=function(folder,folderObj){
		try {
			ga('send', 'event', 'Pages', 'loaded', 'Organizational Documents : '+folderObj.folder_name);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		$location.path('/Organizational-Documents/'+folder)
	}

	$scope.$on('$routeChangeSuccess', function(){
		var loc = $location.path().split('/')
		var currloc = $location.path();
		if ($scope.orgdocs) {
			for (var idx=0;idx<$scope.orgdocs.subfolders.length;idx++){
				if ($scope.orgdocs.subfolders[idx].folder_id===loc[loc.length-1]) {
					$scope.selected_folder = $scope.orgdocs.subfolders[idx]
					try {
						ga('send', 'event', 'Pages', 'loaded', 'Organizational Documents : '+$scope.selected_folder.folder_name);	
					}
					catch(gaError){
						console.log('GA - '+gaError)
					}
				}
			}
		}
		if (!$scope.selected_folder.folder_name) {
			try {
				ga('send', 'event', 'Pages', 'loaded', 'Resources : Organizational Documents');	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
		}
    })

}]);