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

public class ClimateAnalysisExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	// bounding box
	private String xmin = null;
	private String xmax = null;
	private String ymin = null;
	private String ymax = null;
	
	private Boolean txx = null;
	private Boolean tnx = null;
	private Boolean txn = null;
	private Boolean tnn = null;
	
	private String timemin = null;
	private String timemax = null;
	
	private List<ExperimentBean> jsonresult = null;
	
	public String execute() throws Exception {
		
		if (xmin == null || xmax == null || ymin == null || ymax == null || txx == null || tnx == null || txn == null || tnn == null || timemin == null || timemax == null)
			return ERROR;
		else {

			jsonresult = new LinkedList<ExperimentBean>();
			
			Connection conn = null;
			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				// begin transaction
				conn.setAutoCommit(false);
				
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.INSERT_EXPERIMENT.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt.setString(1, "modelintercomparison");
				stmt.setString(2, user.getEmail());
				System.out.println("stmt: " + stmt.toString());
				
				stmt.executeUpdate();
				ResultSet rs = stmt.getGeneratedKeys();
				int experimentid = -1;
				if (rs.next())
					experimentid = rs.getInt(1);
				
				System.out.println("experiment inserted: " + experimentid);
				
								
/*				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.CHECK_CLIMATE_MODEL_DATA.getSql());
				ResultSet rs2;
				
				if (txx == true || txn || true) {
					stmt2.setString(1, "tasmax");
					stmt2.setDouble(2, Double.parseDouble(xmax));
					stmt2.setDouble(3, Double.parseDouble(xmin));
					stmt2.setDouble(4, Double.parseDouble(ymax));
					stmt2.setDouble(5, Double.parseDouble(ymin));
					System.out.println(stmt2.toString());
					rs2 = stmt2.executeQuery();
				}
				
				
				if (!rs2.next()) {
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
				else 
					return ERROR;*/
				
				PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.INSERT_CLIMATE_MODEL_INTERCOMPARISON.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt3.setInt(1, experimentid);
				stmt3.setString(2, timemin);
				stmt3.setString(3, timemax);
				stmt3.setDouble(4, Double.parseDouble(xmin));
				stmt3.setDouble(5, Double.parseDouble(xmax));
				stmt3.setDouble(6, Double.parseDouble(ymin));
				stmt3.setDouble(7, Double.parseDouble(ymax));
				stmt3.setBoolean(8, tnn);
				stmt3.setBoolean(9, tnx);
				stmt3.setBoolean(10, txx);
				stmt3.setBoolean(11, txn);
				System.out.println(stmt3.toString());
				stmt3.executeUpdate();
				
				rs.close();
				stmt.close();
				
				//rs2.close();
				//stmt2.close();
				
				stmt3.close();

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

	public Boolean getTxx() {
		return txx;
	}

	public void setTxx(Boolean txx) {
		this.txx = txx;
	}

	public Boolean getTnx() {
		return tnx;
	}

	public void setTnx(Boolean tnx) {
		this.tnx = tnx;
	}

	public Boolean getTxn() {
		return txn;
	}

	public void setTxn(Boolean txn) {
		this.txn = txn;
	}

	public Boolean getTnn() {
		return tnn;
	}

	public void setTnn(Boolean tnn) {
		this.tnn = tnn;
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
