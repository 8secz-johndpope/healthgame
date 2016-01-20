var PointAPI = require('./../points.js');

module.exports = function(Challenge) {	
	Challenge.observe('before save', function(ctx, next) {
		var dateString = Challenge.app.generateDateString(ctx.instance.weekAt);
		var where = {and: [
			{weekAt: dateString},
			{userId: ctx.instance.userId}
		]};
		Challenge.find({where: where}, function(err, challenges) {

			var result = null;
			var maxChallenge = Challenge.app.get('constants').maxChallenge;
			if(challenges.length >= maxChallenge ) {
				result = new Error('You only can create ' + maxChallenge + ' challenge');
			}
			next(result);
		});
	});
	
	Challenge.observe('after save', function(ctx, next) {
		Challenge.app.models.NotificationLog.challengeCreated(ctx.instance.userId, ctx);

		var points = PointAPI.pointsForChallengeCreate();
		Challenge.app.models.PointLog.createWithType(ctx.instance.userId, PointAPI.TYPE.CHALLENGECREATE, points, function(err, result) {
			console.log(err, result);
		});

		next();
	});
};
