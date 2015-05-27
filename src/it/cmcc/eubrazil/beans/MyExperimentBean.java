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

package it.cmcc.eubrazil.beans;

import java.io.Serializable;

public class MyExperimentBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment  = null;
	private String boundingbox    = null;
	private String timerange      = null;
	private String status         = null;
	private String compglobaldata = null;
	private String submissiondate = null;
	private String experimentname = null;
	private String indicators     = null;
	private String scenarios      = null;
	private String models         = null;
	private String chstatus       = null;
	private String color          = null;
	
	public Integer getIdexperiment() {
		return idexperiment;
	}
	
	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}
	
	public String getBoundingbox() {
		return boundingbox;
	}
	
	public void setBoundingbox(String boundingbox) {
		this.boundingbox = boundingbox;
	}
	
	public String getTimerange() {
		return timerange;
	}
	
	public void setTimerange(String timerange) {
		this.timerange = timerange;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getCompglobaldata() {
		return compglobaldata;
	}
	
	public void setCompglobaldata(String compglobaldata) {
		this.compglobaldata = compglobaldata;
	}
	
	public String getSubmissiondate() {
		return submissiondate;
	}
	
	public void setSubmissiondate(String submissiondate) {
		this.submissiondate = submissiondate;
	}
	
	public String getExperimentname() {
		return experimentname;
	}
	
	public void setExperimentname(String experimentname) {
		this.experimentname = experimentname;
	}
	
	public String getIndicators() {
		return indicators;
	}
	
	public void setIndicators(String indicators) {
		this.indicators = indicators;
	}
	
	public String getScenarios() {
		return scenarios;
	}
	
	public void setScenarios(String scenarios) {
		this.scenarios = scenarios;
	}
	
	public String getModels() {
		return models;
	}
	
	public void setModels(String models) {
		this.models = models;
	}

	public String getChstatus() {
		return chstatus;
	}

	public void setChstatus(String chstatus) {
		this.chstatus = chstatus;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
}