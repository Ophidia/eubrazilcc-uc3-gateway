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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;

import it.cmcc.ophidiaweb.utils.deserialization.Nodelink;
import it.cmcc.ophidiaweb.utils.deserialization.Objcontent;

public class TreeAdapter extends AbstractAdapter{
	private List<Objcontent> objcontents;
	private Node root;
	
	public TreeAdapter(List<Objcontent> objcontents){
		this.objcontents=objcontents;
		Iterator<Objcontent> objcontentsIt=this.objcontents.iterator();
		JSONArray frags=new JSONArray();
		while(objcontentsIt.hasNext()){
			frags.add(DepthFirstAlgorithm(objcontentsIt.next()));
		}
		super.setContent(frags);
	}
	
	public JSONObject DepthFirstAlgorithm(Objcontent objc){
		
		Stack<Integer> residualNodesIndexes=new Stack<Integer>();
		Stack<AbstractNode> residualNodes=new Stack<AbstractNode>();
		
		int currnodeIndex=Integer.parseInt(objc.getRootnode());
		residualNodesIndexes.push(currnodeIndex);
		root=createNode(objc,currnodeIndex);
		residualNodes.push(root);
		
		while(!residualNodesIndexes.isEmpty()){
			currnodeIndex=residualNodesIndexes.pop();
			AbstractNode currnode=residualNodes.pop();
			if(hasNodeChildren(objc,currnodeIndex)){
				Iterator<Integer> children=getChildren(objc,currnodeIndex).iterator();
				while(children.hasNext()){
					int child=children.next();
					residualNodesIndexes.push(child);
					AbstractNode node;
					if(hasNodeChildren(objc,child)|| objc.getNodevalues()[child][1].equals("folder")){
						node=createNode(objc,child);
					}
					else{
						node=createLeaf(objc,child);
					}
					((Node) currnode).getChildren().add(node); 
					
					residualNodes.push(node);
				}
			}
		}
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String jsontree="";
		try {
			 jsontree = ow.writeValueAsString(root);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		JSONObject jo= new JSONObject();
		jo.put("data", jsontree);
		
		return jo;
	}
	public Node createNode(Objcontent objc,int index){
		Node tn=new Node();
		String[] nodevalues=objc.getNodevalues()[index];
		
		tn.setText(nodevalues[0]);
		tn.setCls(nodevalues[1]);

		return tn;
	}
	public Leaf createLeaf(Objcontent objc,int index){
		Leaf l=new Leaf();
		String[] nodevalues=objc.getNodevalues()[index];
		
		l.setText(nodevalues[0]);
		l.setCls(nodevalues[1]);
		
		return l;
	}
	public boolean hasNodeChildren(Objcontent objc,int index){
		Nodelink[][] nodelinks=objc.getNodelinks();
		if(nodelinks[index].length>0) return true;
		return false;
	}
	
	public List<Integer> getChildren(Objcontent objc,int index){
		Nodelink[][] nodelinks=objc.getNodelinks();
		List<Integer> children=new ArrayList<Integer>();
		for(int i=0;i<nodelinks[index].length;i++){
			children.add(Integer.parseInt(nodelinks[index][i].getNode()));
		}
		return children;
	}

}
