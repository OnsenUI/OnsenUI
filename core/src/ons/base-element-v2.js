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

function getElementClass() {
  if (typeof HTMLElement !== 'function') { // case of Safari
    const BaseElementV2 = () => {};
    BaseElementV2.prototype = document.createElement('div');
    return BaseElementV2;
  } else {
    return HTMLElement;
  }
}

export default class BaseElementV2 extends getElementClass() {
  constructor() {
    super();

    this._initializing = false;
    this._initialized = false;
  }

  /**
   * Initialize this element.
   *
   * This method processes pre-existing child nodes and prepares base content required for other methods of this class.
   * Additional initialization can be achieved through incremental compilation.
   */
  _initialize() {
    if (this._initializing) { throw new Error('In _initialize, do not run functions which should be run after initialized'); }
    this._initializing = true;

    // Save and remove pre-existing child nodes
    if (this.childNodes.length > 0 || this.attributes.length > 0) { // If pre-existing child nodes are detected or attributes are detected
      // Pattern 1: Created by initial parse tree or innerHTML

      // Save pre-existing child nodes
      this._preExistingChildNodes = Array.prototype.slice.call(this.childNodes).map(node => node.cloneNode(true)); // deep clone

      // Remove pre-existing child nodes
      while (this.hasChildNodes()) {
        this.removeChild(this.lastChild);
      }
    } else {
      // Pattern 2: Created by createElement
    }

    // Prepare base content
    this._prepareBaseContent();

    // Restore pre-existing child nodes with incremental compilation
    if (this._preExistingChildNodes) {
      for (const staticChildNode of this._preExistingChildNodes) {
        this._incrementalCompile(staticChildNode);
      }
    }

    this._initialized = true;
    this._initializing = false;
  }

  // FIXME: When we use this method, `Cannot read property 'call' of undefined` happens due to Babel or something.
  //
  // _initializeAsNeeded() {
  //   if (!this._initialized && !this._initializing) {
  //     super._initialize();
  //   }
  // }

  _prepareBaseContent() {
  }

  _incrementalCompile(node) {
    this.appendChild(node); // default behavior
  }

  appendChild(node) {
    if (!this._initialized && !this._initializing) { this._initialize(); }

    if (this._initializing) {
      super.appendChild(node);
    } else {
      this._incrementalCompile(node);
    }
  }

  insertBefore(...args) {
    if (!this._initialized && !this._initializing) { this._initialize(); }

    super.insertBefore.apply(this, args);
  }

  get classList() {
    if (!this._initialized && !this._initializing) { this._initialize(); }

    return super.classList;
  }

  hasAttribute(...args) {
    if (!this._initialized && !this._initializing) { this._initialize(); }

    return super.hasAttribute.apply(this, args);
  }
}
