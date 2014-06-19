/*
Copyright 2013-2014 ASIAL CORPORATION

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


window.DoorLock = (function() {
  /**
   * Door locking system.
   *
   * @param {Object} [options]
   * @param {Function} [options.log]
   */
  var DoorLock = function(options) {
    options = options || {};
    this._lockList = [];
    this._waitList = [];
    this._log = options.log || function() {};
  };

  DoorLock.generateId = (function() {
    var i = 0;
    return function() {
      return i++;
    };
  })();

  DoorLock.prototype = {
    /**
     * Register a lock.
     *
     * @return {Function} Callback for unlocking.
     */
    lock: function() {
      var self = this;
      var unlock = function() {
        self._unlock(unlock);
      };
      unlock.id = DoorLock.generateId();
      this._lockList.push(unlock);
      this._log('lock: ' + (unlock.id));

      return unlock;
    },

    _unlock: function(fn) {
      var index = this._lockList.indexOf(fn);
      if (index === -1) {
        throw new Error('This function is not registered in the lock list.');
      }

      this._lockList.splice(index, 1);
      this._log('unlock: ' + fn.id);

      this._tryToFreeWaitList();
    },

    _tryToFreeWaitList: function() {
      while (!this.isLocked() && this._waitList.length > 0) {
        this._waitList.shift()();
      }
    },

    /**
     * Register a callback for waiting unlocked door.
     *
     * @params {Function} callback Callback on unlocking the door completely.
     */
    waitUnlock: function(callback) {
      if (!(callback instanceof Function)) {
        throw new Error('The callback param must be a function.');
      }

      if (this.isLocked()) {
        this._waitList.push(callback);
      } else {
        callback();
      }
    },

    /**
     * @return {Boolean}
     */
    isLocked: function() {
      return this._lockList.length > 0;
    }
  };

  return DoorLock;

})();
