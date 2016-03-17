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

Ext.define('ClearingHouse.view.SearchPanel', {
	extend: 'Ext.form.Panel',
	requires: ['Ext.tip.QuickTipManager'],
	alias : 'widget.searchpanel',
	id    : 'searchpanel',
	autoScroll : true,
	border     : false,
	bodyPadding: 5,
	bodyStyle  : {
	    background: '#F0F5FF'
	},
	
	items      : [
      {
  	    xtype: 'fieldset',
  	    id: 'chbboxpanel',
        title   : 'Spatial range',
  	    minHeight  : 75,
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
  			id        : 'chlatrange',
  			fieldLabel: 'Lat range',
  			labelWidth: 70,
  			emptyText : 'latmin:latmax',
  			allowBlank: false
  		},{
  			xtype     : 'textfield',
  			id        : 'chlonrange',
  			fieldLabel: 'Lon range',
  			labelWidth: 70,
  			emptyText : 'lonmin:lonmax',
  			allowBlank: false
  		}]
  	},
    {
        xtype: 'fieldset',
        flex : 3,
        padding: '5 5 5 5',
        title: 'Experiment type',
        //border: false,

  	    bodyPadding: 10,
        items: [{
            xtype  : 'radiogroup',
            id     : 'chexptype',
            columns: 1,
            items  : [{boxLabel: 'SEBAL Interannual Analysis',      inputValue: 'sebalinterannual',   	name: 'searchbutton'},
                      {boxLabel: 'Ecological Niche Modelling',      inputValue: 'enm',   				name: 'searchbutton'},
                      {boxLabel: 'Climate Model Intercomparison',   inputValue: 'modelintercomparison', name: 'searchbutton'},
                      {boxLabel: 'Climate-SEBAL Intercomparison',   inputValue: 'climatesebal',   		name: 'searchbutton'},
                      {boxLabel: 'Relative Height Analysis',        inputValue: 'relheight',   			name: 'searchbutton'},
                      {boxLabel: 'Lidar Intercomparison Analysis',  inputValue: 'lidarintercomparison', name: 'searchbutton'}]
        	}]
  	  },
  	{
          xtype   : 'fieldset',
          title   : 'Submission date range',
          padding : '5 5 5 5',
          bodyPadding: '5 5 0',
          fieldDefaults: {
              labelWidth: 125,
              msgTarget: 'side',
              autoFitErrors: false
          },
          defaults: {
              width: 300
          },
          defaultType: 'datefield',
          frame: true,
      	  flex    : 1,
          items: [
			{
			    fieldLabel: 'Start Date',
			    name: 'chstartdate',
			    id: 'chstartdate',
			    allowBlank: false,
	            itemId: 'chstartdate',
			    vtype: 'daterange',
			    //endDateField: 'enddt'
			}, {
			    fieldLabel: 'End Date',
			    name: 'chenddate',
			    id: 'chenddate',
			    allowBlank: false,
	            itemId: 'chenddate',
			    vtype: 'daterange',
			    //startDateField: 'startdt'
			}]
      },
  	  
	  {
	        xtype: 'panel',
	        id    : 'chsubpanel',
	        border: false,
	        bodyStyle: {
	    	    background: '#E0EBFF'
	    	},
	    	flex: 1,
	        layout: {
	            type: 'table',
	            columns: 3,
	            tdAttrs: {style: 'padding: 10px 8px;'}
	        },
	        defaults: {
	        	width: '140'
	        },
	        items: [{
	        	xtype: 'button',
	        	text : 'Search',
	        	scale: 'medium',
	        	id   : 'chsearchbt'
	        },{
	        	xtype: 'button',
	        	text : 'Reset',
	        	scale: 'medium',
	        	id   : 'chresetbt'
	        },
	        {
	        	xtype: 'button',
	        	text : 'Show All',
	        	scale: 'medium',
	        	id   : 'chshowall'
	        }]
	    }]
});
Ext.apply(Ext.form.field.VTypes, {
    daterange: function(val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },

    daterangeText: 'Start date must be less than end date',

});

