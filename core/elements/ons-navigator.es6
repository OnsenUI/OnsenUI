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

  class NavigatorPage {

    /**
     * @param {Object} params
     * @param {Object} params.page
     * @param {Object} params.element
     * @param {Object} params.pageScope
     * @param {Object} params.options
     * @param {Object} params.navigator
     */
    constructor(params) {
      this.page = params.page;
      this.name = params.page;
      this.element = params.element;
      this.pageScope = params.pageScope;
      this.options = params.options;
      this.navigator = params.navigator;

      // Block events while page is being animated to stop scrolling, pressing buttons, etc.
      this._blockEvents = (event) => {
        if (this.navigator._isPopping || this.navigator._isPushing) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      this.element.on(this._pointerEvents, this._blockEvents);
    }

    get _pointerEvents() {
      return 'touchstart touchend touchmove click';
    }

    /**
     * @return {PageView}
     */
    getPageView() {
      if (!this._pageView) {
        this._pageView = this.element.inheritedData('ons-page');
        if (!this._pageView) {
          throw new Error('Fail to fetch PageView from ons-page element.');
        }
      }
      return this._pageView;
    }

    destroy() {
      this.pageScope.$destroy();

      this.element.off(this._pointerEvents, this._blockEvents);
      this.element.remove();
      this.element = null;

      this._pageView = null;
      this.pageScope = null;
      this.options = null;

      var index = this.navigator.pages.indexOf(this);
      if (index !== -1) {
        this.navigator.pages.splice(index, 1);
      }

      this.navigator = null;
    }
  }

  var scheme = {
  };
  var ModifierUtil = ons._internal.ModifierUtil;

  class NavigatorElement extends ons._BaseElement {
    createdCallback() {
    }

    attributeChangedCallback(name, last, current) {
    }

    attachedCallback() {
    }

    detachedCallback() {

    }
  }

  if (!window.NavigatorElement) {
    window.OnsNavigatorElement = document.registerElement('ons-navigator', {
      prototype: NavigatorElement.prototype
    });
  }
  window.ons._internal.NavigatorPage = NavigatorPage;
})();
