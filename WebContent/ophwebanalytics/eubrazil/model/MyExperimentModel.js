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

Ext.define('Eubrazil.model.MyExperimentModel', {
	extend: 'Ext.data.Model',

	fields: [{name: 'idexperiment',   type: 'string'},
	         {name: 'boundingbox',    type: 'string'},
	         {name: 'timerange',      type: 'string'},
	         {name: 'status',	      type: 'string'},
	         {name: 'compglobaldata', type: 'string'},
	         {name: 'submissiondate', type: 'string'},
	         {name: 'experimentname', type: 'string'},
	         {name: 'indicators',     type: 'string'},
	         {name: 'scenarios',      type: 'string'},
	         {name: 'models',         type: 'string'},
	         {name: 'chstatus',	      type: 'string'},
	         {name: 'color',          type: 'string'}]
});