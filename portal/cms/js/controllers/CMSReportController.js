var creportscope;
(function(){
	'use strict';

	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('reportFactory',reportFactory)
		.controller('CMSReportController',CMSReportController)
        .controller('addReportController',addReportController)
        .controller('addFilesController',addFilesController);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

	reportFactory.$inject = ['$http'];
	function reportFactory($http){

	    var reportFactory = {
	        getReports : getReports,
	        getContent : getContent,
	        getContentAndTemplates : getContentAndTemplates,
	        getReportContentId : getReportContentId,
	        getReportingTemplates : getReportingTemplates,
	        addReport : addReport
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

	    function addReport(data){
	    	return $http({
	            url:'../../rest/functions/country-report/add-report.php',
	            method:'POST',
	            data: data
	        });
	    }
	}


	CMSReportController.$inject = ['$scope','sessionService','reportFactory','$mdDialog'];
	function CMSReportController($scope,sessionService,reportFactory,$mdDialog) {
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
            $scope.selectedReport = "";
            $scope.selectedReportObj = {};
            $scope.current_report = {};
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

					var reports = response.data;
					var lastCoveredYr = parseInt(reports[reports.length-1].year,10);
					var coveredYr = lastCoveredYr + 1;
					localStorage.setItem('coveredYr',coveredYr);
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
                    localStorage.setItem('selectedReport',JSON.stringify(report));
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

		/////////////// 

        $scope.addCountryReport=function(evt){
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addReportController;
            mdDialogObj.templateUrl = 'partials/Country Report/add-report.template.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
                getReports();
                localStorage.removeItem('coveredYr');
            },function() {
                getReports();
                localStorage.removeItem('coveredYr');
            });
            
        }


        $scope.addReportFile=function(evt){
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addFilesController;
            mdDialogObj.templateUrl = 'partials/Country Report/add-files.template.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
                getReports();
                localStorage.removeItem('selectedReport');
            },function() {
                getReports();
                localStorage.removeItem('selectedReport');
            });
        }
	}

	addReportController.$inject = ['$scope','$mdDialog','reportFactory'];
    function addReportController($scope,$mdDialog,reportFactory){
    
        $scope.errorMessage = "";       

        function init(){
	        $scope.newreport = {
	            title: '',
	            coverage: '',
	            month: 'December',
	            year: localStorage.getItem('coveredYr')
	        }

	        $scope.newreport.coverage = $scope.newreport.month+' '+$scope.newreport.year;        	
        }

		init();       

        $scope.resetForm = function(evt) {
			init();
        }

        $scope.close=function(){
            $mdDialog.hide();   
        }

        $scope.submitNewReport=function(){
        	var p = reportFactory.addReport($scope.newreport);
        	p.then(function(response){
        		if (response) {
        			if (response.data) {
        				if (response.data.success==true) {
        					$scope.close();		
        				}
        			}
        		}
        	},function(err){
        		console.log(err)
        	})
        }
    }

    addFilesController.$inject = ['$scope','$mdDialog','reportFactory'];
    function addFilesController($scope,$mdDialog,reportFactory){
    	$scope.errorMessage = "";    
        $scope.uploadReturnData = {};
        $scope.contentTypes = [ 'Country Report',
        						'Completed Reporting Templates',
        						'Data Summary Template',
                                'Executive Summary',
        						'Key Findings',
                                'Annex',
                                'Production Data',
                                'New Folder'];

        $scope.sectors = ['Companies','Government'];
        $scope.selectedReport = JSON.parse(localStorage.getItem('selectedReport'));
        var totalFiles = 0;
        var maxNum = 3;

        $scope.reportContent = {
            type : $scope.contentTypes[0],
            files : [],
            newfolder : '',
            sector: $scope.sectors[0]
        }

        $scope.thumbdata = [];

        function init(){
            $scope.reportContent.files = [];           
            for (var idx=0;idx<maxNum;idx++) {
                $scope.reportContent.files.push({
                    file: null,
                    title: '',
                    thumbnail_data: null
                });         
            }
        }

        init();

        $scope.onFileChanged = function (evt) {
            $scope.$apply(function() {
                var idlen = evt.target.id.split('-');
                var idx = idlen[idlen.length-1];
                if (document.getElementById(evt.target.id).files[0]===undefined) {
                    $scope.reportContent.files[idx].file = null;    
                    checkFile(idx,false);
                }
                else {
                    $scope.reportContent.files[idx].file = document.getElementById(evt.target.id).files[0];
                    checkFile(idx,true);
                }                
            });
        };


        function doWatch(idx){
            if (idx===0) {
                try {
                    document.getElementById("hidden-elem-container").innerHTML = "";
                }
                catch(e){
                    console.log(e)
                }
            }
            $scope.$watch('reportContent.files['+idx+'].thumbnail_data', function(v){
                if (v) {                    
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    input.setAttribute("name", "thumbdata-"+idx);
                    input.setAttribute("id", "thumbdata-"+idx);
                    input.setAttribute("value", v);
                    document.getElementById('hidden-elem-container').appendChild(input);
                }
            });
        }

        function checkFile(idx,mode) {
            if ($scope.reportContent.files[idx]) {
                if (mode===true) {
                    if ($scope.reportContent.files[idx].file!==null) { 
                        totalFiles++;
                        document.getElementById('newrepcontent-filecount').value = totalFiles;
                        doWatch(idx);
                    }    
                }                
            }
        }

        $scope.resetForm = function(evt) {
            totalFiles = 0;
            if ($scope.reportContent.files) {
                for (var idx=0;idx<$scope.reportContent.files.length;idx++) {
                    $scope.reportContent.files[idx].thumbnail_data = null;
                }
                document.getElementById("hidden-elem-container").innerHTML = "";
            }
        }

        $scope.$watch('uploadReturnData', function(v){
            if (v) {
                try {
                    console.log(v);
                    console.log('return data ^^^');
                    if (v.success===true) {
                        // $scope.resetForm();
                        var resetBtn = document.getElementById('newrepcontent-btn-reset');
                        resetBtn.click();
                        $mdDialog.hide();
                    }
                }
                catch(e){}
            }
        });

        $scope.$watch('reportContent.type',function(v){
            if (v) {
                switch(v) {
                    case 'Data Summary Template':
                        maxNum = 1;
                        break;
                    case 'Country Report':
                        maxNum = 2;
                        break;
                    case 'Key Findings':
                        maxNum = 2;
                        break;
                    case 'Completed Reporting Templates':
                        maxNum = 8;
                        break;
                    case 'Annex':
                        maxNum = 1;
                        break;
                    case 'Production Data':
                        maxNum = 1;
                        break;
                    case 'Executive Summary':
                        maxNum = 1;
                        break;
                    case 'New Folder':
                        maxNum = 3;
                        break;
                }
                if (v!=='Completed Reporting Templates') {
                    document.getElementById('newrepcontent-sector').value = "";
                }
                else {
                    $scope.reportContent.sector = 'Companies';
                }
                if (v!=='New Folder') {
                    document.getElementById('newrepcontent-newfolder').value = "";
                }
                totalFiles = 0;
                document.getElementById("hidden-elem-container").innerHTML = "";
                init();
            }
        });

        $scope.close=function(){
            $mdDialog.hide();   
        }

    	creportscope = $scope;
    }

})();

function newCreportReturn(){
    var iframe = document.getElementById('newcrepcontent-iframe')
    var returnData = iframe.contentDocument.body.innerHTML;
    if (creportscope) {
        try {
            if (returnData!=="unsubmitted" && returnData!=="") {
                var responseData = JSON.parse(returnData);
                creportscope.uploadReturnData = responseData;
                creportscope.$apply();   
            }
        }
        catch(e){
            console.log(e)
        }       
    }
}