/**
 * @ngdoc directive
 * @id modal
 * @name ons-modal
 * @description Modal component that mask current screen.
 * @param modifier Modifier name.
 * @param var Variable name to refer this modal.
 * @property toggle() Toggle modal view visibility.
 * @property show() Show modal view.
 * @property hide() Hide modal view.
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Modal directive.
   */
  module.directive('onsModal', function($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: false, 
      transclude: false,

      compile: function(element, attrs) {
        compile(element, attrs);

        return {
          pre: function(scope, element, attrs) {
            var modal = new ModalView(scope, element);

            $onsen.declareVarAttribute(attrs, modal);

            $onsen.aliasStack.register('ons.modal', modal);
            element.data('ons-modal', modal);

            scope.$on('$destroy', function() {
              element.data('ons-modal', undefined);
              $onsen.aliasStack.unregister('ons.modal', modal);
            });
          },

          post: function() {

          }
        };
      }
    };

    function compile(element, attrs) {
      var modifierTemplater = $onsen.generateModifierTemplater(attrs);

      var html = element[0].innerHTML;
      element[0].innerHTML = '';

      var wrapper = angular.element('<div></div>');
      wrapper.addClass('modal__content');
      wrapper.addClass(modifierTemplater('modal--*__content'));

      element.css('display', 'none');
      element.addClass('modal');
      element.addClass(modifierTemplater('modal--*'));

      wrapper[0].innerHTML = html;
      element.append(wrapper);
    }
  });

})();
