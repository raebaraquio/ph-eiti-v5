countryReportApp.controller('CountryReportCtrl',['$scope','$location','dataFactory','utilsService',
	function($scope,$location,dataFactory,utilsService){
	$scope.counryreports = []

	var get = {
		countryreport : function() {
			$scope.countryreports = [];
			$scope.getpromise = dataFactory.getReports();
			$scope.getpromise.then(function(response){
				delete $scope.getpromise;
				if (response.data) {
					$scope.countryreports = response.data;
				}
			},function(err){
				delete $scope.getpromise;
			});
		},
		creport: function(report_title){
			$scope.getpromise = dataFactory.getReports();
			$scope.getpromise.then(function(response){
				if (response.data) {
					var p = response.data;
					for (var k in p) {
						if (p[k].title == report_title) {
							$scope.current_report = p[k];
							get.reportContent(p[k]);
							try {
								ga('send', 'event', 'Pages', 'loaded', 'Country Reports : '+p[k].title);	
							}
							catch(gaError){
								console.log('GA - '+gaError)
							}
							break;
						}
					}
				}
			},function(err){
				delete $scope.getpromise;
			});
		},
		contentAndTemplates: function(ids,report_title,content_title){
			$scope.getpromise = dataFactory.getContentAndTemplates(ids,report_title,content_title);
			$scope.getpromise.then(function(response){
				delete $scope.getpromise;
				if (response.data) {
					var data = response.data;
					var templatesObj = {};
					var sectorArr = [];
					var otherFiles = [];
					$scope.current_annex = data.annex;
					if (data.completedTemplates.length > 0) {
						for (var idx=0;idx<data.completedTemplates.length;idx++){
							if (utilsService.inArr(sectorArr,data.completedTemplates[idx].sector)===false) {
								sectorArr.push(data.completedTemplates[idx].sector)
								templatesObj[data.completedTemplates[idx].sector] = [];
							}
							templatesObj[data.completedTemplates[idx].sector].push(data.completedTemplates[idx])
						}
						$scope.current_annex.templates = angular.copy(templatesObj);
					}
					if (data.files.length > 0) {
						$scope.current_annex.otherFiles = angular.copy(data.files);	
					}
					try {
						ga('send', 'event', 'Pages', 'loaded', 'Country Reports : '+$scope.current_annex.title);	
					}
					catch(gaError){
						console.log('GA - '+gaError)
					}
					$scope.refresh_annexTemplate();
				}
			},function(err){
				delete $scope.getpromise;
			});
		},
		contentids: function(report,content) { 
			$scope.getpromise = dataFactory.getReportContentId(report,content);
			$scope.getpromise.then(function(response){
				if (response.data) {
					get.contentAndTemplates(response.data,report,content)
				}
			},function(err){
				delete $scope.getpromise;
			});
		},
		reportContent: function(report){
			$scope.getpromise = dataFactory.getContent(report.crid);
			$scope.getpromise.then(function(response){
				delete $scope.getpromise;
				$scope.current_report.content = [];
				if (response.data) {
					$scope.current_report.content = response.data;
				}
			},function(err){
				delete $scope.getpromise;
			});
		}
	}

	$scope.active_country_report = ''
	$scope.active_country_report_link = ''
	$scope.$on('$routeChangeSuccess', function(){
		$scope.current_report = { title: '', annexes: ''}
		var loc = $location.path().split('/');
		var currloc = $location.path();
        switch (loc.length) {
        	case 2:
        		if (currloc=='/') {

        			// Country Report Index page
					get.countryreport();
					
					try {
						ga('send', 'event', 'Pages', 'loaded', 'Country Reports');	
					}
					catch(gaError){
						console.log('GA - '+gaError)
					}
        		}
        		else {
        			
        			// Country Report Drilldown
					get.creport(loc[loc.length-1]);
        		}
        		break;
            case 3:
            	var ar = loc[loc.length-2].split('-');
            	var curr_report = loc[loc.length-2];
            	var curr_page = loc[loc.length-1];

            	get.contentids(curr_report,curr_page);
            	$scope.active_country_report_link = curr_report;
            	$scope.active_country_report = curr_report;	
            	break;
        }
    })

	$scope.goto_activity = function(report) {
		$location.path('/'+report.title);
	}

	$scope.openPage=function(page) {
		$location.path('/'+page);	
	}

	$scope.open_file = function(link,file){
		if (link) {
			try {
				ga('send', 'event', 'Files', 'opened', $scope.current_report.title+' : '+file.title);	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
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