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

Ext.define('OphWebAnalytics.view.LoginTabPanel', {
    extend: 'Ext.panel.Panel',
    
    requires: ['Ext.ux.layout.Center'],
    
    alias: 'widget.logintab',
    
	title: 'Home',
	autoScroll: true,
	layout: {
		align: 'stretch',
		type : 'vbox'
	},
	items: [{
		xtype : 'panel',
		height: 200,
		border: false,
		padding: 15,
		layout: 'ux.center',
		bodyStyle: {
		    background: '#FFFFFF'
		},
		items: [{
			xtype : 'panel',
			width: '50%',
			border: false,
			items : [
		         Ext.create('OphWebAnalytics.view.LoginPanel', {
		        	 title: 'Login'
		          })]
		}]
	},{
    	xtype : 'panel',
    	height: 310,
		padding: 15,
		bodyStyle: {
		    background: '#FFFFFF'
		},
		border: false,
		layout: 'ux.center',
		items: [Ext.create('OphWebAnalytics.view.RegisterPanel', {
        	flex: 1
        })]
    },{
    	xtype : 'panel',
    	height: 150,
    	bodyPadding: 30,
		bodyStyle: {
		    background: '#FFFFFF'
		},
		border: false,
		html: '<center><img src="images/logo_01.png" width="50%" height="50%"/><br><br><center><img src="images/logo_02.png" width="30%" height="30%"/>'
    }]
});
