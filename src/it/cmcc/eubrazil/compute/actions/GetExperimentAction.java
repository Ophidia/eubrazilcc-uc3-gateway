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

import com.opensymphony.xwork2.ActionSupport;

public class GetExperimentAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	private Integer idexperiment = null;
	
	private ExperimentBean experiment = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_FROM_ID.getSql());
			stmt.setInt(1, idexperiment);
			
			ResultSet rs = stmt.executeQuery();
			
			experiment = new ExperimentBean();
			while (rs.next()) {
				experiment.setIdexperiment(rs.getInt("idexperiment"));
				int status = rs.getInt("status");
				if (status == 0 || status == 4)
					experiment.setStatus("pending");
				else if (status == 1)
					experiment.setStatus("running");
				else if (status == 2)
					experiment.setStatus("done");
				else if (status == 3)
					experiment.setStatus("failed");
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


	public Integer getIdexperiment() {
		return idexperiment;
	}

	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ExperimentBean getExperiment() {
		return experiment;
	}

	public void setExperiment(ExperimentBean experiment) {
		this.experiment = experiment;
	}
}
