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

import java.util.Iterator;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import it.cmcc.ophidiaweb.utils.deserialization.Objcontent;

public class TextAdapter extends AbstractAdapter{
	
	public TextAdapter(List<Objcontent> objcontents){
		Iterator<Objcontent> objcontentsIt=objcontents.iterator();
		JSONArray frags=new JSONArray();
		while(objcontentsIt.hasNext()){
			Objcontent objc=objcontentsIt.next();
			JSONObject jo =new JSONObject();
			jo.put("title", objc.getTitle());
			jo.put("message", objc.getMessage());
			frags.add(objc);
		}
		super.setContent(frags);
	}

}
