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

Ext.define('Compute.view.SpeciesPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.speciespanel',
	
	id         : 'speciespanel',
	autoScroll : true,
	border     : false,
	bodyPadding: 5,
	bodyStyle  : {
	    background: '#E0EBFF'
	},
	layout     : 'form',
	title      : 'Species',
	items      : [{
        xtype: 'fieldset',
        disabled: true,
        flex : 1,
        layout     : {
    		type : 'vbox',
    		align: 'stretch'
    	},
        padding: '10 10 10 10',
        items: [{
            xtype     : 'textfield',
            id        : 'genus',
            fieldLabel: 'Genus',
            labelWidth: 60
        },{
    		xtype     : 'textfield',
    		id        : 'species',
    		fieldLabel: 'Species',
    		labelWidth: 60
    	}]
    },{
        xtype: 'fieldset',
        disabled: true,
        flex : 1,
        title: 'Scenarios',
        items: [{
            xtype: 'checkboxgroup',
            id     : 'speciesscenarios',
            layout : {
        		type : 'vbox',
        		align: 'stretch'
        	},
            columns: 1,
            items: [{boxLabel: 'Present',          name: 'present'},
                    {boxLabel: '2050 optimistic',  name: '2050opt'},
                    {boxLabel: '2050 pessimistic', name: '2050pes'},
                    {boxLabel: '2070 optimistic',  name: '2070opt'},
                    {boxLabel: '2070 pessimistic', name: '2070pes'}]
        }]
    },{
        xtype: 'fieldset',
        disabled: true,
        flex : 1,
        items: [{
            xtype: 'checkboxgroup',
            id     : 'querylink',
            columns: 1,
            items: [{boxLabel: 'Query species link', name: 'querylink'}]
        }]
    }]
});
