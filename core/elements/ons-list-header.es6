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

(() => {
  'use strict';

  var scheme = {'': 'list__header--*'};

  class ListHeaderElement extends ons._BaseElement {
    createdCallback() {
      this.classList.add('list__header');
      ModifierUtil.initModifier(this, scheme);
    }

    attributeChangedCallback(name, last, current) {
      if (name === 'modifier') {
        return ModifierUtil.onModifierChanged(last, current, this, scheme);
      }
    }
  }

  if (!window.OnsListHeader) {
    window.OnsListHeader = document.registerElement('ons-list-header', {
      prototype: ListHeaderElement.prototype
    });
  }
})();
