activitiesApp.controller('ActivitiesController',['$scope','ActivitiesFactory','$sce','$location',
	function($scope,ActivitiesFactory,$sce,$location){

	$scope.activites = []
	$scope.years = []	

	var start = 2012, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}

	$scope.filterYear = $scope.years[0]-1
	$scope.filterKeyword = ''

	$scope.activity = {}
	$scope.active_activity_tab = ''
	$scope.dateLastUpdated = ActivitiesFactory.lastUpdatedDate();

	$scope.select_act_tab = function(tab){
		$scope.active_activity_tab = tab;
	}

	$scope.get = {
		activities : function() {
			
			$scope.activity = {}
			$scope.activities = []
			$scope.no_content_elem = false;

			$scope.activities = ActivitiesFactory.get();
			
			if ($location.path()!='/') {
				var act = $location.path().split('/')[1]
				for (var k in $scope.activities) {
					if ($scope.activities[k].id == act) {
						$scope.activity = $scope.activities[k];

						if ($scope.activity.writeup != null) {
							if ( $scope.activity.writeup.content != null) {
								$scope.activity.writeup.content = $sce.trustAsHtml('<div>'+$scope.activity.writeup.content+'</div>');		
							}
						}

						if ($scope.activity.writeup == null && 
							$scope.activity.program == null && 
							$scope.activity.documentation == null  && 
							$scope.activity.presentations == null  &&
							$scope.activity.gallery == null) {
							$scope.no_content_elem = true;
						}
						if ($scope.activity.program) {
							$scope.activity.program = '../'+$scope.activity.program; // '../../'
						}
						
						if ($scope.activity.documentation) {
							$scope.activity.documentation = '../'+$scope.activity.documentation	; // '../../'
							if ($scope.activity.documentation.length) {
								if ($scope.activity.documentation[0]) {
									$scope.activity.documentation[0] = '../'+$scope.activity.documentation[0]; // '../../'
								}
								if ($scope.activity.documentation[1]) {
									$scope.activity.documentation[1] = '../'+$scope.activity.documentation[1]; // '../../'
								}
							}
						}
						
						if ($scope.activity.gallery !== null) {
							// $('#myGallery').empty();
			    //             $.each($scope.activity.gallery, function(idx,img){
			    //                 $("#myGallery").append('<li><img src="'+img.src+'"/></li>');
			    //             });
			    //             $('#myGallery')
			    //             .off()
			    //             .galleryView({
			    //                 panel_width: 600,
			    //                 panel_height: 300,
			    //                 frame_width: 120,
			    //                 frame_height: 90
			    //             });
						}

						if ($scope.activity.writeup !== null) {
							$scope.select_act_tab('About')
							return
						}

						if ($scope.activity.program !== null) {
							$scope.select_act_tab('Program')
							return
						}

						if ($scope.activity.documentation !== null) {
							$scope.select_act_tab('Documentation')
							return
						}

						if ($scope.activity.presentations !== null) {
							$scope.select_act_tab('Presentations')
							return
						}

						if ($scope.activity.gallery !== null) {
							$scope.select_act_tab('Gallery')
							return
						}
					}
				}
			}
		}
	}

	$scope.get.activities();

	$scope.download_documentation =  function(src) {
		// window.open('../../'+src);
		window.open('../'+src)
	}

	$scope.type_of_doc = function(d) {
		return typeof(d);
	}

}]);