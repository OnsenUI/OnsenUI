/**
 * @ngdoc directive
 * @id ripple
 * @name ons-ripple
 * @category form
 * @description
 *   [en]Adds a Material Design "ripple" effect to an element.[/en]
 *   [ja][/ja]
 * @example
 * <ons-list>
 *   <ons-list-item>
 *    <ons-ripple color="rgba(0, 0, 0, 0.3)"></ons-ripple>
 *    Click me!
 *   </ons-list-item>
 * </ons-list>
 *
 * <ons-ripple target="children" color="rgba(0, 0, 0, 0.3)">
 *   <p>Click me!</p>
 * </ons-ripple>
 */

/**
 * @ngdoc attribute
 * @name color
 * @type {String}
 * @description
 *   [en]Color of the ripple effect.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name center
 * @description
 *   [en]If this attribute is set, the effect will originate from the center.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name target
 * @type {String}
 * @description
 *   [en]If this attribute is set to children, the effect will be applied to the children of the component instead of the parent.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set, the ripple effect will be disabled.[/en]
 *   [ja][/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsRipple', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        GenericView.register(scope, element, attrs, {viewKey: 'ons-ripple'});
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
