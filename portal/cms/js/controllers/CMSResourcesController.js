var aprscope,giscope,infoscope,brochurescope,wplanscope,studiesscope,lawscope,orgdocscope;
(function(){
	'use strict';

	angular
		.module('cms')
		.factory('ResourcesDataFactory',ResourcesDataFactory)
		.controller('CMSResourcesController',CMSResourcesController)
		.controller('addResourceController',addResourceController)
		.controller('addGIScontroller',addGIScontroller)
		.controller('addBrochureController',addBrochureController)
		.controller('addInfographicsController',addInfographicsController)
		.controller('addWplanController',addWplanController)
		.controller('addStudiesController',addStudiesController)
		.controller('addLawController',addLawController)
		.controller('addOrgDocController',addOrgDocController);

	ResourcesDataFactory.$inject = ['$http'];
	function ResourcesDataFactory($http){
		var __baseURL__ = 'https://api.mlab.com/api/1/databases/pheiti/collections/resources/';
	    var __APIKEY__ = 'AkQtTxgkxLEYOQz9oFH85K3godWJNhtr';

		var ResourcesDataFactory = {
			getContent: getContent,
			getTypes : getTypes,
			getAll : getAll,
			addAPR : addAPR
		};
		return ResourcesDataFactory;
		
		///////////////////////////////

		// function get(){
		// 	return $http({
		//            url:'../../rest/functions/cms-resources/get.php',
		//            method: 'GET'
		//        });
		// }

	    function getContent(){
	        return $http({
	            url:__baseURL__+'5944f87a734d1d59b788fc08?apiKey='+__APIKEY__,
	            method:'GET'
	        });
	    }

	    function getTypes(){
	        return $http({
	            url:__baseURL__+'59733775f36d2812888d8e00?apiKey='+__APIKEY__,
	            method:'GET'
	        });
	    }	    

	    function getAll(content){
	        return $http({
	            url:'../../rest/functions/resources/getAll.php?content='+content,
	            method:'GET'
	        });
	    }

	    function addAPR(content) {
	    	return $http({
	            url:'../../rest/functions/resources/add-apr.php',
	            method:'POST',
	            // headers: {
	            //     'Content-Type': 'multipart/form-data'
	            // },
	            data: content
	        });
	    }

	}

	CMSResourcesController.$inject = ['$scope','ResourcesDataFactory','$mdDialog'];
	function CMSResourcesController($scope,ResourcesDataFactory,$mdDialog){
		// if (!sessionStorage.getItem('id')) {
		// 	window.location.href = '../../portal/';
		// }
		
		$scope.resources = [];
		$scope.resourceTypes = [];
		$scope.selectedResourceTypes = {};
		$scope.years = [];
		$scope.filterContentType = '';

		$scope.user = {
			id:sessionStorage.getItem('id'),
			name:sessionStorage.getItem('name'),
			position:sessionStorage.getItem('position'),
			email:sessionStorage.getItem('email'),
			mobile:sessionStorage.getItem('mobile'),
			piclocation:sessionStorage.getItem('piclocation')
		}
		
		if ($scope.user.mobile === undefined) {
			$scope.user.mobile = ''	
		}

		function getResourceTypes(){
			$scope.getpromise = ResourcesDataFactory.getTypes();
			$scope.getpromise.then(function(response){
				$scope.resourceTypes = response.data.content;
				$scope.selectedResourceType = $scope.resourceTypes[0].name;
				delete $scope.getpromise;
			},function(err){
				delete $scope.getpromise;
			});	
		}

		getResourceTypes();

		$scope.$watch('selectedResourceType',function(v){
			if (v){
				getContentPerType(v);
			}
		});

		function inArr(arr,str){
			if (arr) {
				for (var idx=0; idx<arr.length;idx++) {
					if (arr[idx]===str) {
						return true;
					}
				}
			}
			return false;
		}

		function getContentPerType(type){
			var useType = type;
			switch(type) {
				case 'Activity Reports':
					useType = 'APR';
					break;
				case 'BO Roadmap':
					useType = 'WorkPlan';
					break;
				case 'Brochures':
					useType = 'Infographics';
					break;
				case 'General Information Sheet':
					useType = 'GIS';
					break;
				case 'Laws and Legal Issuances':
					useType = 'Laws';
					break;
				case 'Organizational Documents':
					useType = 'OrgDocs';
					break;
				case 'Work Plan':
					useType = 'WorkPlan';
					break;
			}

			$scope.getpromise = ResourcesDataFactory.getAll(useType);
			$scope.getpromise.then(function(response){
				$scope.contentData = response.data;
				console.log(response.data)

				if ($scope.lawTypes) {
					delete $scope.lawTypes;
				}

				if ($scope.allfolders) {
					delete $scope.allfolders;
				}

				if (response.data.years) {
					$scope.years = response.data.years;
					$scope.filterYear = $scope.years[0];
					$scope.filterContentType = type;
					if (response.data.content) {
						$scope.contentData = response.data.content;	
					}
					else if (response.data.gis) {
						$scope.contentData = response.data.gis;	
					}
					else if (response.data.workplans) {
						$scope.filterContentType = (type==='Work Plan' ? type : 'Specific');
						$scope.contentData = response.data.workplans;
					}
					else if (response.data.studies) {
						$scope.contentData = response.data.studies;
					}

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
				else {
					if ($scope.years) {
						delete $scope.years;
					}
					if (useType==='Laws') {
						var lawTypes = [];
						if ($scope.contentData) {
							for (var idx=0; idx<$scope.contentData.length;idx++) {
								if (inArr(lawTypes,$scope.contentData[idx].category)===false) {
									lawTypes.push($scope.contentData[idx].category);
								}
							}
						}
						$scope.lawTypes = angular.copy(lawTypes);
						localStorage.setItem('lawCategories',lawTypes.join(','));
						try {
							$scope.filterContentType = lawTypes[0];
						}
						catch(e){}
					}
					else if (useType==='OrgDocs') {
						$scope.contentData = response.data.files;

						var subfolders = [], rootfilesnum = 0;
						if (response.data.files) {
							var files = response.data.files;
							for (var idx=0;idx<files.length;idx++) {
								if (files[idx].folder_name=="") {
									files[idx].folder_id = '/';
									rootfilesnum++;
								}
							}
						}

						if (rootfilesnum > 0) {
							subfolders.push({
								files: rootfilesnum,
								folder_id: "/",
								folder_name: "/"
							});
						}

						var allfolders = subfolders.concat(response.data.subfolders);
						$scope.allfolders = allfolders;
						console.log(allfolders)
						localStorage.setItem('folders',JSON.stringify(allfolders));
						try {
							$scope.filterContentType = $scope.allfolders[0].folder_id;
						}
						catch(e){}
					}
				}
				delete $scope.getpromise;
			},function(err){
				delete $scope.getpromise;
			});	
		}

		$scope.openAR=function(link,folder){
			window.open('../'+link);
		}

		$scope.openFile=function(link,folder){
			window.open('../../'+link);
		}

		$scope.openLawFile=function(link,item){
			if (item.category==='Local Tax Codes') {
				window.open('../'+link);		
			}
			else {
				window.open('../../'+link);		
			}
		}
		

		//////////////////
		// Add Triggers // 
		//////////////////

		$scope.addResources=function(evt){
			var template = '';
			localStorage.setItem('addResourceType',$scope.selectedResourceType);			
			var mdDialogObj = {
				parent: angular.element(document.getElementById('cms-content-placeholder')),
				targetEvent: evt,
				clickOutsideToClose:false,
				fullscreen: true				
			};
			switch($scope.selectedResourceType) {
				case 'Activity Reports':
					template = 'add-apr.template.html';
					var coverageArr = [];
					if ($scope.contentData) {
						for (var idx=0;idx<$scope.contentData.length;idx++) {
							coverageArr.push($scope.contentData[idx].coverage);
						}
					}
					localStorage.setItem('arrAPR',coverageArr.join(','));
					mdDialogObj.controller = addResourceController;
					break;
				case 'BO Roadmap':
					mdDialogObj.controller = addWplanController;
					mdDialogObj.fullscreen = true;
					template = 'add-workplan.template.html';
					break;
				case 'Brochures':
					template = 'add-brochures.template.html';
					mdDialogObj.controller = addBrochureController;
					break;
				case 'General Information Sheet':
					template = 'add-gis.template.html';
					mdDialogObj.controller = addGIScontroller;
					break;
				case 'Laws and Legal Issuances':
					template = 'add-law.template.html';
					mdDialogObj.controller = addLawController;
					mdDialogObj.fullscreen = true;
					break;
				case 'Organizational Documents':
					template = 'add-orgdoc.template.html';
					mdDialogObj.controller = addOrgDocController;
					mdDialogObj.fullscreen = true;
					break;
				case 'Work Plan':
					mdDialogObj.controller = addWplanController;
					mdDialogObj.fullscreen = true;
					template = 'add-workplan.template.html';
					break;
				case 'Infographics':
					template = 'add-infographics.template.html';
					mdDialogObj.controller = addInfographicsController;
					mdDialogObj.fullscreen = true;
					break;
				case 'Studies':
					template = 'add-study.template.html';
					mdDialogObj.controller = addStudiesController;
					mdDialogObj.fullscreen = true;
					break;
			}
			
			/* fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints. */
			mdDialogObj.templateUrl = 'partials/Resources/'+template;
			$mdDialog.show(mdDialogObj)
			.then(function(answer) {
				triggerFetch($scope.selectedResourceType);
			},function() {
				triggerFetch($scope.selectedResourceType);
			});
		}

		function triggerFetch(selectedResourceType){
			switch(selectedResourceType) {
				case 'Activity Reports':
					getContentPerType('Activity Reports');
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('arrAPR');
					break;
				case 'BO Roadmap':
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('years');
					getContentPerType('BO Roadmap');
					break;
				case 'Brochures':
					localStorage.removeItem('years');
					getContentPerType('Brochures');
					break;
				case 'Infographics':
					localStorage.removeItem('years');
					getContentPerType('Infographics');
					break;
				case 'General Information Sheet':
					getContentPerType('GIS');
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('years');
					break;
				case 'Laws and Legal Issuances':
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('lawCategories');
					getContentPerType('Laws and Legal Issuances');
					break;
				case 'Organizational Documents':
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('folders');
					getContentPerType('Organizational Documents');
					break;
				case 'Work Plan':
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('years');
					getContentPerType('Work Plan');
					break;
				case 'Studies':
					localStorage.removeItem('addResourceType');
					localStorage.removeItem('years');
					getContentPerType('Studies');
					break;
			}
		}
	}

	/* Add APR */
	addResourceController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addResourceController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.resourceType = localStorage.getItem('addResourceType');
		$scope.errorMessage = "";		
		$scope.newapr = {
			coverage : '',
			file : null,
			thumbnail : ""
		}
		$scope.uploadReturnData = {};

		$scope.onFileChanged = function () {
			$scope.$apply(function() {
				$scope.newapr.file = document.getElementById('file_input').files[0];
			});
		};

		$scope.$watch('newapr.thumbnail_data',function(v){
			if (v) {
				document.getElementById('apr-thumbdata').value = v;
			}
		});

		$scope.resetForm = function(evt) {
			delete $scope.newapr.thumbnail_data;
		}

		$scope.$watch('newapr.coverage',function(v){
			$scope.errorMessage = '';
			if (v) {
				var arr = v.split(' ');
				if (arr.length < 5) {
					$scope.errorMessage = 'Coverage is invalid. Check the spacing.';
					return false;
				}
				// Check if same with others
				var coverageArr = localStorage.getItem('arrAPR').split(',');
				if (utilsService.inArr(coverageArr,v)==true) {
					$scope.errorMessage = 'Same coverage already exist.';
					return false;
				}
			}
		});

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.resetForm();
						$mdDialog.hide();
					}
				}
				catch(e){}
			}
		});

		aprscope = $scope;
	}

	/* Add GIS */
	addGIScontroller.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addGIScontroller($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.errorMessage = "";		
		$scope.newgisfiles = [];
		$scope.uploadReturnData = {};
		$scope.years = localStorage.getItem('years').split(',');

		var maxNum = 5;

		function init(){
			for (var idx=0;idx<maxNum;idx++) {
				$scope.newgisfiles.push({
					year: '',
					file: null,
					title: ''
				});
			}
		}

		init();

		$scope.onFileChanged = function (evt) {
			$scope.$apply(function() {
				var idx = evt.target.id.split('-')[1];
				$scope.newgisfiles[idx].file = document.getElementById(evt.target.id).files[0];
			});
		};

		$scope.resetForm = function(evt) {
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						// $scope.resetForm();
						var resetBtn = document.getElementById('gis-btn-reset');
						resetBtn.click();
						$mdDialog.hide();
					}
				}
				catch(e){}
			}
		});

		giscope = $scope;
	}

	/* Add Brochure */
	addBrochureController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addBrochureController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.resourceType = localStorage.getItem('addResourceType');
		$scope.errorMessage = "";	
		$scope.years = localStorage.getItem('years').split(',');	
		$scope.newBrochure = {
			title : '',
			file : null,
			thumbnail : "",
			event_name: "",
			otherInfo: ""
		}
		$scope.uploadReturnData = {};

		$scope.onFileChanged = function () {
			$scope.$apply(function() {
				$scope.newBrochure.file = document.getElementById('brochure-fileinput').files[0];
			});
		};

		$scope.$watch('newBrochure.thumbnail_data',function(v){
			if (v) {
				document.getElementById('brochure-thumbdata').value = v;
			}
		});

		$scope.resetForm = function(evt) {
			delete $scope.newBrochure.thumbnail_data;
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.newBrochure = {
							title : '',
							file : null,
							thumbnail : "",
							event_name: "",
							otherInfo: ""
						}
						delete $scope.newBrochure.thumbnail_data;
						$mdDialog.hide();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}

		brochurescope = $scope;
	}

	/* Add Infographic */
	addInfographicsController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addInfographicsController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.resourceType = localStorage.getItem('addResourceType');
		$scope.errorMessage = "";	
		$scope.years = localStorage.getItem('years').split(',');	
		$scope.newInfographic = {
			title : '',
			file : null,
			thumbnail : "",
			event_name: "",
			otherInfo: ""
		}
		$scope.uploadReturnData = {};

		$scope.onFileChanged = function () {
			$scope.$apply(function() {
				$scope.newInfographic.file = document.getElementById('info-fileinput').files[0];
			});
		};

		$scope.$watch('newInfographic.thumbnail_data',function(v){
			if (v) {
				document.getElementById('info-thumbdata').value = v;
			}
		});

		$scope.resetForm = function(evt) {
			delete $scope.newInfographic.thumbnail_data;
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.newInfographic = {
							title : '',
							file : null,
							thumbnail : "",
							event_name: "",
							otherInfo: ""
						}
						delete $scope.newInfographic.thumbnail_data;
						$mdDialog.hide();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}

		infoscope = $scope;
	}

	/* Add BO Roadmap/Work Plan */
	addWplanController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addWplanController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.errorMessage = "";		
		$scope.uploadReturnData = {};
		$scope.wplanType = localStorage.getItem('addResourceType');			
		$scope.years = localStorage.getItem('years').split(',');
		$scope.wplan = {
			file : null,
			title: '',
			year: '',
			type: $scope.wplanType
		}

		$scope.onFileChanged = function (evt) {
			$scope.$apply(function() {
				$scope.wplan.file = document.getElementById(evt.target.id).files[0];
				if ($scope.wplan.year) {
					$scope.wplan.title = $scope.wplan.year+' Work Plan';
				}
			});
		};

		$scope.resetForm = function(evt) {
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						// $scope.resetForm();
						// var resetBtn = document.getElementById('wplan-btn-reset');
						// resetBtn.click();
						// $mdDialog.hide();
						$scope.wplan = {
							file : null,
							title: '',
							year: '',
							type: ''
						}
						$scope.close();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}		

		wplanscope = $scope;
	}

	/* Add Study */
	addStudiesController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addStudiesController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.errorMessage = "";		
		$scope.uploadReturnData = {};
		$scope.wplanType = localStorage.getItem('addResourceType');			
		$scope.years = localStorage.getItem('years').split(',');
		$scope.study = {
			file : null,
			title: '',
			year: ''
		}

		$scope.onFileChanged = function (evt) {
			$scope.$apply(function() {
				$scope.study.file = document.getElementById(evt.target.id).files[0];
			});
		};

		$scope.resetForm = function(evt) {
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.study = {
							file : null,
							title: '',
							year: ''
						}
						$scope.close();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}		

		studiesscope = $scope;
	}

	/* Add Law */
	addLawController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addLawController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.errorMessage = "";		
		$scope.uploadReturnData = {};
		$scope.levels = ['Provinces','Municipalities'];
		$scope.categories = localStorage.getItem('lawCategories').split(',');
		$scope.law = {
			file : null,
			category: '',
			level: '',
			title: '',
			description: '',
			year: ''
		}

		$scope.onFileChanged = function (evt) {
			$scope.$apply(function() {
				$scope.law.file = document.getElementById(evt.target.id).files[0];
			});
		};

		$scope.resetForm = function(evt) {
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.law = {
							file : null,
							category: '',
							level: '',
							title: '',
							description: '',
							year: ''
						}
						$scope.close();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}		

		lawscope = $scope;
	}

	/* Add Org Doc */
	addOrgDocController.$inject = ['$scope','ResourcesDataFactory','$mdDialog','utilsService'];
	function addOrgDocController($scope,ResourcesDataFactory,$mdDialog,utilsService){
		$scope.errorMessage = "";		
		$scope.uploadReturnData = {};
		$scope.folders = JSON.parse(localStorage.getItem('folders'));//.split(',');
		$scope.orgdoc = {
			file : null,
			folder: '',
			title: '',
			newfoldername: ''
		}

		$scope.onFileChanged = function (evt) {
			$scope.$apply(function() {
				$scope.orgdoc.file = document.getElementById(evt.target.id).files[0];
			});
		};

		$scope.resetForm = function(evt) {
		}

		$scope.$watch('uploadReturnData', function(v){
			if (v) {
				try {
					if (v.success===true) {
						$scope.orgdoc = {
							file : null,
							folder: '',
							title: ''
						}
						$scope.close();
					}
				}
				catch(e){}
			}
		});

		$scope.close=function(){
			$mdDialog.hide();	
		}		

		$scope.$watch('orgdoc.folder', function(v){
			console.log(v);
			console.log('^^^^^^')

		});

		orgdocscope = $scope;
	}

})();

var cmsErrorLib = {
	"unsubmitted": {
		action : "reset",
		type: null,
		msg: null
	},
	"missing-uploadType": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. Missing upload type. Please contact the Site Admin.",    		
	},
	"missing-contentSection": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. Missing content section. Please contact the Site Admin."
	},
	"nofile": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. No file attached."
	},
	"toolarge": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. File size is over the limit. Kindly upload with no more than 500KB.",
	},
	"invalidFormat": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. Invalid file format.",
	},
	"fileuploaded": {
		action: "show",
		type: "success",
		msg : "File successfully uploaded.",
	},
	"folderError": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. Destination folder cannot be created.",
	},
	"fileExists": {
		action: "show",
		type: "error",
		msg : "Looks like you have already uploaded the file before. Kindly edit the filename then try again."
	},
	"uploaderror": {
		action: "show",
		type: "error",
		msg : "Unable to proceed. An error occurred while uploading."
	}
};

function newAPRreturn() {
	var iframe = document.getElementById('newapr-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (aprscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				aprscope.uploadReturnData = responseData;
				aprscope.$apply()
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newGISreturn() {
	var iframe = document.getElementById('newgis-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (giscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				giscope.uploadReturnData = responseData;
				giscope.$apply()
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newInfoReturn() {
	var iframe = document.getElementById('newinfo-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (infoscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				infoscope.uploadReturnData = responseData;
				infoscope.$apply()
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newBrochureReturn() {
	var iframe = document.getElementById('newbrochure-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (brochurescope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				brochurescope.uploadReturnData = responseData;
				brochurescope.$apply()
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newWplanReturn(){
	var iframe = document.getElementById('newwplan-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (wplanscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				wplanscope.uploadReturnData = responseData;
				wplanscope.$apply();	
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newStudyReturn(){
	var iframe = document.getElementById('newstudy-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (studiesscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				studiesscope.uploadReturnData = responseData;
				studiesscope.$apply();	
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newLawReturn() {
	var iframe = document.getElementById('newlaw-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (lawscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				lawscope.uploadReturnData = responseData;
				lawscope.$apply();	
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}

function newOrgDocReturn(){
	var iframe = document.getElementById('neworgdoc-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	if (orgdocscope) {
		try {
			if (returnData!=="unsubmitted" && returnData!=="") {
				var responseData = JSON.parse(returnData);
				orgdocscope.uploadReturnData = responseData;
				orgdocscope.$apply();	
			}
		}
		catch(e){
			console.log(e)
		}		
	}
}