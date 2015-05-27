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

Ext.define('Eubrazil.view.ExploreCubeOutput', {
	extend: 'Ext.grid.GridPanel',
    
	alias: 'widget.expcubeoutput',
	
    title      : 'Loading...',
    flex       : 1,
    closable   : true,
    dockedItems: [
		{
		    xtype: 'toolbar',
		    dock : 'top',
		    items: [
		       '->',
		       {
		    	   xtype         : 'numberfield',
		           id            : 'exp_limit_filter',
		           disabled      : true,
		           fieldLabel    : 'Max # of lines',
		           labelAlign    : 'right',
		           emptyText     : 'Values from 1 to 500, default 10',
		           width         : 325,
		           minValue      : 1,
		           maxValue      : 500
		       },
		       '-',
		       {
		           xtype            : 'textfield',
		           id               : 'exp_subset_dims',
		           disabled      : true,
		           emptyText        : 'Example: lat|time',
		           fieldLabel       : 'Subsetting dims',
		           labelAlign       : 'right',
		           labelWidth       : 120,
		           afterLabelTextTpl: '<img src="extjs/examples/shared/icons/fam/information.png" class="info_image" data-qtip="Dimension names of the datacube used for the subsetting.<br>List of dimensions separated by \'|\' can be provided.<br>Must be the same number of \'Subsetting filter\'.<br>Example: \'lat|lon\' or simply \'lat\'"></img>'
		       },
		       {
		           xtype            : 'textfield',
		           id               : 'exp_subset_filter',
		           disabled      : true,
		           emptyText        : 'Example: 1:10|1:30',
		           fieldLabel       : 'Subsetting filter',
		           labelAlign       : 'right',
		           labelWidth       : 120,
		           afterLabelTextTpl: '<img src="extjs/examples/shared/icons/fam/information.png" class="info_image" data-qtip="Enumeration of comma-separated elementary filters (1 series of filters for each dimension).<br>\'start_value\' single value specifying the start of the subset.<br>\'start_value:stop_value\': select elements from start_value to stop_value. Return an error if this set is empty.<br>Values should be numbers.<br>List of filters separated by \'|\' can be provided; it must be the same number of \'Subsetting dims\'.<br>Example: \'1:10|20:30\' or \'1:10\'"></img>'
		       },
		       '-',
		       {
		    	   text: 'Submit',
		    	   disabled      : true,
		    	   id  : 'exp_subsetfilters',
		       },
		       {
		    	   text: 'Clean fields',
		    	   disabled      : true,
		    	   id  : 'exp_cleanfields',
		       }
		    ]
		}
    ],
    
    columns: [],
    
    reconfigure: function(title, grid, model, data) {
    	var newstore = Ext.create('Ext.data.Store', {
		    fields: model,
		    data  : data,
		    reader: {
	            type: 'json',
	            root: 'root'
	        }
		});
		if (this.lockable) {
			this.reconfigureLockable(newstore, grid);
		} else {
			if (grid) {
				var checkgrid = [];
				for (i in grid){
					checkgrid.push(grid[i]);
				}
				this.headerCt.suspendLayout = true;
				this.headerCt.removeAll();
				this.headerCt.add(checkgrid);
			}
			if (newstore) {
				newstore = Ext.StoreManager.lookup(newstore);
				this.bindStore(newstore);
			} else {
				this.getView().refresh();
			}
			if (grid) {
				this.headerCt.suspendLayout = false;
				this.forceComponentLayout();
			}
		}
		this.fireEvent('reconfigure', this);
	}
});

