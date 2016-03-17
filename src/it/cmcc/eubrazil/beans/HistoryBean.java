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

public class HistoryBean implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String time    = null;
	private Integer expqueue1 = null;
	private Integer expqueue2 = null;
	private Integer expqueue3 = null;
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getExpqueue1() {
		return expqueue1;
	}

	public void setExpqueue1(Integer expqueue1) {
		this.expqueue1 = expqueue1;
	}

	public Integer getExpqueue2() {
		return expqueue2;
	}

	public void setExpqueue2(Integer expqueue2) {
		this.expqueue2 = expqueue2;
	}

	public Integer getExpqueue3() {
		return expqueue3;
	}

	public void setExpqueue3(Integer expqueue3) {
		this.expqueue3 = expqueue3;
	}	
}
