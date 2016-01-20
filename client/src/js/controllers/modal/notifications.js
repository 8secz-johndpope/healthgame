angular
		.module('app')
		.controller(
				'ModalNotificationsController',
				['$scope', '$controller', 'userId', 'includeFriends', 'NotificationLog',
					function ($scope, $controller, userId, includeFriends, NotificationLog) {
						angular.extend(this, $controller('BaseController', {$scope: $scope}));
						$scope.total = 0;
						$scope.userId = userId;
						$scope.pageSize = 10;
						$scope.page = 1;
						$scope.includeFriends = includeFriends;

						NotificationLog.notifications({userId: userId, limit: 1, includeFriends: includeFriends}, function (result) {
							if (result.$resolved && result.notifications.length) {
								var lastId = result.notifications[0].id;
								$scope.withCachedUser(function (user) {
									if (user && user.notificationLogPositionId !== lastId && user.notificationLogPositionId < lastId) {
										user.notificationLogPositionId = lastId;
										user.$upsert();
									}
								});
							}
						});

						NotificationLog.notificationsCount({
							userId: userId,
							includeFriends: includeFriends
						}, function (result) {
							if (result.$resolved) {
								$scope.total = result.notificationsCount;
							}
						});

					}
				]
				);
