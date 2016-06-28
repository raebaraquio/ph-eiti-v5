var aboutApp = angular.module('about',['ngRoute','ngSanitize','ngCookies']);

aboutApp.config(function($routeProvider){
 	$routeProvider
	 	.when('/History',
	 	{
	 		title: 'History',
	 		templateUrl:'./template/history.html'
	 	})

	 	.when('/MSG-Members/Government',
	 	{
	 		templateUrl:'./template/msg/govt.html'
	 	})

	 	.when('/MSG-Members/CSO',
	 	{
	 		templateUrl:'./template/msg/cso.html'
	 	})

	 	.when('/MSG-Members/Industry',
	 	{
	 		templateUrl:'./template/msg/industry.html'
	 	})

	 	.when('/MSG-Members',
	 	{
	 		redirectTo: '/MSG-Members/Government'
	 	})

	 	.otherwise({
			redirectTo: '/History'
		});;
}); 