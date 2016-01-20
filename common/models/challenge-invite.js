module.exports = function(ChallengeInvite) {

	// notify of new challenge invites (new instances)

	ChallengeInvite.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.isNewInstance) {
			next();
			return;
		}

		ChallengeInvite.app.models.NotificationLog.challengeInvite(ctx.instance);

		next();
	});

};
