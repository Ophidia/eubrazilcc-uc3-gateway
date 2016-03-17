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

Ext.define('ExpDetails.view.ExperimentJobs',{
	extend: 'Ext.grid.Panel',
	
	alias   : 'widget.expdetailsjobs',

	store   : Ext.create('ExpDetails.store.ExperimentJobsStore'),
	title   : 'Experiment Results',
    flex    : 1,
    columnLines: true,
    selType : 'checkboxmodel',
    /*tools: [{
    	id     : 'detailjobsrefresh',
  	    type   : 'refresh',
  	    tooltip: 'Refresh jobs list'
  	}],*/
  	viewConfig: {
  	    emptyText: 'There are no records to display'        
  	},
  	plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
            '<p><b>Bounding box (lat|lon):</b> {latrange}|{lonrange}</p>',
            '<p><b>Time range:</b> {timerange}</p><br>')
    }],
    dockedItems: [{
    	xtype    : 'toolbar',
    	items  : [{
    		xtype     : 'button',
    		id        : 'newchart',
    		text      : 'New intercoparison chart'
    	}]
    }],
    columns : [{xtype: 'rownumberer'                                                   },
               {text: 'Id', 	         flex: 1,   dataIndex: 'id',         hidden: true},
               {text: 'Id Job', 	     flex: 1,   dataIndex: 'idjob',      hidden: true},
               {text: 'Indicator', 	     flex: 1.5, dataIndex: 'indicator'               },
               {text: 'Source', 	     flex: 1.5, dataIndex: 'source'                  },
               {text: 'Detail', 	     flex: 1.5, dataIndex: 'detail'                  },
               {text: 'Status',          flex: 1,   dataIndex: 'status',
        		   renderer: function (val) {
	             	  var result = '';
	             	  if (val == 'done')
	             		  result = '<center><img src="ophwebanalytics/expdetails/resources/drop-yes.png"/></center>';
	             	  else if (val == 'failed' || val == 'nodata')
	             		  result = '<center><img src="ophwebanalytics/expdetails/resources/drop-no.png"/></center>';
	             	  return result;
        	   }},
        	   {text: 'Stored', flex: 1, dataIndex: 'stored',
             	  renderer: function (val) {
 	            	  var result = '';
 	            	  if (val == 0)
 	            		  result = '';
 	            	  else if (val == 1)
 	            		  result = '<center>Saving...</center>';
 	            	  else if (val == 2)
 	            		  result = '<center><img src="ophwebanalytics/expdetails/resources/drop-yes.png"/></center>';
 	            	  else if (val == 3)
 	            		  result = '<center><img src="ophwebanalytics/expdetails/resources/drop-no.png"/></center>';
 	            	  return result;
               }},
               {text: 'Download',        flex: 1, dataIndex: '',           hidden: true,
            	   renderer: function (val) {
            		   result = '<center><img src="images/download.png" width="20"/></center>';
            		   return result;
            	   }}]
});
