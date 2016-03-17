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

package it.cmcc.eubrazil.expdetails.actions;

import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.opensymphony.xwork2.ActionSupport;

public class StoreintheCHAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	//private String  fillColor = null;
	//private String  expname   = null;
	private Integer expid     = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.STORE_IN_THE_CH.getSql());
			//stmt.setString(1, expname);
			//stmt.setString(2, "#" + fillColor);
			stmt.setInt(1, expid);
			System.out.println("stmt: " + stmt.toString());
			
			stmt.executeUpdate();
			
			System.out.println("query1 eseguita");
			stmt.close();
			
			PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_FROM_ID.getSql());
			stmt2.setInt(1, expid);
			
			System.out.println("query2 eseguita");
			
			int stored = 1;
			int dbstored = 1;
			
			do {
				System.out.println("stmt2: " + stmt2.toString());
				Thread.sleep(3 * 1000);
				ResultSet rs2 = stmt2.executeQuery();
				System.out.println("query2 eseguita");
				
				while (rs2.next()) {
					dbstored = rs2.getInt("stored");
					System.out.println("dbstored: " + dbstored);
					System.out.println("salvato nel CH");
				}
				rs2.close();
			} while (stored == dbstored);
			
			stmt2.close();
			
			System.out.println("dbstored: " + dbstored);
			if (dbstored == 3)
				return ERROR;
			
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

/*	public String getFillColor() {
		return fillColor;
	}

	public void setFillColor(String fillColor) {
		this.fillColor = fillColor;
	}

	public String getExpname() {
		return expname;
	}

	public void setExpname(String expname) {
		this.expname = expname;
	}*/

	public Integer getExpid() {
		return expid;
	}

	public void setExpid(Integer expid) {
		this.expid = expid;
	}
}
