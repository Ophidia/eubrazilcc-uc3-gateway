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

Ext.define('Admin.view.Monitoringpiechart', {
    extend: 'Ext.chart.Chart',
   
    alias: 'widget.piechart',
    
    id: 'piechart',
    animate: true,
    shadow : true,
    legend: {
        position: 'right'
    },
    store: Ext.create('Admin.store.CurrentStatusStore'),
    theme: 'Category5',
    series: [{
        type: 'pie',
        angleField: 'jobsnumber',
        showInLegend: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                var total = 0;
                Ext.getCmp('piechart').getStore().each(function(rec) {
                    total += rec.get('jobsnumber');
                });
                this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('jobsnumber') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        }/*,                
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '14px Arial',
            hideLessThan: 16
        }*/
    }]
});
