angular.module('app')
	.directive('xChallenge', [
		'$state',
		function ($state) {
			'use strict';

			return {
				restrict: 'A',
				templateUrl: 'views/directives/challenge.html',
				transclude: true,
				replace: true,
				scope: {
					challenge: '='
				},
				link: function ($scope, $elem, $attr) {
					var startsAt = new Date($scope.challenge.weekAt);
					startsAt.setHours(0);

					var endsAt = new Date($scope.challenge.weekAt);
					endsAt.setDate(startsAt.getDate() + 5);
					endsAt.setHours(23);
					endsAt.setMinutes(59);
					endsAt.setSeconds(59);
					endsAt.setMilliseconds(999);

					var now = new Date();

					if (now < startsAt) {
						$scope.challenge.status = 'upcoming';
					} else if (now > endsAt) {
						$scope.challenge.status = 'past';
					} else {
						$scope.challenge.status = 'active';
					}
				}
			};
		}
	]
);