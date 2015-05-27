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

import it.cmcc.ophidiaweb.utils.deserialization.Response;

public class AdapterFactory {
	public static final String OBJCLASS_TEXT="text";
	public static final String OBJCLASS_MULTIDIMGRID="multidimgrid";
	public static final String OBJCLASS_GRID="grid";
	public static final String OBJCLASS_DICTIONARY="dictionary";
	public static final String OBJCLASS_TREE="tree";
	
	public static final String CHART_VISUALIZATION="chart";
	public static final String GRID_VISUALIZATION=OBJCLASS_GRID;
	
	public static final String C_GRID_VISUALIZATION="complexgrid";
	public static final String S_GRID_VISUALIZATION="simplegrid";
	
	public static AbstractAdapter getAdapterInstance(int fragindex, String visualizationType, Response response){
		if(response.getObjclass().equals(OBJCLASS_GRID)){
			if(response.getObjkey().equals("inspectfrag_data") || response.getObjkey().equals("explorecube_data"))
				return new GridAdapter(response.getObjcontent(),true);
			return new GridAdapter(response.getObjcontent(),false);
		}
		else if(response.getObjclass().equals(OBJCLASS_TREE)){
			return new TreeAdapter(response.getObjcontent());
		}
		else if(response.getObjclass().equals(OBJCLASS_TEXT)){
			return new TextAdapter(response.getObjcontent());
		}
		return null;
	}
}
