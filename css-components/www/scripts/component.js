'use strict';

angular.module('app').factory('Component', function() {

  /**
   * This class represents CSS component definition.
   */
  var Component = function() {
    Component.prototype.init.apply(this, arguments);
  };

  Component.prototype = {
    init: function(options) {
      options = angular.extend({
        name: 'none',
        html: 'none',
        class: 'none',
        hint: 'none'
      }, options || {});

      this.name = options.name;
      this.html = options.html;
      this.css = options.css;
      this.class = options.class;
      this.hint = options.hint;
    },

    getCSSPromise: function() {
      var defer = $.Deferred();
      defer.resolve(this.css);
      return defer.promise();
    }
  };

  return Component;
});
