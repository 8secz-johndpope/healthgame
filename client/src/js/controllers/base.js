angular
	.module('app')
	.controller(
		'BaseController',
		['$scope', '$state', '$rootScope', 'User', '$modal', 'Friendship',
			function ($scope, $state, $rootScope, User, $modal, Friendship) {
				$scope.withCachedUser = function (cb) {
					var userId = parseInt($rootScope.currentUserId, 10);
					if ($rootScope.cachedUser && $rootScope.cachedUser.id === userId) {
						// console.log('USER FROM CACHE');
						cb($rootScope.cachedUser);
					} else {
						if (userId) {
							var include = [
								{userLevel: {level: ['next']}},
								'userPoints', 'roles', 'badgeLogs', 'userRank'
							];
							User.findById({id: userId, filter: {include: include}
							}, function (user) {
								if (user.$resolved && user.id === userId) {
									// console.log('USER TO CACHE');
									$rootScope.cachedUser = user;
									cb(user);
								} else {
									cb(null);
								}
							});
						} else {
							cb(null);
						}
					}
				};

				$rootScope.$watch('isLoggedIn', function (loggedIn) {
					if (loggedIn) {
						$scope.withCachedUser(function (user) {
							if (user) {
								$scope.roles = user.roles;

								if (!user.userLevel) {
									return;
								}

								var percent = 0;
								if (user.userLevel.level.pointsEnd) { // if not last level
									var currentPoints = user.userPoints ? user.userPoints.points : 0;
									var pointsRelative = currentPoints - user.userLevel.level.pointsStart;
									var totalRelative = user.userLevel.level.pointsEnd - user.userLevel.level.pointsStart;
									percent = Math.floor((100 * pointsRelative) / totalRelative); //relative percentage progress of user for current stage
									if (percent < 0) {
										percent = 0;
									}
									if (percent > 100) {
										percent = 100;
									}
								}

								$scope.totalProgress = {
									currentPoints: currentPoints,
									currentPointsPercent: percent,
									goalPoints: user.userLevel.level.pointsEnd ? user.userLevel.level.pointsEnd + 1 : 0,
									remainingPoints: user.userLevel.level.pointsEnd ? user.userLevel.level.pointsEnd - currentPoints + 1 : 0,
									startCity: user.userLevel.level.name,
									goalCity: user.userLevel.level.next ? user.userLevel.level.next.name : '',
									avatar: user.avatar100
								};

								$scope.bgImage = 'level' + user.userLevel.levelId + '.jpg';
								$scope.bgTop = false;

								$scope.userhomeLink = {
									username: user.username,
									avatar: user.avatar100
								}
							}
						});
					} else {
						$scope.bgImage = 'background.jpg';
						$scope.bgTop = true;
					}
				});

				$scope.getCurrentUserId = function () {
					return parseInt($rootScope.currentUserId);
				};

				var showJourneyMap = function () {
					var modalInstance = $modal.open({
						animation: true,
						templateUrl: '/views/modal/journeymap.html',
						controller: 'ModalJourneymapController',
						size: 'lg'
					});
				}

				$scope.showJourneyMap = showJourneyMap;
				$rootScope.showJourneyMap = showJourneyMap;
				
				$rootScope.modalInstances = null;
				$scope.storeModalInstance = function(modalInstance) {					
					$rootScope.modalInstance = modalInstance;
					return modalInstance;
				}
			}
		]
	);
