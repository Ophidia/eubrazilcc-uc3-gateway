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

public class ExperimentSummary implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment     = null;
	private String  sebalvariable    = null;
	private String  lidartile        = null;
	private String  sebalsensor      = null;
	private String  climatevariable  = null;
	private String  climatemodel     = null;
	private String  climatescenario  = null;
	private String  submissiondate   = null;
	private Double  xmin             = null;
	private Double  xmax             = null;
	private Double  ymin             = null;
	private Double  ymax             = null;
	private String  timemin          = null;
	private String  timemax          = null;
	private String  status           = null;
	private Integer stored           = null;
	private String  downloadresource = null;
	private String  downloadtitle    = null;
	private String  metrics			 = null;
	private String  indicators       = null;
	private String  speciesname      = null;
	private Integer iddataset        = null; 
	
	
	public Integer getIdexperiment() {
		return idexperiment;
	}
	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}
	public String getSebalvariable() {
		return sebalvariable;
	}
	public void setSebalvariable(String sebalvariable) {
		this.sebalvariable = sebalvariable;
	}
	public String getSebalsensor() {
		return sebalsensor;
	}
	public void setSebalsensor(String sebalsensor) {
		this.sebalsensor = sebalsensor;
	}
	public String getClimatevariable() {
		return climatevariable;
	}
	public void setClimatevariable(String climatevariable) {
		this.climatevariable = climatevariable;
	}
	public String getClimatemodel() {
		return climatemodel;
	}
	public void setClimatemodel(String climatemodel) {
		this.climatemodel = climatemodel;
	}
	public String getClimatescenario() {
		return climatescenario;
	}
	public void setClimatescenario(String climatescenario) {
		this.climatescenario = climatescenario;
	}
	public String getSubmissiondate() {
		return submissiondate;
	}
	public void setSubmissiondate(String submissiondate) {
		this.submissiondate = submissiondate;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDownloadresource() {
		return downloadresource;
	}
	public void setDownloadresource(String downloadresource) {
		this.downloadresource = downloadresource;
	}
	public String getDownloadtitle() {
		return downloadtitle;
	}
	public void setDownloadtitle(String downloadtitle) {
		this.downloadtitle = downloadtitle;
	}
	public String getLidartile() {
		return lidartile;
	}
	public void setLidartile(String lidartile) {
		this.lidartile = lidartile;
	}
	public String getMetrics() {
		return metrics;
	}
	public void setMetrics(String metrics) {
		this.metrics = metrics;
	}
	public String getIndicators() {
		return indicators;
	}
	public void setIndicators(String indicators) {
		this.indicators = indicators;
	}
	public Integer getStored() {
		return stored;
	}
	public void setStored(Integer stored) {
		this.stored = stored;
	}
	public String getSpeciesname() {
		return speciesname;
	}
	public void setSpeciesname(String speciesname) {
		this.speciesname = speciesname;
	}
	public Integer getIddataset() {
		return iddataset;
	}
	public void setIddataset(Integer iddataset) {
		this.iddataset = iddataset;
	}
}
