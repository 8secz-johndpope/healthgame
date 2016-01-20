module.exports = function(Level) {
	Level.getAccording = function(userId, cb) {
		Level.app.models.PointLog.getSum(userId, function(err, result) {
			if(err) {
				cb(err);
			} else {
				var where = {
					pointsStart: {lte: result},
					pointsEnd:  {gte: result}
				};
				Level.app.models.PointLog.app.models.Level.findOne({where: where}, function(levelError, level) {
					cb(levelError, level);
				});
			}
		});
	};
};
