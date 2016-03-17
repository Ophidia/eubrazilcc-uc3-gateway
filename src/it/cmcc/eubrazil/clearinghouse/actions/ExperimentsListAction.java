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

package it.cmcc.eubrazil.clearinghouse.actions;

import it.cmcc.eubrazil.beans.ExperimentBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class ExperimentsListAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	private List<ExperimentBean> experiments = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_CH_EXPERIMENTS.getSql());
			stmt.setString(1, user.getEmail());
			System.out.println(stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			experiments = new LinkedList<ExperimentBean>();
			
			while (rs.next()) {
				ExperimentBean experiment = new ExperimentBean();
				
				int idexperiment = rs.getInt("idexperiment");
				experiment.setIdexperiment(idexperiment);
				
				experiment.setName("Exp" + rs.getInt("idexperiment"));
				
				String new_date = rs.getString("submissiondate").substring(0, 16);
				
				System.out.println(new_date);
				
				experiment.setSubmissiondate(new_date);
				
				experiment.setStored(rs.getInt("stored"));
				
				experiment.setStatus(rs.getString("status"));
				
				//if (rs.getString("fillColor") != null) {
					experiment.setFillColor(rs.getString("fillColor"));
					System.out.println(rs.getString("fillColor"));
				//}
				
				String exptype = rs.getString("code");
				System.out.println("exptype = " + exptype);
				experiment.setExperimenttype(exptype);
				
				if (exptype.equals("sebalinterannual")) {
					PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_SEBALINTERANNUAL_EXP_DETAILS.getSql());
					stmt1.setInt(1, idexperiment);
					System.out.println(stmt1.toString());
					ResultSet rs1 = stmt1.executeQuery();
					
					if (rs1.next()) {
						
						Double xmin = rs1.getDouble("xmin");
						Double xmax = rs1.getDouble("xmax");
						Double ymin = rs1.getDouble("ymin");
						Double ymax = rs1.getDouble("ymax");
						
						Double dfxmin = Math.round(xmin * 100000d) / 100000d;
						Double dfxmax = Math.round(xmax * 100000d) / 100000d;
						Double dfymin = Math.round(ymin * 100000d) / 100000d;
						Double dfymax = Math.round(ymax * 100000d) / 100000d;
						
						experiment.setXmin(dfxmin);
						experiment.setXmax(dfxmax);
						experiment.setYmin(dfymin);
						experiment.setYmax(dfymax);
						
						experiment.setTimemin(rs1.getString("timemin"));
						experiment.setTimemax(rs1.getString("timemax"));
					}
					rs1.close();
					stmt1.close();
				}
				else if (exptype.equals("modelintercomparison")) {
					PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_CLIMATE_MODEL_EXP_DETAILS.getSql());
					stmt1.setInt(1, idexperiment);
					//System.out.println(stmt1.toString());
					ResultSet rs1 = stmt1.executeQuery();
					
					if (rs1.next()) {
						Double xmin = rs1.getDouble("xmin");
						Double xmax = rs1.getDouble("xmax");
						Double ymin = rs1.getDouble("ymin");
						Double ymax = rs1.getDouble("ymax");
						
						Double dfxmin = Math.round(xmin * 100000d) / 100000d;
						Double dfxmax = Math.round(xmax * 100000d) / 100000d;
						Double dfymin = Math.round(ymin * 100000d) / 100000d;
						Double dfymax = Math.round(ymax * 100000d) / 100000d;
						
						experiment.setXmin(dfxmin);
						experiment.setXmax(dfxmax);
						experiment.setYmin(dfymin);
						experiment.setYmax(dfymax);
						experiment.setTimemin(rs1.getString("timemin"));
						experiment.setTimemax(rs1.getString("timemax"));
					}
					rs1.close();
					stmt1.close();
				}
				else if (exptype.equals("sebalintercomparison")) {
					
				}
				else if (exptype.equals("climatesebal")) {
					PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_CLIMATESEBAL_EXP_DETAILS.getSql());
					stmt1.setInt(1, idexperiment);
					//System.out.println(stmt1.toString());
					ResultSet rs1 = stmt1.executeQuery();
					
					if (rs1.next()) {
						Double xmin = rs1.getDouble("xmin");
						Double xmax = rs1.getDouble("xmax");
						Double ymin = rs1.getDouble("ymin");
						Double ymax = rs1.getDouble("ymax");
						
						Double dfxmin = Math.round(xmin * 100000d) / 100000d;
						Double dfxmax = Math.round(xmax * 100000d) / 100000d;
						Double dfymin = Math.round(ymin * 100000d) / 100000d;
						Double dfymax = Math.round(ymax * 100000d) / 100000d;
						
						experiment.setXmin(dfxmin);
						experiment.setXmax(dfxmax);
						experiment.setYmin(dfymin);
						experiment.setYmax(dfymax);
						experiment.setTimemin(rs1.getString("timemin"));
						experiment.setTimemax(rs1.getString("timemax"));
					}
					rs1.close();
					stmt1.close();
				}
				else if (exptype.equals("relheight")) {
					PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_RELHEIGHT_EXP_DETAILS.getSql());
					stmt1.setInt(1, idexperiment);
					ResultSet rs1 = stmt1.executeQuery();
					
					if (rs1.next()) {
						Double xmin = rs1.getDouble("xmin");
						Double xmax = rs1.getDouble("xmax");
						Double ymin = rs1.getDouble("ymin");
						Double ymax = rs1.getDouble("ymax");
						
						Double dfxmin = Math.round(xmin * 100000d) / 100000d;
						Double dfxmax = Math.round(xmax * 100000d) / 100000d;
						Double dfymin = Math.round(ymin * 100000d) / 100000d;
						Double dfymax = Math.round(ymax * 100000d) / 100000d;
						
						experiment.setXmin(dfxmin);
						experiment.setXmax(dfxmax);
						experiment.setYmin(dfymin);
						experiment.setYmax(dfymax);
						experiment.setTimemin("-");
						experiment.setTimemax("-");
					}
					rs1.close();
					stmt1.close();
				}
				else if (exptype.equals("lidarintercomparison")) {
					PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_LIDAR_INTERCOMPARISON_EXP_DETAILS.getSql());
					stmt1.setInt(1, idexperiment);
					ResultSet rs1 = stmt1.executeQuery();
					
					if (rs1.next()) {
						Double xmin = rs1.getDouble("xmin");
						Double xmax = rs1.getDouble("xmax");
						Double ymin = rs1.getDouble("ymin");
						Double ymax = rs1.getDouble("ymax");
						
						Double dfxmin = Math.round(xmin * 100000d) / 100000d;
						Double dfxmax = Math.round(xmax * 100000d) / 100000d;
						Double dfymin = Math.round(ymin * 100000d) / 100000d;
						Double dfymax = Math.round(ymax * 100000d) / 100000d;
						
						experiment.setXmin(dfxmin);
						experiment.setXmax(dfxmax);
						experiment.setYmin(dfymin);
						experiment.setYmax(dfymax);
						experiment.setTimemin("-");
						experiment.setTimemax("-");
					}
					rs1.close();
					stmt1.close();
				}
				else if (exptype.equals("enm")) {
					PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_ENM_EXP_DETAILS.getSql());
					stmt1.setInt(1, idexperiment);
					System.out.println(stmt1);
					ResultSet rs1 = stmt1.executeQuery();
					
					if (rs1.next()) {
						Double xmin = rs1.getDouble("xmin");
						Double xmax = rs1.getDouble("xmax");
						Double ymin = rs1.getDouble("ymin");
						Double ymax = rs1.getDouble("ymax");
						
						Double dfxmin = Math.round(xmin * 100000d) / 100000d;
						Double dfxmax = Math.round(xmax * 100000d) / 100000d;
						Double dfymin = Math.round(ymin * 100000d) / 100000d;
						Double dfymax = Math.round(ymax * 100000d) / 100000d;
						
						experiment.setXmin(dfxmin);
						experiment.setXmax(dfxmax);
						experiment.setYmin(dfymin);
						experiment.setYmax(dfymax);
						
						experiment.setTimemin("-");
						experiment.setTimemax("-");
					}
					rs1.close();
					stmt1.close();
				}
				
				experiments.add(experiment);
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

	public List<ExperimentBean> getExperiments() {
		return experiments;
	}

	public void setExperiments(List<ExperimentBean> experiments) {
		this.experiments = experiments;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}	
}
