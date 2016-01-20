angular
	.module('app')
	.controller(
		'ModalAchievementsController',
		['$scope', '$state', '$controller', '$filter', 'userB',
			function ($scope, $state, $controller, $filter, userB) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				var disabledClass = 'x-badge-disabled';
				$scope.achievementData = {
					'redGroup0' : [
						{ name: 'holzsandale', displayName: 'Holzsandale', state : disabledClass },
						{ name: 'wandersneaker', displayName: 'Wandersneaker', state : disabledClass},
						{ name: 'spitzenlaufschuh', displayName: 'Spitzenlaufschuh', state : disabledClass}
					],
					'redGroup1' : [
						{ name: 'alltagslaeufer', displayName: 'Alltagsläufer', state : disabledClass},
						{ name: 'mittelstreckenprofi', displayName: 'Mittelstreckenprofi', state : disabledClass},
						{ name: 'langstreckenass', displayName: 'Langstreckenass', state : disabledClass}
					],
					'redGroup2' : [
						{ name: 'talent', displayName: 'Talent', state : disabledClass},
						{ name: 'ehrgeizling', displayName: 'Ehrgeizling', state : disabledClass},
						{ name: 'forrestgump', displayName: 'Forrest Gump', state : disabledClass}
					],
					'blueGroup' : [
						{ name: 'ratgeber', displayName: 'Ratgeber', state : disabledClass},
						{ name: 'gangoften', displayName: 'Gang of Ten', state : disabledClass},
						{ name: 'stammspieler', displayName: 'Stammspieler', state : disabledClass},
						{ name: 'inspirationsquelle', displayName: 'Inspirationsquelle', state : disabledClass}
					],
					'cyanGroup' : [
						{ name: 'schlauberger', displayName: 'Schlauberger', state : disabledClass},
						{ name: 'quizperte', displayName: 'Quizperte', state : disabledClass},
						{ name: 'raetselmeister', displayName: 'Rätselmeister', state : disabledClass}
					],
					'greenGroup' : [
						{ name: 'zielorientiert', displayName: 'Zielorientiert', state : disabledClass},
						{ name: 'zielstrebig', displayName: 'Zielstrebig', state : disabledClass},
						{ name: 'zielsicher', displayName: 'Zielsicher', state : disabledClass}
					],
					'orangeGroup' : [
						{ name: 'medaillienjaeger', displayName: 'Medaillienjäger', state : disabledClass},
						{ name: 'hattrick', displayName: 'Hattrick', state : disabledClass},
						{ name: 'fuenfkaempfer', displayName: 'Fünfkämpfer', state : disabledClass}
					]
				};

				angular.forEach(userB.badgeLogs, function(userBadgeName){
					angular.forEach($scope.achievementData , function(grp,grpName){
						angular.forEach(grp , function(badge){
							if (userBadgeName.type.toLowerCase() === badge.name) {
								badge.state = '';
							}
						});
					});
				});

				/**
				 * Returns a class inherited the badge classes
				 * and disabled if the dosent earnt it
				 * @param  {object}  scope childScope of ngRepeat Elemment
				 * @return {string}  class name(s)
				 */
				$scope.isAchieved = function(imgName){
					var classString = 'x-badge-' + imgName;
					var badgeLogs;

					badgeLogs = userB.badgeLogs;
					for (var ba in badgeLogs){
						if (badgeLogs[ba].type.toLowerCase() === imgName) {
							return classString;
						}
					}
					return classString + ' x-badge-disabled';
				};
			}
		]
	);
