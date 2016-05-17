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

export default class AnimatorFactory {

  /**
   * @param {Object} element
   * @param {Object} options
   * @param {Object} options.animators The dictionary for animator classes
   * @param {Object} options.methods
   */
  constructor(element, options) {
    this._element = element;
    this._animators = options.animators;
    this._methods = options.methods;
  }

  getAnimator(animation) {
    while (typeof animation === 'function') {
      animation = new animation(); // eslint-disable-line new-cap
    }
    if (typeof animation === 'string') {
      return this.getAnimator(this._animators[animation]);
    }
    if (!animation) {
      throw new Error('animation not found');
    }
    if (this._methods.every(e => typeof animation[e] === 'function')) {
      return animation;
    }
    throw new Error(`"animator" is missing some of these methods: ${JSON.stringify(this._methods)}.`);
  }

  getAnimatorOptions(options) {
    return util.extend(
      {},
      util.getAnimationOptions(this._element),
      this._animationOptions || {},
      options.animationOptions || {},
      internal.config.animationsDisabled ? {duration: 0, delay: 0} : {}
    );
  }

  newAnimator(options = {}) {
    const animator = this.getAnimator(options.animation || this._element.getAttribute('animation') || 'default');
    animator.options = util.extend(animator.options || {}, this.getAnimatorOptions(options));
    return animator;
  }

  addAnimator(name, Animator) {
    if (typeof Animator !== 'function') {
      Animator = Class.extend(Animator);
    }
    if (typeof Animator === 'function') {
      // let animator = new Animator();

      this.getAnimator.call({
        _animators: util.extend({}, this._animators, {[name]: Animator}),
        _methods: this._methods
      }, name);

      this._animators[name] = Animator;
    }
  }

  /**
   * @param {String} jsonString
   * @return {Object/null}
   */
  static parseAnimationOptionsString(jsonString) {
    return util.animationOptionsParse(jsonString);
  }
}
