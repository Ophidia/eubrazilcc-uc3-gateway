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

Ext.define('Home.view.HomeTabPanel', {
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.hometab',
    
	title: 'Home',
	autoScroll: true,
	layout: {
		align: 'stretch',
		type : 'vbox'
	},
	items: [{
		xtype : 'panel',
		height: 330,
		border: false,
		//padding: '20 40 40 20',
		//bodyPadding: 15,
		bodyStyle: {
		    background: '#FFFFFF'
		},
		html: '<br><br><p class="home-text">The Scientific Gateway on Biodiversity and Climate Change (<span style="font-weight:bold">BioClimate</span>) is ' + 
		'the result of the joint effort of European and Brazilian research teams involved in the EUBrazilCC ' + 
		'project.<br><span style="font-weight:bold">BioClimate</span> aims at becoming an integrated scientific tool for gaining a better understanding ' + 
		'of the mutual interaction between climate change and biodiversity dynamics.<br><br>The infrastructure ' + 
		'provided by the EUBrazilCC project combines the analysis of data acquired with different technologies, ' + 
		'such as LiDAR, hyper-spectral imagery, satellite images and ground level sensors, with meteorological ' + 
		'and biodiversity data to study the impact of climate change in regions with high interest for ' + 
		'biodiversity conservation,<br>such as the Brazilian Amazon and the semi-arid & Caatinga regions ' + 
		'in Brazil.<br><br>It integrates in a single experiment multiple data sources jointly with data ' + 
		'processing, analysis, and visualization capabilities to perform an indicator-based analysis.</p>' 
	//	'<br><br><p class="home-text-bold">The first release of the Scientific Gateway on Climate Change ' + 
	//	'and Biodiversity (<span style="font-weight:bold">BioClimate</span>) is available online. New datasets are going to be added (e.g. SEBAL datasets) ' + 
	//	'as soon as the related data challenges running on the EUBrazilCC infrastructure will be completed. </p>'
	},{
		xtype : 'panel',
		height: 450,
		border: false,
		//padding: '20 40 40 20',
		//bodyPadding: 15,
		bodyStyle: {
		    background: '#FFFFFF'
		},
	html: '<center><img src="images/image.jpg" width="70%" height="70%"/><br><br><br><br><p class="home-text"><span style="font-weight:bold">BioClimate</span> provides ' + 
		'multiple views to address batch and interactive data analysis on heterogeneous data sources in the ' + 
		'EUBrazilCC federated cloud environment.<br>The user can run a preliminary inspection of the data ' + 
		'available through the system by querying the map and visualizing time series and statistical ' + 
		'analysis (interactive data analysis); then, he can select the desired parameters, run the ' + 
		'computation (batch experiment) and monitor the submission status. A dashboard-based view integrates ' + 
		'all the output of the different tasks related to the same experiment providing also additional support ' + 
		'to the scientists, like correlation analysis between different indicators.</p><br><br>'
	},{
    	xtype : 'panel',
    	height: 150,
		bodyStyle: {
		    background: '#FFFFFF'
		},
		border: false,
		html: '<br><br><center><img src="images/eubrazilcc.png" width="20%" height="20%"/>'
    },{
		xtype: 'panel',
		height: 400,
		padding: 10,
		bodyPadding: 15,
		border: false,
		bodyStyle: {
		    background: '#FFFFFF'
		},
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'panel',
			border: false,
			flex: 1,
			cls: 'home-box',
			bodyPadding: 15,
			padding: 10,
			html: '<p class="home-text-bold">BioClimate key features</p><p class="home-text"><br>- Batch analysis on ' + 
			      'climate, satellite, LiDAR and species data<br>-	Interactive, statistical time-series analysis ' + 
			      'regarding climate and satellite data<br>-	Combined visualization of multiple indicators, ' + 
			      'Correlation analysis<br>- Analysis support for heterogeneus data sources (e.g. scale, format, ' + 
			      'etc.)<br>-	Persistent store of key experiments into a Clearinghouse system</p>'
		},{
			xtype: 'panel',
			border: false,
			flex: 1,
			cls: 'home-box',
			bodyPadding: 15,
			html: '<p class="home-text-bold">EUBrazilCC project facts</p><p class="home-text"><br>- Cloud-based ' + 
			'infrastructure<br>- Built upon open standards<br>- Federated, heterogeneous resources<br>- ' + 
			'Services and data from Brazil & Europe<br>- Three selected scientific use cases<br><br>More info: ' + 
			'<a target="_blank" href="http://eubrazilcloudconnect.eu/">eubrazilcloudconnect.eu</a></p>'
		}]
	},{
    	xtype : 'panel',
    	height: 150,
    	bodyPadding: 30,
		bodyStyle: {
		    background: '#FFFFFF'
		},
		border: false,
		html: '<center><img src="images/logo_01.png" width="50%" height="50%"/><br><br><center><img src="images/logo_02.png" width="30%" height="30%"/>'
    }]
});
