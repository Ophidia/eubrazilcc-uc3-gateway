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

/**
 * @author CMCC
 */
public enum SqlQuery {
	
	GETUSER("SELECT * FROM user WHERE email=? AND status=1;"),
	
	GET_EXPERIMENTS("SELECT experiment.idexperiment, experiment.submissiondate, experiment.status, experiment.stored, workflow.code " +
			"FROM experiment " +
			"JOIN user ON user.iduser=experiment.iduser " +
			"JOIN workflow ON workflow.idworkflow=experiment.idworkflow " +
			"WHERE user.email=? " +
			"AND experiment.available=1 " +
			"AND experiment.deleted=0 " +
			"AND experiment.stored=0 " +
			"GROUP BY experiment.idexperiment " +
			"ORDER BY experiment.idexperiment DESC;"),
	GET_SEBALINTERANNUAL_EXP_DETAILS("SELECT xmin, xmax, ymin, ymax, timemin, timemax FROM sebalinterannual WHERE idexperiment=?;"),
	GET_CLIMATESEBAL_EXP_DETAILS("SELECT xmin, xmax, ymin, ymax, timemin, timemax FROM climatesebal WHERE idexperiment=?;"),
	
	INSERT_EXPERIMENT("INSERT INTO experiment (idworkflow, iduser) VALUES((SELECT idworkflow FROM workflow WHERE code=?), (SELECT iduser FROM user WHERE email=?));"),
	
	CHECK_CLIMATE_DATA("SELECT dataset.iddataset, climatedata.variablecode, workflow.code, workflow.idworkflow " +
			"FROM dataset " +
			"JOIN climatedata ON climatedata.iddataset=dataset.iddataset " +
			"JOIN workflowdataset ON dataset.iddataset=workflowdataset.iddataset " +
			"JOIN workflow ON workflow.idworkflow=workflowdataset.idworkflow " +
			"WHERE climatedata.variablecode=? " +
			"AND workflow.code=? " +
			"AND dataset.xmin < ? " +
			"AND dataset.xmax > ? " +
			"AND dataset.ymin < ? " +
			"AND dataset.ymax > ?;"),
	CHECK_SEBAL_DATA("SELECT dataset.iddataset, satellitedata.variablecode, workflow.code, workflow.idworkflow " +
			"FROM dataset " +
			"JOIN satellitedata ON satellitedata.iddataset=dataset.iddataset " +
			"JOIN workflowdataset ON dataset.iddataset=workflowdataset.iddataset " +
			"JOIN workflow ON workflow.idworkflow=workflowdataset.idworkflow " +
			"WHERE satellitedata.variablecode=? " +
			"AND workflow.code=? " +
			"AND dataset.xmin < ? " +
			"AND dataset.xmax > ? " +
			"AND dataset.ymin < ? " +
			"AND dataset.ymax > ?;"),
					
	INSERT_SEBAL_INTERANNUAL_EXP("INSERT INTO sebalinterannual (idexperiment, iddataset, xmin, xmax, ymin, ymax, timemin, timemax) VALUES(?, ?, ?, ?, ?, ?, ?, ?);"),
	INSERT_CLIMATESEBAL_EXP("INSERT INTO climatesebal (idexperiment, timemin, timemax, xmin, xmax, ymin, ymax) VALUES(?, ?, ?, ?, ?, ?, ?);"),
	INSERT_CLIMATESEBALDATASET("INSERT INTO climatesebaldataset (idexperiment, iddataset) VALUES(?, ?);"),
	SELECT_LIDAR_DATASET("SELECT iddataset from lidardata where tilename= ?;"),
	INSERT_RELATIVE_HEIGHT_EXP("INSERT INTO relheight VALUES (?, ?);"),
	GET_RELHEIGHT_EXP_DETAILS("SELECT * FROM dataset JOIN relheight ON relheight.iddataset=dataset.iddataset and relheight.idexperiment= ?;"),
	INSERT_LIDAR_INTERCOMPARISON_EXP("INSERT INTO lidarintercomparison VALUES(?, ?, ?, ?, ? ,?, ?, ?, ?, ? ,?);"),
	GET_LIDAR_INTERCOMPARISON_EXP_DETAILS("SELECT * FROM dataset JOIN lidarintercomparison ON lidarintercomparison.iddataset=dataset.iddataset and lidarintercomparison.idexperiment= ?;"),
	
	CHECK_CLIMATE_MODEL_DATA("SELECT dataset.filename FROM dataset JOIN climatedata ON dataset.iddataset=climatedata.iddataset " +
	"WHERE climatedata.variablecode='?' " +
	"AND dataset.xmin < ? " +
	"AND dataset.xmax > ? " +
	"AND dataset.ymin < ? " +
	"AND dataset.ymax > ?;"),
	
	INSERT_CLIMATE_MODEL_INTERCOMPARISON("INSERT INTO modelintercomparison VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"),
	GET_CLIMATE_MODEL_EXP_DETAILS("select * from modelintercomparison where idexperiment=?;"),
	
	GET_IDNODATA("SELECT iddataset, filename FROM dataset WHERE filename='nodata';"),
	UPDATE_NODATA("UPDATE experiment SET status='nodata', enddate=NOW() WHERE idexperiment=?;"),
	
	GET_EXPERIMENT_OUTPUTS("SELECT * FROM experimentoutput WHERE idexperiment=?;"),
	
	GET_EXPERIMENT_INFO("SELECT submissiondate, stored FROM experiment WHERE idexperiment=?"),
	
	GET_EXPERIMENT_DETAILS_CLIMATE_VAR("SELECT climatedata.variablename, climatedata.modelname, climatedata.scenarioname, experiment.submissiondate, " + 
			"climatesebal.xmin, climatesebal.xmax, climatesebal.ymin, climatesebal.ymax, climatesebal.timemin, climatesebal.timemax, experiment.stored, experiment.status, " +
			"experimentoutput.title, experimentoutput.name, experimentoutput.extension " +
			"FROM experiment " +
			"JOIN experimentoutput ON experimentoutput.idexperiment = experiment.idexperiment " +
			"JOIN climatesebal ON climatesebal.idexperiment = experiment.idexperiment " +
			"JOIN climatesebaldataset ON climatesebaldataset.idexperiment = climatesebal.idexperiment " +
			"JOIN dataset ON dataset.iddataset = climatesebaldataset.iddataset " +
			"JOIN climatedata ON climatedata.iddataset = dataset.iddataset " +
			"WHERE experiment.idexperiment = ? " +
			"AND experimentoutput.type = 'download' " +
			"AND experimentoutput.name = 'out1.csv';"),
			
	GET_EXPERIMENT_DETAILS_SEBAL_VAR("SELECT satellitedata.variablename, experiment.stored, satellitedata.sensor, experiment.submissiondate, " +
			"climatesebal.xmin, climatesebal.xmax, climatesebal.ymin, climatesebal.ymax, climatesebal.timemin, climatesebal.timemax, experiment.status " +
			"FROM experiment " +
			"JOIN climatesebal ON climatesebal.idexperiment = experiment.idexperiment " +
			"JOIN climatesebaldataset ON climatesebaldataset.idexperiment = climatesebal.idexperiment " +
			"JOIN dataset ON dataset.iddataset = climatesebaldataset.iddataset " +
			"JOIN satellitedata ON satellitedata.iddataset = dataset.iddataset " +
			"WHERE experiment.idexperiment = ?;"),		
			
	GET_EXPERIMENT_DETAILS_SEBAL_INTERANNUAL("SELECT satellitedata.variablename, satellitedata.sensor, experiment.submissiondate, " +
			"sebalinterannual.xmin, experiment.stored, sebalinterannual.xmax, sebalinterannual.ymin, sebalinterannual.ymax, sebalinterannual.timemin, sebalinterannual.timemax, experiment.status, " +
			"experimentoutput.title, experimentoutput.name, experimentoutput.extension " +
			"FROM experiment " +
			"JOIN sebalinterannual ON sebalinterannual.idexperiment = experiment.idexperiment " +
			"JOIN dataset ON dataset.iddataset = sebalinterannual.iddataset " +
			"JOIN satellitedata ON satellitedata.iddataset = dataset.iddataset " +
			"JOIN experimentoutput ON experimentoutput.idexperiment = experiment.idexperiment " +
			"WHERE experiment.idexperiment = ? " +
			"AND experimentoutput.type = 'download';"),
			
	GET_EXPERIMENT_DETAILS_REL_HEIGHT("SELECT lidardata.tilename, experiment.submissiondate, dataset.xmin, dataset.xmax, " +
			"dataset.ymin, dataset.ymax, experiment.status, experiment.stored, experimentoutput.title, experimentoutput.name, experimentoutput.extension, relheight.iddataset " +
			"FROM experiment " +
			"JOIN relheight ON relheight.idexperiment = experiment.idexperiment JOIN dataset ON dataset.iddataset = relheight.iddataset " +
			"JOIN lidardata ON lidardata.iddataset = dataset.iddataset JOIN experimentoutput ON experimentoutput.idexperiment = experiment.idexperiment " +
			"WHERE experiment.idexperiment = ? " +
			"AND experimentoutput.type = 'download';"),
			
	GET_EXPERIMENT_DETAILS_LIDAR_INTERCOMPARISON("SELECT lidardata.tilename, experiment.submissiondate, dataset.xmin, dataset.xmax, dataset.ymin, dataset.ymax, experiment.status, experimentoutput.title, " +
			"experimentoutput.name, experiment.stored, experimentoutput.extension, lidarintercomparison.iddataset, lidarintercomparison.dtm, " +
			"lidarintercomparison.dsm, lidarintercomparison.chm, lidarintercomparison.rh, lidarintercomparison.agb, lidarintercomparison.fc, lidarintercomparison.aspect, " +
			"lidarintercomparison.sa, lidarintercomparison.pd " +
			"FROM experiment " +
			"JOIN lidarintercomparison ON lidarintercomparison.idexperiment = experiment.idexperiment " +
			"JOIN dataset ON dataset.iddataset = lidarintercomparison.iddataset " +
			"JOIN lidardata ON lidardata.iddataset = dataset.iddataset JOIN experimentoutput ON experimentoutput.idexperiment = experiment.idexperiment " +
			"WHERE experiment.idexperiment = ? " +
			"AND experimentoutput.type = 'download';"),
			
	GET_EXPERIMENT_DETAILS_CLIMATE_MODEL_INTERCOMPARISON("SELECT experiment.submissiondate, experiment.stored, modelintercomparison.timemin, modelintercomparison.timemax, " +
			"modelintercomparison.xmin, modelintercomparison.xmax, modelintercomparison.ymin, modelintercomparison.ymax, " +
			"modelintercomparison.tnn, modelintercomparison.tnx, modelintercomparison.txn, modelintercomparison.txx, " +
			"experiment.status, experimentoutput.title, experimentoutput.name, experimentoutput.extension " +
			"FROM experiment join modelintercomparison ON experiment.idexperiment=modelintercomparison.idexperiment " + 
			"JOIN experimentoutput ON experimentoutput.idexperiment = experiment.idexperiment " +
			"WHERE experiment.idexperiment=? AND experimentoutput.type = 'download';"),
			
	GET_EXPERIMENT_DETAILS_ENM("SELECT DISTINCT experiment.submissiondate, experiment.status, experiment.stored, experimentoutput.title, " + 
			"experimentoutput.name, experimentoutput.extension FROM experiment JOIN enm ON enm.idexperiment = experiment.idexperiment " + 
			"JOIN experimentoutput ON experimentoutput.idexperiment = experiment.idexperiment " + 
			"WHERE experiment.idexperiment = ? "),
			
	GET_CSV_FILENAME("SELECT experiment.submissiondate, workflow.code FROM experiment JOIN workflow ON experiment.idworkflow = workflow.idworkflow AND experiment.idexperiment=?;"),
	
	GET_TIF_FILENAME("SELECT experiment.submissiondate, workflow.code FROM experiment JOIN workflow ON experiment.idworkflow = workflow.idworkflow AND experiment.idexperiment=?;"),
	
	
	DELETE_EXPERIMENT("UPDATE experiment SET deleted=1 WHERE idexperiment=?;"),
	
	GET_SPECIES_LIST("SELECT iddataset, filename FROM dataset WHERE folder='species';"),
	
	GET_SPECIES_DATA_POINTS_LIST("SELECT x,y,filename,speciesdata.idoccurrence AS iddatapoint,dataset.iddataset AS idspecies FROM speciesdata INNER JOIN dataset ON speciesdata.iddataset = dataset.iddataset WHERE dataset.iddataset=?;"),
	
	INSERT_ENM_EXP("insert into enm values (?,?);"),
	
	GET_ENM_SPECIES_NAME("SELECT DISTINCT dataset.iddataset, dataset.filename FROM dataset JOIN speciesdata ON speciesdata.iddataset = dataset.iddataset " + 
			"JOIN enm ON enm.idoccurrence=speciesdata.idoccurrence JOIN experiment ON experiment.idexperiment = enm.idexperiment " + 
			"WHERE experiment.idexperiment = ?;"),
	
	GET_SPECIES_DATA_POINTS("SELECT speciesdata.x, speciesdata.y FROM speciesdata JOIN enm ON speciesdata.idoccurrence=enm.idoccurrence WHERE enm.idexperiment = ?;"),
	
	GET_ENM_EXP_DETAILS("SELECT min(speciesdata.y) AS ymin, max(speciesdata.y) AS ymax, min(speciesdata.x) AS xmin, max(speciesdata.x) AS xmax " + 
			"FROM speciesdata JOIN enm ON speciesdata.idoccurrence=enm.idoccurrence WHERE enm.idexperiment = ?;"),
	
	
	SEARCH_CH_EXPERIMENTS_INTERANNUAL("SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, experiment.stored, " + 
    		"workflow.code, sebalinterannual.xmin, sebalinterannual.xmax, sebalinterannual.ymin, sebalinterannual.ymax FROM experiment JOIN user ON user.iduser=experiment.iduser JOIN workflow ON workflow.idworkflow=experiment.idworkflow " + 
    		"JOIN sebalinterannual ON sebalinterannual.idexperiment=experiment.idexperiment WHERE user.email=? AND experiment.stored=2 AND experiment.available=1 AND experiment.deleted = 0 AND workflow.code=? " +
    		"AND (sebalinterannual.xmin > ? AND sebalinterannual.xmax < ? AND sebalinterannual.ymin > ? AND sebalinterannual.ymax < ?) AND experiment.deleted=0 AND experiment.submissiondate BETWEEN ? AND ? GROUP BY experiment.idexperiment ORDER BY experiment.idexperiment DESC;"),
	
	SEARCH_CH_EXPERIMENTS_CLIMATE_SEBAL("SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, experiment.stored, " + 
    		"workflow.code, climatesebal.xmin, climatesebal.xmax, climatesebal.ymin, climatesebal.ymax FROM experiment JOIN user ON user.iduser=experiment.iduser JOIN workflow ON workflow.idworkflow=experiment.idworkflow " + 
    		"JOIN climatesebal ON climatesebal.idexperiment=experiment.idexperiment WHERE user.email=? AND experiment.stored=2 AND experiment.available=1 AND experiment.deleted = 0 AND workflow.code=? " +
    		"AND (climatesebal.xmin > ? AND climatesebal.xmax < ? AND climatesebal.ymin > ? AND climatesebal.ymax < ?) AND experiment.deleted=0 AND experiment.submissiondate BETWEEN ? AND ? GROUP BY experiment.idexperiment ORDER BY experiment.idexperiment DESC;"),
    		
    SEARCH_CH_EXPERIMENTS_MODEL_INTERCOMP("SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, experiment.stored, " + 
    		"workflow.code, modelintercomparison.xmin, modelintercomparison.xmax, modelintercomparison.ymin, modelintercomparison.ymax FROM experiment JOIN user ON user.iduser=experiment.iduser JOIN workflow ON workflow.idworkflow=experiment.idworkflow " + 
    		"JOIN modelintercomparison ON modelintercomparison.idexperiment=experiment.idexperiment WHERE user.email=? AND experiment.stored=2 AND experiment.available=1 AND experiment.deleted = 0 AND workflow.code=? " +
    		"AND (modelintercomparison.xmin > ? AND modelintercomparison.xmax < ? AND modelintercomparison.ymin > ? AND modelintercomparison.ymax < ?) AND experiment.deleted=0 AND experiment.submissiondate BETWEEN ? AND ? GROUP BY experiment.idexperiment ORDER BY experiment.idexperiment DESC;"),
	
    SEARCH_CH_EXPERIMENTS_LIDAR_INTERCOMP("SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, experiment.stored, workflow.code, " +
    		"dataset.xmin, dataset.xmax, dataset.ymin, dataset.ymax FROM experiment JOIN user ON user.iduser=experiment.iduser JOIN workflow ON workflow.idworkflow=experiment.idworkflow " +
    		"JOIN lidarintercomparison ON lidarintercomparison.idexperiment=experiment.idexperiment JOIN dataset ON dataset.iddataset=lidarintercomparison.iddataset " +
    		"WHERE user.email=? AND experiment.stored=2 AND experiment.available=1 AND experiment.deleted = 0 AND workflow.code= ? " +
    		"AND (dataset.xmin > ? AND dataset.xmax < ? AND dataset.ymin > ? AND dataset.ymax < ?) AND experiment.deleted=0 AND experiment.submissiondate " +
    		"BETWEEN ? AND ? GROUP BY experiment.idexperiment ORDER BY experiment.idexperiment DESC;"),
	
    SEARCH_CH_EXPERIMENTS_RELHEIGHT("SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, experiment.stored, workflow.code, " +
    		"dataset.xmin, dataset.xmax, dataset.ymin, dataset.ymax FROM experiment JOIN user ON user.iduser=experiment.iduser JOIN workflow ON workflow.idworkflow=experiment.idworkflow " +
    		"JOIN relheight ON relheight.idexperiment=experiment.idexperiment JOIN dataset ON dataset.iddataset=relheight.iddataset " +
    		"WHERE user.email=? AND experiment.stored=2 AND experiment.available=1 AND experiment.deleted = 0 AND workflow.code= ? " +
    		"AND (xmin > ? AND xmax < ? AND ymin > ? AND ymax < ?) AND experiment.deleted=0 AND experiment.submissiondate " +
    		"BETWEEN ? AND ? GROUP BY experiment.idexperiment ORDER BY experiment.idexperiment DESC;"),
    		
	SEARCH_CH_EXPERIMENTS_ENM("SELECT * FROM (" +
					"SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, " + 
					"experiment.stored, workflow.code, min(speciesdata.y) AS ymin, max(speciesdata.y) AS ymax, min(speciesdata.x) AS xmin, max(speciesdata.x) AS xmax " +
					"FROM experiment JOIN user ON user.iduser=experiment.iduser " +
					"JOIN workflow ON workflow.idworkflow=experiment.idworkflow " +
					"JOIN enm ON enm.idexperiment=experiment.idexperiment " +
					"JOIN speciesdata ON speciesdata.idoccurrence=enm.idoccurrence " +
					"WHERE user.email=? AND experiment.stored=2 AND experiment.available=1 AND experiment.deleted = 0 " +
					"AND workflow.code= ? " +
					"GROUP BY experiment.idexperiment ORDER BY experiment.idexperiment DESC) AS tmp WHERE " +
					"tmp.xmin > ? AND tmp.xmax < ? AND tmp.ymin > ? AND tmp.ymax < ? " +
					"AND tmp.submissiondate BETWEEN ? AND ?;"),
    		
    		

					
					
					
    		
	GET_DATASET("SELECT * FROM dataset WHERE folder='satellite' OR folder='lidar';"),
	
	GET_LIDARBBOX("SELECT * FROM dataset WHERE folder='lidar'"),
	

	GET_CHEXPERIMENTS("SELECT experiment.idexperiment, experiment.name, experiment.submissiondate, experiment.fillColor, job.xmin, job.xmax, job.ymin, job.ymax FROM experiment JOIN job ON job.idexperiment=experiment.idexperiment WHERE stored=2 GROUP BY experiment.idexperiment ORDER BY idexperiment DESC;"),
	
	GET_CH_EXPERIMENTS("SELECT experiment.idexperiment, experiment.fillColor, experiment.submissiondate, experiment.status, experiment.stored, workflow.code " +
			"FROM experiment " +
			"JOIN user ON user.iduser=experiment.iduser " +
			"JOIN workflow ON workflow.idworkflow=experiment.idworkflow " +
			"WHERE user.email=? AND experiment.stored=2 " +
			"AND experiment.available=1 " +
			"AND experiment.deleted=0 " +
			"GROUP BY experiment.idexperiment " +
			"ORDER BY experiment.idexperiment DESC;"),
	
	GET_USERID("SELECT iduser FROM user WHERE email=?;"),
	
	GET_CLIMATE_DATASET("SELECT dataset.filename, dataset.type, dataset.folder " +
						"FROM dataset " +
						"JOIN climatedata ON dataset.iddataset=climatedata.iddataset " +
						"WHERE climatedata.variablecode=? " +
						"AND climatedata.modelcode=? " +
						"AND climatedata.scenariocode=? " +
						"AND dataset.xmin <= ? " +
						"AND dataset.xmax >= ? " +
						"AND dataset.ymin <= ? " +
						"AND dataset.ymax >= ?;"),
	GET_SATELLITE_DATASET("SELECT dataset.filename, dataset.type, dataset.folder " +
						"FROM dataset " +
						"JOIN satellitedata ON dataset.iddataset=satellitedata.iddataset " +
						"WHERE satellitedata.variablecode=? " +
						"AND satellitedata.sensor=? " +
						"AND dataset.xmin <= ? " +
						"AND dataset.xmax >= ? " +
						"AND dataset.ymin <= ? " +
						"AND dataset.ymax >= ?;"),
	GET_IDINDICATOR("SELECT code, idindicator FROM indicator WHERE code=?;"),
	
	GET_EXPERIMENT_FROM_ID("SELECT * FROM experiment WHERE idexperiment=?;"),
	
	STORE_IN_THE_CH("UPDATE experiment SET stored=1 WHERE idexperiment=?;"),
	
	GET_CURRENT_STATUS("SELECT * FROM clustercurrent ORDER BY idthread;"),
	
	GET_HISTORY("SELECT * FROM clusterhistory WHERE timestamp > (NOW() - INTERVAL 5 MINUTE);"),
	
	GET_EXP_TYPE("SELECT COUNT(*) AS total, idworkflow  FROM experiment GROUP BY idworkflow;"),
	
	GET_EXP_DONE("SELECT count(*) as totaldone FROM experiment where status='done';"),
	
	GET_EXP_FAILED("SELECT count(*) as totalfailed FROM experiment where status='failed';"),
	
	GET_EXP_ASSIGNED("SELECT count(*) as totalassigned FROM experiment where status='assigned';"),
	
	GET_EXP_RUNNING("SELECT count(*) as totalrunning FROM experiment where status='running';"),
	
	GET_EXP_PENDING("SELECT count(*) as totalpending FROM experiment where status='pending';"),
	
	GET_USERS("SELECT * FROM user;"),
	
	ENABLE_USER("UPDATE user SET status=1 WHERE iduser=?;"),
	
	DISABLE_USER("UPDATE user SET status=0 WHERE iduser=?;");
	
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
