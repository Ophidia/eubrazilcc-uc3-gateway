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
import java.util.Random;

import com.opensymphony.xwork2.ActionSupport;

public class StoreintheCHAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment = null;
	private String experimentname = null;
	
	private MyExperimentBean chexperiment = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.STORE_JOBS_INTHE_CH.getSql());
			stmt.setInt(1, idexperiment);
			stmt.executeUpdate();
			stmt.close();
			
			Random rand = new Random(System.currentTimeMillis());
			// random color for bounding bob experiment
			String[] letters = {"1","2","3","4","5","6","7","8","9","A","B","C","D","E"};
			String color = "#";
			for (int i = 0; i < 2; i++ ) {
				color += letters[rand.nextInt(12) + 1];
			}
			rand = new Random(System.currentTimeMillis() + 3600000);
			for (int i = 2; i < 4; i++ ) {
				color += letters[rand.nextInt(12) + 1];
			}
			rand = new Random(System.currentTimeMillis() + 7200000);
			for (int i = 4; i < 6; i++ ) {
				color += letters[rand.nextInt(12) + 1];
			}
			
			stmt = conn.prepareStatement(SqlQuery.STORE_EXPERIMENT_INTHE_CH.getSql());
			stmt.setString(1, experimentname);
			stmt.setString(2, color);
			stmt.setInt(3, idexperiment);
			stmt.executeUpdate();
			stmt.close();
			
			PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.GET_EXPERIMENT.getSql());
			stmt2.setInt(1, idexperiment);
			ResultSet rs2 = stmt2.executeQuery();
			chexperiment = new MyExperimentBean();
			if (rs2.next()) {
				chexperiment.setBoundingbox(rs2.getString("boundingbox"));
				chexperiment.setIdexperiment(rs2.getInt("idexperiment"));
				chexperiment.setExperimentname(rs2.getString("name"));
				chexperiment.setTimerange(rs2.getString("timerange"));
				chexperiment.setSubmissiondate(rs2.getString("submissiondate"));
			}
			rs2.close();
			stmt2.close();
			
			stmt2 = conn.prepareStatement(SqlQuery.GET_MODELS.getSql());
			stmt2.setInt(1, idexperiment);
			rs2 = stmt2.executeQuery();
			String models = "";
			while (rs2.next()) {
				models += rs2.getString("name") + " ";
			}
			chexperiment.setModels(models);
			rs2.close();
			stmt2.close();

			PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.GET_SCENARIOS.getSql());
			stmt3.setInt(1, idexperiment);
			ResultSet rs3 = stmt3.executeQuery();
			String scenarios = "";
			while (rs3.next()) {
				scenarios += rs3.getString("name") + " ";
			}
			chexperiment.setScenarios(scenarios);
			rs3.close();
			stmt3.close();
			
			PreparedStatement stmt4 = conn.prepareStatement(SqlQuery.GET_INDICATORS.getSql());
			stmt4.setInt(1, idexperiment);
			ResultSet rs4 = stmt4.executeQuery();
			String indicators = "";
			while (rs4.next()) {
				indicators += rs4.getString("name") + " ";
			}
			chexperiment.setIndicators(indicators);
			rs4.close();
			stmt4.close();
			
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public Integer getIdexperiment() {
		return idexperiment;
	}

	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}

	public String getExperimentname() {
		return experimentname;
	}

	public void setExperimentname(String experimentname) {
		this.experimentname = experimentname;
	}

	public MyExperimentBean getChexperiment() {
		return chexperiment;
	}

	public void setChexperiment(MyExperimentBean chexperiment) {
		this.chexperiment = chexperiment;
	}
}
