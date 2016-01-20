angular
	.module('app')
	.controller(
		'ProfileController',
		['$scope', '$rootScope', '$state', '$controller', 'User', '$modal', '$filter',
			function ($scope, $rootScope, $state, $controller, User, $modal, $filter) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				var userId;

				$scope.template = 'profile.html';
				$scope.user = null;
				$scope.resolved = false;
				$scope.level = null;
				$scope.challangesCount = 0;
				$scope.bestDaysteps = 0;
				$scope.bestweeksteps = 0;
				$scope.userGoals = [];
				$scope.isOwn = false;

				var setUserData = function(user) {
					$scope.user = user;

					if (!!$scope.user.level.length) {
						$scope.level = $scope.user.level[0];
					}

					User.bestWeekSteps({id: user.id}, function (result) {
						if (result.$resolved && result.steps) {
							$scope.bestWeekSteps = $filter('number')(result.steps.steps);
						}
					});

					User.quizStats({id: user.id}, function (result) {
						if (result.$resolved && result.stats) {
							$scope.quizStats = result.stats;
						}
					});

					// count challanges
					User.challenges.count({id: user.id}, function (result) {
						if (result.$resolved) {
							$scope.challangeCount = result['count'];
						}
					});

					// get best day
					User.dailyStatuses({id: user.id, filter: {order: 'stepsDone DESC', limit: 1}}, function (result) {
						if (result.$resolved && result.length) {
							$scope.bestDaysteps = $filter('number')(result[0].stepsDone);
						}
					});

					User.userGoals({
						id: user.id,
						filter: {
							where: {
								startsAt: {
									lte: $filter('date')(new Date(), 'yyyy-MM-dd')
								},
								endsAt: {
									gte: $filter('date')(new Date(), 'yyyy-MM-dd')
								},
								finished: 0
							},
							include: ['goal']
						}
					}, function (result) {
						if (result.$resolved && result.length) {
							$scope.userGoals = result;
						}
					});
				}

				var watcher = $rootScope.$watch('siteCounter', function () {
					userId = $state.params.id || $scope.getCurrentUserId();

					var isOwn = userId === $scope.getCurrentUserId();
					$scope.isOwn = isOwn;

					var include = ['userRank', 'level', 'badgeLogs'];
					if (!isOwn) {
						include.push({relation: 'friendPrime', scope: { where: {and: [{confirmed: true}, {friendId: $scope.getCurrentUserId()}]} }});
						include.push({relation: 'friendSecond', scope: { where: {and: [{confirmed: true}, {userId: $scope.getCurrentUserId()}]} }});
					}

					User.findById({
						id: userId,
						filter: { include: include }
					}, function (result) {
						$scope.resolved = result.$resolved;

						if (!result.$resolved || !result.id) {
							return;
						}

						if (isOwn || result.privacyPublic) {
							setUserData(result);
						} else if (result.privacyFriend) {							
							if (!!(result.friendPrime.length || result.friendSecond.length)) {
								setUserData(result);
							}
						}
					});
				});

				$scope.$on('$destroy', function () {
					watcher();
				});

				$scope.showAllNotifications = function () {
					var modalInstance = $scope.storeModalInstance(
						$modal.open({
							animation: true,
							templateUrl: '/views/modal/notifications.html',
							controller: 'ModalNotificationsController',
							size: 'md',
							resolve: {
								includeFriends: function () {
									return false;
								},
								userId: function () {
									return userId;
								}
							}
						})
					);
				};
				$scope.showAchievements = function() {
					var modalInstance = $scope.storeModalInstance(
							$modal.open({
							animation: true,
							templateUrl: '/views/modal/achievements.html',
							controller: 'ModalAchievementsController',
							size: 'md',
							resolve : {
								userB : function () {
									return $scope.user;
									//TODO: May refactoring to use Martin's "withCachedUser"
								}
							}
						})
					);				
				};
			}
		]
	);
