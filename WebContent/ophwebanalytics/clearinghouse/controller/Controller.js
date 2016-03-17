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

Ext.define('ClearingHouse.controller.Controller', {
    extend: 'Ext.app.Controller',
	
    views: ['ClearingHouseTabPanel',
            'SearchPanel',
            'BrazilMapPanel', 'CHExperimentGrid', 'CHExperimentInfo', 'CHExperimentJobs'],
            
    refs: [{ref:'chtab',     selector:'chtab'},
           {ref:'chmap',     selector:'chmap'},
           {ref:'chexpgrid', selector:'chexpgrid'},
           {ref:'chexpinfo', selector:'chexpinfo'},
           {ref:'chjobs',    selector:'chjobs'}],
           
    globalzIndex  : 1,
    all_chrectangles: [],
           
    init: function() {
    	this.control('chmap', {
    		mapready: this.drawRectangle
		});
/*    	this.control('#chexperimentsrefresh', {
			click: this.getExperiments
		});
    	this.control('chexpgrid', {
    		selectionchange: this.getExperimentInfo,
    		itemdblclick   : this.getDetails
		});*/
    	this.control('chjobs', {
    		itemdblclick: this.getDetails,
    		selectionchange: this.getExperimentInfo
		});
    	this.control('chtab', {
    		activate: this.getExperiments
		});
    	this.control('#chjobsrefresh', {
			click: this.getExperiments
		});
    	this.control('#chsearchbt', {
    		click: this.searchFunction
    	});
    	this.control('#chresetbt', {
    		click: this.resetForm
    	});
    	this.control('#chshowall', {
    		click: this.getExperiments
    	});
    },
    
    searchFunction: function() {
    	
    	var controller = this;
    	
    	var chexptype = Ext.getCmp('chexptype').getChecked();
    	
    	if (Ext.getCmp('searchpanel').getForm().isValid()) {
    		  		
	    if (chexptype.length == 0) {
	   	   Ext.MessageBox.show({
	              title: 'Warning',
	              msg: 'Please, select an experiment type.',
	              buttons: Ext.MessageBox.OK,
	              icon: Ext.MessageBox.WARNING
	          });
	    }	    
	    else {
    		var latrange = Ext.getCmp('chlatrange').getValue();
        	var lonrange = Ext.getCmp('chlonrange').getValue();
        	
        	var latindex = latrange.indexOf(':');
        	var ymin = latrange.substring(0, latindex);
        	var ymax = latrange.substring(latindex + 1);
        	
        	var lonindex = lonrange.indexOf(':');
        	var xmin = lonrange.substring(0, lonindex);
        	var xmax = lonrange.substring(lonindex + 1);
        	
        	var searchvariable = Ext.getCmp('chexptype').getChecked();
        	var variable = searchvariable[0].getSubmitValue();
        	
        	var timemin_temp = Ext.getCmp('chstartdate').getValue().toString();
        	
            var start_month_temp = timemin_temp.substring(4, 7);
            var start_month = null;
            
            if (start_month_temp == 'Jan') {
            	start_month = '01';
            }
            else if (start_month_temp == 'Feb') {
            	start_month = '02';
            }
            else if (start_month_temp == 'Mar') {
            	start_month = '03';
            }
            else if (start_month_temp == 'Apr') {
            	start_month = '04';
            }
            else if (start_month_temp == 'May') {
            	start_month = '05';
            }
            else if (start_month_temp == 'Jun') {
            	start_month = '06';
            }
            else if (start_month_temp == 'Jul') {
            	start_month = '07';
            }
            else if (start_month_temp == 'Aug') {
            	start_month = '08';
            }
            else if (start_month_temp == 'Sep') {
            	start_month = '09';
            }
            else if (start_month_temp == 'Oct') {
            	start_month = '10';
            }
            else if (start_month_temp == 'Nov') {
            	start_month = '11';
            }
            else if (start_month_temp == 'Dec') {
            	start_month = '12';
            }
            
            var start_day = timemin_temp.substring(8, 10);
            var start_year = timemin_temp.substring(11, 15);

            var timemin = start_year + "-" + start_month + "-" + start_day + ' 00:00:00';
        	
            var timemax_temp = Ext.getCmp('chenddate').getValue().toString();
        	
            var end_month_temp = timemax_temp.substring(4, 7);
            
            if (end_month_temp == 'Jan') {
            	end_month = '01';
            }
            else if (end_month_temp == 'Feb') {
            	end_month = '02';
            }
            else if (end_month_temp == 'Mar') {
            	end_month = '03';
            }
            else if (end_month_temp == 'Apr') {
            	end_month = '04';
            }
            else if (end_month_temp == 'May') {
            	end_month = '05';
            }
            else if (end_month_temp == 'Jun') {
            	end_month = '06';
            }
            else if (end_month_temp == 'Jul') {
            	end_month = '07';
            }
            else if (end_month_temp == 'Aug') {
            	end_month = '08';
            }
            else if (end_month_temp == 'Sep') {
            	end_month = '09';
            }
            else if (end_month_temp == 'Oct') {
            	end_month = '10';
            }
            else if (end_month_temp == 'Nov') {
            	end_month = '11';
            }
            else if (end_month_temp == 'Dec') {
            	end_month = '12';
            }
            var start_day = timemax_temp.substring(8, 10);
            var start_year = timemax_temp.substring(11, 15);
            
            var timemax = start_year + "-" + end_month + "-" + start_day + ' 23:59:59';
    		    		
    		Ext.Ajax.request({
        	    url: 'clearinghouse/searchCH.action',
        	    method: 'post',
        	    params: {
        	    	xmin: xmin,
        	    	xmax: xmax,
        	    	ymin: ymin,
        	    	ymax: ymax,
        	    	
        	    	variable: variable,
                	
                	timemin: timemin,
                	timemax: timemax
        	    },
        	    success: function(response) {
        	    	var resp = Ext.decode(response.responseText);
        	    	
        	    	var experimentsgrid = controller.getChjobs();
        	    	var store = experimentsgrid.getStore();
        	    	store.loadRawData(resp);
        	    	
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

    	}
    	else {
    		Ext.MessageBox.show({
                title: 'Warning',
                msg: 'Please, select a bounding box, an experiment type, a start date and an end date.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
    	}
    	
    },
    
    resetForm: function() {
    	
    	var controller  = this;

  		Ext.getCmp('chexptype').reset();
  		Ext.getCmp('chlatrange').reset();
  		Ext.getCmp('chlonrange').reset();
  		Ext.getCmp('chstartdate').reset();
  		Ext.getCmp('chenddate').reset();
        if (controller.drawingrectangle) 
        	controller.drawingrectangle.setMap(null);
    },
    
    createView: function(view) {
    	var controller = this;
    	return controller.getView(view).create();
    },
    
    createViews: function() {
    	var controller = this;
    	
    	// west
    	var searchpanel = controller.getView('SearchPanel').create();
    	//var submitpanel = controller.getView('SubmitPanel').create();
    	Ext.getCmp('CHpanel').add(searchpanel);
		//Ext.getCmp('CHpanel').add(submitpanel);
		
		// center
		var bmappanel = controller.getView('BrazilMapPanel').create();
		//var chexpgrid = controller.getView('CHExperimentGrid').create();
		Ext.getCmp('chmappanel').add(bmappanel);
		//Ext.getCmp('chexperiment').add(chexpgrid);
		
		// south
		var chexpjobs = controller.getView('CHExperimentJobs').create();
		Ext.getCmp('chresults').add(chexpjobs);
    },
    
    deleteExperiment: function(idexperiment) {
    	
    	var controller = this;
    	Ext.MessageBox.confirm('Delete', 'Are you sure?', function(btn){
    		   if(btn === 'yes'){
    		    	Ext.Ajax.request({
    		    	    url: 'clearinghouse/deleteExperiment.action',
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
    	
    },    
    
    drawRectangle: function() {
    	var controller = this;
    	var gMap = this.getChmap().gmap;
        gMap.setMapTypeId('roadmap');
        
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
	        
	        //controller.deleteAllRectangles();
	        controller.rectangles = false;
	        
	        controller.drawingrectangle = newRect;
	        var rectangleBounds = controller.drawingrectangle.getBounds();
	        
	        var northEast = rectangleBounds.getNorthEast();
	        var southWest = rectangleBounds.getSouthWest();
	        var latrange = southWest.lat() + ':' + northEast.lat();
	        var lonrange = southWest.lng() + ':' + northEast.lng();

        	Ext.getCmp('chlatrange').setValue(latrange);
	        Ext.getCmp('chlonrange').setValue(lonrange);

	   });
    },
    
    getExperiments: function() {
    	var controller = this;
    	controller.activeexps = 0;
    	Ext.Ajax.request({
    	    url: 'clearinghouse/getCHExperiments.action',
    	    method: 'post',
    	    success: function(response) {
    	    	
    	    	var resp = Ext.decode(response.responseText);
    	    	
    	    	var experimentsgrid = controller.getChjobs();
    	    	var store = experimentsgrid.getStore();
    	    	store.loadRawData(resp);
    	    	
    	    	//controller.deleteAllRectangles();
    	    	//controller.drawAllRectangles(store);

    	    	var gMap = controller.getChmap().gmap;
    	    	controller.deleteAllRectangles();
    	    	
    	    	//controller.getChjobs().getStore().loadData([], false);
    	    	
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
	                
	                //var color = record.get('fillColor');
	                //alert(color); 
    	    		var color = '#2E64FE';
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
	                	var rec = store.findExact('idexperiment', id);
	                	controller.getChjobs().getSelectionModel().select(rec);
	                });
	                controller.all_chrectangles.push(rectangle);
    	    	});
    	    	experimentsgrid.getSelectionModel().select(0);
    	    },
    	    failure: function(response) {
/*    	    	alert("error!");
    	    	window.location = 'Home.action';*/
    	    	Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Network failure.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
    	    }
    	});
/*    	var controller = this;
    	if (controller.getChmap().gmap)
	    	Ext.Ajax.request({
	    	    url: 'clearinghouse/getCHExperiments.action',
	    	    method: 'post',
	    	    success: function(response) {
	    	    	var resp = Ext.decode(response.responseText);
	    	    	var experimentsgrid = controller.getChexpgrid();
	    	    	var store = experimentsgrid.getStore();
	    	    	store.loadRawData(resp);
	    	    	
	    	    	var gMap = controller.getChmap().gmap;
	    	    	controller.deleteAllRectangles();
	    	    	
	    	    	controller.getChjobs().getStore().loadData([], false);
	    	    	
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
		                
		                var color = record.get('fillColor');
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
		                	var rec = store.findExact('idexperiment', id);
		                	controller.getChexpgrid().getSelectionModel().select(rec);
		                });
		                controller.all_chrectangles.push(rectangle);
	    	    	});
	    	    	experimentsgrid.getSelectionModel().select(0);
	    	    },
	    	    failure: function(response) {
	    	    	Ext.MessageBox.show({
	                    title: 'Error',
	                    msg: 'Network failure.',
	                    buttons: Ext.MessageBox.OK,
	                    icon: Ext.MessageBox.ERROR
	                });
	    	    }
	    	});*/
    },
    
    getExperimentInfo: function(grid, selected, eOpts) {
    	var controller = this;
    	
  		if (selected.length > 0) {
  			var sel = selected[0].data;
  			/*this.getChexpinfo().setTitle(sel.name + ' summary');
  			var html = '<br><b>Indicators: </b>TXn_ANN, TNx_ANN, SAT_MAP, SAT_TIME, DTM<br><br>';
  			html += '<b>Bounding box [lat|lon]: </b>-13.0:-1.0|-62.0:-34.0<br><br>';
  			html += '<b>Time range: </b>2015:2050|1988|1988:2001<br><br>';
  			html += '<b>Date: </b>';
  			html += sel.submissiondate + '<br>';
  			this.getChexpinfo().update(html);*/
  			
  			var position = grid.store.indexOf(selected[0]);
  			for (c in controller.all_chrectangles) {
  				controller.all_chrectangles[c].setOptions({strokeWeight:0.5});
  				controller.all_chrectangles[c].setOptions({fillOpacity:0.35});
  			}
	  		controller.all_chrectangles[position].setOptions({fillOpacity:0.60});
	  		controller.all_chrectangles[position].setOptions({strokeWeight:2.5});
	  		controller.all_chrectangles[position].setOptions({zIndex:controller.globalzIndex++});
	  		
	  		//var experimentname = sel.name;
  	  		//var experimentid   = sel.idexperiment;
  	  		
/*	  	  	Ext.Ajax.request({
	    	    url: 'clearinghouse/getJobs.action',
	    	    method: 'post',
	    	    params: {
	    	    	experimentid : experimentid
	    	    },
	    	    success: function(response) {
	    	    	var resp = Ext.decode(response.responseText);
	    	    	
	    	    	Ext.getCmp('chresults').removeAll();
	    	    	var chexpjobs = controller.getView('CHExperimentJobs').create({
	    	    		title: experimentname + ' jobs'
	    	    	});
	    			Ext.getCmp('chresults').add(chexpjobs);
	    	    	var store = chexpjobs.getStore();
	    	    	store.loadRawData(resp);
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
  		}
//  		else {
//  			this.getChexpinfo().update();
//  		}
  	},
    
    getJobs: function(grid, record, index) {
    	var controller     = this;
  		var experimentname = record.get('name');
  		var experimentid   = record.get('idexperiment');
  		
  		Ext.Ajax.request({
    	    url: 'clearinghouse/getJobs.action',
    	    method: 'post',
    	    params: {
    	    	experimentid : experimentid
    	    },
    	    success: function(response) {
    	    	var resp      = Ext.decode(response.responseText);
    	    	
    	    	Ext.getCmp('chresults').removeAll();
    	    	var chexpjobs = controller.getView('CHExperimentJobs').create({
    	    		title: experimentname + ' jobs'
    	    	});
    			Ext.getCmp('chresults').add(chexpjobs);
    	    	var store = chexpjobs.getStore();
    	    	store.loadRawData(resp);
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
    
    drawAllRectangles: function() {
    	var controller = this;
	    
    	var gMap = this.getChmap().gmap;
	    
	    controller.deleteAllRectangles();
	    if (controller.drawingrectangle) 
        	controller.drawingrectangle.setMap(null);
	    controller.drawingrectangle = null;
	    
	    controller.globalactivetab   = 0;
	    controller.globalchexpactive = 0;
	      
	    Ext.Ajax.request({
	        url: 'actions/getCHExperimentsList.action',
	        method: 'post',
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
	                controller.all_chrectangles.push(rectangle);
	                
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
	    });
    },
    
    deleteAllRectangles: function() {
    	var controller = this;
    	
    	for (var i = 0; i < controller.all_chrectangles.length; i++) {
    		controller.all_chrectangles[i].setMap(null);
    	}
    	controller.all_chrectangles = [];
    },
    
    getDetails: function(view, record, item, index, e, eOpts ) {
		var expid = record.get('idexperiment');
		var exptype = record.get('experimenttype');
		Ext.getCmp('viewportcenterafterlogin').setActiveTab(3);
    	var econtroller = OphWebAnalytics.app.getController('ExpDetails.controller.Controller');
    	econtroller.resultManagement(expid, exptype);
    },
    
    
});
