angular
	.module('app', [
		'lbServices',
		'ui.router',
		'ui.bootstrap',
		'ui.select',
		'ngStorage',
		'ngSanitize',
		'googlechart',
		'ngCkeditor',
		'uiGmapgoogle-maps',
		'cgBusy'
	])
	.value('cgBusyDefaults',{ // https://github.com/cgross/angular-busy
		message:'bitte warten',
		backdrop: false,
		templateUrl: 'views/angular-busy.html'
//		delay: 100,
//		minDuration: 300,
//		wrapperClass: 'cg-busy cg-busy-animation'
	})
	.config(['$locationProvider', function ($locationProvider) {
			$locationProvider.html5Mode(true);
		}])
	.config(
		['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider',
			function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
				$stateProvider.state('start', {
					url: '/',
					templateUrl: 'views/base.html',
					controller: 'StartController'
				}).state('register', {
					url: '/register',
					templateUrl: 'views/base.html',
					controller: 'RegisterController'
				}).state('userhome', {
					url: '/userhome',
					templateUrl: 'views/base.html',
					controller: 'UserhomeController',
					authenticate: true
				}).state('userhome.login', {
					url: '/{id:int}'
				}).state('profile', {
					url: '/profile',
					templateUrl: 'views/base.html',
					controller: 'ProfileController',
					authenticate: true
				}).state('profile.detail', {
					url: '/{id:int}',
					authenticate: true
				}).state('challenges', {
					url: '/challenges',
					templateUrl: 'views/base.html',
					controller: 'ChallengesController',
					authenticate: true
				}).state('challenges.expired', {
					url: '/expired',
					authenticate: true
				}).state('challenges.invites', {
					url: '/invites',
					authenticate: true
				}).state('challenges.detail', {
					url: '/{id:int}',
					authenticate: true
				}).state('steps', {
					url: '/steps',
					templateUrl: 'views/base.html',
					controller: 'StepsController',
					authenticate: true
				}).state('logout', {
					url: '/logout',
					templateUrl: 'views/base.html',
					controller: 'LogoutController',
					authenticate: true
				}).state('quizzes', {
					url: '/quizzes',
					templateUrl: 'views/base.html',
					controller: 'QuizController',
					authenticate: true
				}).state('quizzes.detail', {
					url: '/{id:int}',
					authenticate: true
				}).state('settings', {
					url: '/settings',
					templateUrl: 'views/base.html',
					controller: 'SettingsController',
					authenticate: true
				}).state('settings.general', {
					url: '/general',
					authenticate: true
				}).state('settings.notifications', {
					url: '/notifications',
					authenticate: true
				}).state('settings.privacy', {
					url: '/privacy',
					authenticate: true
				}).state('settings.account', {
					url: '/account',
					authenticate: true
				}).state('goals', {
					url: '/goals',
					templateUrl: 'views/base.html',
					controller: 'GoalsController',
					authenticate: true
				}).state('goals.expired', {
					url: '/expired',
					authenticate: true
				}).state('goals.detail', {
					url: '/{id:int}',
					authenticate: true
				}).state('friends', {
					url: '/friends',
					templateUrl: 'views/base.html',
					controller: 'FriendsController',
					authenticate: true
				}).state('leaderboard', {
					url: '/leaderboard',
					templateUrl: 'views/base.html',
					controller: 'LeaderboardController',
					authenticate: true
				}).state('aboutus', {
					url: '/aboutus',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('howto', {
					url: '/howto',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('datasecurity', {
					url: '/datasecurity',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('impressum', {
					url: '/impressum',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('tos', {
					url: '/tos',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('faq', {
					url: '/faq',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('userdeleted', {
					url: '/userdeleted',
					templateUrl: 'views/base.html',
					controller: 'StartController',
					authenticate: false
				}).state('error', {
					url: '/error/{key:int}',
					templateUrl: 'views/base.html',
					controller: 'ErrorController',
					authenticate: false
				})
				;

				$urlRouterProvider.otherwise('/');

				uiGmapGoogleMapApiProvider.configure({
					//key: 'AIzaSyDvdd3jtloFNSy8T2qCw4JSiDRI71pdlME',
					v: '3.17',
					//libraries: 'weather,geometry,visualization'
				});
			}]
		)
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('myinter');
		}])
		.factory('myinter', ['$q', '$sessionStorage', '$rootScope', '$location',
			function ($q, $sessionStorage, $rootScope, $location) {
				return {
					responseError: function (rejection) {
						if (rejection.status == 401) {
							delete $sessionStorage.currentUserId;
							delete $rootScope.currentUserId;
							$location.nextAfterLogin = $location.path();
							$location.path('/');
						}
						return $q.reject(rejection);
					}
				};
			}])
		.run(['$rootScope', '$state', '$sessionStorage',
			function ($rootScope, $state, $sessionStorage) {
				$rootScope.$on('$stateChangeStart', function (event, next, nextParams, prev, prevParams) {
					if (!isNaN($rootScope.siteCounter)) {
						$rootScope.siteCounter++;
					} else {
						$rootScope.siteCounter = 0;
					}

					$rootScope.previousState = prev;
					if (!$rootScope.currentUserId && $sessionStorage.currentUserId !== undefined) {
						$rootScope.currentUserId = $sessionStorage.currentUserId;
					}

					$rootScope.isLoggedIn = !!$rootScope.currentUserId;

					// redirect to login page if not logged in
					if (next.authenticate && !$rootScope.currentUserId) {
						event.preventDefault(); //prevent current page from loading
						$state.go('start');
					}
					
					if ($rootScope.modalInstance) {
						$rootScope.modalInstance.dismiss('page change');
						$rootScope.modalInstance = null;
					}
				});
			}]
		);

Date.prototype.getWeek = function () {
	var d = this;
	d.setHours(0, 0, 0);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setDate(d.getDate() + 4 - (d.getDay() || 7));
	// Get first day of year
	var yearStart = new Date(d.getFullYear(), 0, 1);
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
	// Return array of year and week number
	return weekNo;
};

Date.prototype.toISODateString = function () {
	var d = this;
	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
};

Date.prototype.startOfWeek = function () {
	var d = this;
	return d.getDay() ? new Date(d.setDate(d.getDate() - d.getDay() + 1)) : new Date(d.setDate(d.getDate() - 6));
};

Date.prototype.endOfWeek = function () {
	var d = this;
	return d.getDay() ? new Date(d.setDate(d.getDate() - d.getDay() + 7)) : d;
};

Date.prototype.nextWeek = function () {
	var d = this;
	d = d.endOfWeek();
	d.setDate(d.getDate() + 1);
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);

	return d;
}
