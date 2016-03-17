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

import it.cmcc.eubrazil.beans.SpeciesBean;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.sessionhandling.beans.User;
import it.cmcc.sessionhandling.interceptors.UserAware;
import it.cmcc.utils.DbConnection;

import com.opensymphony.xwork2.ActionSupport;

public class SpeciesListAction extends ActionSupport implements UserAware {
	
	private static final long serialVersionUID = 1L;
	
	private User user = null;
	
	private List<SpeciesBean> speciesList = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_SPECIES_LIST.getSql());
			System.out.println(stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			speciesList = new LinkedList<SpeciesBean>();
			
			while (rs.next()) {
				SpeciesBean species = new SpeciesBean();
				
				int idspecies = rs.getInt("iddataset");
				species.setIdspecies(idspecies);
				
				species.setSpeciesName(rs.getString("filename"));
				
				speciesList.add(species);
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

	public List<SpeciesBean> getSpeciesList() {
		return speciesList;
	}

	public void setSpeciesList(List<SpeciesBean> speciesList) {
		this.speciesList = speciesList;
	}
}
