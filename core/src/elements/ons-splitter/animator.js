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
import BaseAnimator from 'ons/base-animator';

export default class SplitterAnimator extends BaseAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .1, 1)', duration: 0.3}, options));
  }

  updateOptions(options = {}) {
    util.extend(this.options, options);
  }

  /**
   * @param {Element} sideElement
   */
  activate(sideElement) {
    this._side = sideElement;
    this._mask = sideElement.parentNode.mask;
  }

  inactivate() {
    this._side = this._mask = null;
  }

  get minus() {
    return this._side._side === 'right' ? '-' : '';
  }

  translate(distance) {
    animit(this._side)
      .queue({
        transform: `translate3d(${this.minus + distance}px, 0px, 0px)`
      })
      .play();
  }

  open(callback) {
    this._animateAll(this, {
      _mask: {from: {display: 'block'}, to: {opacity: 1}, timing: 'linear'},
      _side: {to: {transform: `translate3d(${this.minus}100%, 0px, 0px)`}, callback},
    });
  }

  close(callback) {
    this._animateAll(this, {
      _mask: {to: {opacity: 0}, timing: 'linear', after: {display: 'none'}},
      _side: {to: {transform: 'translate3d(0, 0, 0)'}, callback}
    });
  }
}
