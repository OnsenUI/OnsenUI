/*
Copyright 2013-2016 ASIAL CORPORATION

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

import internal from '../../ons/internal';

/**
 * @class AnimatorCSS - implementation of Animator class using css transitions
 */
class AnimatorCSS {

  /**
   * @method animate
   * @desc main animation function
   * @param {Element} element
   * @param {Object} finalCSS
   * @param {number} [duration=200] - duration in milliseconds
   * @return {Object} result
   * @return {Function} result.then(callback) - sets a callback to be executed after the animation has stopped
   * @return {Function} result.stop(options) - stops the animation; if options.stopNext is true then it doesn't call the callback
   * @return {Function} result.finish(ms) - finishes the animation in the specified time in milliseconds
   * @return {Function} result.speed(ms) - sets the animation speed so that it finishes as if the original duration was the one specified here
   * @example
   * ````
   *  var result = animator.animate(el, {opacity: 0.5}, 1000);
   *
   *  el.addEventListener('click', function(e){
   *    result.speed(200).then(function(){
   *      console.log('done');
   *    });
   *  }, 300);
   * ````
   */
  animate(el, final, duration = 200) {
    var start = (new Date()).getTime(),
        initial = {},
        stopped = false,
        next = false,
        timeout = false,
        properties = Object.keys(final);

    var updateStyles = () => {
      let s = window.getComputedStyle(el);
      properties.forEach(s.getPropertyValue.bind(s));
      s = el.offsetHeight;
    };

    var result = {
      stop: (options = {}) => {
        timeout && clearTimeout(timeout);
        var k = Math.min(1, ((new Date()).getTime() - start) / duration);
        properties.forEach(i => {
          el.style[i] = (1 - k) * initial[i] + k * final[i] + (i == 'opacity' ? '' : 'px');
        });
        el.style.transitionDuration = '0s';

        if (options.stopNext) {
          next = false;
        } else if (!stopped) {
          stopped = true;
          next && next();
        }
        return result;
      },
      then: (cb) => {
        next = cb;
        if (stopped) {
          next && next();
        }
        return result;
      },
      speed: (newDuration) => {
        if (internal.config.animationsDisabled) {
          newDuration = 0;
        }
        if (!stopped) {
          timeout && clearTimeout(timeout);

          const passed = (new Date()).getTime() - start;
          const  k = passed / duration;
          const remaining = newDuration * (1 - k);

          properties.forEach(i => {
            el.style[i] = (1 - k) * initial[i] + k * final[i] + (i == 'opacity' ? '' : 'px');
          });

          updateStyles();

          start = el.speedUpTime;
          duration = remaining;

          el.style.transitionDuration = duration / 1000 + 's';

          properties.forEach(i => {
            el.style[i] = final[i] + (i == 'opacity' ? '' : 'px');
          });

          timeout = setTimeout(result.stop, remaining);
        }
        return result;
      },
      finish: (milliseconds = 50) => {
        var k = ((new Date()).getTime() - start) / duration;

        result.speed(milliseconds / (1 - k));
        return result;
      }
    };

    if (el.hasAttribute('disabled') || stopped || internal.config.animationsDisabled) {
      return result;
    }

    var style = window.getComputedStyle(el);
    properties.forEach(e => {
      const v = parseFloat(style.getPropertyValue(e));
      initial[e] = isNaN(v) ? 0 : v;
    });


    if (!stopped) {
      el.style.transitionProperty = properties.join(',');
      el.style.transitionDuration = duration / 1000 + 's';

      properties.forEach(e => {
        el.style[e] = final[e] + (e == 'opacity' ? '' : 'px');
      });
    }

    timeout = setTimeout(result.stop, duration);
    this._onStopAnimations(el, result.stop);

    return result;
  }

  constructor() {
    this._queue = [];
    this._index = 0;
  }

  _onStopAnimations(el, listener) {
    var queue = this._queue;
    var i = this._index++;
    queue[el] = queue[el] || [];
    queue[el][i] = (options) => {
      delete queue[el][i];
      if (queue[el] && queue[el].length == 0) {
        delete queue[el];
      }
      return listener(options);
    };
  }

  /**
  * @method stopAnimations
  * @desc stops active animations on a specified element
  * @param {Element|Array} element - element or array of elements
  * @param {Object} [options={}]
  * @param {Boolean} [options.stopNext] - the callbacks after the animations won't be called if this option is true
  */
  stopAnimations(el, options = {}) {
    if (Array.isArray(el)) {
      return el.forEach(el => {
        this.stopAnimations(el, options);
      });
    }

    (this._queue[el] || []).forEach(e => { e(options || {}); });
  }

  /**
  * @method stopAll
  * @desc stops all active animations
  * @param {Object} [options={}]
  * @param {Boolean} [options.stopNext] - the callbacks after the animations won't be called if this option is true
  */
  stopAll(options = {}) {
    this.stopAnimations(Object.keys(this._queue), options);
  }

  /**
  * @method fade
  * @desc fades the element (short version for animate(el, {opacity: 0}))
  * @param {Element} element
  * @param {number} [duration=200]
  */
  fade(el, duration = 200) {
    return this.animate(el, {opacity: 0}, duration);
  }

}

export default AnimatorCSS;

