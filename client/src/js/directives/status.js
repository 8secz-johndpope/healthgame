angular.module('app')
.directive('xStatus', [
	'User',
	'$filter',
	'$rootScope',
	'$modal',
	function (User, $filter, $rootScope, $modal) {
		'use strict';

		return {
			restrict: 'A',
			templateUrl: 'views/directives/status.html',
			replace: true,
			scope: {
				userid: '=',
				class: '@',
				title: '@'
			},
			link: function ($scope, $elem, $attr) {
				if ($scope.userid) {
					User.findById({
						id: $scope.userid, 
						filter: {
							include: [
								'level', 'userRank',
								{ 
									relation: 'badgeLogs',
									scope: {
										order: 'reachedAt DESC'
									}
								}
							]
						}
					}, function(result) {
						if (result.$resolved && result.id) {
							$scope.user = result;
						}
					});
				}

				User.count({}, function(result) {
					$scope.userCount = result.count || 0;
				});

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
		};
	}
]);
