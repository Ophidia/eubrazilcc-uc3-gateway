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

import it.cmcc.eubrazil.utils.SqlQuery;
import it.cmcc.utils.DbConnection;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import com.opensymphony.xwork2.ActionSupport;

public class GetFileTIFAction extends ActionSupport {

	private static final long serialVersionUID = -8241384242571422127L;
	
	private Integer idexperiment = null;
	private String  filename     = null;
	private Integer clearinghouse  = null;
	private String  submissiondate = null;
	
	private InputStream inputStream   = null;
    private String      customname    = null;
    private Long        contentLength = null;
	
	public String execute() throws FileNotFoundException, IOException, SQLException {
		String strutsresult = ERROR;
		
		Properties prop = new Properties();
		prop.load(GetFileCSVAction.class.getClassLoader().getResourceAsStream("configs.properties"));
		String path = "";
		if (clearinghouse == 2) {
			
			System.out.println("clearinghouse = 2");
			
			String year = null;
			String month = null;
			String day = null;
			
			year = submissiondate.substring(0, 4);
			month = submissiondate.substring(5, 7);
			day = submissiondate.substring(8, 10);
			
			path = prop.getProperty("choutput") + year + "/" + month + "/" + day + "/";
		}
		else
			path = prop.getProperty("tmpoutput");
		path += "exp" + idexperiment + "/" + filename;
		System.out.println(path);
		
		File fileToDownload = new File(path);
		inputStream = new FileInputStream(fileToDownload);
		
		Connection conn = DbConnection.DATASOURCE.getConnection();
		PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_TIF_FILENAME.getSql());
		stmt.setInt(1, idexperiment);
		System.out.println(stmt.toString());
		ResultSet rs = stmt.executeQuery();
		
		String submissiondate = "";
		String workflowcode = "";
		if (rs.next()) {
			submissiondate = rs.getString("submissiondate").substring(0, 10);
			workflowcode = rs.getString("code");
		}
		
		int index = filename.indexOf(".");
		String outputnumber = filename.substring(0, index);
		customname = workflowcode + "" + submissiondate + "_" + outputnumber + ".tif";
        contentLength = fileToDownload.length();
        
        strutsresult= SUCCESS;
		return strutsresult;
	}

	public Integer getIdexperiment() {
		return idexperiment;
	}

	public void setIdexperiment(Integer idexperiment) {
		this.idexperiment = idexperiment;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public String getCustomname() {
		return customname;
	}

	public void setCustomname(String customname) {
		this.customname = customname;
	}

	public Long getContentLength() {
		return contentLength;
	}

	public void setContentLength(Long contentLength) {
		this.contentLength = contentLength;
	}

	public Integer getClearinghouse() {
		return clearinghouse;
	}

	public void setClearinghouse(Integer clearinghouse) {
		this.clearinghouse = clearinghouse;
	}

	public String getSubmissiondate() {
		return submissiondate;
	}

	public void setSubmissiondate(String submissiondate) {
		this.submissiondate = submissiondate;
	}
}
