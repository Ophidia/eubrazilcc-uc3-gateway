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

Ext.define('OphWebAnalytics.controller.FrameworkController', {
    extend: 'Ext.app.Controller',
   
    init: function() {
    	this.control({
    		'viewport': {
    			afterrender: this.startGadgets
    		}                                
    	});
    	this.control('#logout', {
			click: this.logout
		});
    },
    
    startGadgets: function() {
    	var controller = this;
    	
    	Ext.Ajax.request({
    		url   : 'compute/GetUserType.action',
    		method:'post',
    		params: {

    		},
		    success: function(response) {
    	    	var resp = Ext.decode(response.responseText);
    	    	var type = resp.type;
    	    	
    	    	var hometab        = controller.getController('Home.controller.Controller').createView('HomeTabPanel');
    	    	var doctab         = controller.getController('Home.controller.Controller').createView('DocTabPanel');
    	    	var interactivetab = controller.getController('Interactive.controller.Controller').createView('InteractiveTabPanel');
    	    	var computetab     = controller.getController('Compute.controller.Controller').createView('ComputeTabPanel');
    	    	var chtab          = controller.getController('ClearingHouse.controller.Controller').createView('ClearingHouseTabPanel');
    	    	var exptab         = controller.getController('ExpDetails.controller.Controller').createView('ExpDetailsTabPanel');
    	    	
    	    	controller.getController('Interactive.controller.Controller').createViews();
    	    	controller.getController('Compute.controller.Controller').createViews();
    	    	controller.getController('ClearingHouse.controller.Controller').createViews();   
    	    	
    	    	Ext.getCmp('viewportcenterafterlogin').add(hometab);
    	    	Ext.getCmp('viewportcenterafterlogin').add(interactivetab);
    	    	Ext.getCmp('viewportcenterafterlogin').add(computetab);
    	    	Ext.getCmp('viewportcenterafterlogin').add(exptab);
    	    	Ext.getCmp('viewportcenterafterlogin').add(chtab);
    	    	Ext.getCmp('viewportcenterafterlogin').add(doctab);
    	    	
    	    	if (type == "admin") {
    	    		
    	        	var admintab = controller.getController('Admin.controller.Controller').createView('AdminTabPanel'); 
        	    	Ext.getCmp('viewportcenterafterlogin').add(admintab);
    	    		
    	    	}
    	    	
    	    	Ext.getCmp('viewportcenterafterlogin').setActiveTab(0); 	

		    },
		    failure: function(response) {

		    }
    	});
    		
    	Ext.getCmp('viewportcenterafterlogin').setActiveTab(0);
    },
    
    logout: function() {
    	Ext.Ajax.request({
    	    url: 'authentication/Logout.action',
    	    method: 'post',
    	    success: function(response) {
    	    	window.location = 'Home.action';
    	    },
    	    failure: function(response) {
    	    	window.location = 'Welcome.action';
    	    }
    	});
    }
    
});
