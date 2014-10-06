'use strict';

angular.module('app').factory('ColorSchemeFactory', function(ColorScheme) {
  var schemes = window.theme.schemes.map(function(scheme) {
    return new ColorScheme(scheme);
  });

  return {
    getSchemes: function() {
      return schemes;
    }
  };
});

