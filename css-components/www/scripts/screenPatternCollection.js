'use strict';

angular.module('app').factory('ScreenPatternCollection', function(ScreenPattern) {

  // Represents concreate screen patterns.
  var collection = [
    new ScreenPattern({
      html: '<button class="button">Button</button>'
    })
  ];

  return collection;
});
