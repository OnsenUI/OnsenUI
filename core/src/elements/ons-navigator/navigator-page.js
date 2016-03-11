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

import util from 'ons/util';

export default class NavigatorPage {

  /**
   * @param {Object} params
   * @param {Object} params.page
   * @param {Object} [params.element]
   * @param {Object} params.options
   * @param {Object} params.navigator
   * @param {String} [params.initialContent]
   */
  constructor(params) {
    this.page = params.page;
    this.name = params.page;
    this._element = params.element || null;
    this.options = params.options;
    this.navigator = params.navigator;
    this.initialContent = params.initialContent || null;
    // TODO: fix
    this.backButton = this.element ? util.findChildRecursively(this.element, 'ons-back-button') : null;

    if (this.backButton) {
      CustomElements.upgrade(this.backButton);
    }

    // Block events while page is being animated to stop scrolling, pressing buttons, etc.
    this._blockEvents = (event) => {
      if (this.navigator._isPopping || this.navigator._isPushing) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    if (this._element) {
      this._pointerEvents.forEach(event => this.element.addEventListener(event, this._blockEvents), false);
    }
  }

  get element() {
    return this._element;
  }

  set element(element) {
    this._element = element;
    this.backButton = element ? util.findChildRecursively(element, 'ons-back-button') : null;
  }

  get _pointerEvents() {
    return ['touchmove'];
  }

  getDeviceBackButtonHandler() {
    return this._deviceBackButtonHandler;
  }

  /**
   * @return {PageView}
   */
  getPageView() {
    if (!this._page) {
      this._page = util.findParent('ons-page');
      if (!this._page) {
        throw new Error('Fail to fetch ons-page element.');
      }
    }
    return this._page;
  }

  updateBackButton() {
    if (this.backButton) {
      if (this.navigator._pages.length === 1 || this.options._forceHideBackButton) {
        this.backButton.hide();
        this.options._forceHideBackButton = false;
      } else {
        this.backButton.show();
      }
    }
  }

  destroy() {
    if (this._element) {
      this._pointerEvents.forEach(event => this._element.removeEventListener(event, this._blockEvents), false);
      this._element._destroy();
    }

    const index = this.navigator._pages.indexOf(this);
    if (index !== -1) {
      this.navigator._pages.splice(index, 1);
    }

    this._element = this._page = this.options = this.navigator = null;
  }
}
