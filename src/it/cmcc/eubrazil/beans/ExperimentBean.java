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

public class ExperimentBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment   = null;
	private String  experimenttype = null;
	private String  submissiondate = null;
	private String  status         = null;
	private Integer stored         = null;
	private String  name           = null;
	private String  fillColor      = null;
	private Double  xmin           = null;
	private Double  xmax           = null;
	private Double  ymin           = null;
	private Double  ymax           = null;
	private String  timemin        = null;
	private String  timemax        = null;
	private String  deleted        = null;
	
	public Integer getIdexperiment() {
		return idexperiment;
	}
	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}
	public String getExperimenttype() {
		return experimenttype;
	}
	public void setExperimenttype(String experimenttype) {
		this.experimenttype = experimenttype;
	}
	public String getSubmissiondate() {
		return submissiondate;
	}
	public void setSubmissiondate(String submissiondate) {
		this.submissiondate = submissiondate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getStored() {
		return stored;
	}
	public void setStored(Integer stored) {
		this.stored = stored;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFillColor() {
		return fillColor;
	}
	public void setFillColor(String fillColor) {
		this.fillColor = fillColor;
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
	public String getTimemin() {
		return timemin;
	}
	public void setTimemin(String timemin) {
		this.timemin = timemin;
	}
	public String getTimemax() {
		return timemax;
	}
	public void setTimemax(String timemax) {
		this.timemax = timemax;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
}
