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

package it.cmcc.eubrazil.compute.actions;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import com.opensymphony.xwork2.ActionSupport;

public class DeleteExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	private Integer expid     = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.DELETE_EXPERIMENT.getSql());

			stmt.setInt(1, expid);
			System.out.println("stmt: " + stmt.toString());
			
			stmt.executeUpdate();
			stmt.close();
			
		}
		catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		
		return SUCCESS;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getExpid() {
		return expid;
	}

	public void setExpid(Integer expid) {
		this.expid = expid;
	}

}
