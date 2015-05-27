/**
Eubrazil Scientific Gateway
Copyright (C) 2015 CMCC

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

package it.cmcc.eubrazil.submit;

import it.cmcc.eubrazil.beans.MyExperimentBean;
import it.cmcc.eubrazil.utils.DbConnection;
import it.cmcc.eubrazil.utils.SqlQuery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class CHExperimentsListAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<MyExperimentBean> chexperiments = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_ALL_CH_EXPERIMENTS.getSql());
			
			ResultSet rs = stmt.executeQuery();
			
			chexperiments = new LinkedList<MyExperimentBean>();
			
			while (rs.next()) {
				MyExperimentBean experiment = new MyExperimentBean();
				experiment.setIdexperiment(rs.getInt("idexperiment"));
				experiment.setBoundingbox(rs.getString("boundingbox"));
				experiment.setTimerange(rs.getString("timerange"));
				experiment.setExperimentname(rs.getString("name"));
				experiment.setSubmissiondate(rs.getString("submissiondate"));
				experiment.setColor(rs.getString("fillColor"));
				int status = rs.getInt("status");
				if (status == 0  || status == 4)
					experiment.setStatus("pending");
				else if (status == 1)
					experiment.setStatus("running");
				else if (status == 2)
					experiment.setStatus("done");
				else
					experiment.setStatus("failed");
				
				int chstatus = rs.getInt("chstatus");
				if (chstatus == 0)
					experiment.setChstatus("default");
				else if (chstatus == 1)
					experiment.setChstatus("request");
				else if (chstatus == 2)
					experiment.setChstatus("saving");
				else if (chstatus == 3)
					experiment.setChstatus("stored");
				else
					experiment.setChstatus("request failed");
				
				int id_exp = rs.getInt("idexperiment");
				
				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.GET_MODELS.getSql());
				stmt2.setInt(1, id_exp);
				ResultSet rs2 = stmt2.executeQuery();
				
				String models = "";
				while (rs2.next()) {
					models += rs2.getString("name") + ", ";
				}
				
				experiment.setModels(models.substring(0, models.length()-2));
				
				rs2.close();
				stmt2.close();

				PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.GET_SCENARIOS.getSql());
				stmt3.setInt(1, id_exp);
				ResultSet rs3 = stmt3.executeQuery();
				
				String scenarios = "";
				while (rs3.next()) {
					scenarios += rs3.getString("name") + ", ";
				}
				
				experiment.setScenarios(scenarios.substring(0, scenarios.length()-2));
				
				rs3.close();
				stmt3.close();
				
				PreparedStatement stmt4 = conn.prepareStatement(SqlQuery.GET_INDICATORS.getSql());
				stmt4.setInt(1, id_exp);
				ResultSet rs4 = stmt4.executeQuery();
				
				String indicators = "";
				while (rs4.next()) {
					indicators += rs4.getString("name") + ", ";
				}
				
				experiment.setIndicators(indicators.substring(0, indicators.length()-2));
				
				rs4.close();
				stmt4.close();
				
				chexperiments.add(experiment);
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

	public List<MyExperimentBean> getChexperiments() {
		return chexperiments;
	}

	public void setChexperiments(List<MyExperimentBean> chexperiments) {
		this.chexperiments = chexperiments;
	}

}