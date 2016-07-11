aboutApp.factory('MSGFactory',['$http',
	function($http) {
	var MSGFactory = {
		get : {
			dateLastUpdated : function() {
				return  'March 24, 2016 04:48 PM'
			},	
			updated: function(){
				return [
					{
						group: 'Government',
						roles: ["Provide political leadership and support, such as creating a unit which will provide secretariat and technical support to PH-EITI’s activities.",
								"Ensure the full participation of the national government agencies and local government units in the implementation of EITI standards, and create an enabling policy environment for the same.",
								"Ensure the full participation of extractive companies.",
								"Encourage the full participation of civil society.",
								"Provide a legal basis for implementation of EITI standards, as well as identify and address legal barriers and regulations that block the proper implementation of EITI.",
								"Disclose government revenues and relevant data in an accurate and timely manner, and adhering to a level of detail that has been agreed upon by the MSG."],
						members: [
							{
								primary: [
									{
									    "id":"g-0",
						                "name": "Ma. Lourdes B. Recente",
						                "position": "OIC - Domestic Finance Group",
						                "office": "Department of Finance (DOF)",
						                "avatar": "default.png"						            
									}
								],
								alternate: [
									{
										"id":"ga-1",
						                "name": "Hon. Ma. Teresa S. Habitan",
						                "position": "Assistant Secretary",
						                "office": "Department of Finance (DOF)",
						                "avatar":"Asec-Teresa-Habitan.png"
						            },
						            {
										"id":"ga-1-3",
						                "name": "Gil S. Beltran",
						                "position": "USEC and Chief Economist / PH-EITI OIC Focal Person and Chair",
						                "office": "Department of Finance (DOF)",
						                "avatar":"default.png"
						            }
								]
					                
							},
							{
								primary: [{
									"id":"g-2",
									"name": "Hon. Austere A. Panadero",
									"position": "Undersecretary",
									"office": "Department of the Interior and Local Government (DILG)",
									"avatar":"Austere-Panadero.png"
					            }],
								alternate: [{
					                "id":"ga-0",
					                "name" : "Hon. Anna Liza F. Bonagua",
					                "position" :"OIC - Director",
					                "office" : "Department of the Interior and Local Government-Bureau of Local Government Development (DILG-BLGD)",
					                "avatar" : "default.png"
					            }]
							},
							{
								primary: [{
					                "id":"g-4",
					                "name": "Engr. Leo L. Jasareno",
					                "position": "Acting Director",
					                "office": "Mines and Geosciences Bureau - Department of Environment and Natural Resources (MGB- DENR)",
					                "avatar":"Leo-Jasareno.png"
					            }],
								alternate: [{
					            	"id":"ga-2",
					                "name" : "Engr. Romualdo Aguilos",
					                "position" :"OIC-Chief, Mineral Economics, Information and Publication",
					                "office" : "MGB- DENR",
					                "avatar" : "Romy-Aguilos.png"
					            }]
							},
							{
								primary: [{
					                "id":"g-6",
					                "name": "Mr. Rino E. Abad",
					                "position": "Director IV",
					                "office": "Department of Energy (DOE)",
					                "avatar":"default.png"
					            }],
								alternate: [{
					            	"id":"ga-3",
					                "name" : "Ms. Araceli Soluta",
					                "position" :"Director III",
					                "office" : "Department of Energy (DOE)",
					                "avatar" : "default.png"
					            }]
							},
							{
								primary: [{
					                "id":"g-5",
					                "name": "Gov. Alfonso Umali Jr.",
					                "position": "President",
					                "office": "Union of Local Authorities of the Philippines (ULAP)",
					                "avatar":"Gov-Alfonso-Umali.png"
					            }],
								alternate: [{
					            	"id":"ga-4",
					                "name" : "Maria Czarina Medina-Guce",
					                "position" :"Executive Director",
					                "office" : "ULAP",
					                "avatar" : "default.png"
					            }]
							},
							{
								primary: [{
					                "id":"g-7",
					                "name": "Mr. Nestor Valeroso",
					                "position": "Assistant Commissioner",
					                "office": "Bureau of Internal Revenue (BIR)",
					                "avatar":"default.png"
					            }],
								alternate: [{
					            	"id":"ga-5",
					                "name" : "Atty. Teresita Angeles",
					                "position" :"-",
					                "office" : "Bureau of Internal Revenue (BIR)",
					                "avatar" : "default.png"
					            }]
							}
						]
					},
					{
						group: 'Civil Society Organizations',
						roles:  ["Communicate and consult widely with a diverse set of stakeholders, including those outside the Steering group, and build capacities for understanding EITI standards.","Ensure full participation of relevant CSOs.","Monitor the disclosures done by the government and extractive companies."],
						members: [
							{
								primary: [{
					            	"id":"cso-0",
					                "name" : "Dr. Cielo D. Magno",
					                "position" : "National Coordinator",
					                "office" : "Bantay Kita (BK)",
					                "avatar" : "default.png"
					            }],
								alternate: [{
									"id":"csa-0",
					                "name" : "Mr. Filomeno Sta. Ana III",
					                "position" :"President",
					                "office" : "Bantay Kita/Action for Economic Reforms (AER)",
					                "avatar" : "Filomeno-Sta-Ana.png"
								}]
							},
							{
								primary: [ {
					            	"id":"cso-1",
					                "name" : "Prof. Jay L. Batongbacal",
					                "position" : "Assistant Professor",
					                "office" : "UP College of Law/Bantay Kita",
					                "avatar" : "default.png"
					            }],
								alternate: [{
					            	"id":"csa-2",
					                "name" : "Mr. Chadwick Go Llanos",
					                "position" :"Focal Person",
					                "office" : "Cebu Alliance for Safe and Sustainable Environment (CASSE)",
					                "avatar" : "default.png"
					            }]
							},
							{
								primary: [{
									id:'',
									name: 'Jose Melvin A. Lamanilao',
									office: '',
									position: 'Independent Consultant'
								}],
								alternate: [{
									"id":"csa-3",
					                "name" : "Dr. Merian C. Mani",
					                "position" :"Research Coordinator",
					                "office" : "Romblon Ecumenical Forum Against Mining (REFAM)",
					                "avatar" :  "default.png"
								}]
							},
							{
								primary: [{
									name: 'Engr. Maria Rosario Aynon A. Gonzales',
									office: 'Palawan State University',
									position: 'Director, Center for Strategic Policy and Governance'
								}],
								alternate: [{

								}]
							},
							{
								primary: [{
									name: 'Atty. Golda S. Benjamin',
									office:'Siliman University, Dumaguete City, Negros Oriental',
									position: 'Lecturer'
								}],
								alternate: []
							},
							{
								primary: [{
									name: 'Buenaventura M. Maata Jr.',
									office: 'Philippine Grassroots Engagement in Rural Development Foundation, Inc. (PhilGrassroots-ERDF), Dinagat Islands',
									position: 'Executive Director'
								}],
								alternate: []
							},
							{
								primary: [],
								alternate: []
							}
						]
					},
					{
						group: 'Industry',
						roles: ["Help ensure the full participation of extractive companies","Disclose payments and relevant data to government, indigenous peoples, and other stakeholders, in an accurate and timely manner, and at a level of detail that has been agreed upon by the MSG.","Communicate EITI developments with industry stakeholders."],
						members: [
							{
								primary:[{
					            	"id":"b-0",
					                "name" : "Engr. Artemio F. Disini",
					                "position" : "Chairman",
					                "office" : "Chamber of Mines of the Philippines (CoMP)",
					                "avatar" : "Artemio-Disini.png"
					            }],
								alternate:[{
					            	"id":"ba-0",
					                "name" : "Ms. Nelia C. Halcon",
					                "position" :"Executive Vice President",
					                "office" : "Chamber of Mines of the Philippines (CoMP)",
					                "avatar" : "Nelia-Halcon.png"
					            }]
							},
							{
								primary:[{
					            	"id":"b-1",
					                "name" : "Mr. Gerard H. Brimo",
					                "position" : "President and CEO",
					                "office" : "Nickel Asia Corporation",
					                "avatar" : "default.png"
					            }],
								alternate:[{
					            	"id":"ba-1",
					                "name" : "Mr. Emmanuel L. Samson",
					                "position" :"Senior Vice President- Chief Financial Officer",
					                "office" : "Nickel Asia Corporation",
					                "avatar" : "default.png"
					            }]
							},
							{
								primary:[ {
					            	"id":"b-2",
					                "name" : "Anthony P. Ferrer",
					                "position" : "",
					                "office" : "Galoc Production Company",
					                "avatar" : "default.png"
					            }],
								alternate:[{
					            	"id":"ba-2",
					                "name" : "Mr. Sabino Santos",
					                "position" :"Asset Manager",
					                "office" : "Chevron - Malampaya LLC",
					                "avatar" : "default.png"
					            }]
							},
							{
								primary:[],
								alternate:[{
					            	"id":"ba-3",
					                "name" : "Mr. James Ong",
					                "position" :"President",
					                "office" : "Ore Asia Mining and Development Corporation",
					                "avatar" : "default.png"
					            }]
							}
						]
					}
				]
			},
			members : function() {
				return {
				    "Government" : {
				    	"members":[
				            {
				                "id":"g-0",
				                "name": "Hon. Jeremias N. Paul Jr.",
				                "position": "Undersecretary, Domestic Finance Group & Legislative Liasion",
				                "office": "Department of Finance (DOF)",
				                "avatar": "Usec-Jeremias-Paul.png"
				            },
				            {
				                "id":"g-2",
				                "name": "Hon. Austere A. Panadero",
				                "position": "Undersecretary",
				                "office": "Department of the Interior and Local Government (DILG)",
				                "avatar":"Austere-Panadero.png"
				            }/*,
				            {
				                "id":"g-3",
				                "name": "Hon. Zenaida Y. Monsada",
				                "position": "Undersecretary",
				                "office": "Department of Energy (DOE)",
				                "avatar":""
				            }*/,
				            {
				                "id":"g-4",
				                "name": "Engr. Leo L. Jasareno",
				                "position": "Acting Director",
				                "office": "Mines and Geosciences Bureau - Department of Environment and Natural Resources (MGB- DENR)",
				                "avatar":"Leo-Jasareno.png"
				            },
				            {
				                "id":"g-6",
				                "name": "Mr. Rino E. Abad",
				                "position": "Director IV",
				                "office": "Department of Energy (DOE)",
				                "avatar":"default.png"
				            },
				            {
				                "id":"g-5",
				                "name": "Gov. Alfonso Umali Jr.",
				                "position": "President",
				                "office": "Union of Local Authorities of the Philippines (ULAP)",
				                "avatar":"Gov-Alfonso-Umali.png"
				            },
				            {
				                "id":"g-7",
				                "name": "Mr. Nestor Valeroso",
				                "position": "Assistant Commissioner",
				                "office": "Bureau of Internal Revenue (BIR)",
				                "avatar":"default.png"
				            }
				        ],
				        "roles":["Provide political leadership and support, such as creating a unit which will provide secretariat and technical support to PH-EITI’s activities.",
								"Ensure the full participation of the national government agencies and local government units in the implementation of EITI standards, and create an enabling policy environment for the same.",
								"Ensure the full participation of extractive companies.",
								"Encourage the full participation of civil society.",
								"Provide a legal basis for implementation of EITI standards, as well as identify and address legal barriers and regulations that block the proper implementation of EITI.",
								"Disclose government revenues and relevant data in an accurate and timely manner, and adhering to a level of detail that has been agreed upon by the MSG."],
				        "alternates" : [
				            {
				                "id":"ga-1",
				                "name": "Hon. Ma. Teresa S. Habitan",
				                "position": "Assistant Secretary",
				                "office": "Department of Finance (DOF)",
				                "avatar":"Asec-Teresa-Habitan.png"
				            },
				            {
				            	"id":"ga-0",
				                "name" : "Hon. Anna Liza F. Bonagua",
				                "position" :"OIC - Director",
				                "office" : "Department of the Interior and Local Government-Bureau of Local Government Development (DILG-BLGD)",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"ga-2",
				                "name" : "Engr. Romualdo Aguilos",
				                "position" :"OIC-Chief, Mineral Economics, Information and Publication",
				                "office" : "MGB- DENR",
				                "avatar" : "Romy-Aguilos.png"
				            },
				            {
				            	"id":"ga-3",
				                "name" : "Ms. Araceli Soluta",
				                "position" :"Director III",
				                "office" : "Department of Energy (DOE)",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"ga-4",
				                "name" : "Maria Czarina Medina-Guce",
				                "position" :"Executive Director",
				                "office" : "ULAP",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"ga-5",
				                "name" : "Atty. Teresita Angeles",
				                "position" :"-",
				                "office" : "Bureau of Internal Revenue (BIR)",
				                "avatar" : "default.png"
				            }
				        ]
				    },
				    "CSO" : {
				        "members" : [
				            {
				            	"id":"cso-0",
				                "name" : "Dr. Cielo D. Magno",
				                "position" : "National Coordinator",
				                "office" : "Bantay Kita (BK)",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"cso-1",
				                "name" : "Prof. Jay L. Batongbacal",
				                "position" : "Assistant Professor",
				                "office" : "UP College of Law/Bantay Kita",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"cso-2",
				                "name" : "Maria Aurora Teresita W. Tabada",
				                "position" : "Director/Board",
				                "office" : "Institute for Strategic Research and Development Studies (ISRDS)",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"cso-3",
				                "name" : "Mr. Ronald Allan A. Barnacha",
				                "position" : "Trustee/Provincial Chairperson",
				                "office" : "Philippine Rural Reconstruction Movement (PRRM)-Nueva Vizcaya",
				                "avatar" :"Ronald-Allan-Barnacha.png"
				            }
				        ],
				        "roles": ["Communicate and consult widely with a diverse set of stakeholders, including those outside the Steering group, and build capacities for understanding EITI standards.","Ensure full participation of relevant CSOs.","Monitor the disclosures done by the government and extractive companies."],
				        "alternates" : [
				            {
				            	"id":"csa-0",
				                "name" : "Mr. Filomeno Sta. Ana III",
				                "position" :"President",
				                "office" : "Bantay Kita/Action for Economic Reforms (AER)",
				                "avatar" : "Filomeno-Sta-Ana.png"
				            },
				            {
				            	"id":"csa-1",
				                "name" : "Mr. Vince Lazatin",
				                "position" :"Executive Director",
				                "office" : "Bantay Kita/ Transparency & Accountability Network (TAN)",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"csa-2",
				                "name" : "Mr. Chadwick Go Llanos",
				                "position" :"Focal Person",
				                "office" : "Cebu Alliance for Safe and Sustainable Environment (CASSE)",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"csa-3",
				                "name" : "Dr. Merian C. Mani",
				                "position" :"Research Coordinator",
				                "office" : "Romblon Ecumenical Forum Against Mining (REFAM)",
				                "avatar" :  "default.png"
				            },
				            {
				            	"id":"csa-4",
				                "name" : "Ms. Starjoan Villanueva",
				                "position" :"Executive Director",
				                "office" : "Alternate Forum for Research in Mindanao (AFRIM)",
				                "avatar" :"Starj-Villanueva.png"
				            }
				        ] 
				    },
				    "Industry" : {
				        "members": [
				            {
				            	"id":"b-0",
				                "name" : "Engr. Artemio F. Disini",
				                "position" : "Chairman",
				                "office" : "Chamber of Mines of the Philippines (CoMP)",
				                "avatar" : "Artemio-Disini.png"
				            },
				            {
				            	"id":"b-1",
				                "name" : "Mr. Gerard H. Brimo",
				                "position" : "President and CEO",
				                "office" : "Nickel Asia Corporation",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"b-2",
				                "name" : "Mr. Sebastian C. Quiniones, Jr.",
				                "position" : "General Manager and Managing Director",
				                "office" : "Shell",
				                "avatar" : "Sebastian-Quiniones.png"
				            }
				        ],
				        "roles": ["Help ensure the full participation of extractive companies","Disclose payments and relevant data to government, indigenous peoples, and other stakeholders, in an accurate and timely manner, and at a level of detail that has been agreed upon by the MSG.","Communicate EITI developments with industry stakeholders."],
				        "alternates" : [
				            {
				            	"id":"ba-0",
				                "name" : "Ms. Nelia C. Halcon",
				                "position" :"Executive Vice President",
				                "office" : "Chamber of Mines of the Philippines (CoMP)",
				                "avatar" : "Nelia-Halcon.png"
				            },
				            {
				            	"id":"ba-1",
				                "name" : "Mr. Emmanuel L. Samson",
				                "position" :"Senior Vice President- Chief Financial Officer",
				                "office" : "Nickel Asia Corporation",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"ba-2",
				                "name" : "Mr. Sabino Santos",
				                "position" :"Asset Manager",
				                "office" : "Chevron - Malampaya LLC",
				                "avatar" : "default.png"
				            },
				            {
				            	"id":"ba-3",
				                "name" : "Mr. James Ong",
				                "position" :"President",
				                "office" : "Ore Asia Mining and Development Corporation",
				                "avatar" : "default.png"
				            }
				        ]
				    }
				};
			},
			profile : function() {
				return {
					"Government" : {
				        "g-0" : {
				            "pic" : "Usec-Jeremias-Paul.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>JEREMIAS N. PAUL, JR.</strong> is a seasoned government official, having held various positions in the Department of Finance since 1990.  In more than two decades now, he has risen through the ranks and practically done the rounds of all the units in the Department, including being Assistant Secretary of the International Finance Group and being Undersecretary of the Corporate Affairs Group.  Undersecretary Jun Paul now heads the Domestic Finance Group, standing at the helm of government initiatives to reform the country's fiscal and tax systems, including fiscal incentives rationalization, the fiscal policy on mining, and the recently enacted \"Sin Tax Reform\" law\" which restructures the decades-old Philippine excise tax system for alcohol and tobacco products.  The Philippine excise tax reform on tobacco and alcohol products is now seen as emerging best practice of its kind in the world.</p><p class=\"paragraph-content\">As Assistant Secretary in the International Finance Policy Group (1999-2001), he championed the concept of a regional support mechanism which became the basis for the Chiang Mai Initiative, and led the ASEAN Deputies in formulating an ASEAN position on the international financial architecture and in convincing their counterparts in APEC and ASEM to make social safety net concerns a key issue in international financial architecture discussions.  He also headed the ASEAN Technical Support Unit and chaired the APEC Technical Working Group on Credit Rating Initiative.</p><p class=\"paragraph-content\">As head of the Corporate Affairs Group (2007-2011), he was at the forefront of the privatization of the energy sector.  He also boosted collection efforts from government corporations and government financial institutions, resulting in marked increase in revenues.</p><p class=\"paragraph-content\">In 2005 and 2006, he served as Alternate Executive Director of the World Bank Group in Washington D.C. and spearheaded governance reforms in the Intergovernmental Group of Twenty Four on Monetary and Development (G-24) when the Philippines was Chair.  He also successfully pushed for the inclusion of the Philippines in the list of core countries for World Bank Institute assistance and was recognized for his contributions as Chair of the Board of Advisors of the WB/IMF Filipino Staff Association.</p><p class=\"paragraph-content\">Jun Paul is also an internationally recognized expert in corporate governance and energy and water sector reforms, frequently invited to speak at various fora.</p><p class=\"paragraph-content\">A hands-on manager through and through, Jun Paul conscientiously exercises technical supervision over policy information, including generated economic/fiscal data and modeling and simulation.  He is also a firm believer in holistic and consultative approaches to policymaking.</p><p class=\"paragraph-content\">Jun Paul holds a Master's degree in International Affairs (Major in Economic Policy Management) from Columbia University in New York and a Master of Science in Industrial Economics and Bachelor of Science in Industrial Engineering degrees from top universities in the Philippines.</p>"
				        }/*,
				        "g-1": {
				            "pic" : "Asec-Teresa-Habitan.png",
				            "profile": "<p class=\"paragraph-content\"><strong>Ma. Teresa S. Habitan</strong> received her Bachelor's Degree in Economics from the University of the Philippines and Masters in Development Studies from the Institute of Social Studies, The Hague, The Netherlands.  She serves as Assistant Secretary for the Domestic Finance Group of the Department of Finance, in addition, Ms. Habitan has held the position of Alternate Executive Director from 2002 to 2003 and Executive Director’s Assistant from 2001 to 2002 at World Bank, Washington D.C.  Assistant Secretary Habitan renders technical expertise in Philippine government financial programming and fiscal policy.</p>"
				        }*/,
				        "g-2" : {
				            "pic" :"Austere-Panadero.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>AUSTERE A. PANADERO</strong>  is the Undersecretary for Local Government of the Department of the Interior and Local Governments (DILG). As such, he is primarily responsible for program, policy and capacity development as well as implementation that are targeted towards Philippine local governments. He leads the Department in mainstreaming or localizing overarching development concerns such as poverty reduction, environmental management, economic development, climate change, and governance.  He is the Department’s focal person for Official Development Assistance (ODA) programs and prime mover on initiatives dealing with local cooperation and partnerships. Under his helm of the local government sector, the Department has achieved reforms in local development and management which include planning and strategizing, executive-legislative complementation, business permits and processing, investment programming and financing, anti-red tape and corruption, institutional strengthening and urbanization.</p>"
				        },
				        "g-3":  {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "g-4" : {
				            "pic" : "Leo-Jasareno.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>LEO L. JASARENO</strong> is currently the director of the Mines and Geosciences Bureau. Director Jasareno is a mining engineer by profession, having obtained his Bachelors of Science degree in Mining Engineering from Adamson University in Manila, Philippines in 1978.</p><p class=\"paragraph-content\">Upon graduation, he was immediately employed in the then Bureau of Mines and Geosciences (BMG) of the Ministry of Natural Resources as a Casual Mining Engineer. He subsequently rose from the ranks, taking the position of Engineer III in 1988, Engineer lV in 1998, Director II or Regional Director in 2002 and Acting Director in 2010.</p><p class=\"paragraph-content\">Among his key designations in the BMG or now the Mines and Geosciences Bureau of the Department of Environment and Natural Resources are as Officer-In-Charge of the then Planning and Management Staff from 1995 to 1997, then Officer-In-Charge of the Mining Tenements Management Division from 1997 to 2010, then Officer-In-Charge, Assistant Director and on September of 2010, he was appointed Acting Director of the Bureau.</p><p class=\"paragraph-content\">As an Engineer of the Bureau, Director Jasareno has specialized in mine feasibility evaluation; mining policy study and development; and enforcement.</p><p class=\"paragraph-content\">Director Jasareno also takes pride in serving the Bureau's employee association as President from 1986 to 1988 at a time filled with struggles and challenges. This association is now one of the oldest, biggest and most active employee associations in the Department of Environment and Natural Resources.</p><p class=\"paragraph-content\">At the same time, Director Jasareno is a faculty member of the Department of Mining, Geology and Ceramics Engineering of Adamson University since 1992. He teaches Economics of Mining and Mining Laws, among others.</p>"
				        },
				        "g-5" : {
				            "pic" : "Gov-Alfonso-Umali.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ga-0" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ga-1" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ga-2" : {
				            "pic" : "Romy-Aguilos.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ga-3" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        }
				    },
				    "CSO" : {
				        "cso-0" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>CIELO MAGNO</strong> is currently the National Coordinator of Bantay Kita, a coalition of civil society organizations advocating transparency and accountability in the extractive industry in the Philippines.  She is a member of the Global Steering Committee of Publish What You Pay (PWYP), representing Asia and the Pacific. She is also a fellow of Action for Economic Reforms and Social Watch Philippines.</p><p class=\"paragraph-content\">Cielo started her career as the Executive Director of the National Movement of Young Legislators, a league of young local legislators which aims to promote good and innovative governance at the subnational level.  She eventually joined the legislative staff of then Congressman Del De Guzman in the House of Representatives.  She worked as a consultant of the USAID, the Asia Foundation, the World Bank, and the Philippine government in the areas of tax administration reform, good governance, local economic development, peace building, public finance, social accountability and reforms in technical education.</p><p class=\"paragraph-content\">In the United States, Cielo worked as a senior policy analyst for the Work Flexibility 2010 campaign, a doctoral research fellow in the Institute on Urban Health Research and an intern in Public Health Advocacy Institute and Community Catalyst. She taught Economics in the Philippines and the United States. Her publications and research studies include local governance, regulation of the pharmaceutical industry, tax administration reform, intergovernmental fiscal transfers and public finance. </p><p class=\"paragraph-content\">Cielo Magno has a degree in Business Economics and a Masters degree in Economics from the University of the Philippines (UP) in Diliman.  While pursuing her undergraduate and graduate studies, she served as a councilor, vice-chairperson and eventually, the third woman Chairperson of the University Student Council of the University of the Philippines in Diliman. She was elected President of the Student Council Alliance of the Philippines.</p><p class=\"paragraph-content\">She is a Fulbright fellow completing a doctoral degree in Law and Public Policy at Northeastern University in Boston, Massachusetts.  Her fields of interests include microeconomic policy analysis, public finance and government regulation.</p>"
				        },
				        "cso-1" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>JAY L. BATONGBACAL, <i>LLB, JSD</i></strong> received his Bachelor's Degree in Political Science from the University of the Philippines (UP) College of Social Sciences and Philosophy and his Bachelor of Laws Degree from the UP College of Law. He holds a Master of Marine Management and a Doctor in Jurisprudential Science, both from Dalhousie University in Halifax, Nova Scotia, Canada. Since 1997, he has undertaken numerous policy studies on a wide range of maritime issues from maritime dispute settlement, maritime boundary negotiations, marine resource conservation, community-based fisheries management, seafaring, and shipping. His doctoral dissertation dealt with the social impacts of ocean energy development projects, based on his own detailed case studies of the Malampaya Deepwater Gas to Power Project and the Northwind Bangui Bay Windfarm.</p><p class=\"paragraph-content\">Over the years, he has been a senior lecturer at the UP College of Law, and also taught courses on maritime affairs in Dalhousie University. In 2008, he joined the Faculty of the UP Asian Center as an Assistant Professor for a year before transferring to the UP College of Law in 2009. He was the legal advisor of the technical team that successfully pursued the Philippines' claim to a continental shelf beyond 200 nautical miles in the Benham Rise Region. He is currently the Director of the UP Institute of Maritime Affairs and Law of the Sea, the newest of five legal research institute of the UP Law Center. His present research interest focus on the offshore petroleum industry, private property and natural resources law, and maritime boundary issues.</p>"
				        },
				        "cso-2" : {
				            "pic" : "Tess-Tabada.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>MARIA AURORA TERESITA W. TABADA</strong> received her Bachelor's Degree in Psychology from the Ateneo de Manila University.  She holds a Master of Sociology from the University of San Carlos, Cebu City. Since 1983, she has been with the Center for Social Research in Small-Farmer Development now the Institute for Strategic Research and Development Studies (ISRDS) of the College of Management and Economics, Visayas State University, City of Baybay, Leyte. She teaches both General Sociology and the graduate courses on Demography and Social Movements and Community Organizing.</p><p class=\"paragraph-content\">Since 1989, she has undertaken various projects on process documentation research and organizational development of social forestry and upland development projects and people's organizations. From 1990-1992, she was a member of DENR's Upland Development Working Group (UDWG). At the same time, her extension projects focus on training on gender and development and improving governance capabilities of Barangay LGUs, NGOs and POs in community-based natural resources conflict management (water and mining). She is currently the Director of ISRDS, VSU and the University GAD Coordinator.</p>"
				        },
				        "cso-3" : {
				            "pic" : "Ronald-Allan-Barnacha.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>RONALD ALLAN A. BARNACHA</strong> is a Former Municipal Councilor and Municipal Vice Mayor of Bayombong, the Capital Town of the Province of Nueva Vizcaya.  An Associate Professor of PLT College; a member and partner of various civil society and non-government organizations - local, national and international. An environmental activist and human right advocate.</p><p class=\"paragraph-content\">He finished Bachelor of Philosophy with double minor in Sociology and Psychology at the Pontifical Urbanian University, Rome, Italy.  He took up Masters Units in Bachelor of Sacred Theology at San Carlos Royal & Pontifical Graduate School in Makati City and finished Masters in Spirituality of Unity at the International School for Priests in Tagaytay City.</p><p class=\"paragraph-content\">He also took up Bachelor of Laws at Saint Mary's University.  He had a Diploma on Leadership and Development Management Course at Asian Institute of Management, Makati City.  And Diploma in Project Management Course and Policy Research Course at the University of the Philippines, Baguio City.</p><p class=\"paragraph-content\">He is a Trustee of PRRM - Philippine Rural Reconstruction Movement, the oldest N.G.O. in the country. He is a Member of the Regional Development Council and various Regional Councils and Committees of Cayagan Valley Region.  He is a Consultant of the United Nations Development Programme and Project Team Leader of the Millennium Development Goal Fund 1919 in the Region. He is a Member of the Luzon Advisory Council of the Foundation for Philippine Environment.  And just recently, January 16, 2013, he was elected National Vice President of Bantay Kita - an N.G.O. advocating transparency on revenue.  And Luzon Island permanent member of the Multi Sectoral Group of Philippines Extractive Industries Transparency Initiative (PH-EITI).</p>"
				        },
				        "cso-4" : {
				            "pic" : "Roldan-Gonzales.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>ROLDAN R. GONZALES</strong> is an experienced development worker and human rights activist. His active involvement in civil society started in 1988 as youth organizer among the urban poor community of Canelar in Zamboanga City. From there, he has taken on various roles in various programs, mostly in the Zamboanga Peninsula, seeking to empower the people, and build social and political institutions that are responsive to the situation of grassroots communities.</p><p class=\"paragraph-content\">For the last 16 years, Roldan R. Gonzales is principally involved with the environmental movement, first as executive director of the Bukagan Ecological Association (BEA) from 1996 to 1999, and then later with Gitib Inc. from 2000 up to this day.</p><p class=\"paragraph-content\">Roldan is also active in civil society networks. At present, he is co-covener for the Philippine Misereor Partnership Inc. (PMPI) - a network of more than 300 organizations in the Philippines; co-convener of the Kalitawhan Working Group on Biodiversity; convener of the Mindanao Action Group on Children's Rights and Protection (MAGCRP); Intercontinental Focal Point of the Human Rights Working Group on NGO-IDEAs; member of 5-person Steering Committee of Child Rights Coalition - Asia (CRC-Asia); elected at-large as BOT member of Task Force Detainees of the Philippines (TFDP); and vice-chair of both Western Mindanao Coalitions namely Freedom from Debt Coalition in Western Mindanao (FDC-WMR) and DIOPIM Committee on Mining Issues (DCMI).</p><p class=\"paragraph-content\">In a span of 25 years, Roldan has developed expertise in theater arts, campaigns and advocacy, human rights, community organizing, and alternative education.</p><p class=\"paragraph-content\">Roldan studied Philosophy at the Claret Seminary in Quezon City, and political science at Misamis University in Ozamiz City.</p>"
				        },
				        "csa-0": {
				            "pic":"Filomeno-Sta-Ana.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "csa-1": {
				            "pic" : "default.png",
				             "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "csa-2": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "csa-3": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "csa-4": {
				            "pic":"Starj-Villanueva.png",
				            "profile": "<p class=\"paragraph-content\"><strong>Starj D. Villanueva</strong> is a peace worker, researcher, trainer and facilitator with more than 16 years of extensive knowledge and experience in Mindanao. She specializes in policy research, monitoring and evaluation, impact assessment and baseline studies. She has written a book on conflict-sensitive monitoring and evaluation (GoP-UN ACT for Peace Programme, 2009), and case studies on agrofuel expansion in Mindanao (Cord Aid, 2012) and cross-border illicit trade and its links to violent conflict (International Alert, 2013). She is also a member of the EU-Catalyst Project Think Tank, a global inter-disciplinary network of scientists, community development experts and activists on climate change adaptation and disaster risk reduction (CCA-DRR).</p><p class=\"paragraph-content\">She holds a master’s degree in Public Administration major in Development Administration from the Mindanao State University (MSU) in General Santos City, and a bachelor’s degree in Inland Fisheries from the University of the Philippines in Iloilo City. She is currently the Executive Director of the Alternate Forum for Research in Mindanao (AFRIM), Inc. </p>"
				        }
				    },
				    "Industry" : {
				        "b-0"  : {
				            "pic" : "Artemio-Disini.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>ARTEMIO F. DISINI</strong> is currently the Chairman of the Chamber of Mines of the Philippines. Mr. Disini previously served as President of Lepanto Consolidated Mining Co. and the Natural Resources Mining Development Corporation (NRMDC), the corporate arm of the Department of Environment and Natural Resources (DENR). He has 40 years of experience in the mining industry and is a strong advocate of sustainable and responsible mining in the Philippines.</p><p class=\"paragraph-content\">He was previously the President of the Chamber of Mines and Chairman of its Editorial Board. He was also President of the Philippine Mine Safety & Environment Association (PMSEA) and Chairman of the Philippine Mineral Reporting Code (PMRC) Accreditation Committee for Competent Persons in Mining. Mr. Disini is a graduate of the University of the Philippines where he obtained his degree in Mining Engineering in 1962. In 1973, he obtained his MBA from the same university. He is now a professor of the UP College of Engineering, teaching mine management to senior students. He also acts as consultant for various mining firms.</p>"
				        },
				        "b-1" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>GERARD H. BRIMO</strong> is the President and Chief Executive Officer of Nickel Asia Corporation and a member of the Audit Committee of the board. He is the president of Rio Tuba Nickel (RTN), Taganito Mining Corporation TMC), Cagdianao Mining Corporation (CMC), Hinatuan Mining Corporation (HMC), and Cordillera Exploration Company, Inc. (CEXCI). Mr. Brimo is also the president of two privately owned exploration companies, Newminco Nickel Mining Corp. and Newminco Pacific Mining Corp.</p><p class=\"paragraph-content\">Mr. Brimo began his mining career with Philex Mining as a vice president in 1985 and served as Chairman and Chief Executive Officer from 1994 until his retirement in December 2003. He once served as Chairman and President of the Chamber of Mines of the Philippines, and is currently a member of the Board of Directors. He received his Bachelor of Science degree in Business Administration from Manhattan College, USA and his Master of Business Management degree from the Asian Institute of Management.</p>"
				        },
				        "b-2" : {
				            "pic" : "Sebastian-Quiniones.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>Sebastian Cortez Quiniones Jr. (Baste)</strong> was appointed as the first Filipino Asset Manager and Managing Director for Shell Philippines Exploration BV (SPEX) effective 1st May 2009.   He was appointed General Mgr of Shell Philippines Exploration BV on 1 Jan 2013.  SPEX is the Operator of the Malampaya Joint Venture with Chevron and PNOC-EC. He is a member of the Upstream International Leadership Forum of Shell.</p><p class=\"paragraph-content\">He is a Trustee and Treasurer of the Malampaya Foundation, a Trustee of the Pilipinas Shell Foundation, Trustee of the SPEX pension fund, a member of the Management Association of the Philippines and the Makati Business Club, Vice President of the Petroleum Association of the Philippines, a Director of the British Chamber of Commerce of the Philippines and a member of the Philippine Extractive Industries Transparency Initiative Working Group representing the Oil and Gas Sector (PH-EITI).</p><p class=\"paragraph-content\">He started his career in Shell in 1981 as a Refinery Technologist at the Shell Tabangao Refinery.</p><p class=\"paragraph-content\">Baste was a scholar of the Philippine Science High School and studied Chemical Engineering at the University of the Philippines under an NSDB scholarship. He attended the INSEAD - Shell Group Business Leadership Programme at INSEAD in Singapore.</p><p class=\"paragraph-content\">Baste held Operations and Projects jobs in Tabangao before a posting in the Shell Offices in the Hague to assist in the design of the Shell Tabangao STAR Refinery. He was a member of the Start-Up team and assisted in the start-up of Oil Movements and then was responsible for the start-up of the core facilities.  His last position in Tabangao was Process Manager of the core facilities. </p><p class=\"paragraph-content\">He was appointed Refinery Superintendent of the Pililla Baseoil and Bitumen Refinery in 1995.</p><p class=\"paragraph-content\">His next role in 2000 was as Vice President Supply of Pilipinas Shell Petroleum Corporation and was appointed as a Shell Director in the Lopez owned First Philippine Industrial Corporation and Shell Director in the Magsaysay-Ho - PSPC joint venture Batangas Bay Carriers Inc.  He was a member of ASEAN+ Supply Leadership Team.</p><p class=\"paragraph-content\">He then took the role of Vice President of Distribution for Pilipinas Shell Petroleum Corporation in 2002 and concurrently became a member of the Management Committees of the Distribution Joint Ventures with Chevron and Petron.  He became a Director and then Chairman and President of the Pandacan Depot Services Inc (a three way JV with Petron and Chevron).  He was a member of the Distribution Leadership Team of Middle East and Asia and had management responsibility for the Distribution operations in the Philippines and the North Pacific Islands of Guam, Saipan and Palau.</p><p class=\"paragraph-content\">Baste is married to Amor and has a son Sebastian Victor III and an angel Isabel (Dec 14-20, 1993).  He was the former Corporate Secretary and then Chairman/Moderator of the Council of the Union Church of Manila where he also serves as an usher and Small Discipleship Group leader.  He was also a Director of the Urban Opportunities for Change Foundation (UOCF) which publishes a street paper called the Jeepney (theJeepney.com).  UOCF selects, trains and sends the official Philippine team to the Homeless World-Cup The Philippine team who won the Country Cup in Rio de Janiero in Sept 2010 and has participated in the yearly events in Melbourne, Milan and Paris.</p>"
				        },
				        "b-3" : {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "b-4": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\"><strong>ADRIAN PAULINO S. RAMOS</strong> is the Executive Vice President of Atlas Consolidated Mining and Development Corporation and its subsidiaries. He is also concurrently the Executive Vice President and Director of Carmen Copper Corporation and Alakor Corporation. Director of Berong Nickel Corporation, Anglo Philippine Holdings Corporation, The Philodrill Corporation, United Paragon Mining Corporation, and Zenith Holdings Corporation. He is currently a member of the Board of Directors of the Chamber of Mines of the Philippines.</p><p class=\"paragraph-content\">Mr. Ramos was a key player in the rehabilitation of Atlas and its copper mines in Toledo City, Cebu. Today, he oversees most of Atlas' mining operations.</p><p class=\"paragraph-content\">Mr. Ramos obtained his bachelor's degree in Business Management (Cum Laude) from the Ateneo de Manila University in 1999, and his master's degree in Business Administration (With Distinction) from Northwestern University's Kellogg School of Management in 2005.</p>"
				        },
				        "ba-0": {
				            "pic" : "Nelia-Halcon.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ba-1": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ba-2": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ba-3": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        },
				        "ba-4": {
				            "pic" : "default.png",
				            "profile" : "<p class=\"paragraph-content\">Profile not found</p>"
				        }
				    }
				};
			},
			meetings: function() {
				return [
					{
						title:"Approval of 2nd Report - Special",
						date:"December 21, 2015 | 09:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/Special MSG meeting_minutes_approval of the 2nd Report_12.21.2015.pdf",
						annexes: []
					},
					{
						title:"28th",
						date:"December 04, 2015 | 9:00AM-01:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/23/23rd MSG Meeting_minutes_5.7.2015.pdf",
						minutes: "document/msg-mtg/2016/03/24/28th/23rd MSG Meeting_minutes_5.7.2015.pdf",
						annexes: [
							{
								title:"Annex A - Status of Scanning_Supporting Documents",
								_file_:"document/msg-mtg/23/Annex A_BOI Incentives.pdf",
								file:"document/msg-mtg/2016/03/24/28th/Annex A. Status of Scanning_Supporting Documents.pdf"
							},
							{
								title:"Annex B - Overall Results of the Reconciliation Procedure",
								_file_:"document/msg-mtg/23/Annex B_Process Flow for ITH Availment.pdf",
								file:"document/msg-mtg/2016/03/24/28th/Annex B. Overall Results of the Reconciliation Procedure.pdf"
							}
						]
					},
					{
						title:"27th",
						date:"November 13, 2015 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/27th/27th MSG meeting_minutes_11.13.2015.pdf",
						annexes: [
							{
								title:"Annex A - BSP Policies on Gold",
								file:"document/msg-mtg/2016/03/24/27th/Annex A. BSP Policies on Gold.pdf"
							},
							{
								title:"Annex B - Scoping Study on Large-Scale Non-Metallic Mining",
								file:"document/msg-mtg/2016/03/24/27th/Annex B. Scoping Study on Large-Scale Non-Metallic Mining.pdf"
							},
							{
								title:"Annex C - Updates on the Status of the 2nd Country Report",
								file:"document/msg-mtg/2016/03/24/27th/Annex C. Updates on the Status of the 2nd Country Report.pdf"
							},
							{
								title:"Annex D - Updates from the EITI Board Meeting in Berne, Switzerland",
								file:"document/msg-mtg/2016/03/24/27th/Annex D. Updates from the EITI Board Meeting in Berne, Switzerland.pdf"
							}
						]
					},
					{
						title:"26th",
						date:"October 02, 2015 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/26th/26th MSG meeting_minutes_10.2.2015.pdf",
						annexes: [
							{
								title:"Annex B - Gold Bullion Shipment and Sales Process of Lepanto Consolidated Mining Company",
								file:"document/msg-mtg/2016/03/24/26th/Annex B. Gold Bullion Shipment and Sales Process of Lepanto Consolidated Mining Company.pdf"
							},
							{
								title:"Annex C - Progress Update from the IA",
								file:"document/msg-mtg/2016/03/24/26th/Annex C. Progress Update from the IA.pdf"
							}
						]
					},
					{
						title:"25th",
						date:"September 04, 2015 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/25th/25th MSG meeting_minutes_9.4.2015.pdf",
						annexes: [
							{
								title:"Annex A - Guiding questions on validation - Consolidated response",
								file:"document/msg-mtg/2016/03/24/25th/Annex A. Guiding questions on validation_consolidated response.pdf"
							},
							{
								title:"Annex B - Contextual Information - Outline",
								file:"document/msg-mtg/2016/03/24/25th/Annex B. Contextual Information_outline.pdf"
							},
							{
								title:"Annex B - Reconciliation Report - Outline",
								file:"document/msg-mtg/2016/03/24/25th/Annex B. Reconciliation Report_outline.pdf"
							},
							{
								title:"Annex C - Presentation on materiality threshold and material companies",
								file:"document/msg-mtg/2016/03/24/25th/Annex C. Presentation on materiality threshold and material companies.pdf"
							},
							{
								title:"Annex D - Guidance note on publishing EITI data",
								file:"document/msg-mtg/2016/03/24/25th/Annex D. Guidance note on publishing EITI data.pdf"
							}
						]
					},
					{
						title:"24th",
						date:"July 03, 2015 | 9:00AM-01:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/24th/24th MSG meeting_minutes_7.3.2015.pdf",
						annexes: [
							{
								title:"Annex B - Monitoring of Removal of Mineral Products",
								file:"document/msg-mtg/2016/03/24/24th/Annex B. Monitoring of Removal of Mineral Products_BIR Presentation.pdf"
							},
							{
								title:"Annex C - PH-EITI Validation Self-Assessment Exercise",
								file:"document/msg-mtg/2016/03/24/24th/Annex C. PH-EITI Validation Self-Assessment Exercise.pdf"
							}
						]
					},
					{
						title:"23rd",
						date:"May 07, 2015 | 9:00AM-01:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/23/23rd MSG Meeting_minutes_5.7.2015.pdf",
						minutes: "document/msg-mtg/2016/03/24/23rd/23rd MSG Meeting_minutes_5.7.2015.pdf",
						annexes: [
							{
								title:"Annex A - BOI Incentives",
								_file_:"document/msg-mtg/23/Annex A_BOI Incentives.pdf",
								file:"document/msg-mtg/2016/03/24/23rd/Annex A. ITH Process_BOI Incentives.pdf"
							},
							{
								title:"Annex B - Process Flow for ITH Availment",
								_file_:"document/msg-mtg/23/Annex B_Process Flow for ITH Availment.pdf",
								file:"document/msg-mtg/2016/03/24/23rd/Annex B. ITH Process_BIR Presentation.pdf"
							},
							{
								title:"Annex C - Tax Incentives Management and Transparency Act (TIMTA)",
								_file_:"document/msg-mtg/23/Annex C_Tax Incentives Management and Transparency Act (TIMTA).pdf",
								file:"document/msg-mtg/2016/03/24/23rd/Annex C. Tax Incentives Management and Transparency Act (TIMTA).pdf"
							},
							{
								title:"Annex D - Freedom of Information Bill (FOI)",
								_file_:"document/msg-mtg/23/Annex D_Freedom of Information Bill (FOI).pdf",
								file:"document/msg-mtg/2016/03/24/23rd/Annex D. Freedom of Information (FOI) Bill.pdf"
							},
							{
								title:"Annex E - FMRDP of RRMI and RRPI",
								_file_:"document/msg-mtg/23/Annex E_Status of Final Mine Rehabilitation and Decommissioning of Rapu-rapu Polymetallic Project  and Monitoring and Evaluation of SDMP.pdf",
								file:"document/msg-mtg/2016/03/24/23rd/Annex E. FMRDP of RRMI and RRPI.pdf"
							}
						]
					},
					{
						title:"22nd",
						date:"March 27, 2015 | 9:00AM-01:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/22/22nd MSG meeting_minutes_3.27.2015.pdf",
						minutes: "document/msg-mtg/2016/03/24/22nd MSG meeting_minutes_3.27.2015.pdf",
						annexes: []
					},
					{
						title:"21st",
						date:"February 27, 2015 | 9:00AM-01:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/21/21st MSG meeting_minutes_2.27.2015.pdf",
						minutes: "document/msg-mtg/2016/03/24/21st/21st MSG meeting_minutes_2.27.2015.pdf",
						annexes: [
							{
								title:"Annex A - MSG Debriefing - February 27",
								_file_:"document/msg-mtg/21/Annex A_MSG Debriefing - February 27.pdf",
								file:"document/msg-mtg/2016/03/24/21st/Annex A. MSG Debriefing - February 27.pdf"
							},
							{
								title:"Annex B - Management of the SSM industry in COMVAL",
								_file_:"document/msg-mtg/21/Annex B_Management of the SSM industry in COMVAL.pdf",
								file:"document/msg-mtg/2016/03/24/21st/Annex B. Management of the SSM industry in COMVAL.pdf"
							},
							{
								title:"Annex C - Transparency and Accountability Initiative in Compostela Valley",
								_file_:"document/msg-mtg/21/Annex C_Transparency and Accountability Initiative in Compostela Valley.pdf",
								file:"document/msg-mtg/2016/03/24/21st/Annex C. Transparency and Accountability Initiative in Compostela Valley.pdf"
							},
							{
								title:"Annex D - South Cotabato Small Scale Mining Program",
								_file_:"document/msg-mtg/21/Annex D_South Cotabato Small Scale Mining Program.pdf",
								file:"document/msg-mtg/2016/03/24/21st/Annex D. South Cotabato Small Scale Mining Program.pdf"
							}
						]
					},
					{
						title:"20th",
						date:"January 23, 2015 | 9:00AM-01:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/20th/20th MSG meeting_minutes_1.23.2015.pdf",
						annexes: [
							{
								title:"Annex A. PH-EITI 2015 Work Plan",
								file:"document/msg-mtg/2016/03/24/20th/Annex A. PH-EITI_2015_WorkPlan.pdf"
							}
						]
					},
					{
						title:"19th",
						date:"December 05, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Mindanao Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/19/19th MSG meeting_minutes_12.5.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/19th/19th MSG meeting_minutes_12.5.2014.pdf",
						annexes: [
							{
								title:"Annex A - Contents of the PH-EITI Report based on the EITI Standard and on the Terms of Reference (TOR) of the IA",
								_file_:"document/msg-mtg/19/Annex A. Contents of the PH-EITI Report based on the EITI Standard and on the Terms of Reference (TOR) of the IA.pdf",
								file:"document/msg-mtg/2016/03/24/19th/Annex A. Contents of the PH-EITI Report based on the EITI Standard and on the Terms of Reference (TOR) of the IA.pdf"
							},
							{
								title:"Annex B - Reconciliation Report",
								_file_:"document/msg-mtg/19/Annex B. Reconciliation Report.pdf",
								file:"document/msg-mtg/2016/03/24/19th/Annex B. Reconciliation Report.pdf"
							},
							{
								title:"Annex C - Recommendations from the Chamber of Mines of the Philippines (COMP)",
								_file_:"document/msg-mtg/19/Annex C. Recommendations from the Chamber of Mines of the Philippines (COMP).pdf",
								file:"document/msg-mtg/2016/03/24/19th/Annex C. Recommendations from the Chamber of Mines of the Philippines (COMP).pdf"
							},
							{
								title:"Annex D - Recommendations of Government Agencies",
								_file_:"document/msg-mtg/19/Annex D. Recommendations of Government Agencies.pdf",
								file:"document/msg-mtg/2016/03/24/19th/Annex D. Recommendations of Government Agencies.pdf"
							}
						]
					},
					{
						title:"18th",
						date:"November 7, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/18/18th MSG meeting_minutes_11.7.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/18th/Annex A. Reconciliation Report.pdf",
						annexes: [
							{
								title:"Annex A - Reconciliation Report",
								_file_:"document/msg-mtg/18/Annex A. Reconciliation Report.pdf",
								file:"document/msg-mtg/2016/03/24/18th/Annex A. Reconciliation Report.pdf"
							}
						]
					},
					{
						title:"17th",
						date:"October 07, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/17/17th-MSG-meeting_minutes_10.7.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/17th/17th MSG meeting_minutes_10.7.2014.pdf",
						annexes: [
							{
								title:"Annex A - 1st Draft of PH-EITI Report",
								_file_:"document/msg-mtg/17/Annex A. 1st Draft of PH-EITI report.pdf",
								file:"document/msg-mtg/2016/03/24/17th/Annex A. 1st Draft of PH-EITI report.pdf"
							},
							{
								title:"Annex B - Proposed outline of the report",
								_file_:"document/msg-mtg/17/Annex B. Proposed outline of the report.pdf",
								file:"document/msg-mtg/2016/03/24/17th/Annex B. Proposed outline of the report.pdf"
							},
							{
								title:"Annex C - Contract disclosure website",
								_file_:"document/msg-mtg/17/Annex C. Contract disclosure website.pdf",
								file:"document/msg-mtg/2016/03/24/17th/Annex C. Contract disclosure website.pdf"
							}
						]
					},
					{
						title:"16th",
						date:"September 05, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Soliven Room, Malcolm Hall, UP College of Law, Diliman, Quezon City",
						_minutes_: "document/msg-mtg/16/16th-MSG-meeting_minutes_9.5.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/16th/16th MSG meeting_minutes_9.5.2014.pdf",
						annexes: [
							{
								title:"Annex A - Status Report on Data Gathering and Reconciliation",
								_file_:"document/msg-mtg/16/Annex-A-Status-Report-on-Data-Gathering-and-Reconciliation.pdf",
								file:"document/msg-mtg/2016/03/24/16th/Annex A. Status Report on Data Gathering and Reconciliation.pdf"
							},
							{
								title:"Legal Framework for EITI Implementation",
								_file_:"document/msg-mtg/16/Annex-B-Legal-Framework-for-ETI-Implementation.pdf",
								file:"document/msg-mtg/2016/03/24/16th/Annex B. Legal Framework for ETI Implementation.pdf"
							},
							{
								title:"Annex C - Sub-national Payments",
								_file_:"document/msg-mtg/16/Annex-C-Sub-national-Payments.pdf",
								file:"document/msg-mtg/2016/03/24/16th/Annex C. Sub-national Payments.pdf"
							},
							{
								title:"Annex D - Communications Plan",
								_file_:"document/msg-mtg/16/Annex-D-Communications-Plan.pdf",
								file:"document/msg-mtg/2016/03/24/16th/Annex D. Communications Plan.pdf"
							}
						]
					},
					{
						title:"15th",
						date:"July 04, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Asian Star Bldg., ASEAN Drive, Filinvest Corporate City, Ayala Alabang, Muntinlupa City",
						_minutes_: "document/msg-mtg/15/15th-MSG-meeting_minutes_7.4.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/15th/15th MSG meeting_minutes_7.4.2014.pdf",
						annexes: [
							{
								title:"Annex A - Materiality for Participating Entities and Reconciliation",
								_file_:"document/msg-mtg/15/Annex-A-Materiality-for-Participating-Entities-and-Reconciliation.pdf",
								file:"document/msg-mtg/2016/03/24/15th/Annex A. Materiality for  Participating Entities and Reconciliation.pdf"
							}
						]
					},
					{
						title:"14th",
						date:"June 05, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/14/14th-MSG-meeting_minutes_6.5.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/14th/14th MSG meeting_minutes_6.5.2014.pdf",
						annexes: [
							{
								title:"Annex A - Data Collection and Reconciliation Procedure",
								_file_:"document/msg-mtg/14/Annex-A-Data-Collection-and-Reconciliation-Procedure.pdf",
								file:"document/msg-mtg/2016/03/24/14th/Annex A. Data Collection and Reconciliation Procedure.pdf"
							}
						]
					},
					{
						title:"Revised Reporting Template - Special",
						date:"June 02, 2014 | 04:00PM-06:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Aloe A Function Hall, Marco Polo Hotel, Ortigas, Manila",
						minutes: "document/msg-mtg/2016/03/24/Special MSG meeting_minutes_revised reporting template_6.2.2015.pdf",
						annexes: []
					},
					{
						title:"Reporting Template - Special",
						date:"May 16, 2014 | 05:00PM-06:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Emeral Room, Crowne Plaza, Quezon City",
						minutes: "document/msg-mtg/2016/03/24/Special MSG Meeting_minutes_reporting template_5.16.2014.pdf",
						annexes: []
					},
					{
						title:"13th",
						date:"May 02, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/13/13th-MSG-meeting_minutes_5.2.2014.pdf",
						minutes: "document/msg-mtg/2016/03/24/13th/13th MSG meeting_minutes_5.2.2014.pdf",
						annexes: [
							{
								title:"Annex A - PMDC Presentation",
								_file_:"document/msg-mtg/13/Annex-A-PMDC-Presentation.pdf",
								file:"document/msg-mtg/2016/03/24/13th/Annex A. PMDC Presentation.pdf"
							},
							{
								title:"Annex B - Inception Report",
								_file_:"document/msg-mtg/13/Annex-B-Inception-Report.pdf",
								file:"document/msg-mtg/2016/03/24/13th/Annex B. Inception Report.pdf"
							}
						]
					},
					{
						title:"12th",
						date:"April 04, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/12/12th_MSG_meeting_minutes_442014.pdf",
						minutes: "document/msg-mtg/2016/03/24/12th/12th MSG meeting_minutes_4.4.2014.pdf",
						annexes: [
							{
								title:"Annex A - PNOC EC Overview",
								_file_:"document/msg-mtg/12/Annex-A-PNOC-EC-Overview.pdf",
								file:"document/msg-mtg/2016/03/24/12th/Annex A. PNOC EC Overview.pdf"
							},
							{
								title:"Annex B - CSO Template for Contextual Information",
								_file_:"document/msg-mtg/12/Annex-B-CSO-Template-for-Contextual-Information.pdf",
								file:"document/msg-mtg/2016/03/24/12th/Annex B. CSO Template for Contextual Information.pdf"
							},
							{
								title:"Annex C - Isla Lipana Initial Meeting",
								_file_:"document/msg-mtg/12/Annex-C-Isla-Lipana_Initial-Meeting.pdf",
								file:"document/msg-mtg/2016/03/24/12th/Annex C. Isla Lipana_Initial Meeting.pdf"
							}
						]
					},
					{
						title:"Scoping - Special",
						date:"March 19, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						minutes: "document/msg-mtg/2016/03/24/Special MSG meeting_scoping/Special MSG Meeting_ minutes_scoping presentation_3.19.2014.pdf",
						annexes: [
							{
								title:"Annex A - Presentation on Materiality_scoping study",
								file:"document/msg-mtg/2016/03/24/Special MSG meeting_scoping/Annex A. Presentation on Materiality_scoping study.pdf"
							}
						]
					},
					{
						title:"11th",
						date:"March 7, 2014 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						_minutes_: "document/msg-mtg/11/11th-MSG-mtg-minutes_372014.pdf",
						minutes: "document/msg-mtg/2016/03/24/11th/11th MSG meeting_minutes_3.7.2014.pdf",
						annexes: [
							{
								title:"Annex A and C - DBM and BIR Presentations Transcript",
								_file_:"document/msg-mtg/11/Annex_A_and_C_DBM_and_BIR_Presentations_Transcript.pdf",
								file:"document/msg-mtg/2016/03/24/11th/Annex A and C_DBM and BIR Presentations_Transcript.pdf"
							},
							{
								title:"Annex B - BIR Presentation",
								_file_:"document/msg-mtg/11/Annex_B_BIR_presentation.pdf",
								file:"document/msg-mtg/2016/03/24/11th/Annex B. BIR presentation.pdf"
							}
						]
					},
					{
						title: "10th",
						date: "January 24, 2014 | 9:00AM‐12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Mindanao Room, Department of Finance, Roxas Blvd., Manila",
						agenda: [
							"Minutes of the 9th MSG meeting",
	                        "Matters arising from previous MSG meetings",
	                        "Hiring of Independent Administrator",
	                        "Report on the Jakarta Conference",
	                        "The Replacement of Non‐COMP Representative",
	                        "Calendar of activities for 2014",
	                        "Upcoming activities",
	                        "Financial statement as of December 31, 2013",
	                        "EO 147"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-10TH-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/10th/10th MSG meeting_minutes_1.24.2014.pdf",
						annexes: [
							{
								title:"Annex A. PH-EITI IA TOR",
								file:"document/msg-mtg/2016/03/24/10th/Annex A. PH-EITI_IA_TOR.pdf"
							}
						]
					},
					{
						title: "9th",
						date: "November 28, 2013 | 3:00PM‐4:30PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Rio Tuba Nickel Mine, Club House Rio Tuba, Palawan",
						agenda: [
							"Minutes of the 8th MSG meeting",
	                        "Matters arising from previous MSG meetings",
	                        "Finalization and approval of work plan and MDTF grant request",
	                        "Upcoming activities",
	                        "Financial report"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-9TH-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/9th/9th MSG meeting_minutes_11.28.2013_.pdf",
						annexes: [
							{
								title:"Annex A. 9th MSG meeting Work Plan Presentation",
								file:"document/msg-mtg/2016/03/24/9th/Annex A. 9th MSG meeting_work plan presentation_updated.pdf"
							}
						]
					},
					{
						title: "8th",
						date: "October 11, 2013 | 9:00AM-12:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						agenda: [
							"Presentation of the mining sector on payments made and applicable laws",
							"Matters arising from previous MSG meetings",
							"Finalization of objectives for EITI implementation in the Philippines",
							"Creation of working committee",
							"Revision of workplan",
							"BIR waiver",
							"Financial report",
							"Updates/Announcements"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-8TH-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/8th/8th MSG meeting_minutes_10.11.2013_.pdf",
						annexes: [
							{
								title:"Annex A. Taxes Paid by the Mining Industry",
								file:"document/msg-mtg/2016/03/24/8th/Annex A. Taxes Paid by the Mining Industry.pdf"
							},
							{
								title:"Annex B. Taxes Paid by the Oil and Gas Industry",
								file:"document/msg-mtg/2016/03/24/8th/Annex B. Taxes Paid by the Oil and Gas Industry.pdf"
							}
						]
					},
					{
						title: "7th",
						date: "August 23, 2013 | 6:00AM-8:00PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Rajah-Datu Hall, The Royal Mandaya Hotel, Davao City",
						agenda: [
							"Minutes of the 6th MSG meeting",
							"Individual comments of MICC members on the proposed Executive Order creating PH-EITI",
							"Discussion on election of co-chairs",
							"Other Matters"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-7TH-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/7th MSG meeting_minutes_8.23.2013.pdf"
					},
					{
						title: "6th",
						date: "August 2, 2013 | 9:30AM-10:45AM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Visayas Room, Department of Finance, Roxas Blvd., Manila",
						agenda: [
							"Minutes of the 5th MSG meeting",
							"Matters arising from previous MSG meetings",
							"Updates from MICC",
							"Comments on the draft BIR waiver",
							"MSG’s resolution supporting the Freedom of Information Bil",
							"Trainings to be conducted by EITI International",
							"Short list of possible reconcilers",
							"TOR with PPEI",
							"Other Matters"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-6TH-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/6th MSG meeting_minutes_8.2.2013_.pdf"
					},
					{
						title: "5th",
						date: "July 9, 2013 | 9:30AM-12:30PM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Executive Lounge, Boncodin Hall, Department of Budget and Management (DBM Bld.), General Solano St., Manila",
						agenda: [
							"Minutes of the 4th MSG Meeting",
							"Matters Arising from the 4th MSG Meeting",
							"Comments on the waiver prepared by BIR",
							"Draft PH-EITI internal rules",
							"Transition to DOF",
							"Collaboration with PPEI on subnational implementation"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-5TH-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/5th MSG meeting_minutes _7.9.2013_.pdf"
					},
					{
						title: "4th",
						date: "June 13, 2013 | 9:00AM-12:00NN",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Multi-Purpose Room, Boncodin Hall, Department of Budget and Management (DBM Bld.), General Solano St., Manila",
						agenda: [
							"Minutes of the 3rd MSG Meeting",
							"Matters Arising from the 3rd MSG Meeting",
							"Multi-Donor Trust Fund Grant Request",
							"Draft Executive Order Creating EITI",
							"Draft waiver from BIR",
							"Congress of LGUs in July"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-4TH-MSG-MEETING-June-13.pdf",
						minutes: "document/msg-mtg/2016/03/24/4th MSG meeting_minutes_6.13.2013.pdf"
					},
					{
						title: "3rd",
						date: "May 15, 2013 | 8:00AM-9:00AM ",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: " Vigan Room, 27th Floor, World Bank, One Global Place, 5th Avenue corner 25th Street, Bonifacio Global City, Taguig",
						agenda: [
							"Presentation of the Minutes of Previous PH-EITI MSG Meeting",
							"Presentation of the Draft Executive Order Establishing EITI",
							"Presentation of the Draft Waiver of BIR",
							"Presentation of the Proposed Revisions to the EITI Standards",
							"Participation in the forthcoming 6th EITI Global Conference",
							"Other Matters"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-3RD-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/3rd MSG meeting _minutes_5.15.2013.pdf"
					},
					{
						title: "2nd",
						date: "March 1, 2013 | 9:00AM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "Executive Lounge, 1st , Boncodin Hall, General Solano St., San Miguel, Manila",
						agenda: [
							"Approval of the Agenda",
							"Presentation of Minutes",
							"Finalization of Term of Reference - (ToR)",
							"Finalization of the Work Plan",
							"PH-EITI Participation in Sydney Conference",
							"Finalization and Signing of MOU",
							"Other Matters"
						],
						_minutes_: "document/msg-mtg/MINUTES-OF-THE-2ND-MSG-MEETING.pdf",
						minutes: "document/msg-mtg/2016/03/24/2nd MSG meeting_minutes_3.1.2013.pdf"
					},
					{
						title: "1st",
						date: "January 29, 2013 | 9:30AM",
						updated: "Last updated on March 24, 2016 07:10 PM",
						venue: "PMMLR Conference Room, 2/F, Boncodin Hall, Department of Budget & Management, General Solano St., San Miguel, Manila",
						agenda: [
							"Call to Order",
							"Introduction of MSG Members",
							"Finalization of Term of Reference (ToR)",
							"Finalization of Work Plan",
							"Other Matters"
						],
						_minutes_: "document/msg-mtg/Minutes-of-the-First-MSG-meeting_Jan29.pdf",
						minutes: "document/msg-mtg/2016/03/24/1st MSG meeting_minutes_1.29.2013.pdf"
					}
				];
			},
			ofMonth: function(data) {
				var promise = $http({
		            url:'../../be/functions/news-get.php',
		            method: 'POST',
		            data:data
		        })
		        return promise;
			}
		}
	};
	return MSGFactory;		
}])