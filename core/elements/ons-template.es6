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

  class TemplateElement extends ons._BaseElement {
    createdCallback() {
      this.template = this.innerHTML;

      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }

    attachedCallback() {
      var event = new CustomEvent('_templateloaded', {bubbles: true, cancelable: true});
      event.template = this.template;
      event.templateId = this.getAttribute('id');

      this.dispatchEvent(event);
    }
  }

  if (!window.OnsTemplateElement) {
    window.OnsTemplateElement = document.registerElement('ons-template', {
      prototype: TemplateElement.prototype
    });
  }
})();
