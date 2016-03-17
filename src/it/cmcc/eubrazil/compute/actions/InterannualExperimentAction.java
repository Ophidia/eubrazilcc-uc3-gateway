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

import it.cmcc.eubrazil.beans.ExperimentBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class InterannualExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	// bounding box
	private String xmin = null;
	private String xmax = null;
	private String ymin = null;
	private String ymax = null;
	
	private String interannualvariable    = null;
	
	private String timemin   = null;
	private String timemax   = null;
	
	private List<ExperimentBean> jsonresult = null;
	
	public String execute() throws Exception {
		
		if (xmin == null || xmax == null || ymin == null || ymax == null || interannualvariable == null || timemin == null || timemax == null)
			return ERROR;
		else {
			jsonresult = new LinkedList<ExperimentBean>();
			
			Connection conn = null;
			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				// begin transaction
				conn.setAutoCommit(false);
				
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.INSERT_EXPERIMENT.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt.setString(1, "sebalinterannual");
				stmt.setString(2, user.getEmail());
//				System.out.println("stmt: " + stmt.toString());
				
				stmt.executeUpdate();
				ResultSet rs = stmt.getGeneratedKeys();
				int experimentid = -1;
				if (rs.next())
					experimentid = rs.getInt(1);
				
				System.out.println("experiment inserted: " + experimentid);

				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.CHECK_SEBAL_DATA.getSql());
				stmt2.setString(1, interannualvariable);
				stmt2.setString(2, "sebalinterannual");
				stmt2.setDouble(3, Double.parseDouble(xmax));
				stmt2.setDouble(4, Double.parseDouble(xmin));
				stmt2.setDouble(5, Double.parseDouble(ymax));
				stmt2.setDouble(6, Double.parseDouble(ymin));
//				System.out.println("stmt2 = " + stmt2.toString());
				ResultSet rs2 = stmt2.executeQuery();
				
				PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.INSERT_SEBAL_INTERANNUAL_EXP.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt3.setInt(1, experimentid);
				stmt3.setDouble(3, Double.parseDouble(xmin));
				stmt3.setDouble(4, Double.parseDouble(xmax));
				stmt3.setDouble(5, Double.parseDouble(ymin));
				stmt3.setDouble(6, Double.parseDouble(ymax));
				stmt3.setString(7, timemin);
				stmt3.setString(8, timemax);
				
//				System.out.println("stmt3 = " + stmt3.toString());
				
				if (rs2.next()) {
					int iddataset = rs2.getInt("iddataset");
					stmt3.setInt(2, iddataset);
					stmt3.executeUpdate();
				}
				else {					
					PreparedStatement stmt5 = conn.prepareStatement(SqlQuery.GET_IDNODATA.getSql());
//					System.out.println("stmt5 = " + stmt5.toString());
					ResultSet rs5 = stmt5.executeQuery();
					
					if (rs5.next()) {
						stmt3.setInt(2, rs5.getInt("iddataset"));
						stmt3.executeUpdate();
						
						PreparedStatement stmt4 = conn.prepareStatement(SqlQuery.UPDATE_NODATA.getSql());
						stmt4.setInt(1, experimentid);
//						System.out.println("stmt4 = " + stmt4.toString());
						stmt4.executeUpdate();
						stmt4.close();
					}
					else
						return ERROR;
					rs5.close();
					stmt5.close();
				}
				
				rs.close();
				stmt.close();
				
				rs2.close();
				stmt2.close();
				
				stmt3.close();

				conn.commit();
				//end transaction
			}
			catch(SQLException e) {
				return ERROR;
			} finally {
				if(conn != null) conn.close();
			}
		}
		
		

		return SUCCESS;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getXmin() {
		return xmin;
	}

	public void setXmin(String xmin) {
		this.xmin = xmin;
	}

	public String getXmax() {
		return xmax;
	}

	public void setXmax(String xmax) {
		this.xmax = xmax;
	}

	public String getYmin() {
		return ymin;
	}

	public void setYmin(String ymin) {
		this.ymin = ymin;
	}

	public String getYmax() {
		return ymax;
	}

	public void setYmax(String ymax) {
		this.ymax = ymax;
	}
	
	public String getInterannualvariable() {
		return interannualvariable;
	}

	public void setInterannualvariable(String interannualvariable) {
		this.interannualvariable = interannualvariable;
	}

	public String getTimemin() {
		return timemin;
	}

	public void setTimemin(String timemin) {
		this.timemin = timemin;
	}

	public String getTimemax() {
		return timemax;
	}

	public void setTimemax(String timemax) {
		this.timemax = timemax;
	}

	public List<ExperimentBean> getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(List<ExperimentBean> jsonresult) {
		this.jsonresult = jsonresult;
	}
}
