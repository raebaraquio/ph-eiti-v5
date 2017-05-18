var secretariat = angular.module('Secretariat', ['ngCookies','ngSanitize','ngRoute']);

secretariat.config(function($routeProvider){
    $routeProvider
    .when('/',
    {
        controller: 'ProfileController',
        templateUrl: './html/Profile/index.html'
    })
    .when('/Content-Management/Announcements',
    {
        controller: 'CMAnnouncementsController',
        templateUrl: './html/Content-Management/announcements.html'
    })
    // .when('/Content-Management/News-and-Articles',
    // {
    //     controller: 'CMNewsandArticlesController',
    //     templateUrl: './html/Content-Management/news-and-articles.html'
    // })
    .when('/Content-Management/News',
    {
        controller: 'CMNewsController',
        templateUrl: './html/Content-Management/news.html'
    })
    .when('/Content-Management/Newsletter',
    {
        controller: 'CMNewsletterController',
        templateUrl: './html/Content-Management/newsletter.html'
    })
    .when('/Content-Management/Status-Report/:id/view',
    {
        controller: 'CMStatusReportTaskViewController',
        templateUrl: './html/Content-Management/status-report-taskview.html'
    })
    .when('/Content-Management/Status-Report/New',
    {
        controller: 'CMStatusReportNewController',
        templateUrl: './html/Content-Management/status-report-addtask.html'
    })
    .when('/Content-Management/Status-Report',
    {
        controller: 'CMStatusReportController',
        templateUrl: './html/Content-Management/status-report.html'
    })
    .when('/Content-Management',
    {
        controller: 'ContentManagementController',
        templateUrl: './html/Content-Management/index.html'
    })
    .when('/Account-Settings',
    {
        controller: 'AccountSettingsController',
        templateUrl: './html/Account-Settings/index.html'
    })
    .otherwise(
    {
        redirectTo: '/'
    })
})
