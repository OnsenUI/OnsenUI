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

				// if animation is not specified -> default is slide-left
				if(scope.animation === undefined || scope.animation === ""){
					scope.item.animation = "slide-left";
				}
		
				scope.$watch('disabled', function(disabled){
					if(disabled === "true"){
						effectButton.addClass('is-disabled');
					}else{
						effectButton.removeClass('is-disabled');
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
