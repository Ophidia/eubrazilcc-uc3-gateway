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

package it.cmcc.ophidiaweb.utils.adapters.ext;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import it.cmcc.ophidiaweb.utils.JSONNull;
import it.cmcc.ophidiaweb.utils.deserialization.Objcontent;

public class GridAdapter extends AbstractAdapter{
	private List<Objcontent> objcontents;
	private Set<String> sortableTypes;
	
	public GridAdapter(List<Objcontent> objcontents, boolean additionalInfo){
		this.objcontents=objcontents;
		
		sortableTypes=new HashSet<String>();
		sortableTypes.add("int");
		sortableTypes.add("float");
		sortableTypes.add("time");
		sortableTypes.add("string");
		
		if(additionalInfo)
			gridAndDataBuilder();
		else dataBuilder();
	}
	
	public void gridAndDataBuilder(){
		Iterator<Objcontent> objcontentsIt=objcontents.iterator();
		JSONArray frags=new JSONArray();
		while(objcontentsIt.hasNext()){
			Objcontent objc=objcontentsIt.next();
			JSONObject frag=getGridAndDataFromObjcontent(objc);
			frags.add(frag);
		}
		super.setContent(frags);
	}

	public void dataBuilder() {
		Iterator<Objcontent> objcontentsIt=objcontents.iterator();
		JSONArray frags=new JSONArray();
		while(objcontentsIt.hasNext()){
			Objcontent objc=objcontentsIt.next();
			JSONObject frag=getDataFromObjcontent(objc);
			frags.add(frag);
		}
		super.setContent(frags);
	}
	
	public JSONObject getGridAndDataFromObjcontent(Objcontent objc){
		String[] rowkeys=objc.getRowkeys();
		String[] rowfieldtypes=objc.getRowfieldtypes();
		String[][] rowvalues=objc.getRowvalues();
		
		int ncols=rowkeys.length;
		
		Boolean[] isfieldsortable= new Boolean[ncols];
		
		for(int i=0;i<ncols;i++){
			if(sortableTypes.contains(rowfieldtypes[i])) isfieldsortable[i]=true;
			else isfieldsortable[i]=false;
		}
		
		JSONObject frag=new JSONObject();
		for(int i=0;i<ncols;i++){
			JSONObject gridColumn = new JSONObject();
			JSONObject modelColumn = new JSONObject();
			
			gridColumn.put("header", rowkeys[i]);
			if(i==ncols-1) gridColumn.put("flex", 3);
			else gridColumn.put("flex", 0.1);
			gridColumn.put("dataIndex", rowkeys[i]);
			gridColumn.put("sortable", isfieldsortable[i]);
			if(rowfieldtypes[i].equals("hidden")) gridColumn.put("hidden", true);
			
			modelColumn.put("name", rowkeys[i]);
			modelColumn.put("type",rowfieldtypes[i]);
			
			frag.accumulate("grid", gridColumn);
			frag.accumulate("model", modelColumn);
		}
		
		String title=objc.getTitle();
		if(title==null) title="";
		
		String description=objc.getDescription();
		if(description==null) description="";
		
		frag.put("title", title);
		frag.put("description", description);
		
		JSONObject row;
		for(int i=0;i<rowvalues.length;i++){
			row=new JSONObject();
			for(int j=0;j<rowkeys.length;j++){
				if(rowvalues[i][j]==null || rowvalues[i][j].equals("null"))
					row.put(rowkeys[j],JSONNull.NULL);
				else row.put(rowkeys[j],rowvalues[i][j]);
			}
			frag.accumulate("data", row);
		}
		return frag;
	}
	
	public JSONObject getDataFromObjcontent(Objcontent objc){
		String[] keys=objc.getRowkeys();
		String[][] values=objc.getRowvalues();
		
		JSONObject frag=new JSONObject();
		
		String title=objc.getTitle();
		if(title==null) title="";
		
		String description=objc.getDescription();
		if(description==null) description="";
		
		frag.put("title", title);
		frag.put("description", description);
		
		JSONObject row;
		for(int i=0;i<values.length;i++){
			row=new JSONObject();
			for(int j=0;j<keys.length;j++){
				if(values[i][j]==null || values[i][j].equals("null"))
					row.put(keys[j],JSONNull.NULL);
				else row.put(keys[j],values[i][j]);
			}
			frag.accumulate("data", row);
		}
		return frag;
	}
	
}
