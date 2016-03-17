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

Ext.define('Compute.view.RelativeHeightExpPanel', {
	extend: 'Ext.form.Panel',
	requires: ['Ext.ux.form.MultiSelect'],
	
	alias : 'widget.relativeheightexppanel',
	id         : 'relativeheightexppanel',
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
  	       tooltip: 'Select a tile from the list below and click on the Compute button         .',
  	       handler: function(event, toolEl, panel){
  	           
  	    }
      }],
	items      : [
/*    {
	  xtype: 'panel',
      flex : 1,
	  border: false,
	  frame: true,
	  html : '<center><font size=2>Select a tile from the list below.</font></center>'
    },*/
    {
      xtype: 'fieldset',
      flex : 3,
      padding: '5 5 5 5',
      title: 'LiDAR Tiles',
      items: [/*{
          xtype  : 'radiogroup',
          id     : 'lidartiles',          
          columns: 1,
          items  : [{boxLabel: 'DUCL1720C9672',    inputValue: 'DUCL1720C9672',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1720C9673',    inputValue: 'DUCL1720C9673',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1720C9674',    inputValue: 'DUCL1720C9674',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1730C9672',    inputValue: 'DUCL1730C9672',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1730C9673',    inputValue: 'DUCL1730C9673',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1730C9674',    inputValue: 'DUCL1730C9674',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1740C9672',    inputValue: 'DUCL1740C9672',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1740C9673',    inputValue: 'DUCL1740C9673',   name: 'lidartilesbutton'},
                    {boxLabel: 'DUCL1740C9674',    inputValue: 'DUCL1740C9674',   name: 'lidartilesbutton'}]
      }*/
              {
            	    xtype: 'multiselect',
                    msgTarget: 'side',
                    height: 300,
                    width: 260,
                    name: 'lidartiles',
                    id: 'lidartiles',
                    allowBlank: false,
                    displayField: 'display',
                    valueField: 'value',
                    maxSelections : 2,

		            store: new Ext.data.ArrayStore({
	                    fields: ['value', 'display'],
	                    data: [
	                        ["DUCL1720C9672", 'DUCL1720C9672'], 
	                        ["DUCL1720C9673", 'DUCL1720C9673'],
	                        ["DUCL1720C9674", 'DUCL1720C9674'],
	                        ["DUCL1730C9672", 'DUCL1730C9672'],
	                        ["DUCL1730C9673", 'DUCL1730C9673'],
	                        ["DUCL1730C9674", 'DUCL1730C9674'],
	                        ["DUCL1740C9672", 'DUCL1740C9672'],
	                        ["DUCL1740C9673", 'DUCL1740C9673'],
	                        ["DUCL1740C9674", 'DUCL1740C9674'],
	                    ]
	                })
              }
      
      ]
    },
    {
        xtype: 'panel',
        id    : 'relativeheightsubmitpanel',
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
        	id   : 'relativeheightcomputebt'
        },{
        	xtype: 'button',
        	text : 'Reset',
        	scale: 'medium',
        	id   : 'relativeheightresetbt'
        }]
    }]
});
