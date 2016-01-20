angular
	.module('app')
	.controller(
		'ModalChallengeInviteFormController',
		['$scope', '$state', '$controller', '$modalInstance', 'User', 'Challenge',
		'ChallengeTeam', 'ChallengeTeamMember', 'ChallengeInvite', 'challenge', '$timeout',
			function ($scope, $state, $controller, $modalInstance, User, Challenge, ChallengeTeam,
			ChallengeTeamMember, ChallengeInvite, challenge, $timeout) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				$scope.challenge = challenge;
				$scope.currentUser = {};
				$scope.teams = [];
				$scope.friends = [];

				User.findById({
					id: challenge.userId,
					filter: {include: [
						{
							relation: 'friendPrime',
							scope: {
								where: {confirmed: 1},
								include: {
									relation: 'friend',
									scope: {
										where: {deleted: 0},
										include: {
											relation: 'challengeParticipations',
											scope: {
												where: {weekAt: challenge.weekAt}
											}
										}
									}
								}
							}
						},
						{
							relation: 'friendSecond',
							scope: {
								where: {confirmed: 1},
								include: {
									relation: 'user',
									scope: {
										where: {deleted: 0},
										include: {
											relation: 'challengeParticipations',
											scope: {
												where: {weekAt: challenge.weekAt}
											}
										}
									}
								}
							}
						}
					]}
				}, function (result, header) {
					if (result.$resolved) {
						$scope.currentUser = result;
						$scope.teams[0].members[0] = result;

						angular.forEach(result.friendPrime, function(friend, key) {
							if (friend.friend === undefined) return;
							handleFriend(friend.friend);
						});

						angular.forEach(result.friendSecond, function(friend, key) {
							if (friend.user === undefined) return;
							handleFriend(friend.user);
						});
					}
				});

				var handleFriend = function(friend) {
					if (friend.challengeParticipations !== undefined) return;
					$scope.friends.push(friend);
				}

				$scope.isTeamInputDisabled = function (team) {
					if (!$scope.friends.length) {
						return true;
					}
					for (var i = 0; i < team.members.length; i++) {
						if (Object.getOwnPropertyNames(team.members[i]).length > 1)
							continue;

						return false;
					}
					return true;
				}

				$scope.isGlobalInputDisabled = function () {
					if (!$scope.friends.length) {
						return true;
					}
					var bool = true;
					for (var i = 0; i < $scope.teams.length; i++) {
						bool &= $scope.isTeamInputDisabled($scope.teams[i]);
					}
					;
					return bool;
				}

				$scope.selectTeamMember = function ($item, team) {
					var result = [];
					angular.forEach($scope.friends, function (user, key) {
						if (user.id !== $item.id) {
							result.push(user);
						}
					});

					$scope.friends = result;

					if (!team) {
						for (var i = 0; i < $scope.teams.length; i++) {
							if (Object.getOwnPropertyNames($scope.teams[i].members[0]).length > 1)
								continue;

							$scope.teams[i].members[0] = $item;
							break;
						}
						;
					} else {
						for (var i = 0; i < team.members.length; i++) {
							if (Object.getOwnPropertyNames(team.members[i]).length > 1)
								continue;

							team.members[i] = $item;
							break;
						}
					}
				}

				$scope.removeTeamMember = function (id, team) {
					var result = [];
					angular.forEach(team.members, function (user, key) {
						if (user.id !== id) {
							result.push(user);
						} else {
							$scope.friends.push(user);
							result.push({});
						}
					});

					team.members = result;

					var move = false;
					if (challenge.type === 'single') {
						angular.forEach($scope.teams, function (team, key) {
							if (!move) {
								move = Object.getOwnPropertyNames(team.members[0]).length <= 1;
							} else {
								$scope.teams[key - 1].members = team.members;
								team.members = []
							}
						});
					} else {
						angular.forEach(team.members, function (member, key) {
							if (!move) {
								move = Object.getOwnPropertyNames(member).length <= 1;
							} else {
								team.members[key - 1] = member;
								team.members[key] = {};
							}
						});
					}
				}

				for (var i = 0; i < challenge.numTeams; i++) {
					$scope.teams.push({
						title: i === 0 ? 'Dein Team' : 'Team ' + (i + 1),
						members: [],
						dummy: ''
					});
					for (var k = 0; k < challenge.perTeam; k++) {
						$scope.teams[i].members.push({});
					}
				}

				$scope.upsertChallenge = function () {
					var challenge = $scope.challenge;
					if (challenge.id) {

					} else {
						Challenge.create(challenge, function (result, header) {
							if (result.$resolved) {
								angular.forEach($scope.teams, function (team, team_key) {
									angular.forEach(team.members, function (member, member_key) {
										if (member.id === undefined) return;

										if (member.id === result.userId) {
											if (team.id === undefined) {
												ChallengeTeam.create({
													challengeId: result.id,
													teamNum: team_key + 1
												}, function (result, header) {
													if (result.$resolved) {
														team.id = result.id;
														ChallengeTeamMember.create({
															teamId: result.id,
															userId: member.id
														}, function (result, header) {

														});
													}
												});
											} else {
												ChallengeTeamMember.create({
													teamId: team.id,
													userId: member.id
												}, function (result, header) {

												});
											}
										} else {
											ChallengeInvite.create({
												challengeId: result.id,
												teamNum: team_key + 1,
												userId: member.id
											}, function (result, header) {

											});
										}
									})
								});

								$timeout(function() {$modalInstance.dismiss('save');}, 1000);
							}
						});
					}
				}
			}
		]
	);