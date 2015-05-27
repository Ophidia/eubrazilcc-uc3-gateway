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
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class SubmitAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	// climate
	private String latrange;
	private String lonrange;
	private int[] indicators;
	private int[] scenarios;
	private int[] models;
	private String[] timerange;
	
	// landsat
	private int[] vegetationindices;
	private int[] scenes;
	private int[] sensors;
	
	private String genus;
	private String species;

    private Integer experimentid;
	
	private List<MyExperimentBean> jsonresult = null;
	
	public String execute() throws Exception {
		
		String bbox = latrange + "|" + lonrange;
		
		String timeinterval = timerange[0] + ":" + timerange[1];
		
		jsonresult = new LinkedList<MyExperimentBean>();

		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.INSERT_EXPERIMENT.getSql(), Statement.RETURN_GENERATED_KEYS);
			
			/* begin transaction */
			conn.setAutoCommit(false);
			
			/** insert experiment **/
			stmt.setString(1, bbox);
			stmt.setString(2, timeinterval);
			stmt.executeUpdate();
			ResultSet rs = stmt.getGeneratedKeys();
			if (rs.next())
				experimentid = rs.getInt(1);
			
			PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.INSERT_JOB.getSql());
			
			/** insert jobs **/
			for (int i = 0; i < indicators.length; i++) {
				int indicatorid = indicators[i];
				for (int m = 0; m < models.length; m++) {
					int modelid = models[m];
					for (int s = 0; s < scenarios.length; s++) {
						int scenarioid = scenarios[s];
						stmt2.setInt(1, experimentid);
						stmt2.setInt(2, modelid);
						stmt2.setInt(3, scenarioid);
						stmt2.setInt(4, indicatorid);
						stmt2.setString(5, "Climate");
						stmt2.executeUpdate();
					}
				}
			}
			
			for (int i = 0; i < vegetationindices.length; i++) {
				int vegetationindex = vegetationindices[i];
				for (int m = 0; m < sensors.length; m++) {
					int sensorid = sensors[m];
					for (int s = 0; s < scenes.length; s++) {
						int sceneid = scenes[s];
						stmt2.setInt(1, experimentid);
						stmt2.setInt(2, sensorid);
						stmt2.setInt(3, sceneid);
						stmt2.setInt(4, vegetationindex);
						stmt2.setString(5, "Landsat");
						stmt2.executeUpdate();
					}
				}
			}
			
			PreparedStatement tempstmt = conn.prepareStatement(SqlQuery.GET_GENUS_ID_FROM_NAME.getSql());
			tempstmt.setString(1, genus);
			ResultSet temprs = tempstmt.executeQuery();
			Integer genusid = null;
			if (temprs.next())
				genusid = temprs.getInt("idmodel");
			
			PreparedStatement tempstmt2 = conn.prepareStatement(SqlQuery.GET_SPECIES_ID_FROM_NAME.getSql());
			tempstmt2.setString(1, species);
			ResultSet temprs2 = tempstmt2.executeQuery();
			Integer speciesid = null;
			if (temprs2.next())
				speciesid = temprs2.getInt("idscenario");
			
			stmt2.setInt(1, experimentid);
			stmt2.setInt(2, genusid);
			stmt2.setInt(3, speciesid);
			stmt2.setInt(4, 19);
			stmt2.setString(5, "Species");
			stmt2.executeUpdate();
			
			conn.commit();
			/* end transaction */
			
			rs.close();
			stmt.close();
			stmt2.close();
			tempstmt.close();
			tempstmt2.close();
			temprs.close();
			temprs2.close();
			
			/** get experiment info **/
			PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.GET_EXPERIMENT.getSql());
			stmt3.setInt(1, experimentid);
			ResultSet rs3 = stmt3.executeQuery();
			MyExperimentBean myexp = new MyExperimentBean();
			if (rs3.next()) {
				myexp.setBoundingbox(rs3.getString("boundingbox"));
				myexp.setIdexperiment(rs3.getInt("idexperiment"));
				myexp.setExperimentname("Experiment " + experimentid);
				myexp.setTimerange(rs3.getString("timerange"));
				myexp.setSubmissiondate(rs3.getString("submissiondate"));
				int status = rs3.getInt("status");
				if (status == 0 || status == 4)
					myexp.setStatus("pending");
				else if (status == 1)
					myexp.setStatus("running");
				else if (status == 2)
					myexp.setStatus("completed");
				else
					myexp.setStatus("failed");
			}
			
			rs3.close();
			stmt3.close();
			
			/** get indicators info **/
			String indicatorquery = SqlQuery.GET_INDICATORS_NAME.getSql();
			for (int i = 0; i < indicators.length - 1; i++) {
				int indicatorid = indicators[i];
				indicatorquery += indicatorid + " OR idindicator=";
			}
			indicatorquery += indicators[indicators.length -1] + ";";
			PreparedStatement stmt4 = conn.prepareStatement(indicatorquery);
			ResultSet rs4 = stmt4.executeQuery();
			String indicatorslist = "";
			while (rs4.next()) {
				indicatorslist += rs4.getString("name") + " ";
			}
			myexp.setIndicators(indicatorslist);
			
			rs4.close();
			stmt4.close();
			
			/** get scenarios info **/
			String scenarioquery = SqlQuery.GET_SCENARIOS_NAME.getSql();
			for (int i = 0; i < scenarios.length - 1; i++) {
				int scenarioid = scenarios[i];
				scenarioquery += scenarioid + " OR idscenario=";
			}
			scenarioquery += scenarios[scenarios.length -1] + ";";
			PreparedStatement stmt5 = conn.prepareStatement(scenarioquery);
			ResultSet rs5 = stmt5.executeQuery();
			String scenarioslist = "";
			while (rs5.next()) {
				scenarioslist += rs5.getString("name") + " ";
			}
			myexp.setScenarios(scenarioslist);
			
			rs5.close();
			stmt5.close();
			
			/** get models info **/
			String modelquery = SqlQuery.GET_MODELS_NAME.getSql();
			for (int i = 0; i < models.length - 1; i++) {
				int modelid = models[i];
				modelquery += modelid + " OR idmodel=";
			}
			modelquery += models[models.length -1] + ";";
			PreparedStatement stmt6 = conn.prepareStatement(modelquery);
			ResultSet rs6 = stmt6.executeQuery();
			String modelslist = "";
			while (rs6.next()) {
				modelslist += rs6.getString("name") + " ";
			}
			myexp.setModels(modelslist);
			
			rs6.close();
			stmt6.close();
			
			jsonresult.add(myexp);
			
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public String getLatrange() {
		return latrange;
	}

	public void setLatrange(String latrange) {
		this.latrange = latrange;
	}

	public String getLonrange() {
		return lonrange;
	}

	public void setLonrange(String lonrange) {
		this.lonrange = lonrange;
	}

	public int[] getIndicators() {
		return indicators;
	}

	public void setIndicators(int[] indicators) {
		this.indicators = indicators;
	}

	public int[] getScenarios() {
		return scenarios;
	}

	public void setScenarios(int[] scenarios) {
		this.scenarios = scenarios;
	}

	public int[] getModels() {
		return models;
	}

	public void setModels(int[] models) {
		this.models = models;
	}

	public String[] getTimerange() {
		return timerange;
	}

	public void setTimerange(String[] timerange) {
		this.timerange = timerange;
	}

	public int[] getVegetationindices() {
		return vegetationindices;
	}

	public void setVegetationindices(int[] vegetationindices) {
		this.vegetationindices = vegetationindices;
	}

	public int[] getScenes() {
		return scenes;
	}

	public void setScenes(int[] scenes) {
		this.scenes = scenes;
	}

	public int[] getSensors() {
		return sensors;
	}

	public void setSensors(int[] sensors) {
		this.sensors = sensors;
	}

	public Integer getExperimentid() {
		return experimentid;
	}

	public void setExperimentid(Integer experimentid) {
		this.experimentid = experimentid;
	}

	public List<MyExperimentBean> getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(List<MyExperimentBean> jsonresult) {
		this.jsonresult = jsonresult;
	}

	public String getGenus() {
		return genus;
	}

	public void setGenus(String genus) {
		this.genus = genus;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

}
