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
import java.sql.ResultSet;
import java.sql.SQLException;

import it.cmcc.eubrazil.beans.UserBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import com.opensymphony.xwork2.ActionSupport;

public class GetUserType extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	private UserBean useroutput = null;
    
    public String execute() throws Exception {
    	
    	System.out.println("sono nella action");
    	
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			System.out.println(user.getEmail());
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GETUSER.getSql());
			stmt.setString(1, user.getEmail());
			System.out.println(stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			useroutput = new UserBean();
			
			while(rs.next()) {
				useroutput.setType(rs.getString("type"));
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public UserBean getUseroutput() {
		return useroutput;
	}

	public void setUseroutput(UserBean useroutput) {
		this.useroutput = useroutput;
	}
	
}
