angular.module('app')
	.directive('xCountdown', [
		function () {
			'use strict';

			return {
				restrict: 'A',
				templateUrl: 'views/directives/countdown.html',
				replace: true,
				scope: {
					end: '=',
					class: '@'
				},
				link: function ($scope, $elem, $attr) {
					$scope.$watch(function () {
						var now = new Date().getTime() / 1000;
						var end = new Date($scope.end);
						end = new Date(end.setMinutes(end.getMinutes() + end.getTimezoneOffset())).getTime() / 1000;

						var difference = end - now;

						if (difference <= 0) {
							$scope.countdown = {
								days: 0,
								hours: 0
							};
						} else {
							var _hour = 60 * 60;
							var _day  = _hour * 24;							
							
							var days = Math.floor(difference / _day);
							
							difference = difference % _day;
							
							var hours = Math.floor(difference / _hour);
							
							$scope.countdown = {
								days: days,
								hours: hours,
							};
						}
					});
				}
			};
		}
	]
);