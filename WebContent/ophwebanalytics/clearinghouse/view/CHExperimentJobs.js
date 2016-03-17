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

Ext.define('ClearingHouse.view.CHExperimentJobs',{
	extend: 'Ext.grid.Panel',
	
	alias   : 'widget.chjobs',
	id: 'chjobs',

	store   : Ext.create('ClearingHouse.store.CHExperimentJobsStore'),
	title   : 'Experiments',
    flex    : 1,
/*    tools: [{
    	id     : 'chjobsrefresh',
  	    type   : 'refresh',
  	    tooltip: 'Refresh'
  	}],*/
  	viewConfig: {
  	    emptyText: 'There are no records to display'        
  	},
    columns : [//{xtype: 'rownumberer'                                                   },
               {text: 'Exp Id', 	         flex: 1, dataIndex: 'idexperiment'				   },
               {text: 'Experiment type', flex: 3, dataIndex: 'experimenttype',
               	  renderer: function (val, m) {
               		  if (val == 'sebalinterannual') return 'SEBAL Interannual Analysis';
               		  else if (val == 'modelintercomparison') return 'Climate Model Intercomparison Analysis';
               		  else if (val == 'sebalintercomparison') return 'SEBAL Intercomparison Analysis';
               		  else if (val == 'climatesebal') return 'Climate-SEBAL Intercomparison';
               		  else if (val == 'relheight') return 'Relative Height Analysis';
               		  else if (val == 'lidarintercomparison') return 'LiDAR Intercomparison Analysis';
               		  else if (val == 'enm') return 'Ecological Niche Modelling';
               		  
               	  }
               },
               {text: 'Submission Date',     flex: 2, dataIndex: 'submissiondate'},
               {text: 'Time min', 		     flex: 2, dataIndex: 'timemin'},
               {text: 'Time max', 	         flex: 2, dataIndex: 'timemax'},
               {text: 'Lat min',             flex: 2, dataIndex: 'ymin'},
               {text: 'Lat max',     		 flex: 2, dataIndex: 'ymax'},
               {text: 'Lon min',      		 flex: 2, dataIndex: 'xmin'},
               {text: 'Lon max',     		 flex: 2, dataIndex: 'xmax'},
              
/*               {text: 'Download',            width: 100, dataIndex: '',        hidden: true,
            	   renderer: function (val) {
            		   result = '<center><img src="images/download.png" width="20"/></center>';
            		   return result;
            	   }
               }*/
 		      {xtype: 'actioncolumn', flex: 0.5, sortable: false, menuDisabled: true, align: 'center',
		    	   items: [{
		    		   icon: 'images/delete1.jpg',
		    		   tooltip: 'Delete experiment',
		    		   scope: this,
		    		   handler: function (grid, rowindex, colindex) {
		    			   var idexperiment = grid.getStore().getAt(rowindex).get('idexperiment');
		    			   OphWebAnalytics.app.getController('ClearingHouse.controller.Controller').deleteExperiment(idexperiment);
		    		   }
		    	   }]
		      },
               ]
});
