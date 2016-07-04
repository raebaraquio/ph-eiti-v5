resourcesApp.factory('ResourcesFactory',['$http',
	function($http){
	var ResourcesFactory=null;
	ResourcesFactory = {
		content : function(){
			return [
				{
					name: 'Work Plan',
					href: '/Work-Plan',
					multiple:false

				},
				{
					name: 'Laws and Legal Issuances',
					href: '/Laws-and-Legal-Issuances',
					multiple:true
				},
				{
					name: 'Organization Documents',
					href: '/Laws-and-Legal-Issuances',
					multiple:true
				},
				{
					name: 'Studies',
					href: '/Laws-and-Legal-Issuances',
					multiple:true
				},
				{
					name: 'Activity Reports',
					href: '/Activity Reports',
					multiple:true
				},
				{
					name: 'Infographics',
					href: '/Infographics',
					media:true
				}

			]
		},
		workPlan : function(){
			return [
				{
					year:'2016',
					title: '2016 Work Plan',
					lastUpdated: '',
					src: ''
				},
				{
					year:'2015',
					title: '2015 Work Plan',
					lastUpdated: '',
					src: ''
				},
				{
					year:'2013-2014',
					title: '2013-2014 Work Plan',
					lastUpdated: '',
					src: ''
				}
			]
		}
	}
	return ResourcesFactory;
}]);