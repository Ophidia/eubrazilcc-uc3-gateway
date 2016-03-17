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

Ext.define('Interactive.controller.Controller', {
    extend: 'Ext.app.Controller',
	
    views: ['InteractiveTabPanel',
            'InteractiveForm', 'BrazilMapPanel',
            'ChartResult', 'InteractiveStatsGrid'],
    
    refs: [{ref:'interactiveeumap', selector:'interactiveeumap'},
           {ref:'interactiveform',  selector:'interactiveform'},
           {ref:'statsgrid',        selector:'statsgrid'}],
           
    all_markers: [],
    drawingmarker: null,
    infowindow : null,
    loading    : false,
           
    init: function() {
    	this.control('interactiveeumap', {
    		mapready: this.setMap
		});
    	this.control('#intresultstabpanel', {
    		tabchange: this.manageMarkers
		});
    },
    
    createView: function(view) {
    	var controller = this;
    	return controller.getView(view).create();
    },
    
    createViews: function() {
    	var controller = this;
    	// west
		var intform = controller.getView('InteractiveForm').create('');
		Ext.getCmp('interactivetab').add(intform);
		// center
		var bmappanel = controller.getView('BrazilMapPanel').create();
		Ext.getCmp('intmappanel').add(bmappanel);
    },
    
    setMap: function() {
    	var controller = this;
	    var gMap = this.getInteractiveeumap().gmap;
	    
	    Ext.getCmp('intresultstabpanel').setLoading('Select a dataset from the Interactive Analysis panel to see statistics.');
	    gMap.setMapTypeId('roadmap');
	    
	    google.maps.event.addListener(gMap, 'click', controller.clickonmap);
    },
    
    manageMarkers: function(tabPanel, newCard, oldCard, eOpts) {
    	var controller = this;
    	var idmarker = newCard.id;
    	for (c in controller.all_markers) {
    		if (controller.all_markers[c].id == idmarker) {
    			var gMap = controller.getInteractiveeumap().gmap;
    			var latitude = controller.all_markers[c].getPosition().lat();
    		    var longitude = controller.all_markers[c].getPosition().lng();
    			if (controller.infowindow) controller.infowindow.close();
  	       		controller.infowindow = new google.maps.InfoWindow({content: '<div id="content"><p><b>Latitude:</b> ' + latitude + '<br><b>Longitude:</b> ' + longitude + '</p></div>'});
  	       		controller.infowindow.open(gMap, controller.all_markers[c]);
    		}
    	}
    },
    
	clickonmap: function(e) {

		var controller = OphWebAnalytics.app.getController('Interactive.controller.Controller');
		
		Ext.getCmp('intresultstabpanel').setLoading(false);
		
		var gMap = controller.getInteractiveeumap().gmap;
		if (!controller.loading) {
 		   var latlon = e.latLng;
     	   
            var cfilters = Ext.getCmp('intclimatefilter').getChecked();
            var c2filters = Ext.getCmp('intclimate2filter').getChecked();
            //var sfilters = Ext.getCmp('intsatellitefilter').getChecked();
            
            if (cfilters.length == 0 && /*sfilters.length == 0 &&*/ c2filters.length == 0) {
         	   Ext.MessageBox.show({
                    title: 'Warning',
                    msg: 'Please, select one variable from the Interactive Analysis panel.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
         	   var coordinates = latlon + '';
         	   
         	   var first     = coordinates.indexOf('(');
         	   var medium    = coordinates.indexOf(',');
         	   var last      = coordinates.indexOf(')');
         	   var latitude  = coordinates.substring(first + 1, medium);
         	   var longitude = coordinates.substring(medium + 1, last);
         	   
         	   var variable = '';
         	   var typeofvariable = '';
         	   if (cfilters.length != 0) {
         		   variable = cfilters[0].getSubmitValue();
         		   typeofvariable = 'climate';
         	   }
         	   else if (c2filters.length != 0) {
        		   variable = c2filters[0].getSubmitValue();
        		   typeofvariable = 'climate';
        	   }
         	   /*else if (sfilters.length != 0) {
         		   variable = sfilters[0].getSubmitValue();
         		   typeofvariable = 'satellite';
         	   }*/
         	   
     		   var temparray = variable.split(' ');
     		   var indicator = temparray[0];
     		   var source = temparray[1];
     		   var detail = temparray[2];
     		   var numofsamples = temparray[3];
     		   
     		   var id = indicator + '_' + source  + '_' + detail + '_' + latlon;
         	   var marker = new google.maps.Marker({
         		    position : latlon,
         		    id       : id,
         		    animation: google.maps.Animation.DROP
         	   });
         	   google.maps.event.addListener(marker, "click", function() {
         	       Ext.getCmp('intresultstabpanel').setActiveTab(marker.id);
         	   });

         	   marker.setMap(gMap);
         	   controller.all_markers.push(marker);
     		   
     		   var store = Ext.create('Interactive.store.InteractiveIndicatorStore');
 		       var chartresult = controller.getView('ChartResult').create({
 		    	   store: store
 		       });
 		       var gridstore = Ext.create('Interactive.store.InteractiveStatsStore');
 		       var statsgrid = controller.getView('InteractiveStatsGrid').create({
 		    	   store: gridstore,
 		    	   flex: 1
 		       });
 		       var panel = Ext.create('Ext.panel.Panel', {
 		    	   closable: true,
 		    	   border  : false,
 		    	   id      : id,
 		    	   layout  : {
 		    		   type: 'hbox',
 		    		   align: 'stretch'
 		    	   },
 		    	   title   : indicator + ' ' + source  + ' ' + detail,
 		    	   listeners: {
 		    	        'close': function(tabPanel) {
 		    	        	var idmarker = tabPanel.id;
 		    	        	for (c in controller.all_markers) {
 		    	        		if (controller.all_markers[c].id == idmarker) {
 		    	        			controller.all_markers[c].setMap(null);
 		    	        			controller.all_markers.splice(c, 1);
 		    	        		}
 		    	        	}
 		    	        	if (Ext.getCmp('intresultstabpanel').items.length == 1)
 		    	        		Ext.getCmp('intresultstabpanel').setLoading('Select a dataset from the Interactive Analysis panel to see statistics.');
 		    	        }
 		    	   },
 		    	   items: [{
 		    		   xtype: 'panel',
 		    		   layout: 'fit',
 		    		   border: false,
 		    		   flex: 3,
 		    		   bodyPadding: '10 20 0 0',
 		    		   items: [chartresult]
 		    	   }, statsgrid]
 		       });
 		       Ext.getCmp('intresultstabpanel').add(panel);
               Ext.getCmp('intresultstabpanel').setActiveTab(panel);
               controller.loading = true;
               panel.setLoading(true);
     		   Ext.Ajax.request({
     			   url: 'interactive/exploreNC.action',
     			   method: 'post',
 	   			   params: {
 	   				   indicator     : indicator,
 	   				   source        : source,
 	   				   detail        : detail,
 	   				   numofsamples  : numofsamples,
 	   				   latitude      : latitude,
 	   				   longitude     : longitude,
 	   				   typeofvariable: typeofvariable
 	   			   },
 	   			   success: function(response) {
 	   			       var resp = Ext.decode(response.responseText);
 	   		  	       store.loadRawData(resp.timeseries);
 	   		  	       gridstore.loadRawData(resp.statistics);
 	   		  	       controller.loading = false;
 	   		  	       panel.setLoading(false);
 	   			   },
 	   			   failure: function() {
 	   				   Ext.MessageBox.show({
 	   					   title: 'Error',
		                   msg: 'Network failure.',
		                   buttons: Ext.MessageBox.OK,
		                   icon: Ext.MessageBox.ERROR
 	   				   });
 	   				   controller.loading = false;
// 	   				   panel.setLoading(false);
 	   				   Ext.getCmp('intresultstabpanel').remove(panel);
 	   				   var idmarker = id;
	    	           for (c in controller.all_markers) {
	    	        	   if (controller.all_markers[c].id == idmarker) {
	    	        		   controller.all_markers[c].setMap(null);
	    	        		   controller.all_markers.splice(c, 1);
	    	        	   }
	    	           }
	    	           if (Ext.getCmp('intresultstabpanel').items.length == 0)
	    	        	   Ext.getCmp('intresultstabpanel').setLoading('Select a dataset from the Interactive Analysis panel to see statistics.');
 	   			   }
     		   });
             }
 	   }
	}
});
