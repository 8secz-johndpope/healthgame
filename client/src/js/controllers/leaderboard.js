angular
	.module('app')
	.controller(
		'LeaderboardController',
		['$scope', '$state', '$controller', 'User', 'UserRank', 'UserQuizRank', 'UserStepRank', 'UserGoalRank',
			function ($scope, $state, $controller, User, UserRank, UserQuizRank, UserStepRank, UserGoalRank) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template = 'leaderboard.html';

				$scope.rankings = {
					current: null,
					sources: [
						{title: 'Gesamt', source: UserRank},
						{title: 'Quizzes', source: UserQuizRank},
						{title: 'Schritte', source: UserStepRank},
						{title: 'Wochenziele', source: UserGoalRank}
					]
				};

				$scope.perPage         = 10;
				$scope.numVisiblePages = 10;
				$scope.ranking         = [];

				// show rows
				$scope.$watchGroup(['rankings.current', 'currentPage'], function(values) {
					var offset = ($scope.currentPage-1) * $scope.perPage;

					$scope.rankings.current.source.find({
						filter: {
							include: {user: 'level'},
							order:   'rank ASC',
							limit:   $scope.perPage,
							offset:  offset
						}
					}, function(result) {
						if (result.$resolved) {
							$scope.ranking = result;
						}
					});
				});

				// get data to initialize pager and initial page
				$scope.rankings.current = $scope.rankings.sources[0];
				User.count({}, function(result) {
					$scope.userCount   = result.count || 0;

					// get initial page
					$scope.withCachedUser(function(user) {
						$scope.currentPage = Math.floor(user.userRank.rank/$scope.perPage) + 1;
					})
				});								
			}
		]
	);

