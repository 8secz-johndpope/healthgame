var Api = require('../../fitbit/api.js');

module.exports = function mountFitbitcallback(server) {
	var fitbitConfig = server.get('fitbit');
	var api          = new Api(fitbitConfig.clientId, fitbitConfig.clientConsumerSecret);
	var PointAPI     = require('../../common/points.js');

	function handleUserchange(req, res, next) {
		var fitbitUserId       = req.session.fitbitUserId;
		var fitbitAccessToken  = req.session.fitbitAccessToken;
		api.createSubscription(fitbitUserId, fitbitAccessToken, function(result) {
			if(!result) {
				// @TODO add errorhandling
				console.error('subscription failed for user: ' + fitbitUserId);
			}

			// @FIXME "Currently you cannot modify a built-in model's required properties."
			req.body.password           = req.session.fitbitUserId;
			req.body.fitbitUserId       = req.session.fitbitUserId;
			req.body.fitbitAccessToken  = req.session.fitbitAccessToken;
			req.body.fitbitRefreshToken = req.session.fitbitRefreshToken;
			req.body.username           = req.session.fitbitUsername;
			req.body.emailVerified      = 0;
			req.body.avatar100          = req.session.avatar100;
			req.body.avatar150          = req.session.avatar150;
			next();
		});
	}

	function checkDeviceValidity(accessToken, cb) {
		if(fitbitConfig.checkDeviceValidity) {
			api.getDevices(accessToken, function(deviceStatus, devices) {
				if(!devices || !devices.length) {
					cb('No devices');
				} else {
					var validDevice = false;
					var where = {or: []};
					for(var i = 0; i < devices.length; i++) {
						where.or.push({
							deviceId: devices[i].id
						});
					}
					server.models.FitbitDevice.find({where: where}, function(err, result) {
						console.log('Mep', err || result);
						if(err) cb(err);
						else if(!result.length) cb('No matching device');
						else {
							cb(null, 'everything is fine');
						}
					});
				}
			});
		} else {
			cb(null);
		}
	}

	server.post(server.get('restApiRoot') + '/Users/login', function(req, res, next) {
		if(req.session.accessToken) {
			console.log('Token: ' + req.session.accessToken);
		}
		var status = 401;
		var result = {
			error: {
				name: 'Error',
				status: 401,
				message: 'login failed',
				statusCode: 401,
				code: 'LOGIN_FAILED',
			}
		};

		server.models.User.findOne({where: {fitbitUserId: req.session.fitbitUserId}}, function(err, user) {
			if(!err || user) {
				user.createAccessToken(1209600, function(err, token) {
					result = token;
					status = 200;
					req.session.accessToken = token.id;
					req.session.userId      = token.userId;

					server.models.PointLog.createToday(token.userId, PointAPI.TYPE.LOGIN, function(dailyError, pointLog) {
						if(dailyError) {
							console.error(dailyError);
						}
					});
					res.writeHead(status);
					res.end(JSON.stringify(result));
				});
			} else {
				res.writeHead(status);
				res.end(JSON.stringify(result));
			}
			
		});
	});


	server.post(server.get('restApiRoot') + '/Users', function(req, res, next) {
		req.body.deleteToken = new Array(16+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 16);
		req.body.created            = server.generateDateString(new Date());
		handleUserchange(req, res, next);
	});

	server.put(server.get('restApiRoot') + '/Users', handleUserchange);

	server.use('/deleteUser/:token', function(req, res) {
		server.models.User.removeAccount(req.params.token, function(err, result) {
			if(err) {
				console.error(err);
				res.render('redirect', {uri: '/', payload: '401'});
			} else res.render('redirect', {uri: '/userdeleted'});
		});
	});

	server.use(fitbitConfig.callbackPath, function(req, res) {
		var callback = fitbitConfig.callbackBase + fitbitConfig.callbackPath;
		api.createAccessTokenFromCode(req.query.code, callback, function(tokenStatus, accessToken, refreshToken, body) {
			if(body.errors) {
				res.render('redirect', {uri: '/', payload: '401'});
				console.log('Fitbit API failed', body.errors);
			} else {
				api.getUserInfo(accessToken, function(userStatus, fitbitUser) {
					server.models.User.findOne({where: {fitbitUserId: fitbitUser.encodedId}}, function(err, user) {
						req.session.fitbitUserId       = fitbitUser.encodedId;
						req.session.fitbitAccessToken  = accessToken;
						req.session.fitbitRefreshToken = refreshToken;
						req.session.fitbitUsername     = fitbitUser.displayName;
						req.session.avatar100          = fitbitUser.avatar; // Needed for registration
						req.session.avatar150          = fitbitUser.avatar150; // Needed for registration

						if(user) {
							user.updateAttributes({
								fitbitAccessToken:  accessToken,
								fitbitRefreshToken: refreshToken,
								password: user.fitbitUserId, // Needed when passwords are not created via registration
								avatar100: fitbitUser.avatar,
								avatar150: fitbitUser.avatar150,
							}, function(updateAttributesError) {
								if(updateAttributesError) {
									console.log('updateAttributes Error', updateAttributesError);
									res.render('redirect', {uri: '/', payload: '403'});
								} else {
									user.createAccessToken(1209600, function(err, token) {
										if (err) {
											console.log('Login failed');
											res.render('redirect', {uri: '/', payload: '403'});
										} else {
											token.__data.user = user;
											req.session.accessToken = token.id;
											req.session.userId  = token.userId;
											res.render('redirect', {uri: '/userhome/' + user.id});
											server.models.PointLog.createToday(user.id, PointAPI.TYPE.LOGIN, function(dailyError, pointLog) {
												if(dailyError) {
													console.error(dailyError);
												}
											});
										}
									});
								}
							});
							api.createSubscription(req.session.fitbitUserId, req.session.fitbitAccessToken, function(code, result) {});
						} else {
							checkDeviceValidity(accessToken, function(deviceErr) {
								if(deviceErr) {
									console.log(deviceErr);
									res.render('redirect', {uri: '/error', payload: '409'});
								} else {
									server.models.FitbitData.create(fitbitUser, function(fitbitDataErr, fitbitData) {
										console.log(fitbitDataErr, fitbitData);
									});
									res.render('redirect', {uri: '/register'});
								}
							});
						}
					});

				});
			}
		});
	});

//	server.get(server.get('restApiRoot') + '/Users/:id/recommendedFriends', function(req, res, next) {
//		// This route is needed, else the route would look like this: '/api/Users/friendships?id=1'
//		server.models.User.recommendedFriends(req.params.id, function(err, result) {
//			if(err) console.log(err);
//			res.end(JSON.stringify(err || result));
//		});
//	});
//
//	server.get(server.get('restApiRoot') + '/Users/:id/friendships', function(req, res, next) {
//		// This route is needed, else the route would look like this: '/api/Users/friendships?id=1'
//		server.models.User.friendShips(req.params.id, function(err, result) {
//			if(err) console.log(err);
//			res.end(JSON.stringify(err || result));
//		});
//	});

	// @TODO remove this when not needed anymore
	server.get(server.get('restApiRoot') + '/test', function(req, res, next) {
		var date = new Date();
		date.setDate(date.getDate() + 7);
		server.models.TipRating.getBestTip(date);
		res.end('foo');
	});

	server.get(server.get('restApiRoot') + '/Users/:id/timeline', function(req, res, next) {
		// This route is needed, else the route would look like this: '/api/Users/timeline?id=1'
		server.models.User.timeline(req.params.id, function(err, result) {
			if(err) console.log(err);
			res.end(JSON.stringify(err || result));
		});
	});
};
