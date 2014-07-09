'use strict';

angular.module('app').factory('CssComponentParser', function(Component, $rootScope) {

  var parser = {

    parse : function(css) {
      var topdocParser = new window.Parser();

      var parsedCss = topdocParser.parse(css);
      parsedCss.components = this.resolveDependencies(parsedCss.components);

      var result = []
      for (var i = 0; i < parsedCss.components.length ; i++) {
        var cssComponent = parsedCss.components[i];

        var component = new Component({
          name: cssComponent.name,
          html: cssComponent.markup,
          class: cssComponent.class,
          hint: cssComponent.hint,
          css: cssComponent.css
        });
        result.push(component);
      }

      return result;
    },

    addOrder: function(components) {
      var i = 0;
      return components.map(function(component) {
        component.order = i++;
        return component;
      });
    },

    resolveDependencies: function(components) {

      function resolve(component) {
        if (component.use) {
          if (component.use === 'Segment, Navigation Bar') {
            console.log('kita-');
            console.log(component.use);
          }

          var names = component.use.split(/, +/).map(function(name) {
            return name.trim();
          });

          var orderedComponents = names.map(function(name) {
            var dep = find(name);

            if (dep.use) {
              dep = resolve(dep);
            }

            return dep;
          });

          orderedComponents.sort(function(left, right) {
            if (left.order === right.order) {
              return 0;
            }
            return left.order - right.order ? -1 : 1;
          })

          component.css = orderedComponents.map(function(component) {
            return component.css;
          }).join('') + component.css;

          component.use = undefined;
        }

        return component;
      }

      function find(name) {
        for (var i = 0; i < components.length; i++) {
          if (components[i].name === name) {
            return components[i];
          }
        }
        throw new Error('no such component: ' + name);
      }

      components = this.addOrder(components).map(resolve);

      return components;
    }
  };

  return parser;
});
