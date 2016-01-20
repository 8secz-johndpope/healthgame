angular
	.module('app')	
	.controller('ModalPopGoalDetailController',
		['$scope', '$state', '$controller', 'goal', 'UserGoal', 'UserGoalStats',
			function ($scope, $state, $controller, goal, UserGoal, UserGoalStats) {
				angular.extend(this, $controller('ModalGoalUtilController', {$scope: $scope}));

				$scope.curGoal       = goal;
				$scope.tipGoals      = [];
				$scope.users         = [];
				$scope.tipsAvailable = false;

				// get goals for user list

				UserGoal.find({
					filter: {
						include: ['user'],
						where: {
							and: [
								{userId:       {neq: $scope.getCurrentUserId()}},
								{weeklyGoalId: goal.id}
							]
						}
					}
				},
				function(result, header) {
					$scope.users = {};

					if (result.$resolved && result.length) {
						var users = {};
						for (var i = 0; i < result.length; i++) {
							if (result[i].user && result[i].user.id && !users[result[i].user.id]) {
								users[result[i].user.id] = result[i].user;
							}
						}
						$scope.users = $.map(users, function(value, index) {
							return [value];
						});
					}
				});

				var tipsWhere = {
					and: [
						{userId:       {neq: $scope.getCurrentUserId()}},
						{weeklyGoalId: goal.id},
						{tip:          {neq: null}}
					]
				};

				// get goals for tips list
				$scope.getTips(tipsWhere);

				$scope.vote = function(goalId, isUpvote) {
					$scope.voteRating(goalId, isUpvote, function() {
						$scope.getTips(tipsWhere);
					});
				};

			}
		]
	);
