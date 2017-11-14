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

import NavigatorAnimator from './animator';

var NoneNavigatorAnimator = function (_NavigatorAnimator) {
  _inherits(NoneNavigatorAnimator, _NavigatorAnimator);

  function NoneNavigatorAnimator(options) {
    _classCallCheck(this, NoneNavigatorAnimator);

    return _possibleConstructorReturn(this, (NoneNavigatorAnimator.__proto__ || _Object$getPrototypeOf(NoneNavigatorAnimator)).call(this, options));
  }

  _createClass(NoneNavigatorAnimator, [{
    key: 'push',
    value: function push(enterPage, leavePage, callback) {
      callback();
    }
  }, {
    key: 'pop',
    value: function pop(enterPage, leavePage, callback) {
      callback();
    }
  }]);

  return NoneNavigatorAnimator;
}(NavigatorAnimator);

export default NoneNavigatorAnimator;