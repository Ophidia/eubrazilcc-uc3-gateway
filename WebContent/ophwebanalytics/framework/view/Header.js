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

Ext.define('OphWebAnalytics.view.Header', {
	extend: 'Ext.panel.Panel',

	layout: {
		align: 'stretch',
		type : 'hbox'
	},
	border: false,
	region: 'north',
	cls   : 'header-background',
	height: 75,
	items : [{
		xtype : 'box',
		flex  : 10,
		border: false,
    	autoEl: {
    		tag : 'div',
    		html:'<img src="images/logo.png" width="45%"/>'
    	}
	},{
		xtype: 'panel',
		width : 80,
		border: false,
		bodyPadding: '25 10 0 0',
		items : [{
			xtype : 'button',
			text  : 'Sign out',
			id    : 'logout'
		}]
	}]
});
