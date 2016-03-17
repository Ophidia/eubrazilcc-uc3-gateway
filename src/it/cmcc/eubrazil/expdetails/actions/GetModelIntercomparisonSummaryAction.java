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
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class GetModelIntercomparisonSummaryAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment = null;
	private ExperimentSummary summary = null;
	private List<ExperimentSummary> summaryArray = null;
	
	public String execute() throws Exception {
		
		String strutsresult = ERROR;
		summaryArray = new LinkedList<ExperimentSummary>();
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_DETAILS_CLIMATE_MODEL_INTERCOMPARISON.getSql());
			stmt.setInt(1, idexperiment);
			System.out.println(stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			
			while (rs.next()) {
				System.out.println(rs.getRow());
				summary = new ExperimentSummary();
				summary.setIdexperiment(idexperiment);
				
				Boolean tnn    = rs.getBoolean("tnn");
				Boolean tnx    = rs.getBoolean("tnx");
				Boolean txn    = rs.getBoolean("txn");
				Boolean txx     = rs.getBoolean("txx");
				
				String indicators = "";
				
				if (tnn == true) {
					indicators += ", Annual min of monthly tasmin (TNn)";					
				}
				if (tnx == true) {
					indicators += ", Annual max of monthly tasmin (TNx)";					
				}
				if (txn == true) {
					indicators += ", Annual min of monthly tasmax (TXn)";					
				}
				if (txx == true) {
					indicators += ", Annual max of monthly tasmax (TXx)";					
				}
				
				System.out.println(indicators);
				summary.setIndicators(indicators);
				
				summary.setSubmissiondate(rs.getString("submissiondate"));
				System.out.println(rs.getString("submissiondate"));
				
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

				summaryArray.add(summary);
			}
			rs.close();
			stmt.close();
			System.out.println("summaryArray lenght = " + summaryArray.size());
			
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

	public List<ExperimentSummary> getSummaryArray() {
		return summaryArray;
	}

	public void setSummaryArray(List<ExperimentSummary> summaryArray) {
		this.summaryArray = summaryArray;
	}
}
