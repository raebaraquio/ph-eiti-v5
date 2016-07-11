countryReportApp.controller('CountryReportCtrl',['$scope','CountryReportFactory','$location',
	function($scope,CountryReportFactory,$location){
	$scope.counryreports = []
	$scope.lastUpdated = CountryReportFactory.lastupdated;
	var get = {
		countryreport : function() {
			$scope.countryreports = CountryReportFactory.get();
		},
		creport: function(id){
			var p = CountryReportFactory.get();
			for (var k in p) {
				if (p[k].id == id) {
					$scope.current_report = p[k]
					break;
				}
			}
		},
		annex: function(report,annex) { 
			var p = CountryReportFactory.get();
			for (var k in p) {
				if (p[k].id == report) { 
					$scope.current_report = p[k]
					break;
				}
			}
			for (var a in $scope.current_report.content) {
				if ($scope.current_report.content[a]) {
					if ($scope.current_report.content[a].href == annex) {
						$scope.current_annex = $scope.current_report.content[a];
						$scope.refresh_annexTemplate()
						break;
					}	
				}
			}
		}
	}

	$scope.active_country_report = ''
	$scope.active_country_report_link = ''
	$scope.$on('$routeChangeSuccess', function(){
		$scope.current_report = { title: '', annexes: ''}
		var loc = $location.path().split('/')
		var currloc = $location.path()
        switch (loc.length) {
        	case 2:
        		if (currloc=='/') {
					get.countryreport();
        		}
        		else {
					get.creport(loc[loc.length-1]);
        		}
        		break;
            case 3:
            	var ar = loc[loc.length-2].split('-');
            	$scope.active_country_report_link = loc[loc.length-2];
            	$scope.active_country_report = ar.join(' ');
            	get.annex(loc[loc.length-2],loc[loc.length-1]);
            	break;
        }
    })

	$scope.goto_activity = function(id) {
		$location.path('/'+id);
	}

	$scope.open_file = function(link){
		if (link) {
			window.open(link)	
		}
		else {
			alert('Document not yet available.')
		}
	}
	
	$scope.shorten=function(text, maxLength) {
        var ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + "...";
        }
        return ret;
    }

	$scope.completedTemplates = []
	$scope.selected_AnnexTemplate = 'Companies'

	$scope.refresh_annexTemplate = function(){
		if ($scope.current_annex.templates) {
			$scope.completedTemplates = $scope.current_annex.templates[$scope.selected_AnnexTemplate]	
		}
	}

	// $("html, body").animate({ scrollTop: 0 }, "slow");

}]);