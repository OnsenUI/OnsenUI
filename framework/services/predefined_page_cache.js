(function(){
  'use strict';

  var module = angular.module('onsen.services');

  module.service('PredefinedPageCache', function($cacheFactory, $document) {
    var cache = $cacheFactory('$onsenPredefinedPageCache');

    var templates = $document[0].querySelectorAll('script[type="text/ons-template"]');

    for (var i = 0; i < templates.length; i++) {
      var template = angular.element(templates[i]);
      var id = template.attr('id');
      if (typeof id === 'string') {
        cache.put(id, template.text());
      }
    }

    return cache;
  });
})();

