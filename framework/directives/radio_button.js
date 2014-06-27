(function(){
  'use strict';

  var directives = angular.module('onsen.directives'); // no [] -> referencing existing module

  directives.directive('onsRadioButton', ['ONSEN_CONSTANTS', function(ONSEN_CONSTANTS) {
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
        attrs.$observe('disabled', function(disabled){
          if(disabled === undefined){
            radioButton.attr('disabled', false);						
          }else{
            radioButton.attr('disabled', true);
          }
        });				
      }
    };
  }]);
})();

