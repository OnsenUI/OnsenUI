import _setImmediate from "babel-runtime/core-js/set-immediate";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

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

var ToastQueue = function () {
  function ToastQueue() {
    _classCallCheck(this, ToastQueue);

    this.queue = [];
  }

  _createClass(ToastQueue, [{
    key: "add",
    value: function add(fn, promise) {
      var _this = this;

      this.queue.push(fn);

      if (this.queue.length === 1) {
        _setImmediate(this.queue[0]);
      }

      promise.then(function () {
        _this.queue.shift();

        if (_this.queue.length > 0) {
          setTimeout(_this.queue[0], 1000 / 30); // Apply some visual delay
        }
      });
    }
  }]);

  return ToastQueue;
}();

export default new ToastQueue();