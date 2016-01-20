angular
	.module('app')
	.factory('AuthService',
		['User', '$q', '$rootScope', '$sessionStorage',
			function (User, $q, $rootScope, $sessionStorage) {
				function login(email) {
					return User
						.login({email: email})
						.$promise
						.then(function (response) {
							$rootScope.currentUserId = response.userId;
							$rootScope.isLoggedIn = true;
							$sessionStorage.currentUserId = response.userId;
						});
				}

				function logout() {
					return User
						.logout()
						.$promise
						.then(function () {
							delete $sessionStorage.currentUserId;
							delete $rootScope.currentUserId;
						});
				}

				function register(user) {
					return User
						.create(user)
						.$promise;
				}

				return {
					login: login,
					logout: logout,
					register: register
				};
			}]);
