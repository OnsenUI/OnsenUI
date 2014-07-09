/*
Copyright 2013-2014 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc directive
 * @id switch
 * @name ons-switch
 * @description
 * Switch component.
 * @param disabled Wether the switch shoud be disabled.
 * @param checked Wether the switch is checked.
 * @param var Variable name to refer this switch.
 * @param modifier Modifier name.
 * @property isChecked()
 * @property setChecked(isChecked)
 * @property getCheckboxElement() Get inner input[type=checkbox] element.
 * @property on(eventName, listener) Added an event listener. Preset event is 'chage'.
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSwitch', function($onsen, SwitchView) {
    return {
      restrict: 'E',
      replace: false,

      transclude: false,
      scope: true,

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/switch.tpl',
      compile: function(element) {
        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          var switchView = new SwitchView(element, scope, attrs);
          var checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
          attrs.$observe('checked', function(checked) {
            scope.model = !!element.attr('checked');
          });

          attrs.$observe('name', function(name) {
            if (!!element.attr('name')) {
              checkbox.attr('name', name);
            }
          });

          if (attrs.ngModel) {
            scope.$parent.$watch(attrs.ngModel, function(value) {
              scope.model = value;
            });

            scope.$watch('model', function(model) {
              scope.$parent[attrs.ngModel] = model;
            });

            scope.$parent[attrs.ngModel] = !!element.attr('checked');
          }

          $onsen.declareVarAttribute(attrs, switchView);
          $onsen.aliasStack.register('ons.switch', switchView);
          element.data('ons-switch', switchView);

          scope.$on('$destroy', function() {
            element.data('ons-switch', undefined);
            $onsen.aliasStack.unregister('ons.navigator', navigator);
          });
        };
      }
    };
  });
})();
