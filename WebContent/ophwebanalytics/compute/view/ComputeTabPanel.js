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

Ext.define('Compute.view.ComputeTabPanel', {
    extend: 'Ext.panel.Panel',
   
    alias: 'widget.computetab',
    
	title : 'Compute',
	layout: 'border',
	items : [{
		xtype: 'tabpanel',
		id    : 'exptabpanel',
		region: 'west',
		border: false,
		width : 320,
		tabPosition: 'left',
		layout: 'fit',
		items: [		
		{
			xtype : 'panel',
			id    : 'interannualexperimentpanel',
			title : 'SEBAL Interannual Analysis',
			border: false,
			layout: 'fit'
		},
		{
			xtype : 'panel',
			id    : 'omexperimentpanel',
			title : 'Ecological Niche Modelling',
			border: false,
			layout: 'fit'
		},
		{
			xtype : 'panel',
			id    : 'climateanalysisexperimentpanel',
			title : 'Climate Model Intercomparison',
			layout: 'fit',
			border: false
		},
		{
			xtype : 'panel',
			id    : 'clisebexperimentpanel',
			title : 'Climate-SEBAL Intercomparison',
			border: false,
			layout: 'fit'
		},
		{
			xtype : 'panel',
			id    : 'relativeheightpanel',
			title : 'Relative Height Analysis',
			border: false,
			layout: 'fit'
		},
		{
			xtype : 'panel',
			id    : 'lidarmetricsintercomparisonpanel',
			title : 'LiDAR Products Intercomparison',
			border: false,
			layout: 'fit'
		}]
	},{
		xtype : 'panel',
		region: 'center',
		border: false,
		flex  : 3,
		layout: {
			type : 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype : 'panel',
			layout: 'fit',
			flex  : 3,
			id    : 'computemappanel'
		},{
			xtype : 'panel',
			id    : 'computeexperiment',
			flex  : 2,
			layout: 'fit'
		}]
	}]
});
