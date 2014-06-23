'use strict';

angular.module('app').factory('ComponentCollection', function(Component, CssComponentParser, $rootScope) {

  function ComponentCollection(){
    ComponentCollection.prototype.init.apply(this, arguments);
  }

  ComponentCollection.prototype = {
    collection: undefined,

    init: function() {
      $rootScope.$on('GeneratedCss:changed', function(event, css) {
        this.parseCss(css);
      }.bind(this));
    },

    parseCss: function(css) {
      this.collection = CssComponentParser.parse(css);

      $rootScope.$broadcast('ComponentCollection:changed', this.collection);
    },

    all: function() {
      return this.collection;
    }
  };

  return new ComponentCollection();

});
