var rp = require('request-promise');
var fs = require('fs');
var async = require('async');
var moment = require('moment');

var getChannels = function(sid,auth,instance) {

	var stream = fs.createWriteStream('Most recent 1000 messages of each IP Messaging Channel for ' + sid + '.csv');
	stream.write('Channel,Date,Body\n');

	var channels = []
	var channelsUrl = 'https://ip-messaging.twilio.com/v1/Services/' + instance + '/Channels?PageSize=1000'

	options = {
		json: true,
		uri: channelsUrl,
		auth: {
			user: sid,
			pass: auth
		}
	}

	rp(options)
	.then((response) => {

		async.eachLimit(response.channels, 10, function(channel,callback) {

			options = {
				json: true,
				uri: 'https://ip-messaging.twilio.com/v1/Services/' + instance + '/Channels/' + channel.sid + '/Messages',
				auth: {
					user: sid,
					pass: auth
				}
			}

			rp(options)
			.then((response) => {

				async.eachLimit(response.messages, 10, (message,callback) => {

					stream.write(message.to + ',' + message.date_created + ',' + message.body);
					callback();

				});

				callback();

			});

		});


		
	},(err) => {
		console.log(err);
	});

}

module.exports = getChannels;