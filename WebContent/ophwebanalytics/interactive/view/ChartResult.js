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

Ext.define('Interactive.view.ChartResult', {
    extend: 'Ext.chart.Chart',
   
    style  : 'background:#fff',
    animate: true,
    shadow : true,
	theme: 'Category1',
    axes: [{
       type    : 'Numeric',
       position: 'left',
       fields  : ['measure', 'regression'],
       title   : 'Measure',
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
       /*label: {
         display: 'insideEnd',
         'text-anchor': 'middle',
           field: 'measure',
           renderer: Ext.util.Format.numberRenderer('0.0'),
           orientation: 'vertical',
           color: '#333'
       },*/
       xField: 'time',
       yField: 'measure',
       markerConfig: {
    	   type: 'cross',
    	   size: 3
       }
    },{
        type: 'line',
        axis: 'left',
        smooth: true,
        fill: true,
        fillOpacity: 0.5,
        xField: 'time',
        yField: 'regression'
    }]
});
