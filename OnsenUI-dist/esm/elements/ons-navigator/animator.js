import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
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
import BaseAnimator from '../../ons/base-animator';

var NavigatorAnimator = function (_BaseAnimator) {
  _inherits(NavigatorAnimator, _BaseAnimator);

  /**
   * @param {Object} options
   * @param {String} options.timing
   * @param {Number} options.duration
   * @param {Number} options.delay
   */
  function NavigatorAnimator(options) {
    _classCallCheck(this, NavigatorAnimator);

    options = util.extend({
      timing: 'linear',
      duration: '0.4',
      delay: '0'
    }, options || {});

    return _possibleConstructorReturn(this, (NavigatorAnimator.__proto__ || _Object$getPrototypeOf(NavigatorAnimator)).call(this, options));
  }

  _createClass(NavigatorAnimator, [{
    key: 'push',
    value: function push(enterPage, leavePage, callback) {
      callback();
    }
  }, {
    key: 'pop',
    value: function pop(enterPage, leavePage, callback) {
      callback();
    }
  }, {
    key: 'block',
    value: function block(page) {
      var blocker = util.createElement('\n      <div style="position: absolute; background-color: transparent; width: 100%; height: 100%; z-index: 100000"></div>\n    ');
      page.parentNode.appendChild(blocker);
      return function () {
        return blocker.remove();
      };
    }
  }]);

  return NavigatorAnimator;
}(BaseAnimator);

export default NavigatorAnimator;