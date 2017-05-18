var secretariat = angular.module('Access', ['ngCookies','ngSanitize','ngRoute']);

secretariat.config(function($routeProvider){
    $routeProvider
    .when('/Home',
    {
        controller: 'HomeController',
        templateUrl: './html/Home/index.html'
    })
    // .otherwise(
    // {
    //     redirectTo: '/'
    // })
})
