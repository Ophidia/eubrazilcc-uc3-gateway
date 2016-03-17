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

package it.cmcc.sessionhandling.actions;

import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.utils.PasswordHash;
import it.cmcc.sessionhandling.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport implements SessionAware {

	private static final long serialVersionUID = 1L;
   
	private String email = null;
    private String password = null;
    
    private User user = null;
    Map<String, Object> session = null;
    
    public String execute() throws Exception {

    	String strutsresult = ERROR;
    	
		if (email.isEmpty()) {
			addActionError("Email field can't be blanked");
			System.out.println("Empty email field");
			strutsresult = ERROR;
		}
		else {
			Connection conn = null;
			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.GETUSER.getSql());
				stmt.setString(1, email);
				ResultSet rs = stmt.executeQuery();
				
				if (rs.next()) {
					if (PasswordHash.validatePassword(password, rs.getString("password"))) {
						
						user = new User();
						user.setEmail(email);
						user.setType(rs.getString("type"));
						
						System.out.println("User " + email + " logged in successfully");
					    session.put("USER", user);
					    strutsresult = SUCCESS;
					}
					else {
						System.out.println(email + " log in failed");
					    strutsresult = ERROR;
					}
				}
				else {
					System.out.println(email + " log in failed");
				    strutsresult = ERROR;
				}
			}
			catch (SQLException e) {
				strutsresult = ERROR;
			} finally {
				if(conn != null) conn.close();
			}
		}
		return strutsresult;
    }
    
    public String logout() throws Exception {
    	session.remove("USER");
		return SUCCESS;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Map<String, Object> getSession() {
		return session;
	}

	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
    
}