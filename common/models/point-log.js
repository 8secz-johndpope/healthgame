module.exports = function(PointLog) {
	var PointAPI = require('./../points.js');

	PointLog.points = {
		loginPoint: PointAPI.pointsForLogin(),
	};

	PointLog.createForDate = function(userId, type, date, cb) {
		var id  = type + 'LogId';
		var now = PointLog.app.generateDateTimeString(new Date());

		PointLog.app.models.DailyStatus.createForDate(userId, date, function(dailyError, dailyStatus) {
			if (dailyError) { // dailyError - pun intended
				cb(dailyError, null);
			} else if (dailyStatus['$' + id]) {
				PointLog.findOne({id: dailyStatus[id]}, cb);
			} else {
				var pointLog = {userId: userId, dayAt: date, createdAt: now, type: type, points: PointLog.points[type]};
				dailyStatus[type + 'Log'].create(pointLog, cb);
			}
		});
	};

	PointLog.createWithType = function(userId, type, size, cb) {
		var today = PointLog.app.generateDateString(new Date());
		var now = PointLog.app.generateDateTimeString(new Date());
		var pointLog = {userId: userId, dayAt: today, createdAt: now, type: type, points: size};
		PointLog.create(pointLog, cb);
	};

	PointLog.createToday = function(userId, type, cb) {
		var today = PointLog.app.generateDateString(new Date());

		PointLog.createForDate(userId, type, today, cb);
	};

	PointLog.getSum = function(userId, cb) {
		PointLog.find({where: {userId: userId}}, function(err, result) {
			var sum = 0;
			for(var i = 0; i < result.length; i++) {
				sum += result[i].points;
			}
			cb(err, sum);
		});
	};

	PointLog.updateLevel = function(userId) {
		PointLog.app.models.Level.getAccording(userId, function(err, level) {
			if(err) {
				console.error(err);
			} else {
				PointLog.app.models.LevelLog.upgrade(userId, level, function(upgradeErr, currentLevel) {
					if(upgradeErr) {
						console.error(upgradeErr);
					}
				});
			}
		});
	};

	function grantStammspielerBadge(userId, callback) {
		var where = { userId: userId, type: PointAPI.TYPE.LOGIN };
		var order = 'dayAt DESC';

		function toSeconds(d) {
			return (new Date(d)).getTime() / 1000;
		}

		PointLog.find({where: where, order: order, limit: 5}, function(err, logs) {
			if (err || !logs || logs.length < 5) {
				callback();
				return;
			}

			var prev        = toSeconds(logs[0].dayAt);
			var oneDay      = 24*3600;
			var consecutive = true;

			for (var i = 1; i < logs.length; ++i) {
				var dayAt = toSeconds(logs[i].dayAt);

				if (prev - dayAt > oneDay) {
					consecutive = false;
					break;
				}

				prev = dayAt;
			}

			if (!consecutive) {
				callback();
				return;
			}

			var BadgeLog = PointLog.app.models.BadgeLog;

			BadgeLog.grantBadge(userId, BadgeLog.TYPE.STAMMSPIELER, function() {
				callback();
			});
		});
	}

	PointLog.observe('after save', function(ctx, next) {
		PointLog.updateLevel(ctx.instance.userId);

		if (!ctx.isNewInstance) {
			next();
			return;
		}

		switch (ctx.instance.type) {
			case PointAPI.TYPE.QUIZ:
				PointLog.app.models.NotificationLog.quizPoint(ctx.instance.userId, ctx);
				next();
				break;

			case PointAPI.TYPE.LOGIN:
				grantStammspielerBadge(ctx.instance.userId, next);
				break;
				
			case PointAPI.TYPE.CHALLENGE:
				PointLog.app.models.NotificationLog.challengePoints(ctx.instance.userId, ctx);
				next();
				break;

			default:
				next();
		}
	});
};
