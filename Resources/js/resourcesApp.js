var resourcesApp = angular.module('resources',['ngRoute','ngSanitize','ngCookies']);

 resourcesApp.config(function($routeProvider){
 	$routeProvider
	 	.when('/',
	 	{
	 		templateUrl:'./template/work-plan/index.html'	
	 	})

	 	.when('/Work-Plan',
	 	{
	 		templateUrl:'./template/work-plan/index.html'	
	 	})

	 	.when('/Laws-&-Legal-Issuances',
	 	{
	 		templateUrl:'./template/laws-and-legal-issuances/index.html'	
	 	})

	 	.when('/Organization-Documents',
	 	{
	 		templateUrl:'./template/organizational-documents/index.html'	
	 	})

	 	.when('/Studies',
	 	{
	 		templateUrl:'./template/studies/index.html'	
	 	})

	 	.when('/Infographics',
	 	{
	 		templateUrl:'./template/infographics/index.html'	
	 	})

	 	.when('/Activity-Reports',
	 	{
	 		templateUrl:'./template/activity-reports/index.html'	
	 	})

	 	.otherwise({
	 		redirectTo: '/'
	 	})
}); 