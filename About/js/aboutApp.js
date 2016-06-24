var aboutApp = angular.module('about',['ngRoute','ngSanitize','ngCookies']);

aboutApp.config(function($routeProvider){
 	$routeProvider
	 	.when('/',
	 	{
	 		title: 'History',
	 		templateUrl:'./template/history.html'
	 	})

	 	.when('/mm/:type',
	 	{
	 		templateUrl:'./template/msg/member-group.html'
	 	})

	 	.when('/mm',
	 	{
	 		title: 'Mem',
	 		templateUrl:'./template/msg/members.html'
	 	})

	 	.otherwise({
			redirectTo: '/'
		});;
}); 