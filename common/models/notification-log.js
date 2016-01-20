module.exports = function (NotificationLog) {
	NotificationLog.types = {
		quizPoint: 'quizPoint',
		levelLog: 'levelLog',
		challengeCreated: 'challengeCreated',
		friendshipFirst: 'friendshipFirst',
		friendshipSecond: 'friendshipSecond',
		badgeLog: 'badgeLog',
		challengeInvite: 'challengeInvite',
		challengePoints: 'challengePoints',
		bestStepDay: 'bestStepDay',
		goalDone: 'goalDone',
		dailyStepGoal: 'dailyStepGoal',
		tipWin: 'tipWin',
		bestWeek: 'bestWeek'
	};

	NotificationLog.quizPoint = function(user, related) {
		NotificationLog.log(user, NotificationLog.types.quizPoint, related);
	};

	NotificationLog.levelLog = function(user, levelLogId) {
		NotificationLog.log(user, NotificationLog.types.levelLog, {model: 'LevelLog', id: levelLogId});
	};

	NotificationLog.challengeCreated = function(user, related) {
		NotificationLog.log(user, NotificationLog.types.challengeCreated, related);
	};

	NotificationLog.challengePoints = function(user, related) {
		NotificationLog.log(user, NotificationLog.types.challengePoints, related);
	};

	NotificationLog.friendship = function(friendship) {
		NotificationLog.log(friendship.userId, NotificationLog.types.friendshipFirst, [{model: 'User', id: friendship.friendId}, {'model': 'Friendship', id: friendship.id}]);
		NotificationLog.log(friendship.friendId, NotificationLog.types.friendshipSecond, [{model: 'User', id: friendship.userId}, {'model': 'Friendship', id: friendship.id}]);
	};

	NotificationLog.badgeLog = function(user, related) {
		NotificationLog.log(user, NotificationLog.types.badgeLog, related);
	};

	NotificationLog.challengeInvite = function(invite) {
		NotificationLog.log(invite.userId, NotificationLog.types.challengeInvite, {model: 'Challenge', id: invite.challengeId});
	};

	NotificationLog.bestStepDay = function(dailyStatus) {
		NotificationLog.log(dailyStatus.userId, NotificationLog.types.bestStepDay, {model: 'DailyStatus', id: dailyStatus.id});
	};

	NotificationLog.goalDone = function(userGoal) {
		NotificationLog.log(userGoal.userId, NotificationLog.types.goalDone, {model: 'UserGoal', id: userGoal.id});
	};

	NotificationLog.dailyStepGoal = function(dailyStatus) {
		NotificationLog.log(dailyStatus.userId, NotificationLog.types.dailyStepGoal, {model: 'DailyStatus', id: dailyStatus.id});
	};

	NotificationLog.tipWin = function(user, related) {
		NotificationLog.log(user, NotificationLog.types.tipWin, related);
	};

	NotificationLog.bestWeek = function(weeklyStatus) {
		NotificationLog.log(weeklyStatus.userId, NotificationLog.types.bestWeek, {model: 'WeeklyStatus', id: weeklyStatus.id});
	};

	NotificationLog.log = function (user, type, related, duplicateOk, cb) {
		var userId = typeof user === 'object' ? user.id : user;
		var where = {userId: userId, type: type};
		var entry = {userId: userId, type: type, createdAt: new Date()};

		if (related) {
			var handle = function (obj) {
				if (typeof obj === 'object') {
					var model = null;
					var id = null;
					if (obj.Model && obj.instance.id) {
						model = obj.Model.definition.name;
						id = obj.instance.id;
					} else if (obj.model && obj.id) {
						model = obj.model;
						id = obj.id;
					}

					switch (model) {
						case 'User':
							entry.friendId = id;
							where.friendId = id;
							break;
						case 'BadgeLog':
							entry.badegeLogId = id;
							where.badegeLogId = id;
							break;
						case 'Challenge':
							entry.challengeId = id;
							where.challengeId = id;
							break;
						case 'LevelLog':
							entry.levelLogId = id;
							where.levelLogId = id;
							break;
						case 'PointLog':
							entry.pointLogId = id;
							where.pointLogId = id;
							break;
						case 'DailyStatus':
							entry.dailyStatusId = id;
							where.dailyStatusId = id;
							break;
						case 'WeeklyStatus':
							entry.weeklyStatusId = id;
							where.weeklyStatusId = id;
							break;
						case 'UserGoal':
							entry.userGoalId = id;
							where.userGoalId = id;
							break;
						case 'Friendship':
							entry.friendshipId = id;
							where.friendshipId = id;
							break;
						default:
							console.log('can not log model ', obj);
					}
				}

			};

			if (Array.isArray(related)) {
				related.forEach(handle);
			} else {
				handle(related);
			}
		}

		if (duplicateOk) {
			NotificationLog.create(entry, cb);
		} else {
			NotificationLog.findOne({where: where},
			function (err, log) {
				if (!err && !log) {
					NotificationLog.create(entry, cb);
				} else if (cb) {
					cb(err, log);
				}
			});
		}
	};

	NotificationLog.notifications = function (userId, limit, skip, includeFriends, cb) {
		if (!limit || limit < 1) {
			limit = 10;
		}
		if (skip === undefined || skip === null || skip < 0) {
			skip = 0;
		}
		if (includeFriends === undefined || includeFriends === null) {
			includeFriends = false;
		}

		var find = function(ids, minId, cb) {
			var where = {userId: Array.isArray(ids) ? {inq: ids} : ids};
			if (minId) {
				where.id = {gte: minId};
			}
			NotificationLog.find({
				order: 'id DESC',
				limit: limit,
				skip: skip,
				where: where,
				include: [
					{relation: 'user'},
					{relation: 'friend'},
					{relation: 'badgeLog'},
					{relation: 'challenge'},
					{relation: 'levelLog', scope: {include: ['level']}},
					{relation: 'pointLog'},
					{relation: 'dailyStatus'},
					{relation: 'weeklyStatus', scope: {include: ['steps']}},
					{relation: 'userGoal'},
					{relation: 'friendship'}]
			}, cb);
		};

		if (includeFriends) {
			NotificationLog.app.models.Friendship.friendShipsQuery(userId, true, function(error, friendShips) {
				NotificationLog.userFirstLogId(userId, function(minId) {
					friendShips.push(userId);
					find(friendShips, minId, cb);
				});
			});
		} else {
			find(userId, null, cb);
		}
	};

	NotificationLog.userFirstLogId = function(userId, cb) {
		NotificationLog.findOne({
			where: {userId: userId},
			order: 'id ASC'
		}, function(err, log) {
			if (!err && log) {
				cb(log.id);
			} else {
				cb(null);
			}
		});
	};

	NotificationLog.notificationsCount = function (userId, includeFriends, gtId, cb) {
		if (includeFriends === undefined || includeFriends === null) {
			includeFriends = false;
		}

		if (gtId === undefined) {
			gtId = null;
		}

		var count = function(ids, minId, cb) {
			var where = {
				userId: Array.isArray(ids) ? {inq: ids} : ids
			};
			if (minId) {
				where.id = {gte: minId};
			}
			if (gtId) {
				where.id = {gt: gtId};
			}
			NotificationLog.count(where, cb);
		};

		if (includeFriends) {
			NotificationLog.app.models.Friendship.friendShipsQuery(userId, true, function(error, friendShips) {
				NotificationLog.userFirstLogId(userId, function(minId) {
					friendShips.push(userId);
					count(friendShips, minId, cb);
				});
			});
		} else {
			count(userId,null, cb);
		}
	};

	NotificationLog.remoteMethod(
		'notifications',
		{
			http: {path: '/notifications', verb: 'get'},
			accepts: [
				{arg: 'userId', type: 'number', required: true},
				{arg: 'limit', type: 'number', required: false},
				{arg: 'skip', type: 'number', required: false},
				{arg: 'includeFriends', type: 'boolean', required: false}
			],
			returns: {arg: 'notifications', type: 'array'}
		}
	);

	NotificationLog.logCheckAccess = function(ctx, unused, next) {
		var deny = function() {
			var error = new Error('Access denied.');
			error.statusCode  = 401;
			return next(error);
		};
		if (ctx.req.accessToken) {
			if (ctx.req.accessToken.userId === ctx.args.userId) {
				next(); // same user
			} else {
				NotificationLog.app.models.User.findById(ctx.args.userId, function (err, user) {
					if (err || !user) {
						deny();
					} else {
						if (user.privacyPublic) {
							next(); // public profile
						} else {
							if (user.privacyFriend) {
								NotificationLog.app.models.Friendship.findPair(ctx.req.accessToken.userId, ctx.args.userId, function(err, friendship) {
									if (err || !friendship || !friendship.confirmed) {
										deny();
									} else {
										next(); // friend
									}
								});
							} else {
								deny();
							}
						}
					}
				});
			}
		} else {
			deny();
		}
	};

	NotificationLog.beforeRemote('notifications', NotificationLog.logCheckAccess);

	NotificationLog.remoteMethod(
		'notificationsCount',
		{
			http: {path: '/notificationsCount', verb: 'get'},
			accepts: [
				{arg: 'userId', type: 'number', required: true},
				{arg: 'includeFriends', type: 'boolean', required: false},
				{arg: 'gtId', type: 'number', required: false}
			],
			returns: {arg: 'notificationsCount', type: 'number'}
		}
	);

	NotificationLog.beforeRemote('notificationsCount', NotificationLog.logCheckAccess);

	NotificationLog.disableRemoteMethod('create', true);
	NotificationLog.disableRemoteMethod('upsert', true);
	NotificationLog.disableRemoteMethod('find', true);
	NotificationLog.disableRemoteMethod('findOne', true);
	NotificationLog.disableRemoteMethod('findById', true);
	NotificationLog.disableRemoteMethod('deleteById', true);
	NotificationLog.disableRemoteMethod('exists', true);
	NotificationLog.disableRemoteMethod('count', true);
	NotificationLog.disableRemoteMethod('createChangeStream', true);
	NotificationLog.disableRemoteMethod('updateAll', true);
	NotificationLog.disableRemoteMethod('updateAttributes');
	NotificationLog.disableRemoteMethod('__get__badgeLog');
	NotificationLog.disableRemoteMethod('__get__challenge');
	NotificationLog.disableRemoteMethod('__get__dailyStatus');
	NotificationLog.disableRemoteMethod('__get__friend');
	NotificationLog.disableRemoteMethod('__get__friendship');
	NotificationLog.disableRemoteMethod('__get__levelLog');
	NotificationLog.disableRemoteMethod('__get__pointLog');
	NotificationLog.disableRemoteMethod('__get__user');
	NotificationLog.disableRemoteMethod('__get__userGoal');
};
