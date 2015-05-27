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

public class HistoryBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String time    = null;
	private Integer jobqueue1 = null;
	private Integer jobqueue2 = null;
	private Integer jobqueue3 = null;
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getJobqueue1() {
		return jobqueue1;
	}
	
	public void setJobqueue1(Integer jobqueue1) {
		this.jobqueue1 = jobqueue1;
	}
	
	public Integer getJobqueue2() {
		return jobqueue2;
	}
	
	public void setJobqueue2(Integer jobqueue2) {
		this.jobqueue2 = jobqueue2;
	}
	
	public Integer getJobqueue3() {
		return jobqueue3;
	}
	
	public void setJobqueue3(Integer jobqueue3) {
		this.jobqueue3 = jobqueue3;
	}
	
}