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

public class JobBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer id              = null;
	private Integer idjob           = null;
	private Integer idexperiment    = null;
	private String model            = null;
	private String mcodename        = null;
	private String scenario         = null;
	private String scodename        = null;
	private String indicator        = null;
	private String icodename        = null;
	private String boundingbox      = null;
	private String timerange        = null;
	private String startdate        = null;
	private String status           = null;
	private String chstatus         = null;
	private String datacubedoi      = null;
	private String experimentstatus = null;
	private String typeofsource     = null;
	private String filename         = null;
	private Integer available       = null;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIdjob() {
		return idjob;
	}
	public void setIdjob(Integer idjob) {
		this.idjob = idjob;
	}
	public Integer getIdexperiment() {
		return idexperiment;
	}
	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getMcodename() {
		return mcodename;
	}
	public void setMcodename(String mcodename) {
		this.mcodename = mcodename;
	}
	public String getScenario() {
		return scenario;
	}
	public void setScenario(String scenario) {
		this.scenario = scenario;
	}
	public String getScodename() {
		return scodename;
	}
	public void setScodename(String scodename) {
		this.scodename = scodename;
	}
	public String getIndicator() {
		return indicator;
	}
	public void setIndicator(String indicator) {
		this.indicator = indicator;
	}
	public String getIcodename() {
		return icodename;
	}
	public void setIcodename(String icodename) {
		this.icodename = icodename;
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
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getChstatus() {
		return chstatus;
	}
	public void setChstatus(String chstatus) {
		this.chstatus = chstatus;
	}
	public String getDatacubedoi() {
		return datacubedoi;
	}
	public void setDatacubedoi(String datacubedoi) {
		this.datacubedoi = datacubedoi;
	}
	public String getExperimentstatus() {
		return experimentstatus;
	}
	public void setExperimentstatus(String experimentstatus) {
		this.experimentstatus = experimentstatus;
	}
	public String getTypeofsource() {
		return typeofsource;
	}
	public void setTypeofsource(String typeofsource) {
		this.typeofsource = typeofsource;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public Integer getAvailable() {
		return available;
	}
	public void setAvailable(Integer available) {
		this.available = available;
	}
	
}