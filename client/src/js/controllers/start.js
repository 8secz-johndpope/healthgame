angular
	.module('app')
	.controller(
		'StartController',
		['$scope', '$location', '$controller', '$timeout', '$window', 'Setup', 'Content', '$sce',
			function ($scope, $location, $controller, $timeout, $window, Setup, Content, $sce) {
				angular.extend(this, $controller('BaseController', {$scope: $scope}));
				/**
				* Predifined Vars
				*/
				var dbKey = $location.$$path.replace("/","") || "start" ;

				var processingStyles = function(){
					$timeout(function(){$scope.saveState = "btn-success"},200)
					$scope.isEditing = $scope.saveStateDisabled = false;
				}

				var checkRolesAgainstPagePermission = function(roles){
					$scope.hasEditPermission = false;

					angular.forEach(roles, function(role, key){
						if (role.id === $scope.content.editableBy) {
							$scope.hasEditPermission = true;
						}
					});

				};

				$scope.template  = 'start.html';
				$scope.bgImage   = 'background.jpg';
				$scope.saveState = "btn-default";
				$scope.isEditing = false;

				Content.findOne({filter: {where: {key: dbKey}}}, function (result) {
					$scope.content = result;
					$scope.markup = $sce.trustAsHtml($scope.content.markup);
					$scope.withCachedUser(function(user){
						if (user) {
							checkRolesAgainstPagePermission(user.roles);
						}
					});
				});

				/**
				 * Predefinied Scope functions
				 */
				$scope.editingMode = function () {
					$scope.isEditing = true;
				}

				$scope.saveChanges = function () {
					$scope.saveState = "btn-warning";
					$scope.saveStateDisabled = true;
					$scope.content.$upsert(processingStyles);
				}

				var OAuth = $window['oauth2-client-js']

				$scope.startOauth = function () {
					Setup.info(function (result, header) {
						if (result.$resolved) {
							var fitbit = new OAuth.Provider({
								id: 'fitbit',
								authorization_url: result.info.authorizationUrl
							});

							var request = new OAuth.Request({
								client_id: result.info.clientId,
								redirect_uri: result.info.callbackBase + result.info.callbackPath,
								scope: result.info.scope.join(' ')
							});

							request.response_type = 'code';

							var uri = fitbit.requestToken(request);

							fitbit.remember(request);

							$window.location.href = uri;
						}
					});
				}
			}
		]
		);
