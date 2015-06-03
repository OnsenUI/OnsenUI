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

((ons) => {
  'use strict';

  class AnimatorFactory {

    /**
     * @param {Object} opts
     * @param {Object} opts.animators The dictionary for animator classes
     * @param {Function} opts.baseClass The base class of animators
     * @param {String} opts.baseClassName The name of the base class of animators
     * @param {String} opts.defaultAnimation The default animation name
     * @param {Object} opts.defaultAnimationOptions The default animation options
     */
    constructor(opts) {
      this._animators = opts.animators;
      this._baseClass = opts.baseClass;
      this._baseClassName = opts.baseClassName || opts.baseClass.name;
      this._animation = opts.defaultAnimation || 'default';
      this._animationOptions = opts.defaultAnimationOptions || {};

      if (!this._animators[this._animation]) {
        throw new Error('No such animation: ' + this._animation);
      }
    }

    /**
     * @param {String} jsonString
     * @return {Object/null}
     */
    static parseJSONSafely(jsonString) {
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        return null;
      }
    }

    /**
     * @param {Object} options
     */
    setAnimationOptions(options) {
      this._animationOptions = options;
    }

    /**
     * @param {Object} options
     * @param {String} [options.animation] The animation name
     * @param {Object} [options.animationOptions] The animation options
     * @param {Object} defaultAnimator The default animator instance
     * @return {Object} An animator instance
     */
    newAnimator(options, defaultAnimator) {
      options = options || {};

      var animator = null;

      if (options.animation instanceof this._baseClass) {
        return options.animation;
      }

      var Animator = null;

      if (typeof options.animation === 'string') {
        Animator = this._animators[options.animation];
      }

      if (!Animator && defaultAnimator) {
        animator = defaultAnimator;
      } else {
        Animator = Animator || this._animators[this._animation];

        var animationOpts = ons._util.extend(
          {},
          this._animationOptions,
          options.animationOptions || {},
          ons._config.animationsDisabled ? {duration: 0, delay: 0} : {}
        );

        animator = new Animator(animationOpts);
      }

      if (!(animator instanceof this._baseClass)) {
        throw new Error('"animator" is not an instance of ' + this._baseClassName + '.');
      }

      return animator;
    }
  }

  ons._internal = ons._internal || {};
  ons._internal.AnimatorFactory = AnimatorFactory;

})(window.ons = window.ons || {});
