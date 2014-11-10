/**
 * @ngdoc directive
 * @id if-platform
 * @name ons-if-platform
 * @description
 *    [en]Conditionally display content depending on the platform / browser. Valid values are "ios", "android", "blackberry", "chrome", "safari", "firefox", and "opera".[/en]
 *    [ja]プラットフォームやブラウザーに応じてコンテンツの制御をおこないます。ios, android, blackberry, chrome, safari, firefox, operaを指定できます。[/ja]
 * @param ons-if-platform
 *    [en]Either "opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios" or "windows".[/en]
 *    [ja]opera, firefox, safari, chrome, ie, android, blackberry, ios, windowsから指定します。[/ja]
 * @seealso ons-if-orientation [en]ons-if-orientation component[/en][ja]ons-if-orientationコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-if-platform="android">
 *   ...
 * </div>
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfPlatform', function($onsen) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.addClass('ons-if-platform-inner');
        element.css('display', 'none');

        var platform = getPlatformString();

        return function(scope, element, attrs) {
          attrs.$observe('onsIfPlatform', function(userPlatform) {
            if (userPlatform) {
              update();
            }
          });

          update();

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            if (attrs.onsIfPlatform.toLowerCase() === platform.toLowerCase()) {
              element.css('display', 'block');
            } else {
              element.css('display', 'none');
            }
          }
        };

        function getPlatformString() {

          if (navigator.userAgent.match(/Android/i)) {
            return 'android';
          }

          if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
            return 'blackberry';
          }

          if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return 'ios';
          }

          if (navigator.userAgent.match(/IEMobile/i)) {
            return 'windows';
          }

          // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
          var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          if (isOpera) {
            return 'opera';
          }

          var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
          if (isFirefox) {
            return 'firefox';
          }

          var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
          // At least Safari 3+: "[object HTMLElementConstructor]"
          if (isSafari) {
            return 'safari';
          }

          var isChrome = !!window.chrome && !isOpera; // Chrome 1+
          if (isChrome) {
            return 'chrome';
          }

          var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
          if (isIE) {
            return 'ie';
          }

          return 'unknown';
        }
      }
    };
  });
})();
