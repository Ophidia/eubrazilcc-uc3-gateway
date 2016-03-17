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
import java.util.LinkedList;
import java.util.List;

import it.cmcc.eubrazil.beans.DataPointsBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import com.opensymphony.xwork2.ActionSupport;

public class SpeciesDataPointsListAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	private Integer speciesId = null;
	
	private List<DataPointsBean> dataPointsList = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_SPECIES_DATA_POINTS_LIST.getSql());
			System.out.println(stmt.toString());
			stmt.setInt(1, speciesId);
			ResultSet rs = stmt.executeQuery();
			
			dataPointsList = new LinkedList<DataPointsBean>();
			
			while (rs.next()) {
				DataPointsBean dataPoint = new DataPointsBean();
				
				int idDataPoint  = rs.getInt("iddatapoint");
				dataPoint.setIdDataPoint(idDataPoint);
				
				String xPoint = rs.getString("x");
				String yPoint = rs.getString("y");
				
				String point = xPoint + " : " + yPoint;
				
				dataPoint.setPoint(point);
				
				dataPointsList.add(dataPoint);
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getSpeciesId() {
		return speciesId;
	}

	public void setSpeciesId(Integer speciesId) {
		this.speciesId = speciesId;
	}

	public List<DataPointsBean> getDataPointsList() {
		return dataPointsList;
	}

	public void setDataPointsList(List<DataPointsBean> dataPointsList) {
		this.dataPointsList = dataPointsList;
	}
	
}
