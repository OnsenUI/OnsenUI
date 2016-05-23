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

export default class BaseAnimator {

  constructor(options = {}) {
    this.options = util.extend({timing: 'linear', duration: 0.2, delay: 0}, ...arguments);
    util.extend(this, this.options);
  }

  _animate(element, options) {
    options = util.extend({}, this.options, options, options.animation);
    const {from, to, after, restore, duration, delay, timing} = options;
    let callback = options.callback;

    let animation = animit(element);
    if (restore) {
      animation = animation.saveStyle();
    }
    if (from) {
      animation = animation.queue(from);
    }
    animation = animation.wait(delay).queue({
      css: to,
      duration: duration,
      timing: timing
    });
    if (restore) {
      animation = animation.restoreStyle();
    }
    if (after) {
      if (typeof after !== 'function') {
        animation = animation.queue({css: after});
      } else {
        callback = callback ? () => {after(element); options.callback();} : () => after(element);
      }
    }

    if (callback) {
      animation = animation.queue(done => {
        callback();
        done();
      });
    }
    return animation;
  }

  _animateAll(elements, animations) {
    util.each(animations, (key, animation) => {
      animation = util.extend({}, animation, {
        callback: animation.callback === true ? this.callback : animation.callback
      });
      this._animate(elements[key], animation).play()
    });
  }

  animate(options, elements, animations) {
    if (arguments.length < 3) {
      animations = elements;
      elements = options.elements || options.element || options;
      // options = util.filter(options, ['from', 'to', 'after', 'duration', 'delay', 'timing', 'animation', 'callback']);
    }
    if (Array.isArray(elements)) {
      return this._animate(elements, animations).play();
    }

    util.each(animations, (key, animation) => {
      animation = util.extend({}, options, animation, {
        callback: animation.callback === true ? options.callback : animation.callback
      });
      this._animate(elements[key], animation).play();
    });
  }
}

export const animate = (...args) => (new BaseAnimator()).animate(...args);
