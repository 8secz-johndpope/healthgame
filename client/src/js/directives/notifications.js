angular
		.module('app')
		.directive('xNotifications', ['NotificationLog',
			function (NotificationLog) {
				return {
					restrict: 'A',
					scope: {
						userId: '=userId',
						pageSize: '=pageSize',
						page: '=page',
						includeFriends: '=includeFriends'
					},
					templateUrl: 'views/directives/notifications.html',
					link: function ($scope) {
						var fetchPage = function () {
							var userId = $scope.userId;
							if (userId) {
								var pageNow = $scope.page;
								NotificationLog.notifications({
									userId: userId,
									limit: $scope.pageSize,
									skip: ($scope.page - 1) * $scope.pageSize,
									includeFriends: $scope.includeFriends
								}, function (result) {
									if (pageNow === $scope.page) {
										if (result.$resolved) {
											//								console.log(result);
											$scope.notifications = result.notifications;
										} else {
											$scope.notifications = [];
										}
									}
								});
							}
						};

						fetchPage();

						$scope.$watchGroup(['page', 'userId'], function () {
							fetchPage();
						});
					}
				};
			}]
				);