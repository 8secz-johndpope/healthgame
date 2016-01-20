angular
	.module('app')
	.controller(
		'ModalQuizController',
		['$scope', '$controller', '$modalInstance', '$filter', 'User', 'Quiz', 'PointLog', 'quiz',
			function ($scope, $controller, $modalInstance, $filter, User, Quiz, PointLog, quiz) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				var userId = $scope.getCurrentUserId();

				$scope.quiz       = quiz;
				$scope.quizPoints = 15;
				$scope.points     = 0;
				$scope.total      = 0;

				$scope.solution = {
					first: null, second: null, third: null
				};

				$scope.answer = {
					first: null, second: null, third: null
				};

				var now = new Date();
				now.setHours(0);
				now.setMinutes(0);
				now.setSeconds(0);
				now.setMilliseconds(0);

				var quizdate = new Date(quiz.dayAt);
				quizdate.setHours(0);
				quizdate.setMinutes(0);
				quizdate.setSeconds(0);
				quizdate.setMilliseconds(0);

				var showQuizDetail = function(quiz) {
					$scope.template = 'quiz_detail.html';

					Quiz.getAnswer({id: quiz.id}, function(result, header) {
						if (result.$resolved) {
							$scope.solution = {
								first: result.quiz.solution1,
								second: result.quiz.solution2,
								third: result.quiz.solution3
							};
						}
					});
					
					if (quiz.dailyStatuses.length) {
						var dailyStatus = quiz.dailyStatuses[0];
						$scope.total  = dailyStatus.quizOk1 + dailyStatus.quizOk2 + dailyStatus.quizOk3;
						$scope.points = dailyStatus.quizPointLog.points;

						$scope.answer = {
							first: dailyStatus.quizAnswer1,
							second: dailyStatus.quizAnswer2,
							third: dailyStatus.quizAnswer3
						};
					}
				};

				if (now.getTime() === quizdate.getTime() && !quiz.dailyStatuses.length) {
					$scope.template = 'quiz_form.html';

				} else {
					showQuizDetail(quiz);
				}

				var saveAnswers = function(quiz) {
					var dailyStatus = quiz.dailyStatuses[0];

					dailyStatus.quizId = quiz.id;
					dailyStatus.quizAnswer1 = $scope.answer.first;
					dailyStatus.quizAnswer2 = $scope.answer.second;
					dailyStatus.quizAnswer3 = $scope.answer.third;

					dailyStatus.$upsert(function (dailyStatus, $header) {
						if (dailyStatus.$resolved) {							
							PointLog.findById({id: dailyStatus.quizPointLogId}, function(pointLog, header) {
								if (pointLog.$resolved) {
									dailyStatus.quizPointLog = pointLog;
									quiz.dailyStatuses[0] = dailyStatus;

									showQuizDetail(quiz);
								}
							});
						}
					});
				};

				$scope.submit = function () {
					if (!quiz.dailyStatuses.length) {
						User.dailyStatuses({id: userId, filter: {where: {dayAt: $filter('date')(new Date(), 'yyyy-MM-dd')}}}, function (result, $header) {
							if (result.$resolved && !result.length) {
								throw new Error('Could not find DailyStatus');
							}

							if (result.$resolved && result.length) {
								quiz.dailyStatuses[0] = result[0];
								saveAnswers(quiz);
							}
						});
					} else {
						saveAnswers(quiz);
					}
				};

				var checkBtnDisabled = function () {
					$scope.btnDisabled = !$scope.answer.first || !$scope.answer.second || !$scope.answer.third;
				};

				$scope.btnDisabled = true;
				$scope.checkBtnDisabled = checkBtnDisabled;

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			}
		]
	);