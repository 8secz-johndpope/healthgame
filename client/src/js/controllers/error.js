angular
	.module('app')
	.controller(
		'ErrorController',
		['$scope', '$state', '$controller',
			function ($scope, $state, $controller) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template = 'error.html';
				
				var errorkey = $state.params.key || null;
				$scope.errormsg = '';
			}
		]
	);
