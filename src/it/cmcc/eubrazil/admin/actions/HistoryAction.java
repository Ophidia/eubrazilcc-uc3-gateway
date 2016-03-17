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

import it.cmcc.eubrazil.beans.HistoryBean;
import it.cmcc.utils.DbConnection;
import it.cmcc.eubrazil.utils.SqlQuery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

public class HistoryAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<HistoryBean> historylist = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_HISTORY.getSql());
			
			ResultSet rs = stmt.executeQuery();
			
			historylist = new LinkedList<HistoryBean>();
			
			HistoryBean historyoccurrence = null;
			while (rs.next()) {
				int idthread = rs.getInt("idthread");
				if (idthread == 0) {
					historyoccurrence = new HistoryBean();
					Timestamp timestamp = rs.getTimestamp("timestamp");
					String time = new SimpleDateFormat("HH:mm:ss").format(timestamp);
					historyoccurrence.setTime(time);
					historyoccurrence.setExpqueue1(rs.getInt("jobnum"));
				}
				else if (idthread == 1)
					historyoccurrence.setExpqueue2(rs.getInt("jobnum"));
				else if (idthread == 2) {
					historyoccurrence.setExpqueue3(rs.getInt("jobnum"));
					historylist.add(historyoccurrence);
				}
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

	public List<HistoryBean> getHistorylist() {
		return historylist;
	}

	public void setHistorylist(List<HistoryBean> historylist) {
		this.historylist = historylist;
	}

}
