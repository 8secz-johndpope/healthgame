angular
	.module('app')
	.controller(
		'ModalChallengeJoinController',
		['$scope', '$state', '$controller', '$modalInstance', 'ChallengeTeam', 'ChallengeTeamMember', 'challenge', 'ownChallenge',
			function ($scope, $state, $controller, $modalInstance, ChallengeTeam, ChallengeTeamMember, challenge, ownChallenge) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.challenge = challenge;

				$scope.teams = [];
				$scope.isChallengee = !!ownChallenge;
				
				var userId = $scope.getCurrentUserId();

				// build team array
				angular.forEach(challenge.teams, function (team, key) {
					var teamData = {
						id: team.id,
						num: team.teamNum,
						title: 'Team ' + team.teamNum,
						members: []
					}
					angular.forEach(team.members, function (member, key) {
						teamData.members.push(member.user);						
						$scope.isChallengee = $scope.isChallengee || member.userId === userId;
					});
					$scope.teams.push(teamData);
				});

				// fill up teams
				for (var i = $scope.teams.length; i < challenge.numTeams; i++) {
					$scope.teams.push({
						title: 'Team ' + (i + 1),
						num: (i + 1),
						members: []
					});
				}

				// fill up members
				angular.forEach($scope.teams, function (team, key) {
					if (team.members.length === challenge.perTeam)
						return;

					for (var i = team.members.length; i < challenge.perTeam; i++) {
						team.members.push({});
					}
				});

				var addMemberToTeam = function (team, userId) {
					ChallengeTeamMember.create({
						teamId: team.id,
						userId: userId
					}, function (result, header) {
						if (result.$resolved) {
							$modalInstance.dismiss('join');
						}
					});
				}

				$scope.joinTeam = function (team) {					
					if (team.id === undefined) {
						ChallengeTeam.create({
							challengeId: $scope.challenge.id,
							teamNum: team.num,
							userId: $scope.getCurrentUserId()
						}, function (result, header) {
							if (result.$resolved) {
								team.id = result.id;
								addMemberToTeam(team, result.userId);
							}
						});
					} else {
						addMemberToTeam(team, $scope.getCurrentUserId());
					}											
				}
			}
		]
	);
