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

public class SearchCHAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	private List<ExperimentBean> experiments = null;
	
	private String xmin = null;
	private String xmax = null;
	private String ymin = null;
	private String ymax = null;
	
	private String variable = null;
	
	private String timemin = null;
	private String timemax = null;
	
	public String execute() throws Exception {	
					
			Connection conn = null;

			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				if (variable.equals("sebalinterannual")) {
					PreparedStatement stmt = conn.prepareStatement(SqlQuery.SEARCH_CH_EXPERIMENTS_INTERANNUAL.getSql());
					
					stmt.setString(1, user.getEmail());
					stmt.setString(2, variable);
					stmt.setString(3, xmin);
					stmt.setString(4, xmax);
					stmt.setString(5, ymin);
					stmt.setString(6, ymax);
					stmt.setString(7, timemin);
					stmt.setString(8, timemax);

					System.out.println(stmt.toString());
					ResultSet rs = stmt.executeQuery();

					experiments = new LinkedList<ExperimentBean>();
					
					while (rs.next()) {
						ExperimentBean experiment = new ExperimentBean();
						
						int idexperiment = rs.getInt("idexperiment");
						experiment.setIdexperiment(idexperiment);
						System.out.println(stmt.toString());
						
						experiment.setName("Exp" + rs.getInt("idexperiment"));
						
						String new_date = rs.getString("submissiondate").substring(0, 16);
						experiment.setSubmissiondate(new_date);
						System.out.println(stmt.toString());
						
						experiment.setStored(rs.getInt("stored"));
						System.out.println(stmt.toString());
						
						experiment.setStatus(rs.getString("status"));
						System.out.println(stmt.toString());
						
						//if (rs.getString("fillColor") != null) {
							//experiment.setFillColor(rs.getString("fillColor"));
							//System.out.println(rs.getString("fillColor"));
						//}
						
						String exptype = rs.getString("code");
						System.out.println("exptype = " + exptype);
						experiment.setExperimenttype(exptype);

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


						experiments.add(experiment);
						
					}				
					rs.close();
					stmt.close();	
				}
				else if (variable.equals("climatesebal")) {
					PreparedStatement stmt = conn.prepareStatement(SqlQuery.SEARCH_CH_EXPERIMENTS_CLIMATE_SEBAL.getSql());
					
					stmt.setString(1, user.getEmail());
					stmt.setString(2, variable);
					stmt.setString(3, xmin);
					stmt.setString(4, xmax);
					stmt.setString(5, ymin);
					stmt.setString(6, ymax);
					stmt.setString(7, timemin);
					stmt.setString(8, timemax);

					System.out.println(stmt.toString());
					ResultSet rs = stmt.executeQuery();

					experiments = new LinkedList<ExperimentBean>();
					
					while (rs.next()) {
						ExperimentBean experiment = new ExperimentBean();
						
						int idexperiment = rs.getInt("idexperiment");
						experiment.setIdexperiment(idexperiment);
						System.out.println(stmt.toString());
						
						experiment.setName("Exp" + rs.getInt("idexperiment"));
						
						String new_date = rs.getString("submissiondate").substring(0, 16);
						experiment.setSubmissiondate(new_date);
						System.out.println(stmt.toString());
						
						experiment.setStored(rs.getInt("stored"));
						System.out.println(stmt.toString());
						
						experiment.setStatus(rs.getString("status"));
						System.out.println(stmt.toString());
						
						//if (rs.getString("fillColor") != null) {
							//experiment.setFillColor(rs.getString("fillColor"));
							//System.out.println(rs.getString("fillColor"));
						//}
						
						String exptype = rs.getString("code");
						System.out.println("exptype = " + exptype);
						experiment.setExperimenttype(exptype);

						PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_CLIMATESEBAL_EXP_DETAILS.getSql());
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


						experiments.add(experiment);
						
					}				
					rs.close();
					stmt.close();	
				}
				else if (variable.equals("modelintercomparison")) {
					PreparedStatement stmt = conn.prepareStatement(SqlQuery.SEARCH_CH_EXPERIMENTS_MODEL_INTERCOMP.getSql());
					
					stmt.setString(1, user.getEmail());
					stmt.setString(2, variable);
					stmt.setString(3, xmin);
					stmt.setString(4, xmax);
					stmt.setString(5, ymin);
					stmt.setString(6, ymax);
					stmt.setString(7, timemin);
					stmt.setString(8, timemax);

					System.out.println(stmt.toString());
					ResultSet rs = stmt.executeQuery();

					experiments = new LinkedList<ExperimentBean>();
					
					while (rs.next()) {
						ExperimentBean experiment = new ExperimentBean();
						
						int idexperiment = rs.getInt("idexperiment");
						experiment.setIdexperiment(idexperiment);
						System.out.println(stmt.toString());
						
						experiment.setName("Exp" + rs.getInt("idexperiment"));
						
						String new_date = rs.getString("submissiondate").substring(0, 16);
						experiment.setSubmissiondate(new_date);
						System.out.println(stmt.toString());
						
						experiment.setStored(rs.getInt("stored"));
						System.out.println(stmt.toString());
						
						experiment.setStatus(rs.getString("status"));
						System.out.println(stmt.toString());
						
						//if (rs.getString("fillColor") != null) {
							//experiment.setFillColor(rs.getString("fillColor"));
							//System.out.println(rs.getString("fillColor"));
						//}
						
						String exptype = rs.getString("code");
						System.out.println("exptype = " + exptype);
						experiment.setExperimenttype(exptype);

						PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_CLIMATE_MODEL_EXP_DETAILS.getSql());
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


						experiments.add(experiment);
						
					}				
					rs.close();
					stmt.close();	
				}
				else if (variable.equals("lidarintercomparison")) {
					PreparedStatement stmt = conn.prepareStatement(SqlQuery.SEARCH_CH_EXPERIMENTS_LIDAR_INTERCOMP.getSql());
					
					stmt.setString(1, user.getEmail());
					stmt.setString(2, variable);
					stmt.setString(3, xmin);
					stmt.setString(4, xmax);
					stmt.setString(5, ymin);
					stmt.setString(6, ymax);
					stmt.setString(7, timemin);
					stmt.setString(8, timemax);

					System.out.println(stmt.toString());
					ResultSet rs = stmt.executeQuery();

					experiments = new LinkedList<ExperimentBean>();
					
					while (rs.next()) {
						ExperimentBean experiment = new ExperimentBean();
						
						int idexperiment = rs.getInt("idexperiment");
						experiment.setIdexperiment(idexperiment);
						System.out.println(stmt.toString());
						
						experiment.setName("Exp" + rs.getInt("idexperiment"));
						
						String new_date = rs.getString("submissiondate").substring(0, 16);
						experiment.setSubmissiondate(new_date);
						System.out.println(stmt.toString());
						
						experiment.setStored(rs.getInt("stored"));
						System.out.println(stmt.toString());
						
						experiment.setStatus(rs.getString("status"));
						System.out.println(stmt.toString());
						
						//if (rs.getString("fillColor") != null) {
							//experiment.setFillColor(rs.getString("fillColor"));
							//System.out.println(rs.getString("fillColor"));
						//}
						
						String exptype = rs.getString("code");
						System.out.println("exptype = " + exptype);
						experiment.setExperimenttype(exptype);

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


						experiments.add(experiment);
						
					}				
					rs.close();
					stmt.close();
					
				}
				else if (variable.equals("relheight")) {
					PreparedStatement stmt = conn.prepareStatement(SqlQuery.SEARCH_CH_EXPERIMENTS_RELHEIGHT.getSql());
					
					stmt.setString(1, user.getEmail());
					stmt.setString(2, variable);
					stmt.setString(3, xmin);
					stmt.setString(4, xmax);
					stmt.setString(5, ymin);
					stmt.setString(6, ymax);
					stmt.setString(7, timemin);
					stmt.setString(8, timemax);

					System.out.println(stmt.toString());
					ResultSet rs = stmt.executeQuery();

					experiments = new LinkedList<ExperimentBean>();
					
					while (rs.next()) {
						ExperimentBean experiment = new ExperimentBean();
						
						int idexperiment = rs.getInt("idexperiment");
						experiment.setIdexperiment(idexperiment);
						System.out.println(stmt.toString());
						
						experiment.setName("Exp" + rs.getInt("idexperiment"));
						
						String new_date = rs.getString("submissiondate").substring(0, 16);
						experiment.setSubmissiondate(new_date);
						System.out.println(stmt.toString());
						
						experiment.setStored(rs.getInt("stored"));
						System.out.println(stmt.toString());
						
						experiment.setStatus(rs.getString("status"));
						System.out.println(stmt.toString());
						
						//if (rs.getString("fillColor") != null) {
							//experiment.setFillColor(rs.getString("fillColor"));
							//System.out.println(rs.getString("fillColor"));
						//}
						
						String exptype = rs.getString("code");
						System.out.println("exptype = " + exptype);
						experiment.setExperimenttype(exptype);

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


						experiments.add(experiment);
						
					}				
					rs.close();
					stmt.close();
					
				}
				else if (variable.equals("enm")) {
					PreparedStatement stmt = conn.prepareStatement(SqlQuery.SEARCH_CH_EXPERIMENTS_ENM.getSql());
					
					stmt.setString(1, user.getEmail());
					stmt.setString(2, variable);
					stmt.setString(3, xmin);
					stmt.setString(4, xmax);
					stmt.setString(5, ymin);
					stmt.setString(6, ymax);
					stmt.setString(7, timemin);
					stmt.setString(8, timemax);

					System.out.println(stmt.toString());
					ResultSet rs = stmt.executeQuery();

					experiments = new LinkedList<ExperimentBean>();
					
					while (rs.next()) {
						ExperimentBean experiment = new ExperimentBean();
						
						int idexperiment = rs.getInt("idexperiment");
						experiment.setIdexperiment(idexperiment);
						System.out.println(stmt.toString());
						
						experiment.setName("Exp" + rs.getInt("idexperiment"));
						
						String new_date = rs.getString("submissiondate").substring(0, 16);
						experiment.setSubmissiondate(new_date);
						System.out.println(stmt.toString());
						
						experiment.setStored(rs.getInt("stored"));
						System.out.println(stmt.toString());
						
						experiment.setStatus(rs.getString("status"));
						System.out.println(stmt.toString());
						
						//if (rs.getString("fillColor") != null) {
							//experiment.setFillColor(rs.getString("fillColor"));
							//System.out.println(rs.getString("fillColor"));
						//}
						
						String exptype = rs.getString("code");
						System.out.println("exptype = " + exptype);
						experiment.setExperimenttype(exptype);

						PreparedStatement stmt1 = conn.prepareStatement(SqlQuery.GET_ENM_EXP_DETAILS.getSql());
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

						experiments.add(experiment);
						
					}				
					rs.close();
					stmt.close();
				}							
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

	public String getVariable() {
		return variable;
	}

	public void setVariable(String variable) {
		this.variable = variable;
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
}
