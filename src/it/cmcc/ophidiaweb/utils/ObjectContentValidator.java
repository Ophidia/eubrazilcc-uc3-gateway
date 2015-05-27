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

package it.cmcc.ophidiaweb.utils;

import it.cmcc.ophidiaweb.utils.deserialization.Nodelink;
import it.cmcc.ophidiaweb.utils.deserialization.Objcontent;

public class ObjectContentValidator {

	public ObjectContentValidator(){

	}
	
	public boolean validateObjectContent(String objclass,Objcontent objc){
		if(objclass.equals("multidimgrid")){
			String[] rowkeys=objc.getRowkeys();
			String[] rowfieldtypes=objc.getRowfieldtypes();
			String[] colkeys=objc.getColkeys();
			String[] colfieldtypes=objc.getColfieldtypes();
			String[][] rowvalues=objc.getRowvalues();
			String[][] colvalues=objc.getColvalues();
			String[][] measurevalues=objc.getMeasurevalues();
			
			if(rowkeys==null || rowfieldtypes==null || colkeys==null || colfieldtypes==null || rowvalues==null || colvalues==null || measurevalues==null) return false;
			
			int rowkeyslength=objc.getRowkeys().length;
			int colkeyslength=objc.getColkeys().length;
			
			if(rowkeyslength==0 || colkeyslength==0) return false;
			for(int i=0;i<rowkeyslength;i++){
				if(rowkeys[i]==null || rowkeys[i].equals("null")) return false;
			}
			for(int i=0;i<colkeyslength;i++){
				if(colkeys[i]==null || colkeys[i].equals("null")) return false;
			}
			
			if(rowkeyslength!=rowfieldtypes.length || colkeyslength!=colfieldtypes.length) return false;
			
			int numRowValuesArrays=rowvalues.length;
			int numRowValuesPerArray=0;
			
			if(numRowValuesArrays==0) return false;
			else numRowValuesPerArray=rowvalues[0].length;
			
			if(numRowValuesPerArray!=rowkeyslength) return false;
			
			int numColValuesArrays=colvalues.length;
			int numColValuesPerArray=0;
			
			if(numColValuesArrays==0) return false;
			else numColValuesPerArray=colvalues[0].length;
			
			if(numColValuesPerArray!=colkeyslength) return false;
			
			if(measurevalues.length==0 || measurevalues[0].length==0 || measurevalues.length!=numRowValuesArrays || measurevalues[0].length!=numColValuesArrays) return false;
			
			return true;
		}
		else if(objclass.equals("grid")){
			String[] keys=objc.getRowkeys();;
			String[][] values=objc.getRowvalues();
			if(keys==null || values==null || keys.length==0 || keys.length!=values[0].length) return false;
			for(int i=0;i<keys.length;i++){
				if(keys[i]==null || keys[i].equals("null")) return false;
			}
			return true;
		}
		else if(objclass.equals("tree") || objclass.equals("graph") || objclass.equals("digraph")){
			String[] nodekeys=objc.getNodekeys();
			String[][] nodevalues=objc.getNodevalues();
			Nodelink[][] nodelinks=objc.getNodelinks();
			if(nodekeys==null || nodevalues==null || nodelinks==null) return false;
			int ncols=nodekeys.length;
			for(int i=0;i<ncols;i++){
				if(nodekeys[i]==null || nodekeys[i].equals("null")) return false;
			}
			if(ncols==0 || ncols!= nodevalues[0].length) return false;
			int nrows=nodevalues.length;
			if(nrows==0 || nrows!= nodelinks.length) return false;
			if(objclass.equals("tree") && (objc.getRootnode()==null || objc.getRootnode()=="")) return false;
			return true;
		}
		else if(objclass.equals("text")){
			if(objc.getMessage()==null) return false;
			return true;
		}
		
		return false;
		
	}
}
