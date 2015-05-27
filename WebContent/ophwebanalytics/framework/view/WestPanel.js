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

Ext.define('OphWebAnalytics.view.WestPanel' ,{
    extend: 'Ext.panel.Panel',
   
    alias: 'widget.westpanel',
    
    id           : 'westpanel',
	region       : 'west',
	title        : 'Tools',
	stateId      : 'navigation-panel',
	animCollapse : true,
	collapsible  : true,
	split        : true,
	width        : 300,
	minSize      : 175,
	maxSize      : 400,
	layout       : 'accordion',

	initComponent: function() {
        Ext.apply(this, {
            items: [{
            	id    : 'analysis',
                title : 'Analysis',
                border: false,
                layout: {
                	type: 'vbox',
                	align: 'stretch'
                }
            }]
        });
        this.callParent();
    }
});