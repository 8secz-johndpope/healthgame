module.exports = function(BadgeLog) {
	var async = require('async');

	BadgeLog.TYPE = {
		ALLTAGSLAEUFER: 'alltagslaeufer',
		EHRGEIZLING: 'ehrgeizling',
		FORREST_GUMP: 'forrestgump',
		FUENFKAEMPFER: 'fuenfkaempfer',
		GANG_OF_TEN: 'gangoften',
		HATTRICK: 'hattrick',
		HOLZSANDALE: 'holzsandale',
		INSPIRATIONSQUELLE: 'inspirationsquelle',
		LANGSTRECKENASS: 'langstreckenass',
		MEDAILLIENJAEGER: 'medaillienjaeger',
		MITTELSTRECKENPROFI: 'mittelstreckenprofi',
		QUIZPERTE: 'quizperte',
		QUIZZES: 'quizzes',
		RAETSELMEISTER: 'raetselmeister',
		RATGEBER: 'ratgeber',
		SCHLAUBERGER: 'schlauberger',
		SPITZENLAUFSCHUH: 'spitzenlaufschuh',
		STAMMSPIELER: 'stammspieler',
		TALENT: 'talent',
		WANDERSNEAKER: 'wandersneaker',
		ZIELORIENTIERT: 'zielorientiert',
		ZIELSICHER: 'zielsicher',
		ZIELSTREBIG: 'zielstrebig',
	};

	BadgeLog.grantBadges = function(userId, types, cb) {
		async.each(types, function(type, next) {
			BadgeLog.grantBadge(userId, type, next);
		}, cb);
	};

	BadgeLog.grantBadge = function(userId, type, cb) {
		BadgeLog.findOne({where: {userId: userId, type: type}}, function(err, log) {
			if (err) {
				cb(err, null);
				return;
			}

			// user already has this badge
			if (log !== null) {
				cb(err, log);
				return;
			}

			var badge = {
				userId: userId,
				reachedAt: new Date(),
				type: type
			};

			BadgeLog.create(badge, function(err, log) {
				cb(err, log);
			});
		});
	};

	// notify user of new badges (new instances)

	BadgeLog.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.isNewInstance) {
			next();
			return;
		}

		BadgeLog.app.models.NotificationLog.badgeLog(ctx.instance.userId, ctx);
		next();
	});
};
