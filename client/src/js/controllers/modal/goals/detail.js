angular
	.module('app')	
	.controller('ModalGoalDetailController',
		['$scope', '$state', '$controller', 'goal', 'UserGoal', 'TipRating',
			function ($scope, $state, $controller, goal, UserGoal, TipRating) {
				angular.extend(this, $controller('ModalGoalUtilController', {$scope: $scope}));

				$scope.curGoal       = $scope.sumRatings(goal);
				$scope.goals         = [];
				$scope.tipsAvailable = false;

				var tipsWhere = {
					and: [
						{weeklyGoalId: goal.weeklyGoalId},
						{id:           {neq: goal.id}},
						{userId:       {neq: goal.userId}},
						{tip:          {neq: null}}
					]
				};

				// get goals for tips list
				$scope.getTips(tipsWhere);

				var _refreshContent = function() {
					UserGoal.findById({
						id: goal.id,
						filter: {
							include: [{goal: {category: ['parent']}}, 'status', 'pointLog', 'tipRating']
						}
					}, function(result, header) {
						$scope.curGoal = $scope.sumRatings(result);
					});
					$scope.getTips(tipsWhere);
				};

				$scope.vote = function(goalId, isUpvote) {
					$scope.voteRating(goalId, isUpvote, function() {
						_refreshContent();
					});
				};

			}
		]
	);
