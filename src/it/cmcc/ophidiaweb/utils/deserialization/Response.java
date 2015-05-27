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

import java.util.ArrayList;
import java.util.List;
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
    "objclass",
    "objkey",
    "objcontent"
})
public class Response {

    @JsonProperty("objclass")
    private String objclass;
    @JsonProperty("objkey")
    private String objkey;
    @JsonProperty("objcontent")
    private List<Objcontent> objcontent = new ArrayList<Objcontent>();

    @JsonProperty("objclass")
    public String getObjclass() {
        return objclass;
    }

    @JsonProperty("objclass")
    public void setObjclass(String objclass) {
        this.objclass = objclass;
    }

    @JsonProperty("objkey")
    public String getObjkey() {
        return objkey;
    }

    @JsonProperty("objkey")
    public void setObjkey(String objkey) {
        this.objkey = objkey;
    }

    @JsonProperty("objcontent")
    public List<Objcontent> getObjcontent() {
        return objcontent;
    }

    @JsonProperty("objcontent")
    public void setObjcontent(List<Objcontent> objcontent) {
        this.objcontent = objcontent;
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
