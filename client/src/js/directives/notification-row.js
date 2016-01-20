angular.module('app')
.directive('xTimeago', [
	'$timeout',
	function ($timeout) {
		'use strict';

		return {
			restrict: 'A',
			link: function ($scope, $elem) {
				$timeout(function () {
					$elem.timeago();
				}, 0, false);
			}
		};
	}
])
.directive('xNotificationRow', [
	'$compile',
	'$rootScope',
	function ($compile, $rootScope) {
		'use strict';

		return {
			restrict: 'A',
			templateUrl: 'views/directives/notification-row.html',
			replace: true,
			scope: {
				notification: '='
			},
			link: function ($scope, $elem) {
				var textKey = $rootScope.currentUserId === $scope.notification.userId ? 'owner' : 'anon';
				var texts = {
					quizPoint: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat {{notification.pointLog.points}} Punkte beim Quiz erreicht.',
						owner: 'Du hast {{notification.pointLog.points}} Punkte beim Quiz erreicht.'
					},
					levelLog: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat Level {{notification.levelLog.level.name}} erreicht.',
						owner: 'Du hast Level {{notification.levelLog.level.name}} erreicht.'
					},
					challengeCreated: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat die Challenge <a ui-sref="challenges.detail({id: notification.challengeId})">{{notification.challenge.name}}</a> angelegt.',
						owner: 'Du hast die Challenge <a ui-sref="challenges.detail({id: notification.challengeId})">{{notification.challenge.name}}</a> angelegt.'
					},
					friendshipFirst: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> und <span data-x-profile-link data-friendid="notification.friend.id">{{notification.friend.username}}</span> sind jetzt befreundet.',
						owner: '<span data-x-profile-link data-friendid="notification.friend.id">{{notification.friend.username}}</span> hat Deine Freundschaftsanfrage bestätigt.'
					},
					friendshipSecond: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> und<span data-x-profile-link data-friendid="notification.friend.id"> {{notification.friend.username}}</span> sind jetzt befreundet.',
						owner: 'Du hast die Freundschaftsanfrage von <span data-x-profile-link data-friendid="notification.friend.id">{{notification.friend.username}}</span> bestätigt.'
					},
					badgeLog: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat das Abzeichen {{notification.badgeLog.type}} bekommen.',
						owner: 'Du hast das Abzeichen {{notification.badgeLog.type}} bekommen.'
					},
					challengeInvite: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> wurde zur Challange <a ui-sref="challenges.detail({id: notification.challengeId})">{{notification.challenge.name}}</a> eingeladen.',
						owner: 'Du wurdest zur Challenge <a ui-sref="challenges.detail({id: notification.challengeId})">{{notification.challenge.name}}</a> eingeladen.'
					},
					challengePoints: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat {{notification.pointLog.points}} Punkte bei Challenge <a ui-sref="challenges.detail({id: notification.challengeId})">{{notification.challenge.name}}</a> erreicht.',
						owner: 'Du hast {{notification.pointLog.points}} Punkte bei Challenge <a ui-sref="challenges.detail({id: notification.challengeId})">{{notification.challenge.name}}</a> erreicht.'
					},
					bestStepDay: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat seinen/ihren besten Tag gehabt.',
						owner: 'Du hast Deinen besten Tag gehabt.'
					},
					goalDone: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat sein/ihr Wochenziel abgeschlossen.',
						owner: 'Du hast Dein Wochenziel abgeschlossen.'
					},
					dailyStepGoal: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> Ziel für heute: {{notification.dailyStatus.stepsGoal | number}} Schritte.',
						owner: 'Dein Schrittziel für heute: {{notification.dailyStatus.stepsGoal | number}} Schritte.'
					},
					tipWin: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat den besten Tipp der Woche abgegeben.',
						owner: 'Du hast den besten Tipp der Woche abgegeben.'
					},
					bestWeek: {
						anon: '<span data-x-profile-link data-friendid="notification.user.id">{{notification.user.username}}</span> hat seine/ihre beste Woche. ({{notification.weeklyStatus.steps.steps}} Schritte)',
						owner: 'Diese Woche ist Deine beste Woche. ({{notification.weeklyStatus.steps.steps}} Schritte)'
					}
				};

				$scope.avatar = $scope.notification.user.avatar100 || 'https://www.fitbit.com/images/profile/defaultProfile_100_male.gif';

				var text = $compile('<span>' + texts[$scope.notification.type][textKey] + '</span>')($scope);
				$elem.find('.x-activities-desc').append(text);
			}
		};
	}
]);
