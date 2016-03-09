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
import elementReady from './element-ready';

function getElementClass() {
  if (typeof HTMLElement !== 'function') {
    const BaseElement = () => {};
    BaseElement.prototype = document.createElement('div');
    return BaseElement;
  } else {
    return HTMLElement;
  }
}

export default class BaseElement extends getElementClass() {

  constructor() {
    super();
  }

  createdCallback() {
    if (this._createdCallback) {
      elementReady(this, this._createdCallback.bind(this));
    }
  }

  attachedCallback() {
    if (this._attachedCallback) {
      elementReady(this, this._attachedCallback.bind(this));
    }
  }

  detachedCallback() {
    if (this._detachedCallback) {
      elementReady(this, this._detachedCallback.bind(this));
    }
  }

  attributeChangedCallback(name, last, current) {
    if (this._attributeChangedCallback) {
      elementReady(this, () => this._attributeChangedCallback(name, last, current));
    }
  }
}
