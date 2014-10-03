'use strict';

angular.module('app').factory('CssComponentParser', function(Component) {

  var parser = {

    parse : function(css) {
      var topdocParser = new window.Parser();

      var parsedCss = topdocParser.parse(css);
      parsedCss.components = this.resolveDependencies(parsedCss.components);

      var result = [];
      for (var i = 0; i < parsedCss.components.length ; i++) {
        var cssComponent = parsedCss.components[i];

        var component = new Component({
          name: cssComponent.name,
          html: cssComponent.markup,
          class: cssComponent.class,
          hint: cssComponent.hint,
          css: cssComponent.resolvedCss
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

      components = this.addOrder(components).map(collectDependencies).map(resolve);

      return components;

      function find(name) {
        for (var i = 0; i < components.length; i++) {
          if (components[i].name === name) {
            return components[i];
          }
        }
        throw new Error('no such component: ' + name);
      }

      function collectDependencies(component) {
        if (component.use) {
          var names = component.use.split(/, +/).map(function(name) {
            return name.trim();
          });

          component.dependencies = names.map(function(name) {
            return find(name);
          });
        } else {
          component.dependencies = [];
        }
        return component;
      }

      function resolve(component) {
        var components = uniquenizeDependencies(getFlatDependencies(component));

        components = components.sort(function(left, right) {
          if (left.order === right.order) {
            return 0;
          }
          return left.order - right.order < 0 ? -1 : 1;
        });

        console.log(component.name + ':');
        for (var i = 0; i < components.length; i++) {
          console.log(' -> ' + components[i].name + '#' + components[i].order);
        }

        component.resolvedCss = components.map(function(component) {
          return component.css;
        }).join('\n');

        return component;

        function getFlatDependencies(component) {
          return Array.prototype.concat.apply([component], component.dependencies.map(function(component) {
            return component.dependencies.length > 0 ? [component].concat(getFlatDependencies(component)) : [component];
          }));
        }

        function uniquenizeDependencies(dependencies) {
          var dict = {};
          dependencies.forEach(function(dependency) {
            dict[dependency.name] = dependency;
          });

          return Object.keys(dict).map(function(name) {
            return dict[name];
          });
        }
      }
    }
  };

  return parser;
});
