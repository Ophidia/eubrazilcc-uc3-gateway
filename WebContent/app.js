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

Ext.application({
    
	name: 'OphWebAnalytics',
    
	appFolder: 'ophwebanalytics/framework',
    
	paths: {
		'Eubrazil' : 'ophwebanalytics/eubrazil',
		'Libraries': 'ophwebanalytics/libraries',
		'Ext.ux'   : 'extjs/examples/ux'
	},
    
	controllers: ['FrameworkController'],
    
    launch: function() {
        Ext.create('Ext.container.Viewport', {
        	layout: 'border',
            items: [{
            	xtype : 'box',
            	region: 'north',
            	height: 32,
            	autoEl: {
            		tag : 'div',
                    html:'<p align="center"><b>SCIENTIFIC GATEWAY FOR DATA ANALYSIS</b></p>'
            	}
            },{
            	xtype : 'panel',
            	region: 'center',
            	layout: 'border',
            	items : [{
            		xtype: 'centerpanel'
            	},{
            		xtype: 'westpanel'
            	}]
            }]
        });
    }
});