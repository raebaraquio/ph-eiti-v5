wieApp.factory('HistoryFactory',function(){
	var HistoryFactory=null;
	HistoryFactory = {
		get : function(){
			return [				
				{
					year:2016,
					date: 'April',
					start:true,
					badgeClass: 'warning',
					when: 'As of April 2016',
					content: 'There are 51 countries that are implementing EITI: 31 compliant countries, 20 candidate countries',
					contentHtml: 'There are 51 countries that are implementing EITI: 31 compliant countries, 20 candidate countries'
				},
				{
					year:2012,
					date: 'October',
					start:true,
					badgeClass: 'primary',
					when: 'October',
					content: 'The 100th EITI reconciliation report is published',
					contentHtml: 'The 100th EITI reconciliation report is published'
				},
				{
					year:2011,
					date: 'March',
					start:true,
					badgeClass: 'primary',
					when: 'March',
					content: 'Clare Short is appointed as Chair of the EITI during the 5th EITI Global Conference in Paris. The 2011 EITI Rules are adopted.',
					contentHtml: 'Clare Short is appointed as Chair of the EITI during the 5th EITI Global Conference in Paris. The 2011 EITI Rules are adopted.'
				},
				{
					year:2009,
					date: 'February',
					start:true,
					badgeClass: 'warning',
					when: 'February',
					content: 'Azerbaijan becomes the first EITI Compliant Country',
					contentHtml: 'Azerbaijan becomes the first EITI Compliant Country'
				},
				{
					year:2009,
					date: 'December',
					start:false,
					badgeClass: 'default',
					when: 'December',
					content: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.',
					contentHtml: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.'
				},
				{
					year:2006,
					date: 'October',
					start:true,
					badgeClass: 'primary',
					when: 'October',
					content: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.',
					contentHtml: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.'
				},
				{
					year:2003,
					date: 'June',
					start:true,
					badgeClass: 'primary',
					when: 'June',
					content: 'EITI Principles are formulated and approved at the first EITI Plenary Conference, at Lancaster House in London',
					contentHtml: 'EITI Principles are formulated and approved at the first EITI Plenary Conference, at Lancaster House in London'
				},
				{
					year: 2002,
					date: 'October',
					start:true,
					badgeClass: 'primary',
					when: 'October',
					content: 'Tony Blair announces the Extractive Industries Transparency Initiative (EITI) at the World Summit for Sustainable Development in Johannesburg',
					contentHtml: 'Tony Blair announces the Extractive Industries Transparency Initiative (EITI) at the World Summit for Sustainable Development in Johannesburg'
				}
			]
		}
	}
	return HistoryFactory;
});