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

Ext.define('OphWebAnalytics.controller.LoginController', {
    extend: 'Ext.app.Controller',
   
    views: ['LoginTabPanel', 'DocTabPanel'],
    
	refs:[{ref:'login',    selector:'login'},
	      {ref:'register', selector:'register'}],

    init: function() {
    	this.control({'viewport': {
    		afterrender: this.createViews
    	} });
    	this.control('#loginsubmit', {
			click: this.login
		});
    	this.control('#registersubmit', {
			click: this.register
		});
    },
    
    createViews: function() {
    	var controller = this;
    	
    	var logintab = controller.getView('LoginTabPanel').create();
    	Ext.getCmp('viewportcenter').add(logintab);
    	var doctab = controller.getView('DocTabPanel').create();
    	Ext.getCmp('viewportcenter').add(doctab);
    	Ext.getCmp('viewportcenter').setActiveTab(0);
    },
    
    login: function() {
    	var controller = this;
    	Ext.getCmp('logintb').hide();
    	
    	if (controller.getLogin().getForm().isValid()) {
    		var email = Ext.getCmp('emailfield').getValue();
        	var password = Ext.getCmp('pwdfield').getValue();
        	Ext.Ajax.request({
        		url   : 'authentication/Login.action',
        		method:'post',
        		params: {
        			email   : email,
        			password: password
        		},
    		    success: function(response) {
	    	    	var resp = Ext.decode(response.responseText);
    		    	window.location = 'Welcome.action';
    		    },
    		    failure: function(response) {
    		    	Ext.getCmp('logintb').show();
    		    	controller.getLogin().getForm().reset();
    		    }
        	});
    	}
    },
    
    getUserType: function() {
    	var controller = this;
    	alert(controller.userType);
    	return
    		controller.userType;
    },
    
    register: function() {
    	var controller = this;
    	
    	Ext.getCmp('fregister').hide();
    	Ext.getCmp('sregister').hide();
    	Ext.getCmp('registertb').hide();
    	
    	if (controller.getRegister().getForm().isValid()) {
    		var fname    = Ext.getCmp('regfname').getValue();
    		var lname    = Ext.getCmp('reglname').getValue();
    		var email    = Ext.getCmp('regemail').getValue();
        	var password = Ext.getCmp('regpwd').getValue();
        	var orgname  = Ext.getCmp('regorgname').getValue();
        	var orgtype  = Ext.getCmp('regorgtype').getValue();
        	Ext.Ajax.request({
        		url   : 'authentication/Register.action',
        		method:'post',
        		params: {
        			fname   : fname,
        			lname   : lname,
        			email   : email,
        			password: password,
        			orgname : orgname,
        			orgtype : orgtype
        		},
    		    success: function(response) {
    		    	Ext.getCmp('sregister').show();
    		    	Ext.getCmp('registertb').show();
    		    	controller.getRegister().getForm().reset();
    		    },
    		    failure: function(response) {
    		    	Ext.getCmp('fregister').show();
    		    	Ext.getCmp('registertb').show();
    		    	controller.getRegister().getForm().reset();
    		    }
        	});
    	}
    }
    
});
