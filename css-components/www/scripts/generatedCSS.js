'use strict';

angular.module('app').factory('GeneratedCss', function($http, $rootScope, $timeout) {

  $timeout(function() {
    $http.get('/onsen-css-components.css').then(function(response) {
      generatedCss.templateCss = response.data;
      generatedCss.onColorsChanged();
    });
  }, 0);

  var VAR_REGEX = /\$[-a-zA-Z0-9]+/g;

  var generatedCss = {
    css: undefined,
    templateCss: undefined,

    setColors: function(colors) {
      this.colors = colors;
      this.onColorsChanged();
    },

    getObjectURL: function() {
      if (!this.css) {
        throw new Error('this.css is undefined.');
      }

      var blob = new Blob([this.css], {type: 'text/css'});
      return window.URL.createObjectURL(blob);
    },

    toQueryParams: function() {
      var result = '';
      $.each(this.colors, function(variable, value){
        result = result + '&' + variable + '=' + encodeURIComponent(value);
      });
      return result;
    },

    getURLString: function() {
      return '/onsen-css-components.css?' + this.toQueryParams();
    },

    onColorsChanged: function() {
      if (this.templateCss) {
        this.css = this.compile(this.templateCss, this.colors);
        $rootScope.$broadcast('GeneratedCss:changed', this.templateCss);
      }
    },

    compile: function(templateCss) {
      var self = this;

      function lighten(color) {
        var rgba = parseCSSColor(color);
        rgba[3] = 0.2;

        return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
      }

      return templateCss.replace(VAR_REGEX, function(name) {
        name = name.substr(1, name.length);

        // resolve lighten color
        if (name.substr(-1 * '--lighten'.length, name.length) === '--lighten') {
          name = name.substr(0, name.length - '--lighten'.length);
          return lighten(self.colors[name]);
        }

        return self.colors[name];
      });
    },

    /**
     * @param {String} css
     * @return {Object}
     */
    buildVarNameDict: function(css) {
      var matches = css.match(VAR_REGEX) || [];
      var result = {};

      var names = matches.map(function(name) {
        return name.substring(1, name.length);
      });

      for (var i = 0; i < names.length; i++) {
        result[names[i]] = names[i];
      }

      return result;
    }
  };

  $rootScope.$on('colors:changed', function(event, colors) {
    generatedCss.setColors(colors);
  }.bind(this));

  return generatedCss;
});
