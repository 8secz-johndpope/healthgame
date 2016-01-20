var async = require('async');

module.exports = function (Friendship) {
	
	Friendship.search = function (userId, query, cb) {
		Friendship.app.models.User.find({
			where: {
				username: {like: query + '%'},
				id: {neq: userId}
			},
			limit: 10,
			include: [
				{
					relation: 'friendPrime',
					scope: {
						where: {friendId: userId}
					}
				},
				{
					relation: 'friendSecond',
					scope: {
						where: {userId: userId}
					}
				}
			]
		},
		function (error, result) {
			if (!error) {
				for (var i = 0; i < result.length; i++) {
					var user = result[i];
					var userClean = user.toObject();
					var prime = userClean.friendPrime.length ? userClean.friendPrime[0].confirmed : null;
					var second = userClean.friendSecond.length ? userClean.friendSecond[0].confirmed : null;
					result[i].friendStatus = {
						confirmed: prime === true || second === true,
						selfRequest: second === false && prime === null,
						otherRequest: prime === false && second === null,
						nothing: prime === null && second === null
					};
				}
				cb(null, result);
			} else {
				cb(error, null);
			}
		});
	};
	
	Friendship.findRequests = function (id, cb) {
		Friendship.find({
			where: {friendId: id, confirmed: false},
		}, function (error, friendShips) {
			if (!error) {
				async.map(friendShips, function (fs, done) {
					// Because of an scoping issue, it could not be put in map() directly
					Friendship.app.models.User.findById(fs.userId, function (err, user) {
						done(err, user);
					});
				}, cb);
			} else {
				cb(error, null);
			}
		});
	};

	Friendship.deleteWhere = function(opt, cb) {
		Friendship.find(opt, function(friendErr, friendshipResult) {
			if(friendErr) console.error(friendErr);
			else {
				console.log('friends:', friendshipResult);
				for(var i = 0; i < friendshipResult.length; i++) {
					Friendship.destroyById(friendshipResult[i].id, function(err, result) {
						if(err) console.error(err);
						else console.log('It went fine');
					});
				}
			}
			cb(friendErr, friendshipResult);
		});
	};

	Friendship.findPair = function (id1, id2, cb) {
		Friendship.findOne({
			where: {
				or: [
					{userId: id1, friendId: id2},
					{friendId: id1, userId: id2}
				]
			}
		}, cb);
	};

	Friendship.doConfirm = function (userId, friendId, cb) {
		Friendship.findPair(userId, friendId, function (error, pair) {
			if (!error) {
				if (pair === null) {
					Friendship.create({
						userId: userId,
						friendId: friendId,
						confirmed: false
					}, cb);
				} else {
					if (pair.userId == userId) {
						// can not confirm my own request
						cb(null, pair);
					}
					if (pair.friendId == userId) {
						if (pair.confirmed === false) {
							pair.updateAttribute('confirmed', true);
						}

						cb(null, pair);
					}
				}
			} else {
				cb(error, null);
			}
		});
	};

	Friendship.doDeny = function (userId, friendId, cb) {
		Friendship.findPair(userId, friendId, function (error, pair) {
			if (!error) {
				if (pair === null) {
					cb(null, null);
				} else {
					Friendship.destroyById(pair.id, function (error) {
						cb(error, null);
					});
				}
			} else {
				cb(error, null);
			}
		});
	};

	Friendship.friendShipsQuery = function (userId, confirmed, cb) {
		var where = {
			or: [
				{userId: userId, confirmed: confirmed},
				{friendId: userId, confirmed: confirmed}
			]
		};

		Friendship.find({where: where}, function (err, friendShips) {
			var result = [];
			for (var i = 0; i < friendShips.length; i++) {
				var id = null;
				if (userId == friendShips[i].userId) { // Do not change to strict comparison
					id = friendShips[i].friendId;
				} else {
					id = friendShips[i].userId;
				}
				result.push(id);
			}
			cb(err, result);
		});
	};

	Friendship.recommend = function (userId, cb) {
		// @TODO use Friendship.app.sortAndFlat(friends, 'count', 10) instead
		function sortAndFlat(friends) {
			var result = [];
			for (var index in friends) {
				if (friends.hasOwnProperty(index)) {
					result.push(friends[index]);
				}
			}

			result.sort(function (a, b) {
				return b.count - a.count;
			});

			if (result.length > 10) {
				result = result.slice(0, 9);
			}
			return result;
		}

		Friendship.friendShipsQuery(userId, true, function (error, friendShips) {
			if (error) {
				cb(error);
			}
			else {
				Friendship.friendShipsQuery(userId, false, function (error, invites) {
					if (error) {
						cb(error);
					} else {
						async.map(friendShips, function (task, done) {
							// Because of an scoping issue, it could not be put in map() directly
							Friendship.friendShipsQuery(task, true, function (err, user) {
								done(err, user);
							});
						}, function (mutualError, mutualResult) {
							if (mutualError) {
								cb(mutualError);
							}
							else {
								var tmp = {};
								for (var directFriendsIndex = 0; directFriendsIndex < mutualResult.length; directFriendsIndex++) {
									var directFriend = mutualResult[directFriendsIndex];
									for (var foreignFriendsIndex = 0; foreignFriendsIndex < directFriend.length; foreignFriendsIndex++) {
										var foreignUser = directFriend[foreignFriendsIndex];
										// Check if user is already friended by the user, or if it is himself
										if (friendShips.indexOf(foreignUser) === -1 && invites.indexOf(foreignUser) === -1 && foreignUser != userId) {
											if (!tmp[foreignUser]) {
												tmp[foreignUser] = {id: foreignUser, count: 0};
											}
											tmp[foreignUser].count++;
										}
									}
								}

								var userIds = sortAndFlat(tmp);

								async.map(userIds, function (fs, done) {
									// Because of an scoping issue, it could not be put in map() directly
									Friendship.app.models.User.findById(fs.id, function (err, user) {
										done(err, user);
									});
								}, cb);
							}
						});
					}
				});

			}
		});
	};

	Friendship.remoteMethod(
			'search',
			{
				http: {path: '/search', verb: 'get'},
				accepts: [
					{arg: 'id', type: 'number', required: true},
					{arg: 'query', type: 'string', required: true}
				],
				returns: {arg: 'search', type: 'array'}
			}
	);

	Friendship.beforeRemote('search', function (ctx, unused, next) {
		if (!ctx.req.accessToken || ctx.req.accessToken.userId !== ctx.args.id) {
			var error = new Error('Access denied.');
			error.statusCode = 401;
			return next(error);
		}
		next();
	});

	Friendship.remoteMethod(
			'findRequests',
			{
				http: {path: '/findRequests', verb: 'get'},
				accepts: [
					{arg: 'id', type: 'number', http: {source: 'query'}}
				],
				returns: {arg: 'findRequests', type: 'object'}
			}
	);
	
	Friendship.beforeRemote('findRequests', function(ctx, unused, next) { 
		if (!ctx.req.accessToken || ctx.req.accessToken.userId !== ctx.args.id) {
			var error = new Error('Access denied.');
			error.statusCode  = 401;
			return next(error);
		}
		next();
	});

	Friendship.remoteMethod(
			'doConfirm',
			{
				http: {path: '/doConfirm', verb: 'put'},
				accepts: [
					{arg: 'userId', type: 'number'},
					{arg: 'friendId', type: 'number'}
				],
				returns: {arg: 'doConfirm', type: 'object'}
			}
	);
	
	Friendship.beforeRemote('doConfirm', function(ctx, unused, next) { 
		if (!ctx.req.accessToken || ctx.req.accessToken.userId !== ctx.args.userId) {
			var error = new Error('Access denied.');
			error.statusCode  = 401;
			return next(error);
		}
		next();
	});

	Friendship.remoteMethod(
			'doDeny',
			{
				http: {path: '/doDeny', verb: 'post'},
				accepts: [
					{arg: 'userId', type: 'number'},
					{arg: 'friendId', type: 'number'}
				],
				returns: {arg: 'doDeny', type: 'object'}
			}
	);
	
	Friendship.beforeRemote('doDeny', function(ctx, unused, next) { 
		if (!ctx.req.accessToken || ctx.req.accessToken.userId !== ctx.args.userId) {
			var error = new Error('Access denied.');
			error.statusCode  = 401;
			return next(error);
		}
		next();
	});

	Friendship.remoteMethod(
			'recommend',
			{
				http: {path: '/:id/recommend', verb: 'get'},
				accepts: {arg: 'id', type: 'number', required: true},
				returns: {arg: 'recommend', type: 'object'}
			}
	);
	
	Friendship.beforeRemote('recommend', function(ctx, unused, next) { 
		if (!ctx.req.accessToken || ctx.req.accessToken.userId !== ctx.args.id) {
			var error = new Error('Access denied.');
			error.statusCode  = 401;
			return next(error);
		}
		next();
	});

	Friendship.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.confirmed) { // log only confirmed
			next();
			return;
		}

		Friendship.app.models.NotificationLog.friendship(ctx.instance);
		next();
	});

	// grant the GangOfTen badge

	Friendship.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.confirmed) {
			next();
			return;
		}

		function checkUserFriends(userId, callback) {
			Friendship.friendShipsQuery(userId, true, function(err, friends) {
				if (friends && friends.length >= 10) {
					var BadgeLog = Friendship.app.models.BadgeLog;

					BadgeLog.grantBadge(userId, BadgeLog.TYPE.GANG_OF_TEN, function(err) {
						callback();
					});
				}
				else {
					callback();
				}
			});
		}

		async.each([ctx.instance.userId, ctx.instance.friendId], checkUserFriends, function(err) {
			next();
		});
	});
	
	Friendship.disableRemoteMethod('create', true);
	Friendship.disableRemoteMethod('upsert', true);
	Friendship.disableRemoteMethod('find', true);
	Friendship.disableRemoteMethod('findOne', true);
	Friendship.disableRemoteMethod('findById', true);
	Friendship.disableRemoteMethod('deleteById', true);
	Friendship.disableRemoteMethod('exists', true);
	Friendship.disableRemoteMethod('count', true);
	Friendship.disableRemoteMethod('createChangeStream', true);
	Friendship.disableRemoteMethod('updateAll', true);
	Friendship.disableRemoteMethod('updateAttributes');
	Friendship.disableRemoteMethod('__get__friend');
	Friendship.disableRemoteMethod('__get__user');
};
