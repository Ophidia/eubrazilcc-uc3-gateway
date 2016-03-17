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

public class LidarIntercomparisonExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	private String tile = null;
	private Boolean dtm = null;
	private Boolean dsm = null;
	private Boolean chm = null;
	private Boolean rh = null;
	private Boolean agb = null;
	private Boolean fc = null;
	private Boolean aspect = null;
	private Boolean sa = null;
	private Boolean pd = null;
	
	private List<ExperimentBean> jsonresult = null;
	
	public String execute() throws Exception {
		
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
				stmt.setString(1, "lidarintercomparison");
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
					
					PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.INSERT_LIDAR_INTERCOMPARISON_EXP.getSql(), Statement.RETURN_GENERATED_KEYS);
					stmt3.setInt(1, experimentid);
					stmt3.setInt(2, iddataset);
					stmt3.setBoolean(3, dtm);
					stmt3.setBoolean(4, dsm);
					stmt3.setBoolean(5, chm);
					stmt3.setBoolean(6, rh);
					stmt3.setBoolean(7, agb);
					stmt3.setBoolean(8, fc);
					stmt3.setBoolean(9, aspect);
					stmt3.setBoolean(10, sa);
					stmt3.setBoolean(11, pd);
					
					System.out.println("stmt3 = " + stmt3.toString());
					stmt3.executeUpdate();
					stmt3.close();
				}
				else
					return ERROR;

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

	public Boolean getDtm() {
		return dtm;
	}

	public void setDtm(Boolean dtm) {
		this.dtm = dtm;
	}

	public Boolean getDsm() {
		return dsm;
	}

	public void setDsm(Boolean dsm) {
		this.dsm = dsm;
	}

	public Boolean getChm() {
		return chm;
	}

	public void setChm(Boolean chm) {
		this.chm = chm;
	}

	public Boolean getRh() {
		return rh;
	}

	public void setRh(Boolean rh) {
		this.rh = rh;
	}

	public Boolean getAgb() {
		return agb;
	}

	public void setAgb(Boolean agb) {
		this.agb = agb;
	}

	public Boolean getFc() {
		return fc;
	}

	public void setFc(Boolean fc) {
		this.fc = fc;
	}

	public Boolean getAspect() {
		return aspect;
	}

	public void setAspect(Boolean aspect) {
		this.aspect = aspect;
	}

	public Boolean getSa() {
		return sa;
	}

	public void setSa(Boolean sa) {
		this.sa = sa;
	}

	public Boolean getPd() {
		return pd;
	}

	public void setPd(Boolean pd) {
		this.pd = pd;
	}
}
