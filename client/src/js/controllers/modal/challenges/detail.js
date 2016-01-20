angular
	.module('app')
	.controller(
		'ModalChallengeDetailController',
		['$scope', '$state', '$controller', 'ChallengeStats', 'challenge',
			function ($scope, $state, $controller, ChallengeStats, challenge) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.challenge = challenge;

				var start = new Date(challenge.weekAt);
				start.setHours(0);

				var end = new Date(start);
				end.setDate(start.getDate() + 5);
				end.setHours(23);
				end.setMinutes(59);
				end.setSeconds(59);
				end.setMilliseconds(999);

				var now = new Date();
				
				$scope.isExpired = now > end;

				$scope.today = $scope.isExpired ? 5 : (now > start ? now.getDay() : 0);

				$scope.chartObject = {
					type: "BarChart",
					displayed: true,
					data: {
						cols: [
							{
								id: "competitor",
								label: "Teilnehmer",
								type: "string",
								p: {}
							},
							{
								id: "steps",
								label: "Schritte",
								type: "number",
								p: {}
							},
							{
								id: "goals",
								label: "Wochenziele",
								type: "number",
								p: {}
							},
							{
								id: "quizzes",
								label: "Quizzes",
								type: "number",
								p: {}
							}
						],
						rows: []
					},
					options: {
						isStacked: true,
						fill: 20,
						displayExactValues: true,
						colors: ['#91ba11', '#c92663', '#339baa'],
						animation: {
							startup: true,
							duration: 2000
						},
						annotations: {
							alwaysOutside: false
						},
						legend: {
							position: 'bottom',
							alignment: 'start'
						},
						hAxis: {minValue: 0},
						height: 320,
						chartArea: {
							height: '80%',
							width: '70%',
							top: 15
						}
					}
				}

				angular.forEach(challenge.stats, function (team_stats, key) {
					var title = "Team " + team_stats.teamNum;
					if (challenge.perTeam === 1) {
						angular.forEach(challenge.teams, function(team, key) {
							if (team_stats.teamNum !== team.teamNum) return;

							title = team.members[0].user.username;
						});
					}
					$scope.chartObject.data.rows.push({
						c: [
							{ v: title },
							{ v: team_stats.stepPoints },
							{ v: team_stats.goalPoints },
							{ v: team_stats.quizPoints }
						]
					});
				});
			}
		]
	);