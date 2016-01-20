/**
 * Healingo | (c) 2015 webvariants GmbH & Co. KG
 */

/**
 * This is the worker that fetches jobs from the beanstalk queue and then fetches fresh activity
 * data from fitbit.
 */

var
	config    = require('./config.json'),
	API       = require('./api.js'),
	StepAPI   = require('./../common/steps.js'),
	PointAPI  = require('./../common/points.js'),
	qs        = require('querystring'),
	CronJob   = require('cron').CronJob,
	fivebeans = require('fivebeans'),
	async     = require('async'),
	path      = require('path'),
	loopback  = require('loopback'),
	boot      = require('loopback-boot'),

	queue,

	STATUS_OK      = 1,
	STATUS_EXPIRED = 2,
	STATUS_FAILURE = 3;

var app    = loopback();
var fitbit = new API(config.oauth2.clientId, config.oauth2.clientSecret);

function worker() {
	queue.reserve_with_timeout(3, function(err, jobID, job) {
		if (err) { // usually, this is simply the timeout
			keepWorking();
			return;
		}

		job = JSON.parse(job);
		job.id = jobID;

		console.log('Received job #' + jobID + ' (type ' + job.job + ')');

		if (job.job === 'fitbit-fetch') {
			processFetchJob(job);
		}
		else if (job.job === 'forced-step-goal') {
			processStepGoalJob(job);
		}
		else {
			console.log('  Cannot handle this job type; releasing the job again.');
			queue.release(job.id, config.queue.priority, 30, keepWorking);
		}
	});
}

function keepWorking() {
	setImmediate(worker);
}

function processFetchJob(job) {
	// find this user's access&refresh tokens
	app.models.User.findOne({where: {fitbitUserId: job.fitbitUser}}, function(err, user) {
		if (err) throw err;

		if (user === null) {
			console.log('  Warning: User ' + job.fitbitUser + ' could not be found in database.');
			queue.bury(job.id, 0, keepWorking);
			return;
		}

		// fix bug in merging of User and HUser; this is just a retarded workaround
		user = user.toJSON();

		if (user.fitbitAccessToken === null || user.fitbitRefreshToken === null) {
			console.log('  Warning: User ' + job.fitbitUser + ' exists in database, but has no tokens.');
			queue.bury(job.id, 0, keepWorking);
			return;
		}

		// fetch fitbit data, hoping the token is still alive

		console.log('  Fetching data for user #' + user.id + ' on ' + job.date + '...');

		fetchFitbitData(job, user.fitbitAccessToken, function(status, total, manual) {
			switch (status) {
				case STATUS_EXPIRED:
					console.log('  Access token invalid, refreshing...');

					refreshAccessToken(user.fitbitRefreshToken, user.id, function(status) {
						switch (status) {
							case STATUS_FAILURE:
								console.log('  Warning: the HTTPS request failed. Something is broken somewhere.');
								queue.release(job.id, config.queue.priority, 60, keepWorking);
								break;

							case STATUS_EXPIRED:
								console.log('  Notice: the refresh token is invalid; the user has to re-auth our application.');
								queue.destroy(job.id, keepWorking);
								break;

							case STATUS_OK:
								console.log('  Access token has been refreshed, putting job back on queue.');
								queue.release(job.id, config.queue.priority, 0, keepWorking);
								break;
						}
					});

					break;

				case STATUS_FAILURE:
					console.log('  Warning: the HTTPS request failed. Something is broken somewhere.');
					queue.release(job.id, config.queue.priority, 60, keepWorking);
					break;

				case STATUS_OK:
					console.log('  Fetched data. Processing...');
					processNewFitbitData(job, user.id, total, manual, function() {
						console.log('  Job successfully processed.');
						queue.destroy(job.id, keepWorking);
					});
					break;
			}
		});
	});
}

function processStepGoalJob(job) {
	// fetch info about the dailystatus that shall get a step goal computed
	app.models.DailyStatus.findOne({where: {id: job.dailyStatus}}, function(err, dailyStatus) {
		if (err) throw err;

		if (dailyStatus === null) {
			console.log('  Warning: DailyStatus #' + job.dailyStatus + ' could not be found in database.');
			queue.bury(job.id, 0, keepWorking);
			return;
		}

		var userID = dailyStatus.userId;
		var dayAt  = formatDate(dailyStatus.dayAt);

		if (job.job === 'forced-step-goal') {
			// fetch the last four days of logged steps
			var where = {
				// this is basically (userId = ... AND stepsDone > 0 AND dayAt < ...)
				and: [
					{ userId:    userID      },
					{ stepsDone: {gt: 0}     },
					{ dayAt:     {lt: dayAt} }
				]
			};

			app.models.DailyStatus.find({
				where: where,
				order: 'dayAt DESC'
			}, function(err, stati) {
				if (err) throw err;

				// technically 2 is enough, but we don't want those rough numbers we get with less than 4
				if (stati.length < 4) {
					console.log('  Note: Cannot calculate step goal for DailyStatus #' + job.dailyStatus + ' because there are only ' + stati.length + ' days with activity.');
					queue.destroy(job.id, keepWorking);
					return;
				}

				var input = {};

				for (var i = 0; i < stati.length; ++i) {
					input[formatDate(stati[i].dayAt)] = parseInt(stati[i].stepsDone, 10);
				}

				var stepGoal = StepAPI.calcStepRecommendation(input, 2, 1, 1.07);

				// update the step goal
				dailyStatus.updateAttributes({
					stepsGoal: stepGoal,
					stepsProcessedAt: new Date()
				}, function(err) {
					if (err) throw err;

					console.log('  Calculated step goal for DailyStatus #' + job.dailyStatus + ' is ' + stepGoal + ' steps.');
					queue.destroy(job.id, keepWorking);
				});
			});
		}
	});
}

function fetchFitbitData(job, accessToken, doneCallback) {
	fitbit.getSteps(accessToken, job.date, doneCallback);
}

function refreshAccessToken(refreshToken, userID, doneCallback) {
	fitbit.refreshToken(refreshToken, function(status, at, rt) {
		if (status !== API.STATUS_FAILURE) {
			// update the database and store the new tokens (could be null if refreshing failed)
			app.models.User.findOne({where: {id: userID}}, function(err, user) {
				if (err) throw err;

				if (user) {
					user.updateAttributes({
						fitbitAccessToken: at,
						fitbitRefreshToken: rt
					}, function(err) {
						if (err) throw err;
						doneCallback(status);
					});
				}
				else {
					doneCallback(status);
				}
			});
		}
		else {
			doneCallback(status);
		}
	});
}

function processNewFitbitData(job, userID, total, manual, doneCallback) {
	var where = { userId: userID, dayAt: job.date };

	app.models.DailyStatus.findOne({where: where}, function(err, status) {
		if (err) throw err;

		if (status === null) {
			console.log('  Error: Could not store fitbit data, because no DailyStatus exists for user ' + userID + ', day ' + job.date + '.');
			doneCallback();
			return;
		}

		status.updateAttributes({
			stepsDone: (total-manual),
			stepsTotal: total,
			stepsManual: manual,
			stepsFetchedAt: new Date()
		}, function(err) {
			if (err) throw err;
			doneCallback();
		});
	});
}

function setupCronjob(timePattern, callback) {
	var job = new CronJob({
		cronTime: timePattern,
		onTick:   callback,
		start:    false
	});

	job.start();
}

function formatDate(date) {
	var day   = date.getDate();
	var month = date.getMonth() + 1;
	var year  = date.getFullYear();

	return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
}

function createTomorrowsDailyStatus() {
	var tomorrow = formatDate(new Date(+new Date() + 12*3600*1000));

	console.log('Creating fresh daily status rows for tomorrow (' + tomorrow + ')...');

	app.models.User.find({}, function(err, users) {
		if (err) {
			console.log('  Failure: ' + err);
			return;
		}

		var states = [];

		for (var i = 0; i < users.length; ++i) {
			states.push({userId: users[i].id, dayAt: tomorrow});
		}

		app.models.DailyStatus.create(states, function(err) {
			if (err) {
				console.log('  Failure: ' + err);
			}
			else {
				console.log('  Creating rows went fine. The new day can come.');
			}
		});
	});
}

function createNextWeekStatus() {
	var monday = formatDate(new Date(+new Date() + 12*3600*1000));

	console.log('Creating fresh weekly status rows for the upcoming week (starting at ' + monday + ')...');

	app.models.User.find({}, function(err, users) {
		if (err) {
			console.log('  Failure: ' + err);
			return;
		}

		var states = [];

		for (var i = 0; i < users.length; ++i) {
			states.push({userId: users[i].id, weekAt: monday});
		}

		app.models.WeeklyStatus.create(states, function(err) {
			if (err) {
				console.log('  Failure: ' + err);
			}
			else {
				console.log('  Creating rows went fine. The new week can come.');
			}
		});
	});
}

function createSummaryJobs() {
	var today     = formatDate(new Date());
	var yesterday = formatDate(new Date(+new Date() - 12*3600*1000));
	var delay     = 5; // delay execution of these jobs a bit, so all of them are created

	console.log('Forcing the calculation of not yet determined step goals for today (' + today + ')...');

	// find all users who do not have a stepsGoal set for them for the current day
	var where = {
		and: [
			{dayAt: today},
			{or: [
				{stepsGoal: 0},
				{stepsGoal: null}
			]}
		]
	};

	app.models.DailyStatus.find({where: where}, function(err, states) {
		if (err) {
			console.log('  Error: ' + err);
			return;
		}

		console.log('  Found ' + states.length + ' daily stati that are in need of a step goal.');

		for (var i = 0; i < states.length; ++i) {
			var status = states[i];

			queue.put(config.queue.priority, delay, config.queue.ttr, JSON.stringify({
				job:         'forced-step-goal',
				dailyStatus: status.id
			}), function() {});
		}
	});
}

function finishWeeklyChallenges() {
	var today        = new Date(); // saturday
	var monday       = new Date(today - 5*24*3600*1000);
	var weekAt       = formatDate(monday);
	var pointLogType = PointAPI.TYPE.CHALLENGE;

	// console.log("weekAt = " + weekAt);

	function rankTeams(challenge, teamScores) {
		var rank     = 1;
		var previous = null;
		var teams    = teamScores.length;

		// if there is only one team, we do not grant points
		if (teams < 2) {
			// console.log('As per policy, challenges with just one team do not get points.');
			return;
		}

		for (var i = 0; i < teams; ++i) {
			var pointsCollected = teamScores[i].totalPoints;
			var teamNum         = teamScores[i].teamNum;

			if (pointsCollected !== previous) {
				rank     = i + 1;
				previous = pointsCollected;
			}

			// console.log('Team ' + teamNum + ' got ' + rank + '. place with ' + pointsCollected + ' points.');

			giveTeamPoints(challenge, teamNum, rank, teams);
		}
	}

	function giveTeamPoints(challenge, teamNum, rank, totalTeams) {
		var where   = { challengeId: challenge.id, teamNum: teamNum };
		var creator = challenge.userId;

		app.models.ChallengeTeamMembers.find({where: where}, function(err, members) {
			// console.log('Found ' + members.length + ' team members for team ' + challenge.id + '/' + teamNum + '.');

			for (var i = 0; i < members.length; ++i) {
				var userId    = members[i].userId;
				var isCreator = userId == creator;
				var points    = PointAPI.pointsForChallenges(isCreator, rank, totalTeams);

				// console.log('User ' + userId + ' gets ' + points + ' points.' + (isCreator ? ' This one is the creator.' : ''));

				// create/update pointlog entry for the weekly status of the current user
				setChallengePoints(userId, points, function(err, pointLog) { });
			}
		});
	}

	function setChallengePoints(userId, points, callback) {
		var where = { userId: userId, weekAt: weekAt };

		app.models.WeeklyStatus.findOne({where: where}, function(err, weeklyStatus) {
			if (weeklyStatus === null) {
				console.log('PANIC: Could not find weekly status for the current week (user ' + userId + ').');
				return;
			}

			var pointLogId = weeklyStatus.challengePointLogId;

			if (!pointLogId) {
				app.models.PointLog.createWithType(userId, pointLogType, points, function(err, pointLog) {
					weeklyStatus.updateAttribute('challengePointLogId', pointLog.id, function(err) {
						callback(err, pointLog);
					});
				});
			}
			else {
				app.models.PointLog.findOne({where: {id: pointLogId}}, function(err, pointLog) {
					pointLog.updateAttribute('points', points, callback);
				});
			}
		});
	}

	// find all challenges that ended yesterday
	app.models.Challenge.find({where: {weekAt: weekAt}}, function(err, challenges) {
		// console.log('found ' + challenges.length + ' challenges.');

		challenges.forEach(function(challenge) {
			// find stats for this challenge
			var where = { challengeId: challenge.id };
			var order = 'totalPoints DESC';

			// stats are per-team and we assign points based on the team score (so each user in team 1
			// gets 300 points)
			app.models.ChallengeStats.find({where: where, order: order}, function(err, teamScores) {
				// console.log('found ' + teamScores.length + ' team scores for challenge ' + challenge.id + '.');

				// assign ranks to each team (teams with the same amount of points get the same rank)
				rankTeams(challenge, teamScores);
			});
		});
	});
}

function rewardBestTipOfLastWeek() {
	app.models.TipRating.getBestTip(new Date());
}

function cleanChallenges() {
	var today = app.generateDateString(new Date());
	app.models.Challenge.find({
		where: {weekAt: today},
		include: 'teams'
	}, function(err, challenges) {
		var challenge, teams;
		for (var i = 0; i < challenges.length; i++) {
			challenge = challenges[i];
			teams     = challenge.teams();

			if (teams.length > 1) continue;

			challenge.destroy(function(err, result) {
				if (err) console.log(err);
			});
		}
	});
}

var serverRoot = path.join(__dirname, '..', 'server');

// Bootstrap the application, configure models, datasources and middleware.
console.log('Booting LoopBack...');

boot(app, serverRoot, function(err) {
	if (err) throw err;

	console.log('LoopBack has been booted.');

	// connect to beanstalk
	queue = new fivebeans.client(config.queue.host, config.queue.port);

	queue.on('connect', function() {
		console.log('Connection to beanstalkd established. Ready to work...');

		queue.use(config.queue.tube, function() {
			queue.watch(config.queue.tube, worker);

			// if we are the master worker, we have a few extra responsibilities
			if (config.master) {
				// every day at 23.45, create the daily status rows in advance
				setupCronjob('00 45 23 * * *', createTomorrowsDailyStatus);

				// same goes for the weekly status, every sunday evening
				setupCronjob('00 50 23 * * 0', createNextWeekStatus);

				// every morning at 6am, we force the calculation of steps goal for the current day;
				// this is done by creating many small jobs that can be spread among many workers.
				setupCronjob('00 00 06 * * *', createSummaryJobs);

				// finish up weekly challenges every saturday morning (we wait for the summary job to
				// be finished, so that we can take any step goals into consideration for the challenges)
				setupCronjob('00 00 07 * * 6', finishWeeklyChallenges);

				// monday morning, time to check which tip got the most votes in the last week
				setupCronjob('00 00 03 * * 1', rewardBestTipOfLastWeek);

				// monday morning, time to delete challenges without contender
				setupCronjob('00 02 00 * * 1', cleanChallenges);
			}
		});
	}).connect();
});
