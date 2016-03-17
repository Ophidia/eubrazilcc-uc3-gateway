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

Ext.define('Compute.view.LidarPanel', {
	extend: 'Ext.form.Panel',
	
	requires: ['Ext.ux.form.MultiSelect'],
	
	alias : 'widget.lidarpanel',
	
	id         : 'lidar',
	autoScroll : true,
	border     : false,
	bodyPadding: 5,
	bodyStyle  : {
	    background: '#E0EBFF'
	},
	layout     : 'form',
	title      : 'Lidar',
	items      : [{
        xtype: 'fieldset',
//        disabled: true,
        flex : 3,
        padding: '5 5 5 5',
        title: 'Vegetation metrics',
        items: [{
            xtype  : 'checkboxgroup',
            id     : 'vegetation',
            columns: 1,
            items  : [{boxLabel: 'DSM',             name: 'DSM'},
                      {boxLabel: 'CHM',             name: 'CHM'},
                      {boxLabel: 'Forest Cover',    name: 'COVER'},
                      {boxLabel: 'AGB',  		    name: 'AGB'},
                      {boxLabel: 'RH 50',           name: 'RH'},
                      {boxLabel: 'Forest Gap',      name: '6', disabled: true},
                      {boxLabel: 'Tree Maps', 	    name: '7', disabled: true},
                      {boxLabel: 'Tree Crowns',     name: '8', disabled: true},
                      {boxLabel: 'Solar Radiation', name: '8', disabled: true}]
        }]
    },{
        xtype: 'fieldset',
//        disabled: true,
        flex : 1,
        padding: '5 5 5 5',
        title: 'Terrain metrics',
        items: [{
            xtype  : 'checkboxgroup',
            id     : 'terrain',
            columns: 1,
            items  : [{boxLabel: 'DTM',         name: 'DTM'},
                      {boxLabel: 'Aspect',      name: 'ASPECT'},
                      {boxLabel: 'Slope Angle', name: 'SLOPE'}]
        }]
    },{
        xtype: 'fieldset',
//        disabled: true,
        flex : 1,
        padding: '5 5 5 5',
        title: 'Lidar data characteristics',
        items: [{
            xtype  : 'checkboxgroup',
            id     : 'pointdensity',
            columns: 1,
            items  : [{boxLabel: 'Point	Density', name: 'PD'}]
        }]
    }/*,{
		xtype: 'panel',
		border: false,
		frame: true,
		html : '<center><font size=2><b>Lidar data are going to be available in August.</b></font></center>'
	}*/]
});
