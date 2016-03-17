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

package it.cmcc.eubrazil.interactive.actions;

import it.cmcc.eubrazil.beans.ExploreNcModel;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.opensymphony.xwork2.ActionSupport;

public class CheckAvailableDataAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private String indicator = null;
	private String source = null;
	private String detail = null;
	private String numofsamples = null;
	private String latitude = null;
	private String longitude = null;
	private String typeofvariable = null;
	
	private ExploreNcModel model = null;
	
	public String execute() throws Exception {
		
		String strutsresult = new String();
		
		strutsresult = ERROR;
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			Double lat = Double.parseDouble(latitude);
			Double lon = Double.parseDouble(longitude);
			
			PreparedStatement stmt = null;
			
			if (typeofvariable.equals("climate")) {
				stmt = conn.prepareStatement(SqlQuery.GET_CLIMATE_DATASET.getSql());
				stmt.setString(1, indicator);
				stmt.setString(2, source);
				stmt.setString(3, detail);
				stmt.setDouble(4, lon);
				stmt.setDouble(5, lon);
				stmt.setDouble(6, lat);
				stmt.setDouble(7, lat);
			}
			else if (typeofvariable.equals("satellite")) {
				stmt = conn.prepareStatement(SqlQuery.GET_SATELLITE_DATASET.getSql());
				stmt.setString(1, indicator);
				stmt.setString(2, "Landsat");
				stmt.setDouble(3, lon);
				stmt.setDouble(4, lon);
				stmt.setDouble(5, lat);
				stmt.setDouble(6, lat);
			}
			
			System.out.println("query: " + stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			if (rs.next()) {
				System.out.println("rs.next()");
				model = new ExploreNcModel();
				model.setLatitude(latitude);
				strutsresult = SUCCESS;
			}
			else {
				System.out.println("not rs.next()");
				model = new ExploreNcModel();
				model.setLatitude("");
				strutsresult = ERROR;
			}
		}
		catch (Exception e) {
			e.printStackTrace();
            strutsresult = ERROR;
		}
		
		return strutsresult;
		
	}

	public String getIndicator() {
		return indicator;
	}

	public void setIndicator(String indicator) {
		this.indicator = indicator;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public String getNumofsamples() {
		return numofsamples;
	}

	public void setNumofsamples(String numofsamples) {
		this.numofsamples = numofsamples;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getTypeofvariable() {
		return typeofvariable;
	}

	public void setTypeofvariable(String typeofvariable) {
		this.typeofvariable = typeofvariable;
	}

	public ExploreNcModel getModel() {
		return model;
	}

	public void setModel(ExploreNcModel model) {
		this.model = model;
	}
}
