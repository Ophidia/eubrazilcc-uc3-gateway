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

Ext.define('Eubrazil.model.MyExperimentJobsModel', {
	extend: 'Ext.data.Model',

	fields: [{name: 'id',   	        type: 'string'},
	         {name: 'idjob',   	        type: 'string'},
	         {name: 'idexperiment',     type: 'string'},
	         {name: 'model',    	    type: 'string'},
	         {name: 'scenario',   	    type: 'string'},
	         {name: 'indicator',        type: 'string'},
	         {name: 'boundingbox',      type: 'string'},
	         {name: 'timerange',        type: 'string'},
	         {name: 'startdate',        type: 'string'},
	         {name: 'status',           type: 'string'},
	         {name: 'chstatus',         type: 'string'},
	         {name: 'datacubedoi',      type: 'string'},
	         {name: 'experimentstatus', type: 'string'},
	         {name: 'typeofsource',     type: 'string'},
	         {name: 'mcodename',        type: 'string'},
	         {name: 'scodename',        type: 'string'},
	         {name: 'filename',         type: 'string'},
	         {name: 'available',        type: 'string'},
	         {name: 'icodename',        type: 'string'}]
});