/**
 * @element ons-fab
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer the floating action button.[/en]
 *   [ja]このフローティングアクションボタンを参照するための変数名をしてします。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsFab', function($onsen, FabView) {
    return {
      restrict: 'E',
      replace: false,
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          var fab = new FabView(scope, element, attrs);

          element.data('ons-fab', fab);

          $onsen.declareVarAttribute(attrs, fab);

          scope.$on('$destroy', function() {
            element.data('ons-fab', undefined);
            element = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      },

    };
  });

})();

