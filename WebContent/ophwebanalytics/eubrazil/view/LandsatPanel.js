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

Ext.define('Eubrazil.view.LandsatPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.landsatpanel',
	
	id         : 'landsat',
	frame      : true,
	autoScroll : true,
	bodyPadding: 5,
	layout     : {
		type : 'vbox',
		align: 'stretch'
	},
	title      : 'Satellite',
	items      : [{
        xtype: 'fieldset',
        flex : 1.8,
        padding: '10 20 10 10',
        title: 'Vegetation Indices',
        items: [{
            xtype  : 'checkboxgroup',
            id     : 'vegetationindices',
            columns: 1,
            items  : [{boxLabel: 'NDVI',      			name: '12'},
                      {boxLabel: 'SAVI',       			name: '13'},
                      {boxLabel: 'SURFACE ALBEDO',     	name: '14'},
                      {boxLabel: 'GROUND HEAT FLUX',    name: '15'},
                      {boxLabel: 'EVI',           		name: '16'},
                      {boxLabel: 'NET RADIATION', 		name: '17'},
                      {boxLabel: 'SURFACE TEMPERATURE', name: '18'}]
        }]
    },{
        xtype: 'fieldset',
        flex : 1,
        padding: '10 20 10 10',
        title: 'Scenes',
        items: [{
            xtype: 'checkboxgroup',
            id     : 'scenes',
            columns: 1,
            items: [{boxLabel: 'Scene A',  name: '5'}]
        }]
    },{
        xtype: 'fieldset',
        flex : 1,
        padding: '10 20 10 10',
        title: 'Sensors',
        items: [{
            xtype: 'checkboxgroup',
            id     : 'sensors',
            columns: 1,
            items: [{boxLabel: 'Landsat',  name: '4'}]
        }]
    },{
        xtype   : 'fieldset',
        title   : 'Time range',
        padding : '10 20 10 10',
        disabled: true,
    	flex    : 1,
        items: [{
        	xtype     : 'multislider',
        	id        : 'landsattimerange',
        	flex      : 1,
        	hideLabel : true,
            width     : '100%',
            minValue  : 1988,
            maxValue  : 2010,
            values    : [1988, 2010]
        },{
    		xtype     : 'textfield',
    		id        : 'landsatstartdate',
    		readOnly  : true,
    		fieldLabel: 'From',
    		value     : 1988
    	},{
    		xtype     : 'textfield',
    		id        : 'landsatenddate',
    		readOnly  : true,
    		fieldLabel: 'To',
    		value     : 2010
    	}]
    }]
});