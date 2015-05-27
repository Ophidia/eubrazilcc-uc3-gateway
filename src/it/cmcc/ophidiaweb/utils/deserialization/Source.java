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
    "srckey",
    "srcname",
    "srcurl",
    "producer",
    "description",
    "keys",
    "values"
})
public class Source {

    @JsonProperty("srckey")
    private String srckey;
    @JsonProperty("srcname")
    private String srcname;
    @JsonProperty("srcurl")
    private String srcurl;
    @JsonProperty("producer")
    private String producer;
    @JsonProperty("description")
    private String description;
    @JsonProperty("keys")
    private String[] keys;
    @JsonProperty("values")
    private String[] values;

    @JsonProperty("srckey")
    public String getSrckey() {
        return srckey;
    }

    @JsonProperty("srckey")
    public void setSrckey(String srckey) {
        this.srckey = srckey;
    }

    @JsonProperty("srcname")
    public String getSrcname() {
        return srcname;
    }

    @JsonProperty("srcname")
    public void setSrcname(String srcname) {
        this.srcname = srcname;
    }

    @JsonProperty("srcurl")
    public String getSrcurl() {
        return srcurl;
    }

    @JsonProperty("srcurl")
    public void setSrcurl(String srcurl) {
        this.srcurl = srcurl;
    }

    @JsonProperty("producer")
    public String getProducer() {
        return producer;
    }

    @JsonProperty("producer")
    public void setProducer(String producer) {
        this.producer = producer;
    }

    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonProperty("description")
    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty("keys")
    public String[] getKeys() {
        return keys;
    }

    @JsonProperty("keys")
    public void setKeys(String[] keys) {
        this.keys = keys;
    }

    @JsonProperty("values")
    public String[] getValues() {
        return values;
    }

    @JsonProperty("values")
    public void setValues(String[] values) {
        this.values = values;
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
