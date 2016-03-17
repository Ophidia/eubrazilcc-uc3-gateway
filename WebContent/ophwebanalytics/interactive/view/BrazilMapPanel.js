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

Ext.define('Interactive.view.BrazilMapPanel', {
    extend: 'Ext.ux.GMapPanel',
    
    alias: 'widget.interactiveeumap',
    
    id         : 'interactiveeumap',
    border     : false,
	gmapType   : 'terrain',
	mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
	mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
	mapOptions : {
        zoom: 4
	},
	center      : {
		geoCodeAddr: 'Brazil'
	}
});
