/**
Eubrazil Scientific Gateway
Copyright (C) 2015 CMCC

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

package it.cmcc.eubrazil.submit;

import it.cmcc.eubrazil.beans.IndicatorModel;
import it.cmcc.eubrazil.beans.SpeciesOccurrences;
import it.cmcc.eubrazil.utils.DbConnection;
import it.cmcc.eubrazil.utils.SqlQuery;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;

public class ExploreCubeAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private Integer idjob;
	
	private List<IndicatorModel> indicator  = null;
	private List<SpeciesOccurrences> occurrence = null;
	
	public String execute() throws Exception {
		String strutsresult = new String();
		
		indicator = new LinkedList<IndicatorModel>();
		
		Properties prop = new Properties();
		prop.load(ExploreCubeAction.class.getClassLoader().getResourceAsStream("configs.properties"));
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_INFO_FROM_JOBID.getSql());
			stmt.setInt(1, idjob);
			ResultSet rs = stmt.executeQuery();
			
			String datacubedoi = null;
			String serveraddress = null;
			
			if (rs.next()) {
				datacubedoi = rs.getString("datacubedoi");
				serveraddress = rs.getString("serveraddress");
			}
			
			String[] submit = new String[] {
					"oph_term",
					"-u",
					prop.getProperty("username"),
					"-p",
					prop.getProperty("password"),
					"-H",
					serveraddress,
					"-P",
					prop.getProperty("port"),
					"-j",
					"-e",
					"oph_explorecube cube=" + datacubedoi + ";show_id=yes;level=2;exec_mode=sync;"
			};
			Process p = Runtime.getRuntime().exec(submit);
			p.waitFor();
            int exitvalue = p.exitValue();
            
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
	            	
	            	int measureindex = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).size() - 1;
	            	String measurevalue = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).getString(measureindex);
	            	String measure[] = measurevalue.split(", ");
	            	
	            	for (int i = 0; i < measure.length; i++) {
	            		IndicatorModel model = new IndicatorModel();
	            		model.setMeasure(Double.parseDouble(measure[i]));
	            		model.setTime("" + (2016 + i));
	            		indicator.add(model);
	            	}
		            strutsresult = SUCCESS;
	            }
            }
            else
            	strutsresult = ERROR;
            
		} catch (Exception e) {
			e.printStackTrace();
            strutsresult = ERROR;
		}
		return strutsresult;
	}

	public String jsonexecute() throws Exception {
		String strutsresult = new String();
		
		indicator = new LinkedList<IndicatorModel>();
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_JSON_PATH.getSql());
			stmt.setInt(1, idjob);
			ResultSet rs = stmt.executeQuery();
			
			String jsonpath = "/home/oph-dev/devel/install/Agent/store/";
			if (rs.next()) {
				jsonpath += rs.getString("filename");
			}
			FileReader fr = new FileReader(jsonpath);
			BufferedReader in = new BufferedReader(fr);
			
        	String jsonobject = "";
            String line = null;
            while ((line = in.readLine()) != null)
            	jsonobject += line;
            
            JSONObject jo = JSONObject.fromObject(jsonobject);
            /**
             * check if JSON is valid
             * **/
            if (jo.getString("stderr").equals("") || jo.getString("stderr").equals("\nWarning: There is no datacube to resume\n")) {
            	
            	int measureindex = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).size() - 1;
            	String measurevalue = jo.getJSONObject("response").getJSONArray("response").getJSONObject(0).getJSONArray("objcontent").getJSONObject(0).getJSONArray("rowvalues").getJSONArray(0).getString(measureindex);
            	String measure[] = measurevalue.split(", ");
            	
            	for (int i = 0; i < measure.length; i++) {
            		IndicatorModel model = new IndicatorModel();
            		model.setMeasure(Double.parseDouble(measure[i]));
            		model.setTime("" + (2016 + i));
            		indicator.add(model);
            	}
	            strutsresult = SUCCESS;
            }
		} catch (Exception e) {
			e.printStackTrace();
            strutsresult = ERROR;
		}
		return strutsresult;
	}
	
public String xmlexecute() throws Exception {
		
		String strutsresult = new String();
		
		occurrence = new LinkedList<SpeciesOccurrences>();
		
		Connection conn = null;
		
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_XML_PATH.getSql());
			stmt.setInt(1, idjob);
			ResultSet rs = stmt.executeQuery();
			
			String xmlpath = "/home/oph-dev/devel/install/Agent/store/";
			if (rs.next()) {
				xmlpath += rs.getString("datacubedoi");
			}
				
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(new File (xmlpath));
			
			NodeList root = doc.getElementsByTagName("occ");
			
			for (int s = 0; s < root.getLength(); s++) {
				Node fstNode = root.item(s);
				if (fstNode.getNodeType() == Node.ELEMENT_NODE) {
					SpeciesOccurrences speciesoccurrences = new SpeciesOccurrences();
					Element element = (Element) fstNode;
					String scientific_name = element.getAttribute("scientific-name");
					String genus = element.getAttribute("genus");
					String species = element.getAttribute("species");
					String lat = element.getAttribute("lat");
					String lon = element.getAttribute("long");
					String institutionCode = element.getAttribute("institution-code");
					String collectionCode = element.getAttribute("collection-code");
					String collectionId = element.getAttribute("collection-id");
					String catalogNumber = element.getAttribute("catalog-number");
						
					speciesoccurrences.setScientificName(scientific_name);
					speciesoccurrences.setGenus(genus);
					speciesoccurrences.setSpecies(species);
					speciesoccurrences.setLat(lat);
					speciesoccurrences.setLon(lon);
					speciesoccurrences.setInstitutionCode(institutionCode);
					speciesoccurrences.setCollectionCode(collectionCode);
					speciesoccurrences.setCollectionId(collectionId);
					speciesoccurrences.setCatalogNumber(catalogNumber);
					
					occurrence.add(speciesoccurrences);
				}
			}
			strutsresult = SUCCESS;
		}
		
		catch (Exception e) {
			e.printStackTrace();
            strutsresult = ERROR;
		}
		
		return strutsresult;
	}
	

	public Integer getIdjob() {
		return idjob;
	}

	public void setIdjob(Integer idjob) {
		this.idjob = idjob;
	}

	public List<IndicatorModel> getIndicator() {
		return indicator;
	}

	public void setIndicator(List<IndicatorModel> indicator) {
		this.indicator = indicator;
	}

	public List<SpeciesOccurrences> getOccurrence() {
		return occurrence;
	}

	public void setOccurrence(List<SpeciesOccurrences> occurrence) {
		this.occurrence = occurrence;
	}
}