'use strict';

angular.module('app').factory('ComponentCollection', function(Component, CssComponentParser, GeneratedCss, $rootScope) {

  function ComponentCollection(){
    ComponentCollection.prototype.init.apply(this, arguments);
  }

  ComponentCollection.prototype = {
    collection: undefined,

    init: function() {
      $rootScope.$on('GeneratedCss:changed', function() {
        this.parseCss(GeneratedCss.templateCss);
      }.bind(this));

      $rootScope.$on('colors:changed', function(event, colors) {
        this.colors = colors;
      }.bind(this));
    },

    parseCss: function(css) {
      this.collection = CssComponentParser.parse(css).map(function(component) {
        component.varNameDict = GeneratedCss.buildVarNameDict(component.css);
        component.css = GeneratedCss.compile(component.css, this.colors);

        return component;
      }.bind(this));

      $rootScope.$broadcast('ComponentCollection:changed', this.collection);
    },

    all: function() {
      return this.collection;
    }
  };

  return new ComponentCollection();

});
