/**
 * @ngdoc directive
 * @id keyboard-active
 * @name keyboard-active
 * @description
 *    [en]Conditionally display content depending on if the software keyboard is visible or hidden. This component requires cordova and that the com.ionic.keyboard plugin is installed.[/en]
 *    [ja][/ja]
 * @param ons-keyboard-active
 *    [en]The content of tags with this attribute will be visible when the software keyboard is open.[/en]
 *    [ja][/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-keyboard-active>
 *   This will only be displayed if the software keyboard is open.
 * </div>
 * <div ons-keyboard-inactive>
 *   There is also a component that does the opposite.
 * </div>
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  var compileFunction = function(show, $onsen) {
    return function(element) {
      return function(scope, element, attrs) {
        $onsen.cleaner.onDestroy(scope, function() {
          $onsen.clearComponent({
            element: element,
            scope: scope,
            attrs: attrs
          });
          element = scope = attrs = null;
        });

        var dispShow = show ? 'block' : 'none',
            dispHide = show ? 'none' : 'block';

        var onShow = function() {
          element.css('display', dispShow);
        };

        var onHide = function() {
          element.css('display', dispHide);
        };
       
        ons.softwareKeyboard.on('show', onShow);
        ons.softwareKeyboard.on('hide', onHide);
        ons.softwareKeyboard.on('init', function(e) {
          if (e.visible) {
            onShow();
          } else {
            onHide();
          }
        });

        if (ons.softwareKeyboard._visible) {
          onShow();
        } else {
          onHide();
        }
      };
    };
  };

  module.directive('onsKeyboardActive', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(true, $onsen)
    };
  });

  module.directive('onsKeyboardInactive', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(false, $onsen)
    };
  });
})();
