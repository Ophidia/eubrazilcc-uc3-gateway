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

import it.cmcc.eubrazil.beans.UserBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class UsersAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<UserBean> userlist = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_USERS.getSql());
			
			ResultSet rs = stmt.executeQuery();
			userlist = new LinkedList<UserBean>();
			
			UserBean user = null;
			
			while (rs.next()) {
				user = new UserBean();
				user.setIduser(rs.getInt("iduser"));
				user.setFirstname(rs.getString("firstname"));
				user.setLastname(rs.getString("lastname"));
				user.setEmail(rs.getString("email"));
				user.setOrgname(rs.getString("orgname"));
				user.setOrgtype(rs.getString("orgtype"));
				user.setType(rs.getString("type"));
				user.setStatus(rs.getInt("status"));
				
				userlist.add(user);
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

	public List<UserBean> getUserlist() {
		return userlist;
	}

	public void setUserlist(List<UserBean> userlist) {
		this.userlist = userlist;
	}
}
