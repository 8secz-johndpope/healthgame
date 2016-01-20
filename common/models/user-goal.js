module.exports = function(UserGoal) {
	var PointAPI  = require('./../points.js');

	// grant points for creating a new user goal;
	// check that a user has not created more than the allowed number of goals per week

	UserGoal.observe('before save', function(ctx, next) {

		var data = ctx.data || ctx.instance || {};

		var where = {and: [
				{or: [
					{and: [
						{
							startsAt: {lte: data.startsAt},
							endsAt: {lte: data.endsAt}
						},
						{
							startsAt: {gte: data.startsAt},
							endsAt: {gte: data.endsAt}
						}
					]}
				]},
				{userId: data.userId}
			]
		};

		UserGoal.find({where: where}, function(err, userGoals) {
			var maxWeekly = UserGoal.app.get('constants').maxWeeklyUserGoals;
			var log;
			
			// new goal is created
			if (!data.id) {
				if (userGoals.length >= maxWeekly) {
					next(new Error('You only can create ' + maxWeekly + ' weekly goals'));
					return;
				}

				log = {
					userId: data.userId,
					dayAt: new Date(),
					points: PointAPI.pointsForWeeklyGoal(0, 0),
					type: PointAPI.TYPE.GOAL,
					createdAt: new Date()
				};

				UserGoal.app.models.PointLog.create(log, function(err, log) {
					if (err) {
						console.log('Could not create GoalPointLog for UserGoal creation');
					}
					else {
						data.pointLogId = log.id;
					}

					next();
				});
			}
			// existing goal is edited
			else if (data.finished && !data.pointLogId) {
				UserGoal.app.models.WeeklyGoal.findById(data.id, function(err, goal) {
					if (err) {
						next(err);
					}
					else {
						UserGoal.app.models.UserGoalStatus.findOne({
							where: {id: goal.id}
						}, function(err, goalStatus) {
							log = {
								userId: data.userId,
								dayAt: new Date(),
								points: PointAPI.pointsForWeeklyGoal(goalStatus.totalDays, data.completedDays),
								type: PointAPI.TYPE.GOAL,
								createdAt: new Date()
							};
							UserGoal.app.models.PointLog.create(log, function(err, log) {
								if (err) {
									console.log('Could not create GoalPointLog for UserGoal completion');
								}
								else {
									data.pointLogId = log.id;
								}

								next();
							});
						});
					}
				});
			}
			else {
				next();
			}
		});
	});

	// grant (update) points for reaching the goal (even partially)

	UserGoal.observe('after save', function(ctx, next) {
		if (!ctx.instance) {
			next();
			return;
		}

		var goal = ctx.instance;

		// find out about this goal's status
		UserGoal.app.models.UserGoalStatus.findOne({
			where: {id: goal.id}
		},
		function(err, goalStatus) {
			var points = PointAPI.pointsForWeeklyGoal(goalStatus.totalDays, goal.completedDays);
			// find the PointLog entry for this goal (should already exist in all cases)
			UserGoal.app.models.PointLog.find({where: {id: goal.pointLogId}}, function(err, pointLog) {
				if (pointLog.points < points) {
					pointLog.updateAttribute('points', points, function(err) {
						next();
					});
				}
				else {
					next();
				}
			});
		});
	});

	// grant Zielorientiert/Zielstrebig/Zielorientiert badges for completing UserGoals

	UserGoal.observe('after save', function(ctx, next) {
		if (!ctx.instance) {
			next();
			return;
		}

		var goal     = ctx.instance;
		var BadgeLog = UserGoal.app.models.BadgeLog;
		var where    = {id: goal.id, successful: 1};

		// count all successful user goals
		UserGoal.app.models.UserGoalStatus.find({where: where}, function(err, count) {
			var badges = [];

			if (count >=  1) badges.push(BadgeLog.TYPE.ZIELORIENTIERT);
			if (count >=  5) badges.push(BadgeLog.TYPE.ZIELSTREBIG);
			if (count >= 10) badges.push(BadgeLog.TYPE.ZIELSICHER);

			BadgeLog.grantBadges(goal.userId, badges, function(err) {
				next();
			});
		});
	});

	// grant Ratgeber badge for the first ever created tip

	UserGoal.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.tip) {
			next();
			return;
		}

		var BadgeLog = UserGoal.app.models.BadgeLog;

		BadgeLog.grantBadge(ctx.instance.userId, BadgeLog.TYPE.RATGEBER, function(err) {
			next();
		});
	});
	
	UserGoal.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.finished) {
			next();
			return;
		}

		UserGoal.app.models.NotificationLog.goalDone(ctx.instance);
		next();
	});
};
