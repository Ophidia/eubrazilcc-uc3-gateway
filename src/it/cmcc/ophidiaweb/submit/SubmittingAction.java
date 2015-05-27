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

package it.cmcc.ophidiaweb.submit;

import it.cmcc.eubrazil.utils.DbConnection;
import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.ophidiaweb.utils.ObjectContentValidator;
import it.cmcc.ophidiaweb.utils.adapters.ext.AbstractAdapter;
import it.cmcc.ophidiaweb.utils.adapters.ext.AdapterFactory;
import it.cmcc.ophidiaweb.utils.deserialization.DeserializedJSON;
import it.cmcc.ophidiaweb.utils.deserialization.Objcontent;
import it.cmcc.ophidiaweb.utils.deserialization.Response;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Iterator;
import java.util.Properties;

import net.sf.json.JSONObject;

import org.codehaus.jackson.map.ObjectMapper;

import com.opensymphony.xwork2.ActionSupport;

public class SubmittingAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private String operator;
	private String config;
	private Integer idjob;
	private String messagetype;
	private String result;
	private String jobid;
	
	private JSONObject jsonresult;
	
	public String execute() throws Exception {
		String strutsresult = new String();
		
		result = new String();
		jobid = new String();
		
		Properties prop = new Properties();
		prop.load(SubmittingAction.class.getClassLoader().getResourceAsStream("configs.properties"));
		
		try {
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
					"-e",
					"" + operator + " " + config + "exec_mode=batch;callback_url=" + prop.getProperty("callbackurl") + messagetype + ";"
			};
			
			Process p = Runtime.getRuntime().exec(submit);
			p.waitFor();
            int exitvalue = p.exitValue();
            
            if (exitvalue == 0) {
	            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));

	            String line = null;
	            while ((line = in.readLine()) != null) {
	            	if (line.contains("[JobID]:")) {
	            		if ((line = in.readLine()) != null) {
	            			jobid = line;
	            		}
	            		else
	            			return ERROR;
	            	}
	            }
            	strutsresult = SUCCESS;
            	result=jobid;
            }
            else
            	strutsresult = ERROR;
		}
		catch (Exception e) {  
            e.printStackTrace();
            strutsresult = ERROR;
        }
		
		return strutsresult;
	}
	
	/**
	 * synchronous submit
	 * @return a json string as result
	 * @throws Exception
	 */
	public String synchexecute() throws Exception {
		String strutsresult = new String();
		jsonresult = new JSONObject();
		
		Properties prop = new Properties();
		prop.load(SubmittingAction.class.getClassLoader().getResourceAsStream("configs.properties"));
		
		Connection conn = null;
		try {
			conn = DbConnection.DATASOURCE.getConnection();
			
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_INFO_FROM_JOBID.getSql());
			stmt.setInt(1, idjob);
			ResultSet rs = stmt.executeQuery();
			
			String serveraddress = null;
			
			if (rs.next()) {
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
					"" + operator + " " + config + "exec_mode=sync;"
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
	            	String responsestring = jo.getJSONObject("response").toString();
		            ObjectMapper mapper = new ObjectMapper();
		            DeserializedJSON dj = mapper.readValue(responsestring, DeserializedJSON.class);

		            /** 
		             * Get response key set from property file
		             * For each key different from 'status'
		             * call the related adapter
		             * **/
		            Properties operatorkeyset = new Properties();
		            operatorkeyset.load(SubmittingAction.class.getClassLoader().getResourceAsStream("operatorskeyset.properties"));
		            String keyset = operatorkeyset.getProperty(operator);
		            String keys[];
					if (keyset.contains("|")) {
						keys = keyset.split("\\|");
					}
					else {
						keys = new String[1];
						keys[0] = keyset;
					}
					for (int i = 0; i < keys.length; i++) {
						String key = keys[i];
	            		Iterator<Response> itresp =  dj.getResponse().iterator();
	            		while (itresp.hasNext()) {
	            			Response resp = itresp.next();
	            			if (resp.getObjkey().equals(key)) {
	            				ObjectContentValidator objcv = new ObjectContentValidator();
	            				Objcontent objc = resp.getObjcontent().get(0);
	            				if (objc != null && objcv.validateObjectContent(resp.getObjclass(), objc)) {
	            					AbstractAdapter aa = AdapterFactory.getAdapterInstance(0, resp.getObjclass(), resp);
	            					jsonresult.put(resp.getObjkey(), aa.getContent());
	            				}
	            				else
	            					strutsresult = ERROR;
	            			}
	            		}
					}
		            strutsresult = SUCCESS;
	            }
	            else
	            	strutsresult = ERROR;
            }
            else
            	strutsresult = ERROR;
            
		} catch (Exception e) {
			e.printStackTrace();
            strutsresult = ERROR;
		}
		return strutsresult;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getConfig() {
		return config;
	}

	public void setConfig(String config) {
		this.config = config;
	}

	public String getMessagetype() {
		return messagetype;
	}

	public void setMessagetype(String messagetype) {
		this.messagetype = messagetype;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getJobid() {
		return jobid;
	}

	public void setJobid(String jobid) {
		this.jobid = jobid;
	}

	public JSONObject getJsonresult() {
		return jsonresult;
	}

	public void setJsonresult(JSONObject jsonresult) {
		this.jsonresult = jsonresult;
	}

	public Integer getIdjob() {
		return idjob;
	}

	public void setIdjob(Integer idjob) {
		this.idjob = idjob;
	}

}
