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

Ext.override(Ext.ux.form.MultiSelect, {
    selectAll : function() {
        var ids = this.store.collect(this.valueField);
        this.setValue(ids);
    }
});

Ext.define('Compute.view.OMExpPanel', {
	extend: 'Ext.form.Panel',
	requires: ['Ext.ux.form.MultiSelect'],
	
	alias : 'widget.omexppanel',
	id         : 'omexppanel',
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
 	       tooltip: 'Select a species and one or more data points and click on the Compute button',
 	       handler: function(event, toolEl, panel){
 	           
 	    }
    }],
	items:[
    {
        xtype: 'fieldset',
        flex : 3,
        padding: '5 5 5 5',
        title: 'Select a species',
        items: [
                {
                    xtype: 'multiselect',
                    msgTarget: 'side',
                    height: 260,
                    width: 260,
                    name: 'species',
                    id: 'species',
                    allowBlank: false,
                    store: Ext.create('Compute.store.SpeciesStore'),
                    displayField: 'speciesName',
                    valueField: 'idspecies',
                    maxSelections: 1,
                }
        ]
    },
    {
        xtype: 'fieldset',
        flex : 3,
        padding: '5 5 5 5',
        title: 'Select a data point',
        items: [
                {
                    xtype: 'multiselect',
                    msgTarget: 'side',
                    height: 270,
                    width: 260,
                    name: 'datapoints',
                    overflowX: 'hidden',
                    listConfig: {simpleSelect: true},
                    id: 'datapoints',
                    allowBlank: false,
                    store: Ext.create('Compute.store.DataPointStore'),
                    displayField: 'point',
                    valueField: 'idDataPoint'
                },
                {
                    xtype: 'panel',
                    id    : 'select_deselect',
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
                    	text : 'Select all',
                    	scale: 'medium',
                    	id   : 'selectall',
                        handler: function(){
                            var field1 = Ext.getCmp("datapoints");
                            field1.selectAll();
                        }
                    },{
                    	xtype: 'button',
                    	text : 'Deselect all',
                    	scale: 'medium',
                    	id   : 'deselectall',
                        handler: function(){
                            var field2 = Ext.getCmp("datapoints");
                            if (!field2.disabled) {
                                field2.setValue(false);
                            }
                        }
                    }]
                }
        ]
    },
    {
        xtype: 'panel',
        id    : 'omexpsubmitpanel',
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
        	id   : 'opmexpcomputebt'
        },{
        	xtype: 'button',
        	text : 'Reset',
        	scale: 'medium',
        	id   : 'omexpresetbt'
        }]
    }]
});
