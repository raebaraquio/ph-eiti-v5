aboutApp.factory('AboutFactory',['$http',
	function($http) {
	var AboutFactory = null;
	AboutFactory = {
		secretariat : function(){
			return [
				{
					name:"Maria Karla Espinosa",
					position:"National Coordinator",
					picture:null,
					profile:null,
					prevprof:null
				},
				{
					name:"Abigail Ocate",
					position:"Technical Manager",
					picture:"images/secretariat/secretariat-abi.jpg",
					profile:"<p>Abigail Ocate received her Bachelor's Degree in Human Ecology and her Master's degree in Environmental Science from the University of the Philippines, Los Baños, the latter as a Department of Science and Technology (DOST) Scholar.</p><p>Before joining the PH-EITI Secretariat, she served as an Environmental Specialist for an environmental consulting firm, handling Environmental Impact Assessment projects and the development of a Thematic Environmental Management System for Kalahi-CIDSS municipalities for the Millennium Challenge Account-Philippines. She also worked as a Project Supervisor for the Metro Manila Greenhouse Gas Inventory Project, and served as a Research Assistant for Blacksmith Institute, an international non-profit organization dedicated to solving pollution problems in developing countries.</p>",
					prevprofile:"<p>Abigail Ocate received her Bachelor's Degree in Human Ecology from the University of the Philippines (UP) Los Baños where she also obtained her Master's degree in Environmental Science as a Department of Science and Technology (DOST) Scholar.</p><p>Before joining the PH-EITI Secretariat, she served as an Environmental Specialist for an environmental consulting firm. She handled Environmental Impact Assessment (EIA) Projects and was involved with the development of a Thematic Environmental Management System (TEMS) for Kalahi-CIDSS municipalities which is a project of the Millennium Challenge Account-Philippines (MCA-P). She also worked as a Project Supervisor for the Metro Manila Greenhouse Gas Inventory Project and served as a Research Assistant for Blacksmith Institute which is an international non-profit organization dedicated to solving pollution problems in developing countries.</p>"
				},
				{
					name:"Mary Ann Dizon Rodolfo",
					position:"Grants and Contracts Specialist",
					picture:"images/secretariat/secretariat-meann.jpg",
					profile:"<p>A graduate of Bachelor of Science in Statistics and Business Administration, majoring in Financial Management, from the University of the Philippines, Mary Ann Rodolfo has been a seasoned Research and Advocacy Specialist for development and internationally-funded and assisted projects for more than 20 years, becoming part of various cooperatives, microfinance institutions and government projects.</p><p>Ms. Rodolfo has managed the procurement and financial administration of all grants given to PH-EITI by development partners. She is mainly responsible for the preparation of PH-EITI’s regular monthly financial reports, salaries, reimbursements and liquidations, and procuring supplies and other equipment. She has expert knowledge in social performance management audits, project management, evaluation and appraisal, training, logistics and administration.</p>",
					prevprofile:"<p>Ms. Rodolfo is a seasoned Research and Advocacy Specialist for development & funded assisted project from various cooperatives, microfinance institutions and government projects for more than 20 years.</p><p>As a Grants and Contracts/Procurement Specialist for the Philippine Extractive Industries Transparency Initiative (PH-EITI), Ms Rodolfo managed all procurement and financial administration of all grants given to PH-EITI by development partners and mainly responsible for the preparation of regular monthly financial report, salaries, reimbursements and liquidations and procuring supplies and other equipments.</p><p>She can also be considered an expert in social performance management audit, project management, evaluation and appraisal, training, logistics and administration.  A graduate of Bachelor of Science in Statistics, and Business Administration major in Financial Management.</p>"
				},
				{
					name:"Roselyn Salagan",
					position:"Communications Officer",
					picture:"",
					profile:"",
					prevprofile:""
				},
				{
					name:"Joylin Saquing",
					position:"Outreach Officer",
					picture:"images/secretariat/Joy-Saquing.png",
					profile:"<p>Prior to working for the PH-EITI, she served as Community Development Officer III for the Department of Environment and Natural Resources (DENR) – Mines and Geosciences Bureau (MGB) Central Office. She has four years of experience in conducting audit and social impact assessment of the implementation of Social Development and Management Programs/Community Development Programs of mining operations/exploration project.</p><p>She was also involved in several organic agriculture program/projects of the Department of Science and Technology – Philippine Council for Agriculture, Forestry and Natural Resources Research and Development prior to working at the DENR.</p><p>Ms. Saquing earned her Bachelor of Arts degree in Sociology from the University of the Philippines – Diliman and is currently taking up Master of Environment and Natural Resources Management at the University of the Philippines.</p>",
					prevprofile:"<p></p>"
				},
				{
					name:"Angelita Galano",
					position:"Office Manager",
					picture:null,
					profile:null,
					prevprof:null
				},
				{
					name:"Marikit Soliman",
					position:"Technical Specialist",
					picture:null,
					profile:null,
					prevprofile:null
				},
				{
					name:"Ryan Justin Dael",
					position:"Data Visualization Specialist",
					picture:"images/secretariat/Ryan-Dael.png",	
					profile:"<p>Before joining the PH-EITI Secretariat, Ryan worked as web designer of a BPO company focusing on user interface and web collaterals. He then moved on to be a graphic designer for the marketing department of the same company, designing marketing materials for the web and social media as well as collaterals for events.</p><p>He received his Bachelor's Degree in Multimedia Arts and Sciences from the Mapua Institute of Technology.</p><p>During his free time, Ryan takes part in events organization and logistics of various gaming conventions in the metro.</p>",
					prevprofile:"<p></p>"
				},
				{
					name:"Katherine Dennise Domingo",
					position:"Project Development Officer III",
					picture:"",
					profile:"",
					prevprofile:null
				},
				{
					name:"Rhea Mae Bagacay",
					position:"Procurement Assistant",
					picture:"",
					profile:"",
					prevprofile:null
				}
			];
		},
		pastSecretariat: function(){
			return [
				{
					name:"Atty. Marie Gay Alessandra V. Ordenes",
					position:"National Coordinator",
					picture:"images/secretariat/secretariat-atty-gay.jpg",
					profile:"<p>Marie Gay Alessandra V. Ordenes is the National Coordinator of the Philippine Extractive Industries Transparency Initiative (PH-EITI).</p><p>Prior to working for the EITI, she worked at the Office of the President, detailed at the Technical Education and Skills Development Authority where she provided advice to the Director General on matters pertaining to graft and corruption and good governance. She also worked as a court attorney of the Philippine Court of Appeals, specializing in legal writing and research with particular focus on anti-graft and corrupt practices act, administrative law, public office, anti-money laundering, and remedial law. Previous to that, she was an associate of the Jimenez Gonzales law firm, where she specialized in litigation, contracts, arbitration, intra-corporate disputes and appellate practice.</p><p>Atty. Ordenes earned her Bachelor of Arts degree in Political Science and her Bachelor of Laws degree from the University of the Philippines, Diliman.</p>",
					prevprof:"<p>Marie Gay Alessandra V. Ordenes is the National Coordinator of  the Philippine Extractive Industries Transparency Initiative (PH-EITI). A lawyer by profession, she obtained her Bachelor of Laws degree from the University of the Philippines where she also earned her Bachelor of Arts degree in Political Science.  Prior to working for the EITI, she worked at the Office of the President and was detailed as the legal adviser of the Director General of the Technical Education and Skills Development Authority. She also worked as a court attorney of the Philippine Court of Appeals specializing in administrative law, public office, anti-money laundering, legal writing and research.  Previous to that, she was an associate of the Jimenez Gonzales law firm where she specialized in litigation, contracts, arbitration, and intra-corporate disputes.</p>"
				},
				{
					name:"Liezel Empio",
					position:"Office Administrator",
					picture:"images/secretariat/secretariat-dhax.jpg",
					profile:"<p>Liezel B. Empio received her Master’s Degree in Travel Management in 2002, and is a former member of both the Philippine Travel Agency Association (PTAA) and the National Association of Independent Travel Agencies (NAITAS), while working at AeORO Tours and Travel International Inc. Her projects included organizing the Balik-Pilipinas tour program, the Locomotive Tours of the Philippines, diplomatic packages for the Masskara Festival, and the tourism program of the Visayan Maritime Academy in Bacolod.</p><p>Ms. Empio also managed the Your Exclusive Event Management Company, and is part of the Center for Bridging Leadership of the Asian Management Institute-Foundation.</p>",
					prevprofile:"<p>Ms. Liezel B. Empio is a graduate of Bachelor of Science in Tourism Master in Travel Management in year 2002. She is a former member of Philippine Travel Agency Association (PTAA) at the same time member of National Association of Independent Travel Agencies (NAITAS). She held her office at AeORO Tours and Travel International Inc. for 5 years, 3 years as Flight Reservation Officer and 2 years as Tour Manager.  She was able to handle specialized tour packages involving consuls of the Philippines during the Masskara Festival in year 2007.  She also designed the “Balik Pilipinas Tour Program” partnering the Philippine Travel Agency stationed in Vienna Austria that once featured in ABS-CBN world news. She did also manage the Locomotive Tours for the Philippines partnering with Germany based FarRail Tours. She is also managing the Your Exclusive Event Management Company (YEMC), a company formed under the law of the Philippines and formulated based on her achievements. Among her many achievements in the Tourism Industry she took the chance to lead the Tourism Program of Visayan Maritime Academy in Bacolod City in year 2013.  She is also part of the Center for Bridging Leadership of Asian Management Institute – Foundation (AIM) under the supervision of former DAR Secretary Ernesto Garilao for 3 years.  Currently, she is holding the position of Project Planning & Development Chief in Philippine Extractive Industries Transparency Initiative (PH-EITI) under Department of Finance.</p>"
				},
				{
					name:"Mary Grace Estacio",
					position:"Technical Assistant",
					picture:"images/secretariat/secretariat-grace.jpg",
					profile:"<p>Mary Grace Estacio received her Bachelor's Degree in Office Administration from the Rizal Technological University, and has passed the Civil Service Examination for the Stenographer's Board. She serves as Technical Assistant/Project Development Officer III for the PH-EITI, and provides administrative and technical support to the MSG, TWG, National Coordinator and PH-EITI’s consultants.</p>",
					prevprofile:"<p>Mary Grace Estacio has been with the government for almost four (4) years now.  She received her Bachelor\'s Degree in Office Administration from the Rizal Technological University (RTU) and has passed the Civil Service Examination (Stenographer\'s Board).  She serves as Technical Assistant/Project Development Officer III for the PH-EITI and provides administrative and technical support to the MSG, TWG, National Coordinator and consultants.</p>"
				},
				{
					name:"Lucielle H. Campanero",
					position:"Communications Officer",
					picture:"images/secretariat/Cheng-Campanero.png",
					profile:"<p>Cheng, as her colleagues fondly call her, worked as Communications Specialist for local and international firms prior to joining PH-EITI. Her fields of expertise include public relations, marketing and business communications.</p><p>Ms. Campanero received her Bachelor of Arts Degree in Comparative Literature from the University of the Philippines and her Diploma in Marketing Communications from the College of St. Benilde Graduate School of Business.</p>",
					prevprofile:"<p></p>"
				}
			];	
		}
	}
	return AboutFactory;
}])