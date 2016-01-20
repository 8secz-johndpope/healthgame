angular
	.module('app')
	.controller(
		'ModalChallengeDataFormController',
		['$scope', '$state', '$controller', '$modalInstance', '$modal', '$filter', 'challenge',
			function ($scope, $state, $controller, $modalInstance, $modal, $filter, challenge) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				$scope.challenge = challenge || {name: null, type: 'single', numTeams: 2, perTeam: 1, userId: $scope.getCurrentUserId(), weekAt: $filter('date')(new Date().nextWeek(), 'yyyy-MM-dd')};

				$scope.setChallengeType = function (type) {
					if (type === 'single') {
						$scope.challenge.numTeams = $scope.challenge.perTeam;
						$scope.challenge.perTeam = 1;
					} else {
						$scope.challenge.perTeam = $scope.challenge.numTeams;
						$scope.challenge.numTeams = 2;
					}

					$scope.challenge.type = type;
				}

				$scope.goToSecondStep = function () {
					var modalInstance = $modal.open({
						animation: true,
						templateUrl: '/views/modal/challenges/' + ($scope.challenge.perTeam === 1 ? 'single' : 'team') + '_invite_form.html',
						controller: 'ModalChallengeInviteFormController',
						size: $scope.challenge.perTeam === 1 ? 'sm' : 'lg',
						backdrop: false,
						resolve: {
							challenge: function () {
								return $scope.challenge;
							}
						}
					});

					modalInstance.result.then(
						function () {},
						function (reason) {
							if (reason === 'save' || reason === 'cancel') {
								$modalInstance.dismiss(reason);
							}
						}
					);
				}
			}
		]
		);