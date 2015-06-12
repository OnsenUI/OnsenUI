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

  class AsyncHook {

    constructor() {
      this._callbacks = [];
      this._freezed = false;
    }

    /**
     * @param {Function} callback A function receive a function that receive result object and target object optinally
     * @return {Function} pass-through callback parameter
     * @example
     *   asyncHook.add((next, target) => next(target + target));
     *   asyncHook.run(result => console.log(result), 2); // print 4
     */
    add(callback) {
      if (this._freezed) {
        throw new Error('This hook is freezed.');
      }
      this._callbacks.push(callback);
      return callback;
    }

    /**
     * @param {Function} callback A function receive a function that receive result object and target object optinally
     * @return {Boolean}
     */
    remove(callback) {
      if (this._freezed) {
        throw new Error('This hook is freezed.');
      }
      var index = this._callbacks.indexOf(callback);
      if (index !== -1) {
        this._callbacks.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }

    /**
     * Freeze this hook. AsyncHook deny add() and remove() operation after this method is invoked.
     */
    freeze() {
      this._freezed = true;
    }

    /**
     * @param {Function} callback A function receive target object optionally.
     * @param {Object} [target]
     */
    run(callback, target) {
      var i = 0;
      var f = () => {
        if (i < this._callbacks.length) {
          this._callbacks[i]((newTarget) => {
            target = newTarget;
            i++;
            f();
          }, target);
        } else {
          callback(target);
        }
      };
      f();
    }
  }

  ons._internal = ons._internal || {};
  ons._internal.AsyncHook = AsyncHook;

})(window.ons = window.ons || {});
