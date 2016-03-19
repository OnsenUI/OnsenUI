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

import TemplateLoader from './template-loader';

export default class DefaultTemplateLoader extends TemplateLoader {

  constructor() {
    super();

    this._store = new Map();
    this._initListeners();
  }

  _initListeners() {
    window.document.addEventListener('_templateloaded', e => {
      if (e.target.nodeName.toLowerCase() === 'ons-template') {
        this._store.set(e.templateId, e.template);
      }
    }, false);

    window.document.addEventListener('DOMContentLoaded', () => {
      const register = query => {
        const templates = window.document.querySelectorAll(query);
        for (let i = 0; i < templates.length; i++) {
          this._store.set(templates[i].getAttribute('id'), templates[i].textContent);
        }
      };

      register('script[type="text/ons-template"]');
      register('script[type="text/template"]');
      register('script[type="text/ng-template"]');
    }, false);
  }

  loadPageBefore(page, parent, element, callback) {
    // TODO: 真面目に実装する

    const template = this._store.get(page);
    const pageElement = this._createElement(template);

    parent.insertBefore(pageElement, element);

    callback(pageElement);

    return Promise.resolve(pageElement);
  }

  unload(element) {
    element.remove();

    return Promise.resolve();
  }

  _createElement(template) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = template;
    return wrapper.children[0];
  }

}
