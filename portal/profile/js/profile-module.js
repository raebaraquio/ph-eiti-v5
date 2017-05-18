var profile = angular.module('profile',['ngCookies','ngRoute','ngSanitize','navigationDirective'])
profile.config(['$routeProvider',function($routeProvider){
	$routeProvider
    .when('/',
    {
    	controller: 'ProfileController',
        templateUrl: './partials/profile.html'
    })
    .when('/edit/:id',
    {
    	controller: 'EditProfileController.js',
        templateUrl: './partials/edit-profile.html'
    })
}])