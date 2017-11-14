import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
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

var BaseAnimator = function () {

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  function BaseAnimator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseAnimator);

    this.timing = options.timing || 'linear';
    this.duration = options.duration || 0;
    this.delay = options.delay || 0;
  }

  _createClass(BaseAnimator, null, [{
    key: 'extend',
    value: function extend() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var extendedAnimator = this;
      var newAnimator = function newAnimator() {
        extendedAnimator.apply(this, arguments);
        util.extend(this, properties);
      };

      newAnimator.prototype = this.prototype;
      return newAnimator;
    }
  }]);

  return BaseAnimator;
}();

export default BaseAnimator;