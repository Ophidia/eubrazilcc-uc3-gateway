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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;


/**
 * ophidiajson
 * <p>
 * Ophidia JSON Schema
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
    "source",
    "consumers",
    "responseKeyset",
    "response"
})
public class DeserializedJSON {

    @JsonProperty("source")
    private Source source;
    @JsonProperty("consumers")
    private Set<String> consumers = new HashSet<String>();
    @JsonProperty("responseKeyset")
    private Set<String> responseKeyset = new HashSet<String>();
    @JsonProperty("response")
    private List<Response> response = new ArrayList<Response>();

    @JsonProperty("source")
    public Source getSource() {
        return source;
    }

    @JsonProperty("source")
    public void setSource(Source source) {
        this.source = source;
    }

    @JsonProperty("consumers")
    public Set<String> getConsumers() {
        return consumers;
    }

    @JsonProperty("consumers")
    public void setConsumers(Set<String> consumers) {
        this.consumers = consumers;
    }

    @JsonProperty("responseKeyset")
    public Set<String> getResponseKeyset() {
        return responseKeyset;
    }

    @JsonProperty("responseKeyset")
    public void setResponseKeyset(Set<String> responseKeyset) {
        this.responseKeyset = responseKeyset;
    }

    @JsonProperty("response")
    public List<Response> getResponse() {
        return response;
    }

    @JsonProperty("response")
    public void setResponse(List<Response> response) {
        this.response = response;
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
