
/**
 * @element ons-button
 */

(function(){
  'use strict';

  angular.module('onsen').directive('onsButton', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        CustomElements.upgrade(element[0]);
        var button = GenericView.register(scope, element, attrs, {
          viewKey: 'ons-button'
        });

        Object.defineProperty(button, 'disabled', {
          get: function () {
            return this._element[0].disabled;
          },
          set: function(value) {
            return (this._element[0].disabled = value);
          }
        });
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });



})();
