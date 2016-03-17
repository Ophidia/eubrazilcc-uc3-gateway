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

Ext.define('Compute.view.InterannualExpPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.interannualexppanel',
	id         : 'interannualexppanel',
	autoScroll : true,
	border     : false,
	bodyPadding: 5,
	title: 'Help',
	titleAlign: 'right',
	bodyStyle  : {
	    background: '#E0EBFF'
	},
    tools:[
  	    {
  	       type:'help',
  	       tooltip: 'Select a bounding box from the map, a Satellite variable, a timerange and click on the Compute button.',
  	       handler: function(event, toolEl, panel){
  	    }
    }],
	items      : [
    {
	    xtype: 'panel',
	    id         : 'interannualbboxpanel',
	    minHeight  : 75,
	    border     : false,
	    bodyPadding: 10,
	    bodyStyle  : {
		    background: '#E0EBFF'
		},
	    layout     : {
	    	type : 'vbox',
	    	align: 'stretch'
	    },
	    items      : [{
			xtype     : 'textfield',
			id        : 'interannuallatrange',
			fieldLabel: 'Lat range',
			labelWidth: 65,
			emptyText : 'latmin:latmax',
			allowBlank: false
		},{
			xtype     : 'textfield',
			id        : 'interannuallonrange',
			fieldLabel: 'Lon range',
			labelWidth: 65,
			emptyText : 'lonmin:lonmax',
			allowBlank: false
		}]
	},{
        xtype: 'fieldset',
        flex : 1,
        title: 'Satellite',
        padding: '5 5 5 5',
        items: [        	{
            xtype  : 'radiogroup',
            id     : 'interannualvariable',
            columns: 1,
            items  : [{boxLabel: 'Enhanced Vegetation Index',               inputValue: 'evi',   name: 'interannualbutton'},
                      {boxLabel: 'Leaf Area Index',                         inputValue: 'lai',   name: 'interannualbutton'},
                      {boxLabel: 'Normalized Difference Vegetation Index',  inputValue: 'ndvi',  name: 'interannualbutton'},
                      {boxLabel: 'Land Surface Albedo',                     inputValue: 'alb',   name: 'interannualbutton'},
                      {boxLabel: 'Ground Heat Flux',                        inputValue: 'g',     name: 'interannualbutton'},
                      {boxLabel: 'Net Radiation',                           inputValue: 'rn',    name: 'interannualbutton'},
                      {boxLabel: 'Land Surface Temperature',                inputValue: 'ts',    name: 'interannualbutton'}]
        }]
    },{
        xtype   : 'fieldset',
        title   : 'Time range',
        padding : '5 5 5 5',
    	flex    : 1,
        items: [{
        	xtype     : 'multislider',
        	id        : 'interannualtimerange',
        	flex      : 1,
        	hideLabel : true,
            width     : '100%',
            minValue  : 1984,
            maxValue  : 1995,
            values    : [1984, 1995]
        },{
    		xtype     : 'textfield',
    		id        : 'interannualstartdate',
    		readOnly  : true,
    		fieldLabel: 'From',
    		value     : 1984
    	},{
    		xtype     : 'textfield',
    		id        : 'interannualenddate',
    		readOnly  : true,
    		fieldLabel: 'To',
    		value     : 1995
    	}]
    },{
        xtype: 'panel',
        id    : 'interannualsubmitpanel',
        border: false,
        bodyStyle: {
    	    background: '#E0EBFF'
    	},
        layout: {
            type: 'table',
            columns: 2,
            tdAttrs: {style: 'padding: 10px 8px;'}
        },
        defaults: {
        	width: '140'
        },
        items: [{
        	xtype: 'button',
        	text : 'Compute',
        	scale: 'medium',
        	id   : 'interannualcomputebt'
        },{
        	xtype: 'button',
        	text : 'Reset',
        	scale: 'medium',
        	id   : 'interannualresetbt'
        }]
    }]
});
