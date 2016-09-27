if(!(process.argv[2]&&process.argv[3])) {

	console.log(process.argv[2]);
	console.log("Please pass in the following variables: SID, Auth");
	process.exit(1);

}

var pullIpmLogs = require('./pull-ipm-logs.js');

//Twilio account variables
var sid = process.argv[2];
var auth = process.argv[3];
var instance = process.argv[4];

pullIpmLogs(sid,auth,instance);