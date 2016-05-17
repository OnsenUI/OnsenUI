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

  _animate(element, {from, to, after, options, callback, restore = false, animation}) {
    options = util.extend({}, this.options, options);

    if (animation) {
      from = animation.from;
      to = animation.to;
    }

    animation = animit(element);
    if (restore) {
      animation = animation.saveStyle();
    }
    if (from) {
      animation = animation.queue(from);
    }
    animation = animation.wait(options.delay).queue({
      css: to,
      duration: options.duration,
      timing: options.timing
    });
    if (restore) {
      animation = animation.restoreStyle();
    }
    if (after) {
      animation = animation.queue({css: after});
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
