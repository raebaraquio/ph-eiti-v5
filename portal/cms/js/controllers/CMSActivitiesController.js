var activityscope,activitycontentscope;
(function(){
	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('ActivitiesDataFactory',ActivitiesDataFactory)
		.controller('CMSActivitiesController',CMSActivitiesController)
		.controller('addActivityController',addActivityController)
		.controller('addActivityContentController',addActivityContentController);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

	ActivitiesDataFactory.$inject = ['$http']
	function ActivitiesDataFactory($http){

		var ActivitiesDataFactory = {
			get: get,
			getOne: getOne,
			getAll: getAll,
			getYears: getYears,
			getDays: getDays,
			addWriteUp: addWriteUp
		};
		return ActivitiesDataFactory;
		
		///////////////////////////////

		function get(){
			return $http({
	            url:'../../rest/functions/cms-activities/get.php',
	            method: 'GET'
	        });
		}

		function getAll(year){
			var year = year ? '?year='+year : '';
			return $http({
				url:'../../rest/functions/activities/getAll.php'+year,
				method:'GET'
			});
		}

		function getOne(id){
			var id = id ? '?id='+id : '';
			return $http({
				url:'../../rest/functions/activities/getOne.php'+id,
				method:'GET'
			});
		}

		function getYears(){
			return $http({
				url:'../../rest/functions/activities/getYears.php',
				method:'GET'
			});
		}

		function getDays(id) {
			return $http({
				url:'../../rest/functions/activities/getActivityDays.php?id='+id,
				method:'GET'
			});
		}

		function addWriteUp(id,content){
			
			return $http({
				url:'../../rest/functions/activities/add-activity-writeup.php',
				method:'POST',
				data: {
					'id': id,
					'content' : content
				}
			});
		}
	}

	CMSActivitiesController.$inject = ['$scope','sessionService','ActivitiesDataFactory','$mdDialog','$sce'];
	function CMSActivitiesController($scope,sessionService,ActivitiesDataFactory,$mdDialog,$sce) {
		if (sessionService.inSession()===false) {
			window.location.href = '../../portal/';
		}
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

		$scope.activities = [];
		$scope.filterKeyword = '';
		$scope.activity = {};
		$scope.active_activity_tab = '';
		$scope.firstLoad = true;

		function getYears(){
			$scope.years = [];
			$scope.getpromise = ActivitiesDataFactory.getYears();
			$scope.getpromise.then(function(response){
				delete $scope.getpromise;
				$scope.years = response.data.years;
				$scope.filterYear = $scope.years[0];
				getActivities(true);
			},function(err){
				delete $scope.getpromise;
			});
		}

		function getActivities(mode){

			$scope.activities = [];
			$scope.no_content_elem = false;
			$scope.firstLoad = false;

			if (mode===true) {
				$scope.getpromise = ActivitiesDataFactory.getAll($scope.filterYear);	
			}
			else {
				$scope.getpromise = ActivitiesDataFactory.getOne($scope.activity.id);
			}

			$scope.getpromise.then(function(response){

				if (mode===true) {
					$scope.activities = response.data;
					delete $scope.getpromise;
				}
				else {
					try {
						$scope.activity = response.data;
						
						if ($scope.activity.writeup_content == null && 
							$scope.activity.program_url == null && 
							$scope.activity.documentation_url == null  && 
							$scope.activity.presentations.length == 0  &&
							$scope.activity.gallery.length == 0) {
							$scope.no_content_elem = true;
						}

						if ($scope.activity.writeup_content != null) {
							$scope.activity.writeup_content = $sce.trustAsHtml('<div>'+$scope.activity.writeup_content+'</div>');		
						}

						if ($scope.activity.program_url) {
							$scope.activity.program_url = '../../'+$scope.activity.program_url;
						}

						if ($scope.activity.documentation_url) {
							if (typeof($scope.activity.documentation_url)==='string') {
								$scope.activity.documentation_url = '../../'+$scope.activity.documentation_url	; // '../../'	
							}
							// else {
							// 	if ($scope.activity.documentation.length) {
							// 		if ($scope.activity.documentation[0]) {
							// 			$scope.activity.documentation[0] = '../'+$scope.activity.documentation[0]; // '../../'
							// 		}
							// 		if ($scope.activity.documentation[1]) {
							// 			$scope.activity.documentation[1] = '../'+$scope.activity.documentation[1]; // '../../'
							// 		}
							// 	}	
							// }							
						}

						var presentations = [];
						if ($scope.activity.presentations.length > 0) {
							var currDay = ''
							for (var p=0;p<$scope.activity.presentations.length;p++){
								if (currDay!==$scope.activity.presentations[p].event_day_str){
									currDay = $scope.activity.presentations[p].event_day_str
									presentations.push({
										eventDay : currDay,
										presentations: []
									})
								}
								presentations[presentations.length-1].presentations.push({
									title:$scope.activity.presentations[p].presentation_title,
									author:$scope.activity.presentations[p].presentation_author,
									src:$scope.activity.presentations[p].presentation_url
								})
							}
						}
						$scope.activity.presentations = angular.copy(presentations)

						////
						localStorage.setItem('activity',JSON.stringify($scope.activity));
						//// 

						delete $scope.getpromise;

						if ($scope.activity.writeup_content !== null) {
							$scope.select_act_tab('About')
							return
						}

						if ($scope.activity.program_url !== null) {
							$scope.select_act_tab('Program')
							return
						}

						if ($scope.activity.documentation_url !== null) {
							$scope.select_act_tab('Documentation')
							return
						}

						if ($scope.activity.presentations.length > 0) {
							$scope.select_act_tab('Presentations')
							return
						}

						if ($scope.activity.gallery.length > 0) {
							$scope.select_act_tab('Gallery')
							return
						}
					}
					catch(actError){
						console.log(actError);
					}
					delete $scope.getpromise;
				}

				
			},function(err){
				delete $scope.getpromise;
			});
		}
		
		$scope.$watch('filterYear',function(v){
			if (v) {
				if (!$scope.firstLoad) {
					getActivities(true);	
				}
			}
		})
		
		getYears(true);

		$scope.selectActivity=function(idx,activity) {
			if (idx!==null) {
				$scope.activity = activity;	
				getActivities(false);
			}
			else {
				$scope.activity = {};
				getActivities(true);
			}			
		}

		$scope.select_act_tab = function(tab){
			$scope.active_activity_tab = tab;
		}

		/////////////// 

        $scope.addActivity=function(evt){
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addActivityController;
            mdDialogObj.templateUrl = 'partials/Activities/add-activity.template.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
            	$scope.activity = {};
            	getYears(true);
                localStorage.removeItem('activity');
            },function() {
            	$scope.activity = {};
            	getYears(true);
                localStorage.removeItem('activity');
            });
        }

        $scope.type_of_doc = function(d) {
			return typeof(d);
		}

		$scope.download_documentation =  function(src) {
			window.open('../../'+src) // For production
		}

		$scope.trustSrc = function(src) {
			var s = './'+src
			return $sce.trustAsResourceUrl(s);
		}

		$scope.addContent=function(evt){
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addActivityContentController;
            mdDialogObj.templateUrl = 'partials/Activities/add-activity-content.template.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
            	$scope.activity = {};
            	getYears(true);
                localStorage.removeItem('activity');
            },function() {
            	$scope.activity = {};
            	getYears(true);
                localStorage.removeItem('activity');
            });
        }

	}


	addActivityController.$inject = ['$scope','ActivitiesDataFactory','sessionService','$mdDialog'];
	function addActivityController($scope,ActivitiesDataFactory,sessionService,$mdDialog){
		$scope.activity = JSON.parse(localStorage.getItem('activity'));
		$scope.newactivity = {};
		$scope.inputfile_ids = [];
		$scope.fileIDsString = "";
		$scope.use_startdate = "";
		$scope.use_enddate = "";
		$scope.titlesString = "";
		$scope.datesString = "";
		$scope.num_of_days = 0;

		function init(){
			$scope.newactivity = {
				title: '',
				start_date: '',
				end_date: '',
				venue: '',
				documentation: null,
				program: null,
				coverphoto: null,
				fb_photoAlbum_url: '',
				eventDays: []
			}
			$scope.use_startdate = "";
			$scope.use_enddate = "";
			$scope.titlesString = "";
			$scope.datesString = "";
			$scope.num_of_days = 0;
		}

		function inArr(arr,needle){
			if (arr) {
				for (var idx=0;idx<arr.length;idx++) {
					if (arr[idx]===needle) {
						return true;
					}
				}
			}
			return false;
		}

		function indexInArr(arr,needle){
			if (arr) {
				for (var idx=0;idx<arr.length;idx++) {
					if (arr[idx]===needle) {
						return idx;
					}
				}
			}
			return null;	
		}

		$scope.onFileChanged = function (evt) {
            $scope.$apply(function() {
            	var id = evt.target.id;
            	var field_idx = evt.target.id.split('newactivity-')[1];
            	var field_name = "";
            	switch(field_idx){
            		case '0': field_name = "program"; break;
            		case '1': field_name = "documentation"; break;
            		case '2': field_name = "coverphoto"; break;
            	}
                if (document.getElementById(evt.target.id).files[0]===undefined) {
                    $scope.newactivity[field_name] = null;
                    if (inArr($scope.inputfile_ids,evt.target.id)===true){
						var idxInArr = indexInArr($scope.inputfile_ids,evt.target.id);
						if (idxInArr!==null) {
							$scope.inputfile_ids.splice(idxInArr,1);	
						}
                    }
                    // checkFile(idx,false);
                }
                else {
                	$scope.newactivity[field_name] = document.getElementById(evt.target.id).files[0];
					if (inArr($scope.inputfile_ids,evt.target.id)===false){ 
						$scope.inputfile_ids.push(evt.target.id);
					}
                    // checkFile(idx,true);
                }
                $scope.fileIDsString = $scope.inputfile_ids.join(',');
            });
        };

		$scope.$watch('uploadReturnData', function(v){
            if (v) {
                try {
                    if (v.success===true) {
                        var resetBtn = document.getElementById('newactivity-btn-reset');
                        resetBtn.click();
                        $mdDialog.hide();
                    }
                }
                catch(e){}
            }
        });

        $scope.$watch('newactivity.start_date',function(v){
            if (v) {
                $scope.use_startdate = moment(v).format('YYYY-MM-DD');
            }
            else {
            	$scope.use_startdate = "";
            }
            checkDays();
        });

        $scope.$watch('newactivity.end_date',function(v){
            if (v) {
                $scope.use_enddate = moment(v).format('YYYY-MM-DD');
            }
            else {
            	$scope.use_enddate = "";
            }
            checkDays();
        });

        function addEventDay(evDate,evTitle){
        	$scope.newactivity.eventDays.push({
        		date : evDate,
        		title: evTitle
        	});
        	doWatch($scope.newactivity.eventDays.length-1);
        }

        function setupStringVals(){
        	$scope.titlesString = "";
        	$scope.datesString = "";
        	if ($scope.newactivity.eventDays.length > 0) {
        		for (var i=0;i<$scope.newactivity.eventDays.length;i++) {
        			if (i > 0) {
        				$scope.datesString += ",";
        				$scope.titlesString += "===";
        			}
        			$scope.datesString += $scope.newactivity.eventDays[i].date;
        			$scope.titlesString += $scope.newactivity.eventDays[i].title;
        		}
        	}
        }

        function doWatch(idx){
            $scope.$watch('newactivity.eventDays['+idx+'].title', function(v){
                if (v) {                    
                    setupStringVals();
                }
            });
        }

        function checkDays(){
        	$scope.newactivity.eventDays = [];
        	if ($scope.use_startdate!="" && $scope.use_enddate!="") {
        		var startdate = moment($scope.use_startdate,'YYYY-MM-DD');
        		var enddate = moment($scope.use_enddate,'YYYY-MM-DD');
	        	var numDays = enddate.diff(startdate,'days') + 1; //moment.duration(enddate.diff(startdate));

	        	//var duration = moment.duration(enddate.diff(startdate));
				//var numDaysDuration = duration.asDays();	

				$scope.num_of_days = numDays;
				addEventDay($scope.use_startdate,'Day 1');
				if (numDays === 2) {
					addEventDay($scope.use_enddate,'Day 2');
				}
				else if (numDays > 2) {
					for (var i=0;i<(numDays-1);i++) {
						addEventDay( moment($scope.newactivity.eventDays[i].date,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD'),'Day '+($scope.newactivity.eventDays.length+1));
					}
				}
        	}
        	else if ($scope.use_startdate!='') {
        		$scope.num_of_days = 1;
        		addEventDay($scope.use_startdate,'Day 1');
        	}

        	setupStringVals();
        }

        init();

		$scope.resetForm = function(evt) {
			init();
        }

        $scope.close=function(){
            $mdDialog.hide();   
        }

        $scope.clearDate=function(mode){
        	if (mode==='start') {
        		$scope.newactivity.start_date = '';
        	}
        	else {
        		$scope.newactivity.end_date = '';	
        	}
        }

		activityscope = $scope;

	}

	addActivityContentController.$inject = ['$scope','ActivitiesDataFactory','sessionService','$mdDialog'];
	function addActivityContentController($scope,ActivitiesDataFactory,sessionService,$mdDialog){
		$scope.activity = JSON.parse(localStorage.getItem('activity'));
		
		$scope.contentTypes = ["Write-up (About Section)","Presentations"];
		$scope.contentType = "";
		$scope.eventDays = [];
		$scope.selectedDay = "";
		$scope.writeup_content = "";
		$scope.presentationfiles = [];

		$scope.selected_ev_daystr = "";
		$scope.selected_ev_dayidfk = "";

		var maxNum = 5;
		var totalFiles = 0;

		$scope.tinymceopts = {
			plugins: [
				"autolink link image lists preview",
				"searchreplace wordcount code fullscreen insertdatetime media",
				"save table paste textcolor colorpicker",
				"imagetools"
			],
			theme: "modern",
			content_css: "css/development.css",
			height:200,
			add_unload_trigger: false
		}

		function init(){
			$scope.activity = JSON.parse(localStorage.getItem('activity'));
			var totalFiles = 0;
			$scope.writeup_content = "";
			$scope.contentType = $scope.contentTypes[0];

			var p = ActivitiesDataFactory.getDays($scope.activity.id);
			p.then(function(response){
				var returnData = response.data;
				$scope.eventDays = response.data;
				if (returnData.length > 0) {
					$scope.selectedDay = returnData[0].event_day;
				}
			},function(error){
			});

			$scope.presentationfiles = [];           
            for (var idx=0;idx<maxNum;idx++) {
                $scope.presentationfiles.push({
                    file: null,
                    title: '',
                    author: ''
                });         
            }
		}

		function inArr(arr,needle){
			if (arr) {
				for (var idx=0;idx<arr.length;idx++) {
					if (arr[idx]===needle) {
						return true;
					}
				}
			}
			return false;
		}

		function indexInArr(arr,needle){
			if (arr) {
				for (var idx=0;idx<arr.length;idx++) {
					if (arr[idx]===needle) {
						return idx;
					}
				}
			}
			return null;	
		}

		$scope.onFileChanged = function (evt) {
            $scope.$apply(function() {
            	var id = evt.target.id;
            	var field_idx = evt.target.id.split('presentationfile-')[1];
                if (document.getElementById(evt.target.id).files[0]===undefined) {
                    $scope.presentationfiles[field_idx].file = null;   
                }
                else {
                    $scope.presentationfiles[field_idx].file = document.getElementById(evt.target.id).files[0];
                }
                checkFile();
            });
        };

       	function checkFile() {
       		totalFiles = 0;
       		if ($scope.presentationfiles.length) {
       			for (var idx=0;idx<$scope.presentationfiles.length;idx++) {
       				if ($scope.presentationfiles[idx].file!==null) {
       					totalFiles++;
       					document.getElementById('presfiles-count').value = totalFiles;
       				}
       			}
       		}
        }

        function setDayString(){
        	$scope.selected_ev_daystr = "";
			$scope.selected_ev_dayidfk = "";
			if ($scope.selectedDay) {
				for (var i=0;i<$scope.eventDays.length;i++) {
					if ($scope.eventDays[i].event_day===$scope.selectedDay) {
						$scope.selected_ev_daystr = angular.copy($scope.eventDays[i].event_day);
						$scope.selected_ev_dayidfk = parseInt(angular.copy($scope.eventDays[i].day_id),10);
					}
				}
			}
        }

		$scope.$watch('uploadReturnData', function(v){
            if (v) {
                try {
                    if (v.success===true) {
                        // $scope.resetForm();
                        var resetBtn = document.getElementById('presfilescontent-btn-reset');
                        resetBtn.click();
                        $mdDialog.hide();
                    }
                }
                catch(e){}
            }
        });


        $scope.$watch('contentType',function(v){
        	if (v) {
        		if (v=='Presentations') {
					setDayString();
        		}
        	}
        });

        $scope.$watch('selectedDay',function(v){
        	if (v) {
        		setDayString();
        	}
        });

        init();

		$scope.resetForm = function(evt) {
			init();
        }

        $scope.close=function(){
            $mdDialog.hide();   
        }

        $scope.clearDate=function(mode){
        	if (mode==='start') {
        		$scope.newactivity.start_date = '';
        	}
        	else {
        		$scope.newactivity.end_date = '';	
        	}
        }

        // Add Write Up
        $scope.submitWriteUp=function(){
        	if (!$scope.writeup_content) {
        		return false;
        	}

			var p = ActivitiesDataFactory.addWriteUp($scope.activity.id,$scope.writeup_content);
			p.then(function(response){
				try {
					if (response.data.success==true) {
						var resetBtn = document.getElementById('addnewactcontent-btn-reset');
                        resetBtn.click();
                        $mdDialog.hide();	
					}
				}
				catch(e){}
			}, function(err){
			})
        }

		activitycontentscope = $scope;

	}

})();


function newActivityReturn(){
	var iframe = document.getElementById('newactivitycontent-iframe')
    var returnData = iframe.contentDocument.body.innerHTML;
    if (activityscope) {
        try {
            if (returnData!=="unsubmitted" && returnData!=="") {
                var responseData = JSON.parse(returnData);
                activityscope.uploadReturnData = responseData;
                activityscope.$apply();   
            }
        }
        catch(e){
            console.log(e)
        }       
    }
}


function newActivityContentReturn(){
	var iframe = document.getElementById('addactivitycontent-iframe')
    var returnData = iframe.contentDocument.body.innerHTML;
    if (activitycontentscope) {
        try {
            if (returnData!=="unsubmitted" && returnData!=="") {
                var responseData = JSON.parse(returnData);
                activitycontentscope.uploadReturnData = responseData;
                activitycontentscope.$apply();   
            }
        }
        catch(e){
            console.log(e)
        }       
    }
}