'use strict';

// directive for rendering custom tooltip
angular.module('app').directive('tooltip', function() {
  return {
    restrict: 'A',
    replace: true,
    link: function(scope, element/*, attrs, controller */) {
      var tooltipElement = null;

      element.on('mouseenter', function() {
        if (!tooltipElement) {
          tooltipElement = $('<span class="tooltip"></span>');
          tooltipElement.text(element.attr('tooltip'));
          $('body').append(tooltipElement);
        }

        var rect = element[0].getBoundingClientRect();
        tooltipElement.css({top: rect.bottom + 10, left: rect.left + rect.width / 2}).show();
      });

      element.on('mouseleave', function() {
        if (tooltipElement) {
          tooltipElement.hide();
        }
      });
    }
  };
});
