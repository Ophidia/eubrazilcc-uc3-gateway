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

Ext.define('Interactive.view.InteractiveStatsGrid',{
	extend: 'Ext.grid.Panel',
	
	alias: 'widget.statsgrid',
	viewConfig: {
  	    emptyText: 'There are no records to display'        
  	},
    columns: [{text: 'Statistic name',  flex: 2, dataIndex: 'name'},
              {text: 'Value', flex: 1, dataIndex: 'value'}]
});
