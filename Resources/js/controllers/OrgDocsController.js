resourcesApp.controller('OrgDocsController',['$scope','$location','resourcesDataFactory',
	function($scope,$location,resourcesDataFactory){

	$scope.selected_folder = {};
	$scope.orgdocs = {};

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
			ga('send', 'event', 'Files', 'opened', 'Organizational Documents : '+file.file_title);	
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

	function getOrgDocs(folder){
		$scope.getpromise = resourcesDataFactory.getAll('OrgDocs');
		$scope.getpromise.then(function(response){
			delete $scope.getpromise;

			$scope.orgdocs.subfolders = response.data.subfolders;

			if (response.data.subfolders) {
				for (var idx=0;idx<$scope.orgdocs.subfolders.length;idx++) {
					if ($scope.orgdocs.subfolders[idx].files) {
						$scope.orgdocs.subfolders[idx].files = parseInt($scope.orgdocs.subfolders[idx].files,10);
					}
					if (folder===$scope.orgdocs.subfolders[idx].folder_id){
						$scope.selected_folder = $scope.orgdocs.subfolders[idx];
						$scope.selected_folder.files = [];
						try {
							ga('send', 'event', 'Pages', 'loaded', 'Organizational Documents : '+$scope.selected_folder.folder_name);	
						}
						catch(gaError){
							console.log('GA - '+gaError)
						}
					}
				}
			}

			$scope.orgdocs.files = response.data.files;
			if ($scope.selected_folder && folder) {
				for (var idx=0;idx<$scope.orgdocs.files.length;idx++){
					if ($scope.orgdocs.files[idx].folder_id===folder) {
						$scope.selected_folder.files.push($scope.orgdocs.files[idx]);
					}
				}
			}
		},function(err){
			delete $scope.getpromise;
		});		
	}

	$scope.$on('$routeChangeSuccess', function(){
		var loc = $location.path().split('/')
		var currloc = $location.path();
		
		switch(loc[loc.length-1]){
			case 'Organizational-Documents':
				try {
					ga('send', 'event', 'Pages', 'loaded', 'Resources : Organizational Documents');	
				}
				catch(gaError){
					console.log('GA - '+gaError)
				}
				getOrgDocs();
				break;

			default:
				if (!$scope.orgdocs.subfolders) {
					getOrgDocs(loc[loc.length-1]);

				}
				break;
		}
		
    });

}]);