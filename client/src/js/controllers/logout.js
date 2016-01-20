angular
	.module('app')
	.controller(
		'LogoutController',
		['$scope', 'AuthService', '$state', '$controller', 'User', '$rootScope', '$sessionStorage',
			function ($scope, AuthService, $state, $controller, User, $rootScope, $sessionStorage) {
				angular.extend(this, $controller('StartController', {$scope: $scope}));

				AuthService.logout();
				$rootScope.currentUserId = null;
				$sessionStorage.currentUserId = null;
				$rootScope.isLoggedIn = false;
			}
		]
	);