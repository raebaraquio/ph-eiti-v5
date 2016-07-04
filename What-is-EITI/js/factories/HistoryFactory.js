wieApp.factory('HistoryFactory',function(){
	var HistoryFactory=null;
	HistoryFactory = {
		get : function(){
			return [				
				{
					year: 2002,
					date: 'October',
					badgeClass: 'primary',
					when: 'October',
					content: 'Tony Blair announces the Extractive Industries Transparency Initiative (EITI) at the World Summit for Sustainable Development in Johannesburg',
					contentHtml: 'Tony Blair announces the Extractive Industries Transparency Initiative (EITI) at the World Summit for Sustainable Development in Johannesburg'
				},
				{
					year:2003,
					date: 'June',
					badgeClass: 'primary',
					when: 'June',
					content: 'EITI Principles are formulated and approved at the first EITI Plenary Conference, at Lancaster House in London',
					contentHtml: 'EITI Principles are formulated and approved at the first EITI Plenary Conference, at Lancaster House in London'
				},
				{
					year:2006,
					date: 'October',
					badgeClass: 'primary',
					when: 'October',
					content: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.',
					contentHtml: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.'
				},
				{
					year:'',
					date: 'December',
					badgeClass: 'default',
					when: 'December',
					content: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.',
					contentHtml: 'The first international EITI Board is formed, consisting of 20 members representing implementing countries, supporting countries, civil society organizations, industry and investment companies.'
				},
				{
					year:2009,
					date: 'February',
					badgeClass: 'warning',
					when: 'February',
					content: 'Azerbaijan becomes the first EITI Compliant Country',
					contentHtml: 'Azerbaijan becomes the first EITI Compliant Country'
				},
				{
					year:2011,
					date: 'March',
					badgeClass: 'primary',
					when: 'March',
					content: 'Clare Short is appointed as Chair of the EITI during the 5th EITI Global Conference in Paris. The 2011 EITI Rules are adopted.',
					contentHtml: 'Clare Short is appointed as Chair of the EITI during the 5th EITI Global Conference in Paris. The 2011 EITI Rules are adopted.'
				},
				{
					year:2012,
					date: 'October',
					badgeClass: 'primary',
					when: 'October',
					content: 'The 100th EITI reconciliation report is published',
					contentHtml: 'The 100th EITI reconciliation report is published'
				},
				{
					year:2013,
					date: 'May',
					badgeClass: 'primary',
					when: 'May',
					content: 'The new EITI standards are adopted during the International Conference in Sydney, Australia. The Philippines is admitted as a candidate country.',
					contentHtml: 'The new EITI standards are adopted during the International Conference in Sydney, Australia. The Philippines is admitted as a candidate country.'
				},
				{
					year:'',
					date: 'To date',
					badgeClass: 'warning',
					when: 'To date',
					content: 'There are 46 countries that are implementing EITI: 29 compliant countries, 17 candidate countries',
					contentHtml: 'There are 46 countries that are implementing EITI: 29 compliant countries, 17 candidate countries'
				}
			]
		}
	}
	return HistoryFactory;
});