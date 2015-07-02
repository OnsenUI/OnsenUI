/*
Copyright 2013-2015 ASIAL CORPORATION

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

(function(){
  'use strict';

  angular.module('onsen').factory('AngularLazyRepeatDelegate', function($compile) {

    var AngularLazyRepeatDelegate = function() {
      AngularLazyRepeatDelegate.prototype.init.apply(this, arguments);
    };
    AngularLazyRepeatDelegate.prototype = Object.create(ons._internal.LazyRepeatDelegate.prototype);

    angular.extend(AngularLazyRepeatDelegate.prototype, {

      /**
       * @param {Element} templateElement
       * @param {Object} userDelegate
       * @param {Scope} parentScope
       */
      init: function(templateElement, userDelegate, parentScope) {
        this._templateElement = templateElement.cloneNode(true);
        this._userDelegate = userDelegate;
        this._parentScope = parentScope;

        this._removeLazyRepeatDirective();

        this._linker = $compile(this._templateElement.cloneNode(true));
      },

      /**
       * @return {Boolean}
       */
      _usingBinding: function() {
        if (this._userDelegate.configureItemScope) {
          return true;
        }

        if (this._userDelegate.createItemContent) {
          return false;
        }

        throw new Error('`lazy-repeat` delegate object is vague.');
      },

      _removeLazyRepeatDirective: function() {
        this._templateElement.removeAttribute('ons-lazy-repeat');
        this._templateElement.removeAttribute('ons:lazy:repeat');
        this._templateElement.removeAttribute('ons_lazy_repeat');
        this._templateElement.removeAttribute('data-ons-lazy-repeat');
        this._templateElement.removeAttribute('x-ons-lazy-repeat');
      },

      prepareItem: function(index, done) {
        var scope = this._parentScope.$new();
        this._addSpecialProperties(index, scope);

        if (this._usingBinding()) {
          this._userDelegate.configureItemScope(index, scope);
        }

        this._linker(scope, function(cloned) {
          cloned[0].style.display = 'none';

          if (!this._usingBinding()) {
            var contentElement = this._userDelegate.createItemContent(index, null);
            cloned.append(contentElement);
            $compile(cloned[0].firstChild)(scope);
          }

          done({
            element: cloned[0],
            scope: scope
          });

          scope.$evalAsync(function() {
            cloned[0].style.display = 'block';
          });

        }.bind(this));
      },

      /**
       * @param {Number} index
       * @param {Object} scope
       */
      _addSpecialProperties: function(index, scope) {
        scope.$index = index;
        scope.$first = index === 0;
        scope.$last = index === this.countItems() - 1;
        scope.$middle = !scope.$first && !scope.$last;
        scope.$even = index % 2 === 0;
        scope.$odd = !scope.$even;
      },

      countItems: function() {
        return this._userDelegate.countItems();
      },

      updateItem: function(index, item) {
        if (this._usingBinding()) {
          item.scope.$evalAsync(function() {
            this._userDelegate.configureItemScope(index, item.scope);
          }.bind(this));
        }
      },

      /**
       * @param {Number} index
       * @param {Object} item
       * @param {Object} item.scope
       * @param {Element} item.element
       */
      destroyItem: function(index, item) {
        if (this._usingBinding()) {
          if (this._userDelegate.destroyItemScope instanceof Function) {
            this._userDelegate.destroyItemScope(index, item.scope);
          }
        } else {
          if (this._userDelegate.destroyItemContent instanceof Function) {
            this._userDelegate.destroyItemContent(index, item.element);
          }
        }
        item.scope.$destroy();
      },

      destroy: function() {
        this._userDelegate = this._templateElement = this._scope = null;
      },

      calculateItemHeight: function(index) {
        return this._userDelegate.calculateItemHeight();
      }
    });

    return AngularLazyRepeatDelegate;
  });
})();
