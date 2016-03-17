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

Ext.define('Admin.view.AdminTabPanel', {
    extend: 'Ext.tab.Panel',
   
    alias: 'widget.admintab',
    id: 'admintab',
    
	title : 'Administration',
	tabPosition: 'left',
	border: false,
	frame: false,
	items : [
        {
        	xtype : 'panel',
        	id: 'resourcemngt',
        	title: 'Resource Management',
			layout: {
    			type : 'vbox',
    			align: 'stretch'
    		},
    		items: [{
	    				xtype: 'panel',
		    			layout: {
			    			type : 'hbox',
			    			align: 'stretch'
			    		},
			    		flex: 1,
			    		items: [{
		    				xtype: 'panel',
		    				id: 'historychart',
				    		flex: 1.5,
				    		layout: 'fit',				    		
				    		title: 'Cluster History',
				    		titleAlign: 'center',
				    		items: []
		    			},
		    			{
		    				xtype: 'panel',
		    				id: 'currentchart',
				    		flex: 1,
				    		layout: 'fit',
				    		title: 'Cluster Current',
				    		titleAlign: 'center',
				    		items: []
		    			}] 
	    			},
	    			{
	    				xtype: 'panel',
		    			layout: {
			    			type : 'hbox',
			    			align: 'stretch'
			    		},
			    		flex: 1,
			    		items: [{
		    				xtype: 'panel',
		    				id: 'experimentbytype',
				    		flex: 1,
				    		layout: 'fit',
/*				    	    tools: [
			    	    	  	{
			    	    	    	id: 'expbytyperefresh',
			    	    	  	    type: 'refresh',
			    	    	  	    tooltip: 'Refresh'
			    	    	  	}],*/
				    		title: 'Experiment by Type',
				    		titleAlign: 'center'
		    			},
		    			{
		    				xtype: 'panel',
		    				id: 'experimentbytypepie',
				    		flex: 1,
				    		layout: 'fit',
/*				    	    tools: [
			    	    	  	{
			    	    	    	id: 'expbytypepierefresh',
			    	    	  	    type: 'refresh',
			    	    	  	    tooltip: 'Refresh'
			    	    	  	}],*/
				    		title: 'Experiment by Type (Pie)',
				    		titleAlign: 'center'
		    			},
		    			{
		    				xtype: 'panel',
		    				id: 'expstatistics',
				    		flex: 1,
				    		layout: 'fit',
/*				    	    tools: [
			    	    	  	{
			    	    	    	id: 'expstatisticsrefresh',
			    	    	  	    type: 'refresh',
			    	    	  	    tooltip: 'Refresh'
			    	    	  	}],*/
				    		title: 'Experiments Status Info',
				    		titleAlign: 'center'
		    			},
		    			{
		    				xtype: 'panel',
		    				id: 'expstatisticspie',
				    		flex: 1,
				    		layout: 'fit',
				    	    tools: [
			    	    	  	{
			    	    	    	id: 'expstatisticspierefresh',
			    	    	  	    type: 'refresh',
			    	    	  	    tooltip: 'Refresh'
			    	    	  	}],
				    		title: 'Experiments Status Info (Pie)',
			    			titleAlign: 'center'
		    			},] 
	    			},]
		},
		{
			xtype : 'panel',
			title: 'User Management',
			id: 'usermngt',
			items: []
		}]
});
