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

Ext.define('Libraries.Core', {
	
    statics: {
    	getController: function(controllerPath) {
    		try {
    			var controller = OphWebAnalytics.app.getController(controllerPath);
    			if (controller)
    				return controller;
    		}
    		catch (e) {
        	    console.error('error on controller dyn-load => ' + e);
        	}
    	},
    	actionInvocation:function(configs){
    		Ext.Ajax.request({
        	    url: configs.actionurl,
        	    params: configs.actionparams,
        	    success: configs.resultsuccessHandler
        	});
    	},
    	
    	initGadget:function(controllerPath){
			return this.getController(controllerPath);
    	},
    	
    	addViewToViewport: function(view, position, index) {
    		var targetpanel = this.getViewportPanel(position);
    		if (targetpanel) {
    			if (index != null) {
    				targetpanel.add(index, view);
    			}
    			else targetpanel.add(view);
    		}
    	},
    	
    	getViewportPanel:function(position){
    		var fc=this.getController('FrameworkController');
    		var targetpanel = null;
    		
    		if(position=='center') targetpanel=fc.getCenter();
    		else if(position=='east') targetpanel=fc.getEast();
    		else if(position=='south') targetpanel=fc.getSouth();
    		else if(position=='west') targetpanel=fc.getWest();
    		return targetpanel;
    	},
    	registerOnWSController:function(controllerid,messagetypes){
    		var wsc=this.getController('WebSocketController');
    		var gadgetMsgtypes={};
    		gadgetMsgtypes.controllerId=controllerid;
    		gadgetMsgtypes.messagetypes=messagetypes;
    		wsc.register(gadgetMsgtypes);
    	
    	},
    	controlEvent:function(controller,viewId,eventMng){
    		controller.control(
    			'#'+viewId,
    			eventMng
        	);
    	}
    	
    }
});