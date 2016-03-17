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
import it.cmcc.eubrazil.beans.InteractiveIndicatorModel;
import it.cmcc.eubrazil.beans.StatisticsModel;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;

public class ExploreNcAction extends ActionSupport {
	
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
		
		Properties prop = new Properties();
		prop.load(ExploreNcAction.class.getClassLoader().getResourceAsStream("configs.properties"));
		
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
			
			System.out.println("ExploreNcAction - query: " + stmt.toString());
			ResultSet rs = stmt.executeQuery();
			
			String filename = null;
			String folder = null;
			
			if (rs.next()) {
				filename = rs.getString("filename");
				folder   = rs.getString("folder");
				String path = prop.getProperty("input") + folder + "/" + filename;
				
				String[] submit = new String[] {
						"oph_term",
						"-u",
						prop.getProperty("username"),
						"-p",
						prop.getProperty("password"),
						"-H",
						prop.getProperty("host"),
						"-P",
						prop.getProperty("port"),
						"-j",
						"-e",
						"oph_explorenc measure=" + indicator + ";src_path=" +  path + ";exp_dim=lon|lat;imp_dim=time;subset_dims=lat|lon;subset_filter=" + lat + "|" + lon + ";subset_type=coord;level=2;imp_num_points=" + numofsamples + ";show_fit=yes;show_stats=11111111111111;show_time=yes;exec_mode=sync;"
				};
				String submissionstring = new String();
				for(int i = 0; i < submit.length; i++) {
					submissionstring += submit[i] + " ";
				}
				System.out.println("ExploreNcAction - Submitting string: " + submissionstring);
				
				Process p = Runtime.getRuntime().exec(submit);
				p.waitFor();
	            int exitvalue = p.exitValue();
	            System.out.println("ExploreNcAction - exitvalue: " + exitvalue);
	            
	            if (exitvalue == 0) {
	            	String jsonobject = "";
		            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
		            String line = null;
		            while ((line = in.readLine()) != null)
		            	jsonobject += line;
		            
		            JSONObject jo = JSONObject.fromObject(jsonobject);
		            /**
		             * check if JSON is valid
		             * **/
		            if (jo.getString("stderr").equals("") || jo.getString("stderr").equals("\nWarning: There is no datacube to resume\n")) {
		            	longitude = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).getString(0);
		            	latitude = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).getString(1);
		            	String measurevalue = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).getString(2);
		            	
		            	String regressionvalue = jo.getJSONObject("response").getJSONArray("response").getJSONObject(2).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).getString(2);
		            	
		            	String measure[] = measurevalue.split(", ");
		            	String regression[] = regressionvalue.split(", ");
		            	
		            	List<InteractiveIndicatorModel> timeseries = new LinkedList<InteractiveIndicatorModel>();
		            	
		            	for (int i = 0; i < measure.length; i++) {
		            		InteractiveIndicatorModel occurrence = new InteractiveIndicatorModel();
		            		Double measurei = Math.floor(Double.parseDouble(measure[i]) * 100) / 100;
		            		Double regressioni = Math.floor(Double.parseDouble(regression[i]) * 100) / 100;
		            		occurrence.setMeasure(measurei);
		            		occurrence.setRegression(regressioni);
		            		String time = jo.getJSONObject("response").getJSONArray("response").getJSONObject(4).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(i).getString(0);
		            		int end = time.indexOf("-");
		            		String year = time.substring(0, end);
		            		occurrence.setTime(year);
		            		timeseries.add(occurrence);
		            	}
		            	
		            	JSONArray jsonstats = jo.getJSONObject("response").getJSONArray("response").getJSONObject(1).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0);
		            	JSONArray jsonstatskeys = jo.getJSONObject("response").getJSONArray("response").getJSONObject(1).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowkeys");
		            	
		            	List<StatisticsModel> statistics = new LinkedList<StatisticsModel>();
		            	for (int i = 2; i < jsonstats.size(); i++) {
		            		StatisticsModel stat = new StatisticsModel();
		            		stat.setName(jsonstatskeys.getString(i));
		            		stat.setValue(Double.parseDouble(jsonstats.getString(i)));
		            		statistics.add(stat);
		            	}
		            	model = new ExploreNcModel();
		            	model.setLatitude(latitude);
		            	model.setLongitude(longitude);
		            	model.setTimeseries(timeseries);
		            	model.setStatistics(statistics);
			            strutsresult = SUCCESS;
		            }
	            }
	            else
	            	strutsresult = ERROR;
			}
			else {
				strutsresult = ERROR;
			}
		} catch (Exception e) {
			e.printStackTrace();
            strutsresult = ERROR;
            System.out.println("ExploreNcAction - error: " + e.getMessage());
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
