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

public class DatasetBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String coordinate    = null;
	private String filename      = null;
	private String tipeofdataset = null;
	private Double xmin          = null;
	private Double xmax          = null;
	private Double ymin          = null;
	private Double ymax          = null;
	
	public String getCoordinate() {
		return coordinate;
	}
	public void setCoordinate(String coordinate) {
		this.coordinate = coordinate;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getTipeofdataset() {
		return tipeofdataset;
	}
	public void setTipeofdataset(String tipeofdataset) {
		this.tipeofdataset = tipeofdataset;
	}
	public Double getXmin() {
		return xmin;
	}
	public void setXmin(Double xmin) {
		this.xmin = xmin;
	}
	public Double getXmax() {
		return xmax;
	}
	public void setXmax(Double xmax) {
		this.xmax = xmax;
	}
	public Double getYmin() {
		return ymin;
	}
	public void setYmin(Double ymin) {
		this.ymin = ymin;
	}
	public Double getYmax() {
		return ymax;
	}
	public void setYmax(Double ymax) {
		this.ymax = ymax;
	}
}
