'use strict';

angular.module('app').factory('GeneratedCss', function($http, $rootScope, CSSModule) {

  $http.get('/onsen-css-components.css').then(function(response) {
    generatedCss.templateCss = response.data;
    generatedCss.onColorsChanged();
  });

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
      /*
      $http.get(this.getURLString()).then(function(response) {
        this.css = response.data;
        $rootScope.$broadcast('GeneratedCss:changed', this.css);
      }.bind(this));*/

      if (this.templateCss) {
        this.css = this.compile(this.colors);
        $rootScope.$broadcast('GeneratedCss:changed', this.css);
      }
    },

    compile: function(colors) {
      if (!this.templateCss) {
        throw new Error('this.templateCss is undefined');
      }

      var self = this;

      function lighten(color) {
        var rgba = parseCSSColor(color);
        rgba[3] = 0.2;

        return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
      }

      return this.templateCss.replace(VAR_REGEX, function(name) {
        name = name.substr(1, name.length);

        // resolve lighten color
        if (name.substr(-1 * '--lighten'.length, name.length) === '--lighten') {
          name = name.substr(0, name.length - '--lighten'.length);
          return lighten(self.colors[name]);
        }

        return self.colors[name];
      });
    },

    getPageCss: function() {
      if (!this.css) {
        throw new Error('this.css is undefined.');
      }

      var ast = CSSModule.parse(this.css);

      ast.stylesheet.rules = ast.stylesheet.rules.reduce(function(rules, rule) {
        if (rule.selectors) {
          rule.selectors = rule.selectors.filter(function(selector) {
            return selector === '.page';
          });

          if (rule.selectors.length > 0) {
            rules.push(rule);
          }
        }

        return rules;
      }, []);

      return CSSModule.stringify(ast);
    }
  }

  $rootScope.$on('colors:changed', function(event, colors) {
    generatedCss.setColors(colors);
  }.bind(this));

  return generatedCss;
});
