/* global module */

module.exports = function(Quiz) {
	Quiz.getAnswer = function(id, req, cb) {
		Quiz.findById(id, function(err, quiz) {
			if(err) {
				cb(err);
			} else {
				var quizDate = new Date(quiz.dayAt);
				quizDate.setHours(23);
				quizDate.setMinutes(59);
				quizDate.setSeconds(59);
				quizDate.setMilliseconds(999);
				
				if (new Date() > quizDate) {
					var answers = {
						solution1: quiz.solution1,
						solution2: quiz.solution2,
						solution3: quiz.solution3
					};
					cb(null, answers);
				} else {				
					var where = {dayAt: quiz.dayAt, userId: req.session.userId};
					Quiz.app.models.DailyStatus.findOne({where: where}, function(dailyError, dailyStatus) {
						if(dailyError || !dailyStatus || !dailyStatus.quizAnswer1) {
							cb('You did not answer that');
						} else {
							var answers = {
								solution1: quiz.solution1,
								solution2: quiz.solution2,
								solution3: quiz.solution3
							};
							cb(null, answers);
						}

					});
				}
			}
		});
	};

	Quiz.remoteMethod(
			'getAnswer',
			{
				http: {path: '/:id/getAnswer', verb: 'get'},
				accepts: [
					{arg: 'id', type: 'number', required: true},
					{arg: 'req', type: 'object', 'http': {source: 'req'}}
				],
				returns: {arg: 'quiz', type: 'object'}
			}
	);
	
	Quiz.userHistory = function (userId, cb) {
		Quiz.app.models.User.findById(userId, function (err, user) {
			if (err || !user) {
				cb(err);
			}
			
			var createDay = new Date(user.created);
			createDay.setUTCHours(0,0,0,0);

			Quiz.find({
				where: {
					and: [
						{dayAt: {lte: new Date()}},
						{dayAt: {gte: createDay}}
					]
				},
				order: 'dayAt DESC',
				include: {
					relation: 'dailyStatuses',
					scope: {
						where: {userId: userId},
						include: 'quizPointLog'
					}
				}
			}, function (err, quizzes) {
				if (err || !user) {
					cb(err);
				}
				for (var i = 0; i < quizzes.length; i++) {
					if (!quizzes[i].toObject().dailyStatuses.length) {
						continue;
					}
					var dailyStatus = quizzes[i].toObject().dailyStatuses[0];

					quizzes[i].total = dailyStatus.quizOk1 + dailyStatus.quizOk2 + dailyStatus.quizOk3;
				}

				cb(null, quizzes);
			});
		});
	};
	
	Quiz.remoteMethod(
			'userHistory',
			{
				http: {path: '/userHistory', verb: 'get'},
				accepts: [
					{arg: 'userId', type: 'number', required: true}
				],
				returns: {arg: 'userHistory', type: 'array'}
			}
	);
	
	Quiz.beforeRemote('userHistory', function(ctx, unused, next) { 
		if (!ctx.req.accessToken || ctx.req.accessToken.userId !== ctx.args.userId) {
			var error = new Error('Access denied.');
			error.statusCode  = 401;
			return next(error);
		}
		next();
	});
	
	Quiz.today = function (cb) {
		var today = new Date();
		today.setUTCHours(0,0,0,0);
		Quiz.findOne({where: {dayAt: today}}, cb);
	};
	
	Quiz.remoteMethod(
			'today',
			{
				http: {path: '/today', verb: 'get'},
				returns: {arg: 'today', type: 'object'}
			}
	);
	
	Quiz.disableRemoteMethod('create', true);
	Quiz.disableRemoteMethod('upsert', true);
	Quiz.disableRemoteMethod('find', true);
	Quiz.disableRemoteMethod('findOne', true);
//	Quiz.disableRemoteMethod('findById', true);
	Quiz.disableRemoteMethod('deleteById', true);
	Quiz.disableRemoteMethod('exists', true);
	Quiz.disableRemoteMethod('count', true);
	Quiz.disableRemoteMethod('createChangeStream', true);
	Quiz.disableRemoteMethod('updateAll', true);
	Quiz.disableRemoteMethod('updateAttributes');
	Quiz.disableRemoteMethod('__findById__dailyStatuses');
	Quiz.disableRemoteMethod('__destroyById__dailyStatuses');
	Quiz.disableRemoteMethod('__updateById__dailyStatuses');
	Quiz.disableRemoteMethod('__get__dailyStatuses');
	Quiz.disableRemoteMethod('__create__dailyStatuses');
	Quiz.disableRemoteMethod('__delete__dailyStatuses');
	Quiz.disableRemoteMethod('__count__dailyStatuses');
};
