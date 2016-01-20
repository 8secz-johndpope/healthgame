var async = require('async');
var Api   = require('../../fitbit/api.js');
var api   = null;

module.exports = function (HUser) {
	HUser.observe('after save', function (ctx, next) {
		if (ctx.isNewInstance) {
			var levelLog = {
				userId: ctx.instance.id,
				levelId: 1,
				reachedAt: new Date()
			};
			HUser.app.models.LevelLog.create(levelLog, function(err, log) {
				if (err) {
					console.log('Could not create LevelLog for start level of HUser ' + ctx.instance.id);
				}
			});
		}

		next();
	});

	HUser.timeline = function (userId, cb) { // seems this method is not used
		var where = {
			or: [
				{userId: userId, confirmed: true},
				{friendId: userId, confirmed: true}
			]
		};


		HUser.app.models.Friendship.find({where: where}, function (error, friendShips) {
			var friends = [];
			for (var i = 0; i < friendShips.length; i++) {
				friends.push({userId: friendShips[i].friendId});
			}
			if (error || !friendShips.length) {
				cb(null, []);
			} else {
				HUser.app.models.PointLog.find({
					where: {
						or: friends
					}
				}, function (pointError, dailyStatus) {
					// @TODO add more data to it, if needed
					cb(pointError, dailyStatus);
				});
			}
		});
	};

	HUser.remoteMethod(
		'timeline',
		{
			http: {path: '/timeline', verb: 'get'},
			accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
			returns: {arg: 'timeline', type: 'array'}
		}
	);


	HUser.bestWeekSteps = function (userId, cb) {
		HUser.app.models.StepsWeekly.findOne({
			where: {userId: userId},
			order: 'steps DESC'
		}, cb);
	};

	HUser.remoteMethod(
		'bestWeekSteps',
		{
			http: {path: '/getbestweeksteps', verb: 'get'},
			accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
			returns: {arg: 'steps', type: 'object'}
		}
	);

	HUser.findFromDeleteToken = function(deleteToken, cb) {
		if(deleteToken) {
			HUser.findOne({where: {deleteToken: deleteToken}}, function(err, result) {
				cb(err, result);
			});
		} else {
			cb('No deleteToken delivered');
		}
	};

	// Flags the user as deleted
	HUser.removeAccount = function (deleteToken, cb) {
		if(!api) {
			var fitbitConfig = HUser.app.get('fitbit');
			api          = new Api(fitbitConfig.clientId, fitbitConfig.clientConsumerSecret);
		}
		HUser.findFromDeleteToken(deleteToken, function(err, user) {
			if(err || !user) cb(err || 'No user found.');
			else {
				api.deleteSubscription(user.fitbitUserId, user.fitbitAccessToken, function(code, result) {
					console.log('Delete subscription: ', result);

					HUser.app.models.Friendship.deleteWhere({
						where: {
							or: [
								{userId: user.id},
								{friendId: user.id}
							]
						}
					}, function() {});
					user.updateAttributes({
						deleted: true,
						fitbitUserId: null,
						fitbitAccessToken: null,
						fitbitRefreshToken: null,
						username: '[deleted]',
						email: deleteToken + '@null.com', // Email value is required
						privacyPublic: false,
						privacyFriend: false
					}, cb);
				});
				HUser.app.models.AccessToken.find({where: {userId: user.id}}, function(accessErr, accessTokens) {
					if(accessErr) console.log(accessErr);
					else {
						for(var i = 0; i < accessTokens.length; i++) {
							HUser.app.models.AccessToken.destroyById(accessTokens[i].id, function(destroyErr) {
								if(destroyErr) console.log(destroyErr);
							});
							console.log('DELETED TOKEN: ', accessTokens[i]);
						}
					}
				});
			}
		});
	};

	// Sends deleteconfirmation as a mail
	HUser.deleteAccount = function (userId, cb) {
		HUser.findById(userId, function (error, result) {
			if (error) cb(error);
			if (result === null) cb();

			var fitbitConfig = HUser.app.get('fitbit');

			HUser.app.models.Email.send({
				to: result.email,
				from: 'portal@healthgameslab.com',
				subject: 'Delete Account',
				text:
					"Hallo " + result.username + ",\n\n" +
					"bitte ruf folgenden Link auf um deinen Account zu löschen.\n" +
					"Link: " + fitbitConfig.callbackBase + "/deleteUser/" + result.deleteToken +"\n\n" +
					"Dein Healingo-Team",
				html:
					"Hallo " + result.username + ",<br /><br />" +
					"bitte ruf folgenden Link auf um deinen Account zu löschen.<br />" +
					"Link: <a href=\"" + fitbitConfig.callbackBase + "/deleteUser/" + result.deleteToken +"\">" + fitbitConfig.callbackBase + "/deleteUser/" + result.deleteToken +"</a><br /><br />" +
					"Dein Healingo-Team"
			}, function(error, user_result) {
				if (error) cb(error);

				HUser.app.models.Email.send({
					to: result.email,
					from: 'portal@healthgameslab.com',
					subject: 'Delete Account',
					text:
						"Hallo Healingo Team,\n\n" +
						"folgender Nutzer hat soeben eine E-Mail bekommen, um seinen Account zu löschen.\n" +
						"ID: " + result.id + "\n" +
						"Nutzername: " + result.username,
					html:
						"Hallo Healingo Team,<br /><br />" +
						"folgender Nutzer hat soeben eine E-Mail bekommen, um seinen Account zu löschen.<br />" +
						"ID: " + result.id + "<br />" +
						"Nutzername: " + result.username
				}, function(error, admin_result) {
					cb(error || error, {user: user_result, admin: admin_result});
				});
			});
		});
	};

	HUser.remoteMethod(
		'deleteAccount',
		{
			http: {path: '/deleteaccount', verb: 'get'},
			accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
			returns: {arg: 'mail', type: 'object'}
		}
	);

	HUser.friendShips = function (userId, cb) {
		HUser.app.models.Friendship.friendShipsQuery(userId, true, function(error, friendShips) {
			async.map(friendShips, function(task, done) {
				// Because of an scoping issue, it could not be put in map() directly
				HUser.findById(task, function(err, user) {
					done(err, user);
				});
			}, cb);
		});
	};

	HUser.remoteMethod(
		'friendShips',
		{
			http: {path: '/friendShips', verb: 'get'},
			accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
			returns: {arg: 'friendShips', type: 'array'}
		}
	);

	HUser.quizStats = function (userId, cb) {
		HUser.dataSource.connector.query(
			'SELECT count(quizId) * 3 as questions, SUM(quizOk1 + quizOK2 + quizOK3) as correctAnswers FROM DailyStatus WHERE quizId IS NOT NULL AND userId = ? GROUP BY userId',
			[userId],
			function (error, result) {
				cb(error || error, result[0]);
			}
		);
	};

	HUser.remoteMethod(
		'quizStats',
		{
			http: {path: '/:id/quizstats', verb: 'get'},
			accepts: {arg: 'id', type: 'number', required: true},
			returns: {arg: 'stats', type: 'object'}
		}
	);

	// remove related remote methods
	HUser.disableRemoteMethod('__findById__notificationLogs');
	HUser.disableRemoteMethod('__destroyById__notificationLogs');
	HUser.disableRemoteMethod('__updateById__notificationLogs');
	HUser.disableRemoteMethod('__get__notificationLogs');
	HUser.disableRemoteMethod('__create__notificationLogs');
	HUser.disableRemoteMethod('__delete__notificationLogs');
	HUser.disableRemoteMethod('__count__notificationLogs');
	
	HUser.disableRemoteMethod('__findById__friendPrime');
	HUser.disableRemoteMethod('__destroyById__friendPrime');
	HUser.disableRemoteMethod('__updateById__friendPrime');
	HUser.disableRemoteMethod('__get__friendPrime');
	HUser.disableRemoteMethod('__create__friendPrime');
	HUser.disableRemoteMethod('__delete__friendPrime');
	HUser.disableRemoteMethod('__count__friendPrime');
	
	HUser.disableRemoteMethod('__findById__friendSecond');
	HUser.disableRemoteMethod('__destroyById__friendSecond');
	HUser.disableRemoteMethod('__updateById__friendSecond');
	HUser.disableRemoteMethod('__get__friendSecond');
	HUser.disableRemoteMethod('__create__friendSecond');
	HUser.disableRemoteMethod('__delete__friendSecond');
	HUser.disableRemoteMethod('__count__friendSecond');

};
