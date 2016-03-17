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

public class ClimateSebalExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	// bounding box
	private String xmin = null;
	private String xmax = null;
	private String ymin = null;
	private String ymax = null;
	
	private String cruvariable = null;
	private String satvariable = null;
	
	private String timemin = null;
	private String timemax = null;
	
	private List<ExperimentBean> jsonresult = null;
	
	public String execute() throws Exception {
		
		if (xmin == null || xmax == null || ymin == null || ymax == null || cruvariable == null || satvariable == null || timemin == null || timemax == null)
			return ERROR;
		else {
			jsonresult = new LinkedList<ExperimentBean>();
			
			Connection conn = null;
			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				// begin transaction
				conn.setAutoCommit(false);
				
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.INSERT_EXPERIMENT.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt.setString(1, "climatesebal");
				stmt.setString(2, user.getEmail());
//				System.out.println("stmt: " + stmt.toString());
				
				stmt.executeUpdate();
				ResultSet rs = stmt.getGeneratedKeys();
				int experimentid = -1;
				if (rs.next())
					experimentid = rs.getInt(1);
				
				System.out.println("experiment inserted: " + experimentid);
				
				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.CHECK_CLIMATE_DATA.getSql());
				stmt2.setString(1, cruvariable);
				stmt2.setString(2, "climatesebal");
				stmt2.setDouble(3, Double.parseDouble(xmax));
				stmt2.setDouble(4, Double.parseDouble(xmin));
				stmt2.setDouble(5, Double.parseDouble(ymax));
				stmt2.setDouble(6, Double.parseDouble(ymin));
//				System.out.println(stmt2.toString());
				ResultSet rs2 = stmt2.executeQuery();
				
				PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.CHECK_SEBAL_DATA.getSql());
				stmt3.setString(1, satvariable);
				stmt3.setString(2, "climatesebal");
				stmt3.setDouble(3, Double.parseDouble(xmax));
				stmt3.setDouble(4, Double.parseDouble(xmin));
				stmt3.setDouble(5, Double.parseDouble(ymax));
				stmt3.setDouble(6, Double.parseDouble(ymin));
//				System.out.println(stmt3.toString());
				ResultSet rs3 = stmt3.executeQuery();
				
				PreparedStatement stmt4 = conn.prepareStatement(SqlQuery.INSERT_CLIMATESEBAL_EXP.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt4.setInt(1, experimentid);
				stmt4.setString(2, timemin);
				stmt4.setString(3, timemax);
				stmt4.setDouble(4, Double.parseDouble(xmin));
				stmt4.setDouble(5, Double.parseDouble(xmax));
				stmt4.setDouble(6, Double.parseDouble(ymin));
				stmt4.setDouble(7, Double.parseDouble(ymax));
//				System.out.println(stmt4.toString());
				stmt4.executeUpdate();
				
				if (!rs2.next() || !rs3.next()) {
					PreparedStatement stmt7 = conn.prepareStatement(SqlQuery.GET_IDNODATA.getSql());
//					System.out.println(stmt7.toString());
					ResultSet rs7 = stmt7.executeQuery();
					if (rs7.next()) {
						PreparedStatement stmt8 = conn.prepareStatement(SqlQuery.INSERT_CLIMATESEBALDATASET.getSql());
						stmt8.setInt(1, experimentid);
						stmt8.setInt(2, rs7.getInt("iddataset"));
						stmt8.executeUpdate();
						stmt8.close();
						
						PreparedStatement stmt9 = conn.prepareStatement(SqlQuery.UPDATE_NODATA.getSql());
						stmt9.setInt(1, experimentid);
						stmt9.executeUpdate();
						stmt9.close();
					}
					else
						return ERROR;
					rs7.close();
					stmt7.close();
				}
				else {
					PreparedStatement stmt5 = conn.prepareStatement(SqlQuery.INSERT_CLIMATESEBALDATASET.getSql());
					int iddataset1 = rs2.getInt("iddataset");
					stmt5.setInt(1, experimentid);
					stmt5.setInt(2, iddataset1);
//					System.out.println(stmt5.toString());
					stmt5.executeUpdate();
					stmt5.close();
					
					PreparedStatement stmt6 = conn.prepareStatement(SqlQuery.INSERT_CLIMATESEBALDATASET.getSql());
					int iddataset2 = rs3.getInt("iddataset");
					stmt6.setInt(1, experimentid);
					stmt6.setInt(2, iddataset2);
//					System.out.println(stmt6.toString());
					stmt6.executeUpdate();
					stmt6.close();
				}
				rs.close();
				stmt.close();
				rs2.close();
				stmt2.close();
				rs3.close();
				stmt3.close();
				stmt4.close();
				
				conn.commit();
				// end transaction
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
	
	public String getCruvariable() {
		return cruvariable;
	}

	public void setCruvariable(String cruvariable) {
		this.cruvariable = cruvariable;
	}

	public String getSatvariable() {
		return satvariable;
	}

	public void setSatvariable(String satvariable) {
		this.satvariable = satvariable;
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
