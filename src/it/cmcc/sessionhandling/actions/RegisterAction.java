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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

import it.cmcc.sessionhandling.utils.PasswordHash;
import it.cmcc.sessionhandling.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import com.opensymphony.xwork2.ActionSupport;

public class RegisterAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String fname = null;
	private String lname = null;
	private String email = null;
	private String password = null;
	private String orgname = null;
	private String orgtype = null;
	
	private String jsonresult = null;
	
	public String execute() throws Exception {
    	
//    	System.out.println("Register action");
    	
    	String hashedpawd = PasswordHash.createHash(password);
    	System.out.println(hashedpawd);
    	
    	Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.REGISTERUSER.getSql());
			stmt.setString(1, email);
			stmt.setString(2, hashedpawd);
			if (orgname.equals(""))
					stmt.setNull(3, Types.NULL);
			else
				stmt.setString(3, orgname);
			if (orgname.equals(""))
				stmt.setNull(4, Types.NULL);
			else
				stmt.setString(4, orgtype);
			stmt.setString(5, fname);
			stmt.setString(6, lname);
			int result = stmt.executeUpdate();
			
			if (result == 0)
				jsonresult = "failure";
			else
				jsonresult = "success";
		}
		catch (SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;			
    }

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
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

	public String getOrgname() {
		return orgname;
	}

	public void setOrgname(String orgname) {
		this.orgname = orgname;
	}

	public String getOrgtype() {
		return orgtype;
	}

	public void setOrgtype(String orgtype) {
		this.orgtype = orgtype;
	}

	public String getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(String jsonresult) {
		this.jsonresult = jsonresult;
	}
	
}
