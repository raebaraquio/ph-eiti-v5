var cms = angular.module('cms', ['ngCookies','ngSanitize','ngRoute','navigationDirective','userprofile','ngAnimate','cgBusy','ui.tinymce','ngMaterial','inputfileupload','angular-pdf-thumbnail','utilsModule','angular-thumbnails','md.data.table'])
cms.config(function($routeProvider){
	$routeProvider
	.when('/',
	{
		redirectTo: '/News'
	})
	.when('/News/add/:category',
	{
		title: 'Add - News | PH-EITI',
		controller:'CMSAddNewsController',
		templateUrl:'./partials/News/add.html'
	})
	.when('/:category/Article/:id',
	{
		title: 'Article | PH-EITI',
		controller:'CMSViewNewsController',
		templateUrl:'./partials/News/article.html'
	})
	.when('/:category/Article/Edit/:pk/:id',
	{
		title: 'Edit - News | PH-EITI',
		controller:'CMSEditNewsController',
		templateUrl:'./partials/News/edit.html'
	})
	.when('/News',
	{
		controller:'CMSNewsController',
		templateUrl:'./partials/News/index.html'
	})
	.when('/PH-EITI in the News',
	{
		controller:'CMSNewsController',
		templateUrl:'./partials/News/index.html'
	})
	.when('/PH-EITI Newsroom',
	{
		controller:'CMSNewsController',
		templateUrl:'./partials/News/index.html'
	})
	.when('/Media Releases',
	{
		controller:'CMSNewsController',
		templateUrl:'./partials/News/index.html'
	})

	.when('/Resources',
	{
		controller:'CMSResourcesController',
		templateUrl:'./partials/Resources/index.html'
	})	

	.when('/Activities/add',
	{
		controller:'CMSActivitiesAddController',
		templateUrl:'./partials/Activities/add.html'
	})	
	.when('/Activities',
	{
		controller:'CMSActivitiesController',
		templateUrl:'./partials/Activities/index.html'
	})
	.when('/MSG Meetings',
	{
		controller:'CMSMSGMeetingsController',
		templateUrl:'./partials/MSG Meetings/index.html'
	})
	.when('/MSG Members',
	{
		controller:'CMSMSGMembersController',
		templateUrl:'./partials/MSG Members/index.html'
	})
	.when('/Reporting Templates',
	{
		controller:'CMSReportingTemplatesController',
		templateUrl:'./partials/Reporting Templates/index.html'
	})
	.when('/Country Report',
	{
		controller:'CMSReportController',
		templateUrl:'./partials/Country Report/index.html'
	})
});

// .when('/EITI-in-other-Countries',
// {
// 	controller:'CMSNewsController',
// 	templateUrl:'./partials/News/index.html'
// })
// .when('/Blogs',
// {
// 	controller:'CMSNewsController',
// 	templateUrl:'./partials/News/index.html'
// })
// .when('/MSG-Member-of-the-Month',
// {
// 	controller:'CMSNewsController',
// 	templateUrl:'./partials/News/index.html'
// })
// .when('/Announcements',
// {
// 	controller:'CMSAnnouncementsController',
// 	templateUrl:'./partials/Announcements/index.html'
// })	

cms.config(function($mdThemingProvider) {
	/* Blue is primary; Yellow is accent; */
	 var customPrimary = {
        '50': '#4c8cc7',
        '100': '#3b7fbe',
        '200': '#3572aa',
        '300': '#2f6597',
        '400': '#295883',
        '500': '#234b70',
        '600': '#1d3e5d',
        '700': '#173149',
        '800': '#112436',
        '900': '#0b1722',
        'A100': '#5f98cd',
        'A200': '#72a5d3',
        'A400': '#86b1d9',
        'A700': '#050a0f'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#624900',
        '100': '#7b5c00',
        '200': '#947001',
        '300': '#ae8301',
        '400': '#c79601',
        '500': '#e1a901',
        '600': '#fec416',
        '700': '#fecb30',
        '800': '#fed149',
        '900': '#fed863',
        'A100': '#fec416',
        'A200': '#fabc01',
        'A400': '#e1a901',
        'A700': '#fede7c'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#fefefe',
        '500': '#f1f1f1',
        '600': '#e4e4e4',
        '700': '#d7d7d7',
        '800': '#cbcbcb',
        '900': '#bebebe',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#b1b1b1'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

    $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground')
	
});

cms.directive('fileforupload',['$parse', function($parse){
	return {
		restrict: "A",
		scope: {
			maxsize:"="
		},
		controller: function($scope,$element){
			function init(){
				var files = $element.fileList
				var currFile = {}
				if (files) {
					if (files.length == 1) {
						currFile = files[0]
						if (currFile.size > $scope.maxsize) {

						}
					}	
				}
			}
			init();
		},
		link: function(scope,element,attrs){
			var model = $parse(attrs.fileforupload)
			var modelSetter = model.assign;

			element.bind('change',function(){ 
				if (element[0]) {
					if (element[0].files[0]) {
						var currfile = element[0].files[0]
						var form = document.getElementById('add-form-Media')

						scope.$apply(function(){
							console.log(element[0].files[0].size)
							console.log(scope.maxsize)
							console.log(element[0].files[0])
							if (element[0].files[0].size > scope.maxsize) {
								alert('File is too large. Kindly upload no more than 500KB');
								form.reset()
								return;
							}
							modelSetter(scope,element[0].files[0])
						})		
					}
				}
				
			})
		}
	}
}])