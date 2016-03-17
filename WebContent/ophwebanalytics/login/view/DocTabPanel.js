/**
EuBrazilCC UC3 Gateway
Copyright 2014-2015 EUBrazilCC (EU‐Brazil Cloud Connect)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/

Ext.define('OphWebAnalytics.view.DocTabPanel', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.doclogintab',
    
	title : 'Documentation',
    layout: {
        type: 'accordion',
        activeOnTop: false
    },
	items: [{
		xtype : 'panel',
		id    : 'id1_login',
		title : 'General info',
		border: false,
		frame: false,
		autoScroll: true,
		items: [{
			xtype: 'panel',
			id: '',
			border: false,
			frame: false,
			layout: {
				align: 'stretch',
				type : 'vbox'
			},
			items: [{
				xtype : 'panel',
				//height: "100%",
				border: false,
				frame: false,
				padding: 10,
				bodyPadding: 30,
				bodyStyle: {
				    background: '#FFFFFF'
				},
				html: '<p class="home-text-doc-bold">Documentation</p><p class="home-text-doc">The following documentation corresponds to the latest stable release of ' + 
				'BioClimate the EUBrazilCC Scientific Gateway on Biodiversity and Climate Change, released on January 31, 2016.' + 
				'<br>The next three sections provide a general overview on the Data Sources managed by the gateway, a short description of the Interactive Analysis and ' +
				'a little introduction to the different types of experiment.' + 
				'<br>BioClimate is available on github at the following link: <a target="_blank" href="https://github.com/Ophidia/eubrazilcc-uc3-gateway">' + 
				'https://github.com/Ophidia/eubrazilcc-uc3-gateway</a><br>Please contact us at info-bioclimate [at] eubrazilcc [dot] ' + 
				'eu if you want to contribute to the source code implementation.</p>' + 
				
				'<p class="home-text-doc-bold">Papers</p><p class="home-text-doc"><br>[1] Sandro Fiore, Marco Mancini, Donatello Elia, Paola Nassisi, ' + 
				'Francisco Vilar Brasileiro, Ignacio Blanquer, Iana A. A. Rufino, Arie C. Seijmonsbergen, Carlos de Oliveira Galvao, Vanderlei Perez ' + 
				'Canhos, Andrea Mariello, Cosimo Palazzo, Alessandra Nuzzo, Alessandro D\'Anca, Giovanni Aloisio, Big data analytics for climate ' + 
				'change and biodiversity in the EUBrazilCC federated cloud infrastructure. Conf. Computing Frontiers 2015: 52:1-52:8.</p>' + 
				
				'<p class="home-text-doc">[2] John Cunha, Teresa A. Pa&#231;o, Filipe Costa e Silva, Jorge S. David, Jo&#227;o S. Pereira, Iana Rufino, Carlos Galv&#227;o, Fernanda Valente,  ' + 
				'"Evaluation of sensible heat flux from remote sensing and eddy correlation data for two Portuguese cork-oak forests", ' + 
				'EGU (European Geosciences Union) General Assembly 2015, Geophysical Research Abstracts Vol. 17, EGU2015-6591-4, 2015: http://www.egu2015.eu/</p>' + 
				
				'<p class="home-text-doc">[3] Iana Rufino, John Cunha, Carlos Galv&#227;o, Sandro Fiore, Giovanni Aloisio, Francisco Brasileiro,  ' + 
				'"Brazilian dry forest: understanding climate changes and biodiversity dynamics using SEBAL algorithm and cloud computing", ' + 
				'36th International Symposium on Remote Sensing of Environment (ISRSE): http://www.isrse36.org/welcome/</p>' +
				
				'<p class="home-text-doc">[4] Lucila Karla Felix Lima de Brito, John Elton de Brito Leite Cunha, Silvio Severino de Sousa J&#250;nior, Iana Alexandra Alves Rufino,  ' + 
				'"Modelagem de nicho em esp&#233;cies vegetais da caatinga: uma introdu&#231;&#227;o (Ecological niche modeling using caatinga plant species: an introduction)", ' + 
				'A confer&#234;ncia da Terra: Agricultura Familiar, Natureza e Seguran&#231;a Alimentar, 2014. http://conferencia-da-terra.webnode.com/</p>' + 
				
				'<p class="home-text-doc">[5] John Elton de Brito Leite Cunha, Iana Alexandra Alves Rufino, Lucila Karla Felix Lima de Brito, Silvio Severino de Sousa J&#250;nior, Augusto Jos&#233; da Silva Rodrigues,  ' + 
				'"Computa&#231;&#227;o em nuvem e sensoriamento remoto nos estudos dos efeitos das mudan&#231;as clim&#225;ticas na biodiversidade do semi&#225;rido ' + 
				'brasileiro (Cloud Computing and remote sensing to study climate change impacts on the brazilian dry forest biodiversity)", ' + 
				'XVII Brazilian Symposium on Remote Sensing (XVII SBSR): http://www.dsr.inpe.br/sbsr2015/home.html</p>' + 
				
				'<p class="home-text-doc">[6] Anders NS, Rufino I, Seijmonsbergen AC, Cunha J, Oliveira Galvao C, Los W, Canhos V, Lezzi D, Fiore S, Aloisio G, Brasileiro F, Blanquer I, 2015.  ' + 
				'"A Scientific Gateway for integrated data analysis and research on biodiversity and climate change". ' + 
				'Proceedings of Cloudscape Brazil 2015: Federating Cloud e-Infrastructures and Creating New Markets, p9-10. 1-2 December 2015, Rio de Janeiro, Brazil. </p>'
				
			}]
		}]
		},{
			xtype : 'panel',
			id    : 'id2_login',
			title : 'Data sources',
			border: false,
			frame: false,
			autoScroll: true,
			items: [{
				xtype: 'panel',
				id: '',
				border: false,
				frame: false,
				layout: {
					align: 'stretch',
					type : 'vbox'
				},
				items: [{
					xtype : 'panel',
					//height: 1650,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc-bold">Meteorological data from land surface monitoring stations</p>' + 
					'<p class="home-text-doc">The ground data are acquired from government agencies such as the  <a href="http://www.inmet.gov.br/portal/" target="_blank">Brazilian ' + 
					'National Institute of Meteorology</a> (<span style="font-weight:bold">INMET</span>), <a href="http://www2.ana.gov.br/Paginas/EN/default.aspx" target="_blank">Brazilian National Water Agency</a> ' + 
					'(<span style="font-weight:bold">ANA</span>) and <a href="http://sinda.crn2.inpe.br/PCD/" target="_blank">National Environmental ' + 
					'Data Systems</a> (Sinda)</p><p class="home-text-doc-bold">Satellite images</p><p class="home-text-doc">' + 
					'Major international agencies that provide orbital data are the <a href="http://www.usgs.gov/" target="_blank">United States Geological Survey</a> (<span style="font-weight:bold">USGS</span>) ' + 
					'and <a href="http://www.nasa.gov/" target="_blank">National Aeronautics and Space Administration</a> (<span style="font-weight:bold">NASA</span>). These data are freely available on the web but, ' + 
					'for download, user registration is required. In particular, the infrastructure will allow the processing of ' + 
					'<span style="font-weight:bold">LANDSAT</span> (<a href="http://landsat.usgs.gov/" target="_blank">http://landsat.usgs.gov/</a>)  data coming from the Brazilian Semiarid region, the integration of ' + 
					'meteorological/climate data sources and the processing of large-scale datasets of satellite images series. ' + 
					'Landsat represents the world&#39;s longest continuously acquired collection of space-based moderate-resolution ' + 
					'land remote sensing data. Four decades of imagery provides a unique resource for those who work in agriculture, ' + 
					'geology, forestry, regional planning, education, mapping, and global change research. Landsat images are also ' + 
					'invaluable for emergency response and disaster relief. On May 30, 2013, data from the Landsat 8 satellite ' + 
					'(launched as the Landsat Data Continuity Mission - LDCM- on February 11, 2013) became available. The Landsat ' + 
					'project is an integral part of the Remote Sensing Missions component of the USGS Land Remote Sensing (LRS) Program.</p>' + 
					'<p class="home-text-doc-bold">LIDAR data and hyperspectral data</p><p class="home-text-doc">For the areas near Manaus in Brazil, ' + 
					'where hyper-spectral imagery is apparently absent, EUBrazil Cloud Connect will leverage of the available LiDAR data ' + 
					'(provided by <span style="font-weight:bold"><a href="https://www.embrapa.br/" target="_blank">EMBRAPA</a></span> (Brazilian Agricultural and Livestock Research Corporation), which is the most important data ' + 
					'source for the extraction of 3D vegetation information. LiDAR data has recently received more attention because it ' + 
					'can overcome the data saturation shortcoming of Landsat providing more robust biomass estimations. The confidence of ' + 
					'these measures has long been recognized as an important part in forest biomass estimation; however, research on biomass ' + 
					'uncertainty analysis has only recently obtained sufficient attention due to the difficulty in collecting reference data ' + 
					'(Lu et al, 2012). Synergy of hyper-spectral imagery and LiDAR data can substantially improve 3D vegetation structure ' + 
					'information, especially for environmental parameter extraction and biodiversity mapping/species definition. Therefore, ' + 
					'imaging spectroscopy sensor data such as <span style="font-weight:bold">AVIRIS</span>, Hyperspectral Mapper (HyMap) or hyper-spectral air-photos will be ' + 
					'taken into account. In the absence of hyper-spectral data, alternative air-born orthophoto imagery can potentially be ' + 
					'used to better locate tree tops, to delineate tree crowns, and visually inspect image versus LiDAR data. The AVIRIS sensor ' + 
					'(<a href="http://aviris.jpl.nasa.gov/data/index.html" target="_blank">http://aviris.jpl.nasa.gov/data/index.html</a>) collects data that can be used for characterization of the Earth&#39;s surface ' + 
					'and atmosphere from geometrically coherent spectroradiometric measurements. This data can be applied to studies in the ' + 
					'fields of oceanography, environmental science, snow hydrology, geology, volcanology, soil and land management, atmospheric ' + 
					'and aerosol studies, agriculture, and limnology. Applications under development include the assessment and monitoring of ' + 
					'environmental hazards such as toxic waste, oil spills, and land/air/water pollution. With proper calibration and correction ' + 
					'for atmospheric effects, the measurements can be converted to ground reflectance data which can then be used for quantitative ' + 
					'characterization of surface features.<p class="home-text-doc-bold">Biodiversity data sources</p>' + 
					'<p class="home-text-doc">Provided by <span style="font-weight:bold"><a href="http://eubrazilcloudconnect.eu/content/centro-de-refer%C3%AAncia-em-informa%C3%A7%C3%A3o-ambiental-cria" target="_blank">CRIA</a></span>, the Reference Center on Environmental Information, it will also support the ' + 
					'implementation of interoperability required for carrying out the biodiversity analysis with the deployment of cloud computing. ' + 
					'CRIA&#39;s participation is based on the expertise on data infrastructure and software development to insure data quality and ' + 
					'fitness of use. The CRIA&#39;s suite of tools for data cleaning will provide efficient “scans” of data sets, detecting a broad ' + 
					'suite of errors, inconsistencies, and potential problems.<p class="home-text-doc-bold">Climate data from the CMIP5 Federated ' + 
					'Data Archive (ESGF)</p><p class="home-text-doc">The Coupled Model Intercomparison Project (<span style="font-weight:bold">CMIP</span> <a href="http://cmip-pcmdi.llnl.gov/" target="_blank">http://cmip-pcmdi.llnl.gov/</a>) ' + 
					'provides a community-based infrastructure in support of climate model diagnosis, validation, intercomparison, documentation and ' + 
					'data access and the current phase of the project is CMIP5. The CMIP5 federated data archive collects 61 global climate models from ' + 
					'29 different modelling groups (e.g. NCAR, MPI-M, CMCC) with a total amount of about 2 petabytes of datasets (June 2013), that can ' + 
					'be accessed via any one of distributed data nodes of the Earth System Grid Federation, the official site for CMIP5 outputs. ' + 
					'Specifically, CMIP5 promotes a standard set of model simulations in order to (i) evaluate how realistic the models are in ' + 
					'simulating the recent past, (ii) provide projections of future climate change (iii) understand some of the factors responsible ' + 
					'for differences in model projections including quantifying some key feedbacks such as those involving clouds and the carbon cycle. ' + 
					'It is worth of mentioning that the CMIP5 strategy includes two types of climate change experiments: <span style="font-weight:bold">long-term (century time scale) ' + 
					'integrations and near-term integrations (10-30 years)</span>, also called decadal prediction experiments. CMIP5 also provides a large number ' + 
					'of complex models running at high resolution, with a complete representations of external forcings and different types of scenario. ' + 
					'In the EUBrazilCC project, climate change indicators on the targeted areas will be evaluated starting from the data available through ' + 
					'this federated data archive.<p class="home-text-doc-bold">Climate data from Observed Data (CRU TS v.3.23)</p>' + 
					'<p class="home-text-doc">These datasets are made available under the Open Database License by <span style="font-weight:bold">Climatic ' + 
					'Research Unit, University of East Anglia</span> (<a href="http://www.cru.uea.ac.uk/" target="_blank">http://www.cru.uea.ac.uk</a>). Any rights in individual contents of the datasets are licensed under the ' +
					'Database Contents License under the conditions of Attribution and Share-Alike. ' +
					'<p class="home-text-doc">Reference: Harris, I., Jones, P.D., Osborn, T.J. and Lister, D.H. (2014), Updated high-resolution grids of monthly climatic observations - the CRU TS3.10 Dataset. International Journal of Climatology 34, 623-642 '
				}]
			}]
			},{
			xtype : 'panel',
			id    : 'id3_login',
			title : 'Interactive Analysis',
			border: false,
			frame: false,
			autoScroll: true,
			items: [{
				xtype: 'panel',
				id: '',
				border: false,
				frame: false,
				layout: {
					align: 'stretch',
					type : 'vbox'
				},
				items: [{
					xtype : 'panel',
					//height: 390,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">Interactive analysis</span> allows a real-time exploratory analysis of time series on the ' + 
					'different variables available through the gateway. The output of the analysis will provide the variable time series, ' + 
					'its trend and a comprehensive set of statistical values. <p class="home-text-doc">To perform an interactive analysis session: ' + 
					'<p class="home-text-doc">1.	Select one dataset from those available in the left column. ' + 
					'<p class="home-text-doc">2.	Click on the map to select the point to analyze. ' +
					'<p class="home-text-doc">3.	The bottom section of the gateway will display a chart with the time series and the trend line, ' + 
					'on the left, and a table with all aggregated statistics on the right. ' 
				},
				{
			    	xtype : 'panel',
			    	//height: 280,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/interactive1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/interactive2.png" width="20%" height="20%"/>'
			    }]
			}]
		},
		{
			xtype : 'panel',
			id    : 'id4_login',
			title : 'Experiments&#39; description',
			border: false,
			frame: false,
			autoScroll: true,
			items: [{
				xtype: 'panel',
				id: '',
				border: false,
				frame: false,
				layout: {
					align: 'stretch',
					type : 'vbox'
				},
				items: [{
					xtype : 'panel',
					//height: 450,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">1.	Sebal Interannual Analysis</span> provides information about interannual trends and statistical information of a specific SEBAL variable.' + 
					'<p class="home-text-doc"> To run an Interannual Analysis experiment:' +
					'<p class="home-text-doc">1.	Select the Intarannual analysis tab on the left. ' + 
					'<p class="home-text-doc">2.	Click on the square widget on top of the map to draw a bounding box. ' +
					'<p class="home-text-doc">3.	Select one SEBAL variable. ' +
					'<p class="home-text-doc">4.	Set the time range boundaries. ' + 
					'<p class="home-text-doc">5.	Click the Compute button. ' 
				},
				{
			    	xtype : 'panel',
			    	//height: 250,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/SebalInterannual1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/SebalInterannual2.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/SebalInterannual3.png" width="20%" height="20%"/>' 
			    },
			    {
					xtype : 'panel',
					//height: 450,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">2.	Ecological Niche Modelling</span> allows ' + 
					'the comparison of the projections of models into 3 different environmental scenarios (present, optimistic 2070 and pessimistic 2070). ' + 
					'These models are based on the species occurrences selected by the user. The experiment output shows one map for each environmental ' + 
					'scenario.' + 
					'<p class="home-text-doc"> To run an Ecological Niche Modelling experiment:' +
					'<p class="home-text-doc">1.	Select the Ecological Niche Modeling tab on the left. ' + 
					'<p class="home-text-doc">2.	Select one species and one or more data points (a marker for each point will be drawn on the map).  ' +
					'<p class="home-text-doc">3.	Click the Compute button. ' 
				},
				{
			    	xtype : 'panel',
			    	//height: 250,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/ENM1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/ENM2.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/ENM3.png" width="20%" height="20%"/>' 
			    },
			    {
					xtype : 'panel',
					//height: 460,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">3.	Climate Model Intercomparison</span> allows intercomparison of indicators computed on CMIP5 datasets belonging to different climate models (CMCC-CM and CMCC-CMS) and scenarios (RCP4.5 and RCP8.5). The output provides charts and tables describing the indicators in terms of time series and statistical values.' + 
					'<p class="home-text-doc"> To run a Climate Model Intercomparison experiment:' +
					'<p class="home-text-doc">1.	Select the Climate Model Intecomparison tab on the left. ' + 
					'<p class="home-text-doc">2.	Click on the square widget on top of the map to draw a bounding box. ' +
					'<p class="home-text-doc">3.	Select one or more climate indicators. ' +
					'<p class="home-text-doc">4.	Set the time range boundaries. ' + 
					'<p class="home-text-doc">5.	Click the Compute button. ' 
				},
				{
			    	xtype : 'panel',
			    	//height: 250,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/ModelIntercomp1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/ModelIntercomp2.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/ModelIntercomp3.png" width="20%" height="20%"/>' 
			    },
			    {
					xtype : 'panel',
					//height: 500,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">4.	Climate-Sebal Intercomparison</span> performs an intercomparsion of climate and satellite variables. It shows the trend and correlation between a climate and satellite variable.' + 
					'<p class="home-text-doc"> To run a Climate-SEBAL Intercomparison experiment:' +
					'<p class="home-text-doc">1.	Select the Climate-SEBAL Intecomparison tab on the left. ' + 
					'<p class="home-text-doc">2.	Click on the square widget on top of the map to draw a bounding box. ' +
					'<p class="home-text-doc">3.	Select one climate variable. ' +
					'<p class="home-text-doc">4.	Select one SEBL variable. ' + 
					'<p class="home-text-doc">5.	Set the time range boundaries. ' +
					'<p class="home-text-doc">6.	Click the Compute button. ' 
				},
				{
			    	xtype : 'panel',
			    	//height: 250,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/ClimateSebal1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/ClimateSebal2.png" width="20%" height="20%"/>'
			    },
			    {
					xtype : 'panel',
					//height: 350,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">5.	Relative Height Analysis</span> provides information about relative height at different percentiles of a LiDAR data. It also shows the relative height point distribution and statistics.' + 
					'<p class="home-text-doc"> To run a Relative Height Analysis experiment:' +
					'<p class="home-text-doc">1.	Select the Relative Height Analysis tab on the left. ' + 
					'<p class="home-text-doc">2.	Select one LiDAR tile (the marker related to the tile will be highlighted in the map). ' +
					'<p class="home-text-doc">3.	Click the Compute button. '
				},
				{
			    	xtype : 'panel',
			    	//height: 250,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/RelHeight1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/RelHeight2.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/RelHeight3.png" width="20%" height="20%"/>' 
			    },
			    {
					xtype : 'panel',
					//height: 400,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">6.	Lidar Products Intercomparison</span> performs an intercomparison between two LiDAR products. The output shows the products and the correlation among them.' + 
					'<p class="home-text-doc"> To run a LiDAR Products Intercomparison experiment:' +
					'<p class="home-text-doc">1.	Select the LiDAR Products Intercomparison tab on the left. ' + 
					'<p class="home-text-doc">2.	Click on two products from those available in Vegetation metrics, Terrain metrics or LiDAR Data characteristics. ' +
					'<p class="home-text-doc">3.	Select one LiDAR tile (the marker related to the tile will be highlighted in the map)' +
					'<p class="home-text-doc">4.	Click the Compute button. '
				},
				{
			    	xtype : 'panel',
			    	//height: 250,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					border: false,
					frame: false,
					html: '<center><img src="images/LidarIntercomp1.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ' + 
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/LidarIntercomp2.png" width="20%" height="20%"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
					'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src="images/LidarIntercomp3.png" width="20%" height="20%"/>' 
			    }
				]
			}]
		},
		{
			xtype : 'panel',
			id    : 'id5',
			title : 'Clearing House',
			border: false,
			frame: false,
			autoScroll: true,
			items: [{
				xtype: 'panel',
				id: '',
				border: false,
				frame: false,
				layout: {
					align: 'stretch',
					type : 'vbox'
				},
				items: [{
					xtype : 'panel',
					//height: 390,
					border: false,
					frame: false,
					padding: 10,
					bodyPadding: 30,
					bodyStyle: {
					    background: '#FFFFFF'
					},
					html: '<p class="home-text-doc"><span style="font-weight:bold">Clearing House</span> is a multidimensional database that acts as a cache for the set of indicators stored by a user.  ' + 
					'<p class="home-text-doc">To store an experiment in the clearing house system: ' + 
					'<p class="home-text-doc">1.	Double click on the experiment you wish to store from "My Experiment" panel in the "Compute" tab. ' + 
					'<p class="home-text-doc">2.	In the new tab, click on "Store in the Clearing House" button on the top right of the window to store the experiment. After a few seconds the experiment will be stored in the clearing house. ' +
					'<p class="home-text-doc">3.	Select the "Clearing House" tab to see the experiments stored. ' +
					'<p class="home-text-doc">NOTE: Once an experiment is stored in the clearing house it will only be available in the "Clearing House" tab. ' +
					'<p class="home-text-doc">To search in the clearing house system: ' + 
					'<p class="home-text-doc">1.	In the "Clearing House" tab, click on the square widget on top of the map to draw a bounding box. ' + 
					'<p class="home-text-doc">2.	Select one of the experiments available. ' +
					'<p class="home-text-doc">3.	Select the start and end date from the datepicker. ' +
					'<p class="home-text-doc">4.	Click on Search button. '

				}]
			}]
		}]
});
