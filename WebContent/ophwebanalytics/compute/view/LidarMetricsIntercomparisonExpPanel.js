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

Ext.define('Compute.view.LidarMetricsIntercomparisonExpPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.lidarmetricsintercomparisonexppanel',
	id         : 'lidarmetricsintercomparisonexppanel',
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
	       tooltip: 'Select two metrics and a tile from the list below and click on the Compute button.',
	       handler: function(event, toolEl, panel){
	           
	    }
    }],

	items: [
/*    {
	  xtype: 'panel',
      flex : 1,
	  border: false,
	  frame: true,
	  html : '<center><font size=2>Select two metrics and a tile from the list below.</font></center>'
    },*/
    {
      xtype: 'fieldset',
      flex : 3,
      padding: '5 5 5 5',
      title: 'Vegetation metrics',
      items: [{
          xtype  : 'checkboxgroup',
          id     : 'vegetation',
          columns: 1,
          items  : [{boxLabel: 'Digital Surface Model',    name: 'dsm', id: 'dsm'},
                    {boxLabel: 'Canopy Height Model',      name: 'chm', id: 'chm'},
                    {boxLabel: 'Forest Cover',             name: 'fc',  id: 'fc'},
                    {boxLabel: 'Aboveground Biomass',      name: 'agb', id: 'agb'},
                    {boxLabel: 'Relative Height 50%',      name: 'rh',  id:'rh'}/*,
                    {boxLabel: 'Forest Gap',      		   name: '6',   disabled: true},
                    {boxLabel: 'Tree Maps', 	    	   name: '7',   disabled: true},
                    {boxLabel: 'Tree Crowns',     		   name: '8',   disabled: true},
                    {boxLabel: 'Solar Radiation', 		   name: '8',   disabled: true}*/]
      	}]
	  },{
	      xtype: 'fieldset',
	      flex : 1,
	      padding: '5 5 5 5',
	      title: 'Terrain metrics',
	      items: [{
	          xtype  : 'checkboxgroup',
	          id     : 'terrain',
	          columns: 1,
	          items  : [{boxLabel: 'Digital Terrain Model',     name: 'dtm'},
	                    {boxLabel: 'Aspect',      				name: 'aspect'},
	                    {boxLabel: 'Slope Angle', 				name: 'sa'}]
	      }]
	  },{
	      xtype: 'fieldset',
	      flex : 1,
	      padding: '5 5 5 5',
	      title: 'LiDAR data characteristics',
	      items: [{
	          xtype  : 'checkboxgroup',
	          id     : 'pointdensity',
	          columns: 1,
	          items  : [{boxLabel: 'Point Density', 		name: 'pd'}]
	      }]
	  },{
		xtype: 'fieldset',
	    flex : 3,
	    padding: '5 5 5 5',
	    title: 'LiDAR Tiles',
	    items: [      {
	  	    xtype: 'multiselect',
	          msgTarget: 'side',
	          height: 300,
	          width: 260,
	          maxSelections : 1,
	          name: 'tilesintercomparison',
	          id: 'tilesintercomparison',
	          allowBlank: false,
	          displayField: 'display',
	          valueField: 'value',

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
	    }]
	  },
	  {
        xtype: 'panel',
        id    : 'lidarmetricsintercomparisonsubmitpanel',
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
        	id   : 'lidarmetricsintercomparisoncomputebt'
        },{
        	xtype: 'button',
        	text : 'Reset',
        	scale: 'medium',
        	id   : 'lidarmetricsintercomparisonresetbt'
        }]
     }]
});
