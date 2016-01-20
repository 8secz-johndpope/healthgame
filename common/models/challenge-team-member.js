var PointAPI = require('./../points.js');

module.exports = function(ChallengeTeamMember) {
	ChallengeTeamMember.observe('after save', function(ctx, next) {		
		var points = PointAPI.pointsForChallengeParticipation();
		ChallengeTeamMember.app.models.PointLog.createWithType(ctx.instance.userId, PointAPI.TYPE.CHALLENGEPARTICIPATION, points, function(err, result) {
			console.log(err, result);
		});

		next();
	});
};
