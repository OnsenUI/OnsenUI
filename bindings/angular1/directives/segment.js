/**
 * @element ons-segment
 */

/**
 * @attribute var
 * @initonly
 * @type {String}
 * @description
 *   [en]Variable name to refer this segment.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @attribute ons-postchange
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsSegment', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        var view = GenericView.register(scope, element, attrs, {viewKey: 'ons-segment'});
        $onsen.fireComponentEvent(element[0], 'init');
        $onsen.registerEventHandlers(view, 'postchange');
      }
    };
  });

})();
