/**
Eubrazil Scientific Gateway
Copyright (C) 2015 CMCC

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

Ext.define('Eubrazil.view.SpeciesPanel', {
	extend: 'Ext.form.Panel',
	
	alias : 'widget.speciespanel',
	
	id         : 'speciespanel',
	frame      : true,
	autoScroll : true,
	bodyPadding: 5,
	layout     : 'fit',
	title      : 'Species',
	items      : [{
        xtype: 'fieldset',
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
    }]
});