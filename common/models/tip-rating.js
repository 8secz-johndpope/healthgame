var PointAPI = require('./../points.js');

module.exports = function(TipRating) {

	TipRating.observe('before save', function(ctx, next) {
		if (ctx.isNewInstance) {
			var where = {userId: ctx.instance.userId, tipId: ctx.instance.tipId};
			TipRating.count(where, function(err, count) {
				if(err) {
					next(err);
				} else if(count) {
					next(new Error('You already voted for this tip'));
				} else {
					ctx.instance.created = new Date();
					next();
					var type = PointAPI.TYPE.TIP;
					var size = PointAPI.pointsFotTipCreation();
					TipRating.app.models.PointLog.createWithType(ctx.instance.userId, type, size, function(err, result) {
						console.log(err, result);
					});
				}
			});
		}
	});

	TipRating.getBestTip = function(date) {
		var where = TipRating.getPreviousWeek(date);
		TipRating.app.models.UserGoal.find({
			include: [
				{goal: {category: ['parent']}},
				{
					relation: 'tipRating',
					scope: {
						where: where
					}
				}
			]
		}, function(err, tips) {
			if(err) console.log(err);
			var goals = TipRating.calculateBest(tips);
			for(var goalIndex in goals) {
				var goal = TipRating.app.sortAndFlat(goals[goalIndex], 'percentage');
				var bestValue = 0;
				var count = 0;
				for(var tipIndex = 0; tipIndex < goal.length; tipIndex++) {
					if (goal[tipIndex].percentage) {
						if (bestValue < goal[tipIndex].percentage) {
							bestValue = goal[tipIndex].percentage;
						}
						if(goal[tipIndex].percentage === bestValue) {
							count++;
						}
					}
				}
				for (var i = 0; i < goal.length; i++) {
					if (goal[i].percentage === bestValue) {
						var points = PointAPI.pointsFotTipWin(count);
						if (goal[i].userId) {
							TipRating.app.models.PointLog.createWithType(goal[i].userId, PointAPI.TYPE.TIPWIN, points, function(err, result) {
								if (!err && result) {
									TipRating.app.models.NotificationLog.tipWin(goal[i].userId, {model: 'PointLog', id: result.id});
								}
								console.log(err, result);
							});

							TipRating.app.models.BadgeLog.grantBadge(goal[i].userId, TipRating.app.models.BadgeLog.TYPE.INSPIRATIONSQUELLE, function() {});
						}
					}
				}
			}
		});
	};

	TipRating.calculateBest = function(tips) {
		var goals = {};
		tips.forEach(function(tipOrigin) {
			var tip = tipOrigin.toJSON();
			var goalId = tip.goal.category.id;
			if(!goals[goalId]) goals[goalId] = {};
			if(!goals[goalId][tip.id]) goals[goalId][tip.id] = {upvote: 0, downvote: 0};
			for(var ratingIndex = 0; ratingIndex < tip.tipRating.length; ratingIndex++) {
				var rating = tip.tipRating[ratingIndex];
				goals[goalId][tip.id].tipId  = tip.id;
				goals[goalId][tip.id].userId = tip.userId;
				if(rating.vote) {
					goals[goalId][tip.id].upvote++;
				} else {
					goals[goalId][tip.id].downvote++;
				}
				var voteSum = goals[goalId][tip.id].upvote + goals[goalId][tip.id].downvote;
				if (voteSum) {
					goals[goalId][tip.id].percentage = goals[goalId][tip.id].upvote / voteSum;
				}
				else {
					goals[goalId][tip.id].percentage = 0;
				}
			}
		});
		return goals;
	};

	TipRating.getPreviousWeek = function(date) {
		date.setDate(date.getDate() - (date.getDay() + 6) % 7); // Sets the date to the monday
		date.setDate(date.getDate() - 1); // Sets the date to the sunday
		var sunday = TipRating.app.generateDateString(date);
		date.setDate(date.getDate() - 6); // Sets the date to the monday
		var monday = TipRating.app.generateDateString(date);
		var where = {and: [
				{created:
					{lte: sunday}
				},
				{created:
					{gte: monday}
				}
			]
		};
		console.log('Week from: ' + monday + ' - ' + sunday);
		return where;
	};

};
