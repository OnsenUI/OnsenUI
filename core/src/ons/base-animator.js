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

import util from './util';

export default class BaseAnimator {

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  constructor(options = {}) {
    this.timing = options.timing || 'linear';
    this.duration = options.duration || 0;
    this.delay = options.delay || 0;
  }

  static extend(properties = {}) {
    const extendedAnimator = this;
    const newAnimator = function() {
      extendedAnimator.apply(this, arguments);
      util.extend(this, properties);
    };

    newAnimator.prototype = this.prototype;
    return newAnimator;
  }
}

