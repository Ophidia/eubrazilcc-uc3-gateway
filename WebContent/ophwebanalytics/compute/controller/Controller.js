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

Ext.define('Compute.controller.Controller', {
    extend: 'Ext.app.Controller',
	
    views: ['ComputeTabPanel',
            'InterannualExpPanel', 'ClimateSebalExp', 'ClimateAnalysisExpPanel', 'RelativeHeightExpPanel',
            'LidarMetricsIntercomparisonExpPanel','BrazilMapPanel', 'MyExperimentGrid', 'OMExpPanel'],
    
    refs: [{ref:'computeeumap',     selector:'computeeumap'},
           {ref:'computemyexpgrid', selector:'computemyexpgrid'}],
           
    globalzIndex    : 1,
    all_rectangles  : [],
    rectangles      : true,
    drawingrectangle: null,
    
    activeexps      : 0,
    idexperiment    : '',
    metrics         : 0,
    marker1         : null,
    marker2         : null,
    marker3         : null,
    marker4         : null,
    marker5         : null,
    marker6         : null,
    marker7         : null,
    marker8         : null,
    marker9         : null,
    
    dataPointsArray : [],
    speciesPointsArray: [],
           
    init: function() {
    	this.control('computeeumap', {
    		mapready: this.drawRectangle
		});
    	this.control('computetab', {
    		activate: this.getExperiments
		});
    	this.control('#interannualcomputebt', {
			click: this.interannualComputation
		});
    	this.control('#climateanalysiscomputebt', {
			click: this.climateAnalysisComputation
		});
    	this.control('#clisebcomputebt', {
			click: this.clisebComputation
		});
    	this.control('#relativeheightcomputebt', {
			click: this.relativeheightComputation
		});
    	this.control('#lidarmetricsintercomparisoncomputebt', {
			click: this.lidarintercomparisonComputation
		});
    	this.control('#opmexpcomputebt', {
			click: this.enmComputation
		});
    	this.control('#computeexperimentsrefresh', {
			click: this.getExperiments
		});
    	this.control('computemyexpgrid', {
    		selectionchange: this.getExperimentInfo,
    		itemdblclick   : this.getDetails
		});
    	this.control('#exptabpanel', {
			tabchange: this.resetBBox
		});
    	this.control('#interannualresetbt', {
			click: this.resetInterannual
		});
    	this.control('#clisebresetbt', {
			click: this.resetCliSeb
		});
    	this.control('#relativeheightresetbt', {
			click: this.resetRelHeight
		});
    	this.control('#lidarmetricsintercomparisonresetbt', {
			click: this.resetLidarIntercomp
		});
    	this.control('#climateanalysisresetbt', {
			click: this.resetClimateIntercomp
		});
    	this.control('#omexpresetbt', {
			click: this.resetENM
		});
    	this.control('#interannualtimerange', {
		    change: function(el, newVal, thumb) {
			    var startdate = Ext.getCmp('interannualstartdate');
			    var enddate   = Ext.getCmp('interannualenddate');
			           
			    startdate.setValue(el.thumbs[0].value);
			    enddate.setValue(el.thumbs[1].value);
			}
		});
    	this.control('#climateanalysistimerange', {
		    change: function(el, newVal, thumb) {
			    var startdate = Ext.getCmp('climateanalysisstartdate');
			    var enddate   = Ext.getCmp('climateanalysisenddate');
			           
			    startdate.setValue(el.thumbs[0].value);
			    enddate.setValue(el.thumbs[1].value);
			}
		});
    	this.control('#clisebtimerange', {
		    change: function(el, newVal, thumb) {
			    var clisebstartdate = Ext.getCmp('clisebstartdate');
			    var clisebenddate   = Ext.getCmp('clisebenddate');
			           
			    clisebstartdate.setValue(el.thumbs[0].value);
			    clisebenddate.setValue(el.thumbs[1].value);
			}
		});
    	
    	this.control('#exptabpanel', {
		    tabchange: this.resetZoomMarkers
		});
    	
       	this.control('#lidartiles', {
	    change: this.highlightMarker
	    });
       	
	    this.control('#tilesintercomparison', {
	    	change: this.highlightMarkerIntercomp
	    });
	    
	    this.control('#species', {
	    	change: this.selectSpeciesPoints
	    });
    },
    
    deleteExperiment: function(idexperiment, status) {
    	
    	if (status == 'pending'|| status == 'running') {
	    	Ext.MessageBox.show({
                title: 'Message',
                msg: 'You cannot delete this experiment',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
    	}
    	else {
        	var controller = this;
        	Ext.MessageBox.confirm('Delete', 'Are you sure?', function(btn){
        		   if(btn === 'yes'){
        		    	Ext.Ajax.request({
        		    	    url: 'compute/deleteExperiment.action',
        		    	    method: 'post',
        		    	    params: {
        		    	    	expid    : idexperiment
        		    	    },
        		    	    success: function(response) {
        		    	    	controller.getExperiments();
        		    	    },
        		    	    failure: function(response) {
        		    	    	Ext.MessageBox.show({
        		                    title: 'Error',
        		                    msg: 'Network failure.',
        		                    buttons: Ext.MessageBox.OK,
        		                    icon: Ext.MessageBox.ERROR
        		                });
        		    	    }});
        		   }
        		   else{

        		   }
        	});
    	}
    },    
    
    resetZoomMarkers: function() {
    	
    	var controller = this;
		var gMap = controller.getComputeeumap().gmap;
		
    	var activeTab = Ext.getCmp("exptabpanel").getActiveTab();
    	var activeTabIndex = Ext.getCmp("exptabpanel").items.findIndex('id', activeTab.id);
    	
    	if (activeTabIndex == 1) {
    		
      		Ext.getCmp('species').getStore().removeAll();
      	
      		Ext.getCmp('datapoints').getStore().removeAll();
      		
        	if (controller.speciesPointsArray.length != 0) {
        		for (var k = 0; k < controller.speciesPointsArray.length; k++) {
        			controller.speciesPointsArray[k].setMap(null);
        		}
        	}
    		
    		if (controller.marker1 != null && controller.marker2 != null && controller.marker3 != null && controller.marker4 != null &&controller.marker5 != null &&controller.marker6 != null && controller.marker7 != null && controller.marker8 != null && controller.marker9 != null) {
        		controller.marker1.setMap(null);
        		controller.marker2.setMap(null);
        		controller.marker3.setMap(null);
        		controller.marker4.setMap(null);
        		controller.marker5.setMap(null);
        		controller.marker6.setMap(null);
        		controller.marker7.setMap(null);
        		controller.marker8.setMap(null);
        		controller.marker9.setMap(null);
    		}

    		var latLng5 = {lat: -14.235004, lng: -51.92527999999999};
    		gMap.setCenter(latLng5);
    		gMap.setZoom(4);
    		
			controller.drawAllRectangles(controller.getComputemyexpgrid().getStore());
			controller.rectangles = true;
    		controller.getSpecies();
    	}
    	
    	if (activeTabIndex == 0 || activeTabIndex == 2 || activeTabIndex == 3) {
    		if (controller.marker1 != null && controller.marker2 != null && controller.marker3 != null && controller.marker4 != null &&controller.marker5 != null &&controller.marker6 != null && controller.marker7 != null && controller.marker8 != null && controller.marker9 != null) {
        		controller.marker1.setMap(null);
        		controller.marker2.setMap(null);
        		controller.marker3.setMap(null);
        		controller.marker4.setMap(null);
        		controller.marker5.setMap(null);
        		controller.marker6.setMap(null);
        		controller.marker7.setMap(null);
        		controller.marker8.setMap(null);
        		controller.marker9.setMap(null);
    		}

    		var latLng5 = {lat: -14.235004, lng: -51.92527999999999};
    		gMap.setCenter(latLng5);
    		gMap.setZoom(4);
    		
			controller.drawAllRectangles(controller.getComputemyexpgrid().getStore());
			controller.rectangles = true;
			
	    	if (controller.speciesPointsArray.length != 0) {
	    		for (var k = 0; k < controller.speciesPointsArray.length; k++) {
	    			controller.speciesPointsArray[k].setMap(null);
	    		}
	    	}
    	}

    	else if (activeTabIndex == 4 || activeTabIndex == 5) {
    		controller.getTilesMarkers();
    		controller.drawAllRectangles(controller.getComputemyexpgrid().getStore());
    		
        	if (controller.speciesPointsArray.length != 0) {
        		for (var k = 0; k < controller.speciesPointsArray.length; k++) {
        			controller.speciesPointsArray[k].setMap(null);
        		}
        	}
    	}
    },
    
    resetBBox: function() {
    	this.resetInterannual();
    	this.resetCliSeb();
    	this.resetClimateIntercomp();
    },
    
    resetForms: function() {
  		Ext.getCmp('climate').getForm().reset();
  		Ext.getCmp('landsat').getForm().reset();
  		Ext.getCmp('lidar').getForm().reset();
  		Ext.getCmp('speciespanel').getForm().reset();
  		Ext.getCmp('latrange').reset();
  		Ext.getCmp('lonrange').reset();
  	},
  	
  	resetInterannual: function() {
  		Ext.getCmp('interannualexppanel').getForm().reset();
    	if (this.drawingrectangle) 
        	this.drawingrectangle.setMap(null);
	    this.drawingrectangle = null;
  	},
  	
  	resetCliSeb: function() {
  		Ext.getCmp('clisebexp').getForm().reset();
    	if (this.drawingrectangle) 
    		this.drawingrectangle.setMap(null);
    	this.drawingrectangle = null;
  	},
  	
  	resetRelHeight: function() {
  		var controller = this;
  		Ext.getCmp('relativeheightexppanel').getForm().reset();
		 controller.marker1.setIcon("images/green.png");
		 controller.marker2.setIcon("images/green.png");
		 controller.marker3.setIcon("images/green.png");
		 controller.marker4.setIcon("images/green.png");
		 controller.marker5.setIcon("images/green.png");
		 controller.marker6.setIcon("images/green.png");
		 controller.marker7.setIcon("images/green.png");
		 controller.marker8.setIcon("images/green.png");
		 controller.marker9.setIcon("images/green.png");
  	},
  	
  	resetLidarIntercomp: function() {
  		var controller = this;
  		Ext.getCmp('lidarmetricsintercomparisonexppanel').getForm().reset();
		 controller.marker1.setIcon("images/green.png");
		 controller.marker2.setIcon("images/green.png");
		 controller.marker3.setIcon("images/green.png");
		 controller.marker4.setIcon("images/green.png");
		 controller.marker5.setIcon("images/green.png");
		 controller.marker6.setIcon("images/green.png");
		 controller.marker7.setIcon("images/green.png");
		 controller.marker8.setIcon("images/green.png");
		 controller.marker9.setIcon("images/green.png");
  	},
  	
  	resetClimateIntercomp: function() {
  		Ext.getCmp('climateanalysisexppanel').getForm().reset();
    	if (this.drawingrectangle) 
    		this.drawingrectangle.setMap(null);
    	this.drawingrectangle = null;
  	},
  	
  	resetENM: function() {
  		var controller = this;
  		//Ext.getCmp('species').getStore().removeAll();

  		Ext.getCmp('datapoints').getStore().removeAll();
  		
    	if (controller.speciesPointsArray.length != 0) {
    		for (var k = 0; k < controller.speciesPointsArray.length; k++) {
    			controller.speciesPointsArray[k].setMap(null);
    		}
    	}
  	},
    
    createView: function(view) {
    	var controller = this;
    	return controller.getView(view).create();
    },
    
    createViews: function() {
    	var controller = this;
    	
		var interannualpanel = controller.getView('InterannualExpPanel').create('');
		Ext.getCmp('interannualexperimentpanel').add(interannualpanel);
		var clisebpanel = controller.getView('ClimateSebalExp').create('');
		Ext.getCmp('clisebexperimentpanel').add(clisebpanel);
		var omexppanel = controller.getView('OMExpPanel').create('');
		Ext.getCmp('omexperimentpanel').add(omexppanel);
		var relativeheightpanel = controller.getView('RelativeHeightExpPanel').create('');
		Ext.getCmp('relativeheightpanel').add(relativeheightpanel);
		var lidarmetricsintercomparisonpanel = controller.getView('LidarMetricsIntercomparisonExpPanel').create('');
		Ext.getCmp('lidarmetricsintercomparisonpanel').add(lidarmetricsintercomparisonpanel);
		
		var climateanalysispanel = controller.getView('ClimateAnalysisExpPanel').create('');
		Ext.getCmp('climateanalysisexperimentpanel').add(climateanalysispanel);
		
		// center
		var bmappanel = controller.getView('BrazilMapPanel').create();
		Ext.getCmp('computemappanel').add(bmappanel);
		var myexpgrid = controller.getView('MyExperimentGrid').create();
		Ext.getCmp('computeexperiment').add(myexpgrid);
		
		var experimentstask = {
			run: function() {
				if (controller.activeexps != 0) {
					Ext.Ajax.request({
			    	    url: 'compute/getExperiments.action',
			    	    method: 'post',
			    	    success: function(response) {
			    	    	var resp = Ext.decode(response.responseText);
			    	    	var experimentsgrid = controller.getComputemyexpgrid();
			    	    	var store = experimentsgrid.getStore();
			    	    	store.loadRawData(resp);
			    	    	
			    	    	controller.activeexps = 0;
			    	    	
			    	    	var total = store.getTotalCount();
			    	    	
			    	    	for (var i = 0; i < total; i++) {
			    	    		var tempstatus = store.getAt(i).get('status');
			    	    		if (tempstatus == 'pending' || tempstatus == 'running') {
			    	    			controller.activeexps = 1;
			    	    			controller.idexperiment = store.getAt(i).get('idexperiment');
			    	    			break;
			    	    		}
			    	    	}
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
				}
			},
			interval: 5000
    	};
    	Ext.TaskManager.start(experimentstask);
    },
    
    getSpecies: function() {
    	
    	Ext.Ajax.request({
    	    url: 'compute/getSpecies.action',
    	    method: 'post',
    	    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
    	    	
    	    	var speciesmultiselect = Ext.getCmp("species");
    	    	var store = speciesmultiselect.getStore();
    	    	store.loadRawData(resp);
    	    	
    	    	//speciesmultiselect.getSelectionModel().select(0);
    	    	
    	    },
    	    failure: function(response) {
    	    	Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
    	    }
    	});
    },
    
    selectSpeciesPoints: function() {
    	var controller = this;
    	var gMap = controller.getComputeeumap().gmap;
    	
    	if (Ext.getCmp('species').isValid()) {
    	
    	controller.dataPointsArray = [];
    	
    	var speciesId = Ext.getCmp("species").getValue();
    	
    	if (controller.speciesPointsArray.length != 0) {
    		for (var k = 0; k < controller.speciesPointsArray.length; k++) {
    			controller.speciesPointsArray[k].setMap(null);
    		}
    	}
    	
    	Ext.Ajax.request({
    	    url: 'compute/getSpeciesDataPoints.action',
    	    method: 'post',
    	    params: {
    	    	speciesId: speciesId,
    	    },
    	    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
	    		var infowindow = null;
	    		
    	    	for (var k = 0; k < resp.length; k++) {
    	    		var id = resp[k].idDataPoint;
    	    		controller.dataPointsArray.push(id);
    	    		
    	    		var position = resp[k].point;
    	    		var lon = position.slice(0, position.indexOf(":"));
    	    		var lat = position.slice(position.indexOf(":") + 1);
    	    		
    	    		var myLatlng = new google.maps.LatLng(lat,lon);

    	    		var marker = new google.maps.Marker({
    	    		    position: myLatlng,
    	    		    title: position,
    	    		    map: gMap
    	    		});
	    			
	    			google.maps.event.addListener(marker, 'click', function () {
	    				if (infowindow) infowindow.close();
		    			infowindow = new google.maps.InfoWindow({
		    				content: "" + this.getPosition().lng() + ":" + this.getPosition().lat() + ""
		    			});

	    				infowindow.open(gMap, this);
	    			});

    	    		controller.speciesPointsArray.push(marker);
    	    	}
    	    	
    	    	var datapointsmultiselect = Ext.getCmp("datapoints");
    	    	var store = datapointsmultiselect.getStore();    	    	
    	    	store.loadRawData(resp);
    	    	
    	    },
    	    failure: function(response) {
    	    	Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
    	    }
    	});
    	
    	}
    	else {
	    	Ext.MessageBox.show({
                title: 'Message',
                msg: 'Please, select one species at a time.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
    	}
    	
    },
    
    getExperiments: function() {
    	var controller = this;
    	controller.activeexps = 0;
    	Ext.Ajax.request({
    	    url: 'compute/getExperiments.action',
    	    method: 'post',
    	    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
    	    	var experimentsgrid = controller.getComputemyexpgrid();
    	    	var store = experimentsgrid.getStore();
    	    	store.loadRawData(resp);
    	    	
    	    	controller.deleteAllRectangles();
    	    	controller.drawAllRectangles(store);
    	    	
    	    	experimentsgrid.getSelectionModel().select(0);
    	    	var total = store.getTotalCount();
    	    	for (var i = 0; i < total; i++) {
    	    		var tempstatus = store.getAt(i).get('status');
    	    		if (tempstatus == 'pending' || tempstatus == 'running') {
    	    			controller.activeexps = 1;
    	    			break;
    	    		}
    	    	}
    	    },
    	    failure: function(response) {
    	    	Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
    	    }
    	});
    },
    
    rectanglesControl: function (controlDiv, map) {
		
		var controller = this;

	   // Set CSS for the control border
	   var controlUI = document.createElement('div');
	   controlUI.style.backgroundColor = '#fff';
       controlUI.style.border = '2px solid #fff';
	   controlUI.style.borderRadius = '2px';
	   controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	   controlUI.style.cursor = 'pointer';
	   controlUI.style.marginTop = '10px';
	   controlUI.style.marginRight = '10px';
	   controlUI.style.height = '30px';
	   controlUI.style.textAlign = 'center';
	   controlUI.title = 'Click to add or remove rectangles';
	   controlDiv.appendChild(controlUI);
		
	   // Set CSS for the control interior
	   var controlText = document.createElement('div');
	   controlText.style.color = 'rgb(25,25,25)';
	   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	   controlText.style.fontSize = '11px';
	   controlText.style.lineHeight = '12px';
	   controlText.style.padding = '8px';
	   controlText.innerHTML = 'Rectangles on/off';
	   controlUI.appendChild(controlText);
		
	   google.maps.event.addDomListener(controlUI, 'click', function() {
		   var storeelements = controller.getComputemyexpgrid().getStore().getTotalCount();
		   if (storeelements > 0) {
			   if (controller.rectangles) {
				   controller.deleteAllRectangles();
				   controller.rectangles = false;
			   }
			   else {
				   controller.drawAllRectangles(controller.getComputemyexpgrid().getStore());
				   controller.rectangles = true;
			   }
		   }
	   });
	},
    
    deleteAllRectangles: function() {
    	var controller = this;
    	
    	for (var i = 0; i < controller.all_rectangles.length; i++) {
    		controller.all_rectangles[i].setMap(null);
    	}
    	controller.all_rectangles = [];
    },
    
    drawAllRectangles: function(store) {
    	var controller = this;
    	var gMap = controller.getComputeeumap().gmap;
    	
    	if (controller.drawingrectangle) 
        	controller.drawingrectangle.setMap(null);
	    controller.drawingrectangle = null;
    	
    	store.each(function(record) {
    		var xmin = record.get('xmin');
    		var xmax = record.get('xmax');
    		var ymin = record.get('ymin');
    		var ymax = record.get('ymax');
    		
    		var rectangle = new google.maps.Rectangle({
                bounds: new google.maps.LatLngBounds(
                		new google.maps.LatLng(ymax, xmin),
                        new google.maps.LatLng(ymin, xmax)),
                map: gMap
            });
    		
    		var idRectangle = record.get('idexperiment');
            
    		var color = '#' + Math.floor(Math.random()*16777215).toString(16);
    		var rectOptions = {
	    		id           : idRectangle,
	            strokeColor  : color,
	            strokeOpacity: 0.8,
	            strokeWeight : 0.5,
	            fillColor    : color,
	            fillOpacity  : 0.50,
	            zIndex       : controller.globalzIndex++
	        };

            rectangle.setOptions(rectOptions);
            
            google.maps.event.addListener(rectangle, 'mouseover', function() {
            	var id = this.get('id');
            	var rec = store.findExact('idexperiment', id);
            	controller.getComputemyexpgrid().getSelectionModel().select(rec);
            });
            controller.all_rectangles.push(rectangle);
    	});
    },
    
    getExperimentInfo: function(grid, selected, eOpts) {
    	var controller = this;
  		if (selected.length > 0) {
  			
  			if (controller.rectangles) {
  				var position = grid.store.indexOf(selected[0]);
  	  			for (c in controller.all_rectangles) {
  	  				controller.all_rectangles[c].setOptions({strokeWeight:0.5});
  	  				controller.all_rectangles[c].setOptions({fillOpacity:0.20});
  	  			}
  		  		controller.all_rectangles[position].setOptions({fillOpacity:0.60});
  		  		controller.all_rectangles[position].setOptions({strokeWeight:2.5});
  		  		controller.all_rectangles[position].setOptions({zIndex:controller.globalzIndex++});
  			}
  		}
  	},
    
    drawRectangle: function() {
	    var controller = this;
	    var gMap       = this.getComputeeumap().gmap;
	    
	    gMap.setMapTypeId('roadmap');
	    
	    var centerControlDiv = document.createElement('div');
	    controller.rectanglesControl(centerControlDiv, gMap);
	    centerControlDiv.index = 1;
	    gMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
	    
	    var drawingManager = new google.maps.drawing.DrawingManager({
	        drawingControl: true,
	        drawingControlOptions: {
	          position: google.maps.ControlPosition.TOP_CENTER,
	          drawingModes: [google.maps.drawing.OverlayType.RECTANGLE]
	        },
	        rectangleOptions: {
	            strokeColor: '#C70042',
	            strokeOpacity: 0.8,
	            strokeWeight: 2,
	            fillColor: '#C70042',
	            fillOpacity: 0.15
	        }
	    });
        drawingManager.setMap(gMap);
        
        controller.getExperiments();
 
        google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(newRect) {
	        if (controller.drawingrectangle) 
	        	controller.drawingrectangle.setMap(null);
	        
	        controller.deleteAllRectangles();
	        controller.rectangles = false;
	        
	        controller.drawingrectangle = newRect;
	        var rectangleBounds = controller.drawingrectangle.getBounds();
	        
	        var northEast = rectangleBounds.getNorthEast();
	        var southWest = rectangleBounds.getSouthWest();
	        var latrange = southWest.lat() + ':' + northEast.lat();
	        var lonrange = southWest.lng() + ':' + northEast.lng();
	        
	        
	        var activetab = Ext.getCmp('exptabpanel').getActiveTab().id;
	        if (activetab == 'interannualexperimentpanel') {
	        	Ext.getCmp('interannuallatrange').setValue(latrange);
		        Ext.getCmp('interannuallonrange').setValue(lonrange);
	        }
	        else if (activetab == 'clisebexperimentpanel') {
	        	Ext.getCmp('cliseblatrange').setValue(latrange);
		        Ext.getCmp('cliseblonrange').setValue(lonrange);
	        }
	        else if (activetab == 'climateanalysisexperimentpanel') {
	        	Ext.getCmp('climateanalysislatrange').setValue(latrange);
		        Ext.getCmp('climateanalysislonrange').setValue(lonrange);
	        }
	   });
	},
	
    interannualComputation: function() {
    	var controller = this;
    	
    	if (Ext.getCmp('interannualexppanel').getForm().isValid()) {
    		var latrange = Ext.getCmp('interannuallatrange').getValue();
        	var lonrange = Ext.getCmp('interannuallonrange').getValue();
        	
        	var latindex = latrange.indexOf(':');
        	var ymin = latrange.substring(0, latindex);
        	var ymax = latrange.substring(latindex + 1);
        	
        	var lonindex = lonrange.indexOf(':');
        	var xmin = lonrange.substring(0, lonindex);
        	var xmax = lonrange.substring(lonindex + 1);
    		
        	var interannualvariable = Ext.getCmp('interannualvariable').getChecked();
        	var variable = '';
        	
            if (interannualvariable.length == 0) {
          	   Ext.MessageBox.show({
                     title: 'Warning',
                     msg: 'Please, select one variable.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.WARNING
                 });
            }
            else {
            	variable = interannualvariable[0].getSubmitValue();
            }
        	
    		var interannualtimerange = Ext.getCmp('interannualtimerange').getValues();
    		var timemin = interannualtimerange[0];
    		var timemax = interannualtimerange[1];
    		    		
    		Ext.Ajax.request({
        	    url: 'compute/submitInterannualExperiment.action',
        	    method: 'post',
        	    params: {
        	    	xmin: xmin,
        	    	xmax: xmax,
        	    	ymin: ymin,
        	    	ymax: ymax,
        	    	
        	    	interannualvariable  : variable,
        	    	
        	    	timemin: timemin,
        	    	timemax: timemax
        	    },
        	    success: function(response) {
        	    	controller.rectangles = true;
        	    	controller.getExperiments();
//        	    	alert("success!!!");
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
    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select a bounding box and at least one product from the panels above.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    },
     
    climateAnalysisComputation: function() {
    	var controller = this;
    	
    	if (Ext.getCmp('climateanalysisexppanel').getForm().isValid()) {
        	var txx = false;
        	var tnx = false;
        	var txn = false;
        	var tnn = false;
        	
    		var latrange = Ext.getCmp('climateanalysislatrange').getValue();
        	var lonrange = Ext.getCmp('climateanalysislonrange').getValue();
        	
        	var latindex = latrange.indexOf(':');
        	var ymin = latrange.substring(0, latindex);
        	var ymax = latrange.substring(latindex + 1);
        	
        	var lonindex = lonrange.indexOf(':');
        	var xmin = lonrange.substring(0, lonindex);
        	var xmax = lonrange.substring(lonindex + 1);
    		
        	var climateanalysisvariable = Ext.getCmp('climateanalysisindicator').getChecked();
        	var indicators = [];
        	
            if (climateanalysisvariable.length == 0) {
          	   Ext.MessageBox.show({
                     title: 'Warning',
                     msg: 'Please, select at least one variable.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.WARNING
                 });
             }
             else {
            	 for (c in climateanalysisvariable){
            		 indicators[c] = climateanalysisvariable[c].getName(); 
            		 //alert(indicators[c]);
            		 if (indicators[c] == "txx") {
               			 txx = true;
               		 }
               		 else if (indicators[c] == "tnx") {
               			 tnx = true;
               		 }
               		 else if (indicators[c] == "txn") {
               			 txn = true;
               		 }
               		 else if (indicators[c] == "tnn") {
               			 tnn = true;
               		 }
            	 }
             }
        	
    		var climateanalysistimerange = Ext.getCmp('climateanalysistimerange').getValues();

    		var timemin = climateanalysistimerange[0];
        	var timemax = climateanalysistimerange[1];
    		    		
    		Ext.Ajax.request({
        	    url: 'compute/submitClimateAnalysisExperiment.action',
        	    method: 'post',
        	    params: {
        	    	xmin: xmin,
        	    	xmax: xmax,
        	    	ymin: ymin,
        	    	ymax: ymax,
        	    	
                	txx: txx,
                	tnx: tnx,
                	txn: txn,
                	tnn: tnn,
                	
                	timemin: timemin,
                	timemax: timemax
        	    },
        	    success: function(response) {
        	    	controller.rectangles = true;
        	    	controller.getExperiments();
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
    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select a bounding box and at least one variable from the panels above.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    },
    
    clisebComputation: function() {
    	var controller = this;
    	
    	if (Ext.getCmp('clisebexp').getForm().isValid()) {
    		var latrange = Ext.getCmp('cliseblatrange').getValue();
        	var lonrange = Ext.getCmp('cliseblonrange').getValue();
        	
        	var latindex = latrange.indexOf(':');
        	var ymin = latrange.substring(0, latindex);
        	var ymax = latrange.substring(latindex + 1);
        	
        	var lonindex = lonrange.indexOf(':');
        	var xmin = lonrange.substring(0, lonindex);
        	var xmax = lonrange.substring(lonindex + 1);
    		
        	var clisebvariable1 = Ext.getCmp('clisebvariable1').getChecked();
        	var clisebvariable2 = Ext.getCmp('clisebvariable2').getChecked();
        	
        	var cruvariable = clisebvariable1[0].getSubmitValue();
        	var satvariable = clisebvariable2[0].getSubmitValue();
        	
    		var clisebtimerange = Ext.getCmp('clisebtimerange').getValues();
    		var timemin = clisebtimerange[0];
        	var timemax = clisebtimerange[1];
    		
//    		alert(xmin + ' ' + xmax + ' ' + ymin + ' ' + ymax + ' ' + cruvariable + ' ' + satvariable + ' ' + timemin + ' ' + timemax);
    		    		
    		Ext.Ajax.request({
        	    url: 'compute/submitClimateSebalExperiment.action',
        	    method: 'post',
        	    params: {
        	    	xmin: xmin,
        	    	xmax: xmax,
        	    	ymin: ymin,
        	    	ymax: ymax,
        	    	
        	    	cruvariable: cruvariable,
        	    	satvariable: satvariable,
        	    	
        	    	timemin: timemin,
        	    	timemax: timemax
        	    },
        	    success: function(response) {
        	    	controller.rectangles = true;
        	    	controller.getExperiments();
//        	    	alert('success');
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
    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select a bounding box and two products from the panels above.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    },
    
    relativeheightComputation: function() {
    	var controller = this;
    	var lidartile = Ext.getCmp('lidartiles').getValue();
    	
    	if (Ext.getCmp('relativeheightexppanel').getForm().isValid()) {
        	if (lidartile.length != 0) {    		    		    		
            		Ext.Ajax.request({
                	    url: 'compute/submitRelativeHeightExperiment.action',
                	    method: 'post',
                	    params: {
                	    	tile: lidartile,
                	    },
                	    success: function(response) {
                	    	controller.rectangles = true;
                	    	controller.getExperiments();
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
            	}
            	else {
            		Ext.MessageBox.show({
                        title: 'Warning',
                        msg: 'Please, select one tile.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
            	}
    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select only one tile.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    	

    },
    
    lidarintercomparisonComputation: function() {
    	
    	var controller = this;
    	var counter = 0;
    	var dtm    = false;
    	var dsm    = false;
    	var chm    = false;
    	var rh     = false;
    	var agb    = false;
    	var fc     = false;
    	var aspect = false;
    	var sa     = false;
    	var pd     = false;
    	
    	if (Ext.getCmp('lidarmetricsintercomparisonexppanel').getForm().isValid()) {
        	
    	var vegetationvariables = Ext.getCmp('vegetation').getChecked();
    	var vegetationarray = [];

       	for (c in vegetationvariables){
       		vegetationarray[c] = vegetationvariables[c].getName();
       		counter++;
       		if (vegetationarray[c] == "dsm") {
       			dsm = true;
       		}
       		else if (vegetationarray[c] == "chm") {
       			chm = true;
       		}
       		else if (vegetationarray[c] == "fc") {
       			fc = true;
       		}
       		else if (vegetationarray[c] == "agb") {
       			agb = true;
       		}
       		else if (vegetationarray[c] == "rh") {
       			rh = true;
       		}
    	}
        
    	var terrainvariables = Ext.getCmp('terrain').getChecked();
    	var terrainarray = [];

       	for (c in terrainvariables){
       		terrainarray[c] = terrainvariables[c].getName();
       		counter++;
       		if (terrainarray[c] == "dtm") {
       			dtm = true;
       		}
       		else if (terrainarray[c] == "aspect") {
       			aspect = true;
       		}
       		else if (terrainarray[c] == "sa") {
       			sa = true;
       		}
    	}
        
    	var pointdensity = Ext.getCmp('pointdensity').getChecked();
    	var pointdensityarray = [];

       	for (c in pointdensity){
       		pointdensityarray[c] = pointdensity[c].getName();
       		counter++;
       		if (pointdensityarray[c] == "pd") {
       			pd = true;
       		}
    	}
       	
       	if (counter < 2) {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select two metrics.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    		
    		counter = 0;
       	}
       	else if (counter > 2) {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select only two metrics.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    		
    		counter = 0;
       	}
       	else {
        	var lidartile = Ext.getCmp('tilesintercomparison').getValue();
        	
        	if (lidartile.length != 0) {
        		Ext.Ajax.request({
            	    url: 'compute/submitLidarIntercomparisonExperiment.action',
            	    method: 'post',
            	    params: {
            	    	tile   : lidartile,
            	    	dtm    : dtm,    //true or false
            	    	dsm    : dsm,    //true or false
            	    	chm    : chm,    //true or false
            	    	rh     : rh,     //true or false
            	    	agb    : agb,    //true or false
            	    	fc     : fc,     //true or false
            	    	aspect : aspect, //true or false
            	    	sa     : sa,     //true or false
            	    	pd     : pd      //true or false
            	    },
            	    success: function(response) {
            	    	controller.rectangles = true;
            	    	controller.getExperiments();
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
        	}
        	else {
        		Ext.MessageBox.show({
                    title: 'Warning',
                    msg: 'Please, select one tile.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
        		counter = 0;
        	}
       		

       	   }
    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select only one tile and two metrics.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    },
    
    enmComputation: function() {
    	var controller = this;
    	var dataPointsList = null;
    	
    	if (Ext.getCmp('omexppanel').getForm().isValid()) {
    		
    		var speciesId = Ext.getCmp("species").getValue();
    		
            dataPointsList = Ext.getCmp("datapoints").getValue(true);
        		    		
    		Ext.Ajax.request({
        	    url: 'compute/submitENMExperiment.action',
        	    method: 'post',
        	    params: {
        	    	speciesId: speciesId,
        	    	dataPointsList: dataPointsList
        	    },
        	    success: function(response) {
        	    	controller.getExperiments();
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
    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select a species and at least a data point.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    },
    
    getDetails: function(view, record, item, index, e, eOpts ) {
    	var status = record.get('status');
    	if (status == 'pending' || status == 'running') {
	    	Ext.MessageBox.show({
	            title: 'Warning',
	            msg: 'Please, wait until the computation is completed.',
	            buttons: Ext.MessageBox.OK,
	            icon: Ext.MessageBox.WARNING
	        });
    	}
    	else if (status == 'failed') {
	    	Ext.MessageBox.show({
	            title: 'Warning',
	            msg: 'Experiment failed. No data to show.',
	            buttons: Ext.MessageBox.OK,
	            icon: Ext.MessageBox.WARNING
	        });
    	}
    	else if (status == 'nodata') {
	    	Ext.MessageBox.show({
	            title: 'Warning',
	            msg: 'No data to show.',
	            buttons: Ext.MessageBox.OK,
	            icon: Ext.MessageBox.WARNING
	        });
    	}
    	else {
    		var expid = record.get('idexperiment');
    		var exptype = record.get('experimenttype');
    		Ext.getCmp('viewportcenterafterlogin').setActiveTab(3);
        	var econtroller = OphWebAnalytics.app.getController('ExpDetails.controller.Controller');
        	econtroller.resultManagement(expid, exptype);
    	}
    },
    
    getTilesMarkers: function() {
    	var controller = this;
    	
    	var gMap = controller.getComputeeumap().gmap;
	    
    	//var gMap = this.getChmap().gmap;
	    
	    //controller.deleteAllRectangles();
	    
    	//if (controller.drawingrectangle) 
        	//controller.drawingrectangle.setMap(null);
	    //controller.drawingrectangle = null;
	    
	    //controller.globalactivetab   = 0;
	    //controller.globalchexpactive = 0;
    	
    	controller.deleteAllRectangles();
    	
		if (controller.marker1 != null && controller.marker2 != null && controller.marker3 != null && controller.marker4 != null &&controller.marker5 != null &&controller.marker6 != null && controller.marker7 != null && controller.marker8 != null && controller.marker9 != null) {
    		controller.marker1.setMap(null);
    		controller.marker2.setMap(null);
    		controller.marker3.setMap(null);
    		controller.marker4.setMap(null);
    		controller.marker5.setMap(null);
    		controller.marker6.setMap(null);
    		controller.marker7.setMap(null);
    		controller.marker8.setMap(null);
    		controller.marker9.setMap(null);
		}
    	
    	var latLng1 = {lat: -2.957851, lng: -59.94575941477979};
    	var latLng2 = {lat: -2.9488195, lng: -59.94573559782027};
    	var latLng3 = {lat: -2.939848, lng: -59.94571201012255};
    	var latLng4 = {lat: -2.957875, lng: -59.93677269272312};
    	var latLng5 = {lat: -2.9488435, lng: -59.93674894816752};
    	var latLng6 = {lat: -2.939812, lng: -59.93672527654145};
    	var latLng7 = {lat: -2.957899, lng: -59.92778589767589};
    	var latLng8 = {lat: -2.9488675, lng: -59.92776222552712};
    	var latLng9 = {lat: -2.939836, lng: -59.9277386260855};
    	

    	gMap.setCenter(latLng5);
    	gMap.setZoom(12);

    	controller.marker1 = new google.maps.Marker({
    	  position: latLng1,
    	  id: "marker1",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1720C9672"
    	});

    	controller.marker2 = new google.maps.Marker({
    	  position: latLng2,
    	  id: "marker2",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1720C9673"
    	});

    	controller.marker3 = new google.maps.Marker({
    	  position: latLng3,
    	  id: "marker3",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1720C9674"
    	});

    	controller.marker4 = new google.maps.Marker({
    	  position: latLng4,
    	  id: "marker4",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1730C9672"
    	});

    	controller.marker5 = new google.maps.Marker({
    	  position: latLng5,
    	  id: "marker5",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1730C9673"
    	});

    	controller.marker6 = new google.maps.Marker({
    	  position: latLng6,
    	  id: "marker6",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1730C9674"
    	});

    	controller.marker7 = new google.maps.Marker({
    	  position: latLng7,
    	  id: "marker7",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1740C9672"
    	});

    	controller.marker8 = new google.maps.Marker({
    	  position: latLng8,
    	  id: "marker8",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1740C9673"
    	});

    	controller.marker9 = new google.maps.Marker({
    	  position: latLng9,
    	  id: "marker9",
    	  icon: "images/green.png",
    	  map: gMap,
    	  title: "DUCL1740C9674"
    	});

	      
/*	    Ext.Ajax.request({
	        url: 'compute/getTilesMarkers.action',
	        method: 'post',
	        success: function(response) {
	            var resp = Ext.decode(response.responseText);
	            var store = new Ext.data.Store({
	                fields: ['coordinate', 'filename', 'tipeofdataset', 'xmax', 'xmin', 'ymax', 'ymin'],
	                data : resp
	            });

    	    	store.loadRawData(resp);

	            var bboxnumber = store.getTotalCount();
	            //alert(bboxnumber);
	            
	            for (var i = 0; i < bboxnumber; i++) {
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
	            	
	            	var latmax = store.getAt(i).get('xmax');
	            	var latmin = store.getAt(i).get('xmin');
	            	var lonmax = store.getAt(i).get('ymax');
	            	var lonmin = store.getAt(i).get('ymin');
	                
	                var rectangle = new google.maps.Rectangle({
	                    bounds: new google.maps.LatLngBounds(
	                               new google.maps.LatLng(latmax, lonmin),
	                               new google.maps.LatLng(latmin, lonmax)),
	                    map: gMap
	                });
	                
	                //var idRectangle = store.getAt(i).get('idexperiment');
	                
	               // var color = store.getAt(i).get('color');
	                var rectOptions = {
	                		//id           : idRectangle,
	                        //strokeColor  : color,
	                		strokeColor  : '#' + Math.floor(Math.random()*16777215).toString(16),
	                        strokeOpacity: 0.8,
	                        strokeWeight : 0.5,
	                        //fillColor    : color,
	                        fillColor    : '#' + Math.floor(Math.random()*16777215).toString(16),
	                        fillOpacity  : 0.35,
	                        //zIndex       : controller.globalzIndex++
	                  };
	                
	                rectangle.setOptions(rectOptions);
	                
	                //alert('rettangolo disegnato!');
	                
	                google.maps.event.addListener(rectangle, 'mouseover', function() {
	                	var id = this.get('id');
	                	var rec = chexpgrid.getStore().findExact('idexperiment', id);
	                	chexpgrid.getSelectionModel().select(rec);
	                });
	                //controller.all_chrectangles.push(rectangle);
	                
	                var tempstatus = store.getAt(i).get('chstatus');
    	    		if (tempstatus == 'request' || tempstatus == 'saving') {
    	    			controller.globalchexpactive = 1;
    	    		}
	            }
	        },
	        failure: function() {
	        	Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
	        }
	    });*/
    },
    
    highlightMarker: function() {
    	var controller = this;
    	var lidartile = Ext.getCmp('lidartiles').getValue();
    	if (lidartile.length != 0) {
    		 //var tile = lidartile[0].getSubmitValue();
    		 
    		 if (lidartile == "DUCL1720C9672") {
    			 controller.marker1.setIcon("images/yellow.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1720C9673") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/yellow.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1720C9674") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/yellow.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1730C9672") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/yellow.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1730C9673") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/yellow.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1730C9674") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/yellow.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1740C9672") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/yellow.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1740C9673") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/yellow.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1740C9674") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/yellow.png");
    		 }
    	}
    },
    
    highlightMarkerIntercomp: function() {
    	var controller = this;
    	var lidartile = Ext.getCmp('tilesintercomparison').getValue();
    	if (lidartile.length != 0) {
    		 //var tile = lidartile[0].getSubmitValue();
    		 
    		 if (lidartile == "DUCL1720C9672") {
    			 controller.marker1.setIcon("images/yellow.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1720C9673") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/yellow.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1720C9674") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/yellow.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1730C9672") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/yellow.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1730C9673") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/yellow.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1730C9674") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/yellow.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1740C9672") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/yellow.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1740C9673") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/yellow.png");
    			 controller.marker9.setIcon("images/green.png");
    		 }
    		 else if (lidartile == "DUCL1740C9674") {
    			 controller.marker1.setIcon("images/green.png");
    			 controller.marker2.setIcon("images/green.png");
    			 controller.marker3.setIcon("images/green.png");
    			 controller.marker4.setIcon("images/green.png");
    			 controller.marker5.setIcon("images/green.png");
    			 controller.marker6.setIcon("images/green.png");
    			 controller.marker7.setIcon("images/green.png");
    			 controller.marker8.setIcon("images/green.png");
    			 controller.marker9.setIcon("images/yellow.png");
    		 }
    	}
    }
});
