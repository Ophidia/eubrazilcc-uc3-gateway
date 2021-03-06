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

Ext.define('Admin.view.ExperimentStatsPie', {
    extend: 'Ext.chart.Chart',
   
    alias: 'widget.expstatspie',
    
    id: 'expstatspie',
    animate: true,
    shadow : true,
    width: 100,
    height: 100,
/*    legend: {
        position: 'right'
    },*/
    store: Ext.create('Admin.store.ExpStatsStore'),
    theme: 'Category5',
    series: [{
        type: 'pie',
        angleField: 'total',
        showInLegend: true,
        label: {
            field: 'expstat',
            renderer: function(value, label, storeItem) {
                return storeItem.get('total');
            }
        },
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                var total = 0;
                Ext.getCmp('expstatspie').getStore().each(function(rec) {
                    total += rec.get('total');
                });
                this.setTitle(storeItem.get('expstat') + ': ' + Math.round(storeItem.get('total') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'expstat',
            display: 'rotate',
            contrast: true,
            font: '14px Arial',
            hideLessThan: 16
        }
    }]
});
