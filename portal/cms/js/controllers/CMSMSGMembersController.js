(function(){
	'use strict';

	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('MSGMembersDataFactory',MSGMembersDataFactory)
		.controller('CMSMSGMembersController',CMSMSGMembersController);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

    MSGMembersDataFactory.$inject = ['$http'];
    function MSGMembersDataFactory($http){
    	var __baseURL__ = 'https://api.mlab.com/api/1/databases/pheiti/collections/about-pheiti/';
	    var __APIKEY__ = 'AkQtTxgkxLEYOQz9oFH85K3godWJNhtr';

	    var membersFactory  = {
	    	get : get,
	    	update: update
	    }

	    return membersFactory; 

	    ////// 

		function get(){
			return $http({
	            url:__baseURL__+'593cb0f1734d1d02258f218b?apiKey='+__APIKEY__,
	            method:'GET'
	        });
		}

		function update(content){
			return $http({
	            url:__baseURL__+'593cb0f1734d1d02258f218b?apiKey='+__APIKEY__,
	            method:'PUT',
	            data: JSON.stringify(content)
	        });
		}
    }

    CMSMSGMembersController.$inject = ['$scope','MSGMembersDataFactory','$mdDialog','utilsService'];
    function CMSMSGMembersController($scope,MSGMembersDataFactory,$mdDialog,utilsService){
    	$scope.msgmembers = {};
    	$scope.groups = [];
    	$scope.govOffices = [];
    	$scope.selectedGroup = "";
    	$scope.selectedGroupMembers = null;
    	$scope.original_document = {};
    	$scope.addMode = false;

    	function processData(content,group,firstload){
    		if (content) {
				for (var idx=0;idx<content.length;idx++) {
    				$scope.msgmembers[content[idx].group] = [];

    				var currMembers = content[idx].members;	
    				for (var m=0;m<currMembers.length;m++) {
    				
    					for (var fullAlt in currMembers[m].members) {
    						var memType = 'Full';
    						if (fullAlt==='alternate') {
    							memType = 'Alternate';
    						}

    						var memlist = currMembers[m].members[fullAlt];
    						for (var l=0;l<memlist.length;l++) {
    							var memdetails = {
    								agency:'',
    								membership: memType,
    								name: memlist[l].name,
    								position: memlist[l].position,
    								subposition: memlist[l].subposition
    							};
    							if (content[idx].group==="Government") {
    								memdetails.agency = currMembers[m].office;
    							}
    							else {
    								memdetails.agency = memlist[l].office;
    							}
    							memdetails.original = angular.copy(memdetails);
    							$scope.msgmembers[content[idx].group].push(memdetails);
    						}

    					}
    				}

    				if (firstload) {
    					$scope.groups.push(content[idx].group);	

    					if (content[idx].group==="Government") {
	    					if (content[idx].members) {
	    						$scope.govOffices = [];
	    						for (var g=0;g<content[idx].members.length;g++)  {
	    							$scope.govOffices.push(content[idx].members[g].office);
	    						}
	    					}
	    				}
    				}

    			}	

    			if (!group) {
	    			$scope.selectedGroup = $scope.groups[0];
	    			$scope.selectedGroupMembers = $scope.msgmembers[$scope.groups[0]];	
    			}
    			else {
    				$scope.selectedGroupMembers = $scope.msgmembers[group];		
    			}
			} 
    	}

    	function getMSG(firstload,group){
    		$scope.msgmembers = {};
    		if (firstload) {
	    		$scope.groups = [];
		    	$scope.govOffices = [];	
		    	$scope.selectedGroup = "";
    		}
    		$scope.getmemspromise = MSGMembersDataFactory.get();
    		$scope.getmemspromise.then(function(response){
    			var content = response.data.content;
    			if (firstload) {
    				$scope.original_document = angular.copy(response.data);
    			}
    			processData(content,group,firstload);
    			delete $scope.getmemspromise;
    		},function(error){
    			console.log(error);
    			delete $scope.getmemspromise;
    		})
    	}

    	getMSG(true,"");

    	$scope.loadMembers=function(grp) {
    		getMSG(false,grp);
    	}

    	$scope.addMsgMember=function(evt){
    		$scope.addMode = true;
    		$scope.msgmembers[$scope.selectedGroup].push({
    			agency: '',
				membership: 'Full',
				name: '',
				position: '',
				subposition: '',
				newFlag: true
    		});
    	}

    	function doDelete(member,listIdx){
    		// Delete from display
    		if (!member.newFlag) {
    			var roster = angular.copy($scope.selectedGroupMembers);
	    		for (var i=0;i<roster.length;i++) {
	    			if (roster[i].name===member.name &&
	    				roster[i].agency===member.agency &&
	    				roster[i].position===member.position ) {
	    				$scope.selectedGroupMembers.splice(i,1);
	    			}
	    		}

	    		// Delete from Mlab document
	    		var contentDoc = angular.copy($scope.original_document.content);
	    		var indexGroup = utilsService.indexInObj(contentDoc,'group',$scope.selectedGroup);
	    		if (indexGroup!==null) {
	    			if ($scope.selectedGroup==='Government') {
	    				var idxMembers = utilsService.indexInObj(contentDoc[indexGroup].members,'office',member.agency);
	    			}
	    			else {
	    				var idxMembers = Math.floor(listIdx/2);
	    			}
	    			if (idxMembers!==null) {
						var searchHere = contentDoc[indexGroup].members[idxMembers].members.primary;
						if (member.membership==='Alternate') {
							searchHere = contentDoc[indexGroup].members[idxMembers].members.alternate;
						}
						var idxForDeletion = utilsService.indexInObj(searchHere,'name',member.name);
						if (idxForDeletion!==null) {
							if (member.membership==='Alternate') {
								contentDoc[indexGroup].members[idxMembers].members.alternate.splice(idxForDeletion,1);
							}
							else {
								contentDoc[indexGroup].members[idxMembers].members.primary.splice(idxForDeletion,1);
							}
						}
					}
	    		}

	    		updateDocument(contentDoc);
    		}
    		else {
    			$scope.selectedGroupMembers.splice(listIdx,1);
    		}
    	}

		$scope.deleteMember = function(ev,member,listIdx) {
			
			var confirm = $mdDialog.confirm()
				.title('Would you like to delete '+member.name+'?')
				// .textContent('All of the banks have agreed to forgive you your debts.')
				// .ariaLabel('Lucky day')
				.targetEvent(ev)
				.ok('Delete')
				.cancel('Don\'t Delete');

			$mdDialog.show(confirm).then(function() {
				doDelete(member,listIdx);
			}, function() {
				// do nothing
			});
		};

		function updateDocument(updatedContent){
			var updatedDocument = $scope.original_document;
			updatedDocument.content = updatedContent;
			////
			$scope.addMode = false; 
			$scope.getmemspromise = MSGMembersDataFactory.update(updatedDocument);
    		$scope.getmemspromise.then(function(response){
    			delete $scope.getmemspromise;
    			var content = response.data.content;
    			$scope.original_document = angular.copy(response.data);
    			$scope.groups = [];
		    	$scope.govOffices = [];			    	
    			processData(content,$scope.selectedGroup,true);
    		},function(error){
    			delete $scope.getmemspromise;
    		});
		}

		$scope.saveMSG=function(ev) {
			var changed = [];
			var changedIdx = [];
			var newlyAdded = [];
			var newIdx = [];
			var contentDoc = angular.copy($scope.original_document.content);

			angular.forEach($scope.msgmembersform, function (field) {
				try {
					if (angular.isObject(field)) {
						if (field.hasOwnProperty('$name') && 
							field.hasOwnProperty('$modelValue') ) {
							if (field.$dirty===true && field.$touched===true) {
								var idx = field.$name.split('-')[1];
								if (!$scope.selectedGroupMembers[idx].newFlag) {
									if (utilsService.inArr(changedIdx,idx)===false) {
										changedIdx.push(idx);
										changed.push($scope.selectedGroupMembers[idx]);	
									}	
								}
							}
						}
					}
				}
				catch(e){
					console.log(e)
				}
			});

			if (changed.length > 0) {
				
				for (var cidx=0;cidx<changed.length;cidx++) {
					var member = changed[cidx];
					if (!member.newFlag) {						
			    		var indexGroup = utilsService.indexInObj(contentDoc,'group',$scope.selectedGroup);
			    		if (indexGroup!==null) {
			    			if ($scope.selectedGroup==='Government') {
			    				var idxMembers = utilsService.indexInObj(contentDoc[indexGroup].members,'office',member.original.agency);
			    			}
			    			else {
			    				var idxMembers = Math.floor(changedIdx[cidx]/2);
			    			}
			    			if (idxMembers!==null) {
								var searchHere = contentDoc[indexGroup].members[idxMembers].members.primary;
								var changedMemtype = false;
								if (member.original.membership==='Alternate') {
									searchHere = contentDoc[indexGroup].members[idxMembers].members.alternate;
								}
								
								var idxForDeletion = utilsService.indexInObj(searchHere,'name',member.original.name);

								if (member.membership!==member.original.membership) {
									var forPushing = angular.copy(member);
									delete forPushing.original;
									// Add to new list + remove to old list
									if (member.membership==='Alternate') { 
										// if new type is alternate, get from primary, add to alternate	
										contentDoc[indexGroup].members[idxMembers].members.alternate.push(forPushing);
										contentDoc[indexGroup].members[idxMembers].members.primary.splice(idxForDeletion,1);
									}
									else {
										// if new type is primary, get from alternate, add to primary
										contentDoc[indexGroup].members[idxMembers].members.primary.push(forPushing);
										contentDoc[indexGroup].members[idxMembers].members.alternate.splice(idxForDeletion,1);
									}
								}
								else {
									// Membership is not changed
									if (idxForDeletion!==null) {
										if (member.membership==='Alternate') {
											if ($scope.selectedGroup!=='Government') {
												contentDoc[indexGroup].members[idxMembers].members.alternate[idxForDeletion].office = member.agency;
											}
											else {
												contentDoc[indexGroup].members[idxMembers].office = member.agency;
											}
											contentDoc[indexGroup].members[idxMembers].members.alternate[idxForDeletion].name = member.name;
											contentDoc[indexGroup].members[idxMembers].members.alternate[idxForDeletion].position = member.position;
											
											if (contentDoc[indexGroup].members[idxMembers].members.alternate[idxForDeletion].subposition) {
												contentDoc[indexGroup].members[idxMembers].members.alternate[idxForDeletion].subposition = member.subposition;
											} 
										}
										else {
											if ($scope.selectedGroup!=='Government') {
												contentDoc[indexGroup].members[idxMembers].members.primary[idxForDeletion].office = member.agency;
											}
											else {
												contentDoc[indexGroup].members[idxMembers].office = member.agency;
											}
											contentDoc[indexGroup].members[idxMembers].members.primary[idxForDeletion].name = member.name;
											contentDoc[indexGroup].members[idxMembers].members.primary[idxForDeletion].position = member.position;
											
											if (contentDoc[indexGroup].members[idxMembers].members.primary[idxForDeletion].subposition) {
												contentDoc[indexGroup].members[idxMembers].members.primary[idxForDeletion].subposition = member.subposition;
											} 
										}
									}	
								}
							}
			    		}
					}
				}

				
				
			} // End: if changed > 0
			
			if ($scope.addMode===true) {
				for (var cnt=0;cnt<$scope.selectedGroupMembers.length;cnt++) {
					if ($scope.selectedGroupMembers[cnt].newFlag===true) {
						if ($scope.selectedGroupMembers[cnt].name==="") {
							alert('Name is required.');
							return false;
						}

						if ($scope.selectedGroupMembers[cnt].position==="") {
							alert('Position is required.');
							return false;
						}

						if ($scope.selectedGroupMembers[cnt].agency==="") {
							alert('Office/agency is required.');
							return false;
						}

						newIdx.push(cnt);
						newlyAdded.push($scope.selectedGroupMembers[cnt]);
					}
				}
				
				if (newlyAdded.length > 0) {
					
					for (var cidx=0;cidx<newlyAdded.length;cidx++) {
						var newmember = newlyAdded[cidx];
						delete newmember.newFlag;

						var indexGroup = utilsService.indexInObj(contentDoc,'group',$scope.selectedGroup);

			    		if (indexGroup!==null) {
			    			if ($scope.selectedGroup==='Government') {
			    				var idxMembers = utilsService.indexInObj(contentDoc[indexGroup].members,'office',newmember.agency);
			    				if (idxMembers!==null) {
			    					if (newmember.membership==='Alternate') {
			    						delete newmember.membership;
			    						if (newmember.hasOwnProperty('$$hashKey')){
			    							delete newmember.$$hashKey;
			    						}
			    						contentDoc[indexGroup].members[idxMembers].members.alternate.push(newmember);
				    				}
				    				else {
				    					delete newmember.membership;
				    					if (newmember.hasOwnProperty('$$hashKey')){
			    							delete newmember.$$hashKey;
			    						}
										contentDoc[indexGroup].members[idxMembers].members.primary.push(newmember);
				    				}
			    				}		    				
			    			}
			    			else {
			    				var idxMembers = Math.ceil($scope.selectedGroupMembers.length/2);
			    				if (!contentDoc[indexGroup].members[idxMembers]) {
			    					contentDoc[indexGroup].members.push({
			    						members: {
			    							primary: [],
			    							alternate: []
			    						}
			    					});
			    				}
			    				if (newmember.membership==='Alternate') {
			    					delete newmember.membership;
			    					if (newmember.hasOwnProperty('$$hashKey')){
		    							delete newmember.$$hashKey;
		    						}
		    						contentDoc[indexGroup].members[idxMembers-1].members.alternate.push(newmember);
			    				}
			    				else {
			    					delete newmember.membership;
			    					if (newmember.hasOwnProperty('$$hashKey')){
		    							delete newmember.$$hashKey;
		    						}
									contentDoc[indexGroup].members[idxMembers-1].members.primary.push(newmember);
			    				}	
			    			}
			    		}
					} // End: for newlyAdded-loop
				}

			} // End: else if add mode is ON
		
			// console.log(contentDoc[indexGroup]);
			updateDocument(contentDoc);

		} // End: saveMSG

    }

})();