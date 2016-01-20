angular
	.module('app')	
	.controller('ModalGoalEvaluateController',
		['$scope', '$state', '$controller', '$modalInstance', 'goal',
			function ($scope, $state, $controller, $modalInstance, goal) {
				$scope.curGoal           = goal;
				$scope.selectedCompleted = 1;
				$scope.showTipTextarea   = $scope.selectedCompleted > goal.goalDays / 2;
				$scope.enteredTip        = '';
				
				$scope.checkCompleted = function() {					
					$scope.showTipTextarea = $scope.selectedCompleted > goal.goalDays / 2;					
				};

				$scope.getNumber = function(num) {
					return new Array(num);
				};

				$scope.evaluateGoal = function () {
					goal.completedDays = parseInt($scope.selectedCompleted, 10);
					goal.tip           = $scope.enteredTip;
					goal.finished      = true;

					delete goal.goal;

					goal.$upsert(function(result, header) {
						if (result.$resolved) {
							$modalInstance.dismiss('cancel');
						}
					});
				};

			}
		]
	);
