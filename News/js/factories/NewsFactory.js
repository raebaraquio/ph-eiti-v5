newsApp.factory('NewsFactory',['$http','$location',
	function($http,$location){
	var NewsFactory=null;
	NewsFactory = {
		getTypes:function(){
			return {
				'Media-Releases': 'Media Releases',
				'PH-EITI-In-the-News':'PH-EITI in the News',
				'PH-EITI-Newsroom':'PH-EITI Newsroom',
				'Archive':'Archive'
			}
		},
		types: {
			'Media-Releases': 'Media Releases',
			'PH-EITI-In-the-News':'PH-EITI In the News',
			'PH-EITI-Newsroom':'PH-EITI Newsroom',
			'Archive':'Archive'
		},
		getnews : function(data){
			var p = $http({
				url: '../rest/functions/news-get.php',
				method: 'POST',
				data: data
			});
			return p;
		},
		getcount: function(data){
			var p = $http({
	            url:'../rest/functions/news-get-count.php',
	            method: 'POST',
	            data:data
	        });
	        return p;
		},
		getpagednews :  function(data) {
			var p = $http({
	            url:'../rest/functions/news-get-pagination.php',
	            method: 'POST',
	            data:data
	        });
	        return p;
		},
		newsletter: function(){
			return [
				{
					year:2016,
					month:'March',
					title:'March 2016',
					link:'http://us10.campaign-archive1.com/?u=0c3a14a207a8646c931c3168b&id=10ca3ee0f1&e=5db15ddfe0'
				},
				{
					year:2015,
					month:'October',
					title:'October 2015',
					link:'http://us10.campaign-archive1.com/?u=0c3a14a207a8646c931c3168b&id=a6ae7e667f'
				},
				{
					year:2015,
					month:'April',
					title:'Apirl 2015',
					link:'http://us10.campaign-archive1.com/?u=0c3a14a207a8646c931c3168b&id=88c48c585c&e=5db15ddfe0'
				},
				{
					year:2015,
					month:'January',
					title:'January 2015',
					link:'http://us8.campaign-archive2.com/?u=7f0ba73c23438f2647da6013b&id=d900ef0295&e=717dbe8f74'
				},
				{
					year:2014,
					month:'October',
					title:'October 2014',
					link:'http://us8.campaign-archive1.com/?u=7f0ba73c23438f2647da6013b&id=f4be319081&e=717dbe8f74'
				},
				{
					year:2014,
					month:'September',
					title:'September 2014',
					link:'http://us8.campaign-archive2.com/?u=7f0ba73c23438f2647da6013b&id=06f1c4211b&e=717dbe8f74'
				},
				{
					year:2014,
					month:'August',
					title:'August 2014',
					link:'http://us8.campaign-archive1.com/?u=7f0ba73c23438f2647da6013b&id=aba50c2c57&e=8f8d0c95e9'
				}
			]
		}
	}
	return NewsFactory;
}]);