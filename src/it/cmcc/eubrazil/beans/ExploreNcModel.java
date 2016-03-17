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

package it.cmcc.eubrazil.beans;

import java.io.Serializable;
import java.util.List;

public class ExploreNcModel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String latitude = null;
	private String longitude = null;
	private List<InteractiveIndicatorModel> timeseries = null;
	private List<StatisticsModel> statistics = null;
	
	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public List<InteractiveIndicatorModel> getTimeseries() {
		return timeseries;
	}

	public void setTimeseries(List<InteractiveIndicatorModel> timeseries) {
		this.timeseries = timeseries;
	}

	public List<StatisticsModel> getStatistics() {
		return statistics;
	}

	public void setStatistics(List<StatisticsModel> statistics) {
		this.statistics = statistics;
	}

}
