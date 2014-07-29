'use strict';

// directive for rendering component html & css in document.
angular.module('app').directive('componentElement', function() {
  return {
    restrict: 'E',
    scope: {
      html: '='
    },
    replace: true,
    link: function(scope, element/*, attrs, controller */) {
      var div = document.createElement('div');
      $(div).addClass('page').css({
        'display' : 'flex',
        'align-items' : 'center',
        'justify-content' : 'center',
        'font-size' : '16px'
      });
      var container = element[0].parentNode;
      container.removeChild(element[0]);
      container.appendChild(div);

      var update = function() {
        div.innerHTML = '<div style="width:95%">' + scope.html + '</div>';
      };

      scope.$watch('html', update);
      update();
    }
  };
});
