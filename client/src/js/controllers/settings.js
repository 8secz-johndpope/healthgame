angular
	.module('app')
	.controller(
		'SettingsController',
		['$scope', '$state', '$controller', 'User',
			function ($scope, $state, $controller, User) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				$scope.template      = 'settings.html';
				$scope.subtemplate   = 'general.html';

				var userId = $scope.getCurrentUserId();

				$scope.switchGeneral = function() {
					$scope.subtemplate = 'general.html';
				}

				$scope.switchNotifications = function() {
					$scope.subtemplate = 'notifications.html';

					$scope.$watch('user.notifyDaily', function(newValue, oldValue, $scope){						
						$scope.user.notifyDaily = newValue ? 1 : 0;						
					},true);
				}

				$scope.switchPrivacy = function() {
					$scope.subtemplate = 'privacy.html';

					$scope.$watchGroup([
						function(){ return $scope.user.privacyFriend; },
						function(){ return $scope.user.privacyPublic; }
					],
					function(newValues, oldValues, $scope){
						$scope.user.privacyFriend = newValues[0] ? 1 : 0;
						$scope.user.privacyPublic = newValues[1] ? 1 : 0;
					},true);
				}

				$scope.deleteAccount = 0;
				$scope.switchAccount = function() {
					$scope.subtemplate = 'account.html';

					$scope.$watch('deleteAccount', function(newValue, oldValue) {
						$scope.deleteAccount = newValue ? 1 : 0;
					});

					$scope.doDeleteAccount = function() {
						User.deleteAccount({id: userId}, function(result, header) {

						});
					}
				}

				User.findById({id: userId}, function (result, header) {
					if (result.$resolved) {
						$scope.user = result;
						switch ($state.current.name) {
							case 'settings.general':
								$scope.switchGeneral();
								break;
							case 'settings.notifications':
								$scope.switchNotifications();
								break;

							case 'settings.privacy':
								$scope.switchPrivacy();
								break;

							case 'settings.account':
								$scope.switchAccount();
								break;
						}

						$scope.updateSettings = function() {
							angular.extend(result, $scope.user);
							result.$upsert(function(result, header) {
								$scope.success = true;
								$scope.message = 'Deine Einstellungen wurden erfolgreich gespeichert.';
							}, function(httpResponse) {
								$scope.success = false;
								$scope.message = 'Es trat ein Fehler auf. Bitte probier es später noch einmal.';
							});
						}
					}
				});
			}
		]
	);