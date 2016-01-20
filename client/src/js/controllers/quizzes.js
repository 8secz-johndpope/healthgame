angular
	.module('app')
	.controller(
		'QuizController',
		['$scope', '$state', '$controller', 'Quiz', '$modal', '$filter',
			function ($scope, $state, $controller, Quiz, $modal, $filter) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template = 'quizzes.html';
				$scope.weekStates = new Array();

				var quizId = $state.params.id || null;

				var buildLineChunk = function (weekChunk) {
					var date = new Date(weekChunk[0].dayAt);
					var start = date.startOfWeek();
					var end = date.endOfWeek();

					if (weekChunk.length < 3) {
						for (var i = weekChunk.length; i < 3; i++) {
							weekChunk.push({});
						}
					} else if (weekChunk.length > 3 && weekChunk.length < 7) {
						for (var i = weekChunk.length; i < 7; i++) {
							weekChunk.push({});
						}
					}

					var firstLine = [], secondLine = [], returnChunk = [];
					for (var i = 0; i < weekChunk.length; i++) {
						if (i < 3) {
							firstLine.push(weekChunk[i]);
						} else {
							secondLine.push(weekChunk[i]);
						}
					}

					returnChunk.lines = [];
					returnChunk.lines.push(firstLine, secondLine);
					returnChunk.title = $filter('date')(start, 'dd.MM.yyyy') + ' bis ' + $filter('date')(end, 'dd.MM.yyyy');
					return returnChunk;
				};

				var buildWeekChunk = function (result) {
					var quizzes = [];

					var chunk = [];
					var groupWeek = null;

					for (var i = 0; i < result.length; i++) {
						var curWeek = new Date(result[i].dayAt).getWeek();

						if (curWeek !== groupWeek) {
							if (groupWeek !== null) {
								quizzes.push(buildLineChunk(chunk));
								chunk = [];
							}

							groupWeek = curWeek;
						}

						chunk.push(result[i]);
					};

					if (chunk.length) {
						quizzes.push(buildLineChunk(chunk));
					}

					return quizzes;
				};

				var initWeekStates = function(quizzes) {
					for (var i = 0; i < quizzes.length; i++) {
						$scope.weekStates[i] = false;
					}
				};

				var today = new Date();
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				today.setMilliseconds(0);
				$scope.today = $filter('date')(today, "yyyy-MM-dd\THH:mm:ss.sss'Z'");

				$scope.toggleWeekState = function(week_key) {
					$scope.weekStates[week_key] = $scope.weekStates[week_key] ? false : true;
				};

				var userId = $scope.getCurrentUserId();
				$scope.withCachedUser(function(user) {
					Quiz.userHistory({userId: userId}, function (result, header) {
						if (result.$resolved && result.userHistory.length) {
							var quizzes = result.userHistory;
							quizzes = buildWeekChunk(quizzes);
							initWeekStates(quizzes);
							$scope.quizzes = quizzes;
						}
					});
				});

				var handleQuiz = function (quizId) {
					Quiz.findById({
						id: quizId,
						filter: {
							include: {
								relation: 'dailyStatuses',
								scope: {
									where: {userId: userId},
									include: 'quizPointLog'
								}
							}
						}
					}, function (result, headers) {
						if (result.$resolved) {
							var modalInstance = $scope.storeModalInstance(
								$modal.open({
									animation: true,
									templateUrl: '/views/modal/base.html',
									controller: 'ModalQuizController',
									size: 'lg',
									resolve: {
										quiz: function () {
											return result;
										}
									}
								})
							);

							modalInstance.result.then(function () {}, function () {
								$state.transitionTo('quizzes', {}, {reload: true});
							});
						}
					});
				};

				if (quizId) {
					handleQuiz(quizId);
				}

				$scope.openQuiz = function(quizId) {
					handleQuiz(quizId);
				};
			}
		]
	);