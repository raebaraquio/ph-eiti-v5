(function(){
	'use strict';

	angular
		.module('searchApp')
		.controller('searchController', searchController);

	searchController.$inject = ['$scope','SearchFactory','$location','$rootScope','NavigationFactory'];
	function searchController($scope,SearchFactory,$location,$rootScope,NavigationFactory) {
		
		$scope.filterContentType = null;
		$scope.search = { keyword: '', page: '', keywordCopy: '' };
		$scope.pageResults = [];
		$scope.results = {};
		$scope.resultsCount = 0;
		$scope.pages = NavigationFactory.offline;
		
		$scope.$on('$routeChangeSuccess', function(next, current) {
			if (current) {
				if (current.params) {
					var params = current.params;
					$scope.search.page = params.page;
					$scope.search.keyword = params.keyword;
					$scope.search.keywordCopy = angular.copy(params.keyword);
					// $rootScope.$broadcast('keywordEntered',$scope.search);
					$scope.doSearch();
				}
			}
		});

		////////////////////
		
		$scope.doSearch = function(contentType){

			if ($scope.search.keyword===''){
				return false;
			}			

			if (contentType=='Page') {
				checkIfPage(true);
				return false
			}

			$scope.search.keywordCopy = angular.copy($scope.search.keyword);
			$scope.searchPromise = SearchFactory.byKeyword($scope.search);
			$scope.searchPromise.then(function(response){
				$scope.resultsCount = 0;
				var results = {
					'Activities': [],
					'Country Reports' : [],
					'Resources' : [],
					'News' : [],
					'MSG Meetings' : []
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


											// currResults.href = section+'/';
											// if (resource_section) {												
											// }
											// currResults.href += '/'+currResults.title;
											console.log(currResults)
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
									currResults.href = '../'+section+'/';
									if (currResults.section) {
										currResults.href += '#/'+slugify(currResults.section);
									}
									currResults.href += '/'+currResults.id;
									$scope.resultsCount++;
									results[section].push(currResults);
								} 
							}
						}
					}					
				}
				$scope.results = results;
				checkIfPage();

				delete $scope.searchPromise;

				// Focus input element
				var smk = document.getElementById('search-main-keyword');
				smk.focus();

			},function(error){
				delete $scope.searchPromise;
			});

		}

		$scope.$on('doSearch',function(evt,args){
			if (args) {
				$scope.search.page = 'search';
				$scope.search.keyword = args.keyword;
				$scope.search.keywordCopy = angular.copy(args.keyword);
				$scope.doSearch();
			}
		});

		function searchPage(pages,mode){
			var keyword = new RegExp($scope.search.keyword.toLowerCase(), 'gi')
			var result = [];
			$scope.pageResults = [];

			// Reset ALL results model
			if (mode===true) {
				$scope.results = {};
			}

			if (pages) {
				for (var idx=0;idx<pages.length;idx++) {
					var pageName = pages[idx].name.toLowerCase();
					var subPage = pages[idx].subnav;
					if (pageName.match(keyword)) {
						result.push(pages[idx])
					}
					else if (subPage.length) {
						for (var s=0;s<subPage.length;s++) {
							if (subPage[s].name.match(keyword)) {
								subPage[s].href = '../'+pages[idx].href+'/#/'+subPage[s].href;
								result.push(subPage[s])
							}
						}
					}
				}
			}

			$scope.pageResults = result;
			if ($scope.pageResults.length > 0) {
				$scope.results['Page'] = $scope.pageResults;
			}
		}

		function checkIfPage(mode){
			if (!$scope.pages) {
				var p = NavigationFactory.get();
				p.then(function(response){
					$scope.pages = response.data.content;
					searchPage($scope.pages,mode)
				},function(error){

				});
			}
			else {
				searchPage($scope.pages,mode)
			}
		}

		$scope.applyFilter = function(){
			switch($scope.filterContentType) {
				case 'Page':
					$scope.doSearch('Page');
					break;
				case 'Document':
					break;
				case 'Article':
					break;
			}
		}

		$scope.validate=function(evt){
            if (evt.keyCode==13) {
                $scope.doSearch();
            }
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

