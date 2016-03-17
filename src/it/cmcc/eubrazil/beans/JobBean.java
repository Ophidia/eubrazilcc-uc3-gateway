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

public class JobBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Integer id             = null;
	private Integer idjob          = null;
	private Integer idexperiment   = null;
	private String  indicator      = null;
	private String  source         = null;
	private String  detail         = null;
	private String  latrange       = null;
	private String  lonrange       = null;
	private String  timerange      = null;
	private String  status         = null;
	private String  resulttype     = null;
	private String  resultname     = null;
	private Integer stored         = null;
	private String  submissiondate = null;
	
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
	public String getIndicator() {
		return indicator;
	}
	public void setIndicator(String indicator) {
		this.indicator = indicator;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getLatrange() {
		return latrange;
	}
	public void setLatrange(String latrange) {
		this.latrange = latrange;
	}
	public String getLonrange() {
		return lonrange;
	}
	public void setLonrange(String lonrange) {
		this.lonrange = lonrange;
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
	public String getResulttype() {
		return resulttype;
	}
	public void setResulttype(String resulttype) {
		this.resulttype = resulttype;
	}
	public String getResultname() {
		return resultname;
	}
	public void setResultname(String resultname) {
		this.resultname = resultname;
	}
	public Integer getStored() {
		return stored;
	}
	public void setStored(Integer stored) {
		this.stored = stored;
	}
	public String getSubmissiondate() {
		return submissiondate;
	}
	public void setSubmissiondate(String submissiondate) {
		this.submissiondate = submissiondate;
	}
}
