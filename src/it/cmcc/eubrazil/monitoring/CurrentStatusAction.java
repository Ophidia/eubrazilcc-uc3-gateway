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

package it.cmcc.eubrazil.monitoring;

import it.cmcc.eubrazil.beans.CurrentStatusBean;
import it.cmcc.eubrazil.utils.DbConnection;
import it.cmcc.eubrazil.utils.SqlQuery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class CurrentStatusAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<CurrentStatusBean> currentstatus = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_CURRENT_STATUS.getSql());
			
			ResultSet rs = stmt.executeQuery();
			
			currentstatus = new LinkedList<CurrentStatusBean>();
			
			while (rs.next()) {
				CurrentStatusBean currentcluster = new CurrentStatusBean();
				
				currentcluster.setName("Cluster" + (rs.getInt("idthread") + 1));
				currentcluster.setJobsnumber(rs.getInt("jobnum"));
				currentstatus.add(currentcluster);
			}
			
			rs.close();
			stmt.close();
		}
		catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public List<CurrentStatusBean> getCurrentstatus() {
		return currentstatus;
	}

	public void setCurrentstatus(List<CurrentStatusBean> currentstatus) {
		this.currentstatus = currentstatus;
	}

}