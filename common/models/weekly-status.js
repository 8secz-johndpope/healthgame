module.exports = function(WeeklyStatus) {
	var async = require('async');

	// grant badges for reaching a certain number of *won* challenges

	function findScores(participation, next) {
		// determine the max point amount of any team in this challenge; this is so we can ensure
		// that multiple teams can win a challenge (be on place 1)
		var where = { challengeId: participation.challengeId };
		var order = 'totalPoints DESC';

		WeeklyStatus.app.models.ChallengeStats.findOne({where: where, order: order}, function(err, topSample) {
			// and how well did this user's team do?
			var where = { challengeId: participation.challengeId, teamNum: participation.teamNum };

			WeeklyStatus.app.models.ChallengeStats.findOne({where: where}, function(err, teamScore) {
				next(teamScore.totalPoints >= topSample.totalPoints);
			});
		});
	}

	WeeklyStatus.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.challengeId || !ctx.instance.challengePointLogId) {
			next();
			return;
		}

		// if we have points, we know that the challenge has been completed; so
		var challengeId = ctx.instance.challengeId;
		var userId      = ctx.instance.userId;
		var weekAt      = ctx.instance.weekAt;

		// let's find all challenges this user participated in
		var where = { userId: userId };

		WeeklyStatus.app.models.ChallengeTeamMembers.find({where: where}, function(err, participations) {
			if (err) {
				next();
				return;
			}
			
			// for each participation, determine the top and team score
			async.filter(participations, findScores, function(wins) {
				var totalWins = wins.length;
				var badges    = [];
				var BadgeLog  = WeeklyStatus.app.models.BadgeLog;

				if (totalWins >= 1) badges.push(BadgeLog.TYPE.MEDAILLIENJAEGER);
				if (totalWins >= 3) badges.push(BadgeLog.TYPE.HATTRICK);
				if (totalWins >= 5) badges.push(BadgeLog.TYPE.FUENFKAEMPFER);

				BadgeLog.grantBadges(userId, badges, function(err) {
					next();
				});
			});
		});
	});
	
	WeeklyStatus.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.challengeId || !ctx.instance.challengePointLogId) {
			next();
			return;
		}

		WeeklyStatus.app.models.NotificationLog.challengePoints(ctx.instance.userId, [
			{model: 'PointLog', id: ctx.instance.challengePointLogId}, 
			{model: 'Challenge', id: ctx.instance.challengeId}
		]);

		next();
	});
};
