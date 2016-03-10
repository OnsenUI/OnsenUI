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

'use strict';

export class TemplateLoader {

  /**
   * @param {String} page
   * @param {Element} parent
   * @param {Number} position
   * @param {Function} callback
   * @return {Promise} resolve element
   */
  loadPage(page, parent, position, callback) {
    throw new Error('implements this method'); // eslint-disable-line no-unreachable
  }

  /**
   * @param {Element} element
   * @return {Promise}
   */
  unload(element) {
    throw new Error('implements this method'); // eslint-disable-line no-unreachable
  }
}

export class GlobalTemplateLoader {

  installImplementation(loader) {
    if (!(loader instanceof TemplateLoader)) {
      throw new Error('"loader" parameter must be an instance of TemplateLoader.');
    }
    this._loader = loader;
  }

  /**
   * @param {String} page
   * @param {Element} parent
   * @param {Function} callback
   * @param {Number} position
   * @return {Promise} resolve element
   */
  loadPage(page, parent, position, callback) {
    return this._loader.load(page, parent, position, callback);
  }

  /**
   * @param {Element} element
   * @return {Promise}
   */
  unload(element) {
    return this._loader(element);
  }
}

const loader = new GlobalTemplateLoader();

export default loader;
