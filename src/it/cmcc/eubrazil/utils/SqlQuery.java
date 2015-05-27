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

package it.cmcc.eubrazil.utils;

/**
 * @author CMCC
 */
public enum SqlQuery {
	
	INSERT_EXPERIMENT("INSERT INTO experiment (boundingbox,timerange) VALUES(?,?);"),
	INSERT_JOB("INSERT INTO job (idexperiment,idmodel,idscenario,idindicator,typeofsource) VALUES(?,?,?,?,?);"),
	GET_GENUS_ID_FROM_NAME("SELECT idmodel FROM model WHERE name=?"),
	GET_SPECIES_ID_FROM_NAME("SELECT idscenario FROM scenario WHERE name=?"),
	INSERT_SPECIES_EXPERIMENT("INSERT INTO experiment (boundingbox,fillColor,status,chstatus, name) VALUES(?,?,?,?,?);"),
	INSERT_SPECIES_JOB("INSERT INTO job (idexperiment,idmodel,idscenario,idindicator,typeofsource,status,chstatus) VALUES(?,?,?,?,?,?,?);"),
	GET_EXPERIMENT("SELECT * FROM experiment WHERE idexperiment=?"),
	GET_MODELS_NAME("SELECT name FROM model WHERE idmodel="),
	GET_INDICATORS_NAME("SELECT name FROM indicator WHERE idindicator="),
	GET_SCENARIOS_NAME("SELECT name FROM scenario WHERE idscenario="),
	GET_JOBS_BY_EXPERIMENT_ID("SELECT job.idjob, job.datacubedoi, job.typeofsource, job.filename, job.available, model.name AS mname, model.codename AS mcodname, scenario.name AS sname, scenario.codename AS scodname, indicator.name AS iname, indicator.codename AS icodname, experiment.boundingbox, experiment.timerange, job.startdate, job.status, job.chstatus FROM job INNER JOIN model ON job.idmodel=model.idmodel INNER JOIN indicator ON job.idindicator=indicator.idindicator INNER JOIN scenario ON job.idscenario=scenario.idscenario INNER JOIN experiment ON job.idexperiment=experiment.idexperiment WHERE job.idexperiment=?;"),
	GET_EXPERIMENT_STATUS("SELECT status FROM experiment WHERE idexperiment=?"),
	GET_INFO_FROM_JOBID("SELECT datacubedoi, serveraddress FROM job WHERE idjob=?;"),
	GET_ALL_EXPERIMENTS("SELECT * FROM experiment WHERE chstatus=0 OR chstatus=4 ORDER BY idexperiment DESC;"),
	GET_MODELS("SELECT DISTINCT model.name FROM model INNER JOIN job ON model.idmodel=job.idmodel WHERE job.idexperiment=?;"),
	GET_SCENARIOS("SELECT DISTINCT scenario.name FROM scenario INNER JOIN job ON scenario.idscenario=job.idscenario WHERE job.idexperiment=?;"),
	GET_INDICATORS("SELECT DISTINCT indicator.name FROM indicator INNER JOIN job ON indicator.idindicator=job.idindicator WHERE job.idexperiment=?;"),
	STORE_EXPERIMENT_INTHE_CH("UPDATE experiment SET chstatus=1, name=?, fillColor=? WHERE idexperiment=?;"),
	STORE_JOBS_INTHE_CH("UPDATE job SET chstatus=1 WHERE idexperiment=?;"),
	GET_ALL_CH_EXPERIMENTS("SELECT * FROM experiment WHERE chstatus=3 OR chstatus=2 OR chstatus=1 ORDER BY idexperiment DESC;"),
	GET_JSON_PATH("SELECT filename FROM job WHERE idjob=?"),
	GET_XML_PATH("SELECT datacubedoi FROM job WHERE idjob=?"),
	GET_CURRENT_STATUS("SELECT * FROM clustercurrent ORDER BY idthread;"),
	GET_HISTORY("SELECT * FROM clusterhistory WHERE timestamp > (NOW() - INTERVAL 1 MINUTE);");
	
	private final String sql;
	
	SqlQuery(final String sql) {
		this.sql = sql;
	}

	public String getSql() {
		return sql;
	}
	
	@Override
	public String toString() {
		return getSql();
	}
}
