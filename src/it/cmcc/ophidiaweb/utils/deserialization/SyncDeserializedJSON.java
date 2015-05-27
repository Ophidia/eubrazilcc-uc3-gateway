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

/**
 * Ophidia JSON Synchronous DeserializedJSON
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
    "request",
    "jobid",
    "response",
    "stdout",
    "stderr"
})
public class SyncDeserializedJSON {
	@JsonProperty("request")
    private String request;
	@JsonProperty("jobid")
    private String jobid;
	@JsonProperty("stdout")
    private String stdout;
	@JsonProperty("stderr")
    private String stderr;
    @JsonProperty("response")
    private SyncResponse synchresponse;

    @JsonProperty("request")
    public String getRequest() {
        return request;
    }

    @JsonProperty("request")
    public void setRequest(String request) {
        this.request = request;
    }
    
    @JsonProperty("jobid")
    public String getJobid() {
        return jobid;
    }

    @JsonProperty("jobid")
    public void setJobid(String jobid) {
        this.jobid = jobid;
    }
    
    @JsonProperty("stdout")
    public String getStdout() {
        return stdout;
    }

    @JsonProperty("stdout")
    public void setStdout(String stdout) {
        this.stdout = stdout;
    }
    
    @JsonProperty("stderr")
    public String getStderr() {
        return stderr;
    }

    @JsonProperty("stderr")
    public void setStderr(String stderr) {
        this.stderr = stderr;
    }

    @JsonProperty("synchresponse")
    public SyncResponse getSynchresponse() {
        return synchresponse;
    }

    @JsonProperty("synchresponse")
    public void setSynchresponse(SyncResponse synchresponse) {
        this.synchresponse = synchresponse;
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
