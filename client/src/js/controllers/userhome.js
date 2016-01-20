/* global angular */

angular
	.module('app')
	.controller(
		'UserhomeController',
		['$scope', '$state', '$controller', '$rootScope', '$sessionStorage', '$filter', 'User', 'NotificationLog', 'Quiz', 'Challenge', '$modal',
			function ($scope, $state, $controller, $rootScope, $sessionStorage, $filter, User, NotificationLog, Quiz, Challenge, $modal) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template = 'userhome.html';

				$scope.quiz = null;
				$scope.challenge = null;
				$scope.goals = [];

				var userId = $state.params.id || null;

				if (userId) {
					//if user is authorized reload userhome, else go to start
					User
						.findById({id: userId}, function (result, header) {
							if (result.$resolved && result.id == userId) {
								$rootScope.currentUserId = userId;
								$sessionStorage.currentUserId = userId;
								$rootScope.isLoggedIn = true;
							} else {
								$rootScope.currentUserId = null;
								$sessionStorage.currentUserId = null;
								$rootScope.isLoggedIn = false;
							}

							$state.transitionTo('userhome', {}, {reload: true});
						}, function (httpResponse) {
							$state.go('start');
						});
				} else {
					Quiz.today({}, function (result, header) {
						if (result.$resolved && result.today) {
							$scope.quiz = result.today;
						}
					});

					var date = new Date();

					Challenge.find({filter: {
							where: {
								or: [
									{weekAt: $filter('date')(date.startOfWeek(), 'yyyy-MM-dd')},
									{weekAt: $filter('date')(date.nextWeek(), 'yyyy-MM-dd')}
								]
							},
							include: {
								relation: 'teams',
								scope: {
									include: {
										relation: 'members',
										scope: {
											where: {userId: $scope.getCurrentUserId()}
										}
									}
								}
							}
						}}, function (result, header) {
						if (result.$resolved && result.length) {
							angular.forEach(result, function(challenge, key) {
								angular.forEach(challenge.teams, function (team, key) {
									if (team.members === undefined) return;

									$scope.challenge = challenge;
								});

							});
						}
					});

					User.userGoals({
						id: $scope.getCurrentUserId(),
						filter: {
							where: {and: [
								{finished: false},								
								{endsAt: {
									gte: $filter('date')(new Date(), 'yyyy-MM-dd')
								}}
							]},
							include: ['goal']
						}
					},
					function (result, header) {
						if (result.$resolved && result.length) {							
							angular.forEach(result, function(userGoal, key) {
								if (userGoal && userGoal.goal) {
									$scope.goals.push(userGoal.goal);
								}
							});
						}
					});
					
					$scope.notificationsUnread = 0;
					$scope.withCachedUser(function (user) {
						if (user) {
							NotificationLog.notificationsCount({
								userId: user.id,
								includeFriends: true,
								gtId: user.notificationLogPositionId ? user.notificationLogPositionId : 0
							}, function (result) {
								if (result.$resolved) {
									$scope.notificationsUnread = result.notificationsCount;
								}
							});
						}
					});
					
					$scope.showAllNotifications = function () {
						$scope.notificationsUnread = 0;
						var modalInstance = $scope.storeModalInstance(
							$modal.open({
								animation: true,
								templateUrl: '/views/modal/notifications.html',
								controller: 'ModalNotificationsController',
								size: 'md',
								resolve: {
									includeFriends: function () {
										return true;
									},
									userId: function () {
										return $scope.getCurrentUserId();
									}
								}
							})
						);
					};
				}
			}
		]
	);
