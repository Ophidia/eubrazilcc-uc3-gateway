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

package it.cmcc.eubrazil.admin.actions;

import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.opensymphony.xwork2.ActionSupport;

public class EnableDisableUsersAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private Integer userid = null;
	private Integer status = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			if (status == 0) {
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.ENABLE_USER.getSql());
				stmt.setInt(1, userid);
				
				stmt.executeUpdate();
				stmt.close();
			}
			else if (status == 1) {
				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.DISABLE_USER.getSql());
				stmt2.setInt(1, userid);
				
				stmt2.executeUpdate();
				stmt2.close();
			}
		}
		catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		
		return SUCCESS;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
