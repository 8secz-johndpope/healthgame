angular
	.module('app')
	.controller(
		'RegisterController',
		['$scope', 'AuthService', '$state', '$stateParams', '$controller',
			function ($scope, AuthService, $state, $stateParams, $controller) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template = 'register.html';

				$scope.user = {
					email: '',
					condition: 0
				}

				$scope.addUser = function () {
					AuthService
						.register($scope.user)						
						.then(function () {
							AuthService
								.login($scope.user.email)
								.then(function() {									
									$state.go('userhome');								
								})
								.catch(function(result) {
									var error = result.data.error;
								});
						})
						.catch(function(result) {
							var error = result.data.error;
						});
				}
			}
		]
	);