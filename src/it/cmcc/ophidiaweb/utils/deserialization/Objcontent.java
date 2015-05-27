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

package it.cmcc.ophidiaweb.utils.deserialization;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
    "title",
    "description",
    "message",
    "rowkeys",
    "rowfieldtypes",
    "colkeys",
    "colfieldtypes",
    "measurename",
    "measuretype",
    "rowvalues",
    "colvalues",
    "measurevalues",
    "nodekeys",
    "nodevalues",
    "rootnode",
    "nodelinks"
})
public class Objcontent {

    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    private String description;
    @JsonProperty("message")
    private String message;
    @JsonProperty("rowkeys")
    private String[] rowkeys;
    @JsonProperty("rowfieldtypes")
    private String[] rowfieldtypes;
    @JsonProperty("colkeys")
    private String[] colkeys;
    @JsonProperty("colfieldtypes")
    private String[] colfieldtypes;
    @JsonProperty("measurename")
    private String measurename;
    @JsonProperty("measuretype")
    private String measuretype;
    @JsonProperty("rowvalues")
    private String[][] rowvalues;
    @JsonProperty("colvalues")
    private String[][] colvalues;
    @JsonProperty("measurevalues")
    private String[][] measurevalues;
    @JsonProperty("nodekeys")
    private String[] nodekeys;
    @JsonProperty("nodevalues")
    private String[][] nodevalues;
    @JsonProperty("rootnode")
    private String rootnode;
    @JsonProperty("nodelinks")
    private Nodelink[][] nodelinks;

    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("message")
    public String getMessage() {
        return message;
    }

    @JsonProperty("message")
    public void setMessage(String message) {
        this.message = message;
    }

    @JsonProperty("rowkeys")
    public String[] getRowkeys() {
        return rowkeys;
    }

    @JsonProperty("rowkeys")
    public void setRowkeys(String[] rowkeys) {
        this.rowkeys = rowkeys;
    }

    @JsonProperty("rowfieldtypes")
    public String[] getRowfieldtypes() {
        return rowfieldtypes;
    }

    @JsonProperty("rowfieldtypes")
    public void setRowfieldtypes(String[] rowfieldtypes) {
        this.rowfieldtypes = rowfieldtypes;
    }

    @JsonProperty("colkeys")
    public String[] getColkeys() {
        return colkeys;
    }

    @JsonProperty("colkeys")
    public void setColkeys(String[] colkeys) {
        this.colkeys = colkeys;
    }

    @JsonProperty("colfieldtypes")
    public String[] getColfieldtypes() {
        return colfieldtypes;
    }

    @JsonProperty("colfieldtypes")
    public void setColfieldtypes(String[] colfieldtypes) {
        this.colfieldtypes = colfieldtypes;
    }

    @JsonProperty("measurename")
    public String getMeasurename() {
        return measurename;
    }

    @JsonProperty("measurename")
    public void setMeasurename(String measurename) {
        this.measurename = measurename;
    }

    @JsonProperty("measuretype")
    public String getMeasuretype() {
        return measuretype;
    }

    @JsonProperty("measuretype")
    public void setMeasuretype(String measuretype) {
        this.measuretype = measuretype;
    }

    @JsonProperty("rowvalues")
    public String[][] getRowvalues() {
        return rowvalues;
    }

    @JsonProperty("rowvalues")
    public void setRowvalues(String[][] rowvalues) {
        this.rowvalues = rowvalues;
    }

    @JsonProperty("colvalues")
    public String[][] getColvalues() {
        return colvalues;
    }

    @JsonProperty("colvalues")
    public void setColvalues(String[][] colvalues) {
        this.colvalues = colvalues;
    }

    @JsonProperty("measurevalues")
    public String[][] getMeasurevalues() {
        return measurevalues;
    }

    @JsonProperty("measurevalues")
    public void setMeasurevalues(String[][] measurevalues) {
        this.measurevalues = measurevalues;
    }

    @JsonProperty("nodekeys")
    public String[] getNodekeys() {
        return nodekeys;
    }

    @JsonProperty("nodekeys")
    public void setNodekeys(String[] nodekeys) {
        this.nodekeys = nodekeys;
    }

    @JsonProperty("nodevalues")
    public String[][] getNodevalues() {
        return nodevalues;
    }

    @JsonProperty("nodevalues")
    public void setNodevalues(String[][] nodevalues) {
        this.nodevalues = nodevalues;
    }

    @JsonProperty("rootnode")
    public String getRootnode() {
        return rootnode;
    }

    @JsonProperty("rootnode")
    public void setRootnode(String rootnode) {
        this.rootnode = rootnode;
    }

    @JsonProperty("nodelinks")
    public Nodelink[][] getNodelinks() {
        return nodelinks;
    }

    @JsonProperty("nodelinks")
    public void setNodelinks(Nodelink[][] nodelinks) {
        this.nodelinks = nodelinks;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }

    @Override
    public boolean equals(Object other) {
        return EqualsBuilder.reflectionEquals(this, other);
    }
}
