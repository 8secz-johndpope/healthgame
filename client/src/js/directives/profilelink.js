angular.module('app')
	.directive('xProfileLink', [
		'User',
		'$state',
		function (User, $state) {
			'use strict';

			return {
				restrict: 'A',
				templateUrl: 'views/directives/profilelink.html',
				transclude: true,
				replace: true,
				scope: {
					friendid: '='
				},
				link: function ($scope, $elem, $attr) {
					var userId = $scope.$root.currentUserId;
					$scope.showLink = false;

					if ($scope.friendid === userId) {
						$scope.showLink = true;
					} else {
						User.findById({
							id: $scope.friendid,
							filter: {include: [
									{
										relation: 'friendPrime',
										scope: {
											where: {and: [
												{confirmed: true},
												{friendId: userId}
											]}
										}
									},
									{
										relation: 'friendSecond',
										scope: {
											where: {and: [
												{confirmed: true},
												{userId: userId}
											]}
										}
									}
							]}
						}, function(result, header) {
							if (result.$resolved) {

								if (result.privacyPublic) {
									$scope.showLink = true;
								} else if (result.privacyFriend) {
									$scope.showLink = !!(result.friendPrime.length || result.friendSecond.length);
								}
							}
						});
					}

					$scope.buildProfileUrl = function(userId) {
						return $scope.userid === userId ? $state.href('profile') : $state.href('profile.detail', {id: userId});
					};
				}
			};
		}
	]
);