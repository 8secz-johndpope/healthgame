angular.module('app')
	.directive('xSteps', [
		'User',
		'$filter',
		'$rootScope',
		function (User, $filter, $rootScope) {
			'use strict';

			return {
				restrict: 'A',
				templateUrl: 'views/directives/steps.html',
				replace: true,
				scope: {
					userid: '=',
					class: '@',
					title: '@',
					isown: '='
				},
				link: function ($scope, $elem, $attr) {
					$scope.stepsGoal = 0;
					$scope.stepsDone = 0;
					$scope.flagText  = '';

					$scope.$watch('userid', function (n, o) {
						if (n === undefined || !n) return;
						User.dailyStatuses({id: $scope.userid, filter: {where: {dayAt: $filter('date')(new Date(), 'yyyy-MM-dd')}}}, function (result) {
							if (result.$resolved && result.length) {
								var status = result[0];
								$scope.stepsDone = status.stepsDone || 0;

								if (status.stepsGoal === null && $scope.userid === $rootScope.currentUserId) {
									User.dailyStatuses.count({id: $scope.userid}, function (subResult) {
										if (subResult.$resolved) {
											$scope.flagText =
												subResult.count > 4 ? "Schrittzahl muss synchronisiert werden" : "In " + (5 - subResult.count) + " Tagen wird das erste Schrittziel ausgegeben.";
										}
									});
									$scope.stepsGoal = $scope.stepsDone === 0 ? 1 : $scope.stepsDone;
								} else if (status.stepsGoal === null) {
									$scope.stepsGoal = $scope.stepsDone === 0 ? 1 : $scope.stepsDone;
									$scope.flagText = "";
								} else {
									$scope.stepsGoal = status.stepsGoal;
									$scope.flagText = $filter('number')($scope.stepsGoal);
								}
							}
						});
					});
				}
			};
		}
	]);