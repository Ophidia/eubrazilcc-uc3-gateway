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

Ext.define('Interactive.view.InteractiveForm', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.interactiveform',
	
	id         : 'interactiveform',
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
	layout     : 'form',
	items      : [
    {
        xtype: 'fieldset',
        flex : 1,
        title: 'Climate Data (from models)',
        padding: '5 5 5 5',
        items: [{
            xtype  : 'radiogroup',
            id     : 'intclimatefilter',
            columns: 1,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    console.log('change:' + field.boxLabel + ' ' + newValue.rb);
                }
            },
            items  : [{boxLabel: 'tasmax CMCC-CM rcp45',  inputValue: 'tasmax CMCC-CM rcp45 95',  name: 'interactivebutton'},
                      {boxLabel: 'tasmax CMCC-CM rcp85',  inputValue: 'tasmax CMCC-CM rcp85 95',  name: 'interactivebutton'},
                      {boxLabel: 'tasmax CMCC-CMS rcp45', inputValue: 'tasmax CMCC-CMS rcp45 95', name: 'interactivebutton'},
                      {boxLabel: 'tasmax CMCC-CMS rcp85', inputValue: 'tasmax CMCC-CMS rcp85 95', name: 'interactivebutton'},
                      {boxLabel: 'tasmin CMCC-CM rcp45',  inputValue: 'tasmin CMCC-CM rcp45 95',  name: 'interactivebutton'},
                      {boxLabel: 'tasmin CMCC-CM rcp85',  inputValue: 'tasmin CMCC-CM rcp85 95',  name: 'interactivebutton'},
                      {boxLabel: 'tasmin CMCC-CMS rcp45', inputValue: 'tasmin CMCC-CMS rcp45 95', name: 'interactivebutton'},
                      {boxLabel: 'tasmin CMCC-CMS rcp85', inputValue: 'tasmin CMCC-CMS rcp85 95', name: 'interactivebutton'}]
        }]
    },{
        xtype: 'fieldset',
        flex : 1,
        title: 'Climate Data (observed data)',
        padding: '5 5 5 5',
        items: [        	{
            xtype  : 'radiogroup',
            id     : 'intclimate2filter',
            columns: 1,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    console.log('change:' + field.boxLabel + ' ' + newValue.rb);
                }
            },
            items  : [{boxLabel: 'CRU TS3.23 Temperature',   inputValue: 'tmp CRU TS3.23 114', name: 'interactivebutton'},
                      {boxLabel: 'CRU TS3.23 Precipitation', inputValue: 'pre CRU TS3.23 114', name: 'interactivebutton'}]
        }]
    }/*,{
        xtype: 'fieldset',
        flex : 1,
        title: 'Satellite',
        padding: '5 5 5 5',
        items: [        	{
            xtype  : 'radiogroup',
            id     : 'intsatellitefilter',
            columns: 1,
        	items  : [{boxLabel: 'Enhanced Vegetation Index',              inputValue: 'evi 50',   name: 'interactivebutton', disabled: true},
        	          {boxLabel: 'Leaf Area Index',                        inputValue: 'iaf 50',   name: 'interactivebutton', disabled: true},
        	          {boxLabel: 'Normalized Difference Vegetation Index', inputValue: 'ndvi 50',  name: 'interactivebutton', disabled: true},
        	          {boxLabel: 'Land Surface Albedo',                    inputValue: 'alpha 50', name: 'interactivebutton'},
        	          {boxLabel: 'Ground Heat Flux',                       inputValue: 'g 50',     name: 'interactivebutton', disabled: true},
        	          {boxLabel: 'Net Surface Radiation',                  inputValue: 'rn 50',    name: 'interactivebutton', disabled: true},
        	          {boxLabel: 'Land Surface Temperature',               inputValue: 'ts 50',    name: 'interactivebutton', disabled: true}]
        }]
    },{
		xtype: 'panel',
		border: false,
		frame: true,
		html : '<center><font size=2><b>Sebal data are going to be available soon.</b></font></center>'
	},{
        xtype: 'fieldset',
        flex : 1,
        title: 'Species',
        layout     : {
        	type : 'vbox',
        	align: 'stretch'
        },
        items: [{
            xtype: 'combobox',
            id     : 'intgenus',
            labelWidth: 65,
            fieldLabel: 'Genus',
            store: Ext.create('Ext.data.Store', {
                fields: ['name'],
                data : [{"name":"Abarema"},
                        {"name":"Canna"}]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name'
        },{
            xtype: 'combobox',
            id     : 'intspecies',
            labelWidth: 65,
            fieldLabel: 'Species',
            store: Ext.create('Ext.data.Store', {
                fields: ['name'],
                data : [{"name":"Filamentosa"},
                        {"name":"Indica"}]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name',
            margin: '0 0 30 0'
        },{
    		xtype     : 'textfield',
    		id        : 'intlatrange',
    		fieldLabel: 'Lat range',
    		labelWidth: 65,
    		emptyText : 'latmin:latmax'
    	},{
    		xtype     : 'textfield',
    		id        : 'intlonrange',
    		fieldLabel: 'Lon range',
    		labelWidth: 65,
    		emptyText : 'lonmin:lonmax',
    		margin: '0 0 30 0'
    	},{
    		xtype: 'button',
    		text : 'Display occurrences',
    		margin: '0 0 10 70' 
    	}]
    }*/]
});
