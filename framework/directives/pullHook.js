/**
 * @ngdoc directive
 * @id pull-hook 
 * @name ons-pull-hook
 * @description
 *   [en]Component that adds "pull-to-refresh" to an <ons-page> element.[/en]
 *   [ja][/ja]
 * @param var
 *   [en]Variable name to refer to this component.[/en]
 *   [ja][/ja]
 * @param disabled
 *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
 *   [ja][/ja]
 * @param ng-action
 *   [en]Use to specify custom behavior when the page is pulled down. A `$done` function is available to tell the component that the action is completed.[/en]
 *   [ja][/ja]
 * @param on-action
 *   [en]Same as `ng-action` but can be used without AngularJS. A function called `done` is available to call when action is complete.[/en]
 *   [ja][/ja]
 * @param height
 *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
 *   [ja][/ja]
 * @param threshold-height
 *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value or a value less than the height will disable this property.[/en]
 *   [ja][/ja]
 * @property setDisabled(disabled)
 *   [en]Disable or enable the component.[/en]
 *   [ja][/ja]
 * @property isDisabled()
 *   [en]Returns whether the component is disabled or enabled.[/en]
 *   [ja][/ja]
 * @property setHeight(height)
 *   [en]Specify the height.[/en]
 *   [ja][/ja]
 * @property setThresholdHeight(thresholdHeight)
 *   [en]Specify the threshold height.[/en]
 *   [ja][/ja]
 * @property on(eventName,listener)
 *  [en]Add an event listener to listen for the "changestate" event.[/en]
 *  [ja][/ja]
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
