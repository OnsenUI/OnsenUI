/**
 * @element ons-if-orientation
 * @category conditional
 * @description
 *   [en]Conditionally display content depending on screen orientation. Valid values are portrait and landscape. Different from other components, this component is used as attribute in any element.[/en]
 *   [ja]画面の向きに応じてコンテンツの制御を行います。portraitもしくはlandscapeを指定できます。すべての要素の属性に使用できます。[/ja]
 * @seealso ons-if-platform [en]ons-if-platform component[/en][ja]ons-if-platformコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-if-orientation="portrait">
 *   <p>This will only be visible in portrait mode.</p>
 * </div>
 */

/**
 * @attribute ons-if-orientation
 * @initonly
 * @type {String}
 * @description
 *   [en]Either "portrait" or "landscape".[/en]
 *   [ja]portraitもしくはlandscapeを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfOrientation', function($onsen, $onsGlobal) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.css('display', 'none');

        return function(scope, element, attrs) {
          element.addClass('ons-if-orientation-inner');

          attrs.$observe('onsIfOrientation', update);
          $onsGlobal.orientation.on('change', update);

          update();

          $onsen.cleaner.onDestroy(scope, function() {
            $onsGlobal.orientation.off('change', update);

            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            var userOrientation = ('' + attrs.onsIfOrientation).toLowerCase();
            var orientation = getLandscapeOrPortrait();

            if (userOrientation === 'portrait' || userOrientation === 'landscape') {
              if (userOrientation === orientation) {
                element.css('display', '');
              } else {
                element.css('display', 'none');
              }
            }
          }

          function getLandscapeOrPortrait() {
            return $onsGlobal.orientation.isPortrait() ? 'portrait' : 'landscape';
          }
        };
      }
    };
  });
})();

