/**
 * @ngdoc directive
 * @id pull-hook
 * @name ons-pull-hook
 * @description
 *   [en]Component that adds "pull-to-refresh" to an <ons-page> element.[/en]
 *   [ja]ons-page要素以下でいわゆるpull to refreshを実装するためのコンポーネントです。[/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope, $timeout) {
 *     $scope.items = [3, 2 ,1];
 *
 *     $scope.load = function($done) {
 *       $timeout(function() {
 *         $scope.items.unshift($scope.items.length + 1);
 *         $done();
 *       }, 1000);
 *     };
 *   });
 * </script>
 *
 * <ons-page ng-controller="MyController">
 *   <ons-pull-hook var="loaded" ng-action="load($done)">
 *     <span ng-switch="loader.getCurrentState()">
 *       <span ng-switch-when="initial">Pull down to refresh</span>
 *       <span ng-switch-when="preaction">Release to refresh</span>
 *       <span ng-switch-when="action">Loading data. Please wait...</span>
 *     </span>
 *   </ons-pull-hook>
 *   <ons-list>
 *     <ons-list-item ng-repeat="item in items">
 *       Item #{{ item }}
 *     </ons-list-item>
 *   </ons-list>
 * </ons-page>
 */

/**
 * @ngdoc event
 * @name changestate
 * @description
 * [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[en]
 * [ja][/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.pullHook
 * @param {String} event.state
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this component.[/en]
 *   [ja]このコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
 *   [ja]この属性がある時、disabled状態になりアクションが実行されなくなります[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-action
 * @type {Expression}
 * @description
 *   [en]Use to specify custom behavior when the page is pulled down. A `$done` function is available to tell the component that the action is completed.[/en]
 *   [ja]pull downしたときの振る舞いを指定します。アクションが完了した時には`$done`関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-action
 * @type {Expression}
 * @description
 *   [en]Same as `ng-action` but can be used without AngularJS. A function called `done` is available to call when action is complete.[/en]
 *   [ja]ng-actionと同じですが、AngularJS無しで利用する場合に利用できます。アクションが完了した時には`done`関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name height
 * @type {String}
 * @description
 *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
 *   [ja]コンポーネントの高さを指定します。この高さ以上にpull downすると"preaction"状態に移行します。デフォルトの値は"64px"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name threshold-height
 * @type {String}
 * @description
 *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value or a value less than the height will disable this property.[/en]
 *   [ja]閾値となる高さを指定します。この値で指定した高さよりもpull downすると、このコンポーネントは自動的に"action"状態に移行します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 * @description
 *   [en]Disable or enable the component.[/en]
 *   [ja]disabled状態にするかどうかを設定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 * @description
 *   [en]Returns whether the component is disabled or enabled.[/en]
 *   [ja]dsiabled状態になっているかを得ることが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setHeight(height)
 * @param {Number} height
 * @description
 *   [en]Specify the height.[/en]
 *   [ja]高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setThresholdHeight(thresholdHeight)
 * @param {Number} thresholdHeight
 * @description
 *   [en]Specify the threshold height.[/en]
 *   [ja]閾値となる高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja][/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja][/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja][/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Pull hook directive.
   */
  module.directive('onsPullHook', function($onsen, PullHookView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      compile: function(element, attrs) {
        return {
          pre: function(scope, element, attrs) {
            var pullHook = new PullHookView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, pullHook);
            element.data('ons-pull-hook', pullHook);

            scope.$on('$destroy', function() {
              pullHook._events = undefined;
              element.data('ons-pull-hook', undefined);
              scope = element = attrs = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  });

})();
