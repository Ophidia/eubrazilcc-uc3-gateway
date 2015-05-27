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

Ext.define('Eubrazil.view.ChartResult', {
    extend: 'Ext.chart.Chart',
   
    alias: 'widget.chartresult',
    flex : 2,
    closable: true,
    style  : 'background:#fff',
    animate: true,
    shadow : true,
    theme  : 'Green',
    axes: [{
           type    : 'Numeric',
           position: 'left',
           fields  : ['measure'],
           title   : 'Indicator',
           grid    : true
       },
       {
           type: 'Category',
           position: 'bottom',
           fields: ['time'],
           title: 'Time'
       }],
       series: [{
           type: 'column',
           axis: 'left',
           highlight: true,
           label: {
             display: 'insideEnd',
             'text-anchor': 'middle',
               field: 'measure',
               renderer: Ext.util.Format.numberRenderer('0.0'),
               orientation: 'vertical',
               color: '#333'
           },
           xField: 'time',
           yField: 'measure'
       }]
});