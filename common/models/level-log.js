module.exports = function(LevelLog) {
	LevelLog.getHighest = function(userId, cb) {
		var where = {userId: userId};
		LevelLog.findOne({where: where, order: 'levelId DESC'}, cb);
	};
	LevelLog.upgrade = function(userId, level, cb) {
		LevelLog.getHighest(userId, function(err, result) {
			if(err || !result || result.levelId === level.id) {
				cb(err, result);
			} else {
				LevelLog.create({
					userId: userId,
					levelId: level.id,
					reachedAt: new Date(),
					pointLogId: null // @TODO Whats that for?
				}, function (err, result) {
					if (!err) {
						LevelLog.app.models.NotificationLog.levelLog(userId, result.id);
					}
					cb(err, result);
				});
			}
		});
	};
};
