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

Ext.define('Compute.view.ClimateSebalExp', {
	extend: 'Ext.form.Panel',
	
	alias: 'widget.climatesebalexp',
	
	id         : 'clisebexp',
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
 	       tooltip: 'Select a bounding box from the map, a Climate variable, a Satellite variable, a timerange and click on the Compute button.',
 	       handler: function(event, toolEl, panel){
 	           
 	    }
   }],
	items      : [
/*    {
	  xtype: 'panel',
      flex : 1,
	  border: false,
	  frame: true,
	  html : '<center><font size=2>Select a bounding box from the map.</font></center>'
    },*/
	{
	    xtype: 'panel',
	    id         : 'clisebbboxpanel',
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
			id        : 'cliseblatrange',
			fieldLabel: 'Lat range',
			labelWidth: 65,
			emptyText : 'latmin:latmax',
			allowBlank: false
		},{
			xtype     : 'textfield',
			id        : 'cliseblonrange',
			fieldLabel: 'Lon range',
			labelWidth: 65,
			emptyText : 'lonmin:lonmax',
			allowBlank: false
		}]
	},{
        xtype: 'fieldset',
        flex : 1,
        title: 'Climate Data (observed data)',
        padding: '5 5 5 5',
        items: [        	{
            xtype  : 'radiogroup',
            id     : 'clisebvariable1',
            allowBlank: false,
            columns: 1,
            items  : [{boxLabel: 'Temperature',   inputValue: 'tmp', name: 'cruvariable'},
                      {boxLabel: 'Precipitation', inputValue: 'pre', name: 'cruvariable'}]
        }]
    },{
        xtype: 'fieldset',
        flex : 1,
        title: 'Satellite Data',
        padding: '5 5 5 5',
        items: [        	{
            xtype  : 'radiogroup',
            id     : 'clisebvariable2',
            allowBlank: false,
            columns: 1,
            items  : [{boxLabel: 'Enhanced Vegetation Index',               inputValue: 'evi',   name: 'sebvariable'},
                      {boxLabel: 'Leaf Area Index',                         inputValue: 'lai',   name: 'sebvariable'},
                      {boxLabel: 'Normalized Difference Vegetation Index',  inputValue: 'ndvi',  name: 'sebvariable'},
                      {boxLabel: 'Land Surface Albedo',                     inputValue: 'alb', name: 'sebvariable'},
                      {boxLabel: 'Ground Heat Flux',                        inputValue: 'g',     name: 'sebvariable'},
                      {boxLabel: 'Net Radiation',                           inputValue: 'rn',    name: 'sebvariable'},
                      {boxLabel: 'Land Surface Temperature',                inputValue: 'ts',    name: 'sebvariable'}]
        }]
    },{
        xtype   : 'fieldset',
        title   : 'Time range',
        padding : '5 5 5 5',
    	flex    : 1,
        items: [{
        	xtype     : 'multislider',
        	id        : 'clisebtimerange',
        	flex      : 1,
        	hideLabel : true,
            width     : '100%',
            minValue  : 1984,
            maxValue  : 1995,
            values    : [1984, 1995]
        },{
    		xtype     : 'textfield',
    		id        : 'clisebstartdate',
    		readOnly  : true,
    		fieldLabel: 'From',
    		value     : 1984
    	},{
    		xtype     : 'textfield',
    		id        : 'clisebenddate',
    		readOnly  : true,
    		fieldLabel: 'To',
    		value     : 1995
    	}]
    },{
        xtype: 'panel',
        id    : 'clisebsubmitpanel',
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
        	id   : 'clisebcomputebt'
        },{
        	xtype: 'button',
        	text : 'Reset',
        	scale: 'medium',
        	id   : 'clisebresetbt'
        }]
    }]
});
