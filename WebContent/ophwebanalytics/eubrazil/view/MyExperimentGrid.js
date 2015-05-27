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

Ext.define('Eubrazil.view.MyExperimentGrid',{
	extend: 'Ext.grid.Panel',
	
	alias: 'widget.myexpgrid',
	flex : 3,
    store: Ext.create('Eubrazil.store.MyExperimentStore'),
    tools: [{
    	id     : 'experimentsrefresh',
  	    type   : 'refresh',
  	    tooltip: 'Refresh experiments list'
  	}],
    columns: [{text: 'Experiment ID', flex: 1, dataIndex: 'experimentname'},
              {text: 'Date',          flex: 2, dataIndex: 'submissiondate'},
              {text: 'Progress',      flex: 1, dataIndex: 'status',
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
	            	  if (val == 'failed') {
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
              	  }
              },
              {text: 'Status',        flex: 1, dataIndex: 'status',
            	  renderer: function (val) {
	            	  var result = '';
	            	  if (val == 'done')
	            		  result = '<img src="ophwebanalytics/eubrazil/resources/icons/drop-yes.gif"/>';
	            	  else if (val == 'failed')
	            		  result = '<img src="ophwebanalytics/eubrazil/resources/icons/error_16.png"/>';
	            	  return result;
              }},
              {text: 'Experiment ID',   flex: 1, dataIndex: 'idexperiment', hidden: true}]
});