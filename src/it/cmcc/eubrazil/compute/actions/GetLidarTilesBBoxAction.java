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

public class GetLidarTilesBBoxAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<DatasetBean> lidarbbox = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_LIDARBBOX.getSql());
			
			ResultSet rs = stmt.executeQuery();
			
			lidarbbox = new LinkedList<DatasetBean>();
			
			while (rs.next()) {
				DatasetBean bbox = new DatasetBean();
				bbox.setXmax(rs.getDouble("xmax"));
				bbox.setXmin(rs.getDouble("xmin"));
				bbox.setYmax(rs.getDouble("ymax"));
				bbox.setYmin(rs.getDouble("ymin"));
				bbox.setFilename(rs.getString("filename"));
				bbox.setTipeofdataset(rs.getString("folder"));
				bbox.setCoordinate(rs.getString("coordinate"));
				
				lidarbbox.add(bbox);
			}
			System.out.println(lidarbbox.size());
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

	public List<DatasetBean> getLidarbbox() {
		return lidarbbox;
	}

	public void setLidarbbox(List<DatasetBean> lidarbbox) {
		this.lidarbbox = lidarbbox;
	}
}
