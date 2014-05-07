'use strict';

angular.module('app').factory('ColorScheme', function($rootScope) {
  var ColorScheme = function() {
    ColorScheme.prototype.init.apply(this, arguments);
  };

  ColorScheme.prototype = {
    colors: {},

    init: function(options) {
      angular.extend(this, options);
    },

    setColor: function(variable, color) {
      this.colors[variable] = color;
      $rootScope.$broadcast('colors:changed', this.colors);
    },

    setColors: function(colors) {
      for (var name in colors) {
        this.colors[name] = colors[name];
      }
      $rootScope.$broadcast('colors:changed', this.colors);
    },

    getColor: function(variable) {
      return this.colors[variable];
    },

    getColors: function() {
      return this.colors;
    }
  };

  return ColorScheme;
});

