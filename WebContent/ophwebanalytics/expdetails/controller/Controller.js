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

Ext.define('ExpDetails.controller.Controller', {
    extend: 'Ext.app.Controller',
	
    views: ['ExpDetailsTabPanel', 'ExperimentJobs', 'ChartResult'],
            
    refs: [{ref:'expdtab',        selector:'expdtab'},
           {ref:'expdetailsjobs', selector:'expdetailsjobs'}],
           
    init: function() {
    	this.control('#detailjobsrefresh', {
			click: this.getJobs
		});

    	this.control('expdtab', {
			activate: this.maskManagement
		});
    },
    
    activeexperiments: 0,
    
    createView: function(view) {
    	var controller = this;
    	return controller.getView(view).create();
    },
    
    maskManagement: function() {
    	var controller = this;
    	if (controller.activeexperiments == 0)
        	controller.getExpdtab().setLoading('Select an experiment from Compute panel to visualize analysis results.');
    },
    
    storeintheCH1: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('interannualToolbar'  + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring1' + idexperiment).show();
    	    	Ext.getCmp('interannualToolbar' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech1' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring1' + idexperiment).show();
    	    	Ext.getCmp('interannualToolbar' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH2: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('clisebIntercompToolbar' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring2' + idexperiment).show();
    	    	Ext.getCmp('clisebIntercompToolbar' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech2' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring2' + idexperiment).show();
    	    	Ext.getCmp('clisebIntercompToolbar' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH3: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('relheighttoolbar' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring3' + idexperiment).show();
    	    	Ext.getCmp('relheighttoolbar' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech3' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring3' + idexperiment).show();
    	    	Ext.getCmp('relheighttoolbar' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH4: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('lidarIntercompToolbar' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring4' + idexperiment).show();
    	    	Ext.getCmp('lidarIntercompToolbar' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech4' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring4' + idexperiment).show();
    	    	Ext.getCmp('lidarIntercompToolbar' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH5: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('modelIntercompToolbar1' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring5' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar1' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech5' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring5' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar1' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH6: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('modelIntercompToolbar2' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring6' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar2' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech6' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring6' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar2' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH7: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('modelIntercompToolbar3' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring7' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar3' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech7' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring7' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar3' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH8: function(idexperiment) {

    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('modelIntercompToolbar4' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring8' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar4' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech8' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring8' + idexperiment).show();
    	    	Ext.getCmp('modelIntercompToolbar4' + idexperiment).setLoading(false);
    	    }});
    },
    
    storeintheCH9: function(idexperiment) {
    	//var fillColor = Ext.getCmp('fillcolor').getValue();
    	//var expname   = Ext.getCmp('saveexperiment').getValue();
    	
    	Ext.getCmp('enmtoolbar' + idexperiment).setLoading(true);
    	
    	Ext.Ajax.request({
    	    url: 'expdetails/storeintheCH.action',
    	    method: 'post',
    	    params: {
    	    	//fillColor: fillColor,
    	    	//expname  : expname,
    	    	expid    : idexperiment
    	    },
    	    success: function(response) {
    	    	Ext.getCmp('sstoring9' + idexperiment).show();
    	    	Ext.getCmp('enmtoolbar' + idexperiment).setLoading(false);
    	    	Ext.getCmp('storech9' + idexperiment).hide();
    	    },
    	    failure: function(response) {
    	    	Ext.getCmp('fstoring9' + idexperiment).show();
    	    	Ext.getCmp('enmtoolbar' + idexperiment).setLoading(false);
    	    }});
    },
    
    resultManagement: function(idexperiment, experimenttype) {
    	var controller = this;
    	controller.getExpdtab().setLoading(false);
    	
    	if (Ext.getCmp('exp' + idexperiment + 'tab'))
    		controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');
    	else {
    		// call the appropriate function according to the experiment type
    		if (experimenttype == 'sebalinterannual')
    			controller.sebalinterannualResults(idexperiment);
    		else if (experimenttype == 'modelintercomparison')
    			controller.modelIntercomparisonResults(idexperiment);
    		//else if (experimenttype == 'sebalintercomparison')
    			//alert('sebalintercomparison');
    		else if (experimenttype == 'climatesebal')
    			controller.climatesebalResults(idexperiment);
    		else if (experimenttype == 'relheight')
    			controller.relativeheightResults(idexperiment);
    		else if (experimenttype == 'lidarintercomparison')
    			controller.lidarintercomparisonResults(idexperiment);
    		else if (experimenttype == 'enm')
    			controller.enmResults(idexperiment);
    	}
    },
    
    sebalinterannualResults: function(idexperiment) {
    	var controller = this;
    	Ext.Ajax.request({
			url: 'expdetails/getSebalInterannualResults.action',
			method: 'post',
			params: {
				idexperiment: idexperiment				
			},
			success: function(response) {
				var resp = Ext.decode(response.responseText);
				var json = JSON.parse(resp);
				
				var store1 = Ext.create('Ext.data.Store', {
					fields: json.out1_chart.fields,
					data  : json.out1_chart.data
				});
				
				var keys = Object.keys(json.out1_chart.data[0]);
				var seriesArray = [];
				var tooltipArray = [];
				for (var k = 0; k < keys.length-1; k++) {

					var newValue = json.out1_chart.yaxes.fields[k];
					tooltipArray.push(newValue);

					var series = {
			                type: 'line',
			                highlight: {
			                    size: 7,
			                    radius: 7
			                },
			                axis: 'left',
			                xField: json.out1_chart.xaxes.fields[0],
			                yField: json.out1_chart.yaxes.fields[k],
			                smooth: true,
			                markerConfig: {
			                    type: 'cross',
			                    size: 4,
			                    radius: 4,
			                    'stroke-width': 0
			                }
			            };
				       /*	alert(tooltipArray[k]);
					var tips = {
                        trackMouse: true,
                        width: 150,
                        height: 20,
                        renderer: function(storeItem, item) {
                        	alert(tooltipArray[k]);
                            this.setTitle(storeItem.get(json.out1_chart.xaxes.fields[0]) + ': ' + storeItem.get(tooltipArray[k]));
                        }
                    };
					series.add(tips);*/
					
					seriesArray.push(series);
				}
				
				var chart1 = Ext.create('Ext.chart.Chart', {
		            animate: true,
		            store: store1,
		            shadow: true,
		            theme: 'Category1',
		            legend: {
		                position: 'top'
		            },
		            axes: [{
		                type: 'Numeric',
		                position: 'left',
		                fields: json.out1_chart.yaxes.fields,
			            title: json.out1_chart.yaxes.title,
		                minorTickSteps: 1,
			            minimum : json.out1_chart.yaxes.minimum,
			            maximum : json.out1_chart.yaxes.maximum,
		                grid: true
		            },{
		                type: 'Category',
		                position: 'bottom',
		                fields: json.out1_chart.xaxes.fields,
		                title: json.out1_chart.xaxes.title,
		            }],
		            series: seriesArray
		        });
				
				var store2 = Ext.create('Ext.data.Store', {
					fields: json.out2_chart.fields,
					data  : json.out2_chart.data
				});
				
				var keys2 = Object.keys(json.out2_chart.data[0]);
				var seriesArray2 = [];
				for (var k = 0; k < keys2.length-1; k++) {
					var series2 = {
			                type: 'line',
			                highlight: {
			                    size: 7,
			                    radius: 7
			                },
			                axis: 'left',
			                xField: json.out2_chart.xaxes.fields[0],
			                yField: json.out2_chart.yaxes.fields[k],
			                smooth: true,
			                markerConfig: {
			                    type: 'cross',
			                    size: 4,
			                    radius: 4,
			                    'stroke-width': 0
			                }/*,
			                tips: {
		                        trackMouse: true,
		                        width: 150,
		                        height: 20,
		                        renderer: function(storeItem, item) {
		                            this.setTitle(storeItem.get(json.out2_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out2_chart.yaxes.fields[k]));
		                        }
		                    }*/
			            };
					seriesArray2.push(series2);
				}
				
				var chart2 = Ext.create('Ext.chart.Chart', {
		            animate: true,
		            store: store2,
		            shadow: true,
		            theme: 'Category1',
		            legend: {
		                position: 'top'
		            },
		            axes: [{
		                type: 'Numeric',
		                position: 'left',
		                fields: json.out2_chart.yaxes.fields,
		                title: json.out2_chart.yaxes.title,
		                minorTickSteps: 1,
			            minimum : json.out2_chart.yaxes.minimum,
			            maximum : json.out2_chart.yaxes.maximum,
		                grid: true
		            },{
		                type: 'Category',
		                position: 'bottom',
		                fields: json.out2_chart.xaxes.fields,
		                title: json.out2_chart.xaxes.title,
		            }],
		            series: seriesArray2
		        });
				
				var store3 = Ext.create('Ext.data.Store', {
					fields: Object.keys(json.out1_grid.data[0]),
					data  : json.out1_grid.data
				});
				
				var keys = Object.keys(json.out1_grid.data[0]);
				var columns = [];
				for (k in keys) {
					var column = {text: keys[k], dataIndex: keys[k], width: 180};
					columns.push(column);
				}
				var grid1 = Ext.create('Ext.grid.Panel', {
				    store: store3,
				    columns: columns,
		    		overflowY: 'auto',
		    		overflowX: 'auto'
				});
				
  			    var store4 = Ext.create('Ext.data.Store', {
					fields: Object.keys(json.out2_grid.data[0]),
					data  : json.out2_grid.data
				});
				
  			  	var keys2 = Object.keys(json.out2_grid.data[0]);
  			  	var columns2 = [];
  			  	for (k in keys2) {
					var column2 = {text: keys2[k], dataIndex: keys2[k], width: 160};
					columns2.push(column2);
  			  	}
				var grid2 = Ext.create('Ext.grid.Panel', {
				    store: store4,
				    columns: columns2,
		    		overflowY: 'auto',
		    		overflowX: 'auto'
				});
			
				Ext.Ajax.request({
					url: 'expdetails/getSebalInterannualSummary.action',
					method: 'post',
					params: {
						idexperiment: idexperiment
					},
					success: function (response) {
						var resp = Ext.decode(response.responseText);
						
						var html = '<p><b>Type of experiment:</b> Sebal Interannual</p>';
						
						html += '<p><b>Satellite data</b><br>';
						html += 'Variable: ' + resp[0].sebalvariable + '<br>';
						html += 'Sensor: ' + resp[0].sebalsensor + '<br></p>';
						
						var submissiondate = resp[0].submissiondate.substring(0,16);
						
						html += '<p><b>Submission date:</b> ' + submissiondate + '</p>';
						html += '<p><b>Lat range:</b> ' + resp[0].ymin + ':' + resp[0].ymax + '</p>';
						html += '<p><b>Lon range:</b> ' + resp[0].xmin + ':' + resp[0].xmax + '</p>';
						html += '<p><b>Time range:</b> ' + resp[0].timemin + ':' + resp[0].timemax + '</p>';
						
						var gridstore = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp[0].downloadresource,  'downloadtitle': resp[0].downloadtitle, 'idexperiment': resp[0].idexperiment, 'submissiondate': resp[0].submissiondate, 'stored': resp[0].stored},
							         { 'downloadresource': resp[1].downloadresource,  'downloadtitle': resp[1].downloadtitle, 'idexperiment': resp[1].idexperiment, 'submissiondate': resp[1].submissiondate, 'stored': resp[1].stored}]
						});
						
						var summarypanel = {
							xtype: 'panel',
							flex: 1,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'panel',
								flex: 4,
								bodyPadding: '5 10 5 10',
								html: html
							},{
								xtype: 'gridpanel',
								flex: 2,
								hideHeaders: true,
								title: 'Downloads',
								store: gridstore,
							    columns: [{text: 'Title',      dataIndex: 'downloadtitle',    flex: 1},
							       {text: 'File Name',         dataIndex: 'downloadresource', hidden: true},
							       {text: 'Experiment',        dataIndex: 'idexperiment',     hidden: true},
							       {text: 'Clearing house',    dataIndex: 'stored',           hidden: true},
							       {text: 'Submissiondate',    dataIndex: 'submissiondate',   hidden: true},
							       {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
							    	   items: [{
							    		   icon: 'images/download.png',
							    		   tooltip: 'Download CSV file',
							    		   scope: this,
							    		   handler: controller.downloadCSV
							    	   }]
							    }]
							}]
						};
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Sebal Interannual Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 370,
					    			items: [chart1]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 450,
					    			items: [chart2]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 300,
					    			title: 'Interannual Analysis Table',
					    			items: [grid1]
					    		},
					    		{
					    			xtype: 'panel',	
					    			layout: 'fit',
					    			height: 300,
					    			title: 'Interannual Analysis Statistical Table',
					    			items: [grid2]
					    		}]
				    		}, summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'interannualToolbar' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring1' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring1 ' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment1',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled  : false,
				    	    		hidden    : false,
				    	    		id        : 'storech1' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH1(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text1' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp[0].stored == 2) {
							Ext.getCmp('storech1' + idexperiment).setVisible(false);
							Ext.getCmp('text1' + idexperiment).setVisible(true);
						}

						controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');	
						controller.activeexperiments++;
					},
					failure: function() {
						Ext.MessageBox.show({
		                    title: 'Error',
		                    msg: 'Network failure.',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		                });
					}
		    	});				
			},
			failure: function() {
				Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
    },
    
    climatesebalResults: function(idexperiment) {
    	var controller = this;
    	Ext.Ajax.request({
			url: 'expdetails/getClimateSebalResults.action',
			method: 'post',
			params: {
				idexperiment: idexperiment
			},
			success: function(response) {
				var resp = Ext.decode(response.responseText);
				var json = JSON.parse(resp);
				
				var store1 = Ext.create('Ext.data.Store', {
					fields: json.out1_chart.fields,
					data  : json.out1_chart.data
				});
				var chart1 = Ext.create('Ext.chart.Chart', {
		            animate: true,
		            store: store1,
		            shadow: true,
		            theme: 'Category1',
		            legend: {
		                position: 'top'
		            },
		            axes: [{
		                type: 'Numeric',
		                position: 'left',
		                fields: json.out1_chart.yaxes1.fields,
		                title: json.out1_chart.yaxes1.title,
		                minorTickSteps: 1,
			            minimum : json.out1_chart.yaxes1.minimum,
			            maximum : json.out1_chart.yaxes1.maximum,
		                grid: true
		            },{
		                type: 'Numeric',
		                position: 'right',
		                fields: json.out1_chart.yaxes2.fields,
		                title: json.out1_chart.yaxes2.title,
		                minorTickSteps: 1,
		                minimum : json.out1_chart.yaxes2.minimum,
		                maximum : json.out1_chart.yaxes2.maximum
		            }, {
		                type: 'Category',
		                position: 'bottom',
		                fields: json.out1_chart.xaxes.fields,
		                title: json.out1_chart.xaxes.title
		            }],
		            series: [{
		                type: 'line',
		                highlight: {
		                    size: 7,
		                    radius: 7
		                },
		                axis: 'left',
		                xField: json.out1_chart.xaxes.fields[0],
		                yField: json.out1_chart.yaxes1.fields[0],
		                smooth: true,
		                markerConfig: {
		                    type: 'cross',
		                    size: 4,
		                    radius: 4,
		                    'stroke-width': 0
		                },
		                tips: {
	                        trackMouse: true,
	                        width: 150,
	                        height: 20,
	                        renderer: function(storeItem, item) {
	                            this.setTitle(storeItem.get(json.out1_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_chart.yaxes1.fields[0]));
	                        }
	                    }
		            }, {
		                type: 'line',
		                highlight: {
		                    size: 7,
		                    radius: 7
		                },
		                axis: 'left',
		                xField: json.out1_chart.xaxes.fields[0],
		                yField: json.out1_chart.yaxes1.fields[1],
		                markerConfig: {
		                    type: 'circle',
		                    size: 4,
		                    radius: 4,
		                    'stroke-width': 0
		                },
		                tips: {
	                        trackMouse: true,
	                        width: 150,
	                        height: 20,
	                        renderer: function(storeItem, item) {
	                            this.setTitle(storeItem.get(json.out1_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_chart.yaxes1.fields[1]));
	                        }
	                    }
		            },{
		                type: 'line',
		                highlight: {
		                    size: 7,
		                    radius: 7
		                },
		                axis: 'right',
		                smooth: true,
		                xField: json.out1_chart.xaxes.fields[0],
		                yField: json.out1_chart.yaxes2.fields[0],
		                markerConfig: {
		                    type: 'circle',
		                    size: 4,
		                    radius: 4,
		                    'stroke-width': 0
		                },
		                tips: {
	                        trackMouse: true,
	                        width: 150,
	                        height: 20,
	                        renderer: function(storeItem, item) {
	                            this.setTitle(storeItem.get(json.out1_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_chart.yaxes2.fields[0]));
	                        }
	                    }
		            },{
		                type: 'line',
		                highlight: {
		                    size: 7,
		                    radius: 7
		                },
		                axis: 'right',
		                xField: json.out1_chart.xaxes.fields[0],
		                yField: json.out1_chart.yaxes2.fields[1],
		                markerConfig: {
		                    type: 'circle',
		                    size: 4,
		                    radius: 4,
		                    'stroke-width': 0
		                },
		                tips: {
	                        trackMouse: true,
	                        width: 150,
	                        height: 20,
	                        renderer: function(storeItem, item) {
	                            this.setTitle(storeItem.get(json.out1_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_chart.yaxes2.fields[1]));
	                        }
	                    }
		            }]
		        });
				
				var store2 = Ext.create('Ext.data.Store', {
					fields: json.out2_chart.fields,
					data  : json.out2_chart.data
				});
				var chart2 = Ext.create('Ext.chart.Chart', {
		            style: 'background:#fff',
		            animate: true,
		            store: store2,
		            axes: true,
//			            insetPadding: 50,
		            theme:'Category2',
		            axes: [{
		                type: 'Numeric',
		                position: 'left',
		                fields: json.out2_chart.yaxes.fields,
		                title: json.out2_chart.yaxes.title,
		                grid: true,
		                minimum: json.out2_chart.yaxes.minimum,
		                maximum: json.out2_chart.yaxes.maximum
		            }, {
		                type: 'Numeric',
		                position: 'bottom',
		                fields: json.out2_chart.xaxes.fields,
		                title: json.out2_chart.xaxes.title,
			            minimum: json.out2_chart.xaxes.minimum,
			            maximum: json.out2_chart.xaxes.maximum
		            }],
		            series: [{
		                type: 'scatter',
		                axis: true,
		                xField: json.out2_chart.xaxes.fields[0],
		                yField: json.out2_chart.yaxes.fields[0],
		                color: '#ccc',
		                markerConfig: {
		                    type: 'circle',
		                    radius: 5,
		                    size: 5
		                },
		                tips: {
	                        trackMouse: true,
	                        width: 150,
	                        height: 20,
	                        renderer: function(storeItem, item) {
	                            this.setTitle(storeItem.get(json.out2_chart.xaxes.fields[0]) + ' - ' + storeItem.get(json.out2_chart.yaxes.fields[0]));
	                        }
	                    }
		            }]
		        });
				
				var store3 = Ext.create('Ext.data.Store', {
					fields: Object.keys(json.out1_grid.data[0]),
					data  : json.out1_grid.data
				});
				var keys = Object.keys(json.out1_grid.data[0]);
				var grid = Ext.create('Ext.grid.Panel', {
				    store: store3,
				    columns: [{ text: keys[0], dataIndex: keys[0], flex: 1},
				        { text: keys[1], dataIndex: keys[1], flex: 1},
				        { text: keys[2], dataIndex: keys[2], flex: 1},
				        { text: keys[3], dataIndex: keys[3], flex: 1},
				        { text: keys[4], dataIndex: keys[4], flex: 1}]
				});
				
				Ext.Ajax.request({
					url: 'expdetails/getClimateSebalSummary.action',
					method: 'post',
					params: {
						idexperiment: idexperiment
					},
					success: function (response) {
						var resp = Ext.decode(response.responseText);
						
						var html = '<p><b>Type of experiment:</b> Climate-Sebal Intercomparison</p>';
						html += '<p><b>Climate data</b><br>';
						html += 'Variable: ' + resp.climatevariable + '<br>';
						html += 'Source: ' + resp.climatemodel + ' ' + resp.climatescenario + '<br></p>';
						
						html += '<p><b>Satellite data</b><br>';
						html += 'Variable: ' + resp.sebalvariable + '<br>';
						html += 'Sensor: ' + resp.sebalsensor + '<br></p>';
						
						var submissiondate = resp.submissiondate.substring(0,16);
						
						html += '<p><b>Submission date:</b> ' + submissiondate + '</p>';
						html += '<p><b>Lat range:</b> ' + resp.ymin + ':' + resp.ymax + '</p>';
						html += '<p><b>Lon range:</b> ' + resp.xmin + ':' + resp.xmax + '</p>';
						html += '<p><b>Time range:</b> ' + resp.timemin + ':' + resp.timemax + '</p>';
						
						var gridstore = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp.downloadresource,  'downloadtitle': resp.downloadtitle, 'idexperiment': resp.idexperiment, 'submissiondate': resp.submissiondate, 'stored': resp.stored}]
						});
						
						var summarypanel = {
							xtype: 'panel',
							flex: 1,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'panel',
								flex: 4,
								bodyPadding: '5 10 5 10',
								html: html
							},{
								xtype: 'gridpanel',
								flex: 1,
								hideHeaders: true,
								title: 'Downloads',
								store: gridstore,
							    columns: [{text: 'Title',      dataIndex: 'downloadtitle', flex: 1},
							       {text: 'File Name',  dataIndex: 'downloadresource', hidden: true},
							       {text: 'Experiment',  dataIndex: 'idexperiment', hidden: true},
							       {text: 'Clearing house',    dataIndex: 'stored',           hidden: true},
							       {text: 'Submissiondate',    dataIndex: 'submissiondate',   hidden: true},
							       {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
							    	   items: [{
							    		   icon: 'images/download.png',
							    		   tooltip: 'Download CSV file',
							    		   scope: this,
							    		   handler: controller.downloadCSV
							    	   }]
							    }]
							}]
						};
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Climate-Sebal Intercomparison Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			flex: 4,
				    			layout: {
					    			type : 'hbox',
					    			align: 'stretch'
					    		},
					    		items: [{
					    			xtype: 'panel',
					    			flex: 1.5,
					    			layout: {
					    				type: 'vbox',
					    				align: 'stretch'
					    			},
					    			items: [{
					    				xtype: 'panel',
					    				layout: 'fit',
					    				flex: 1,
					    				items: [chart1]
					    			},{
					    				xtype: 'panel',
					    				layout: 'fit',
					    				flex: 1,
					    				items: [chart2]
					    			}]
					    		},{
					    			xtype: 'panel',
					    			flex: 1,
					    			layout: 'fit',
					    			items: [grid]}]
				    		}, summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id:'clisebIntercompToolbar' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring2' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring2' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment2',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech2' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH2(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text2' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp.stored == 2) {
							Ext.getCmp('storech2' + idexperiment).setVisible(false);
							Ext.getCmp('text2' + idexperiment).setVisible(true);
						}
						
						controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');
						controller.activeexperiments++;
						
					},
					failure: function() {
						Ext.MessageBox.show({
		                    title: 'Error',
		                    msg: 'Network failure.',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		                });
					}
		    	});
			},
			failure: function() {
				Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
    },
    
    relativeheightResults: function(idexperiment) {
    	var controller = this;
    	Ext.Ajax.request({
			url: 'expdetails/getRelativeHeightResults.action',
			method: 'post',
			params: {
				idexperiment: idexperiment
			},
			success: function(response) {
				var resp = Ext.decode(response.responseText);
				var json = JSON.parse(resp);
				
				var store = Ext.create('Ext.data.Store', {
					fields: json.out1_grid.fields,
					data  : json.out1_grid.data
				});
				
				var grid = Ext.create('Ext.grid.Panel', {
				    store: store,
				    columns: [{ text: json.out1_grid.fields[0].name, dataIndex: json.out1_grid.yaxes.fields[0], flex: 1},
				        { text: json.out1_grid.fields[1].name, dataIndex: json.out1_grid.yaxes.fields[1], flex: 1},
				        { text: json.out1_grid.fields[2].name, dataIndex: json.out1_grid.yaxes.fields[2], flex: 1},
				        { text: json.out1_grid.fields[3].name, dataIndex: json.out1_grid.yaxes.fields[3], flex: 1},
				        { text: json.out1_grid.fields[4].name, dataIndex: json.out1_grid.yaxes.fields[4], flex: 1}]
				});
				
				Ext.Ajax.request({
					url: 'expdetails/getRelativeHeightSummary.action',
					method: 'post',
					params: {
						idexperiment: idexperiment
					},
					success: function (response) {
						var resp = Ext.decode(response.responseText);

						var html = '<p><b>Type of experiment:</b> Relative Height Analysis</p>';
						html += '<p><b>LiDAR data</b><br>';
						html += 'Tile: ' + resp[0].lidartile + '<br>';
						
						var submissiondate = resp[0].submissiondate.substring(0,16);
						
						html += '<p><b>Submission date:</b> ' + submissiondate + '</p>';
						html += '<p><b>Lat range:</b> ' + resp[0].ymin + ':' + resp[0].ymax + '</p>';
						html += '<p><b>Lon range:</b> ' + resp[0].xmin + ':' + resp[0].xmax + '</p>';
						
						var gridstore = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp[0].downloadresource,  'downloadtitle': resp[0].downloadtitle, 'idexperiment': resp[0].idexperiment, 'submissiondate': resp[0].submissiondate, 'stored': resp[0].stored},
							         { 'downloadresource': resp[1].downloadresource,  'downloadtitle': resp[1].downloadtitle, 'idexperiment': resp[1].idexperiment, 'submissiondate': resp[1].submissiondate, 'stored': resp[1].stored},
							         { 'downloadresource': resp[2].downloadresource,  'downloadtitle': resp[2].downloadtitle, 'idexperiment': resp[2].idexperiment, 'submissiondate': resp[2].submissiondate, 'stored': resp[2].stored},
							         { 'downloadresource': resp[3].downloadresource,  'downloadtitle': resp[3].downloadtitle, 'idexperiment': resp[3].idexperiment, 'submissiondate': resp[3].submissiondate, 'stored': resp[3].stored},
							         { 'downloadresource': resp[4].downloadresource,  'downloadtitle': resp[4].downloadtitle, 'idexperiment': resp[4].idexperiment, 'submissiondate': resp[4].submissiondate, 'stored': resp[4].stored}]
						});
						
						var summarypanel = {
							xtype: 'panel',
							flex: 1,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'panel',
								flex: 4,
								bodyPadding: '5 10 5 10',
								html: html
							},{
								xtype: 'gridpanel',
								flex: 2,
								hideHeaders: true,
								title: 'Downloads',
								store: gridstore,
							    columns: [{text: 'Title',         dataIndex: 'downloadtitle', flex: 1},
							              {text: 'File Name',     dataIndex: 'downloadresource', hidden: true},
							              {text: 'Experiment',    dataIndex: 'idexperiment', hidden: true},
							              {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
								    	    items: [{
								    		    icon: 'images/download.png',
								    		    tooltip: 'Download TIF file',
								    		    scope: this,
								    		    handler: controller.downloadTIF
								    	    }]
									    }]
							}]
						};
						
						var html_image = '';
						var html_histograms = '';
						if (resp[0].stored == 0 || resp[0].stored == 1) {
							html_image = '<img src="tmp/exp' + idexperiment+ '/out1_image.png" height= "2230" width="100%"/>';
							html_histograms = '<img src="tmp/exp' + idexperiment+ '/out1_histograms.png" height= "720" width="100%"/>';
						}
						else if (resp[0].stored == 2) {
							var year = resp[0].submissiondate.substring(0,4);
							var month = resp[0].submissiondate.substring(5,7);
							var day = resp[0].submissiondate.substring(8,10);
							
							html_image = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1_image.png" heigth= "100%" width="100%"/>';
							html_histograms = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1_histograms.png" heigth= "100%" width="100%"/>';
						}		
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Relative Height Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
				    				xtype: 'panel',
						    		scrollable: true,
						    		autoScroll: true,
				    				height: 2300,
				    				html: html_image
				    			},
				    			{
				    				xtype: 'panel',
						    		scrollable: true,
						    		autoScroll: true,
				    				height: 800,
				    				html: html_histograms
				    			},
				    			{
				    				xtype: 'panel',
						    		scrollable: true,
						    		autoScroll: true,
				    				title: 'Relative Height Stats Table',
				    				//height: 200,
				    				items: [grid]
				    			}
					    		]
				    		}, 
				    		summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'relheighttoolbar' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring3' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring3' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment3',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech3' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH3(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text3' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp[0].stored == 2) {
							Ext.getCmp('storech3' + idexperiment).setVisible(false);
							Ext.getCmp('text3' + idexperiment).setVisible(true);
						}
						
						controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');
						controller.activeexperiments++;
						
					},
					failure: function() {
						Ext.MessageBox.show({
		                    title: 'Error',
		                    msg: 'Network failure.',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		                });
					}
		    	});
			},
			failure: function() {
				Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
    },
    
    lidarintercomparisonResults: function(idexperiment) {
    	var controller = this;
    	Ext.Ajax.request({
			url: 'expdetails/getLidarIntercomparisonResults.action',
			method: 'post',
			params: {
				idexperiment: idexperiment
			},
			success: function(response) {
				var resp = Ext.decode(response.responseText);
				var json = JSON.parse(resp);
				
				var store = Ext.create('Ext.data.Store', {
					fields: json.out1_grid.fields,
					data  : json.out1_grid.data
				});
				
				var grid = Ext.create('Ext.grid.Panel', {
				    store: store,
				    columns: [{ text: json.out1_grid.fields[0].name, dataIndex: json.out1_grid.yaxes.fields[0], flex: 1},
				        { text: json.out1_grid.fields[1].name, dataIndex: json.out1_grid.yaxes.fields[1], flex: 1},
				        { text: json.out1_grid.fields[2].name, dataIndex: json.out1_grid.yaxes.fields[2], flex: 1},
				        { text: json.out1_grid.fields[3].name, dataIndex: json.out1_grid.yaxes.fields[3], flex: 1},
				        { text: json.out1_grid.fields[4].name, dataIndex: json.out1_grid.yaxes.fields[4], flex: 1}]
				});
				
				Ext.Ajax.request({
					url: 'expdetails/getLidarIntercomparisonSummary.action',
					method: 'post',
					params: {
						idexperiment: idexperiment
					},
					success: function (response) {
						var resp = Ext.decode(response.responseText);
						
						var html = '<p><b>Type of experiment:</b> LiDAR Intercomparison Analysis</p>';
						html += '<p><b>LiDAR data</b><br>';
						html += 'Tile: ' + resp[0].lidartile + '<br>';

            function extendedName(val) {
        		  if (val == 'aspect') return 'Aspect';
        		  else if (val == 'agb') return 'Aboveground Biomass';
        		  else if (val == 'chm') return 'Canopy Height Model';
        		  else if (val == 'dsm') return 'Digital Surface Model';
        		  else if (val == 'dtm') return 'Digital Terrain Model';
        		  else if (val == 'fc') return 'Forest Cover';
        		  else if (val == 'pd') return 'Point Density';
        		  else if (val == 'sa') return 'Slope Angle';
        		  else if (val == 'rh') return 'Relative Height 50%';
        	  }

						products = resp[0].metrics.substring(1).split(",");
             html += '<p><b>Metrics: </b>' + extendedName(products[0].trim()) + " - " + extendedName(products[1].trim()) + '</p>';
            
						var submissiondate = resp[0].submissiondate.substring(0,16);	
						
						html += '<p><b>Submission date:</b> ' + submissiondate + '</p>';
						html += '<p><b>Lat range:</b> ' + resp[0].ymin + ':' + resp[0].ymax + '</p>';
						html += '<p><b>Lon range:</b> ' + resp[0].xmin + ':' + resp[0].xmax + '</p>';
						
						var gridstore = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp[0].downloadresource,  'downloadtitle': resp[0].downloadtitle, 'idexperiment': resp[0].idexperiment, 'submissiondate': resp[0].submissiondate, 'stored': resp[0].stored},
							         { 'downloadresource': resp[1].downloadresource,  'downloadtitle': resp[1].downloadtitle, 'idexperiment': resp[1].idexperiment, 'submissiondate': resp[1].submissiondate, 'stored': resp[1].stored}]
						});
						
						var summarypanel = {
							xtype: 'panel',
							flex: 1,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'panel',
								flex: 4,
								bodyPadding: '5 10 5 10',
								html: html
							},{
								xtype: 'gridpanel',
								flex: 2,
								hideHeaders: true,
								title: 'Downloads',
								store: gridstore,
							    columns: [{text: 'Title',         dataIndex: 'downloadtitle', flex: 1},
							              {text: 'File Name',     dataIndex: 'downloadresource', hidden: true},
							              {text: 'Experiment',    dataIndex: 'idexperiment', hidden: true},
							              {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
								    	    items: [{
								    		    icon: 'images/download.png',
								    		    tooltip: 'Download TIF file',
								    		    scope: this,
								    		    handler: controller.downloadTIF
								    	    }]
									    }]
							}]
						};
						var html_image = '';
						var html_scatter = '';
						if (resp[0].stored == 0 || resp[0].stored == 1) {
							html_image = '<img src="tmp/exp' + idexperiment+ '/out1_image.png" heigth= "720" width="100%"/>';
							html_scatter = '<img src="tmp/exp' + idexperiment+ '/out1_scatter.png" heigth= "720" width="100%"/>';
							//html_image = 'tmp/exp' + idexperiment+ '/out1_image.png';
							//html_scatter = 'tmp/exp' + idexperiment+ '/out1_scatter.png';
						}
						else if (resp[0].stored == 2) {
							var year = resp[0].submissiondate.substring(0,4);
							var month = resp[0].submissiondate.substring(5,7);
							var day = resp[0].submissiondate.substring(8,10);
							
							html_image = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1_image.png" heigth= "720" width="100%"/>';
							html_scatter = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1_scatter.png" heigth= "720" width="100%"/>';
							//html_image = 'store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1_image.png';
							//html_scatter = 'store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1_scatter.png';
						
						}					
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Lidar Intercomparison Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
				    				xtype: 'panel',
				    				height: 800,
				    				//shrinkWrap: true,
						    		scrollable: true,
						    		autoScroll: true,
						    		html: html_image
				    				//src: html_image
				    			},{
				    				xtype: 'panel',
				    				height: 800,
				    				//shrinkWrap: true,
						    		scrollable: true,
						    		autoScroll: true,
						    		html: html_scatter
				    				//src: html_scatter
				    			},
				    			{
				    				xtype: 'panel',
				    				title: 'LiDAR Products Stats Table',
						    		scrollable: true,
						    		autoScroll: true,
				    				//heigth: 200,
				    				items: [grid]
				    			}]
				    		}, 
				    		summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'lidarIntercompToolbar' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring4' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring4' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment4',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech4' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH4(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text4' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp[0].stored == 2) {
							Ext.getCmp('storech4' + idexperiment).setVisible(false);
							Ext.getCmp('text4' + idexperiment).setVisible(true);
						}
						

						controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');
						controller.activeexperiments++;
						
					},
					failure: function() {
						Ext.MessageBox.show({
		                    title: 'Error',
		                    msg: 'Network failure.',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		                });
					}
		    	});
			},
			failure: function() {
				Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
    },
    
    modelIntercomparisonResults: function(idexperiment) {
    	var controller = this;
    	Ext.Ajax.request({
			url: 'expdetails/getModelIntercomparisonResults.action',
			method: 'post',
			params: {
				idexperiment: idexperiment
			},
			success: function(response) {
				var resp = Ext.decode(response.responseText);
				var json = JSON.parse(resp);

				var charts_number = Object.keys(json).length;
				
				var store1 = Ext.create('Ext.data.Store', {
					fields: json.out1_grid.fields,
					data  : json.out1_grid.data
				});
				
				var keys = Object.keys(json.out1_grid.data[0]);
				var columns = [];
				for (k in keys) {
					var column = {text: keys[k], dataIndex: keys[k], width: 160};
					columns.push(column);
				}
				var grid1 = Ext.create('Ext.grid.Panel', {
				    store: store1,
				    columns: columns,
		    		overflowY: 'auto',
		    		overflowX: 'auto'
				});
				
				var store2 = Ext.create('Ext.data.Store', {
					fields: json.out2_grid.fields,
					data  : json.out2_grid.data
				});
				
				var grid2 = Ext.create('Ext.grid.Panel', {
				    store: store2,
				    columns: [{ text: json.out2_grid.fields[0].name, dataIndex: json.out2_grid.yaxes.fields[0], width: 170},
				        { text: json.out2_grid.fields[1].name, dataIndex: json.out2_grid.yaxes.fields[1], width: 160},
				        { text: json.out2_grid.fields[2].name, dataIndex: json.out2_grid.yaxes.fields[2], width: 160},
				        { text: json.out2_grid.fields[3].name, dataIndex: json.out2_grid.yaxes.fields[3], width: 160},
				        { text: json.out2_grid.fields[4].name, dataIndex: json.out2_grid.yaxes.fields[4], width: 160},
				        { text: json.out2_grid.fields[5].name, dataIndex: json.out2_grid.yaxes.fields[5], width: 160},
				        { text: json.out2_grid.fields[6].name, dataIndex: json.out2_grid.yaxes.fields[6], width: 160},
				        { text: json.out2_grid.fields[7].name, dataIndex: json.out2_grid.yaxes.fields[7], width: 160},
				        { text: json.out2_grid.fields[8].name, dataIndex: json.out2_grid.yaxes.fields[8], width: 160},
				        { text: json.out2_grid.fields[9].name, dataIndex: json.out2_grid.yaxes.fields[9], width: 160},
				        { text: json.out2_grid.fields[10].name, dataIndex: json.out2_grid.yaxes.fields[10], width: 160},
				        { text: json.out2_grid.fields[11].name, dataIndex: json.out2_grid.yaxes.fields[11], width: 160},
				        { text: json.out2_grid.fields[12].name, dataIndex: json.out2_grid.yaxes.fields[12], width: 160},
				        { text: json.out2_grid.fields[13].name, dataIndex: json.out2_grid.yaxes.fields[13], width: 160},
				        { text: json.out2_grid.fields[14].name, dataIndex: json.out2_grid.yaxes.fields[14], width: 160}],
			    	 overflowY: 'auto',
			    	 overflowX: 'auto'
				});
				
				var storeChart1 = Ext.create('Ext.data.Store', {
					fields: json.out1_1_chart.fields,
					data  : json.out1_1_chart.data
				});
				
				var keys = Object.keys(json.out1_1_chart.data[0]);
				var seriesArray = [];
				for (var k = 0; k < keys.length-1; k++) {
					var series = {
			                type: 'line',
			                highlight: {
			                    size: 7,
			                    radius: 7
			                },
			                axis: 'left',
			                xField: json.out1_1_chart.xaxes.fields[0],
			                yField: json.out1_1_chart.yaxes.fields[k],
			                smooth: true,
			                markerConfig: {
			                    type: 'cross',
			                    size: 4,
			                    radius: 4,
			                    'stroke-width': 0
			                },
/*			                tips: {
		                        trackMouse: true,
		                        width: 150,
		                        height: 20,
		                        renderer: function(storeItem, item) {
		                            this.setTitle(storeItem.get(json.out1_1_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_1_chart.yaxes.fields[k]));
		                        }
		                    }*/
			            };
					seriesArray.push(series);
				}
				
				var chart1 = Ext.create('Ext.chart.Chart', {
		            animate: true,
		            store: storeChart1,
		            shadow: true,
		            theme: 'Category1',
		            legend: {
		                position: 'top'
		            },
		            axes: [{
		                type: 'Numeric',
		                position: 'left',
		                fields: json.out1_1_chart.yaxes.fields,
		                title: json.out1_1_chart.yaxes.title,
		                minorTickSteps: 1,
			            minimum : json.out1_1_chart.yaxes.minimum,
			            maximum : json.out1_1_chart.yaxes.maximum,
		                grid: true
		            },{
		                type: 'Category',
		                position: 'bottom',
		                fields: json.out1_1_chart.xaxes.fields,
		                title: json.out1_1_chart.xaxes.title,
		            }],
		            series: seriesArray
		        });
				
				Ext.Ajax.request({
					url: 'expdetails/getModelIntercomparisonSummary.action',
					method: 'post',
					params: {
						idexperiment: idexperiment
					},
					success: function (response) {
						var resp = Ext.decode(response.responseText);
						
						var html = '<p><b>Type of experiment:</b> Climate Model Intercomparison Analysis</p>';
						html += '<p><b>Climate data (CMIP5)</b><br>';
						html += 'Models: CMCC-CM, CMS<br>';
						html += 'Scenarios: RCP4.5, RCP8.5<br>';
						html += 'Indicators: ' + resp[0].indicators.substring(1) + '<br></p>';

						var submissiondate = resp[0].submissiondate.substring(0,16);	
						
						html += '<p><b>Submission date:</b> ' + submissiondate + '</p>';
						html += '<p><b>Lat range:</b> ' + resp[0].ymin + ':' + resp[0].ymax + '</p>';
						html += '<p><b>Lon range:</b> ' + resp[0].xmin + ':' + resp[0].xmax + '</p>';
						html += '<p><b>Time range:</b> ' + resp[0].timemin + ':' + resp[0].timemax + '</p>';
						
						var gridstore = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp[0].downloadresource,  'downloadtitle': resp[0].downloadtitle, 'idexperiment': resp[0].idexperiment, 'submissiondate': resp[0].submissiondate, 'stored': resp[0].stored},
							         { 'downloadresource': resp[1].downloadresource,  'downloadtitle': resp[1].downloadtitle, 'idexperiment': resp[1].idexperiment, 'submissiondate': resp[1].submissiondate, 'stored': resp[1].stored}]
						});
						
						var summarypanel = {
							xtype: 'panel',
							flex: 1,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'panel',
								flex: 4,
								bodyPadding: '5 10 5 10',
								html: html
							},{
								xtype: 'gridpanel',
								flex: 2,
								hideHeaders: true,
								title: 'Downloads',
								store: gridstore,
							    columns: [{text: 'Title',         dataIndex: 'downloadtitle', flex: 1},
							              {text: 'File Name',     dataIndex: 'downloadresource', hidden: true},
							              {text: 'Experiment',    dataIndex: 'idexperiment', hidden: true},
							              {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
								    	    items: [{
								    		    icon: 'images/download.png',
								    		    tooltip: 'Download CSV file',
								    		    scope: this,
								    		    handler: controller.downloadCSV
								    	    }]
									    }]
							  }]
						};
						
					if (charts_number == 3) {
						
						//alert("charts_number = " + charts_number);
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Climate Model Intercomparison Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			id: 'charts_panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
					    			xtype: 'panel',
					    			id: 'chart1',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart1]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Table',
					    			items: [grid1]
					    		},
					    		{
					    			xtype: 'panel',	
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Stats Table',
					    			items: [grid2]
					    		}]
				    		}, 
				    		summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'modelIntercompToolbar1' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring5' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring5' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment5',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech5' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH5(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text5' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp[0].stored == 2) {
							Ext.getCmp('storech5' + idexperiment).setVisible(false);
							Ext.getCmp('text5' + idexperiment).setVisible(true);
						}
					}
						
					else if (charts_number == 4) {
						
						//alert("charts_number = " + charts_number);
						
						var storeChart2 = Ext.create('Ext.data.Store', {
							fields: json.out1_2_chart.fields,
							data  : json.out1_2_chart.data
						});
						
						var keys = Object.keys(json.out1_2_chart.data[0]);
						var seriesArray = [];
						for (var k = 0; k < keys.length-1; k++) {
							var series = {
					                type: 'line',
					                highlight: {
					                    size: 7,
					                    radius: 7
					                },
					                axis: 'left',
					                xField: json.out1_2_chart.xaxes.fields[0],
					                yField: json.out1_2_chart.yaxes.fields[k],
					                smooth: true,
					                markerConfig: {
					                    type: 'cross',
					                    size: 4,
					                    radius: 4,
					                    'stroke-width': 0
					                },
/*					                tips: {
				                        trackMouse: true,
				                        width: 150,
				                        height: 20,
				                        renderer: function(storeItem, item) {
				                            this.setTitle(storeItem.get(json.out1_2_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_2_chart.yaxes.fields[k]));
				                        }
				                    }*/
					            };
							seriesArray.push(series);
						}
						
						var chart2 = Ext.create('Ext.chart.Chart', {
				            animate: true,
				            store: storeChart2,
				            shadow: true,
				            theme: 'Category1',
				            legend: {
				                position: 'top'
				            },
				            axes: [{
				                type: 'Numeric',
				                position: 'left',
				                fields: json.out1_2_chart.yaxes.fields,
				                title: json.out1_2_chart.yaxes.title,
				                minorTickSteps: 1,
					            minimum : json.out1_2_chart.yaxes.minimum,
					            maximum : json.out1_2_chart.yaxes.maximum,
				                grid: true
				            },{
				                type: 'Category',
				                position: 'bottom',
				                fields: json.out1_2_chart.xaxes.fields,
				                title: json.out1_2_chart.xaxes.title,
				            }],
				            series: seriesArray
				        });
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Climate Model Intercomparison Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			id: 'charts_panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
					    			xtype: 'panel',
					    			id: 'chart1',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart1]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart2]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Table',
					    			items: [grid1]
					    		},
					    		{
					    			xtype: 'panel',	
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Stats Table',
					    			items: [grid2]
					    		}]
				    		}, 
				    		summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'modelIntercompToolbar2' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring6' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring6' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment6',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech6' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH6(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text6' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp[0].stored == 2) {
							Ext.getCmp('storech6' + idexperiment).setVisible(false);
							Ext.getCmp('text6' + idexperiment).setVisible(true);
						}
					}
					
					else if (charts_number == 5) {
						
						//alert("charts_number = " + charts_number);
						
						var storeChart2 = Ext.create('Ext.data.Store', {
							fields: json.out1_2_chart.fields,
							data  : json.out1_2_chart.data
						});
						
						var keys = Object.keys(json.out1_2_chart.data[0]);
						var seriesArray = [];
						for (var k = 0; k < keys.length-1; k++) {
							var series = {
					                type: 'line',
					                highlight: {
					                    size: 7,
					                    radius: 7
					                },
					                axis: 'left',
					                xField: json.out1_2_chart.xaxes.fields[0],
					                yField: json.out1_2_chart.yaxes.fields[k],
					                smooth: true,
					                markerConfig: {
					                    type: 'cross',
					                    size: 4,
					                    radius: 4,
					                    'stroke-width': 0
					                },
/*					                tips: {
				                        trackMouse: true,
				                        width: 150,
				                        height: 20,
				                        renderer: function(storeItem, item) {
				                            this.setTitle(storeItem.get(json.out1_2_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_2_chart.yaxes.fields[k]));
				                        }
				                    }*/
					            };
							seriesArray.push(series);
						}
						
						var chart2 = Ext.create('Ext.chart.Chart', {
				            animate: true,
				            store: storeChart2,
				            shadow: true,
				            theme: 'Category1',
				            legend: {
				                position: 'top'
				            },
				            axes: [{
				                type: 'Numeric',
				                position: 'left',
				                fields: json.out1_2_chart.yaxes.fields,
				                title: json.out1_2_chart.yaxes.title,
				                minorTickSteps: 1,
					            minimum : json.out1_2_chart.yaxes.minimum,
					            maximum : json.out1_2_chart.yaxes.maximum,
				                grid: true
				            },{
				                type: 'Category',
				                position: 'bottom',
				                fields: json.out1_2_chart.xaxes.fields,
				                title: json.out1_2_chart.xaxes.title,
				            }],
				            series: seriesArray
				        });
						
						var storeChart3 = Ext.create('Ext.data.Store', {
							fields: json.out1_3_chart.fields,
							data  : json.out1_3_chart.data
						});
						
						var keys = Object.keys(json.out1_3_chart.data[0]);
						var seriesArray = [];
						for (var k = 0; k < keys.length-1; k++) {
							var series = {
					                type: 'line',
					                highlight: {
					                    size: 7,
					                    radius: 7
					                },
					                axis: 'left',
					                xField: json.out1_3_chart.xaxes.fields[0],
					                yField: json.out1_3_chart.yaxes.fields[k],
					                smooth: true,
					                markerConfig: {
					                    type: 'cross',
					                    size: 4,
					                    radius: 4,
					                    'stroke-width': 0
					                },
/*					                tips: {
				                        trackMouse: true,
				                        width: 150,
				                        height: 20,
				                        renderer: function(storeItem, item) {
				                            this.setTitle(storeItem.get(json.out1_3_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_3_chart.yaxes.fields[k]));
				                        }
				                    }*/
					            };
							seriesArray.push(series);
						}
						
						var chart3 = Ext.create('Ext.chart.Chart', {
				            animate: true,
				            store: storeChart3,
				            shadow: true,
				            theme: 'Category1',
				            legend: {
				                position: 'top'
				            },
				            axes: [{
				                type: 'Numeric',
				                position: 'left',
				                fields: json.out1_3_chart.yaxes.fields,
				                title: json.out1_3_chart.yaxes.title,
				                minorTickSteps: 1,
					            minimum : json.out1_3_chart.yaxes.minimum,
					            maximum : json.out1_3_chart.yaxes.maximum,
				                grid: true
				            },{
				                type: 'Category',
				                position: 'bottom',
				                fields: json.out1_3_chart.xaxes.fields,
				                title: json.out1_3_chart.xaxes.title,
				            }],
				            series: seriesArray
				        });						
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Climate Model Intercomparison Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			id: 'charts_panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
					    			xtype: 'panel',
					    			id: 'chart1',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart1]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart2]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart3]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Table',
					    			items: [grid1]
					    		},
					    		{
					    			xtype: 'panel',	
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Stats Table',
					    			items: [grid2]
					    		}]
				    		}, 
				    		summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'modelIntercompToolbar3' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring7' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring7' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment7',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech7' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH7(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text7' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						if (resp[0].stored == 2) {
							Ext.getCmp('storech7' + idexperiment).setVisible(false);
							Ext.getCmp('text7' + idexperiment).setVisible(true);
						}
					}
					
					else if (charts_number == 6){
						
						//alert("charts_number = " + charts_number);
						
						var storeChart2 = Ext.create('Ext.data.Store', {
							fields: json.out1_2_chart.fields,
							data  : json.out1_2_chart.data
						});
						
						var keys = Object.keys(json.out1_2_chart.data[0]);
						var seriesArray = [];
						for (var k = 0; k < keys.length-1; k++) {
							var series = {
					                type: 'line',
					                highlight: {
					                    size: 7,
					                    radius: 7
					                },
					                axis: 'left',
					                xField: json.out1_2_chart.xaxes.fields[0],
					                yField: json.out1_2_chart.yaxes.fields[k],
					                smooth: true,
					                markerConfig: {
					                    type: 'cross',
					                    size: 4,
					                    radius: 4,
					                    'stroke-width': 0
					                },
/*					                tips: {
				                        trackMouse: true,
				                        width: 150,
				                        height: 20,
				                        renderer: function(storeItem, item) {
				                            this.setTitle(storeItem.get(json.out1_2_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_2_chart.yaxes.fields[k]));
				                        }
				                    }*/
					            };
							seriesArray.push(series);
						}
						
						var chart2 = Ext.create('Ext.chart.Chart', {
				            animate: true,
				            store: storeChart2,
				            shadow: true,
				            theme: 'Category1',
				            legend: {
				                position: 'top'
				            },
				            axes: [{
				                type: 'Numeric',
				                position: 'left',
				                fields: json.out1_2_chart.yaxes.fields,
				                title: json.out1_2_chart.yaxes.title,
				                minorTickSteps: 1,
					            minimum : json.out1_2_chart.yaxes.minimum,
					            maximum : json.out1_2_chart.yaxes.maximum,
				                grid: true
				            },{
				                type: 'Category',
				                position: 'bottom',
				                fields: json.out1_2_chart.xaxes.fields,
				                title: json.out1_2_chart.xaxes.title,
				            }],
				            series: seriesArray
				        });
						
						var storeChart3 = Ext.create('Ext.data.Store', {
							fields: json.out1_3_chart.fields,
							data  : json.out1_3_chart.data
						});
						
						var keys = Object.keys(json.out1_3_chart.data[0]);
						var seriesArray = [];
						for (var k = 0; k < keys.length-1; k++) {
							var series = {
					                type: 'line',
					                highlight: {
					                    size: 7,
					                    radius: 7
					                },
					                axis: 'left',
					                xField: json.out1_3_chart.xaxes.fields[0],
					                yField: json.out1_3_chart.yaxes.fields[k],
					                smooth: true,
					                markerConfig: {
					                    type: 'cross',
					                    size: 4,
					                    radius: 4,
					                    'stroke-width': 0
					                },
/*					                tips: {
				                        trackMouse: true,
				                        width: 150,
				                        height: 20,
				                        renderer: function(storeItem, item) {
				                            this.setTitle(storeItem.get(json.out1_3_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_3_chart.yaxes.fields[k]));
				                        }
				                    }*/
					            };
							seriesArray.push(series);
						}
						
						var chart3 = Ext.create('Ext.chart.Chart', {
				            animate: true,
				            store: storeChart3,
				            shadow: true,
				            theme: 'Category1',
				            legend: {
				                position: 'top'
				            },
				            axes: [{
				                type: 'Numeric',
				                position: 'left',
				                fields: json.out1_3_chart.yaxes.fields,
				                title: json.out1_3_chart.yaxes.title,
				                minorTickSteps: 1,
					            minimum : json.out1_3_chart.yaxes.minimum,
					            maximum : json.out1_3_chart.yaxes.maximum,
				                grid: true
				            },{
				                type: 'Category',
				                position: 'bottom',
				                fields: json.out1_3_chart.xaxes.fields,
				                title: json.out1_3_chart.xaxes.title,
				            }],
				            series: seriesArray
				        });
						
						var storeChart4 = Ext.create('Ext.data.Store', {
							fields: json.out1_4_chart.fields,
							data  : json.out1_4_chart.data
						});
						
						var keys = Object.keys(json.out1_4_chart.data[0]);
						var seriesArray = [];
						for (var k = 0; k < keys.length-1; k++) {
							var series = {
					                type: 'line',
					                highlight: {
					                    size: 7,
					                    radius: 7
					                },
					                axis: 'left',
					                xField: json.out1_4_chart.xaxes.fields[0],
					                yField: json.out1_4_chart.yaxes.fields[k],
					                smooth: true,
					                markerConfig: {
					                    type: 'cross',
					                    size: 4,
					                    radius: 4,
					                    'stroke-width': 0
					                },
/*					                tips: {
				                        trackMouse: true,
				                        width: 150,
				                        height: 20,
				                        renderer: function(storeItem, item) {
				                            this.setTitle(storeItem.get(json.out1_4_chart.xaxes.fields[0]) + ': ' + storeItem.get(json.out1_4_chart.yaxes.fields[k]));
				                        }
				                    }*/
					            };
							seriesArray.push(series);
						}
						
						var chart4 = Ext.create('Ext.chart.Chart', {
				            animate: true,
				            store: storeChart4,
				            shadow: true,
				            theme: 'Category1',
				            legend: {
				                position: 'top'
				            },
				            axes: [{
				                type: 'Numeric',
				                position: 'left',
				                fields: json.out1_4_chart.yaxes.fields,
				                title: json.out1_4_chart.yaxes.title,
				                minorTickSteps: 1,
					            minimum : json.out1_4_chart.yaxes.minimum,
					            maximum : json.out1_4_chart.yaxes.maximum,
				                grid: true
				            },{
				                type: 'Category',
				                position: 'bottom',
				                fields: json.out1_4_chart.xaxes.fields,
				                title: json.out1_4_chart.xaxes.title,
				            }],
				            series: seriesArray
				        });
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Climate Model Intercomparison Analysis: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			id: 'charts_panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
					    			xtype: 'panel',
					    			id: 'chart1',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart1]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart2]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart3]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			items: [chart4]
					    		},
					    		{
					    			xtype: 'panel',
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Table',
					    			items: [grid1]
					    		},
					    		{
					    			xtype: 'panel',	
					    			layout: 'fit',
					    			height: 320,
					    			title: 'Climate-Model Intecomparison Stats Table',
					    			items: [grid2]
					    		}]
				    		}, 
				    		summarypanel],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'modelIntercompToolbar4' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring8' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring8' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},*//*{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment8',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-'*/,{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech8' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH8(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		//disabled: true,
				    	    		hidden    : true,
				    	    		id        : 'text8' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						if (resp[0].stored == 2) {
							Ext.getCmp('storech8' + idexperiment).setVisible(false);
							Ext.getCmp('text8' + idexperiment).setVisible(true);
						}
						
					} 
						
						controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');
						controller.activeexperiments++;
						
					},
					failure: function() {
						Ext.MessageBox.show({
		                    title: 'Error',
		                    msg: 'Network failure.',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		                });
					}
		    	});
			},
			failure: function() {
				Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
    },
    
    enmResults: function(idexperiment) {
    	var controller = this;
			
		Ext.Ajax.request({
			url: 'expdetails/getENMSummary.action',
			method: 'post',
			params: {
				idexperiment: idexperiment
			},
			success: function (response) {
				var resp = Ext.decode(response.responseText);
				var html = '<p><b>Type of experiment:</b> Ecological Niche Modelling</p>';
				var submissiondate = resp[0].submissiondate.substring(0,16);
				
				var datapointarray = [];
				
				Ext.Ajax.request({
					url: 'expdetails/getDataPoints.action',
					method: 'post',
					params: {
						idexperiment: idexperiment
					},
					success: function (response) {
						var resp2 = Ext.decode(response.responseText);
						
						for (var k = 0; k < resp2.length; k++) {
							datapointarray.push(resp2[k].point);
						}
						
						html += '<p><b>Submission date:</b> ' + submissiondate + '</p>';
						html += '<p><b>Species Name:</b> ' + resp[0].speciesname + '<br>';
						html += '<p><b>Selected Data Points:</b> <br>';
						
						for (var k = 0; k < datapointarray.length; k++) {
							html += datapointarray[k] + '<br>';
						}
						
						var gridstore1 = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp[0].downloadresource,  'downloadtitle': resp[0].downloadtitle, 'idexperiment': resp[0].idexperiment, 'submissiondate': resp[0].submissiondate,  'stored': resp[0].stored},
							         { 'downloadresource': resp[1].downloadresource,  'downloadtitle': resp[1].downloadtitle, 'idexperiment': resp[1].idexperiment, 'submissiondate': resp[1].submissiondate,  'stored': resp[1].stored},
							         { 'downloadresource': resp[2].downloadresource,  'downloadtitle': resp[2].downloadtitle, 'idexperiment': resp[2].idexperiment, 'submissiondate': resp[2].submissiondate,  'stored': resp[2].stored}]
						});
						
						var gridstore2 = Ext.create('Ext.data.Store', {
							fields: ['downloadresource', 'downloadtitle', 'idexperiment', 'submissiondate', 'stored'],
							data  : [{ 'downloadresource': resp[3].downloadresource,  'downloadtitle': resp[3].downloadtitle, 'idexperiment': resp[3].idexperiment, 'submissiondate': resp[3].submissiondate,  'stored': resp[3].stored},
	        				         { 'downloadresource': resp[4].downloadresource,  'downloadtitle': resp[4].downloadtitle, 'idexperiment': resp[4].idexperiment, 'submissiondate': resp[4].submissiondate,  'stored': resp[4].stored},
	        				         { 'downloadresource': resp[5].downloadresource,  'downloadtitle': resp[5].downloadtitle, 'idexperiment': resp[5].idexperiment, 'submissiondate': resp[5].submissiondate,  'stored': resp[5].stored}]
						});
						
						var summarypanel = {
							xtype: 'panel',
							flex: 1,
							border: false,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [{
								xtype: 'panel',
								flex: 4,
					    		scrollable: true,
					    		autoScroll: true,
								bodyPadding: '5 10 5 10',
								html: html
							},{
								xtype: 'gridpanel',
								flex: 1.3,
								hideHeaders: true,
								title: 'Download Models',
								store: gridstore1,
							    columns: [{text: 'Title',         dataIndex: 'downloadtitle', flex: 1},
							              {text: 'File Name',     dataIndex: 'downloadresource', hidden: true},
							              {text: 'Experiment',    dataIndex: 'idexperiment', hidden: true},
							              {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
								    	    items: [{
								    		    icon: 'images/download.png',
								    		    tooltip: 'Download Model',
								    		    scope: this,
								    		    handler: controller.downloadIMG
								    	    }]
									    }]
							},
							{
								xtype: 'gridpanel',
								flex: 1.3,
								hideHeaders: true,
								title: 'Download Images',
								store: gridstore2,
							    columns: [{text: 'Title',         dataIndex: 'downloadtitle', flex: 1},
							              
							              {text: 'File Name',     dataIndex: 'downloadresource', hidden: true},
							              {text: 'Experiment',    dataIndex: 'idexperiment', hidden: true},
							              {xtype: 'actioncolumn', width: 30, sortable: false, menuDisabled: true,
								    	    items: [{
								    		    icon: 'images/download.png',
								    		    tooltip: 'Download PNG',
								    		    scope: this,
								    		    handler: controller.downloadPNG
								    	    }]
									    }]
							}]
						};
						
						var image1 = '';
						var image2 = '';
						var image3 = '';
						
						if (resp[0].stored == 0 || resp[0].stored == 1) {
							image1 = '<img src="tmp/exp' + idexperiment+ '/out1.png" height= "680" width="100%"/>';
							image2 = '<img src="tmp/exp' + idexperiment+ '/out2.png" height= "680" width="100%"/>';
							image3 = '<img src="tmp/exp' + idexperiment+ '/out3.png" height= "680" width="100%"/>';
						}
						else if (resp[0].stored == 2) {
							var year = resp[0].submissiondate.substring(0,4);
							var month = resp[0].submissiondate.substring(5,7);
							var day = resp[0].submissiondate.substring(8,10);
							
							image1 = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out1.png" heigth= "680" width="100%"/>';
							image2 = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out2.png" heigth= "680" width="100%"/>';
							image3 = '<img src="store/' + year + '/' + month + '/' + day + '/exp' + idexperiment + '/out3.png" heigth= "680" width="100%"/>';
						}
						
						controller.getExpdtab().add({
				    		xtype: 'panel',
				    		id: 'exp' + idexperiment + 'tab',
				    		closable: true,
				    		listeners: {
				    			close: {
				    				fn: function() {
				    					controller.activeexperiments--;
				    					controller.maskManagement();
			    					}
			                    }
				    		},
				    		title: 'Ecological Niche Modelling: exp' + idexperiment,
				    		layout: {
				    			type : 'hbox',
				    			align: 'stretch'
				    		},
				    		items: [{
				    			xtype: 'panel',
				    			flex: 4,
				    			layout: {
					    			type : 'vbox',
					    			align: 'stretch'
					    		},
					    		scrollable: true,
					    		autoScroll: true,
					    		items: [{
				    				xtype: 'panel',
						    		scrollable: true,
						    		autoScroll: true,
					    			layout: {
						    			type : 'hbox',
						    			align: 'stretch'
						    		},
						    		items: [{
					    				xtype: 'panel',
							    		scrollable: true,
							    		autoScroll: true,
							    		flex: 1,
							    		title: resp[0].downloadtitle,
					    				html: image1
					    			},
					    			{
					    				xtype: 'panel',
							    		scrollable: true,
							    		autoScroll: true,
							    		flex: 1,
							    		title: resp[1].downloadtitle,
					    				html: image2
					    			}] 
				    			},
				    			{
				    				xtype: 'panel',
						    		scrollable: true,
						    		autoScroll: true,
					    			layout: {
						    			type : 'hbox',
						    			align: 'stretch'
						    		},
						    		items: [{
					    				xtype: 'panel',
							    		scrollable: true,
							    		autoScroll: true,
							    		flex: 1,
							    		title: resp[2].downloadtitle,
					    				html: image3
					    			},
					    			{
					    				xtype: 'panel',
							    		scrollable: true,
							    		autoScroll: true,
							    		flex: 1
					    			}] 
				    			},

					    		]
				    		}, 
				    		summarypanel
				    		],
				    		dockedItems: [{
				    	    	xtype    : 'toolbar',
				    	    	//id       : 'exptoolbar',
				    	    	id: 'enmtoolbar' + idexperiment,
				    	    	//hidden: false,
				    	    	layout   : {
				    	    		type : 'hbox',
				    	    		align: 'stretch'
				    	    	},
				    	    	items  : [{
				    	    		xtype: 'tbtext',
				    	    		id  : 'sstoring9' + idexperiment,
				    	    		text: 'Experiment correctly stored in the Clearing House.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},{
				    	    		xtype: 'tbtext',
				    	    		id  : 'fstoring9' + idexperiment,
				    	    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
				    	    		style: {
				    	                marginTop: '4px',
				    	                'font-weight': 'bold'
				    	            },
				    	            hidden: true
				    	    	},'->',/*{
				    	    		id: 'chcolor',
				    	    		//disabled: true,
				    	    		text: 'Choose a color',
				    	            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
				    	    	},{
				    	    		xtype     : 'textfield',
				    	    		//disabled: true,
				    	    		id        : 'saveexperiment9',
				    	    		fieldLabel: 'Experiment Name',
				    	    		maxLength : 256,
				    	    		labelWidth: 120
				    	    	},'-',*/{
				    	    		xtype     : 'button',
				    	    		//disabled: true,
				    	    		hidden    : false,
				    	    		id        : 'storech9' + idexperiment,
				    	    		text      : 'Store in the Clearing House',
				    	    		listeners : {
				    	    		    click: function() {
				    	    		    	controller.storeintheCH9(idexperiment);
				    	    		    }
				    	    		}
				    	    	},
				    	    	{
				    	    		xtype     : 'tbtext',
				    	    		hidden    : true,
				    	    		id        : 'text9' + idexperiment,
				    	    		text      : 'Stored in the Clearing House'
				    	    	}]
				    	    }]
				    	});
						
						if (resp[0].stored == 2) {
							Ext.getCmp('storech9' + idexperiment).setVisible(false);
							Ext.getCmp('text9' + idexperiment).setVisible(true);
						}
						
						controller.getExpdtab().setActiveTab('exp' + idexperiment + 'tab');
						controller.activeexperiments++;

					},
					failure: function() {
						Ext.MessageBox.show({
		                    title: 'Error',
		                    msg: 'Network failure.',
		                    buttons: Ext.MessageBox.OK,
		                    icon: Ext.MessageBox.ERROR
		                });
					}
		    	});				
			},
			failure: function() {
				Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
    	});
    }, 
    
    downloadCSV: function(grid, rowindex, colindex) {
    	var idexperiment = grid.getStore().getAt(rowindex).get('idexperiment');
    	var filename = grid.getStore().getAt(rowindex).get('downloadresource');
    	var clearinghouse = grid.getStore().getAt(rowindex).get('stored');
    	var submissiondate = grid.getStore().getAt(rowindex).get('submissiondate');
    	
        var url = 'expdetails/getFileCSV.action';
        var params = '?idexperiment=' + idexperiment + '&filename=' + filename + '&clearinghouse=' + clearinghouse + '&submissiondate=' + submissiondate;
        window.open(url + params);
    },
    
    downloadTIF: function(grid, rowindex, colindex) {
    	var idexperiment = grid.getStore().getAt(rowindex).get('idexperiment');
    	var filename = grid.getStore().getAt(rowindex).get('downloadresource');
    	var clearinghouse = grid.getStore().getAt(rowindex).get('stored');
    	var submissiondate = grid.getStore().getAt(rowindex).get('submissiondate');
    	
        var url = 'expdetails/getFileTIF.action';
        var params = '?idexperiment=' + idexperiment + '&filename=' + filename + '&clearinghouse=' + clearinghouse + '&submissiondate=' + submissiondate;
        window.open(url + params);
    },
    
    downloadIMG: function(grid, rowindex, colindex) {
    	var idexperiment = grid.getStore().getAt(rowindex).get('idexperiment');
    	var filename = grid.getStore().getAt(rowindex).get('downloadresource');
    	var clearinghouse = grid.getStore().getAt(rowindex).get('stored');
    	var submissiondate = grid.getStore().getAt(rowindex).get('submissiondate');
    	
        var url = 'expdetails/getFileIMG.action';
        var params = '?idexperiment=' + idexperiment + '&filename=' + filename + '&clearinghouse=' + clearinghouse + '&submissiondate=' + submissiondate;
        window.open(url + params);
    },
    
    downloadPNG: function(grid, rowindex, colindex) {
    	var idexperiment = grid.getStore().getAt(rowindex).get('idexperiment');
    	var filename = grid.getStore().getAt(rowindex).get('downloadresource');
    	var clearinghouse = grid.getStore().getAt(rowindex).get('stored');
    	var submissiondate = grid.getStore().getAt(rowindex).get('submissiondate');
        var url = 'expdetails/getFilePNG.action';
        var params = '?idexperiment=' + idexperiment + '&filename=' + filename + '&clearinghouse=' + clearinghouse + '&submissiondate=' + submissiondate;
        window.open(url + params);
    }
});
