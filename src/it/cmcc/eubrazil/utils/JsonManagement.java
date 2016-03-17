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

package it.cmcc.eubrazil.utils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class JsonManagement {
	
	public static String getJson(String jsonpath) throws IOException {
		
		FileReader fr = new FileReader(jsonpath);
		BufferedReader in = new BufferedReader(fr);
		
    	String jsonobject = "";
        String line = null;
        while ((line = in.readLine()) != null)
        	jsonobject += line;
        
	    return jsonobject;
	}

}
