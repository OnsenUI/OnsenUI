'use strict';

angular.module('app').factory('ScreenPattern', function() {

  /** 
   * This class represents screen pattern using CSS components.
   */
  var ScreenPattern = function() {
    ScreenPattern.prototype.init.apply(this, arguments);
  };

  ScreenPattern.prototype = {
    init: function(options) {
      options = angular.extend({
        html: 'none'
      }, options || {});

      this.html = options.html;
    }
  };
  
  return ScreenPattern;
});
