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
import animit from '../../ons/animit';
import BaseAnimator from '../../ons/base-animator';

export class PopoverAnimator extends BaseAnimator {

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  constructor({timing = 'cubic-bezier(.1, .7, .4, 1)', delay = 0, duration = 0.2} = {}) {
    super({ timing, delay, duration });
  }

  show(popover, callback) {
    callback();
  }

  hide(popover, callback) {
    callback();
  }

  _animate(element, {from, to, options, callback, restore = false, animation}) {
    options = util.extend({}, this.options, options);

    if (animation) {
      from = animation.from;
      to = animation.to;
    }

    animation = animit(element);
    if (restore) {
      animation = animation.saveStyle();
    }
    animation = animation.queue(from).wait(this.delay).queue({
      css: to,
      duration: this.duration,
      timing: this.timing
    });
    if (restore) {
      animation = animation.restoreStyle();
    }
    if (callback) {
      animation = animation.queue((done) => {
        callback();
        done();
      });
    }
    return animation;
  }

  _animateAll(element, animations) {
    Object.keys(animations).forEach(key => this._animate(element[key], animations[key]).play());
  }

}

const fade = {
  out: {
    from: {opacity: 1.0},
    to: {opacity: 0}
  },
  in: {
    from: {opacity: 0},
    to: {opacity: 1.0}
  }
};

export class MDFadePopoverAnimator extends PopoverAnimator {
  show(popover, callback) {
    this._animateAll(popover, {
      _mask: fade.in,
      _popover: {animation: fade.in, restore: true, callback}
    });
  }

  hide(popover, callback) {
    this._animateAll(popover, {
      _mask: fade.out,
      _popover: {animation: fade.out, restore: true, callback}
    });
  }
}

export class IOSFadePopoverAnimator extends MDFadePopoverAnimator {
  show(popover, callback) {
    this._animateAll(popover, {
      _mask: fade.in,
      _popover: {
        from: {
          transform: 'scale3d(1.3, 1.3, 1.0)',
          opacity: 0
        },
        to: {
          transform: 'scale3d(1.0, 1.0,  1.0)',
          opacity: 1.0
        },
        restore: true,
        callback
      }
    });
  }
}
