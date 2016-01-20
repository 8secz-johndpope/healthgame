angular
	.module('app')
	.filter('avatar100', function () {
		return function (input) {
			return input ? input : 'https://www.fitbit.com/images/profile/defaultProfile_100_male.gif';
		};
	});