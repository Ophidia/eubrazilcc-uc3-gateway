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

Ext.define('ExpDetails.view.ExpDetailsTabPanel', {
//    extend: 'Ext.panel.Panel',
	extend: 'Ext.tab.Panel',
    
    alias: 'widget.expdtab',
    
	title: 'Experiment Details',
	/*dockedItems: [{
    	xtype    : 'toolbar',
    	id       : 'exptoolbar',
    	layout   : {
    		type : 'hbox',
    		align: 'stretch'
    	},
    	items  : [{
    		xtype: 'tbtext',
    		id  : 'sstoring',
    		text: 'Experiment correctly stored in the Clearing House.',
    		style: {
                marginTop: '4px',
                'font-weight': 'bold'
            },
            hidden: true
    	},{
    		xtype: 'tbtext',
    		id  : 'fstoring',
    		text: 'Something went wrong while saving the experiment in the Clearing House. Please, contact the system administrator.',
    		style: {
                marginTop: '4px',
                'font-weight': 'bold'
            },
            hidden: true
    	},'->',{
    		id: 'chcolor',
    		disabled: true,
    		text: 'Choose a color',
            menu: Ext.create('Ext.menu.ColorPicker', {pickerId: 'fillcolor', value: '000000'})
    	},{
    		xtype     : 'textfield',
    		disabled: true,
    		id        : 'saveexperiment',
    		fieldLabel: 'Experiment Name',
    		maxLength : 256,
    		labelWidth: 120
    	},'-',{
    		xtype     : 'button',
    		disabled: true,
    		id        : 'storech',
    		text      : 'Store in the Clearing House'
    	}]
    }],*/
    layout: 'fit'
});
