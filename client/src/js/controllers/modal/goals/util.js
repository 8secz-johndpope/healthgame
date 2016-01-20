angular
	.module('app')
	.controller('ModalGoalUtilController',
		['$scope', '$state', '$controller', 'UserGoal', 'TipRating',
			function ($scope, $state, $controller, UserGoal, TipRating) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				$scope.getNumber = function(num) {
					return new Array(num);
				};

				$scope.sumRatings = function(goal) {
					if (goal.tipRating) {
						goal.tipRating.upvotes   = 0;
						goal.tipRating.downvotes = 0;
						goal.hasVote = false;

						for (var i = 0; i < goal.tipRating.length; i++) {
							if (goal.tipRating[i].vote) {
								goal.tipRating.upvotes++;
							}
							else {
								goal.tipRating.downvotes++;
							}
							// store whether this tip was rated by current user
							if (goal.tipRating[i].userId === $scope.getCurrentUserId()) {
								goal.hasVote = (goal.tipRating[i].vote ? 'up' : 'down');
							}
						}
					}
					return goal;
				};

				$scope.addTipRating = function(goalId, isUpvote, userId, callback) {
					var vote = {
						tipId:   goalId,
						vote:    isUpvote,
						userId:  userId,
						created: new Date()
					};
					TipRating.create(vote, function(result, header) {
						if (result.$resolved) {
							if ($.isFunction(callback)) {
								callback();
							}
						}
					});
				};

				$scope.voteRating = function(goalId, isUpvote, callback) {

					var curUserId = $scope.getCurrentUserId();

					TipRating.find({filter: {where: {tipId: goalId, userId: curUserId}}}, function(result, header) {
						if (result.$resolved) {
							// vote exists
							if (result.length) {
								var voteType = result[0].vote;
								// delete vote
								TipRating.deleteById({id: result[0].id}, function() {
									// vote type is different than last vote
									if (voteType !== isUpvote) {
										$scope.addTipRating(goalId, isUpvote, curUserId, callback);
									}
									else {
										if ($.isFunction(callback)) {
											callback();
										}
									}
								});
							}
							// else create new vote
							else {
								$scope.addTipRating(goalId, isUpvote, curUserId, callback);
							}
						}
					});
				};

				$scope.toggleTips = function(isOpen) {
					$('#goalModal .x-tips').toggleClass('x-open', isOpen);
				};

				// get goals for tips list
				$scope.getTips = function(where) {
					UserGoal.find({
						filter: {
							include: ['tipRating'],
							where: where
						}
					},
					function(result, header) {
						$scope.tipGoals = [];

						if (result.$resolved && result.length) {
							var set = [];
							while (result.length) {
								var item = result.shift();
								if (item.tip) {
									$scope.tipsAvailable = true;
								}
								item = $scope.sumRatings(item);
								set.push(item);
							}
							$scope.tipGoals = set;
						}
					});
				};
			}
		]
	);
