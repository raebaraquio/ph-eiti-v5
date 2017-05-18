var access = angular.module('Access', ['ngCookies','ngSanitize','ngRoute']);

access.config(function($routeProvider){
    $routeProvider
    $routeProvider
    .when('/',
    {
    	controller: 'LoginController',
        templateUrl: './html/Login/index.html'
    })
    // .when('/Home',
    // {
    //     controller: 'HomeController',
    //     templateUrl: './html/Home/index.html'
    // })
    // .otherwise(
    // {
    //     redirectTo: '/'
    // })
})
