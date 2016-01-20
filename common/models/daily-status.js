module.exports = function(DailyStatus) {
	'use strict';

	var PointAPI = require('./../points.js');

	DailyStatus.createForDate = function(userId, date, cb) {
		DailyStatus.findOne({where: {userId: userId, dayAt: date}}, function(dailyError, dailyStatus) {
			if(dailyError || dailyStatus) { // dailyError - pun intended
				cb(dailyError, dailyStatus);
			} else {
				DailyStatus.create({userId: userId, dayAt: date}, function(saveError, dailyStatus) {
					cb(saveError, dailyStatus);
				});
			}
		});
	};

	DailyStatus.createToday = function(userId, cb) {
		var today = DailyStatus.app.generateDateString(new Date());

		DailyStatus.createForDate(userId, today, cb);
	};

	// give points for successfully answering the quiz

	DailyStatus.observe('before save', function(ctx, next) {
		if (!ctx.data || !ctx.data.quizId || ctx.data.quizId <= 0) {
			next();
			return;
		}

		DailyStatus.app.models.Quiz.findById(ctx.data.quizId, function(err, quiz) {
			if (err || !quiz.id || !!ctx.data.quizPointLogId) {
				next();
				return;
			}

			ctx.data.quizOk1 = ctx.data.quizAnswer1 === quiz.solution1;
			ctx.data.quizOk2 = ctx.data.quizAnswer2 === quiz.solution2;
			ctx.data.quizOk3 = ctx.data.quizAnswer3 === quiz.solution3;

			var ok = 0;

			if (ctx.data.quizOk1) {
				ok++;
			}
			if (ctx.data.quizOk2) {
				ok++;
			}
			if (ctx.data.quizOk3) {
				ok++;
			}

			var points = PointAPI.pointsForQuiz(ok, 3);
			var log = {
				userId: ctx.data.userId,
				dayAt: ctx.data.dayAt,
				points: points,
				type: PointAPI.TYPE.QUIZ,
				createdAt: new Date()
			};

			DailyStatus.app.models.PointLog.create(log, function(err, log) {
				if (err) {
					console.log('Could not create QuizPointLog for DailyStatus');
				}
				else {
					ctx.data.quizPointLogId = log.id;
				}
				next();
			});
		});
	});

	// give points for reaching the step goal

	DailyStatus.observe('before save', function(ctx, next) {
		if (!ctx.data) {
			next();
			return;
		}

		var status    = ctx.data;
		var stepsDone = ctx.data.stepsDone || ctx.currentInstance.stepsDone;
		var stepsGoal = ctx.data.stepsGoal || ctx.currentInstance.stepsGoal;

		if (stepsDone < 1) {
			next();
			return;
		}

		var points = PointAPI.pointsForTotalDailySteps(stepsDone);

		if (stepsGoal > 0 && stepsDone >= stepsGoal) {
			ctx.data.goalReached = true;

			points = points + PointAPI.pointsForReachedStepGoal(stepsGoal);
		}

		if (points < 1) {
			next();
			return;
		}

		var pointLogId = ctx.data.stepPointLogId || ctx.currentInstance.stepPointLogId;

		if (!pointLogId) {
			var log = {
				userId:    ctx.currentInstance.userId,
				dayAt:     ctx.currentInstance.dayAt,
				points:    points,
				type:      PointAPI.TYPE.STEP,
				createdAt: new Date()
			};

			DailyStatus.app.models.PointLog.create(log, function(err, log) {
				if (err) {
					console.log('Could not create QuizPointLog for DailyStatus');
				}
				else {
					ctx.data.stepPointLogId = log.id;
				}

				next();
			});
		}
		else {
			DailyStatus.app.models.PointLog.findOne({where: {id: pointLogId}}, function(err, log) {
				log.updateAttribute('points', points, function(err) {
					next();
				});
			});
		}
	});

	// grant the Alltagsläufer/Mittelstreckenprofi/Langstreckenass badge
	// requirement: 10k/17.5k/25k steps at one day

	DailyStatus.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.stepsDone || ctx.instance.stepsDone < 10000) {
			next();
			return;
		}

		var BadgeLog = DailyStatus.app.models.BadgeLog;

		BadgeLog.grantBadge(ctx.instance.userId, BadgeLog.TYPE.ALLTAGSLAEUFER, function(err) {
			if (ctx.instance.stepsDone >= 17500) {
				BadgeLog.grantBadge(ctx.instance.userId, BadgeLog.TYPE.MITTELSTRECKENPROFI, function(err) {
					if (ctx.instance.stepsDone >= 25000) {
						BadgeLog.grantBadge(ctx.instance.userId, BadgeLog.TYPE.LANGSTRECKENASS, function(err) {
							next();
						});
					}
					else {
						next();
					}
				});
			}
			else {
				next();
			}
		});
	});

	// grant the Talent/Ehrgeziling/Forrest Gump badge
	// requirement: reached step goal 5/15/30 times

	DailyStatus.observe('after save', function(ctx, next) {
		// user has no or didn't reach their step goal
		if (!ctx.instance.goalReached) {
			next();
			return;
		}

		// check if this reached step goal lead to more than 15 successful days
		var where = {
			and: [
				{ userId: ctx.instance.userId },
				{ goalReached: true }
			]
		};

		var userID = ctx.instance.userId;

		DailyStatus.find({where: where, limit: 30}, function(err, states) {
			if (states && states.length >= 5) {
				var BadgeLog = DailyStatus.app.models.BadgeLog;
				BadgeLog.grantBadge(userID, BadgeLog.TYPE.TALENT, function(err) {
					if (states.length >= 15) {
						BadgeLog.grantBadge(userID, BadgeLog.TYPE.EHRGEIZLING, function(err) {
							if (states.length >= 30) {
								BadgeLog.grantBadge(userID, BadgeLog.TYPE.FORREST_GUMP, function(err) {
									next();
								});
							}
							else {
								next();
							}
						});
					}
					else {
						next();
					}
				});
			}
			else {
				next();
			}
		});
	});

	// grant the Holzsandale/Wandersneaker/Spitzenlaufschuh badge
	// requirement: 50k/150k/300k total steps

	DailyStatus.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.stepsDone) {
			next();
			return;
		}

		var userID = ctx.instance.userId;

		DailyStatus.find({where: {userId: userID, stepsDone: {gt: 0}}}, function(err, states) {
			var total = 0;

			if (!states) {
				next();
				return;
			}

			for (var i = 0; i < states.length; ++i) {
				total += states[i].stepsDone;
			}

			var badges   = [];
			var BadgeLog = DailyStatus.app.models.BadgeLog;

			if (total >=  50000) badges.push(BadgeLog.TYPE.HOLZSANDALE);
			if (total >= 150000) badges.push(BadgeLog.TYPE.WANDERSNEAKER);
			if (total >= 300000) badges.push(BadgeLog.TYPE.SPITZENLAUFSCHUH);

			BadgeLog.grantBadges(userID, badges, function() {
				next();
			});
		});
	});

	// grant the quiz-based badges
	// requirement: 25/50/100 correct quiz answers

	DailyStatus.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.quizId) {
			next();
			return;
		}

		var userID = ctx.instance.userId;

		DailyStatus.find({where: {userId: userID, quizId: {neq: null}}}, function(err, states) {
			if (!states) {
				next();
				return;
			}

			var totalCorrectAnswers = states.reduce(function(acc, state) {
				return acc + (state.quizOk1 ? 1 : 0) + (state.quizOk2 ? 1 : 0) + (state.quizOk3 ? 1 : 0);
			}, 0);

			var badges   = [];
			var BadgeLog = DailyStatus.app.models.BadgeLog;

			if (totalCorrectAnswers >=  25) badges.push(BadgeLog.TYPE.SCHLAUBERGER);
			if (totalCorrectAnswers >=  50) badges.push(BadgeLog.TYPE.QUIZPERTE);
			if (totalCorrectAnswers >= 100) badges.push(BadgeLog.TYPE.RAETSELMEISTER);

			BadgeLog.grantBadges(userID, badges, function() {
				next();
			});
		});
	});

	// send out stepgoal mail

	function gatherMailData(userId, today, callback) {
		function fetchUserData(userId, callback) {
			DailyStatus.app.models.User.findOne({where: {id: userId}}, function(err, user) {
				callback(user);
			});
		}

		function fetchDailyStatus(userId, date, callback) {
			var where = {userId: userId, dayAt: date};

			DailyStatus.findOne({where: where}, function(err, status) {
				callback(status);
			});
		}

		function fetchPoints(userId, date, callback) {
			var where = {userId: userId, dayAt: date};

			DailyStatus.app.models.PointLog.find({where: where}, function(err, points) {
				callback(points);
			});
		}

		function fetchQuiz(date, callback) {
			DailyStatus.app.models.Quiz.findOne({where: {dayAt: date}}, function(err, quiz) {
				callback(quiz);
			});
		}

		function yesterday(date) {
			return DailyStatus.app.generateDateString(new Date(+new Date(date) - 24*3600*1000));
		}

		function mergeParts(date, user, today, yesterday, points, quiz, callback) {
			var pointsForTodayStepGoal     = today.stepsGoal        ? PointAPI.pointsForReachedStepGoal(today.stepsGoal)     : 0;
			var pointsForYesterdayStepGoal = yesterday.stepsGoal    ? PointAPI.pointsForReachedStepGoal(yesterday.stepsGoal) : 0;
			var stepsPerPoint              = pointsForTodayStepGoal ? Math.floor(today.stepsGoal / pointsForTodayStepGoal)   : 0;

			// group points by type
			var groupedPoints = {};
			groupedPoints[PointAPI.TYPE.QUIZ]      = 0;
			groupedPoints[PointAPI.TYPE.GOAL]      = 0;
			groupedPoints[PointAPI.TYPE.CHALLENGE] = 0;

			for (var i = 0; i < points.length; ++i) {
				var type = points[i].type;

				if (!(type in groupedPoints)) {
					groupedPoints[type] = 0;
				}

				groupedPoints[type] += points[i].points;
			}

			quiz.possiblePoints = PointAPI.pointsForQuiz(3, 3);

			var dateformat = require('dateformat');
			var numformat  = require('number-format').numberFormat;

			dateformat.i18n = {
				dayNames: [
					'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa',
					'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
				],
				monthNames: [
					'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',
					'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
				]
			};

			today.stepsGoalFormatted     = numformat(today.stepsGoal, 0, ',', '.');
			yesterday.stepsGoalFormatted = numformat(yesterday.stepsGoal, 0, ',', '.');
			yesterday.stepsDoneFormatted = numformat(yesterday.stepsDone, 0, ',', '.');

			var mailData = {
				dateS: dateformat(date, 'ddd, d. mmmm yyyy'),
				date: date,
				user: user,
				today: {
					status:                  today,
					stepGoalPoints:          pointsForTodayStepGoal,
					stepGoalPointsFormatted: numformat(pointsForTodayStepGoal, 0, ',', '.'),
					stepsPerPoint:           stepsPerPoint,
					quiz:                    quiz
				},
				yesterday: {
					status:                  yesterday,
					stepGoalPoints:          pointsForYesterdayStepGoal,
					stepGoalPointsFormatted: numformat(pointsForYesterdayStepGoal, 0, ',', '.'),
					points:                  groupedPoints
				}
			};

			callback(mailData);
		}

		fetchUserData(userId, function(user) {
			fetchDailyStatus(userId, today, function(statusToday) {
				fetchDailyStatus(userId, yesterday(today), function(statusYesterday) {
					fetchPoints(userId, yesterday(today), function(points) {
						fetchQuiz(today, function(quiz) {
							mergeParts(today, user, statusToday, statusYesterday, points, quiz, callback);
						});
					});
				});
			});
		});
	}

	DailyStatus.observe('after save', function(ctx, next) {
		if (!ctx.instance || !ctx.instance.stepsGoal || ctx.instance.goalMailedAt) {
			next();
			return;
		}

		var Template = require('../../email/templates/templates.js');

		gatherMailData(ctx.instance.userId, ctx.instance.dayAt, function(data) {
			// check if the user has disabled the notification mails
			if (!data.user.notifyDaily) {
				next();
				return;
			}

			Template.renderLetter('daily', data, function(result) {
				var config  = DailyStatus.app.get('mails');
				var options = {
					from:    config.from,
					to:      data.user.email,
					subject: config.subjects.daily,
					text:    result.text,
					html:    result.html
				};

				ctx.instance.updateAttribute('goalMailedAt', new Date(), function() {});

				DailyStatus.app.models.Email.send(options, function(err) {
					if (err) {
						console.log(err);
					}
					else {
						console.log('Status mail successfully sent.');
					}
				});
			});

			// do not wait for the mailing stuff to finish
			next();
		});
	});

	// notify of best day

	DailyStatus.observe('after save', function (ctx, next) {
		if (!ctx.instance) {
			next();
			return;
		}

		// find the best steps
		DailyStatus.findOne({
			where: {
				userId: ctx.instance.userId
			},
			order: 'stepsDone DESC'
		},
		function (err, bestStatus) {
			// check if there is already a best day log with the current status

			if (!err && bestStatus && bestStatus.stepsDone) {
				DailyStatus.app.models.NotificationLog.bestStepDay(bestStatus);
			}
		});

		next();
	});

	DailyStatus.observe('after save', function (ctx, next) {
		if (!ctx.instance || !ctx.instance.stepsGoal) {
			next();
			return;
		}

		DailyStatus.app.models.NotificationLog.dailyStepGoal(ctx.instance);
		next();
	});

	DailyStatus.observe('after save', function (ctx, next) {
		if (!ctx.instance || !ctx.instance.stepsDone) {
			next();
			return;
		}

		var weekAt =  new Date(ctx.instance.dayAt.getTime());
		var day = weekAt.getDay() || 7;
		if (day !== 1) {
			weekAt.setUTCHours(-24 * (day - 1));
		}
		weekAt.setUTCHours(0, 0, 0, 0);

		DailyStatus.app.models.WeeklyStatus.findOne({
			where: {
				userId: ctx.instance.userId,
				weekAt: weekAt
			},
			include: {
				relation: 'steps'
			}
		}, function (error, weeklyStatus) {
			if (!error && weeklyStatus) {
				var weekSteps = weeklyStatus.toObject().steps;
				if (weekSteps.steps) {
					DailyStatus.app.models.User.bestWeekSteps(ctx.instance.userId, function(error, bestWeekSteps) {
						if (!error) {
							if (!bestWeekSteps || (weekSteps.steps >= bestWeekSteps.steps && weekSteps.week >= bestWeekSteps.week)) {
								// es gibt noch keine beste Woche oder diese Woche ist besser und nicht früher

								DailyStatus.app.models.NotificationLog.bestWeek(weeklyStatus);
							}
						}
					});
				}
			}
		});

		next();
	});
};
