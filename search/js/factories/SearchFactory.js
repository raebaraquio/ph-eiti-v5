(function(){
	'use strict';

	angular
		.module('searchApp')
		.factory('SearchFactory',SearchFactory);

	SearchFactory.$inject = ['$http'];
	function SearchFactory($http){
		var SearchFactory = {
			byKeyword : byKeyword
		};

		return SearchFactory;

		///////////////////

		function byKeyword(param){
			return $http({
				url : '../rest/functions/search/keyword.php?page='+param.page+'&keyword='+param.keyword,
				method: 'GET'
			});
		}
	}


})();

