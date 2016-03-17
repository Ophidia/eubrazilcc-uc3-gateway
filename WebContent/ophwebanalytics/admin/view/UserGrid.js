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

Ext.define('Admin.view.UserGrid', {
    extend: 'Ext.grid.Panel',
   
    alias: 'widget.usergrid',
    id: 'usergrid',
    
	title : 'User Management',
    tools: [
	  	{
	    	id     : 'usersrefresh',
	  	    type   : 'refresh',
	  	    tooltip: 'Refresh users list'
	  	}],
    store: Ext.create('Admin.store.UserStore'),
    columns: [{text: 'First Name',           flex: 1,     dataIndex: 'firstname'},
              {text: 'Last Name',            flex: 1,     dataIndex: 'lastname'},
              {text: 'Email',                flex: 1,     dataIndex: 'email'},
              {text: 'Organization Name',    flex: 1,     dataIndex: 'orgname'},
              {text: 'Organization Type',  	 flex: 1,     dataIndex: 'orgtype'},
              {text: 'User Type',  		     flex: 1,     dataIndex: 'type',
            	  renderer: function (val, m) {
	          		  if (val == 'admin') 			  return 'Administrator';
	          		  else if (val == 'data_admin')   return 'Data Administrator';
	          		  else if (val == 'sci_admin')    return 'Scientific Administrator';
	          		  else if (val == 'user') 		  return 'User';
            	  }
              },
              {text: 'Status',               flex: 1,     dataIndex: 'status',
            	  renderer: function (val, m) {
	          		  if (val == 0) 		          return 'Disabled';
	          		  else if (val == 1)              return 'Enabled';
            	  }
              }, 
              
		      {xtype: 'actioncolumn', text: 'Enable/Disable', flex: 0.5, sortable: false, menuDisabled: true, align: 'center',
		    	   items: [{
		    		   icon: 'images/user.png',
		    		   tooltip: 'Enable/Disable user',
		    		   scope: this,
		    		   handler: function (grid, rowindex, colindex) {
		    			   var iduser = grid.getStore().getAt(rowindex).get('iduser');
		    			   var status = grid.getStore().getAt(rowindex).get('status');
		    			   OphWebAnalytics.app.getController('Admin.controller.Controller').enableDisableUser(iduser, status);
		    		   }
		    	   }]
		      },
              
/*              {header: '', flex: 0.5, sortable: false, dataIndex: 'status',
            	  renderer: function(val){ 
            		  	if (val == 0)  return '<input type="button" value="Enable" id="'+val+'"/>';  
            		  	else if (val == 1 )   return '<input type="button" value="Disable" id="'+val+'"/>';  
            	  },
	    		  handler: function (grid, rowindex, colindex) {
	    			   var iduser = grid.getStore().getAt(rowindex).get('iduser');
	    			   var status = grid.getStore().getAt(rowindex).get('status');
	    			   
	    			   alert(iduser + ' ' + status);
	    			   OphWebAnalytics.app.getController('Admin.controller.Controller').enableDisableUser(iduser, status);
	    		   }
              },*/
              
/*              {
                  xtype: 'actioncolumn',
                  flex: 0.5,
                  dataIndex: 'status',
            	  renderer: function (val) {
	            	  var result = '';
	            	  if (val == 0)
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-yes.png"/></center>';
	            	  else if (val == 1)
	            		  result = '<center><img src="ophwebanalytics/compute/resources/drop-no.png"/></center>';
	            	  return result;
            	  },
                  handler: function(grid, rowIndex, colIndex) {
	    			   //var iduser = grid.getStore().getAt(rowindex).get('iduser');
	    			   var status = grid.getStore().getAt(rowindex).get('status');
	    			   alert(status);
	    			   
	    			   alert(iduser + ' ' + status);
	    			   
	    			   OphWebAnalytics.app.getController('Admin.controller.Controller').enableDisableUser(iduser, status);
    			       if (status == 0) {
	                       alert("Enable!!!");
	    			   }
	    			   else if (status == 1){
	                       alert("Disable!!!");
	    			   }
                  }
              },*/
              
                            

              {text: 'User ID',   flex: 1, dataIndex: 'iduser', hidden: true}]
});
