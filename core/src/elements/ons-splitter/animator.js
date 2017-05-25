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

import util from '../../ons/util';
import contentReady from '../../ons/content-ready';
import animit from '../../ons/animit';
import BaseAnimator from '../../ons/base-animator';

export default class SplitterAnimator extends BaseAnimator {

  constructor({timing = 'cubic-bezier(.1, .7, .1, 1)', duration = 0.3, delay = 0} = {}) {
    super({ timing, duration, delay });
  }

  updateOptions(options = {}) {
    util.extend(this, {
      timing: this.timing, duration: this.duration, delay: this.delay
    }, options);
  }

  /**
   * @param {Element} sideElement
   */
  activate(sideElement) {
    const splitter = sideElement.parentNode;

    contentReady(splitter, () => {
      this._side = sideElement;
      this._oppositeSide = splitter.right !== sideElement && splitter.right || splitter.left !== sideElement && splitter.left;
      this._content = splitter.content;
      this._mask = splitter.mask;
    });
  }

  deactivate() {
    this.clearTransition();
    this._mask && this.clearMask();
    this._content = this._side = this._oppositeSide = this._mask = null;
  }

  get minus() {
    return this._side._side === 'right' ? '-' : '';
  }

  clearTransition() {
    this._side && (this._side.style.transform = this._side.style.transition = this._side.style.webkitTransition = '');
    this._mask && (this._mask.style.transform = this._mask.style.transition = this._mask.style.webkitTransition = '');
    this._content && (this._content.style.transform = this._content.style.transition = this._content.style.webkitTransition = '');
  }

  clearMask() {
    // Check if the other side needs the mask before clearing
    if (!this._oppositeSide || this._oppositeSide.mode === 'split' || !this._oppositeSide.isOpen) {
      this._mask.style.opacity = '';
      this._mask.style.display = 'none';
    }
  }

  /**
   * @param {Number} distance
   */
  translate(distance) {

  }

  /**
   * @param {Function} done
   */
  open(done) {
    done();
  }

  /**
   * @param {Function} done
   */
  close(done) {
    done();
  }
}
