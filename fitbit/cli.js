/**
 * Healingo | (c) 2015 webvariants GmbH & Co. KG
 */

/**
 * This is a simple helper to force fetching data for users when debugging.
 */

var
	config = require('./config.json'),
	path   = require('path'),
	args   = process.argv;

if (args.length < 3) {
	console.log('Usage: ' + args[0] + ' cli.js fetch USER_ID DAY');
	process.exit(1);
}

switch (args[2]) {
	case 'fetch':
		fetchCommand(args.slice(3));
		break;
}

function fetchCommand(args) {
	if (args.length < 2) {
		console.log('No userID / day given.');
		process.exit(1);
	}

	var userID  = args[0];
	var day     = args[1];
	var userIDs = [];

	function createJobs(app, queue) {
		if (userIDs.length === 0) {
			queue.end();
			app.dataSources.mysqlDs.disconnect();
			return;
		}

		var user = userIDs[0];
		userIDs = userIDs.slice(1);

		queue.put(config.queue.priority, config.queue.delay, config.queue.ttr, JSON.stringify({
			job:        'fitbit-fetch',
			fitbitUser: user,
			date:       day
		}), function() {
			console.log('Created fitbit-fetch job for user ' + user + ' at day ' + day + '.');
			setImmediate(function() { createJobs(app, queue); });
		});
	}

	bootLoopBack(function(app) {
		connectToBeanstalk(function(queue) {
			if (userID === 'all') {
				app.models.User.find({}, function(err, users) {
					for (var i = 0; i < users.length; ++i) {
						userIDs.push(users[i].fitbitUserId);
					}

					createJobs(app, queue);
				});
			}
			else {
				app.models.User.findOne({where: {id: userID}}, function(err, user) {
					if (!user) {
						console.log('User ' + userID + ' could not be found.');
						process.exit(1);
					}

					userIDs.push(user.fitbitUserId);
					createJobs(app, queue);
				});
			}
		});
	});
}

function bootLoopBack(callback) {
	var loopback = require('loopback');
	var boot     = require('loopback-boot');
	var app      = loopback();
	var root     = path.join(__dirname, '..', 'server');

	// Bootstrap the application, configure models, datasources and middleware.
	boot(app, root, function(err) {
		if (err) throw err;
		callback(app);
	});
}

function connectToBeanstalk(callback) {
	var fivebeans = require('fivebeans');

	// connect to beanstalk
	var queue = new fivebeans.client(config.queue.host, config.queue.port);

	queue.on('connect', function() {
		queue.use(config.queue.tube, function() {
			callback(queue);
		});
	}).connect();
}
