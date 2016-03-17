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

Ext.define('Compute.view.ClimatePanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.climatepanel',
	
	id         : 'climate',
	autoScroll : true,
	border     : false,
	bodyPadding: 5,
	bodyStyle  : {
	    background: '#E0EBFF'
	},
	layout     : 'form',
	title      : 'Climate',
	items      : [{
        xtype: 'fieldset',
        flex : 2,
        title: 'Indicators',
        padding: '5 5 5 5',
        items: [        	{
            xtype  : 'checkboxgroup',
            id     : 'indicators',
            columns: 1,
            items  : [
                      {boxLabel: 'Annual max of monthly tasmax (TXx)', name: 'TXx_ANN'/*, 
            			afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" id = "tooltip1" class="info_image" ' + 
            			'onmouseover= "OphWebAnalytics.app.getController(\'Eubrazil.controller.Controller\').showTooltip(this, \'content1\')"></img>'*/},
                      {boxLabel: 'Annual max of monthly tasmin (TNx)', name: 'TNx_ANN'/*, 
            			afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" id = "tooltip2" class="info_image" ' + 
            			'onmouseover= "OphWebAnalytics.app.getController(\'Eubrazil.controller.Controller\').showTooltip(this, \'content2\')"></img>'*/},
                      {boxLabel: 'Annual min of monthly tasmax (TXn)', name: 'TXn_ANN'/*,
                        afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" id = "tooltip3" class="info_image"' + 
             			'onmouseover= "OphWebAnalytics.app.getController(\'Eubrazil.controller.Controller\').showTooltip(this, \'content3\')"></img>'*/},
                      {boxLabel: 'Annual min of monthly tasmin (TNn)', name: 'TNn_ANN'/*,
                    	afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" id = "tooltip4" class="info_image"' + 
             			'onmouseover= "OphWebAnalytics.app.getController(\'Eubrazil.controller.Controller\').showTooltip(this, \'content4\')"></img>'*/},
                      {boxLabel: 'Number of frost days (FD)',      disabled: true, name: '12'/*, 
             		    afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" class="info_image" data-qtip=""></img>'*/},
                      {boxLabel: 'Number of summer days (SU)',     disabled: true, name: '13'/*, 
         		    	afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" class="info_image" data-qtip=""></img>'*/},
                      {boxLabel: 'Number of icing days (ID)',      disabled: true, name: '14'/*, 
     		    	    afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" class="info_image" data-qtip=""></img>'*/},
                      {boxLabel: 'Number of tropical nights (TR)', disabled: true, name: '15'/*, 
 		    			afterBoxLabelTextTpl: '&nbsp<img src="extjs/examples/shared/icons/fam/information.png" class="info_image" data-qtip=""></img>'*/}]
        }]
    },{
        xtype: 'fieldset',
        flex : 0.65,
        title: 'Scenarios',
//        padding: '5 5 5 5',
        items: [{
            xtype: 'checkboxgroup',
            id     : 'scenarios',
            layout : {
        		type : 'vbox',
        		align: 'stretch'
        	},
            columns: 1,
            items: [{boxLabel: 'RCP 8.5',   name: 'rcp85'},
                    {boxLabel: 'RCP 4.5',   name: 'rcp45'}]
        }]
    },{
        xtype: 'fieldset',
        flex : 0.8,
        title: 'Models',
//        padding: '5 5 5 5',
        items: [{
            xtype: 'checkboxgroup',
            id     : 'models',
            layout : {
        		type : 'vbox',
        		align: 'stretch'
        	},
            columns: 1,
            items: [{boxLabel: 'CMCC-CM',   name: 'CMCC-CM'},
//                    {boxLabel: 'CMCC-CESM', name: 'CMCC-CESM'},
                    {boxLabel: 'CMCC-CMS',  name: 'CMCC-CMS'}]
        }]
    },{
        xtype: 'fieldset',
        title: 'Time range',
//        padding: '5 5 5 5',
    	flex      : 0.8,
        items: [{
        	xtype     : 'multislider',
        	id        : 'climatetimerange',
        	flex      : 1,
        	hideLabel : true,
            width     : '100%',
            minValue  : 2006,
            maxValue  : 2100,
            values    : [2006, 2100]
        },{
    		xtype     : 'textfield',
    		id        : 'startdate',
    		readOnly  : true,
    		fieldLabel: 'From',
    		value     : 2006
    	},{
    		xtype     : 'textfield',
    		id        : 'enddate',
    		readOnly  : true,
    		fieldLabel: 'To',
    		value     : 2100
    	}]
    }]
});
