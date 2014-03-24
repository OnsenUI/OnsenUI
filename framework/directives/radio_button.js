(function(){
	'use strict';

	var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

	directives.directive('onsRadioButton', function(ONSEN_CONSTANTS, OnsenUtil) {
		return {
			restrict: 'E',
			replace: false,
			scope: {
				value: '@',
				ngModel: '=',
				leftLabel: '@',
				rightLabel: '@',
				name: '@'
			},
			transclude: true,
			templateUrl: ONSEN_CONSTANTS.DIRECTIVE_TEMPLATE_URL + '/radio_button.tpl',
			link: function($scope, element, attrs){
				var radioButton = element.find('input');
				var checked = false;

				$scope.modifierTemplater = OnsenUtil.generateModifierTemplater(attrs);

				attrs.$observe('disabled', function(disabled){
					if(disabled === undefined){
						radioButton.attr('disabled', false);						
					}else{
						radioButton.attr('disabled', true);
					}
				});				
			}
		};
	});
})();

