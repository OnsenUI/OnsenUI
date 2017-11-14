/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediately, no mystery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

/** NOTE: This library is customized for Onsen UI. */

var MicroEvent = function MicroEvent() {};
MicroEvent.prototype = {
  on: function on(event, fct) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  once: function once(event, fct) {
    var self = this;
    var wrapper = function wrapper() {
      self.off(event, wrapper);
      return fct.apply(null, arguments);
    };
    this.on(event, wrapper);
  },
  off: function off(event, fct) {
    this._events = this._events || {};
    if (event in this._events === false) {
      return;
    }

    this._events[event] = this._events[event].filter(function (_fct) {
      if (fct) {
        return fct !== _fct;
      } else {
        return false;
      }
    });
  },
  emit: function emit(event /* , args... */) {
    this._events = this._events || {};
    if (event in this._events === false) {
      return;
    }
    for (var i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin = function (destObject) {
  var props = ['on', 'once', 'off', 'emit'];
  for (var i = 0; i < props.length; i++) {
    if (typeof destObject === 'function') {
      destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
    } else {
      destObject[props[i]] = MicroEvent.prototype[props[i]];
    }
  }
};

window.MicroEvent = MicroEvent;
export default MicroEvent;