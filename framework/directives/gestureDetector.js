/**
 * @ngdoc directive
 * @id gestureDetector
 * @name ons-gesture-detector
 * @category input
 * @description
 *   [en]Component to detect finger gestures within the wrapped element. See the guide for more details.[/en]
 *   [ja]要素内のジェスチャー操作を検知します。詳しくはガイドを参照してください。[/ja]
 * @guide DetectingFingerGestures
 *   [en]Detecting finger gestures[/en]
 *   [ja]ジェスチャー操作の検知[/ja]
 * @example
 * <ons-gesture-detector>
 *   ...
 * </ons-gesture-detector>
 */
(function() {
  'use strict';

  var EVENTS =
    ('drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' +
      'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate').split(/ +/);

  angular.module('onsen').directive('onsGestureDetector', function($onsen) {

    var scopeDef = EVENTS.reduce(function(dict, name) {
      dict['ng' + titlize(name)] = '&';
      return dict;
    }, {});

    function titlize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return {
      restrict: 'E',
      scope: scopeDef,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: true,

      compile: function(element, attrs) {
        return function link(scope, element, attrs, _, transclude) {

          transclude(scope.$parent, function(cloned) {
            element.append(cloned);
          });

          var handler = function(event) {
            var attr = 'ng' + titlize(event.type);

            if (attr in scopeDef) {
              scope[attr]({$event: event});
            }
          };

          var gestureDetector;

          setImmediate(function() {
            gestureDetector = element[0]._gestureDetector;
            gestureDetector.on(EVENTS.join(' '), handler);
          });

          $onsen.cleaner.onDestroy(scope, function() {
            gestureDetector.off(EVENTS.join(' '), handler);
            $onsen.clearComponent({
              scope: scope,
              element: element,
              attrs: attrs
            });
            gestureDetector.element = scope = element = attrs = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();

