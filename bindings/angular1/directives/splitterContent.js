/**
 * @element ons-splitter-content
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function() {
  'use strict';

  var lastReady = window.OnsSplitterContentElement.rewritables.ready;
  window.OnsSplitterContentElement.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  var lastLink = window.OnsSplitterContentElement.rewritables.link;
  window.OnsSplitterContentElement.rewritables.link = function(element, target, options, callback) {
    var view = angular.element(element).data('ons-splitter-content');
    lastLink(element, target, options, function(target) {
      view._link(target, callback);
    });
  };

  angular.module('onsen').directive('onsSplitterContent', function($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function(element, attrs) {
        CustomElements.upgrade(element[0]);

        return function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);

          var view = new SplitterContent(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-content', view);

          scope.$on('$destroy', function() {
            view._events = undefined;
            element.data('ons-splitter-content', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
