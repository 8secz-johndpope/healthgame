angular
	.module('app')
	.controller(
		'ModalJourneymapController',
		['$scope', '$state', '$controller', '$modalInstance', '$filter', 'Level', 'uiGmapGoogleMapApi', 'User',
			function ($scope, $state, $controller, $modalInstance, $filter, Level, uiGmapGoogleMapApi, User) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));

				var userId = $scope.getCurrentUserId();

				$scope.onMarkerClick = function(marker) {
					marker.model.show = !marker.model.show;
				}

				uiGmapGoogleMapApi.then(function (maps) {
					Level.find({}, function (result, header) {
						if (result.$resolved && result.length) {
							var levels = result;
							User.findById({
								id: userId,
								filter: {include: {relation: 'level', scope: {order: 'id DESC'}}}
							}, function(result, header) {
								if (result.$resolved) {
									var user = result;
									$scope.map = {
										center: {
											latitude: user.level[0].lat,
											longitude: user.level[0].lng
										},
										zoom: 6,
										markers: [],
										polyline: {
											path: [],
											stroke: {
												color: '#46a8b5',
												weight: 3,
												opacity: 0.7
											}
										}
									};

									var ownMarker = {};
									angular.forEach(levels, function (level, key) {
										var marker = {
											id: level.id,
											latitude: level.lat,
											longitude: level.lng,
											icon: 'dist/images/marker_todo.png',
											options: {
												zIndex: 0,
												anchor: new maps.Point(-12, -12)
											},
											// Window options
											show: false,
											content: {
												title: level.name
											}
										};

										if (level.id === user.level[0].id) {
											marker.icon = 'dist/images/marker_current.png';
											marker.options.zIndex = 1;											
										} else if (level.id < user.level[0].id){
											marker.icon = 'dist/images/marker_reached.png';																						
										}

										$scope.map.markers.push(marker);
										$scope.map.polyline.path.push({
											id: level.id,
											latitude: level.lat,
											longitude: level.lng
										});
									});									
								}
							})
						}
					});
				});
			}
		]
	);