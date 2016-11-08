angular.module('navMod',['ngRoute','utilsModule'])
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
							},
							{
								id:"secretariat",
								name: "Secretariat",
								href: "Secretariat"
							}
						]
					},
					{
						id:"resources",
						name: "Resources",
						href: "Resources",
						subnav: [
							{
								id:"work-plan",
								name: "Work Plan",
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
								href: "Activity-Reports"
							},
							{
								id:"infographics",
								name: "Infographics",
								href: "Infographics"
							},
							{
								id:"gis",
								name: "General Information Sheet",
								href: "GIS"
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
								id:"ph-eiti-newsroom",
								name: "PH-EITI Newsroom",
								href:"PH-EITI-Newsroom"
							},
							{
								id:"ph-eiti-in-the-news",
								name: "PH-EITI In the News",
								href:"PH-EITI-In-the-News"
							},
							{
								id:"media-releases",
								name: "Media Releases",
								href: "Media-Releases"
							},
							{
								id:"newsletter",
								name: "Newsletter",
								href: "Newsletter"
							},
							{
								id:"archive",
								name: "Archive",
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
		},
		admin: function(){
			return [
				{
					id:"cms",
					href: "cms",
					name: "Content Management",
					subnav: [ ]
				}
			];
		}
	};
	return NavigationFactory;	
})
.controller('NavigationController',['$scope','$location','NavigationFactory','$rootScope','$route','utilsService','$mdMenu',
	function($scope,$location,NavigationFactory,$rootScope,$route,utilsService,$mdMenu){
	$scope.active = {
		mnav : '',
		subnav : ''
	}

	$scope.getnavigation = function() {
		$scope.main_nav = [];
		var mainnav = NavigationFactory.get();
		for (var idx=0;idx<mainnav.length;idx++){
			if (mainnav[idx].subnav.length > 0) {
				mainnav[idx].subnav_open = false;
				for (var sidx=0;sidx<mainnav[idx].subnav.length;sidx++) {
					mainnav[idx].subnav[sidx].subnav_open = false;
				}
			}
		}
		$scope.main_nav = mainnav;
		if ($location.$$absUrl.match(/#/gi)){
			var locs = $location.$$absUrl.split('#');
			var host = locs[0].split('/');
		}
		else {
			var host = $location.$$absUrl.split('/');
		}
		if (utilsService.inObj($scope.main_nav,'href',host[host.length-2])) {
			$scope.active.mnav = utilsService.getObjOtherPropVal($scope.main_nav,'href',host[host.length-2],'id');
		}
		$scope.active.subnav = ''
	}

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

	$scope.getnavigation();

	$scope.runMe=function(){
		$mdMenu.hide();
	}

	$scope.$on('$mdMenuOpen', function(event, menu) { 
		
	});

	$scope.$on('$mdMenuClose', function(event, menu) { 
		for (var idx=0;idx<$scope.main_nav.length;idx++){
			if ($scope.main_nav[idx].subnav_open===true){
				$scope.main_nav[idx].subnav_open = false;
			}			
		}
	});

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