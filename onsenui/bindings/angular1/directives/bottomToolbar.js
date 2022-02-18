(function(){
  'use strict';

  angular.module('onsen').directive('onsBottomToolbar', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: {
        pre: function(scope, element, attrs) {
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-bottomToolbar'
          });
        },

        post: function(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  });

})();

