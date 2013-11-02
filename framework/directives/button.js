/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function(){
	'use strict';
	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsButton', function(ONSEN_CONSTANTS) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				shouldSpin: '@',
				animation: '@',
				type: '@',
				disabled: '@',
				ngClick: '&'
			},
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/button.tpl',
			link: function(scope, element, attrs){
				var effectButton = element.find('button');
				var TYPE_PREFIX = "topcoat-button--";
				scope.item = {};

				element.bind('click', scope.ngClick);

				// if animation is not specified -> default is slide-left
				if(scope.animation === undefined || scope.animation === ""){
					scope.item.animation = "slide-left";
				}
		
				scope.$watch('disabled', function(disabled){
					if(disabled === "true"){
						effectButton.attr('disabled', true);
					}else{
						effectButton.attr('disabled', false);
					}
				});

				scope.$watch('animation', function(newAnimation){
					if(newAnimation){
						scope.item.animation = newAnimation;
					}
				});

				scope.$watch('shouldSpin', function(shouldSpin){
					if(shouldSpin === "true"){
						effectButton.attr('data-loading', true);
					}else{
						effectButton.removeAttr('data-loading');
					}
				});
			}
		};
	});
})();
