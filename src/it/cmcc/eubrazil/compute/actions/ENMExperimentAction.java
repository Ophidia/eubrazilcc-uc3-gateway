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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import it.cmcc.eubrazil.beans.ExperimentBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import com.opensymphony.xwork2.ActionSupport;

public class ENMExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	private List<ExperimentBean> jsonresult = null;
	
	private Integer speciesId = null;
	
	private List<Integer> dataPointsList =  new ArrayList<Integer>();
	
	public String execute() throws Exception {
		
		//System.out.println(speciesId);
		//System.out.println(dataPointsList.length);
		if (speciesId == null)
			return ERROR;
		else {
			jsonresult = new LinkedList<ExperimentBean>();
			
			Connection conn = null;
			try {
				conn = DbConnection.DATASOURCE.getConnection();
				
				PreparedStatement stmt = conn.prepareStatement(SqlQuery.INSERT_EXPERIMENT.getSql(), Statement.RETURN_GENERATED_KEYS);
				stmt.setString(1, "enm");
				stmt.setString(2, user.getEmail());
//				System.out.println("stmt: " + stmt.toString());
				
				stmt.executeUpdate();
				ResultSet rs = stmt.getGeneratedKeys();
				int experimentid = -1;
				if (rs.next())
					experimentid = rs.getInt(1);
				
				rs.close();
				stmt.close();
				
				System.out.println("experiment inserted: " + experimentid);
				
				PreparedStatement stmt2 = null;
				
				for (int i = 0; i < dataPointsList.size(); i++) {
					System.out.println(dataPointsList.get(i));
					
					stmt2 = conn.prepareStatement(SqlQuery.INSERT_ENM_EXP.getSql(), Statement.RETURN_GENERATED_KEYS);
					stmt2.setInt(1, experimentid);
					stmt2.setInt(2, dataPointsList.get(i));
					System.out.println("stmt2 = " + stmt2.toString());
					stmt2.executeUpdate();
					
					System.out.println("query executed");
				}
				
				stmt2.close();
				
			}
			catch(SQLException e) {
				return ERROR;
			} finally {
				if(conn != null) conn.close();
			}
			
			return SUCCESS;
		}
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<ExperimentBean> getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(List<ExperimentBean> jsonresult) {
		this.jsonresult = jsonresult;
	}

	public Integer getSpeciesId() {
		return speciesId;
	}

	public void setSpeciesId(Integer speciesId) {
		this.speciesId = speciesId;
	}

	public List<Integer> getDataPointsList() {
		return dataPointsList;
	}

	public void setDataPointsList(List<Integer> dataPointsList) {
		this.dataPointsList = dataPointsList;
	}
}
