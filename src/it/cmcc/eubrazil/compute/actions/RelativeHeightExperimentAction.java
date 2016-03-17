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

public class RelativeHeightExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	private String tile = null;
	
	private List<ExperimentBean> jsonresult = null;
	
	public String execute() throws Exception {

		System.out.println("tile = " + tile);
		
		if (tile == null)
			return ERROR;
		else {
			jsonresult = new LinkedList<ExperimentBean>();
			
			Connection conn = null;
			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				// begin transaction
				conn.setAutoCommit(false);
				
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.INSERT_EXPERIMENT.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt.setString(1, "relheight");
				stmt.setString(2, user.getEmail());
//				System.out.println("stmt: " + stmt.toString());
				
				stmt.executeUpdate();
				ResultSet rs = stmt.getGeneratedKeys();
				int experimentid = -1;
				if (rs.next())
					experimentid = rs.getInt(1);
				
				System.out.println("experiment inserted: " + experimentid);

				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.SELECT_LIDAR_DATASET.getSql());
				stmt2.setString(1, tile);

				System.out.println("stmt2 = " + stmt2.toString());
				ResultSet rs2 = stmt2.executeQuery();
				
				if (rs2.next()) {
					int iddataset = rs2.getInt("iddataset");
				
					System.out.println("iddataset = " + iddataset);
					
					PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.INSERT_RELATIVE_HEIGHT_EXP.getSql(), Statement.RETURN_GENERATED_KEYS);
					stmt3.setInt(1, experimentid);
					stmt3.setInt(2, iddataset);
					System.out.println("stmt3 = " + stmt3.toString());
					stmt3.executeUpdate();
					stmt3.close();
				}
				else
					return ERROR;

				
//				System.out.println("stmt3 = " + stmt3.toString());
				
/*				if (rs2.next()) {
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
				}*/
				
				rs.close();
				stmt.close();
				
				rs2.close();
				stmt2.close();

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

	public String getTile() {
		return tile;
	}

	public void setTile(String tile) {
		this.tile = tile;
	}

	public List<ExperimentBean> getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(List<ExperimentBean> jsonresult) {
		this.jsonresult = jsonresult;
	}
}
