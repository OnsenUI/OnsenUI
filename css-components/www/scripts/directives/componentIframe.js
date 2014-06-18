'use strict';

// directive for rendering component html & css in iframe element.
angular.module('app').directive('componentIframe', function() {
  return {
    restrict: 'E',
    scope: {
      html: '=',
      css: '=',
      prependCss: '='
    },
    replace: true,
    link: {
      pre: function(/* scope, element, attrs, controller */) {
      },

      post: function(scope, element/*, attrs, controller */) {
        var iframe = document.createElement('iframe');
        $(iframe).addClass('page');

        var container = element[0].parentNode;
        container.removeChild(element[0]);
        container.appendChild(iframe);

        var update = function() {
          var css = (scope.prependCss ? scope.prependCss : '') + '\n' + scope.css;
          var html =
            '<!doctype html>\n' +
            '<html>' +
            '<head>' +
              '<style type="text/css">' + css + '</style>' +
              '<link rel="stylesheet" href="/patterns/lib/font_awesome/css/font-awesome.min.css">' +
            '</head>' +
            '<body style="background-color: transparent; padding:0; margin: 0; overflow: hidden; height: 100%;">' +
            '<div style="position: absolute; right: 0px; left: 0px; top: 0px; bottom: 0px; display: flex; align-items: center; justify-content: center;">' +
            '<div style="width: 100%; text-align: center; padding: 0 8px;">' +
            '<span style="text-align: left;">' +
            scope.html +
            '</span>' +
            '</div>' +
            '</div>' +
            '</body>' +
            '</html>';

          iframe.srcdoc = html;
        };

        scope.$watch('html', update);
        scope.$watch('css', update);
        scope.$watch('prependCss', update);
        update();
      }
    }
  };
});
