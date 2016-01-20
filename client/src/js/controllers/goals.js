angular
	.module('app')
	.controller(
		'GoalsController',
		['$scope', '$state', '$controller', '$filter', 'UserGoal', 'UserGoalStats', '$modal', '$rootScope',
			function ($scope, $state, $controller, $filter, UserGoal, UserGoalStats, $modal, $rootScope) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template      = 'goals.html';
				$scope.goals         = [];
				$scope.weekStates    = [];
				$scope.popGoals      = [];
				$scope.tips          = {};
				$scope.showAddButton = false;

				var _today = new Date();

				var _curGoalId = $state.params.id || null;

				var _addGoal = function() {
					var modalInstance = $scope.storeModalInstance(
						$modal.open({
							animation: true,
							templateUrl: '/views/modal/goals/create.html',
							controller: 'ModalGoalDataFormController',
							size: 'md',
							resolve: {
								goal: function() {

								}
							}
						})
					);

					modalInstance.result.then(function () {}, function () {
						$state.transitionTo('goals');
						$scope.switchCurrent();
					});
				};

				var _evaluateGoal = function(goalId) {
					UserGoal.findById({
						id: goalId,
						filter: {
							include: {goal: {category: ['parent']}}
						}},
						function(result, $headers) {
							if (result.$resolved) {
								var modalInstance = $scope.storeModalInstance(
									$modal.open({
										animation: true,
										templateUrl: '/views/modal/goals/evaluate.html',
										controller: 'ModalGoalEvaluateController',
										size: 'md',
										resolve: {
											goal: function() {
												return result;
											}
										}
									})
								);

								modalInstance.result.then(function () {}, function(reason) {
									$state.transitionTo('goals');
									$scope.switchCurrent();
								});
							}
						},
						function(httpResponse) {}
					);
				};

				var _showGoal = function(goalId) {
					UserGoal.findById({
						id: goalId,
						filter: {
							include: [{goal: {category: ['parent']}}, 'status', 'pointLog', 'tipRating']
						}},
						function(result, $headers) {
							if (result.$resolved) {
								var modalInstance = $scope.storeModalInstance(
									$modal.open({
										animation: true,
										templateUrl: '/views/modal/goals/detail.html',
										controller: 'ModalGoalDetailController',
										size: 'lg',
										resolve: {
											goal: function() {
												return result;
											}
										}
									})
								);

								modalInstance.result.then(function () {}, function () {
									var state = $rootScope.previousState.name !== '' ? $rootScope.previousState.name : 'challenges';
									$state.transitionTo(state);
								});
							}
						},
						function(httpResponse) {
						}
					);
				};

				var _showPopGoal = function(goalId) {
					UserGoalStats.findOne({
						filter: {
							where: {id: goalId},
							include: {goal: {category: ['parent']}}
						}},
						function(result, $headers) {
							if (result.$resolved) {
								var modalInstance = $scope.storeModalInstance(
									$modal.open({
										animation: true,
										templateUrl: '/views/modal/goals/detail_pop.html',
										controller: 'ModalPopGoalDetailController',
										size: 'lg',
										resolve: {
											goal: function() {
												return result;
											}
										}
									})
								);

								modalInstance.result.then(function (selectedItem) {
									$scope.selected = selectedItem;
								}, function () {
									$state.transitionTo('goals');
								});
							}
						},
						function(httpResponse) {
						}
					);
				};

				// get result in sets of 4 for row display in template
				var _chunkResult = function(result) {
					var set            = [],
					    currentCounter = 0;

					while (result.length) {
						var item  = result.shift();
						item.tips = (item.tip !== null ? 1 : 0);
						set.push(item);
						if (item.status.daysLeft >= 0) {
							currentCounter++;
						}
					}
					$scope.showAddButton = currentCounter < 3;
					return set;
				};

				var _buildLineChunk = function (weekChunk) {

					var date = new Date(weekChunk[0].endsAt);
					var start = date.startOfWeek();
					var end = date.endOfWeek();

					var returnChunk = [];
					returnChunk.goals = _chunkResult(weekChunk);
					returnChunk.title = $filter('date')(start, 'dd.') + ' bis ' + $filter('date')(end, 'dd.MM.yyyy');
					return returnChunk;
				};

				var _buildWeekChunk = function(result) {
					var set = [];

					var chunk = [];
					var groupWeek = null;

					for (var i = 0; i < result.length; i++) {
						var curWeek = new Date(result[i].endsAt).getWeek();

						if (curWeek !== groupWeek) {
							if (groupWeek !== null) {
								set.push(_buildLineChunk(chunk));
								chunk = [];
							}

							groupWeek = curWeek;
						}

						chunk.push(result[i]);
					};

					if (chunk.length) {
						set.push(_buildLineChunk(chunk));
					}

					return set;
				};

				var _setGoals = function(getExpired) {
					if (!getExpired) {
						getExpired = false;
					}

					$scope.showAddButton = !getExpired;

					UserGoal.find({
						filter: {
							where: {
								userId:   $scope.getCurrentUserId(),
								finished: getExpired
							},
							include: [{goal: ['category']}, 'status', 'pointLog'],
							order: ['endsAt DESC', 'weeklyGoalId DESC', 'id DESC']
						}
					},
					function(result, header) {
						$scope.goals = [];

						if (result.$resolved && result.length) {
							if (getExpired) {
								_initWeekStates(result);
								$scope.goals = _buildWeekChunk(result);
							}
							else {
								$scope.goals = _chunkResult(result);
							}
						}
					});
				};

				var _setPopGoals = function(getExpired) {

					UserGoalStats.find({
						filter: {
							order: ['persons DESC', 'tipsCount DESC', 'id DESC'],
							limit: 4,
							include: {goal: ['category']}
						}
					},
					function(result, header) {
						$scope.popGoals = [];
						$scope.tips     = {};

						if (result.$resolved && result.length) {
							while (result.length) {
								var item = result.shift();
								item.persons = (item.persons !== null ? item.persons : 0);
								$scope.popGoals.push(item);
								$scope.tips[item.id] = item.tipsCount;
							}
						}
					});
				};

				var _initWeekStates = function(items) {
					for (var i = 0; i < items.length; i++) {
						$scope.weekStates[i] = false;
					}
				};

				$scope.toggleWeekState = function(week_key) {
					$scope.weekStates[week_key] = $scope.weekStates[week_key] ? false : true;
				};

				$scope.switchCurrent = function() {
					$scope.subtemplate = 'current.html';
					_setGoals();
					_setPopGoals();
				};

				$scope.switchExpired = function() {
					$scope.subtemplate = 'expired.html';
					_setGoals(true);
				};

				if ($state.is('goals.expired')) {
					$scope.switchExpired();
				}
				else {
					$scope.switchCurrent();
				}

				if (_curGoalId) {
					_showGoal(_curGoalId);
				}

				$scope.showGoal     = _showGoal;
				$scope.evaluateGoal = _evaluateGoal;
				$scope.showPopGoal  = _showPopGoal;
				$scope.addGoal      = _addGoal;

			}
		]
	);