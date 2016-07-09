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
				},
				{
					name: 'General Information Sheet',
					href: '/GIS',
					multiple: true
				}
			]
		},
		workPlan : function(){
			return [
				{
					year:'2016',
					title: '2016 Work Plan',
					lastUpdated: '',
					src:'../document/Work-Plan/2016/05/30/2016WorkPlan_12May16_FINAL.pdf'
				},
				{
					year:'2015',
					title: '2015 Work Plan',
					lastUpdated: '',
					src:'../document/Work-Plan/2015/03/PH-EITI_2015_WorkPlan_sent_to_EITI_Intl.pdf'
				},
				{
					year:'2013-2014',
					title: '2013-2014 Work Plan',
					lastUpdated: '',
					src:'../document/Work-plan-as-of-May.pdf'
				}
			]
		},
		studies: function(){
			return [
				{
					id:'Scoping-Study-on-Local-Revenue-Streams-and-Subnational-Implementation',
					title:'Scoping Study on Local Revenue Streams and Subnational Implementation',
					file:'document/Papers/Scoping-Study-on-Local-Revenue-Streams-and-Subnational-Implementation.pdf'
				},
				{
					id:'Legal-Framework',
					title:'Legal Framework',
					file:'document/Papers/Final-EITI-Legal_Framework_October2014.pdf'
				},
				{
					id:'Economic-Contribution-Mining',
					title:'Economic Contribution: Mining',
					file:''
				},
				{
					id:'Economic-Contribution-Oil-and-Gas',
					title:'Economic Contribution: Oil and Gas',
					file:''
				},
				{
					id:'Economic-Contribution-Coal',
					title:'Economic Contribution: Coal',
					file:''
				},
				{
					id:'IPs',
					title:'IPs',
					file:'document/Papers/IP-Study-Formatted.pdf'
				},
				{
					id:'Licensing-Processes ',
					title:'Licensing Processes ',
					file:'document/Papers/Licensing-Processes-Formatted.pdf'
				},
				{
					id:'State-Owned-Enterprises',
					title:'State Owned Enterprises',
					file:'document/Papers/SOE-Study-Formatted.pdf'
				}
			]
		},
		orgdocs: function(){
			return {
				date: {
					'lastUpdated': 'May 30, 2016 10:27 PM',
					'created':''
				},
				subfolders: [
					{
						folder_id:'MSG-Selection-Process',
						folder_name:'MSG Selection Process',
						subfolders: [],
						files: [
							{
								id:'CSO-selection-process',
								title:'CSO Selection Process',
								author:'',
								src:'../document/PH-EITI-Creation/2015/10/22/CSO-selection-process_EITI.pdf'
							},
							{
								id:'PAP-Selection-Process',
								title:'PAP Selection Process',
								author:'',
								src:'../document/PH-EITI-Creation/2015/10/22/EITI-PH-MSG-selection-process.pdf'
							}
						]
					}
				],
				files: [
					{
						id:'PH-EITI-Internal-Rules',
						title:'PH-EITI Internal Rules',
						author:'',
						src:'../document/PH-EITI-Internal-Rules.pdf'
					},
					{
						id:'MSG-Terms-of-Reference-(TOR)',
						title:'MSG Terms of Reference (TOR)',
						author:'',
						src:'../document/MSG-TOR-amended.pdf'
					},
					{
						id:'Statement-of-Commitment',
						title:'Statement of Commitment',
						author:'',
						src:'../document/PH-EITI-MSG-Statement-of-commitment.pdf'
					},
					{
						id:'Statement-of-the-President',
						title:'Statement of the President',
						author:'',
						src:'../document/Statement-of-President-Aquino.pdf'
					}
				]
			}
		},
		activityReports: function(){
			return {
				folder_id:'Activity-Report',
				folder_name:'Activity Report',
				date: {
					'lastUpdated': 'August 30, 2015 11:18 PM',
					'created':''
				},
				subfolders: [],
				files: [
					{
						id: "First-Year-of-Implementation",
						title: "First Year of Implementation",
						author:'',
						coverage:"August 2012 - May 2014",
						src:"../document/2014/07/PH-EITI-Activity-Report.pdf",
						cardIcon:"../document/2014/07/card-icon.png"
					},
					{
						id: "Second-Year-of-Implementation",
						title: "Second Year of Implementation",
						coverage:"June 2014 - June 2015",
						src:"../document/2015/07/06/2nd-PH-EITI-Annual-Activity-Report.pdf",
						cardIcon:"../document/2015/07/06/card-icon.png"
					}
				]
			}
		},
		gis: function(){
			return  {
				id:"gis",
				href:"GIS",
				name:"General Information Sheet (GIS)",
				img:"images/icons/svg/compass80.svg",
				subfolders:[
					{
						folder_id: '2012',
						folder_name: '2012',
						year:2012,
						subfolders: [],
						files: [
							{
								id:"Philodrill-Corporation",
								title:"Philodrill Corporation",
								author: "",
								file:"filerepo/GIS/2016/01/10/2012/Philodrill Corporation.pdf"
							}
						]
					},
					{
						folder_id: '2013',
						folder_name: '2013',
						year:2013,
						subfolders: [],
						files: [
							{
								id:"Century Peak Corporation",
								title:"Century Peak Corporation",
								author: "",
								file:"filerepo/GIS/2016/01/10/2013/Century Peak Corporation.pdf"
							}
						]
					},
					{
						folder_id: '2014',
						folder_name: '2014',
						year:2014,
						subfolders: [],
						files: [
							{id:'AAM-PHIL-Natural-Resources-Exploration-and-Development-Corporation',title:'AAM-PHIL Natural Resources Exploration and Development Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/AAM-PHIL Natural Resources Exploration and Development Corporation.pdf'},
							{id:'Adnama-Mining-Resources,-Inc',title:'Adnama Mining Resources, Inc',author:'',file:'filerepo/GIS/2016/01/10/2014/Adnama Mining Resources, Inc.pdf'},
							{id:'Apex-Mining-Co.,-Inc.',title:'Apex Mining Co., Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/Apex Mining Co., Inc..pdf'},
							{id:'Atro-Mining-Vitali,-Inc',title:'Atro Mining-Vitali, Inc',author:'',file:'filerepo/GIS/2016/01/10/2014/Atro Mining-Vitali, Inc.pdf'},
							{id:'Berong-Nickel-Corporation',title:'Berong Nickel Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Berong Nickel Corporation.pdf'},
							{id:'Cagdianao-Mining-Corporation',title:'Cagdianao Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Cagdianao Mining Corporation.pdf'},
							{id:'Cambayas-Mining-Corporation',title:'Cambayas Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Cambayas Mining Corporation.pdf'},
							{id:'Carmen-Copper-Corporation',title:'Carmen Copper Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Carmen Copper Corporation.pdf'},
							{id:'Carrascal-Nickel-Corporation',title:'Carrascal Nickel Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Carrascal Nickel Corporation.pdf'},
							{id:'Century-Peak-Corporation',title:'Century Peak Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Century Peak Corporation.pdf'},
							{id:'Citinickel-Mines-and-Development-Corporation',title:'Citinickel Mines and Development Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Citinickel Mines and Development Corporation.pdf'},
							{id:'Eramen-Minerals,-Inc.',title:'Eramen Minerals, Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/Eramen Minerals, Inc..pdf'},
							{id:'Filminera-Resources-Corporation',title:'Filminera Resources Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Filminera Resources Corporation.pdf'},
							{id:'Forum-Energy-Philippines-Corporation',title:'Forum Energy Philippines Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Forum Energy Philippines Corporation.pdf'},
							{id:'Forum-Pacific,-Inc',title:'Forum Pacific, Inc',author:'',file:'filerepo/GIS/2016/01/10/2014/Forum Pacific, Inc.pdf'},
							{id:'Greenstone-Resources-Corporation',title:'Greenstone Resources Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Greenstone Resources Corporation.pdf'},
							{id:'Hinatuan-Mining-Corporation',title:'Hinatuan Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Hinatuan Mining Corporation.pdf'},
							{id:'Johson-Gold-Mining-Corporation',title:'Johson Gold Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Johson Gold Mining Corporation.pdf'},
							{id:'Lepanto-Consolidated-Mining-Company',title:'Lepanto Consolidated Mining Company',author:'',file:'filerepo/GIS/2016/01/10/2014/Lepanto Consolidated Mining Company.pdf'},
							{id:'Leyte-Iron-Sand-Mining-Corporation',title:'Leyte Iron Sand Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Leyte Iron Sand Mining Corporation.pdf'},
							{id:'Libjo-Mining-Corporation',title:'Libjo Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Libjo Mining Corporation.pdf'},
							{id:'Marcventures-Mining-and-Development-Corporation',title:'Marcventures Mining and Development Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Marcventures Mining and Development Corporation.pdf'},
							{id:'Mt.-Sinai-Mining-Exploration-and-Development-Corporation',title:'Mt. Sinai Mining Exploration and Development Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Mt. Sinai Mining Exploration and Development Corporation.pdf'},
							{id:'Nido-Petroleum-Phils.,-PTY.-LTD.',title:'Nido Petroleum Phils., PTY. LTD.',author:'',file:'filerepo/GIS/2016/01/10/2014/Nido Petroleum Phils., PTY. LTD..pdf'},
							{id:'Norweah-Metals-and-Minerals-Co.,-Inc.',title:'Norweah Metals and Minerals Co., Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/Norweah Metals and Minerals Co., Inc..pdf'},
							{id:'Ore-Asia-Mining-and-Development-Corporation',title:'Ore Asia Mining and Development Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Ore Asia Mining and Development Corporation.pdf'},
							{id:'Oriental-Petroleum-and-Minerals-Corporation',title:'Oriental Petroleum and Minerals Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Oriental Petroleum and Minerals Corporation.pdf'},
							{id:'Oriental-Synergy-Mining-Corporation',title:'Oriental Synergy Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Oriental Synergy Mining Corporation.pdf'},
							{id:'Pacific-Nickel-Phils.,-Inc.',title:'Pacific Nickel Phils., Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/Pacific Nickel Phils., Inc..pdf'},
							{id:'Philex-Mining-Corporation',title:'Philex Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Philex Mining Corporation.pdf'},
							{id:'Philodrill-Corporation',title:'Philodrill Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Philodrill Corporation.pdf'},
							{id:'Philsaga-Mining-Corporation',title:'Philsaga Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Philsaga Mining Corporation.pdf'},
							{id:'Platinum-Group-Metals-Corporation',title:'Platinum Group Metals Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Platinum Group Metals Corporation.pdf'},
							{id:'Rio-Tuba-Nickel-Mining-Corporation',title:'Rio Tuba Nickel Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Rio Tuba Nickel Mining Corporation.pdf'},
							{id:'Shenzhou-Mining-Group-Corporation',title:'Shenzhou Mining Group Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Shenzhou Mining Group Corporation.pdf'},
							{id:'Shuley-Mine,-Inc.',title:'Shuley Mine, Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/Shuley Mine, Inc..pdf'},
							{id:'Sinosteel-Phils.-H.Y.-Mining-Corporation',title:'Sinosteel Phils. H.Y. Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Sinosteel Phils. H.Y. Mining Corporation.pdf'},
							{id:'SR-Languyan-Mining-Corporation',title:'SR Languyan Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/SR Languyan Mining Corporation.pdf'},
							{id:'SR-Metals,-Inc.',title:'SR Metals, Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/SR Metals, Inc..pdf'},
							{id:'Strong-Built-(Mining)-Development-Corporation',title:'Strong Built (Mining) Development Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Strong Built (Mining) Development Corporation.pdf'},
							{id:'Taganito-Mining-Corporation',title:'Taganito Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Taganito Mining Corporation.pdf'},
							{id:'TVI-Resource-Development-Phils.,-Inc.',title:'TVI Resource Development Phils., Inc.',author:'',file:'filerepo/GIS/2016/01/10/2014/TVI Resource Development Phils., Inc..pdf'},
							{id:'Wellex-Mining-Corporation',title:'Wellex Mining Corporation',author:'',file:'filerepo/GIS/2016/01/10/2014/Wellex Mining Corporation.pdf'}
						]
					},
					{
						folder_id: '2015',
						folder_name: '2015',
						year:2015,
						subfolders: [],
						files: [
							{
								id:"Chevron-Malampaya-LLC",
								title:"Chevron Malampaya LLC",
								author: "",
								file:"filerepo/GIS/2016/01/10/2015/Chevron Malampaya LLC.pdf"
							},
							{
								id:"Investwell-Resources,-Inc",
								title:"Investwell Resources, Inc",
								author: "",
								file:"filerepo/GIS/2016/01/10/2015/Investwell Resources, Inc.pdf"
							}
						]
					}
				],
				files: []
			}
		}
	}
	return ResourcesFactory;
}]);
