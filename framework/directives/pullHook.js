/**
 * @ngdoc directive
 * @id pull-hook
 * @name ons-pull-hook
 * @category control
 * @description
 *   [en]Component that adds "pull-to-refresh" to an <ons-page> element.[/en]
 *   [ja]ons-page要素以下でいわゆるpull to refreshを実装するためのコンポーネントです。[/ja]
 * @codepen WbJogM
 * @guide UsingPullHook 
 *   [en]How to use Pull Hook[/en]
 *   [ja]プルフックを使う[/ja]
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
 *   [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[/en]
 *   [ja]コンポーネントの状態が変わった場合に発火します。状態は、"initial", "preaction", "action"のいずれかです。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.pullHook
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {String} event.state
 *   [en]Current state.[/en]
 *   [ja]現在の状態名を参照できます。[/ja]
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
 *   [en]Use to specify custom behavior when the page is pulled down. A <code>$done</code> function is available to tell the component that the action is completed.[/en]
 *   [ja]pull downしたときの振る舞いを指定します。アクションが完了した時には<code>$done</code>関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-action
 * @type {Expression}
 * @description
 *   [en]Same as <code>ng-action</code> but can be used without AngularJS. A function called <code>done</code> is available to call when action is complete.[/en]
 *   [ja]<code>ng-action</code>と同じですが、AngularJS無しで利用する場合に利用できます。アクションが完了した時には<code>done</code>関数を呼び出します。[/ja]
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
 * @ngdoc attribute
 * @name ons-changestate
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "changestate" event is fired.[/en]
 *  [ja]"changestate"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the pull hook will be disabled.[/en]
 *   [ja]trueを指定すると、プルフックがdisabled状態になります。[/ja]
 * @description
 *   [en]Disable or enable the component.[/en]
 *   [ja]disabled状態にするかどうかを設定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the pull hook is disabled.[/en]
 *   [ja]プルフックがdisabled状態の場合、trueを返します。[/ja]
 * @description
 *   [en]Returns whether the component is disabled or enabled.[/en]
 *   [ja]disabled状態になっているかを得ることが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setHeight(height)
 * @param {Number} height
 *   [en]Desired height.[/en]
 *   [ja]要素の高さを指定します。[/ja]
 * @description
 *   [en]Specify the height.[/en]
 *   [ja]高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setThresholdHeight(thresholdHeight)
 * @param {Number} thresholdHeight
 *   [en]Desired threshold height.[/en]
 *   [ja]プルフックのアクションを起こす閾値となる高さを指定します。[/ja]
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
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
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
            $onsen.registerEventHandlers(pullHook, 'changestate destroy');
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
