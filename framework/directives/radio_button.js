(function(){
  'use strict';

  var module = angular.module('onsen'); // no [] -> referencing existing module

  module.directive('onsRadioButton', function($onsen) {
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
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/radio_button.tpl',
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

