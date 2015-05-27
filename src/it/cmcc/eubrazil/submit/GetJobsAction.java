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

import it.cmcc.eubrazil.beans.JobBean;
import it.cmcc.eubrazil.utils.DbConnection;
import it.cmcc.eubrazil.utils.SqlQuery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class GetJobsAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private Integer experimentid;
	
	private List<JobBean> jobs = null;

	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_JOBS_BY_EXPERIMENT_ID.getSql());
			stmt.setInt(1, experimentid);
			ResultSet rs = stmt.executeQuery();
			
			PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_STATUS.getSql());
			stmt2.setInt(1, experimentid);
			ResultSet rs2 = stmt2.executeQuery();
			
			jobs = new LinkedList<JobBean>();
			
			int experimentstatus = -1;
			if (rs2.next()) {
				experimentstatus = rs2.getInt("status");
			}
			
			while (rs.next()) {
				JobBean job = new JobBean();
				job.setId(rs.getInt("idjob"));
				job.setIdjob(rs.getInt("idjob"));
				job.setIdexperiment(experimentid);
				job.setModel(rs.getString("mname"));
				job.setScenario(rs.getString("sname"));
				job.setIndicator(rs.getString("iname"));
				job.setDatacubedoi(rs.getString("datacubedoi"));
				job.setBoundingbox(rs.getString("boundingbox"));
				job.setTimerange(rs.getString("timerange"));
				job.setStartdate(rs.getString("startdate"));
				job.setTypeofsource(rs.getString("typeofsource"));
				job.setIcodename(rs.getString("icodname"));
				job.setMcodename(rs.getString("mcodname"));
				job.setScodename(rs.getString("scodname"));
				job.setAvailable(rs.getInt("available"));
				job.setFilename(rs.getString("filename"));
				
				int status = rs.getInt("status");
				if (status == 0  || status == 4)
					job.setStatus("pending");
				else if (status == 1)
					job.setStatus("running");
				else if (status == 2)
					job.setStatus("done");
				else
					job.setStatus("failed");
				
				int chstatus = rs.getInt("chstatus");
				if (chstatus == 0)
					job.setChstatus("default");
				else if (chstatus == 1)
					job.setChstatus("request");
				else if (chstatus == 2)
					job.setChstatus("saving");
				else if (chstatus == 3)
					job.setChstatus("stored");
				else
					job.setChstatus("request failed");
				
				if (experimentstatus == 0)
					job.setExperimentstatus("pending");
				else if (experimentstatus == 1)
					job.setExperimentstatus("running");
				else if (experimentstatus == 2)
					job.setExperimentstatus("done");
				else
					job.setExperimentstatus("failed");
				
				jobs.add(job);
			}
			
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public Integer getExperimentid() {
		return experimentid;
	}

	public void setExperimentid(Integer experimentid) {
		this.experimentid = experimentid;
	}

	public List<JobBean> getJobs() {
		return jobs;
	}

	public void setJobs(List<JobBean> jobs) {
		this.jobs = jobs;
	}
}