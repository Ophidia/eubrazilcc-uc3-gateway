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

Ext.define('Eubrazil.view.Monitoringstackedchart', {
    extend: 'Ext.chart.Chart',
   
    alias: 'widget.stackedchart',
    animate: true,
    shadow: true,
    theme: 'Category3',
    store: Ext.create('Eubrazil.store.HistoryStore'),
    legend: {
        position: 'bottom'
    },
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: ['jobqueue1', 'jobqueue2', 'jobqueue3'],
        title: false,
        grid: true
    },{
        type: 'Category',
        position: 'bottom',
        fields: ['time'],
        title: false
    }],
    series: [{
        type: 'column',
        axis: 'left',
        gutter: 45,
        xField: 'time',
        yField: ['jobqueue1', 'jobqueue2', 'jobqueue3'],
        stacked: true,
        tips: {
            trackMouse: true,
            width: 100,
            height: 28,
            renderer: function(storeItem, item) {
                this.setTitle(String(item.value[0] + ': ' + item.value[1] + ' jobs'));
            }
        }
    }]
});