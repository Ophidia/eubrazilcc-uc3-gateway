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

Ext.define('Compute.view.ClimateAnalysisExpPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.climateanalysisexppanel',
	id         : 'climateanalysisexppanel',
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
 	       tooltip: 'Select a bounding box from the map, one or more indicator, a timerange and click on the Compute button.',
 	       handler: function(event, toolEl, panel){
 	           
 	       }
 	    }],
	items      : [
    {
	    xtype: 'panel',
	    id         : 'climateanalysisbboxpanel',
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
			id        : 'climateanalysislatrange',
			fieldLabel: 'Lat range',
			labelWidth: 65,
			emptyText : 'latmin:latmax',
			allowBlank: false
		},{
			xtype     : 'textfield',
			id        : 'climateanalysislonrange',
			fieldLabel: 'Lon range',
			labelWidth: 65,
			emptyText : 'lonmin:lonmax',
			allowBlank: false
		}]
	},{
        xtype: 'fieldset',
        flex : 1,
        title: 'Climate Indicators',
        padding: '5 5 5 5',
        items: [{
            xtype  : 'checkboxgroup',
            id     : 'climateanalysisindicator',
            columns: 1,
            items  : [
                      {boxLabel: 'Annual max of monthly max temp. (TXx)', name: 'txx'},
                      {boxLabel: 'Annual max of monthly min temp. (TNx)', name: 'tnx'},
                      {boxLabel: 'Annual min of monthly max temp. (TXn)', name: 'txn'},
                      {boxLabel: 'Annual min of monthly min temp. (TNn)', name: 'tnn'}]
        }]
    },{
        xtype   : 'fieldset',
        title   : 'Time range',
        padding : '5 5 5 5',
    	flex    : 1,
        items: [{
        	xtype     : 'multislider',
        	id        : 'climateanalysistimerange',
        	flex      : 1,
        	hideLabel : true,
            width     : '100%',
            minValue  : 2006,
            maxValue  : 2100,
            values    : [2006, 2100]
        },{
    		xtype     : 'textfield',
    		id        : 'climateanalysisstartdate',
    		readOnly  : true,
    		fieldLabel: 'From',
    		value     : 2006
    	},{
    		xtype     : 'textfield',
    		id        : 'climateanalysisenddate',
    		readOnly  : true,
    		fieldLabel: 'To',
    		value     : 2100
    	}]
    },{
        xtype: 'panel',
        id    : 'climateanalysissubmitpanel',
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
        	id   : 'climateanalysiscomputebt'
        },{
        	xtype: 'button',
        	text : 'Reset',
        	scale: 'medium',
        	id   : 'climateanalysisresetbt'
        }]
    }]
});
