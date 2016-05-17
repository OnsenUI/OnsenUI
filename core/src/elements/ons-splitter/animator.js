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
import contentReady from 'ons/content-ready';

export default class SplitterAnimator {

  constructor(options = {}) {
    this._options = {
      timing: 'cubic-bezier(.1, .7, .1, 1)',
      duration: '0.3',
      delay: '0'
    };
    this.updateOptions(options);
  }

  updateOptions(options = {}) {
    util.extend(this._options, options);
    this._timing = this._options.timing;
    this._duration = this._options.duration;
    this._delay = this._options.delay;
  }

  /**
   * @param {Element} sideElement
   */
  activate(sideElement) {
    const splitter = sideElement.parentNode;

    contentReady(splitter, () => {
      this._side = sideElement;
      this._content = splitter.content;
      this._mask = splitter.mask;
    });
  }

  inactivate() {
    this._content = this._side = this._mask = null;
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

  /**
   * @param {Function} done
   */
  open(done) {
    animit.runAll(
      animit(this._side)
        .wait(this._delay)
        .queue({
          transform: `translate3d(${this.minus}100%, 0px, 0px)`
        }, {
          duration: this._duration,
          timing: this._timing
        })
        .queue(callback => {
          callback();
          done && done();
        }),

      animit(this._mask)
        .wait(this._delay)
        .queue({
          display: 'block'
        })
        .queue({
          opacity: '1'
        }, {
          duration: this._duration,
          timing: 'linear',
        })
    );
  }

  /**
   * @param {Function} done
   */
  close(done) {

    animit.runAll(
      animit(this._side)
        .wait(this._delay)
        .queue({
          transform: 'translate3d(0px, 0px, 0px)'
        }, {
          duration: this._duration,
          timing: this._timing
        })
        .queue(callback => {
          this._side.style.webkitTransition = '';
          done && done();
          callback();
        }),

      animit(this._mask)
        .wait(this._delay)
        .queue({
          opacity: '0'
        }, {
          duration: this._duration,
          timing: 'linear',
        })
        .queue({
          display: 'none'
        })
    );
  }
}
