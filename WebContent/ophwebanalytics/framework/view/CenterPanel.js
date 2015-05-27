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

Ext.define('OphWebAnalytics.view.CenterPanel', {
    extend: 'Ext.panel.Panel',
   
    alias: 'widget.centerpanel',
    
    id    : 'centerpanel',
    region: 'center',
    border: false,
    layout: {
    	type : 'vbox',
    	align: 'stretch'
    },
    items : [{
    	xtype            : 'panel',
    	id               : 'upperpanel',
    	flex             : 2,
    	collapsible      : true,
    	layout           : {type: 'hbox', align: 'stretch'},
    	items            : [{
    		xtype            : 'panel',
    		id               : 'brazilmappanel',
    		flex             : 4,
    	    layout           : 'fit',
    	    border           : false,
    	    collapsible      : true,
    	    collapseDirection: 'left'
    	},{
    		xtype: 'tabpanel',
    		id   : 'historypanel',
    		flex : 2,
    		items: [{
    			id    : 'chexperimentpanel',
    			title : 'Clearing House',
    			active: true,
    			layout: {type: 'vbox', align: 'stretch'}
    		},{
    			id    : 'experimentpanel',
    			title : 'Experiments',
    			layout: {type: 'vbox', align: 'stretch'}
    		},,{
    			id    : 'monitoringpanel',
    			title : 'Monitoring',
    			layout: {type: 'vbox', align: 'stretch'},
    			items : [{
    				id   : 'historychart',
    				xtype: 'panel',
    				title: 'History',
    				layout: 'fit',
    				flex : 3
    			},{
    				id   : 'currentchart', 
    				xtype: 'panel',
    				title: 'Current',
    				layout: 'fit',
    				flex : 2
    			}] 
    		}]
    	}]
    },{
    	xtype: 'panel',
    	flex : 1,
    	id   : 'resultspanel',
    	layout: {
    		type: 'vbox',
    		align: 'stretch'
    	}
    }]
});