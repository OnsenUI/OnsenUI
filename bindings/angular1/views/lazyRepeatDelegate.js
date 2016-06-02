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

    const directiveAttributes = ['ons-lazy-repeat', 'ons:lazy:repeat', 'ons_lazy_repeat', 'data-ons-lazy-repeat', 'x-ons-lazy-repeat'];
    class AngularLazyRepeatDelegate extends ons._internal.LazyRepeatDelegate {
      /**
       * @param {Object} userDelegate
       * @param {Element} templateElement
       * @param {Scope} parentScope
       */
      constructor(userDelegate, templateElement, parentScope) {
        super(userDelegate, templateElement);
        this._parentScope = parentScope;

        directiveAttributes.forEach(attr => templateElement.removeAttribute(attr));
        this._linker = $compile(templateElement ? templateElement.cloneNode(true) : null);
      }

      configureItemScope(item, scope){
        if (this._userDelegate.configureItemScope instanceof Function) {
          this._userDelegate.configureItemScope(item, scope);
        }
      }

      destroyItemScope(item, element){
        if (this._userDelegate.destroyItemScope instanceof Function) {
          this._userDelegate.destroyItemScope(item, element);
        }
      }

      _usingBinding() {
        if (this._userDelegate.configureItemScope) {
          return true;
        }

        if (this._userDelegate.createItemContent) {
          return false;
        }

        throw new Error('`lazy-repeat` delegate object is vague.');
      }

      loadItemElement(index, parent, done) {
        this._prepareItemElement(index, ({element, scope}) => {
          parent.appendChild(element);
          done({element, scope});
        });
      }

      _prepareItemElement(index, done) {
        const scope = this._parentScope.$new();
        this._addSpecialProperties(index, scope);

        if (this._usingBinding()) {
          this.configureItemScope(index, scope);
        }

        this._linker(scope, (cloned) => {
          let element = cloned[0];
          if (!this._usingBinding()) {
            element = this._userDelegate.createItemContent(index, element);
            $compile(element)(scope);
          }

          done({element, scope});
        });
      }

      /**
       * @param {Number} index
       * @param {Object} scope
       */
      _addSpecialProperties(i, scope) {
        const last = this.countItems() - 1;
        angular.extend(scope, {
          $index: i,
          $first: i === 0,
          $last: i === last,
          $middle: i !== 0 && i !== last,
          $even: i % 2 === 0,
          $odd: i % 2 === 1
        });
      }

      updateItem(index, item) {
        if (this._usingBinding()) {
          item.scope.$evalAsync(() => this.configureItemScope(index, item.scope));
        } else {
          super.updateItem(index, item);
        }
      }

      /**
       * @param {Number} index
       * @param {Object} item
       * @param {Object} item.scope
       * @param {Element} item.element
       */
      destroyItem(index, item) {
        if (this._usingBinding()) {
          this.destroyItemScope(index, item.scope);
        } else {
          super.destroyItem(index, item.element);
        }
        item.scope.$destroy();
      }

      destroy() {
        super.destroy();
        this._scope = null;
      }

    }

    return AngularLazyRepeatDelegate;
  });
})();
