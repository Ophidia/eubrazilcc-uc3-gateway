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

Ext.define('Admin.controller.Controller', {
    extend: 'Ext.app.Controller',
	
    views: ['AdminTabPanel', 'Monitoringstackedchart', 'Monitoringpiechart', 'ExperimentByType', 'ExperimentStats',
            'UserGrid', 'ExperimentByTypePie', 'ExperimentStatsPie'],
    
    globalactivetab: 0,
    admintask: null,
    
    refs: [{ref:'piechart',     selector:'piechart'},
           {ref:'stackedchart', selector:'stackedchart'},
           {ref:'exptype',      selector:'exptype'},
           {ref:'expstats',     selector:'expstats'},
           {ref:'usergrid',     selector:'usergrid'},
           {ref:'expbytypepie', selector:'expbytypepie'},
           {ref:'expstatspie',  selector:'expstatspie'}],
           
    init: function() {
    	this.control('#resourcemngt', {
    		activate: this.monitoringManagement
		});
/*    	this.control('#admintab', {
    		activate: this.refreshBottomCharts
		});*/
    	this.control('#usermngt', {
    		activate: this.userManagement
		});
    	this.control('#admintab', {
    		deactivate: this.stopThredd
		});
    	this.control('#admintab', {
    		activate: this.startThredd
		});
    	this.control('#usersrefresh', {
    		click: this.refreshUsers
		});
    	this.control('#expbytyperefresh', {
    		click: this.refreshExpbytype
		});
    	this.control('#expbytypepierefresh', {
    		click: this.refreshExpbytypepie
		});
    	this.control('#expstatisticsrefresh', {
    		click: this.refreshExpstatistics
		});
    	this.control('#expstatisticspierefresh', {
    		click: this.refreshExpstatisticspie
		});
    },
    
    createView: function(view) {
    	var controller = this;
    	return controller.getView(view).create();
    	controller.createViews();
    },
    
/*    refreshBottomCharts: function() {
    	if (Ext.getCmp("experimentbytype") && Ext.getCmp("experimentbytypepie") && Ext.getCmp("expstatistics") && Ext.getCmp("experimentbytypepie")) {
    		alert("existing");
    	}
    },*/
    
    stopThredd: function() {
    	var controller = this;
    	Ext.TaskManager.stop(controller.admintask);
    },
    
    startThredd: function() {
    	var controller = this;
    	if (controller.admintask) {
    		if (controller.globalactivetab == 0) {
            	Ext.TaskManager.start(controller.admintask);   
    		}
    	}
    },
    
    monitoringManagement: function() {
    	var controller = this;	
    	controller.globalactivetab = 0;   
    	
    	Ext.getCmp("historychart").removeAll();
    	Ext.getCmp("currentchart").removeAll();
    	Ext.getCmp("experimentbytype").removeAll();
    	Ext.getCmp("experimentbytypepie").removeAll();
    	Ext.getCmp("expstatistics").removeAll();
    	Ext.getCmp("experimentbytypepie").removeAll();
    	
    	var monitoringstacked = controller.getView('Monitoringstackedchart').create();
		var monitoringpie     = controller.getView('Monitoringpiechart').create();
    	var expbytype         = controller.getView('ExperimentByType').create();
		var expstats          = controller.getView('ExperimentStats').create();
		var expbytypepie      = controller.getView('ExperimentByTypePie').create();
		var expstatspie       = controller.getView('ExperimentStatsPie').create();
			
		Ext.getCmp('historychart').add(monitoringstacked);
		Ext.getCmp('currentchart').add(monitoringpie);	
		Ext.getCmp('experimentbytype').add(expbytype);
		Ext.getCmp('expstatistics').add(expstats);	
		Ext.getCmp('experimentbytypepie').add(expbytypepie);	
		Ext.getCmp('expstatisticspie').add(expstatspie);	
				
		controller.admintask = {
			run: function() {
				if (controller.globalactivetab == 0) {
			    	controller.getPiechart().getStore().load();
			    	controller.getStackedchart().getStore().load();
				}
			},
			interval: 3000
	    };	    
		Ext.TaskManager.start(controller.admintask);	
		
    	controller.getExptype().getStore().load();
    	controller.getExpstats().getStore().load();
    	controller.getExpbytypepie().getStore().load();
    	controller.getExpstatspie().getStore().load();
    },
    
    userManagement: function() {
    	var controller = this;
    	controller.globalactivetab = 1;
    	Ext.TaskManager.stop(controller.admintask);
    	
    	Ext.getCmp('usermngt').removeAll();
    	
    	var usergrid = controller.getView('UserGrid').create();
		Ext.getCmp('usermngt').add(usergrid);	
		
    	controller.getUsergrid().getStore().load();
    },
    
    refreshExpbytype: function() {
    	var controller = this;
    	controller.getExptype().getStore().load();
    },
    
    refreshExpbytypepie: function() {
    	var controller = this;
    	controller.getExpbytypepie().getStore().load();    	
    },
    
    refreshExpstatistics: function() {
    	var controller = this;
    	controller.getExpstats().getStore().load();
    },
    
    refreshExpstatisticspie: function() {
    	var controller = this;
    	controller.getExpstatspie().getStore().load();
    	controller.getExpstats().getStore().load();
    	controller.getExpbytypepie().getStore().load(); 
    	controller.getExptype().getStore().load();
    },
    
    refreshUsers: function() {
    	var controller = this;
    	controller.getUsergrid().getStore().load();
    },
    
    enableDisableUser: function(iduser, status) {
    	var controller = this;
    	if (status == 0) {
        	Ext.MessageBox.confirm('Enable', 'Are you sure you want to enable?', function(btn){
     		   if(btn === 'yes'){
     		    	Ext.Ajax.request({
     		    	    url: 'admin/enableDisableUser.action',
     		    	    method: 'post',
     		    	    params: {
     		    	    	userid: iduser,
     		    	    	status: status
     		    	    },
     		    	    success: function(response) {
     		    	    	controller.getUsergrid().getStore().load();
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
     		   else {

     		   }   
        	});
    	}
    	else if (status == 1) {
        	Ext.MessageBox.confirm('Disable', 'Are you sure you want to disable?', function(btn){
     		   if(btn === 'yes'){
     		    	Ext.Ajax.request({
     		    	    url: 'admin/enableDisableUser.action',
     		    	    method: 'post',
     		    	    params: {
     		    	    	userid: iduser,
     		    	    	status: status
     		    	    },
     		    	    success: function(response) {
     		    	    	controller.getUsergrid().getStore().load();
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
     		   else {

     		   }
        	});
    	} 	
    }
});
