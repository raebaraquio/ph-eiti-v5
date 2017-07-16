(function(){
	'use strict';

	angular
		.module('searchApp')
		.controller('searchController', searchController);

	searchController.$inject = ['$scope','SearchFactory','$location','$rootScope','NavigationFactory'];
	function searchController($scope,SearchFactory,$location,$rootScope,NavigationFactory) {
		
		$scope.filterContentType = null;
		$scope.search = { keyword: '', page: '', keywordCopy: '', contentType: '' };
		$scope.pageResults = [];
		$scope.results = {};
		$scope.resultsCount = 0;
		$scope.entered = false;
		$scope.pages = NavigationFactory.offline ? NavigationFactory.offline : JSON.parse(localStorage.getItem('navigation'));
		
		$scope.$on('$routeChangeSuccess', function(next, current) {
			if (current) {
				if (current.params) {
					var params = current.params;
					$scope.search.page = params.page;
					$scope.search.keyword = params.keyword;
					if (params.contentType) {
						$scope.search.contentType = params.contentType;
						$scope.filterContentType = params.contentType;
					}
					$scope.search.keywordCopy = angular.copy(params.keyword);
					runSearch($scope.search.contentType);
				}
			}
		});

		$scope.$watch('search.keyword',function(v){
			if (v==='') {
				$scope.entered = false;
			}
		});

		////////////////////

		function runSearch(contentType){
			$scope.resultsCount = 0;

			if ($scope.search.keyword===''){
				return false;
			}			

			$scope.entered = true;

			$scope.search.keywordCopy = angular.copy($scope.search.keyword);
			$scope.searchPromise = SearchFactory.byKeyword($scope.search);
			$scope.searchPromise.then(function(response){				
				var results = {
					'Activities': [],
					'Country Reports' : [],
					'Resources' : [],
					'News' : [],
					'MSG Meetings' : [],
					'MSG Meetings - File Annexes' : [],
					'Reporting Templates' : [],
					'Page' : []
				};	
				if (response.data) {
					var returnData = response.data;
					for (var idx=0;idx<returnData.length;idx++){
						var currRetData = returnData[idx].data;
						var section = returnData[idx].section;
						if (currRetData.length > 0) {
							if (section==='Resources') {
								var resources_data = currRetData;
								for (var k=0;k<resources_data.length;k++){
									if (resources_data[k].data) {
										var section_results = resources_data[k].data;
										var resource_section = resources_data[k].section;										
										for (var kk=0;kk<section_results.length;kk++){
											var currResults = section_results[kk];
											currResults.tags = [section,resource_section];
											$scope.resultsCount++;
											switch(resource_section){
												case 'Work Plan':
													currResults.href = currResults.file_url;
													break;
												case 'Activity Reports':
													currResults.href = currResults.file_url;
													break;
												case 'Infographics':
													currResults.href = '../'+currResults.file_url;
													break;
												case 'Brochures':
													currResults.href = '../'+currResults.file_url;
													break;
												case 'General Information Sheet':
													currResults.href = '../'+currResults.file_url;
													break;
												case 'Studies':
													currResults.href = '../'+currResults.file_url;
													break;
												case 'Laws and Legal Issuances':
													// currResults.tags[1] += ' - '+currResults.category;
													currResults.href = currResults.file_url;
													if ( !(currResults.file_url.match(/http|www/gi)) && !currResults.file_url.match(/../gi) ) {
														currResults.href = '../'+currResults.file_url;
													}
													break;
												case 'Organizational Documents':
													currResults.href = currResults.file_url;
													break;
											}

											results[section].push(currResults);
										} 
									}
								}
							}
							else {
								for (var kk=0;kk<currRetData.length;kk++){
									var currResults = currRetData[kk];
									currResults.tags = [section];									

									switch(section) {
										case 'News':
											currResults.href = '../'+section+'/';
											if (currResults.section) { 
												currResults.href += '#/'+slugify(currResults.section);
											}
											currResults.href += '/'+currResults.id;
											break;

										case 'Country Reports':
											if (!currResults.countryReportContent && !currResults.crContent) {
												currResults.href = '../'+slugify(section)+'/';
												if (currResults.title) { 
													currResults.href += '#/'+currResults.title;
												}	
											}
											else { // Content Type 'document' or 'mso-file' of Country Reports
												currResults.href = currResults.file_url;
											}
											break;

										case 'Activities':
											currResults.href = '../'+section+'/';
											if (currResults.id) { 
												currResults.href += '#/'+currResults.id;
											}
											break;

										case 'MSG Meetings':
											currResults.href = '../About-PH-EITI/#/'+slugify(section)+'?mtgId='+currResults.mtgid;
											break;

										case 'MSG Meetings - File Annexes':
											currResults.tags.push(currResults.mtg_title+' MSG Meeting');
											currResults.href = '../'+currResults.file_url;
											break;

										case 'Reporting Templates':
											currResults.href = currResults.file_url;
											break;

										case 'Page': // Content-type 'Page' of Country Reports
											currResults.href = '../Country-Reports/#/'+currResults.reportTitle+'/'+currResults.title;
											break;

									}							

									$scope.resultsCount++;
									results[section].push(currResults);
								} 
							}
						}
					}					
				}

				$scope.results = results;
				
				if (!$scope.filterContentType || $scope.filterContentType=="") {	
					checkIfPage();
				}

				if (contentType=='Page') {
					checkIfPage(true);
				}

				delete $scope.searchPromise;

				// Focus input element
				var smk = document.getElementById('search-main-keyword');
				smk.focus();

			},function(error){
				delete $scope.searchPromise;
			});

		}
		
		$scope.doSearch = function(contentType){
			if ($scope.search.keyword==='') {
                return false
            }
            var cType = "";
            if (contentType) {
            	cType = '&contentType='+contentType;
            }
            else if ($scope.filterContentType!=="" && $scope.filterContentType!==null) {
            	cType = '&contentType='+$scope.filterContentType;	
            }
            window.location.href = '../search/#/search?keyword='+$scope.search.keyword+cType;
		}

		$scope.$on('doSearch',function(evt,args){
			if (args) {}
		});

		function searchPage(pages,mode){
			var keyword = new RegExp($scope.search.keyword.toLowerCase(), 'gi')
			var result = [];
			$scope.pageResults = [];

			// Reset ALL results model
			/*if (mode===true) {
				$scope.results = {};
			}*/
			
			if (pages) {
				for (var idx=0;idx<pages.length;idx++) {
					var pageName = pages[idx].name.toLowerCase();
					var subPage = pages[idx].subnav;
					if (pageName.match(keyword)) {
						$scope.resultsCount++;
						pages[idx].href = angular.copy('../'+pages[idx].href);
						result.push(pages[idx]);
					}
					else if (subPage.length) {
						for (var s=0;s<subPage.length;s++) {
							if (subPage[s].name.match(keyword)) {
								subPage[s].href = '../'+pages[idx].href+'/#/'+subPage[s].href;
								$scope.resultsCount++;
								result.push(subPage[s])
							}
						}
					}
				}
			}

			$scope.pageResults = result;
			if ($scope.pageResults.length > 0) {
				$scope.results['Page'] = angular.copy($scope.pageResults);
			}

			delete $scope.searchPromise;
		}

		function checkIfPage(mode){
			if (!$scope.pages) {
				$scope.searchPromise = NavigationFactory.get();
				$scope.searchPromise.then(function(response){
					$scope.pages = response.data.content;
					searchPage($scope.pages,mode)
				},function(error){

				});
			}
			else {
				searchPage($scope.pages,mode)
			}
		}

		$scope.applyFilter = function(evt,reset){
			if (reset==0) {
				$scope.filterContentType = "";
				$scope.search.contentType = "";
			}
			$scope.doSearch($scope.filterContentType);	
		}

		$scope.validate=function(evt){
            if (evt.keyCode==13) {
                $scope.doSearch();
            }
        }

        $scope.clearSearch=function(){
        	$scope.search.keyword='';
        	var smk = document.getElementById('search-main-keyword');
			smk.focus();
        }

        function slugify(text){
        	if (!text) {
        		return
        	}
        	if (text.match(/ /gi)){
				var textArr = text.split(' ');
				return textArr.join('-');
        	}
        	return text;
        }
	}

})();

