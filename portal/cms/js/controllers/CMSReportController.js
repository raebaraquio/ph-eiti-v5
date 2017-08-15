(function(){
	'use strict';

	angular
		.module('cms')
		.factory('reportFactory',reportFactory)
		.controller('CMSReportController',CMSReportController);

	reportFactory.$inject = ['$http'];
	function reportFactory($http){

	    var reportFactory = {
	        getReports : getReports,
	        getContent : getContent,
	        getContentAndTemplates : getContentAndTemplates,
	        getReportContentId : getReportContentId,
	        getReportingTemplates : getReportingTemplates
	    }

	    return reportFactory;

	    /////// 

	    function getReports(){
	        return $http({
	            url:'../../rest/functions/country-report/get-reports.php',
	            method:'GET'
	        });
	    }

	    function getContent(id){
	        var id = id ? '?id='+id : '';
	        return $http({
	            url:'../../rest/functions/country-report/get-report-content.php'+id,
	            method:'GET'
	        });
	    }

	    function getReportContentId(report,content){
	        var param_report = report ? ('?report='+report) : '';
	        var param_content = content ? ('&content='+content) : '';
	        return $http({
	            url:'../../rest/functions/country-report/get-ids.php'+param_report+param_content,
	            method:'GET'
	        });
	    }

	    function getContentAndTemplates(ids,report,content){
	        var crid = ids.crid_fk ? '?report_id='+ids.crid_fk : '';
	        var content_id = ids.crcontent_id ? '&content_id='+ids.crcontent_id : '';
	        var content_title = content ? '&content_title='+content : '';
	        return $http({
	            url:'../../rest/functions/country-report/get-content-and-reporting-templates.php'+crid+content_id+content_title,
	            method:'GET'
	        });
	    }

	    function getReportingTemplates(){
	        return $http({
	            url:'../../rest/functions/country-report/get-reporting-templates.php',
	            method:'GET'
	        });
	    }
	}


	CMSReportController.$inject = ['$scope','sessionService','reportFactory'];
	function CMSReportController($scope,sessionService,reportFactory) {
		if (sessionService.inSession()===false) {
			window.location.href = '../../portal/';
		}
		$scope.user = {
			id:sessionService.userProperty('id'),
			name:sessionService.userProperty('name'),
			position:sessionService.userProperty('position'),
			email:sessionService.userProperty('email'),
			mobile:sessionService.userProperty('mobile'),
			piclocation:sessionService.userProperty('piclocation')
		}
		
		if ($scope.user.mobile === undefined) {
			$scope.user.mobile = ''	
		}

		$scope.selectedReport = "";
		$scope.selectedReportObj = {};
		$scope.current_report = {};
		function getReports(){
			$scope.countryreports = [];
			$scope.getpromise = reportFactory.getReports();
			$scope.getpromise.then(function(response){
				console.log(response)
				delete $scope.getpromise;
				if (response.data) {
					$scope.countryreports = response.data;
					$scope.selectedReport = $scope.countryreports[0].title;
					$scope.selectedReportObj = $scope.countryreports[0];
					getReportContent($scope.selectedReportObj);
				}
			},function(err){
				delete $scope.getpromise;
			});
		}

		function getReportContent(report){
			$scope.getpromise = reportFactory.getContent(report.crid);
			$scope.getpromise.then(function(response){
				console.log(response)
				console.log('content')
				delete $scope.getpromise;
				$scope.current_report.content = [];
				if (response.data) {
					$scope.current_report.content = response.data;
				}
			},function(err){
				delete $scope.getpromise;
			});
		}

		getReports();

		$scope.open_file = function(link,file){
			if (link) {
				try {
					ga('send', 'event', 'Files', 'opened', $scope.current_report.title+' : '+file.title);	
				}
				catch(gaError){
					console.log('GA - '+gaError)
				}
				window.open('../'+link)	
			}
			else {
				alert('Document not yet available.')
			}
		}

		$scope.setSelectedReport = function() {
			console.log($scope.selectedReport)
			if ($scope.selectedReport) {
				for (var i=0;i<$scope.countryreports.length;i++) {
					if ($scope.countryreports[i].title===$scope.selectedReport) {
						$scope.selectedReportObj = $scope.countryreports[i];
						getReportContent($scope.selectedReportObj);
						return;
					}
				}
			}
		}

	}
})();
