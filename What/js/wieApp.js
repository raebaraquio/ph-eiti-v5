var wieApp = angular.module('what-is',['ngRoute','ngSanitize','ngCookies']);

wieApp.config(function($routeProvider){
 	$routeProvider
	 	.when('/',
	 	{
	 		title: 'History',
	 		templateUrl:'./template/history.html'
	 	})

	 	.when('/Standard',
	 	{
	 		title: 'Standard',
	 		templateUrl:'./template/standard.html'
	 	})

	 	.when('/Priciples',
	 	{
	 		title: 'Principles',
	 		templateUrl:'./template/principles.html'
	 	})
	 	
	 	.otherwise({
			redirectTo: '/'
		});;
}); 