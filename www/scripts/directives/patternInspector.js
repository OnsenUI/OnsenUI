'use strict';

// TODO: refactoring
angular.module('app').directive('patternInspector', function() {
  return function(scope, element) {

    scope.showComponentDialog = function() {
      ga('send', 'event', 'overview', 'inspect', scope.pattern.src);
      if (lastComponent) {
        ga('send', 'event', 'overview', 'showComponent', lastComponent.object.name);
        scope.inspector.showComponentDialog(lastComponent.object);
      } else {
        ga('send', 'event', 'overview', 'showHtml', scope.pattern.src);
        scope.htmlDialog.show(scope.pattern.src);
      }
    };

    var mask = $(element[0]);
    var highlight = $('.inspector-highlight', element[0]);
    var label = $('.label', highlight[0]);
    var iframe;
    var lastComponent = null;

    function relativePosition(x, y) {
      var rect = mask[0].getBoundingClientRect();
      return {
        x: Math.max(0, x - rect.left),
        y: Math.max(0, y - rect.top)
      };
    }

    function getIframe() {
      if (!iframe) {
       iframe = $('iframe', mask.parent());
      }
      return iframe;
    }

    function searchTopcoatComponent(target) {
      if (target) {
        var possibleComponents = scope.components.filter(function(eachComponent) {
          return $(target).hasClass(eachComponent.class);
        });
        if (possibleComponents.length > 0) {
          // TODO: check hint property for more accurate check
          var foundComponent = possibleComponents[0];
          return { object: foundComponent, element: target };
        } else {
          return searchTopcoatComponent(target.parentNode);
        }
      }
      return null;
    }

    mask.mousemove(watch);
    highlight.mousemove(watch);

    mask.mouseleave(function() {
      highlight.hide();
    });


    function watch(event) {
      var point = relativePosition(event.clientX, event.clientY);
      var targetElement = getIframe()[0].contentDocument.elementFromPoint(point.x, point.y);
      var component = searchTopcoatComponent(targetElement);
      var rect;

      if (component) {
        rect = component.element.getBoundingClientRect();

        highlight.css({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        }).show();

        label
          .removeClass('above below')
          .addClass(rect.top > 20 ? 'above' : 'below')
          .text(component.object.name);

        lastComponent = component;
      } else {
        lastComponent = null;
        rect = getIframe()[0].contentDocument.body.getBoundingClientRect();
        label
          .removeClass('above below')
          .addClass('inner')
          .text('Full Source');

        highlight.css({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        }).show();
      }
    }

  };
});
