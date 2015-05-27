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

Ext.define('Eubrazil.view.LidarPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.lidarpanel',
	
	id         : 'lidar',
	frame      : true,
	autoScroll : true,
	bodyPadding: 5,
	layout     : {
		type : 'vbox',
		align: 'stretch'
	},
	title      : 'Lidar',
	items      : [{
        xtype: 'fieldset',
        flex : 3.5,
        padding: '10 20 10 10',
        title: 'Products',
        items: [{
            xtype  : 'checkboxgroup',
            id     : 'products',
            columns: 1,
            items  : [{boxLabel: 'Vegetation metrics',      name: '1'},
                      {boxLabel: 'Terrain metrics',         name: '2'},
                      {boxLabel: 'DSM',  		            name: '3'},
                      {boxLabel: 'CHM',  		            name: '4'},
                      {boxLabel: 'RH (90, 75, 50, 25, 10)', name: '5'},
                      {boxLabel: 'DTM',        				name: '6'},
                      {boxLabel: 'Slope', 					name: '7'},
                      {boxLabel: 'Drainage', 				name: '8'}]
        }]
    },{
        xtype   : 'fieldset',
        title   : 'Time range',
        padding : '10 20 10 10',
        disabled: true,
    	flex    : 1,
        items: [{
        	xtype     : 'multislider',
        	id        : 'lidartimerange',
        	flex      : 1,
        	hideLabel : true,
            width     : '100%',
            minValue  : 1970,
            maxValue  : 2100,
            values    : [1970, 2100]
        },{
    		xtype     : 'textfield',
    		id        : 'lidarstartdate',
    		readOnly  : true,
    		fieldLabel: 'From',
    		value     : 1970
    	},{
    		xtype     : 'textfield',
    		id        : 'lidarenddate',
    		readOnly  : true,
    		fieldLabel: 'To',
    		value     : 2100
    	}]
    }]
});