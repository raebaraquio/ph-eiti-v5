var reptempscope;
(function(){
	'use strict';

	angular
		.module('cms')
		.factory('reportingTemplateDataFactory',reportingTemplateDataFactory)
		.controller('CMSReportingTemplatesController',CMSReportingTemplatesController)
		.controller('addReportingTemplateController',addReportingTemplateController);

	reportingTemplateDataFactory.$inject = ['$http'];
	function reportingTemplateDataFactory($http){

	    var reportingTemplateDataFactory = {
	        getReports : getReports,
	        getContent : getContent,
	        getContentAndTemplates : getContentAndTemplates,
	        getReportContentId : getReportContentId,
			getReportingTemplates : getReportingTemplates,
			deleteTemplate: deleteTemplate
	    }

	    return reportingTemplateDataFactory;

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
		
		function deleteTemplate(id){
			return $http({
	            url:'../../rest/functions/reporting-templates/delete-reporting-template.php?id='+id,
	            method:'GET'
	        });
		}
	}


	CMSReportingTemplatesController.$inject = ['$scope','sessionService','reportingTemplateDataFactory','$mdDialog']
	function CMSReportingTemplatesController($scope,sessionService,reportingTemplateDataFactory,$mdDialog) {
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

		function getReportingTemplates(){
			$scope.sectors = [];
			$scope.years = [];
			$scope.sectorTemplates = [];

			$scope.getpromise = reportingTemplateDataFactory.getReportingTemplates();
			$scope.getpromise.then(function(response){
				delete $scope.getpromise;
				
				$scope.sectors = response.data.sectors;
				$scope.filterSector = 'Industry';

				$scope.years = response.data.years;
				$scope.filterYear = $scope.years[0];

				try {
					var d = new Date();
					if ($scope.years[0]!==d.getFullYear().toString()) {
						var addYears = [], newYears = [];
						var diff = ( d.getFullYear() - parseInt($scope.years[0],10) );
						for (var idx=1;idx<(diff+1);idx++) {
							addYears.push( (parseInt($scope.years[0],10)+((diff+1)-idx)).toString() );
						}
						newYears = addYears.concat($scope.years);
						localStorage.setItem('years',newYears.join(','));
					}
				}
				catch(e){}
				
				$scope.templates = response.data.templates;
				
			},function(err){
				delete $scope.getpromise;
			});	
		}
		
		getReportingTemplates();

		$scope.open_file=function(src,file){
			try {
				ga('send', 'event', 'Files', 'opened', "Reporting Templates ("+$scope.filterYear+") : "+file.title);	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
			window.open('../'+src)
		}

		$scope.addRepTemp=function(evt){
			var template = '';
			
			var mdDialogObj = {
				parent: angular.element(document.getElementById('cms-content-placeholder')),
				targetEvent: evt,
				clickOutsideToClose:false,
				fullscreen: true				
			};
			
			mdDialogObj.templateUrl = 'partials/Reporting Templates/add-reporting-template.template.html';
			mdDialogObj.controller = addReportingTemplateController;
			mdDialogObj.fullscreen = true;
			
			$mdDialog.show(mdDialogObj)
			.then(function(answer) {
				getReportingTemplates();
			},function() {
				getReportingTemplates();
			}); 
		}

		$scope.confirmDelete=function(evt,resourceType,data) {
            console.log(data)
			var resourceName = data.title;
			var rtid = data.rtid;
			var confirm = $mdDialog.confirm()
				.title('Delete '+resourceType+'?')
				.textContent('This action will permanently delete the selected '+resourceType+' ('+resourceName+'). What would you like to do?')
				.targetEvent(evt)
				.ok('Yes, Delete '+resourceType)
				.cancel("No, Don't Delete "+resourceType);

			$mdDialog.show(confirm).then(function() {
				$scope.deletePromise = reportingTemplateDataFactory.deleteTemplate(rtid);
				$scope.deletePromise.then(function(response){
					console.log(response)
					if (response.data.success) {
                        getReportingTemplates();
					}
					delete $scope.deletePromise;
				},function(err){
					console.log(err)
                    getReportingTemplates();
					delete $scope.deletePromise;
				});		
			}, function() {
				// do nothing
			});
		}
	}

	addReportingTemplateController.$inject = ['$scope','$mdDialog'];
	function addReportingTemplateController($scope,$mdDialog){
		$scope.errorMessage = "";		
		$scope.uploadReturnData = {};
		$scope.years = localStorage.getItem('years').split(',');
		$scope.sectors = ["Government Agencies","Industry"];
		$scope.industries = ['Coal Companies','Mining Companies','Oil and Gas Companies'];
		$scope.newreptemp = {
			sector: 'Government Agencies',
			title: '',
			agency: '',
			industry: '',
			file: null,
			year: ''
		}
		$scope.onFileChanged = function () {
			$scope.$apply(function() {
				$scope.newreptemp.file = document.getElementById('rt-fileinput').files[0];
			});
		};

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.newreptemp = {
							sector: 'Government Agencies',
							title: '',
							agency: '',
							industry: '',
							file: null,
							year: ''
						}
						$mdDialog.hide();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}

		reptempscope = $scope;
	}

})();


function newRepTemplateReturn() {
	var iframe = document.getElementById('newreptemplate-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (reptempscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				reptempscope.uploadReturnData = responseData;
				reptempscope.$apply()
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}