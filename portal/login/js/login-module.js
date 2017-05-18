var login = angular.module('login', ['ngCookies','ngSanitize','ngRoute','ngAnimate','utilsModule','sessionModule','ngMaterial']);
login.config(function($routeProvider){
    $routeProvider
    .when('/',
    {
    	controller: 'LoginController',
        templateUrl: './partials/login.html'
    })
})
