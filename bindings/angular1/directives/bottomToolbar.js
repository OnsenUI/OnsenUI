(function(){
  'use strict';

  angular.module('onsen').directive('onsBottomToolbar', function($onsen, GenericView) {
    return {
      restrict: 'E',
      link: {
        pre: function(scope, element, attrs) {
          CustomElements.upgrade(element[0]);
          GenericView.register(scope, element, attrs, {
            viewKey: 'ons-bottomToolbar'
          });

          var inline = typeof attrs.inline !== 'undefined';
          var pageView = element.inheritedData('ons-page');

          if (pageView && !inline) {
            pageView._element[0]._registerBottomToolbar(element[0]);
          }
        },

        post: function(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  });

})();

