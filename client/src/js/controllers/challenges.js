angular
	.module('app')
	.controller(
		'ChallengesController',
		['$scope', '$state', '$controller', 'Challenge', 'ChallengeInvite', 'User', '$modal', '$filter', '$rootScope',
			function ($scope, $state, $controller, Challenge, ChallengeInvite, User, $modal, $filter, $rootScope) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				$scope.template  = 'challenges.html';

				var challengeId = $state.params.id;

				var showChallenge = function (challengeId) {
					Challenge.findById({
						id: challengeId,
						filter: {include: [
								{teams: {members: {user: 'userRank'}}},
								{
									relation: 'stats',
									scope: {
										order: 'totalPoints DESC'
									}
								}
							]}
					}, function (result, headers) {
						if (result.$resolved) {
							var startsAt = new Date(result.weekAt);
							startsAt.setHours(0);

							var templateUrl, controller, size;

							var resolve = {
								challenge: function () {
									return result;
								}
							};

							if (new Date() < startsAt) {
								templateUrl = '/views/modal/challenges/' + (result.perTeam === 1 ? 'single' : 'team') + '_join.html';
								controller = 'ModalChallengeJoinController';
								size = result.perTeam === 1 ? 'sm' : 'lg';

								resolve.ownChallenge = function() {
									return $scope.ownChallenge;
								}
							} else {
								templateUrl = '/views/modal/challenges/detail.html';
								controller = 'ModalChallengeDetailController';
								size = 'lg';
							}

							var modalInstance = $scope.storeModalInstance(
								$modal.open({
									animation: true,
									templateUrl: templateUrl,
									controller: controller,
									size: size,
									resolve: resolve
								})
							);

							modalInstance.result.then(function () {
							}, function (reason) {
								if (reason === 'join') {
									$state.transitionTo('challenges');
									$scope.switchActual();
								} else {
									var state = $rootScope.previousState.name !== '' ? $rootScope.previousState.name : 'challenges';
									$state.transitionTo(state);
								}
							});
						}
					});
				}

				if (challengeId) {
					showChallenge(challengeId);
				}

				$rootScope.showChallenge = showChallenge;

				var chunkResult = function (result) {
					var challenges = [];
					while (result.length) {
						var chunk = [];
						for (var i = 0; i < 4; i++) {
							if (result.length) {
								chunk.push(result.shift());
							}
						}
						challenges.push(chunk);
					}

					return challenges;
				}

				$scope.challenges = new Array();
				$scope.firstChallenge = null;
				$scope.secondChallenge = null;
				$scope.ownChallenge = null;

				var setOwnChallenge = function (callback) {
					var date = new Date();
					Challenge.find({filter: {
							where: {
								or: [
									{weekAt: $filter('date')(date.startOfWeek(), 'yyyy-MM-dd')},
									{weekAt: $filter('date')(date.nextWeek(), 'yyyy-MM-dd')}
								]
							},
							include: {
								relation: 'teams',
								scope: {
									include: {
										relation: 'members',
										scope: {
											where: {userId: $scope.getCurrentUserId()}
										}
									}
								}
							}
						}}, function (result, header) {
							if (result.$resolved) {
								angular.forEach(result, function(challenge, key) {
									angular.forEach(challenge.teams, function (team, key) {
										if (team.members === undefined) return;

										$scope.ownChallenge = challenge;
									});

								});

								callback();
							}
						});
				}

				$scope.switchInvites = function () {
					$scope.isActual = false;
					$scope.firstChallenge =
					$scope.secondChallenge = null;
					$scope.challenges = [];

					setOwnChallenge(function () {
						ChallengeInvite.find({filter: {
								where: {userId: $scope.getCurrentUserId()},
								include: {
									relation: 'challenge',
									scope: {
										where: {weekAt: {gt: $filter('date')(new Date(), 'yyyy-MM-dd')}},
										include: {
											relation: 'teams',
											scope: {
												include: {
													relation: 'members',
													scope: {
														where: {userId: $scope.getCurrentUserId()}
													}
												}
											}
										}
									}
								}
							}}, function (result, header) {
							if (result.$resolved && result.length) {
								var challenges = [];
								angular.forEach(result, function (invitation, key) {
									if (invitation.challenge === undefined) return;

									var doAdd = false;
									angular.forEach(invitation.challenge.teams, function(team, key) {
										doAdd = doAdd || team.members === undefined;
									});

									if (doAdd) challenges.push(invitation.challenge);
								});

								$scope.challenges = chunkResult(challenges);
							}
						});
					});
				}

				$scope.switchExpired = function () {
					$scope.isActual = false;
					$scope.firstChallenge =
					$scope.secondChallenge = null;
					$scope.challenges = [];

					setOwnChallenge(function () {
						Challenge.find({filter: {
								where: {weekAt: {lt: $filter('date')(new Date().startOfWeek(), 'yyyy-MM-dd')}},
								include: {
									relation: 'teams',
									scope: {
										include: {
											relation: 'members',
											scope: {
												where: {userId: $scope.getCurrentUserId()}
											}
										}
									}
								}
							}}, function (result, headers) {
							if (result.$resolved && result.length) {
								var challenges = [];
								angular.forEach(result, function(challenge, key) {
									if (challenge.teams === undefined) return;

									var doAdd = false;
									angular.forEach(challenge.teams, function(team, key) {
										doAdd = doAdd || team.members !== undefined;
									});

									if (doAdd) challenges.push(challenge);
								});

								$scope.challenges = chunkResult(challenges);
							}
						});
					});
				}

				$scope.switchActual = function () {
					$scope.isActual  = true;

					setOwnChallenge(function () {
						var where;
						if ($scope.ownChallenge) {
							where = {
								and: [
									{weekAt: {gte: $filter('date')(new Date().startOfWeek(), 'yyyy-MM-dd')}},
									{id: {neq: $scope.ownChallenge.id}}
								]
							};
						} else {
							where = {weekAt: {gte: $filter('date')(new Date().startOfWeek(), 'yyyy-MM-dd')}};
						}

						Challenge.find({filter: {
								where: where,
								include: 'teams'
							}}, function (result, headers) {
							if (result.$resolved) {
								if ($scope.ownChallenge && $scope.isActual) {
									if (result.length > 0) {
										$scope.firstChallenge = result.shift();
									}

									if (result.length > 0) {
										$scope.secondChallenge = result.shift();
									}
								}

								$scope.challenges = chunkResult(result);
							} else {
								$scope.challenges = [];
							}
						});
					});
				}

				$scope.addChallenge = function () {
					var modalInstance = $scope.storeModalInstance(
						$modal.open({
							animation: true,
							templateUrl: '/views/modal/challenges/data_form.html',
							controller: 'ModalChallengeDataFormController',
							backdrop: false,
							resolve: {
								challenge: function () {
									return null;
								}
							},
							size: 'sm'
						})
					);

					modalInstance.result.then(function () {}, function (reason) {
							if (reason === 'save') {
								$scope.switchActual();
							}
						}
					);
				}

				switch ($state.current.name) {
					case 'challenges.expired':
						$scope.switchExpired();
						break;
					case 'challenges.invites':
						$scope.switchInvites();
						break;
					default:
						$scope.switchActual();
				}
			}
		]
	);