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
    },

    /**
     * @param {Object} colors
     * @return {Boolean}
     */
    isAcceptableColors: function(colors) {
      var colorNames = Object.keys(this.colors);

      for (var i = 0; i < colorNames.length; i++) {
        var name = colorNames[i];
        if (!colors[name] || !this.isColorString(colors[name])) {
          return false;
        }
      }
      return true;
    },

    /**
     * @param {String} colorString
     * @return {Boolean}
     */
    isColorString: function(colorString) {
      return !!parseCSSColor(colorString);
    }
  };

  return ColorScheme;
});

