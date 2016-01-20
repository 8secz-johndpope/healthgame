angular
	.module('app')
	.controller(
		'ModalGoalDataFormController',
		['$scope', '$state', '$controller', '$modalInstance', '$modal', 'UserGoal', 'WeeklyGoal', 'WeeklyGoalCategory',
			function ($scope, $state, $controller, $modalInstance, $modal, UserGoal, WeeklyGoal, WeeklyGoalCategory) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				$scope.parentDescription = null;
				$scope.subDescription    = null;
				$scope.goalDescription   = null;
				$scope.subCategories     = [];
				$scope.goals             = [];
				$scope.isSubmitEnabled   = false;
				$scope.selectedDuration  = 1;

				$scope.parentCategories = WeeklyGoalCategory.find({
					filter: {
						where: {parentId: null}
					}},
					function(result, $headers) {
						if (result.$resolved) {
							return result;
						}
						return [];
					}
				);

				$scope.getNumber = function(num) {
					return new Array(num);
				};

				$scope.changeParentCat = function() {
					$scope.parentDescription = null;
					$scope.subDescription    = null;
					$scope.goalDescription   = null;
					$scope.subCategories     = [];
					$scope.goals             = [];
					$scope.isSubmitEnabled   = false;

					if ($scope.selectedParent) {
						$scope.parentDescription = $scope.selectedParent.description;

						WeeklyGoalCategory.find({
							filter: {
								where: {parentId: $scope.selectedParent.id}
							}},
							function(result, $headers) {
								if (result.$resolved) {
									$scope.subCategories = result;
								}
								return [];
							}
						);
					}
				};

				$scope.changeSubCat = function() {
					$scope.subDescription  = null;
					$scope.goalDescription = null;
					$scope.goals           = [];
					$scope.isSubmitEnabled = false;

					if ($scope.selectedSub) {
						$scope.subDescription = $scope.selectedSub.description;

						WeeklyGoal.find({
							filter: {
								where: {categoryId: $scope.selectedSub.id}
							}},
							function(result, $headers) {
								if (result.$resolved) {
									$scope.goals = result;
								}
								return [];
							}
						);
					}
				};

				$scope.changeGoal = function() {
					$scope.goalDescription = null;

					if ($scope.selectedGoal) {
						$scope.isSubmitEnabled = true;
						$scope.goalDescription = $scope.selectedGoal.description;
					}
				};

				$scope.upsertGoal = function () {
					var today   = new Date();
					var endDate = new Date();
					endDate = new Date(endDate.setDate(endDate.getDate() + 6));

					var goal = {
						userId:       $scope.getCurrentUserId(),
						startsAt:     today,
						endsAt:       endDate,
						weeklyGoalId: $scope.selectedGoal.id,
						goalDays:     parseInt($scope.selectedDuration, 10)
					};

					UserGoal.create(goal, function(result, header) {
						if(result.$resolved) {

							$modalInstance.dismiss('cancel');
						}
					});
				};

			}
		]
	);