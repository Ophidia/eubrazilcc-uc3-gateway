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

Ext.define('Admin.view.ExperimentByType', {
    extend: 'Ext.chart.Chart',
   
    alias: 'widget.exptype',
    id: 'exptype',
    animate: true,
    shadow: true,
    theme: 'Category1',
    store: Ext.create('Admin.store.ExpTypeStore'),
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['total'],
        grid: true
    }, {
        type: 'Category',
        position: 'left',
        fields: ['expname'],
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        highlight: true,
        tips: {
          trackMouse: true,
          width: 280,
          height: 28,
          renderer: function(storeItem, item) {
            this.setTitle(storeItem.get('expname') + ': ' + storeItem.get('total'));
          }
        },
        label: {
            display: 'insideEnd',
              field: 'total',
              renderer: Ext.util.Format.numberRenderer('0'),
              orientation: 'horizontal',
              color: '#333',
            'text-anchor': 'middle'
          },
        xField: 'expname',
        yField: ['total']
    }]
});
