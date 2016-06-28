angular.module('navMod',['ngRoute'])
.factory('NavigationFactory',function(){
	var NavigationFactory = {
		get : function(){
			return [
					{
						id:"what-is-eiti",
						href: "What-is-EITI",
						name: "What is EITI",
						subnav: [
							{
								id:"history",
								name: "History",
								href: "History"
							},
							{
								id:"the-eiti-principles",
								name: "The EITI Principles",
								href:"The-EITI-Principles"
							},
							{
								id:"the-eiti-standard",
								name: "The EITI Standard",
								href: "The-EITI-Standard"
							}
						]
					},
					{
						id:"about-ph-eiti",
						href: "About-PH-EITI",
						name: "About PH-EITI",
						subnav: [
							{
								id:"history",
								name: "History of PH-EITI",
								href: "History"
							},
							{
								id:"msg-members",
								name: "MSG Members",
								href:"MSG-Members",
								subnav : [
									{
										id:"government",
										name: "Government",
										href: "Government"
									},
									{
										id:"cso",
										name: "CSO",
										href: "CSO"
									},
									{
										id:"industry",
										name: "Industry",
										href: "Industry"
									}
								]
							}
							/*,{
								id:"secretariat",
								name: "Secretariat",
								href: "Secretariat"
							}*/
						]
					},
					{
						id:"resources",
						name: "Resources",
						href: "Resources",
						subnav: [
							{
								id:"work-plan",
								name: "2016 Work Plan",
								href: "Work-Plan"
							},
							{
								id:"laws-and-legal-issuances",
								name: "Laws & Legal Issuances",
								href:"Laws-and-Legal-Issuances"
							},
							{
								id:"studies",
								name: "Studies",
								href: "Studies"
							},
							{
								id:"org-docs",
								name: "Organizational Documents",
								href: "Organizational-Documents"
							},
							{
								id:"activity-reports",
								name: "Activity Reports",
								href: "Acitvity-Reports"
							},
							{
								id:"infographics",
								name: "Infographics",
								href: "Infographics"
							}
						]
					},
					{
						id:"activities",
						name: "Activities",
						href:"Activities",
						subnav: [
							
						]
					},
					{
						id:"news",
						name: "News",
						href: "News",
						subnav: [
							{
								id:"media-releases",
								name: "Media Releases",
								href: "Media-Releases"
							},
							{
								id:"in-the-news",
								name: "In the News",
								href:"In-the-News"
							},
							{
								id:"newsletter",
								name: "Newsletter",
								href: "Newsletter"
							},
							{
								id:"archive",
								name: "archive",
								href: "Archive"
							}
						]
					},
					{
						id:"country-reports",
						name: "Country Reports",
						href: "Country-Reports",
						subnav: [
						]
					}
			];
		}
	};
	return NavigationFactory;	
})
.controller('NavigationController',['$scope','$location','NavigationFactory','$rootScope','$route',
	function($scope,$location,NavigationFactory,$rootScope,$route){
	$scope.active = {
		mnav : '',
		subnav : ''
	}
	
	$scope.getnavigation = function() {
		$scope.main_nav = [];
		$scope.main_nav = NavigationFactory.get();	
		console.log($scope.main_nav)
	}

	// if ($location.$$absUrl.match(/#/gi)){
		console.log($location.$$absUrl)
		// $scope.active.mnav = $location.$$absUrl.split('app')[1].split('/')[1]
		// $scope.active.subnav = ''
	// }

	$rootScope.$on('$routeChangeSuccess', function(next, current) { 
		try {
			$scope.active.subnav = $location.path().split('/')[1]	
			if ($route.current.title) {
				document.title = $route.current.title;	
			}
		}
		catch(err)	{
			
		}
	});
	$scope.getnavigation()
}])
.directive('footersitemap',function(){
	// var templateurl = 'app/Navigation/footer-sitemap-template.html'
	// if (window.location.href != 'http://localhost:8088/modular-frontend/#/' &&
	// 	window.location.href != 'http://localhost/modular-frontend/#/' && 
	// 	window.location.href != 'http://ph-eiti.org/#') {
	// 	templateurl = '../../'+templateurl
	// }
	// return {
	// 	restrict : 'A',
	// 	replace:true,
	// 	scope: {
	// 		navs:'='
	// 	},
	// 	templateUrl : templateurl
	// }	
})
.directive('navigation',function(){
	var templateurl = 'app/Navigation/main-navigation-template.html'
	// if (window.location.href != 'http://localhost:8088/modular-frontend/#/' &&
	// 	window.location.href != 'http://localhost/modular-frontend/#/' && 
	// 	window.location.href != 'http://ph-eiti.org/#') {
	// 	templateurl = '../../'+templateurl
	// }
	return {
		restrict : 'A',
		replace:true,
		scope: {
			navs:'=',
			selected:'='
		},
		templateUrl : templateurl
	}	
})
.directive('homefootersitemap',function(){
	// var templateurl = 'app/Navigation/home-footer-sitemap-template.html'
	// return {
	// 	restrict : 'A',
	// 	replace:true,
	// 	scope: {
	// 		navs:'='
	// 	},
	// 	templateUrl : templateurl
	// }	
})
.directive('homenavigation',function(){
	var templateurl = 'template/nav/'
	return {
		restrict : 'A',
		replace:true,
		scope: {
			navs:'=',
			selected:'='
		},
		templateUrl : templateurl
	}	
})