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

package it.cmcc.eubrazil.expdetails.actions;

import it.cmcc.eubrazil.utils.JsonManagement;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;

public class GetRelativeHeightResultsAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private Integer idexperiment = null;
	private String  jsonresult   = null;
	
	public String execute() throws Exception {
		
		System.out.println("idexperiment = " + idexperiment);
		
		String strutsresult = ERROR;
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_OUTPUTS.getSql());
			stmt.setInt(1, idexperiment);
			System.out.println(stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			JSONObject jo = new JSONObject();
			
			while(rs.next()) {
				String filenamewithextension = rs.getString("name");
				int index = filenamewithextension.indexOf(".");
				String filename = filenamewithextension.substring(0, index);
				String extension = rs.getString("extension");
				String type = rs.getString("type");
				
				Properties prop = new Properties();
				prop.load(SebalInterannualResultsAction.class.getClassLoader().getResourceAsStream("configs.properties"));
				String path = "";
				PreparedStatement stmt2 = conn.prepareStatement(SqlQuery.GET_EXPERIMENT_INFO.getSql());
				stmt2.setInt(1, idexperiment);
				System.out.println(stmt2.toString());
				ResultSet rs2 = stmt2.executeQuery();
				
				String year = null;
				String month = null;
				String day = null;
				
				while (rs2.next()){
					String submissiondate = rs2.getString("submissiondate");
					year = submissiondate.substring(0, 4);
					month = submissiondate.substring(5, 7);
					day = submissiondate.substring(8, 10);
					
					if (rs2.getInt("stored") == 2) {
						path = prop.getProperty("choutput") + year + "/" + month + "/" + day + "/";	
					}
					else if (rs2.getInt("stored") == 0 || rs2.getInt("stored") == 1)
						path = prop.getProperty("tmpoutput");
					path += "exp" + idexperiment + "/" + filename + "." + extension;
					System.out.println(path);
				}	
				
/*				if (extension.equals("json") && type.equals("chart")) {
					String json = JsonManagement.getJson(path);
					String chartjson = json.replace("NaN", "0");
					System.out.println(chartjson);
					JSONObject result = JSONObject.fromObject(chartjson);
					jo.put(filename, result);
				}
				else */if (extension.equals("json") && type.equals("grid")) {
					String json = JsonManagement.getJson(path);
					String gridjson = json.replace("NaN", "\"NaN\"");
					System.out.println(gridjson);
					JSONObject result = JSONObject.fromObject(gridjson);
					jo.put(filename, result);
				}
			}
			jsonresult = jo.toString();
			System.out.println();
			strutsresult = SUCCESS;
		}
		catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return strutsresult;
	}

	public Integer getIdexperiment() {
		return idexperiment;
	}

	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}

	public String getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(String jsonresult) {
		this.jsonresult = jsonresult;
	}
}
