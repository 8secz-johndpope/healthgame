angular.module('app')
.directive('xProgressBar', [
	function () {
		'use strict';

		return {
			restrict: 'A',
			templateUrl: 'views/directives/progressbar.html',
			replace: true,
			scope: {
				min: '=',
				max: '=',
				current: '='
			},
			link: function ($scope, $elem, $attr) {
				$scope.$watch(function() {
					$scope.progress = Math.min(100, Math.floor((100 * ($scope.current - $scope.min)) / ($scope.max - $scope.min)));
				});
			}
		};
	}
]);