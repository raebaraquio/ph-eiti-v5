countryReportApp.factory('CountryReportFactory', function($http,$location){
	var CountryReportFactory = {
		lastupdated : 'March 25, 2016 09:31 AM',
		get : function() {
			return [
				{
					id:"First-Country-Report",
					href:"First-Country-Report",
					title:"First Country Report",
					date:'December 2014',
					lastupdated: 'September 08, 2015 10:13 PM',
					card_img:'../document/EITI-Report/First-Country-Report/card-icon.png',
					content: [
						{
							title:"Volume 1 - Contextual Information",
							href:"Volume-1-Contextual-Information",
							id:'contextual-information',
							multiple:false,
							file:'../document/EITI-Report/First-Country-Report/PH-EITI_Report_Volume_1_Contextual_Info_final.pdf',
							cardIcon:'../document/EITI-Report/First-Country-Report/card-icon-vol1.png'
						},
						{
							title:"Volume 2 - Reconciliation Report",
							href:"Volume-2-Reconciliation",
							id:'reconciliation-report',
							multiple:false,
							file:'../document/EITI-Report/First-Country-Report/PH-EITI_Report_Volume_II_Reconciliation_Report_final.pdf',
							cardIcon:'../document/EITI-Report/First-Country-Report/card-icon-vol2.png'
						},
						{
							title:"Annex Volume 1 - Contextual Information",
							href:"Annexes-Volume-1",
							id:'annex-vol-1',
							multiple:false,
							file:'../document/EITI-Report/First-Country-Report/Annexes_Volume_I_Contextual_Information.pdf',
							cardIcon:'../document/EITI-Report/First-Country-Report/card-icon-annexes.png'
						},
						{
							title:"Data Summary Template",
							href:"Data-Summary-Template",
							id:'data-summary-template',
							multiple:false,
							file:'../document/EITI-Report/First-Country-Report/PH-EITI_Data-Summary-Template_final.xlsx',
							cardIcon:'../document/EITI-Report/First-Country-Report/card-icon-xlsx.png',
							mso:true
						},
						{
							title:"Production Data (2012 and 2013)",
							href:"Production-Data-2012-and-2013",
							id:'production-data-2012-and-2013',
							multiple:false,
							file:'../document/EITI-Report/First-Country-Report/Metallic-Production-2013-vs-2012.pdf',
							cardIcon:'../document/EITI-Report/First-Country-Report/card-icon-metallic.png'
						},
						{
							title:"Completed Reporting Templates",
							href:"Completed-Reporting-Templates",
							id:'completed-reporting-templates',
							multiple:true,
							file:'',
							cardIcon:'../document/EITI-Report/First-Country-Report/card-icon-none.png',
							templates: {
								"Companies" : [
									{
										company:"Adnama Mining Resources",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Adnama Mining Resources.zip",
									},
									{
										company:"Apex Mining Co. Inc",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Apex Mining Co. Inc.pdf",
									},
									{
										company:"Benguetcorp Nickel Mines Inc",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Benguetcorp Nickel Mines Inc.pdf",
									},
									{
										company:"Berong Nickel Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Berong Nickel Corporation.pdf",
									},
									{
										company:"Cagdianao Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Cagdianao Mining Corporation.zip",
									},
									{
										company:"Cambayas Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Cambayas Mining Corporation.pdf",
									},
									{
										company:"Carmen Copper Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Carmen Copper Corporation.pdf",
									},
									{
										company:"Carrascal Nickel Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Carrascal Nickel Corporation.pdf",
									},
									{
										company:"Chevron Malampaya LLC",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Chevron Malampaya LLC.pdf",
									},
									{
										company:"Eramen Minerals, Inc.",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Eramen Minerals, Inc.pdf",
									},
									{
										company:"Filminera Resources Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Filminera Resources Corporation.pdf",
									},
									{
										company:"Galoc Production Company",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Galoc Production Company.xlsx",
									},
									{
										company:"Greenstone Resources Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Greenstone Resources Corporation.zip",
									},
									{
										company:"Hinatuan Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Hinatuan Mining Corporation.pdf",
									},
									{
										company:"Johson Gold Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Johson Gold Mining Corporation.pdf",
									},
									{
										company:"Lepanto Consolidated Mining Company",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Lepanto Consolidated Mining Company.pdf",
									},
									{
										company:"Leyte Iron Sand Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Leyte Iron Sand Mining Corporation.pdf",
									},
									{
										company:"LNL Archipelago Minerals Incorporated",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/LNL Archipelago Minerals Incorporated.pdf",
									},
									{
										company:"Marcventures Mining and Development Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Marcventures Mining and Development Corporation.pdf",
									},
									{
										company:"Nido Production Galoc Pty. Ltd",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Nido Prodution Galoc.pdf",
									},
									{
										company:"Oceana Gold",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Oceana Gold.pdf",
									},
									{
										company:"Philex Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Philex Mining Corporation.pdf",
									},
									{
										company:"Philippine Mining Development Corporation (PMDC)",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Philippine Mining Development Corporation (PMDC).pdf",
									},
									{
										company:"Philsaga Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Philsaga Mining Corporation.pdf",
									},
									{
										company:"Platinum Group Metals Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Platinum Group Metals Corporation.pdf",
									},
									{
										company:"PNOC-Exploration Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/PNOC- Exploration Corporation.pdf",
									},
									{
										company:"Rapu Rapu Minerals Inc",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Rapu Rapu Minerals Inc.zip",
									},
									{
										company:"Rio Tuba Nickel Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Rio Tuba Nickel Mining Corporation.pdf",
									},
									{
										company:"Shell Philippines Exploration B.V.",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Shell Philippines Exploration B.V.pdf",
									},
									{
										company:"Shuley Mine Incorporated",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Shuley Mine Incorporated.pdf",
									},
									{
										company:"Sinosteel Phils. H.Y. Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Sinosteel Phils. H.Y. Mining Corporation.pdf",
									},
									{
										company:"SR Metals, Inc.",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/SR Metals, Inc..pdf",
									},
									{
										company:"Taganito Mining Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Taganito Mining Corporation.pdf",
									},
									{
										company:"Trans Asia Petroleum Corporation",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/Trans Asia Petroleum Corporation.pdf",
									},
									{
										company:"TVI Resource Development Phils Inc.",
										file:"../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/TVI Resource Development Phils Inc.pdf",
									}
									
								],
								"Government" : [
									{
										company:'Bureau of Internal Revenue',
										file:'../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/BIR.zip'
									},
									{
										company:'Bureau of Customs',
										file:'../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/BOC.xlsx'
									},
									{
										company:'Department of Energy',
										file:'../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/DOE.PDF'
									},
									{
										company:'Local Government Units',
										file:'../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/LGU.zip'
									},
									{
										company:'Mines and Geosciences Bureau',
										file:'../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/MGB.ZIP'
									},
									{
										company:'National Commission on Indigenous People',
										file:'../document/EITI-Report/First-Country-Report/Completed-Reporting-Templates/NCIP.PDF'
									}
								]
							}
						}
					],
					annexes: [
					]
				},
				{
					id:"Second-Country-Report",
					href:"Second-Country-Report",
					title:"Second Country Report",
					date:'December 2015',
					lastupdated:'January 11, 2016 06:21 AM',
					card_img:'../document/EITI-Report/Second-Country-Report/card-icon.png',
					content: [
						{
							title:"Volume I of the 2nd PH-EITI Country Report",
							href:"Volume-I",
							id:'volume-ii',
							multiple:false,
							file:'../document/EITI-Report/Second-Country-Report/Volume-I_of_the_PH-EITI_Country-Report_2015.pdf',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-vol1.png'
						},
						{
							title:"Volume II of the 2nd PH-EITI Country Report",
							href:"Volume-II",
							id:'volume-ii',
							multiple:false,
							file:'../document/EITI-Report/Second-Country-Report/Volume-II_of_the_PH-EITI_Country-Report_2015.pdf',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-vol2.png'
						},
						{
							title:"Executive Summary 2015",
							href:"Executive-Summary-2015",
							id:'executive-summary-2015',
							multiple:false,
							file:'../document/EITI-Report/Second-Country-Report/Executive Summary_2015.pdf',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-exec-summary.png'
						},
						{
							title:"Data Summary Template",
							href:"Data-Summary-Template",
							id:'data-summary-template',
							multiple:false,
							file:'../document/EITI-Report/Second-Country-Report/PH-EITI_Data-Summary-Template_2013_Final.xlsx',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-xlsx.png',
							mso:true
						},
						{
							title:"Key findings (Inner Page)",
							href:"Key-findings-Inner",
							id:'key-finding-inner',
							multiple:false,
							file:'../document/EITI-Report/Second-Country-Report/Key findings_Inner_Page.pdf',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-keyfindings-inner.png'
						},
						/*{
							title:"Impact Story (Booklet)",
							href:"Impact-Story-Booklet",
							id:'impact-story-booklet',
							multiple:false,
							file:'',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-none.png'
						},*/
						{
							title:"Key findings (Outer Page)",
							href:"Key-findings-Outer",
							id:'key-finding-outer',
							multiple:false,
							file:'../document/EITI-Report/Second-Country-Report/Key findings_Outer_page.pdf',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-keyfindings-outer.png'
						},
						/*{
							title:"Impact Story (Video)",
							href:"Impact-Story-Video",
							id:'impact-story-video',
							media:true,
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-none.png'
						},*/
						{
							title:"Completed Reporting Templates",
							href:"Completed-Reporting-Templates",
							id:'completed-reporting-templates',
							multiple:true,
							file:'',
							cardIcon:'../document/EITI-Report/Second-Country-Report/card-icon-none.png',
							templates: {
								"Companies" : [
									{company:'AAM-Phil Natural Resources Exploration and Development Corporation Parcel 1',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/AAM-Phil Natural Resources Exploration and Development Corporation Parcel 1.xlsx'},
									{company:'AAM-Phil Natural Resources Exploration and Development Corporation Parcel 2B',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/AAM-Phil Natural Resources Exploration and Development Corporation Parcel 2B.xlsx'},
									{company:'Adnama Mining Resources, Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Adnama Mining Resources, Inc..xlsx'},
									{company:'Apex Mining Co., Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Apex Mining Co., Inc..XLSX'},
									{company:'Benguet Nickel Mines, Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Benguet Nickel Mines, Inc..XLSX'},
									{company:'Cagdianao Mining Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Cagdianao Mining Corporation.XLSX'},
									{company:'Carmen Copper Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Carmen Copper Corporation.xlsx'},
									{company:'Carrascal Nickel Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Carrascal Nickel Corporation.XLSX'},
									{company:'Filminera Resources Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Filminera Resources Corporation.docx'},
									{company:'Galoc Production Company',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Galoc Production Company.xlsx'},
									{company:'Greenstone Resources Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Greenstone Resources Corporation.xlsx'},
									{company:'Hinatuan Mining Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Hinatuan Mining Corporation.XLSX'},
									{company:'Johson Gold Manufacturing Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Johson Gold Manufacturing Corporation.docx'},
									{company:'Leyte Ironsand Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Leyte Ironsand Corporation.XLSX'},
									{company:'Oceana Gold (Philippines), Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Oceana Gold (Philippines), Inc..xlsx'},
									{company:'Ore Asia Mining and Development Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Ore Asia Mining and Development Corporation.docx'},
									{company:'Philsaga Mining Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Philsaga Mining Corporation.XLSX'},
									{company:'Platinum Group Metals Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Platinum Group Metals Corporation.XLS'},
									{company:'Rapu-Rapu Minerals, Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Rapu-Rapu Minerals, Inc..docx'},
									{company:'Rio Tuba Nickel Mining Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Rio Tuba Nickel Mining Corporation.XLSX'},
									{company:'Shell Philippines Exploration B.V',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Shell Philippines Exploration B.V.XLSX'},
									{company:'SR Metals, Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/SR Metals, Inc..XLSX'},
									{company:'Taganito Mining Corporation',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/Taganito Mining Corporation.XLSX'},
									{company:'TVI Resource Development Phils., Inc.',author:'',file:'../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Companies/TVI Resource Development Phils., Inc..XLSX'}
								],
								"Government" : [
									{
										company:"PPA",
										file:"../document/EITI-Report/Second-Country-Report/Completed-Reporting-Templates/Government/PPA.zip",
									}
								]
							}
						}
					],
					annexes: [
					]
				},
				{
					id:"Third-Country-Report",
					href:"Third-Country-Report",
					title:"Third Country Report",
					date:'December 2016',
					lastupdated:'January 29, 2017 11:20 PM',
					card_img:'../document/EITI-Report/Third-Country-Report/card-icon.png',
					content: [
						{
							title:"Third PH-EITI Country Report",
							href:"third-country-report",
							id:'third-country-report',
							multiple:false,
							file:'../document/EITI-Report/Third-Country-Report/PH-EITI_Country-Report_2016.pdf',
							cardIcon:'../document/EITI-Report/Third-Country-Report/card-icon.png'
						},
						{
							title:"Data Summary Template",
							href:"Data-Summary-Template",
							id:'data-summary-template',
							multiple:false,
							file:'../document/EITI-Report/Third-Country-Report/PH-EITI-2014__Summary-Data-Template_12.31.2016_Final.xlsx',
							cardIcon:'../document/EITI-Report/Third-Country-Report/card-icon-xlsx.png',
							mso:true
						},
						{
							title:"Completed Reporting Templates",
							href:"Completed-Reporting-Templates",
							id:'completed-reporting-templates',
							multiple:true,
							file:'',
							cardIcon:'../document/EITI-Report/Third-Country-Report/card-icon-none.png',
							templates: {
								"Companies" : [
									{company:'AAM PHIL',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/AAM PHIL.zip'},
									{company:'Adnama Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Adnama Mining Corporation 2014 Reporting template.xlsx'},
									{company:'Apex Mining Company',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Apex Mining Company 2014 Reporting Template.xlsx'},
									{company:'Benguet Nickel Mines',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Benguet Nickel Mines 2014 Reporting Template.xlsx'},
									{company:'Cagdianao Mining Corp',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Cagdianao Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Carrascal Nickel Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Carasscal Nickel Corporation 2014 Reporting Template.xlsx'},
									{company:'Carmen Copper Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Carmen Copper Corporation 2014 Reporting Template.xlsx'},	
									{company:'Chevron Malampaya LLC',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Chevron Malampaya LLC.zip'},	
									{company:'Citinickel Mines and Development Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Citinickel Mining Development Corporation.xlsx'},
									{company:'Filminera',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Filminera_2014 EITI Reporting Template.xlsx'},
									{company:'Galoc Production Company',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Galoc Production Company.zip'},	
									{company:'Nido Production Galoc PTY LTD',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Nido Production Galoc PTY LTD.zip'},	
									{company:'GREENSTONE',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Greenstone Resources Corporation 2014 Reporting Template.xlsx'},
									{company:'Hinatuan Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Hinatuan Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Johson Gold Mining Corp',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Johson Gold Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Krominco Inc',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Krominco Inc 2014 Reporting Template.xlsx'},
									{company:'Lepanto Consolidated Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Lepanto Consolidated Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Leyte Ironsand Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Leyte Ironsand Mining Corporation 2014 Reporting template.xlsx'},
									{company:'Libjo Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Libjo Mining Corporation 2014 Reporting Template.pdf'},
									{company:'LNL Archipelago Minerals Incorporated',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/LNL Archipelago Minerals Incorporated 2014.xlsx'},
									{company:'Marcventures Mining and Development Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Marcventures Mining and Development Corporation 2014 Reporting Template.xlsx'},
									{company:'Oceanagold (Philippines) Inc',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Oceanagold (Philippines) Inc 2014 Reporting Template.xlsx'},
									{company:'Ore Asia Mining and Development Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Ore Asia Mining and Development Corporation 2014 FS.xlsx'},
									{company:'Pacific Nickels Inc 2014',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Pacific Nickels Inc 2014 Reporting Template.xlsx'},
									{company:'Philex Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Philex Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Philippine Mining Development Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Philippine Mining Development Corporation.zip'},
									{company:'Philippine National Oil Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Philippine National Oil Corporation.zip'},
									{company:'Philsaga Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Philsaga Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Platinum Group Metals Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Platinum Group Metals Corporation 2014 Reporting Template.xlsx'},
									{company:'Rio Tuba Nickel Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Rio Tuba Nickel Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'Shell Philippines Exploration B.V',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Shell Philippines Exploration B.V.zip'},
									{company:'Shuley Mine Incorporated',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Shuley Mine Incorporated 2014 Reporting Template.xlsx'},
									{company:'Sinosteel Phils HY Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Sinosteel Phils HY Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'SR Metals',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/SR Metals 2014 Reporting Template.xlsx'},
									{company:'Taganito Mining Corporation',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/Taganito Mining Corporation 2014 Reporting Template.xlsx'},
									{company:'TVI Resource Development',author:'',file:'../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Companies/TVI Resource Development 2014 Reporting template.xlsx'}
								],
								"Government" : [
									{
										company:"BIR",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/BIR FILES.zip",
									},
									{
										company:"BOC",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/BOC FILES.zip",
									},
									{
										company:"DOE",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/DOE FILES.zip",
									},
									{
										company:"LGU",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/LGU FILES.zip",
									},
									{
										company:"MGB",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/MGB FILES.zip",
									},
									{
										company:"NCIP",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/NCIP FILES - COMPLETE.zip",
									},
									{
										company:"PPA",
										file:"../document/EITI-Report/Third-Country-Report/Completed-Reporting-Templates/Government/PPA FILES.zip",
									}
								]
							}
						},
						{
							title:"Computation of LGU shares in national wealth",
							href:"Computation-of-LGU-shares-in-national-wealth",
							id:'Computation-of-LGU-shares-in-national-wealth',
							multiple:true,
							file:'',
							cardIcon:'../document/EITI-Report/Third-Country-Report/card-icon-none.png',
							otherFiles: [
								{
									title: 'BIR - LGU Share in National Wealth',
									file: '../document/EITI-Report/Third-Country-Report/Other Files/Share in national wealth/BIR - LGU Share in National Wealth BIR.xlsx',
								},
								{
									title: 'DOE - LGU Share in National Wealth',
									file: '../document/EITI-Report/Third-Country-Report/Other Files/Share in national wealth/DOE - LGU Share in National Wealth.pdf',
								},
								{
									title: 'MGB - LGU Share in National Wealth',
									file: '../document/EITI-Report/Third-Country-Report/Other Files/Share in national wealth/MGB - LGU Share in national wealth.xls',
								}
							]
						}
					],
					annexes: [
					]
				}
			];
		},
		reportingTemplates: function() {
			return {
				folder_id:'Reporting-Templates',
				folder_name:'Reporting Templates',
				date: {
					'lastUpdated': 'July 31, 2016 11:20 PM',
					'created':''
				},
				subfolders: [
					{
						year: 2015,
						folder_id: 2015,
						folder_name: 2015,
						subfolders: [
							{
								folder_id:'Government-Agencies',
								folder_name:'Government Agencies',
								subfolders: [],
								files: [
									{
										id:"Bureau-of-Internal-Revenue-(BIR)",
										title:"Bureau of Internal Revenue (BIR)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/BIR_2015 Reporting template and schedules - MSG approved.pdf"
									},
									{
										id:"Bureau-of-Customs-(BOC)",
										title:"Bureau of Customs (BOC)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/BOC_2015 Reporting templates and schedules - MSG approved.pdf"
									},
									{
										id:"Department-of-Budget-and-Management-(DBM)",
										title:"Department of Budget and Management (DBM)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/DBM_2015 Reporting template and schedules - MSG approved.pdf"
									},
									{
										id:"Department-of-Energy-(DOE)",
										title:"Department of Energy (DOE)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/DOE_2015 Reporting template and schedules - MSG approved.pdf"
									},
									{
										id:"Department-of-Energy-(DOE)-Coal-Ops",
										title:"Department of Energy (DOE) - For Coal Operations",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/DOE_2015 Reporting template and schedules (coal) - MSG approved.pdf"
									},
									{
										id:"Local-Government-Units-(LGUs)",
										title:"Local Government Units (LGUs)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/LGU_2015 Reporting template and schedules - MSG approved.pdf"
									},
									{
										id:"Mines-and-Geosciences-Bureau---Department-of-Environment-and-Natural-Resources-(MGB-DENR)",
										title:"Mines and Geosciences Bureau - Department of Environment and Natural Resources (MGB-DENR)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/MGB_2015 Reporting template and schedules - MSG approved.pdf"
									},
									{
										id:"National-Commission-on-Indigenous-People-(NCIP)",
										title:"National Commission on Indigenous People (NCIP)",
										author:'',
										source:"../document/reporting-template/2015/government-agencies/NCIP_2015 Reporting template and schedules - MSG approved.pdf"
									},
									{
										id:"Philippine-Ports-Authority-(PPA)",
										title:"Philippine Ports Authority (PPA)",
										author:'',
										source:"../document/reporting-template/2015/PPA_2015 reporting templates and schedules - MSG approved.pdf"
									}
								]
							},
							{
								folder_id:'Industry',
								folder_name:'Industry',
								subfolders: [],
								files: [
									{
										id:'Coal-Companies',
										title:'Coal Companies',
										author:'',
										source:'../document/reporting-template/2015/Coal Company_2015 Reporting template and schedules - MSG approved.pdf'
									},
									{
										id:'Mining-Companies',
										title:'Mining Companies',
										author:'',
										source:'../document/reporting-template/2015/mining companies_2015 Reporting template and schedules - MSG approved.pdf'
									},
									{
										id:'Oil-and-Gas-Companies',
										title:'Oil and Gas Companies',
										author:'',
										source:'../document/reporting-template/2015/Oil and Gas Companies_2015 Reporting template and schedules - MSG approved.pdf'
									}
								]
							}
						]
					},
					{
						year:  2014,
						folder_id: 2014,
						folder_name: 2014,
						subfolders: [
							{
								folder_id:'Government-Agencies',
								folder_name:'Government Agencies',
								subfolders: [],
								files: [
									{
										id:"Bureau-of-Internal-Revenue-(BIR)",
										title:"Bureau of Internal Revenue (BIR)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(BIR-FINAL).pdf"
									},
									{
										id:"Bureau-of-Customs-(BOC)",
										title:"Bureau of Customs (BOC)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(BOC-FINAL).pdf"
									},
									{
										id:"Department-of-Energy-(DOE)",
										title:"Department of Energy (DOE)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(DOE-FINAL).pdf"
									},
									{
										id:"Local-Government-Units-(LGUs)",
										title:"Local Government Units (LGUs)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(LGU-FINAL).pdf"
									},
									{
										id:"Mines-and-Geosciences-Bureau---Department-of-Environment-and-Natural-Resources-(MGB-DENR)",
										title:"Mines and Geosciences Bureau - Department of Environment and Natural Resources (MGB-DENR)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(MGB-FINAL).pdf"
									},
									{
										id:"National-Commission-on-Indigenous-People-(NCIP)",
										title:"National Commission on Indigenous People (NCIP)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(NCIP-FINAL).pdf"
									},
									{
										id:"Philippine-Ports-Authority-(PPA)",
										title:"Philippine Ports Authority (PPA)",
										author:'',
										source:"../document/reporting-template/2014/government-agencies/Reporting-templates-and-schedules-(PPA-FINAL).pdf"
									}
								]
							},
							{
								folder_id:'Industry',
								folder_name:'Industry',
								subfolders: [],
								files: [
									{
										id:'Mining-Companies',
										title:'Mining Companies',
										author:'',
										source:'../document/reporting-template/2014/mining-companies/Reporting-templates-and-schedules-(participating-entity-FINAL).pdf'
									},
									{
										id:'Oil-and-Gas-Companies',
										title:'Oil and Gas Companies',
										author:'',
										source:'../document/reporting-template/2014/oil-and-gas-companies/Reporting-templates-and-schedules-(OG-FINAL).pdf'
									}
								]
							}
						]
					}
				],
				files: [
				]
			}		
		}
	};
	return CountryReportFactory;
});                            