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

import util from '../util';
import internal from '../internal';
import platform from '../platform';
import BaseAnimator from '../base-animator';

const platformSuffix = () => platform.isAndroid() ? '-md' : '-ios';

const newBaseClass = methods => {
  class Base extends BaseAnimator {}
  methods.forEach(method => {
    Base.prototype[method] = function (options = {}) {
      if (typeof options.callback === 'function') {
        options.callback();
      }
    }
  });
  return Base;
}

export default class AnimatorFactory {

  /**
   * @param {Object} element
   * @param {Object} options
   * @param {Object} options.animators The dictionary for animator classes
   * @param {Object} options.methods
   */
  constructor(options) {
    this.methods = options.methods;
    this.base = options.base || newBaseClass(this.methods);
    this.animators = {} //options.animators;
    util.each(options.animators, (name, Animator) => {
      if (typeof Animator === 'string') {
        this.animators[name] = Animator;
      } else {
        this.addAnimator(name, Animator);
      }
    })
    this.animators.none = this.animators.none || this.base;
  }

  getAnimator(animation, options = {}) {
    while (typeof animation === 'function') {
      animation = new animation(options); // eslint-disable-line new-cap
    }
    if (typeof animation === 'string') {
      if (this.animators[animation]) {
        return this.getAnimator(this.animators[animation], options);
      }
      return this.getAnimator(this.animators[animation + platformSuffix()], options);
    }
    if (!animation) {
      throw new Error('animation not found');
    }
    if (this.methods.every(e => typeof animation[e] === 'function')) {
      return animation;
    }
    throw new Error(`"animator" is missing some of these methods: ${JSON.stringify(this.methods)}.`);
  }

  getAnimatorOptions(element, options) {
    return util.extend(
      util.getAnimationOptions(element, options),
      internal.config.animationsDisabled ? {duration: 0, delay: 0} : {}
    );
  }

  newAnimator(element, options = {}) {
    options = util.extend({element}, options, this.getAnimatorOptions(element, options));
    delete options.animationOptions;
    return this.getAnimator(options.animation || element.getAttribute('animation') || 'default', options);
  }

  addAnimator(name, Animator) {
    if (typeof Animator === 'object') {
      const config = Animator;
      const self = this;
      Animator = class CustomAnimator extends BaseAnimator {};
      util.each(config, (key, value) => {
        if (this.methods.indexOf(key) === -1) {
          return (Animator.prototype[key] = value);
        }
        Animator.prototype[key] = function (options) {
          options = util.extend({}, self.defaults, config.defaults, options);
          if (typeof config[key] === 'function') {
            return config[key].call(this, options);
          }
          return this.animate(options, config[key]);
        };
      });
    }

    if (typeof Animator === 'function') {
      this.getAnimator.call({
        animators: util.extend({}, this.animators, {[name]: Animator}),
        methods: this.methods,
        getAnimator: this.getAnimator
      }, name);

      this.animators[name] = Animator;
    }

  }

  assign(object) {
    util.extend(object, {
      addAnimator: (...args) => this.addAnimator(...args),
      baseAnimator: this.base
    });
  }
}

