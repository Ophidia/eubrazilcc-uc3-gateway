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

Ext.define('ClearingHouse.view.CHExperimentGrid',{
	extend: 'Ext.grid.Panel',
	
	alias: 'widget.chexpgrid',
	flex : 3,
	title: 'Clearing House Experiments',
    store: Ext.create('ClearingHouse.store.CHExperimentStore'),
    tools: [{
    	id     : 'chexperimentsrefresh',
  	    type   : 'refresh',
  	    tooltip: 'Refresh CH experiments list'
  	}],
  	viewConfig: {
  	    emptyText: 'There are no records to display'        
  	},
    columns: [{text: 'Experiment Name', flex: 1,   dataIndex: 'name'},
              {text: 'Date',            flex: 1.5, dataIndex: 'submissiondate'},
              /*{text: 'Progress',        flex: 1,   dataIndex: 'chstatus',
            	  renderer: function (val, m) {
	            	  if (val == 'request') {
	            		  var tmpValue = m;
		                  var tmpText = "";
		                  
		                  var progressRenderer = (function (pValue, pText) {
		                      var b = new Ext.ProgressBar();
		                      
		                      return function(pValue, pText) {
		                    	  var pValue = 0.33;
		                    	  var pText = 'Request...';
		                    	  
		                          b.updateProgress(pValue, pText, true);
		                          return Ext.DomHelper.markup(b.getRenderTree());
		                      };
		                  })(tmpValue, tmpText);
		                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'saving') {
	            		  var tmpValue = m;
			                  var tmpText = "";
			                  
			                  var progressRenderer = (function (pValue, pText) {
			                      var b = new Ext.ProgressBar();
			                      
			                      return function(pValue, pText) {
			                    	  var pValue = 0.66;
			                    	  var pText = 'Saving...';
			                    	  
			                          b.updateProgress(pValue, pText, true);
			                          return Ext.DomHelper.markup(b.getRenderTree());
			                      };
			                  })(tmpValue, tmpText);
			                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  else if (val == 'stored'){
	            		  var tmpValue = m;
			                  var tmpText = "";
			                  
			                  var progressRenderer = (function (pValue, pText) {
			                      var b = new Ext.ProgressBar();
			                      
			                      return function(pValue, pText) {
			                    	  var pValue = 1;
			                    	  var pText = 'Stored';
			                    	  
			                          b.updateProgress(pValue, pText, true);
			                          return Ext.DomHelper.markup(b.getRenderTree());
			                      };
			                  })(tmpValue, tmpText);
			                  return progressRenderer(tmpValue, tmpText);
	            	  }
	            	  if (val == 'request failed') {
	            		  var tmpValue = m;
			                  var tmpText = "";
			                  
			                  var progressRenderer = (function (pValue, pText) {
			                      var b = new Ext.ProgressBar();
			                      
			                      return function(pValue, pText) {
			                    	  var pValue = 1;
			                    	  var pText = 'Request failed';
			                    	  
			                          b.updateProgress(pValue, pText, true);
			                          return Ext.DomHelper.markup(b.getRenderTree());
			                      };
			                  })(tmpValue, tmpText);
			                  return progressRenderer(tmpValue, tmpText);
	            	  }
              	  }
              },
              {text: 'Status', flex: 0.5, dataIndex: 'chstatus',
            	  renderer: function (val) {
	            	  var result = '';
	            	  if (val == 'stored')
	            		  result = '<img src="ophwebanalytics/eubrazil/resources/icons/drop-yes.gif"/>';
	            	  else if (val == 'request failed')
	            		  result = '<img src="ophwebanalytics/eubrazil/resources/icons/error_16.png"/>';
	            	  return result;
              }},*/
              {text: 'Map',             flex: 0.7, dataIndex: 'fillColor', renderer: function (val) {
            	  var result = '';
            		  result = '<center><svg width="50" height="15"><rect width="50" height="15" style="fill:' + val + ';fill-opacity:0.35;stroke-width:3;stroke:' + val + ';stroke-opacity:0.8" /></svg></center>';
            		  return result;

              }},
              {text: 'Experiment ID', flex: 1, dataIndex: 'idexperiment', hidden: true}]
});
