angular.module('app')
	.directive('supportChat', [function(){
		'use strict';

		return {
			restrict : 'E',
			templateUrl : 'views/directives/support.html',
			replace : false
		}


	}])
