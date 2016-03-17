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

import it.cmcc.eubrazil.beans.ExperimentSummary;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.opensymphony.xwork2.ActionSupport;

public class GetClimateSebalSummaryAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment = null;
	private ExperimentSummary summary = null;
	
	public String execute() throws Exception {
		
		String strutsresult = ERROR;
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_DETAILS_CLIMATE_VAR.getSql());
			stmt.setInt(1, idexperiment);
			System.out.println(stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			summary = new ExperimentSummary();
			
			while (rs.next()) {
				summary.setIdexperiment(idexperiment);
				summary.setClimatevariable(rs.getString("variablename"));
				summary.setClimatemodel(rs.getString("modelname"));
				summary.setClimatescenario(rs.getString("scenarioname"));
				summary.setSubmissiondate(rs.getString("submissiondate"));
				
				Double xmin = rs.getDouble("xmin");
				Double xmax = rs.getDouble("xmax");
				Double ymin = rs.getDouble("ymin");
				Double ymax = rs.getDouble("ymax");
				
				Double dfxmin = Math.round(xmin * 100000d) / 100000d;
				Double dfxmax = Math.round(xmax * 100000d) / 100000d;
				Double dfymin = Math.round(ymin * 100000d) / 100000d;
				Double dfymax = Math.round(ymax * 100000d) / 100000d;
				
				summary.setXmin(dfxmin);
				summary.setXmax(dfxmax);
				summary.setYmin(dfymin);
				summary.setYmax(dfymax);
				summary.setTimemin(rs.getString("timemin"));
				summary.setTimemax(rs.getString("timemax"));
				summary.setStatus(rs.getString("status"));
				summary.setStored(rs.getInt("stored"));
				summary.setDownloadresource(rs.getString("name"));
				summary.setDownloadtitle(rs.getString("title"));
			}
			rs.close();
			stmt.close();
			
			stmt = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_DETAILS_SEBAL_VAR.getSql());
			stmt.setInt(1, idexperiment);
			System.out.println(stmt.toString());
			rs = stmt.executeQuery();
			
			while (rs.next()) {
				summary.setSebalvariable(rs.getString("variablename"));
				summary.setSebalsensor(rs.getString("sensor"));
			}
			rs.close();
			stmt.close();
			
			strutsresult = SUCCESS;
		}
		catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return strutsresult;
	}

	public Integer getIdexperiment() {
		return idexperiment;
	}

	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}

	public ExperimentSummary getSummary() {
		return summary;
	}

	public void setSummary(ExperimentSummary summary) {
		this.summary = summary;
	}
	
}
