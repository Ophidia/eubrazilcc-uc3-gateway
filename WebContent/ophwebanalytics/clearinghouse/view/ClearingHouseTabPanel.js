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

Ext.define('ClearingHouse.view.ClearingHouseTabPanel', {
    extend: 'Ext.panel.Panel',
   
    alias: 'widget.chtab',
    
	title: 'Clearing House',
	layout: 'border',
	items : [{
		xtype : 'panel',
		id    : 'CHpanel',
		region: 'west',
		border: false,
		width : 320,
		title : 'Search filters',
		layout: {
			type : 'vbox',
			align: 'stretch'
		}
	},{
		xtype : 'panel',
		region: 'center',
		border: true,
		flex  : 3,
		layout: {
			type : 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype : 'panel',
			border: false,
			flex  : 3,
			layout: {
				type : 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype : 'panel',
				layout: 'fit',
				flex  : 3,
				id    : 'chmappanel'
			}/*,{
				xtype : 'panel',
				id    : 'chexperiment',
				flex  : 2,
				layout: 'fit'
			}*/]
		},{
			xtype : 'panel',
			id    : 'chresults',
			border: false,
			layout: 'fit',
			flex  : 2
		}]
	}]
});
