angular
	.module('app')
	.controller(
		'StepsController',
		['$scope', '$state', '$controller', '$filter', 'User',
			function ($scope, $state, $controller, $filter, User) {

				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				$scope.template       = 'steps.html';
				$scope.isNextDisabled = true;
				
				var _curDate = new Date(),
					 _start   = _curDate.startOfWeek(),
					 _end     = _curDate.endOfWeek(),
				    _chart   = {
						'type': 'ColumnChart',
						'displayed': true,
						'data': {
							'cols': [
							  {
								 'id': 'day',
								 'label': 'Wochentag',
								 'type': 'string',
								 'p': {}
							  },
							  {
								 'id': 'steps',
								 'label': 'Schritte',
								 'type': 'number',
								 'p': {}
							  },
							  {
								  role: 'style',
								  type: 'string'
							  },
							  {
								 'id': 'stepsGoal',
								 'label': 'Schrittziel',
								 'type': 'number',
								 'p': {}
							  }
							]
						},
						'options': {
							legend: {position: 'none'},
							chartArea: {
								left: '10%',
								top: '10%',
								width: '90%',
								height: '85%',
								backgroundColor: '#eee'
							},
							backgroundColor: '#eee',
							colors: ['#6BA84B', '#ccc'],
							vAxis: {
								format: 'short'
							}
						}
					};

				var _setWeekChunk = function(startDate, endDate) {
					$scope.weekChunk = startDate.getDate() + '.' + ' bis '
					                 + endDate.getDate() + '.' + (endDate.getMonth() + 1)
					                 + '.' + endDate.getFullYear();
				};

				var _updateChart = function(startDate, endDate) {

					_setWeekChunk(startDate, endDate);

					// if next monday is in the future, disable next week button
					var nextMonday = new Date(startDate);
					nextMonday.setDate(startDate.getDate() + 7);
					$scope.isNextDisabled = (nextMonday.getTime() > _curDate.getTime());

					User.dailyStatuses({
						id: $scope.getCurrentUserId(),
						// filter days of current week
						filter: {where: {and: [
							{dayAt: {gte: $filter('date')(_start, 'yyyy-MM-dd')}},
							{dayAt: {lte: $filter('date')(_end,   'yyyy-MM-dd')}}
						]}}
					}, function(result) {
						var steps = [];

						var dayNames  = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
							 curDay    = new Date(_start),
						    stepsWeek = 0,
						    stepsBest = 0,
						    bestDay   = null;

						for (var i = 0; i < dayNames.length; i++) {
							var dayName   = null,
								 stepsDone = 0,
								 stepsGoal = 0;

							if (dayNames[i]) {
								dayName = dayNames[i];
							}
							if (result.$resolved && result.length) {
								// iterate over available days and get data from
								for (var k=0; k<result.length; k++) {
									var resDate = new Date(result[k].dayAt);
									if (resDate.toISODateString() === curDay.toISODateString()) {
										var status    = result[k],
											 stepsDone = status.stepsDone || 0,
											 stepsGoal = status.stepsGoal || 0;
									}
								}
							}
							var barColor = '#bbe020';
							// set bar color depending of value
							if (stepsDone > 0) {
								if (stepsGoal > 0 && stepsDone/stepsGoal <= 1) {
									barColor = '#e23333';
									if (stepsDone/stepsGoal >= 0.25) {
										if (stepsDone/stepsGoal <= 0.75) {
											barColor = '#efc600';
										}
										else {
											barColor = '#91ba11';
										}
									}
								}
							}
							else {
								barColor = '#eee';
							}
							stepsWeek += stepsDone;

							if (stepsDone > stepsBest) {
								stepsBest = stepsDone;
								bestDay   = dayName;
							}
							// put data for week day in steps array
							steps.push({c: [{v: dayName}, {v: stepsDone}, {v: barColor}, {v: stepsGoal}]});
							// get next day
							curDay.setDate(curDay.getDate()+1);
						}

						_chart.data.rows   = steps;
						$scope.chartObject = _chart;
						$scope.stepsWeek   = stepsWeek;
						$scope.stepsBest   = stepsBest;
						$scope.bestDay     = bestDay;
					});

				};

				_updateChart(_start, _end);

				$scope.showPrevWeek = function() {
					_start.setDate(_start.getDate() - 7);
					_end.setDate(_end.getDate()     - 7);

					_updateChart(_start, _end);
				};

				$scope.showNextWeek = function() {
					_start.setDate(_start.getDate() + 7);
					_end.setDate(_end.getDate()     + 7);

					_updateChart(_start, _end);
				};

			}
		]
	);
