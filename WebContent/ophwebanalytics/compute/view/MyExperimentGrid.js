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

Ext.define('Compute.view.MyExperimentGrid',{
	extend: 'Ext.grid.Panel',
	
	alias: 'widget.computemyexpgrid',
	id: 'computemyexpgrid',
	title: 'My Experiments',
    store: Ext.create('Compute.store.MyExperimentStore'),
/*    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            { xtype: 'button', text: 'Select all' },
            { xtype: 'button', text: 'Deselect all' },
            { xtype: 'button', text: 'Delete selected' }
        ]
    }],*/
    tools: [
/*            { xtype: 'button', text: 'Select all' },
            { xtype: 'button', text: 'Deselect all' },
            //{ xtype: 'button', text: 'Delete selected' },
  	{
  	    type:'button',
  	    id: 'deleteExp',
  	    tooltip: 'Delete Experiments',
  	    handler: function(event, toolEl, panelHeader) {
  	    }
  	},*/
  	{
    	id     : 'computeexperimentsrefresh',
  	    type   : 'refresh',
  	    tooltip: 'Refresh experiments list'
  	}],
  	viewConfig: {
  	    emptyText: 'There are no records to display'        
  	},
    columns: [//{xtype:'checkcolumn', flex: 0.5, text:'', dataIndex:'removeExp', align:'center'},
              {text: 'ExpID',   flex: 1, dataIndex: 'name'},
              {text: 'Experiment type', flex: 3, dataIndex: 'experimenttype',
              	  renderer: function (val, m) {
              		  if (val == 'sebalinterannual') 			return 'SEBAL Interannual Analysis';
              		  else if (val == 'modelintercomparison')   return 'Climate Model Intercomparison';
              		  else if (val == 'sebalintercomparison')   return 'SEBAL Intercomparison Analysis';
              		  else if (val == 'climatesebal') 			return 'Climate-SEBAL Intercomparison';
              		  else if (val == 'relheight') 				return 'Relative Height Analysis';
              		  else if (val == 'lidarintercomparison') 	return 'LiDAR Products Intercomparison';
              		  else if (val == 'enm') 					return 'Ecological Niche Modelling';
              		  
              	  }
              },
              {text: 'Submission Date', flex: 2, dataIndex: 'submissiondate'},
              {text: 'Time min',  		flex: 1.5, dataIndex: 'timemin'},
              {text: 'Time max',  		flex: 1.5, dataIndex: 'timemax'},
              {text: 'Lat min',   		flex: 1.5, dataIndex: 'ymin'},
              {text: 'Lat max',   		flex: 1.5, dataIndex: 'ymax'},
              {text: 'Lon min',   		flex: 1.5, dataIndex: 'xmin'},
              {text: 'Lon max',   		flex: 1.5, dataIndex: 'xmax'},
              {text: 'Progress',        flex: 2, dataIndex: 'status',
            	  renderer: function (val, m) {
	            	  if (val == 'pending') {
	            		  var tmpValue = m;
		                  var tmpText = "";
		                  
		                  var progressRenderer = (function (pValue, pText) {
		                      var b = new Ext.ProgressBar();
		                      
		                      return function(pValue, pText) {
		                    	  var pValue = 0.33;
		                    	  var pText = 'Pending...';
		                    	  
		                          b.updateProgress(pValue, pText, true);
		                          return Ext.DomHelper.markup(b.getRenderTree());
		                      };
		                  })(tmpValue, tmpText);
		                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'assigned') {
	            		  var tmpValue = m;
		                  var tmpText = "";
		                  
		                  var progressRenderer = (function (pValue, pText) {
		                      var b = new Ext.ProgressBar();
		                      
		                      return function(pValue, pText) {
		                    	  var pValue = 0.33;
		                    	  var pText = 'Pending...';
		                    	  
		                          b.updateProgress(pValue, pText, true);
		                          return Ext.DomHelper.markup(b.getRenderTree());
		                      };
		                  })(tmpValue, tmpText);
		                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'running') {
	            		  var tmpValue = m;
			                  var tmpText = "";
			                  
			                  var progressRenderer = (function (pValue, pText) {
			                      var b = new Ext.ProgressBar();
			                      
			                      return function(pValue, pText) {
			                    	  var pValue = 0.66;
			                    	  var pText = 'Running...';
			                    	  
			                          b.updateProgress(pValue, pText, true);
			                          return Ext.DomHelper.markup(b.getRenderTree());
			                      };
			                  })(tmpValue, tmpText);
			                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'done'){
	            		  var tmpValue = m;
			                  var tmpText = "";
			                  
			                  var progressRenderer = (function (pValue, pText) {
			                      var b = new Ext.ProgressBar();
			                      
			                      return function(pValue, pText) {
			                    	  var pValue = 1;
			                    	  var pText = 'Done';
			                    	  
			                          b.updateProgress(pValue, pText, true);
			                          return Ext.DomHelper.markup(b.getRenderTree());
			                      };
			                  })(tmpValue, tmpText);
			                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'failed') {
	            		  var tmpValue = m;
			                  var tmpText = "";
			                  
			                  var progressRenderer = (function (pValue, pText) {
			                      var b = new Ext.ProgressBar();
			                      
			                      return function(pValue, pText) {
			                    	  var pValue = 1;
			                    	  var pText = 'Failed';
			                    	  
			                          b.updateProgress(pValue, pText, true);
			                          return Ext.DomHelper.markup(b.getRenderTree());
			                      };
			                  })(tmpValue, tmpText);
			                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'nodata') {
	            		  return 'No data';
	            	  }
              	  }
              },
              {text: 'Status',        flex: 1, dataIndex: 'status',
            	  renderer: function (val) {
	            	  var result = '';
	            	  if (val == 'done')
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-yes.png"/></center>';
	            	  else if (val == 'failed' || val == 'nodata')
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-no.png"/></center>';
	            	  return result;
              },
              },
		      {xtype: 'actioncolumn', flex: 0.5, sortable: false, menuDisabled: true, align: 'center',
		    	   items: [{
		    		   icon: 'images/delete1.jpg',
		    		   tooltip: 'Delete experiment',
		    		   scope: this,
		    		   handler: function (grid, rowindex, colindex) {
		    			   var idexperiment = grid.getStore().getAt(rowindex).get('idexperiment');
		    			   var status = grid.getStore().getAt(rowindex).get('status');
		    			   OphWebAnalytics.app.getController('Compute.controller.Controller').deleteExperiment(idexperiment, status);
		    		   }
		    	   }]
		      },
/*              {text: 'Delete',        flex: 1, dataIndex: 'status',
            	  renderer: function (val) {
	            	  var result = '';
	            	  if (val == 'done')
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-yes.png"/></center>';
	            	  else if (val == 'failed' || val == 'nodata')
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-no.png"/></center>';
	            	  return result;
              },
              },*/
              /*{text: 'Stored', flex: 1, dataIndex: 'stored',
            	  renderer: function (val) {
	            	  var result = '';
	            	  if (val == 0)
	            		  result = '';
	            	  else if (val == 1)
	            		  result = '<center>Saving...</center>';
	            	  else if (val == 2)
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-yes.png"/></center>';
	            	  else if (val == 3)
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-no.png"/></center>';
	            	  return result;
              }},*/
              {text: 'Experiment ID',   flex: 1, dataIndex: 'idexperiment', hidden: true}]
});
