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

package it.cmcc.eubrazil.admin.actions;

import it.cmcc.eubrazil.beans.ExpTypeBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class GetExpTypeAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<ExpTypeBean> exptypelist = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
	
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_EXP_TYPE.getSql());
			
			ResultSet rs = stmt.executeQuery();
			
			exptypelist = new LinkedList<ExpTypeBean>();
			
			ExpTypeBean occurrence = null;
			
			while (rs.next()) {
				int idworkflow = rs.getInt("idworkflow");
				if (idworkflow == 1) {
					occurrence = new ExpTypeBean();
					occurrence.setExpname("SEBAL Interannual");
					occurrence.setTotal(rs.getInt("total"));
				}
				else if (idworkflow == 2) {
					occurrence = new ExpTypeBean();
					occurrence.setExpname("Climate - Model Intercomp.");
					occurrence.setTotal(rs.getInt("total"));
				}
				else if (idworkflow == 4) {
					occurrence = new ExpTypeBean();
					occurrence.setExpname("Climate - SEBAL Intercomp.");
					occurrence.setTotal(rs.getInt("total"));
				}
				else if (idworkflow == 5) {
					occurrence = new ExpTypeBean();
					occurrence.setExpname("Relative Height");
					occurrence.setTotal(rs.getInt("total"));
				}
				else if (idworkflow == 6) {
					occurrence = new ExpTypeBean();
					occurrence.setExpname("LiDAR Products Intercomp.");
					occurrence.setTotal(rs.getInt("total"));
				}
				else if (idworkflow == 7) {
					occurrence = new ExpTypeBean();
					occurrence.setExpname("Ecological Niche Modelling");
					occurrence.setTotal(rs.getInt("total"));
				}
				
				exptypelist.add(occurrence);
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

	public List<ExpTypeBean> getExptypelist() {
		return exptypelist;
	}

	public void setExptypelist(List<ExpTypeBean> exptypelist) {
		this.exptypelist = exptypelist;
	}
}
