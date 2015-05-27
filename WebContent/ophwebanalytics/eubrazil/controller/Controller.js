/**
Eubrazil Scientific Gateway
Copyright (C) 2015 CMCC

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

Ext.define('Eubrazil.controller.Controller', {
    extend: 'Ext.app.Controller',
	
    views: ['BoundingBoxPanel', 'UseCasesPanel',
            'ClimatePanel', 'LandsatPanel', 'LidarPanel', 'SpeciesPanel', 'SubmitPanel',
            'BrazilMapPanel', 'MyExperimentGrid', 'MyExperimentInfo',
            'CHExperimentGrid', 'CHExperimentInfo',
            'MyExperimentJobs', 'ChartResult', 'JobChartsPanel',
            'ExploreCubeOutput', 'Monitoringstackedchart', 'Monitoringpiechart'],
            
    refs: [{ref:'myexpgrid',     selector:'myexpgrid'},
           {ref:'myexpinfo',     selector:'myexpinfo'},
           {ref:'brazilmap',     selector:'brazilmap'},
           {ref:'myexpjobs',     selector:'myexpjobs'},
           {ref:'chexpgrid',     selector:'chexpgrid'},
           {ref:'chexpinfo',     selector:'chexpinfo'},
           {ref:'expcubeoutput', selector:'expcubeoutput'},
           {ref:'piechart',      selector:'piechart'},
           {ref:'stackedchart',  selector:'stackedchart'}],
           
    globalexperimentid    : null,
    globalexperimentstatus: null,
    globalexperimentactive: 0,
    
    globalactivetab       : 0,
    globalchexpactive     : 0,
    seriescounter         : 1,
    
    all_rectangles        : [],
    drawingrectangle      : null,
    globalzIndex          : 1,
    
    speciesMarkers        : [],
           
    init: function() {
    	var controller = this;
    	this.control('brazilmap', {
    		mapready: this.drawRectangle
		});
    	
    	this.control('#chexperimentpanel', {
    		activate: this.drawAllRectangles
		});
    	this.control('#experimentpanel', {
    		activate: this.deleteAllRectangles
		});
    	this.control('#monitoringpanel', {
    		activate: this.monitoringManagement
		});
    	
    	this.control('#climatetimerange', {
		    change: function(el, newVal, thumb){
			    var startdate = Ext.getCmp('startdate');
			    var enddate   = Ext.getCmp('enddate');
			           
			    startdate.setValue(el.thumbs[0].value);
			    enddate.setValue(el.thumbs[1].value);
			   }
		});
    	this.control('#landsattimerange', {
		    change: function(el, newVal, thumb){
			    var lansatstartdate = Ext.getCmp('landsatstartdate');
			    var lansatenddate   = Ext.getCmp('landsatenddate');
			           
			    lansatstartdate.setValue(el.thumbs[0].value);
			    lansatenddate.setValue(el.thumbs[1].value);
			   }
		});
    	this.control('#lidartimerange', {
		    change: function(el, newVal, thumb){
			    var lidarstartdate = Ext.getCmp('lidarstartdate');
			    var lidarenddate   = Ext.getCmp('lidarenddate');
			           
			    lidarstartdate.setValue(el.thumbs[0].value);
			    lidarenddate.setValue(el.thumbs[1].value);
			   }
		});
    	
    	this.control('#computebt', {
			click: this.submitComputation
		});
    	
    	this.control('#searchbt', {
			click: this.searchinthch
		});
    	
    	this.control('#resetbt', {
			click: this.resetForms
		});
    	
    	this.control('myexpgrid', {
    		selectionchange: this.getExperimentInfo,
    		itemdblclick   : this.getExperimentJobs
		});
    	this.control('#experimentsrefresh', {
			click: this.experimentsRefresh
		});
    	
    	this.control('chexpgrid', {
    		selectionchange: this.getCHExperimentInfo,
    		itemdblclick   : this.getCHExperimentJobs
		});
    	
    	this.control('myexpjobs', {
    		itemdblclick: this.getJobResult
		});
    	this.control('#jobsrefresh', {
			click: this.jobsRefresh
		});
    	this.control('#storech', {
			click: this.storeinCH
		});
    	this.control('#chexperimentsrefresh', {
			click: this.drawAllRectangles
		});
    	this.control('#exp_subsetfilters', {
			click: function(toolbar, btn) {
				var datacubeDOI = controller.getMyexpjobs().getSelectionModel().getSelection()[0].get('datacubedoi');
				var idjob = controller.getMyexpjobs().getSelectionModel().getSelection()[0].get('idjob');
				var config = 'cube=' + datacubeDOI + ';show_id=yes;';
				
				/** fields control **/
				var limitflag = 1;
				var dimsflag  = 1;
				
				/* limit_filter */
				var limit_filter = Ext.getCmp('exp_limit_filter').getValue();
				if (limit_filter > 0 && limit_filter <= 10000)
					config += 'limit_filter=' + limit_filter + ';';
				else if (limit_filter != null) {
					limitflag = 0;
					Ext.MessageBox.show({
			           title  : 'Warning',
			           msg    : 'Please, insert a valid value for max number of lines.',
			           buttons: Ext.MessageBox.WARNING,
			           icon   : Ext.MessageBox.WARNING
			       });
				}
				/* subset_dims and subset_filter*/
				var subset_dims = Ext.getCmp('exp_subset_dims').getValue();
				if (subset_dims != '')
					config += 'subset_dims=' + subset_dims + ';';
				
				var subset_filter = Ext.getCmp('exp_subset_filter').getValue();
				if (subset_filter != '')
					config += 'subset_filter=' + subset_filter + ';';
					
				if ((subset_dims != '' && subset_filter == '') || (subset_dims == '' && subset_filter != '')) {
					dimsflag = 0;
					Ext.MessageBox.show({
			           title  : 'Warning',
			           msg    : 'The fields "Subsetting dims" and "Subsetting filter" must have the same number of values.',
			           buttons: Ext.MessageBox.WARNING,
			           icon   : Ext.MessageBox.WARNING
			       });
				}
				/** fields control **/
					
				var flagscontrol = limitflag + '' + dimsflag;
				if (flagscontrol == 11) {
		        	Libraries.Core.actionInvocation({
			    		actionurl:'actions/synchronousSubmit.action',
						actionparams:{
							operator: 'oph_explorecube',
							config  : config,
							idjob   : idjob
						},
						resultsuccessHandler:function(response){
							var textresp = Ext.decode(response.responseText);
							var respdata = textresp.explorecube_data[0];
							controller.getExpcubeoutput().reconfigure(respdata.title, respdata.grid, respdata.model, respdata.data);
							controller.getExpcubeoutput().setTitle("Datacube " + datacubeDOI);
						}
			    	});
				}
			}
		});
    	this.control('#exp_cleanfields', {
			click: function (toolbar, btn) {
				Ext.getCmp('exp_limit_filter').reset();
	        	Ext.getCmp('exp_subset_dims').reset();
	        	Ext.getCmp('exp_subset_filter').reset();
			}
		});
    },
    
    createViews: function() {
    	var controller = this;
		var bbpanel      = controller.getView('BoundingBoxPanel').create();
		var ucpanel      = controller.getView('UseCasesPanel').create();
		var climatepanel = controller.getView('ClimatePanel').create();
		var landsatpanel = controller.getView('LandsatPanel').create();
		var lidarpanel   = controller.getView('LidarPanel').create();
		var speciespanel = controller.getView('SpeciesPanel').create();
		ucpanel.add(climatepanel);
		ucpanel.add(landsatpanel);
		ucpanel.add(lidarpanel);
		ucpanel.add(speciespanel);
		ucpanel.setActiveTab(0);
		
		var subpanel = controller.getView('SubmitPanel').create();
		Ext.getCmp('analysis').add(bbpanel);
		Ext.getCmp('analysis').add(ucpanel);
		Ext.getCmp('analysis').add(subpanel);
		
		var bmappanel = controller.getView('BrazilMapPanel').create();
		var myexpgrid = controller.getView('MyExperimentGrid').create();
		var myexpinfo = controller.getView('MyExperimentInfo').create();
		var chexpgrid = controller.getView('CHExperimentGrid').create();
		var chexpinfo = controller.getView('CHExperimentInfo').create();
		
		var monitoringstacked = controller.getView('Monitoringstackedchart').create();
		var monitoringpie     = controller.getView('Monitoringpiechart').create();
		
		Ext.getCmp('brazilmappanel').add(bmappanel);
		Ext.getCmp('experimentpanel').add(myexpgrid);
		Ext.getCmp('experimentpanel').add(myexpinfo);
		Ext.getCmp('chexperimentpanel').add(chexpgrid);
		Ext.getCmp('chexperimentpanel').add(chexpinfo);
		
		Ext.getCmp('historychart').add(monitoringstacked);
		Ext.getCmp('currentchart').add(monitoringpie);
		
		var myexpjobs = controller.getView('MyExperimentJobs').create();
		Ext.getCmp('resultspanel').add(myexpjobs);
		
		var experimentstask = {
			run: function() {
				if (controller.globalactivetab == 1) {
					if (controller.globalexperimentactive != 0) {
						Ext.Ajax.request({
				    	    url: 'actions/getExperimentsList.action',

				    	    success: function(response) {
				    	    	var resp = Ext.decode(response.responseText);
				    	    	var myexpgrid = controller.getMyexpgrid();
				    	    	var store = myexpgrid.getStore();
				    	    	store.loadRawData(resp);
				    	    	
				    	    	controller.globalexperimentactive = 0;
				    	    	
				    	    	var total = store.getTotalCount();
				    	    	
				    	    	for (var i = 0; i < total; i++) {
				    	    		var tempstatus = store.getAt(i).get('status');
				    	    		if (tempstatus == 'pending' || tempstatus == 'running') {
				    	    			controller.globalexperimentactive = 1;
				    	    			break;
				    	    		}
				    	    	}
				    	    	
				    	    	for (var i = 0; i < total; i++) {
				    	    		var tempid = store.getAt(i).get('idexperiment');
				    	    		if (tempid == controller.globalexperimentid)
				    	    			myexpgrid.getSelectionModel().select(i);
				    	    	}
				    	    },
				    	    failure: function() {alert('failure');}
				    	});
					}
				}
				else if (controller.globalactivetab == 0) {
					if (controller.globalchexpactive != 0) {
						controller.drawAllRectangles();
					}
				}
				else {
					monitoringpie.getStore().load();
					monitoringstacked.getStore().load();
				}
			},
			interval: 5000
    	};
    	Ext.TaskManager.start(experimentstask);
    	
    	var jobstask = {
			run: function() {
				if (controller.globalexperimentstatus == 'pending' || controller.globalexperimentstatus == 'running') {
					Ext.Ajax.request({
			    	    url: 'actions/getJobs.action',
			    	    params: {
			    	    	experimentid : controller.globalexperimentid
			    	    },
			    	    success: function(response) {
			    	    	var resp = Ext.decode(response.responseText);
			    	    	var store = controller.getMyexpjobs().getStore();
			    	    	store.loadRawData(resp);
			    	    	
			    	    	var total = store.getTotalCount();
			    	    	var counter = total;
			    	    	for (var i = 0; i < total; i++) {
			    	    		var tempstatus = store.getAt(i).get('status');
			    	    		if (tempstatus == 'done' || tempstatus == 'failed') {
			    	    			counter--;
			    	    		}
			    	    	}
			    	    	if (counter == 0)
			    	    		controller.globalexperimentstatus = 'done';
			    	    },
			    	    failure: function() {alert('failure');}
			    	});
				}
			},
			interval: 3000
    	};
    	Ext.TaskManager.start(jobstask);
    },
    
    drawAllRectangles: function() {
    	var controller = this;
	    var gMap       = this.getBrazilmap().gmap;
	    
	    controller.deleteAllRectangles();
	    if (controller.drawingrectangle) 
        	controller.drawingrectangle.setMap(null);
	    controller.drawingrectangle = null;
	    
	    controller.globalactivetab   = 0;
	    controller.globalchexpactive = 0;
	      
	    Ext.Ajax.request({
	        url: 'actions/getCHExperimentsList.action',
	
	        success: function(response) {
	            var resp = Ext.decode(response.responseText);
	            var chexpgrid = controller.getChexpgrid();
	            var store = chexpgrid.getStore();
    	    	store.loadRawData(resp);
	            
	            var experimentnumber = store.getTotalCount();
	            
	            for (var i = 0; i < experimentnumber; i++) {
	                var bbox = store.getAt(i).get('boundingbox');
	                var index = bbox.indexOf("|");
	                var latrange = bbox.substring(0, index - 1);
	                var lonrange = bbox.substring(index + 1);
	                var index2 = latrange.indexOf(":");
	                var latmin = latrange.substring(0, index2 - 1);
	                var latmax = latrange.substring(index2 + 1);
	                var index3 = lonrange.indexOf(":");
	                var lonmin = lonrange.substring(0, index3 - 1);
	                var lonmax = lonrange.substring(index3 + 1);
	                
	                var rectangle = new google.maps.Rectangle({
	                    bounds: new google.maps.LatLngBounds(
	                               new google.maps.LatLng(latmax, lonmin),
	                               new google.maps.LatLng(latmin, lonmax)),
	                      map: gMap
	                });
	                
	                var idRectangle = store.getAt(i).get('idexperiment');
	                
	                var color = store.getAt(i).get('color');
	                var rectOptions = {
	                		id           : idRectangle,
	                        strokeColor  : color,
	                        strokeOpacity: 0.8,
	                        strokeWeight : 0.5,
	                        fillColor    : color,
	                        fillOpacity  : 0.35,
	                        zIndex       : controller.globalzIndex++
	                  };
	                
	                rectangle.setOptions(rectOptions);
	                google.maps.event.addListener(rectangle, 'mouseover', function() {
	                	var id = this.get('id');
	                	var rec = chexpgrid.getStore().findExact('idexperiment', id);
	                	chexpgrid.getSelectionModel().select(rec);
	                });
	                controller.all_rectangles.push(rectangle);
	                
	                var tempstatus = store.getAt(i).get('chstatus');
    	    		if (tempstatus == 'request' || tempstatus == 'saving') {
    	    			controller.globalchexpactive = 1;
    	    		}
	            }
	        },
	        failure: function() {alert('failure');}
	    });
    },
    
    deleteAllRectangles: function() {
    	var controller = this;
    	controller.globalactivetab = 1;
    	
    	for (var i = 0; i < controller.all_rectangles.length; i++) {
    		controller.all_rectangles[i].setMap(null);
    	}
    	controller.all_rectangles = [];
    	
    	for (var i = 0; i < controller.speciesMarkers.length; i++) {
    		controller.speciesMarkers[i].setMap(null);
    	}
    	controller.speciesMarkers = [];
    },
    
    monitoringManagement: function() {
    	var controller = this;
    	controller.getPiechart().getStore().load();
    	controller.getStackedchart().getStore().load();
    	controller.globalactivetab = 2;
    },

    drawRectangle: function() {
	    var controller = this;
	    var gMap       = this.getBrazilmap().gmap;
	    
	    gMap.setMapTypeId('roadmap');
	      
	    controller.drawAllRectangles();
	      
	    var drawingManager = new google.maps.drawing.DrawingManager({
	        drawingControl: true,
	        drawingControlOptions: {
	          position: google.maps.ControlPosition.TOP_CENTER,
	          drawingModes: [
	            google.maps.drawing.OverlayType.RECTANGLE
	          ]},
	        rectangleOptions: {
	            strokeColor: '#990033',
	            strokeOpacity: 0.8,
	            strokeWeight: 2,
	            fillColor: '#990033',
	            fillOpacity: 0.15
	        }
	    });
        drawingManager.setMap(gMap);
 
        google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(newRect) {
	        if (controller.drawingrectangle) 
	        	controller.drawingrectangle.setMap(null);
	        
	        controller.deleteAllRectangles();
	        
	        controller.drawingrectangle = newRect;
	        var rectangleBounds = controller.drawingrectangle.getBounds();
	        
	        var northEast = rectangleBounds.getNorthEast();
	        var southWest = rectangleBounds.getSouthWest();
	        var latrange = southWest.lat() + ':' + northEast.lat();
	        var lonrange = southWest.lng() + ':' + northEast.lng();
	        
	        Ext.getCmp('latrange').setValue(latrange);
	        Ext.getCmp('lonrange').setValue(lonrange);
	   });
	},
    
    submitComputation: function() {
    	var controller = this;
    	
    	var latrange     = Ext.getCmp('latrange').getValue();
    	var lonrange     = Ext.getCmp('lonrange').getValue();
    	
    	/** climate **/
    	var ckindicators = Ext.getCmp('indicators').getChecked();
    	var ckscenarios  = Ext.getCmp('scenarios').getChecked();
    	var ckmodels     = Ext.getCmp('models').getChecked();
    	
    	var indicators = [];
    	for (c in ckindicators) {
    		indicators[c] = ckindicators[c].getName();
		}
    	var scenarios = [];
		for (c in ckscenarios) {
			scenarios[c] = ckscenarios[c].getName();
		}
		var models = [];
		for (c in ckmodels) {
			models[c] = ckmodels[c].getName();
		}
    	
		var timerange = Ext.getCmp('climatetimerange').getValues();
		/** climate **/
		
		/** landsat **/
    	var ckvegetationindices = Ext.getCmp('vegetationindices').getChecked();
    	var ckscenes            = Ext.getCmp('scenes').getChecked();
    	var cksensors           = Ext.getCmp('sensors').getChecked();
    	
    	var vegetationindices = [];
    	for (c in ckvegetationindices) {
    		vegetationindices[c] = ckvegetationindices[c].getName();
		}
    	var scenes = [];
		for (c in ckscenes) {
			scenes[c] = ckscenes[c].getName();
		}
		var sensors = [];
		for (c in cksensors) {
			sensors[c] = cksensors[c].getName();
		}
		/** landsat **/
		
		/** species **/
		var genus   = Ext.getCmp('genus').getValue();
		var species = Ext.getCmp('species').getValue();
		/** species **/
		
    	Ext.getCmp('historypanel').setActiveTab(1);
    	
    	Ext.Ajax.request({
    	    url: 'actions/euSubmit.action',
    	    params: {
    	    	latrange: latrange,
    	    	lonrange: lonrange,
    	    	
    	    	// climate
    	    	indicators: indicators,
    	    	scenarios : scenarios,
    	    	models    : models,
    	    	timerange : timerange,
    	    	
    	    	// landsat
    	    	vegetationindices: vegetationindices,
    	    	scenes           : scenes,
    	    	sensors          : sensors,
    	    	
    	    	// species
    	    	genus   : genus,
    	    	species : species
    	    },
    	    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
    	    	var store = controller.getMyexpgrid().getStore();
    	    	store.loadRawData(resp);
    	    	
    	    	controller.globalexperimentactive = 0;
    	    	
    	    	var total = store.getTotalCount();
    	    	for (var i = 0; i < total; i++) {
    	    		var tempstatus = store.getAt(i).get('status');
    	    		if (tempstatus == 'pending' || tempstatus == 'running') {
    	    			controller.globalexperimentactive = 1;
    	    			break;
    	    		}
    	    	}
    	    	
    	    },
    	    failure: function() {alert('failure');}
    	});
    },
    
    getExperimentInfo: function(grid, selected, eOpts) {
  		if (selected.length > 0) {
  			var sel = selected[0].data;
  			this.getMyexpinfo().setTitle('' + sel.experimentname);
  			var html = '<b>Indicators: </b>';
  			html += sel.indicators + '<br>';
  			html += '<b>Bounding box [lat|lon]: </b>';
  			html += sel.boundingbox + '<br>';
  			html += '<b>Time range: </b>';
  			html += sel.timerange + '<br>';
  			html += '<b>Date: </b>';
  			html += sel.submissiondate + '<br>';
  			html += '<b>Status: </b>';
  			html += sel.status;
  			this.getMyexpinfo().update(html);
  		}
  		else {
  			this.getMyexpinfo().update();
  		}
  	},
  	
  	getCHExperimentInfo: function(grid, selected, eOpts) {
  		var controller = this;
  		if (selected.length > 0) {
  			var sel = selected[0].data;
  			this.getChexpinfo().setTitle('' + sel.experimentname);
  			var html = '<b>Indicators: </b>';
  			html += sel.indicators + '<br>';
  			html += '<b>Bounding box [lat|lon]: </b>';
  			html += sel.boundingbox + '<br>';
  			html += '<b>Time range: </b>';
  			html += sel.timerange + '<br>';
  			html += '<b>Date: </b>';
  			html += sel.submissiondate + '<br>';
  			this.getChexpinfo().update(html);
  			
  			var position = grid.store.indexOf(selected[0]);
  			for (c in controller.all_rectangles) {
  				controller.all_rectangles[c].setOptions({strokeWeight:0.5});
  				controller.all_rectangles[c].setOptions({fillOpacity:0.35});
  			}
	  		controller.all_rectangles[position].setOptions({fillOpacity:0.60});
	  		controller.all_rectangles[position].setOptions({strokeWeight:2.5});
	  		controller.all_rectangles[position].setOptions({zIndex:controller.globalzIndex++});
  		}
  		else {
  			this.getChexpinfo().update();
  		}
  	},
  	
  	getExperimentJobs: function(grid, record, index) {
  		var controller       = this;
  		var experimentname   = record.get('experimentname');
  		var experimentid     = record.get('idexperiment');
  		var experimentstatus = record.get('status');
  		
  		controller.globalexperimentid = experimentid;
  		controller.globalexperimentstatus = experimentstatus;
  		
  		for (var i = 0; i < controller.speciesMarkers.length; i++) {
    		controller.speciesMarkers[i].setMap(null);
    	}
    	controller.speciesMarkers = [];
  		
  		Ext.Ajax.request({
    	    url: 'actions/getJobs.action',
    	    params: {
    	    	experimentid : experimentid
    	    },
    	    success: function(response) {
    	    	var resp      = Ext.decode(response.responseText);
    	    	
    	    	Ext.getCmp('resultspanel').removeAll();
    	    	var myexpjobs = controller.getView('MyExperimentJobs').create({
    	    		title: experimentname + ' jobs'
    	    	});
    			Ext.getCmp('resultspanel').add(myexpjobs);
    	    	var store = myexpjobs.getStore();
    	    	store.loadRawData(resp);
    	    },
    	    failure: function() {alert('failure');}
    	});
  	},
  	
  	experimentsRefresh: function() {
  		var controller = this;
  		Ext.Ajax.request({
    	    url: 'actions/getExperimentsList.action',

    	    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
    	    	var myexpgrid = controller.getMyexpgrid();
    	    	var store = myexpgrid.getStore();
    	    	store.loadRawData(resp);
    	    	myexpgrid.getSelectionModel().select(0);
    	    	myexpgrid.getView().fireEvent('itemdblclick', myexpgrid, myexpgrid.getSelectionModel().getLastSelected());
    	    },
    	    failure: function() {alert('failure');}
    	});
  	},
  	
  	getJobResult: function(grid, record, index) {
  		var controller = this;
  		
  		var typeofsource = record.get('typeofsource');
  		
  		if (typeofsource == 'Climate')
  			controller.getClimateResult(grid, record, index);
  		else if (typeofsource == 'Landsat')
  			controller.getLandsatResult(grid, record, index);
  		else if (typeofsource == 'Lidar')
  			controller.getLidarResult(grid, record, index);
  		else
  	  		controller.getSpeciesResult(grid, record, index);
  	},
  	
  	getClimateResult: function(grid, record, index) {
  		var controller = this;
  		if (record.get('status') == 'done') {
  			var idjob        = record.get('idjob');
  			var indicator    = record.get('indicator');
  			var chstatus     = record.get('chstatus');
  			
  			var index = grid.getStore().indexOf(record) + 1;
  			
  			Ext.getCmp('upperpanel').collapse();
  			
  			var url = '';
  			if (chstatus != 'stored')
  				url = 'actions/getExplorecubeResult.action';
  			else
  				url = 'actions/getJsonResult.action';
  			
  			var resulttabpanel = null;
  	  		if (Ext.getCmp('resulttabpanel') == null) {
  	  			resulttabpanel = controller.getView('JobChartsPanel').create({
		  	    	id: 'resulttabpanel'
		  	    });
  	  			Ext.getCmp('resultspanel').add(resulttabpanel);
  	  		}
  	  		else
  	  			resulttabpanel = Ext.getCmp('resulttabpanel');
  	  		
  			// if charts already exists set active
  			// else submit oph_explorecube and show the result
  			if (Ext.getCmp('chart' + idjob) != null)
  				resulttabpanel.setActiveTab('chart' + idjob);
  			else {
  				var store = Ext.create('Eubrazil.store.IndicatorStore');
				var chartresult = controller.getView('ChartResult').create({
	  	    		title: index + ': ' + indicator,
	  	    		id   : 'chart' + idjob,
	  	    		store: store
	  	    	});
				resulttabpanel.add(chartresult);
				resulttabpanel.setActiveTab(chartresult.id);
					
  				Ext.Ajax.request({
					url: url,
  	  	    	    params: {
  	  	    	    	idjob: idjob
  	  	    	    },
  	  	    	    success: function(response) {
  	  	    	    	var textresp = Ext.decode(response.responseText);
  	  	    	    	store.loadRawData(textresp);
  	  	    	    },
  	  	    	    failure: function() {alert('failure');}
				});
  			}
  		}
  		else {
  			Ext.Msg.alert('Warning', 'Please, wait until the job execution is completed');
  		}
  	},
  	
  	getLandsatResult: function(grid, record, index) {
  		var controller = this;
  		
  		var idjob        = record.get('idjob');
  		var indicator    = record.get('indicator');
  		var index = grid.getStore().indexOf(record) + 1;
  		
  		if (record.get('status') == 'done') {
  			var datacubedoi = record.get('datacubedoi');
  			
  			Ext.getCmp('upperpanel').collapse();
  			
  			var resulttabpanel = null;
  	  		if (Ext.getCmp('resulttabpanel') == null) {
  	  			resulttabpanel = controller.getView('JobChartsPanel').create({
		  	    	id: 'resulttabpanel'
		  	    });
  	  			Ext.getCmp('resultspanel').add(resulttabpanel);
  	  		}
  	  		else
  	  			resulttabpanel = Ext.getCmp('resulttabpanel');
  			
  			var exploregrid = null;
  			if (controller.getExpcubeoutput() == null) {
  				exploregrid = controller.getView('ExploreCubeOutput').create();
  				Ext.getCmp('resulttabpanel').add(exploregrid);
  				Ext.getCmp('resulttabpanel').setActiveTab(exploregrid.id);
  			}
  			else {
  				exploregrid = controller.getExpcubeoutput();
  				Ext.getCmp('resulttabpanel').setActiveTab(exploregrid.id);
  			}
  			    
  			Libraries.Core.actionInvocation({
	    		actionurl   : 'actions/synchronousSubmit.action',
				actionparams: {
					operator: 'oph_explorecube',
					config  : 'cube=' + datacubedoi + ';show_id=yes;limit_filter=50;subset_dims=time;subset_filter=15.000000:653.500000;',
					idjob   : idjob
				},
				resultsuccessHandler: function(response) {
					var textresp = Ext.decode(response.responseText);
					console.log(textresp);
					var respdata = textresp.explorecube_data[0];
					exploregrid.reconfigure(respdata.title, respdata.grid, respdata.model, respdata.data);
					exploregrid.setTitle(index + ': ' + indicator);
				}
	    	});
  		}
  		else {
  			Ext.Msg.alert('Warning', 'Please, wait until the job execution is completed');
  		}
  	},
  	
  	getLidarResult: function(grid, record, index) {
  		var controller = this;
  		
  		var idjob     = record.get('idjob');
  		var indicator = record.get('indicator');
  		var filename  = record.get('filename');
  		
  		var index = grid.getStore().indexOf(record) + 1;
		
		Ext.getCmp('upperpanel').collapse();
		
		var resulttabpanel = null;
  		if (Ext.getCmp('resulttabpanel') == null) {
  			resulttabpanel = controller.getView('JobChartsPanel').create({
  	    	id      : 'resulttabpanel'
  	    });
  			Ext.getCmp('resultspanel').add(resulttabpanel);
  		}
  		else
  			resulttabpanel = Ext.getCmp('resulttabpanel');
		
		if (Ext.getCmp('products' + idjob) != null)
			resulttabpanel.setActiveTab('products' + idjob);
		else {
			var productsresult = Ext.create('Ext.panel.Panel', {
				id: 'products' + idjob,
				title: index + ': ' + indicator,
				closable: true,
				html: '<img src="ophwebanalytics/eubrazil/resources/' + filename + '" width="100%" height="100%"/>'
			});
			resulttabpanel.add(productsresult);
			resulttabpanel.setActiveTab(productsresult.id);
  		}
  	},
  	
  	getSpeciesResult: function(grid, record, index) {
  		var controller = this;
	    var gMap       = this.getBrazilmap().gmap;
	    var idjob        = record.get('idjob');
	    
	    Ext.getCmp('upperpanel').expand();
  		
  		Ext.Ajax.request({
		    url: 'actions/getXmlResult.action',
		    params: {
		    	idjob: idjob
		    },
		    success: function(response) {
		    	var resp = Ext.decode(response.responseText);
		    	
	    		for (var i = 0; i < resp.length; i++) {
	    			latitude         = resp[i].lat;
	    			longitude 	     = resp[i].lon;
	    			scientificName   = resp[i].scientificName;
	    			genus 		     = resp[i].genus;
	    			species 	     = resp[i].species;
	    			collectionId     = resp[i].collectionId;
	    			catalogNumber    = resp[i].catalogNumber;
	    			institutionCode  = resp[i].institutionCode;
	    			collectionCode   = resp[i].collectionCode;
	    			
	    			var myLatlng = new google.maps.LatLng(latitude,longitude);
	    			
	    			marker = new google.maps.Marker({
	    				id       	   : collectionId + "/" +  catalogNumber,
				        position 	   : myLatlng,
				        title          : 'Scientific Name: ' + scientificName + 'Lat: ' + latitude + ', Lon: ' + longitude,
				        map            : gMap,
				        scientificName : scientificName,
				        genus          : genus,
				        species        : species,
				        collectionId   : collectionId,
				        catalogNumber  : catalogNumber,
				        institutionCode: institutionCode,
				        collectionCode : collectionCode
				        
				    });
	    			
	    		    var infowindow = new google.maps.InfoWindow({

		                });
	    			
	                google.maps.event.addListener(marker, 'click', function() {
	                	var id = this.get('id');
		                var position        = this.get('position'); 
		                var scientificName  = this.get('scientificName');
		                var genus           = this.get('genus');
		                var species         = this.get('species');
		                var collectionId    = this.get('collectionId');
		                var catalogNumber   = this.get('catalogNumber');
		                var institutionCode = this.get('institutionCode');
		                var collectionCode  = this.get('collectionCode');
		      			
		    			var html = '<h3 id="firstHeading" class="firstHeading">' + scientificName +'</h3>'+
	                    '<b>Genus:&nbsp;</b>' + genus + '<br>' +
	                    '<b>Species:&nbsp;</b>' + species + '<br>' +
	                    '<b>Collection-id:&nbsp;</b>' + collectionId + '<br>' +
	                    '<b>Catalog-number:&nbsp;</b>' + catalogNumber + '<br>' +
	                    '<b>Institution-code:&nbsp;</b>' + institutionCode + '<br>' +
	                    '<b>Collection-code:&nbsp;</b>' + collectionCode + '<br>' +
	                    '<b>For other details:&nbsp;</b> <a target="_blank" href="http://tapir.cria.org.br/guid/' + id +'">'+
	                    'http://tapir.cria.org.br/guid/' + id + '</a>';
		                
	                    infowindow.open(gMap,marker);
	                    infowindow.setPosition(position);
	                    infowindow.setContent(html);
	                });
	                
	    			controller.speciesMarkers.push(marker);
	    		}
		    },
		    failure: function() {alert('failure');}
		});
  	},
  	
  	jobsRefresh: function() {
  		var controller = this;
  		var experimentid = controller.getMyexpjobs().getStore().getAt(0).get('idexperiment');

  		Ext.Ajax.request({
    	    url: 'actions/getJobs.action',
    	    params: {
    	    	experimentid: experimentid
    	    },
    	    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
    	    	var store = controller.getMyexpjobs().getStore();
    	    	store.loadRawData(resp);
    	    },
    	    failure: function() {alert('failure');}
    	});
  		
  	},
  	
  	storeinCH: function() {
  		var controller = this;
  		var experimentname = Ext.getCmp('saveexperiment').getValue();
  		
  		if (experimentname == '')
  			Ext.Msg.alert('Warning', 'Please, insert a name for your experiment before saving it');
  		else {
  			var idexperiment = controller.getMyexpjobs().getStore().getAt(0).get('idexperiment');
  			
  			var rec = controller.getMyexpgrid().getStore().findExact('idexperiment', idexperiment);
  			if (rec != -1) {
  				var status = controller.getMyexpgrid().getStore().getAt(rec).get('status');
		        if (status == 'done') 
		  			Ext.Ajax.request({
			    	    url: 'actions/storeinCH.action',
			    	    params: {
			    	    	idexperiment  : idexperiment,
			    	    	experimentname: experimentname
			    	    },
			    	    success: function(response) {
			    	    	Ext.getCmp('historypanel').setActiveTab(0);
			    	    	Ext.getCmp('upperpanel').expand();
			    	    },
			    	    failure: function() {alert('failure');}
			    	});
		        else
		        	Ext.Msg.alert('Warning', 'It\'s not allowed to save a failed experiment in the Clearing House.');
  			}
  		}
  	},
  	
  	getCHExperimentJobs: function(grid, record, index) {
  		var controller = this;
  		var chstatus   = record.get('chstatus');
  		if (chstatus == 'stored') {
  	  		var experimentname   = record.get('experimentname');
  	  		var experimentid     = record.get('idexperiment');
  	  		
  	  		Ext.Ajax.request({
  	    	    url: 'actions/getJobs.action',
  	    	    params: {
  	    	    	experimentid : experimentid
  	    	    },
  	    	    success: function(response) {
  	    	    	var resp      = Ext.decode(response.responseText);
  	    	    	
  	    	    	Ext.getCmp('resultspanel').removeAll();
  	    	    	var myexpjobs = controller.getView('MyExperimentJobs').create({
  	    	    		title: experimentname + ' jobs'
  	    	    	});
  	    			Ext.getCmp('resultspanel').add(myexpjobs);
  	    	    	var store = myexpjobs.getStore();
  	    	    	store.loadRawData(resp);
  	    	    },
  	    	    failure: function() {alert('failure');}
  	    	});
  		}
  		else {
  			Ext.Msg.alert('Warning', 'Please, wait until the job execution is completed');
  		}
  	},
  	
  	searchinthch: function() {
  		var tip = Ext.create('Ext.tip.ToolTip', {        
            target: 'searchbt',
            html: 'text'
        });
  		alert('searchinthch');
  		tip.show();
  		alert('searchinthch');
  	},
  	
  	resetForms: function() {
  		Ext.getCmp('climate').getForm().reset();
  		Ext.getCmp('landsat').getForm().reset();
  		Ext.getCmp('lidar').getForm().reset();
  		Ext.getCmp('latrange').reset();
  		Ext.getCmp('lonrange').reset();
  	},
  	
	showTooltip: function(myTooltip, id) {
		
		  var tooltip = Ext.getCmp(id);
		  if (tooltip == null){
		  
		  tooltip = new Ext.ToolTip({        
	  	        title     : '<p>Workflow</p>',
	  	        id        : id,
	  	        target    : myTooltip,
	  	        anchor    : 'right',
	  	        html      : '<html><img src="ophwebanalytics/eubrazil/resources/workflow.png"/></html>',
	  	        width     : 240,
	  	        height    : 300,
	  	        autoHide  : true,
	  	        autoShow  : true,
	  	    });
		  tooltip.show;
		  }
		  else
			  tooltip.show;
	  }
});