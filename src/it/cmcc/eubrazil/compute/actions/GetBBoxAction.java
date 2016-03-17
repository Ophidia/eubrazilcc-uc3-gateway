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

import it.cmcc.eubrazil.beans.DatasetBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class GetBBoxAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private String typeofdataset = null;
	
	private List<DatasetBean> datasets = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_DATASET.getSql());
			
			ResultSet rs = stmt.executeQuery();
			
			datasets = new LinkedList<DatasetBean>();
			
			while (rs.next()) {
				DatasetBean dataset = new DatasetBean();
				dataset.setXmax(rs.getDouble("xmax"));
				dataset.setXmin(rs.getDouble("xmin"));
				dataset.setYmax(rs.getDouble("ymax"));
				dataset.setYmin(rs.getDouble("ymin"));
				dataset.setFilename(rs.getString("filename"));
				dataset.setTipeofdataset(rs.getString("folder"));
				dataset.setCoordinate(rs.getString("coordinate"));
				
				datasets.add(dataset);
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

	public String getTypeofdataset() {
		return typeofdataset;
	}

	public void setTypeofdataset(String typeofdataset) {
		this.typeofdataset = typeofdataset;
	}

	public List<DatasetBean> getDatasets() {
		return datasets;
	}

	public void setDatasets(List<DatasetBean> datasets) {
		this.datasets = datasets;
	}

}
