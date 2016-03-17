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

import com.opensymphony.xwork2.ActionSupport;

import it.cmcc.eubrazil.beans.ExpStatBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

public class GetExpStatsAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<ExpStatBean> expstatlist = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
			
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			expstatlist = new LinkedList<ExpStatBean>();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_EXP_DONE.getSql());			
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {		
				ExpStatBean occurrence1 = new ExpStatBean();
				occurrence1.setExpstat("Done");
				occurrence1.setTotal(rs.getInt("totaldone"));
				expstatlist.add(occurrence1);
			}
			
			rs.close();
			stmt.close();
			
			PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.GET_EXP_FAILED.getSql());			
			ResultSet rs2 = stmt2.executeQuery();
			
			while (rs2.next()) {		
				ExpStatBean occurrence2 = new ExpStatBean();
				occurrence2.setExpstat("Failed");
				occurrence2.setTotal(rs2.getInt("totalfailed"));
				expstatlist.add(occurrence2);
			}
			
			rs2.close();
			stmt2.close();
			
			PreparedStatement stmt3 = conn.prepareStatement(SqlQuery.GET_EXP_RUNNING.getSql());			
			ResultSet rs3 = stmt3.executeQuery();
			
			while (rs3.next()) {		
				ExpStatBean occurrence3 = new ExpStatBean();
				occurrence3.setExpstat("Running");
				occurrence3.setTotal(rs3.getInt("totalrunning"));
				expstatlist.add(occurrence3);
			}
			
			rs3.close();
			stmt3.close();
			
			PreparedStatement stmt4 = conn.prepareStatement(SqlQuery.GET_EXP_PENDING.getSql());			
			ResultSet rs4 = stmt4.executeQuery();
			
			while (rs4.next()) {		
				ExpStatBean occurrence4 = new ExpStatBean();
				occurrence4.setExpstat("Pending");
				occurrence4.setTotal(rs4.getInt("totalpending"));
				expstatlist.add(occurrence4);
			}
			
			rs4.close();
			stmt4.close();
			
			PreparedStatement stmt5 = conn.prepareStatement(SqlQuery.GET_EXP_ASSIGNED.getSql());			
			ResultSet rs5 = stmt5.executeQuery();
			
			while (rs5.next()) {		
				ExpStatBean occurrence5 = new ExpStatBean();
				occurrence5.setExpstat("Assigned");
				occurrence5.setTotal(rs5.getInt("totalassigned"));
				expstatlist.add(occurrence5);
			}
			
			rs5.close();
			stmt5.close();
		}
		catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public List<ExpStatBean> getExpstatlist() {
		return expstatlist;
	}

	public void setExpstatlist(List<ExpStatBean> expstatlist) {
		this.expstatlist = expstatlist;
	}
		
}
