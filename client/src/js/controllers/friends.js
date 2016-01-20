/* remoteCalls:
 * - User.friendShips
 * - Friendship.search
 * - Friendship.findRequests
 * - Friendship.recommend
 * - Friendship.doConfirm
 * - Friendship.doDeny
*/

/* global angular */

angular
	.module('app')
	.controller(
		'FriendsController',
		['$scope', '$controller', 'User', 'Friendship',
			function ($scope, $controller, User, Friendship) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template = 'friends.html';

				$scope.usersearch = '';
				$scope.userresult = [];
				$scope.userNotFound = false;
				$scope.friends = [];
				$scope.requests = [];
				$scope.mutuals = [];
				var currentUserId = $scope.getCurrentUserId();
				if (currentUserId) {
					var search = function (newVal) {
						if (newVal.length < 2) {
							$scope.userresult = [];
							$scope.userNotFound = false;
							return;
						}

						$scope.waitSearch = Friendship.search({id: currentUserId, query: newVal},
						function (result, header) {
							if (result.$resolved && $scope.usersearch === newVal) {
								$scope.userresult = result.search;
								$scope.userNotFound = result.search.length === 0;
							}
						});
					};

					var update = function () {
						Friendship.findRequests({id: currentUserId}, function (result, header) {
							if (result.$resolved) {
								$scope.requests = result.findRequests;
							}
						});

						User.friendShips({id: currentUserId}, function (result, header) {
							if (result.$resolved) {
								$scope.friends = result.friendShips;
							}
						});

						Friendship.recommend({id: currentUserId}, function (result, header) {
							if (result.$resolved) {
								$scope.mutuals = result.recommend;
							}
						});
					};

					$scope.$watch('usersearch', function (newVal) {
						search(newVal);
					});

					$scope.sendRequest = function (userId) {
						Friendship.doConfirm({userId: currentUserId, friendId: userId}, function (result, header) {
							search($scope.usersearch);
							update();
						});
					};

					$scope.sendDeny = function (userId) {
						Friendship.doDeny({userId: currentUserId, friendId: userId}, function (result, header) {
							update();
						});
					};

					update();
				}
			}
		]	
	);