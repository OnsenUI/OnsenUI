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


/**
 * Minimal animation library for managing css transition on mobile browsers.
 */
'use strict';

var TIMEOUT_RATIO = 1.4;

var util = {
};

// capitalize string
util.capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @param {Object} params
 * @param {String} params.property
 * @param {Float} params.duration
 * @param {String} params.timing
 */
util.buildTransitionValue = function(params) {
  params.property = params.property || 'all';
  params.duration = params.duration || 0.4;
  params.timing = params.timing || 'linear';

  var props = params.property.split(/ +/);

  return props.map(function(prop) {
    return prop + ' ' + params.duration + 's ' + params.timing;
  }).join(', ');
};

/**
 * Add an event handler on "transitionend" event.
 */
util.onceOnTransitionEnd = function(element, callback) {
  if (!element) {
    return function() {};
  }

  var fn = function(event) {
    if (element == event.target) {
      event.stopPropagation();
      removeListeners();

      callback();
    }
  };

  var removeListeners = function() {
    util._transitionEndEvents.forEach(function(eventName) {
      element.removeEventListener(eventName, fn, false);
    });
  };

  util._transitionEndEvents.forEach(function(eventName) {
    element.addEventListener(eventName, fn, false);
  });

  return removeListeners;
};

util._transitionEndEvents = (function() {

  if ('ontransitionend' in window) {
    return ['transitionend'];
  }

  if ('onwebkittransitionend' in window) {
    return ['webkitTransitionEnd'];
  }

  if (util.vendorPrefix === 'webkit' || util.vendorPrefix === 'o' || util.vendorPrefix === 'moz' || util.vendorPrefix === 'ms') {
    return [util.vendorPrefix + 'TransitionEnd', 'transitionend'];
  }

  return [];
})();

util._cssPropertyDict = (function() {
  var styles = window.getComputedStyle(document.documentElement, '');
  var dict = {};
  var a = 'A'.charCodeAt(0);
  var z = 'z'.charCodeAt(0);

  var upper = function(s) {
    return s.substr(1).toUpperCase();
  };

  for (var i = 0; i < styles.length; i++) {

    var key = styles[i]
    .replace(/^[\-]+/, '')
    .replace(/[\-][a-z]/g, upper)
    .replace(/^moz/, 'Moz');

    if (a <= key.charCodeAt(0) && z >= key.charCodeAt(0)) {
      if (key !== 'cssText' && key !== 'parentText') {
        dict[key] = true;
      }
    }
  }

  return dict;
})();

util.hasCssProperty = function(name) {
  return name in util._cssPropertyDict;
};

/**
 * Vendor prefix for css property.
 */
util.vendorPrefix = (function() {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
    return pre;
})();

util.forceLayoutAtOnce = function(elements, callback) {
  this.batchImmediate(function() {
    elements.forEach(function(element) {
      // force layout
      element.offsetHeight;
    });
    callback();
  });
};

util.batchImmediate = (function() {
  var callbacks = [];

  return function(callback) {
    if (callbacks.length === 0) {
      setImmediate(function() {
        var concreateCallbacks = callbacks.slice(0);
        callbacks = [];
        concreateCallbacks.forEach(function(callback) {
          callback();
        });
      });
    }

    callbacks.push(callback);
  };
})();

util.batchAnimationFrame = (function() {
  var callbacks = [];

  var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
    setTimeout(callback, 1000 / 60);
  };

  return function(callback) {
    if (callbacks.length === 0) {
      raf(function() {
        var concreateCallbacks = callbacks.slice(0);
        callbacks = [];
        concreateCallbacks.forEach(function(callback) {
          callback();
        });
      });
    }

    callbacks.push(callback);
  };
})();

util.transitionPropertyName = (function() {
  if (util.hasCssProperty('transitionDuration')) {
    return 'transition';
  }

  if (util.hasCssProperty(util.vendorPrefix + 'TransitionDuration')) {
    return util.vendorPrefix + 'Transition';
  }

  throw new Error('Invalid state');
})();


/**
 * @param {HTMLElement} element
 */
var Animit = function(element) {
  if (!(this instanceof Animit)) {
    return new Animit(element);
  }

  if (element instanceof HTMLElement) {
    this.elements = [element];
  } else if (Object.prototype.toString.call(element) === '[object Array]') {
    this.elements = element;

  } else {
    throw new Error('First argument must be an array or an instance of HTMLElement.');
  }

  this.transitionQueue = [];
  this.lastStyleAttributeDict = [];
};

Animit.prototype = {

  /**
   * @property {Array}
   */
  transitionQueue: undefined,

  /**
   * @property {Array}
   */
  elements: undefined,

  /**
   * Start animation sequence with passed animations.
   *
   * @param {Function} callback
   */
  play: function(callback) {
    if (typeof callback === 'function') {
      this.transitionQueue.push(function(done) {
        callback();
        done();
      });
    }

    this.startAnimation();

    return this;
  },

  /**
   * Queue transition animations or other function.
   *
   * e.g. animit(elt).queue({color: 'red'})
   * e.g. animit(elt).queue({color: 'red'}, {duration: 0.4})
   * e.g. animit(elt).queue({css: {color: 'red'}, duration: 0.2})
   *
   * @param {Object|Animit.Transition|Function} transition
   * @param {Object} [options]
   */
  queue: function(transition, options) {
    var queue = this.transitionQueue;

    if (transition && options) {
      options.css = transition;
      transition = new Animit.Transition(options);
    }

    if (!(transition instanceof Function || transition instanceof Animit.Transition)) {
      if (transition.css) {
        transition = new Animit.Transition(transition);
      } else {
        transition = new Animit.Transition({
          css: transition
        });
      }
    }

    if (transition instanceof Function) {
      queue.push(transition);
    } else if (transition instanceof Animit.Transition) {
      queue.push(transition.build());
    } else {
      throw new Error('Invalid arguments');
    }

    return this;
  },

  /**
   * Queue transition animations.
   *
   * @param {Float} seconds
   */
  wait: function(seconds) {
    if (seconds > 0) {
      this.transitionQueue.push(function(done) {
        setTimeout(done, 1000 * seconds);
      });
    }

    return this;
  },

  saveStyle: function() {

    this.transitionQueue.push(function(done) {
      this.elements.forEach(function(element, index) {
        var css = this.lastStyleAttributeDict[index] = {};

        for (var i = 0; i < element.style.length; i++) {
          css[element.style[i]] = element.style[element.style[i]];
        }
      }.bind(this));
      done();
    }.bind(this));

    return this;
  },

  /**
   * Restore element's style.
   *
   * @param {Object} [options]
   * @param {Float} [options.duration]
   * @param {String} [options.timing]
   * @param {String} [options.transition]
   */
  restoreStyle: function(options) {
    options = options || {};
    var self = this;

    if (options.transition && !options.duration) {
      throw new Error('"options.duration" is required when "options.transition" is enabled.');
    }

    var transitionName = util.transitionPropertyName;

    if (options.transition || (options.duration && options.duration > 0)) {
      var transitionValue = options.transition || ('all ' + options.duration + 's ' + (options.timing || 'linear'));

      this.transitionQueue.push(function(done) {
        var elements = this.elements;
        var timeoutId;

        var clearTransition = function() {
          elements.forEach(function(element) {
            element.style[transitionName] = '';
          });
        };

        // add "transitionend" event handler
        var removeListeners = util.onceOnTransitionEnd(elements[0], function() {
          clearTimeout(timeoutId);
          clearTransition();
          done();
        });

        // for fail safe.
        timeoutId = setTimeout(function() {
          removeListeners();
          clearTransition();
          done();
        }, options.duration * 1000 * TIMEOUT_RATIO);

        // transition and style settings
        elements.forEach(function(element, index) {

          var css = self.lastStyleAttributeDict[index];

          if (!css) {
            throw new Error('restoreStyle(): The style is not saved. Invoke saveStyle() before.');
          }

          self.lastStyleAttributeDict[index] = undefined;

          var name;
          for (var i = 0, len = element.style.length; i < len; i++) {
            name = element.style[i];
            if (css[name] === undefined) {
              css[name] = '';
            }
          }

          element.style[transitionName] = transitionValue;

          Object.keys(css).forEach(function(key) {
            if (key !== transitionName) {
              element.style[key] = css[key];
            }
          });

          element.style[transitionName] = transitionValue;
        });
      });
    } else {
      this.transitionQueue.push(function(done) {
        reset();
        done();
      });
    }

    return this;

    function reset() {
      // Clear transition animation settings.
      self.elements.forEach(function(element, index) {
        element.style[transitionName] = 'none';

        var css = self.lastStyleAttributeDict[index];

        if (!css) {
          throw new Error('restoreStyle(): The style is not saved. Invoke saveStyle() before.');
        }

        self.lastStyleAttributeDict[index] = undefined;

        for (var i = 0, name = ''; i < element.style.length; i++) {
          name = element.style[i];
          if (typeof css[element.style[i]] === 'undefined') {
            css[element.style[i]] = '';
          }
        }

        Object.keys(css).forEach(function(key) {
          element.style[key] = css[key];
        });

      });
    }
  },

  /**
   * Start animation sequence.
   */
  startAnimation: function() {
    this._dequeueTransition();

    return this;
  },

  _dequeueTransition: function() {
    var transition = this.transitionQueue.shift();
    if (this._currentTransition) {
      throw new Error('Current transition exists.');
    }
    this._currentTransition = transition;
    var self = this;
    var called = false;

    var done = function() {
      if (!called) {
        called = true;
        self._currentTransition = undefined;
        self._dequeueTransition();
      } else {
        throw new Error('Invalid state: This callback is called twice.');
      }
    };

    if (transition) {
      transition.call(this, done);
    }
  }

};

/**
 * @param {Animit} arguments
 */
Animit.runAll = function(/* arguments... */) {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].play();
  }
};


/**
 * @param {Object} options
 * @param {Float} [options.duration]
 * @param {String} [options.property]
 * @param {String} [options.timing]
 */
Animit.Transition = function(options) {
  this.options = options || {};
  this.options.duration = this.options.duration || 0;
  this.options.timing = this.options.timing || 'linear';
  this.options.css = this.options.css || {};
  this.options.property = this.options.property || 'all';
};

Animit.Transition.prototype = {

  /**
   * @param {HTMLElement} element
   * @return {Function}
   */
  build: function() {

    if (Object.keys(this.options.css).length === 0) {
      throw new Error('options.css is required.');
    }

    var css = createActualCssProps(this.options.css);

    if (this.options.duration > 0) {
      var transitionValue = util.buildTransitionValue(this.options);
      var self = this;

      return function(callback) {
        var elements = this.elements;
        var timeout = self.options.duration * 1000 * TIMEOUT_RATIO;
        var timeoutId;

        var removeListeners = util.onceOnTransitionEnd(elements[0], function() {
          clearTimeout(timeoutId);
          callback();
        });

        timeoutId = setTimeout(function() {
          removeListeners();
          callback();
        }, timeout);

        elements.forEach(function(element) {
          element.style[util.transitionPropertyName] = transitionValue;

          Object.keys(css).forEach(function(name) {
            element.style[name] = css[name];
          });
        });

      };
    }

    if (this.options.duration <= 0) {
      return function(callback) {
        var elements = this.elements;

        elements.forEach(function(element) {
          element.style[util.transitionPropertyName] = '';

          Object.keys(css).forEach(function(name) {
            element.style[name] = css[name];
          });
        });

        if (elements.length > 0) {
          util.forceLayoutAtOnce(elements, function() {
            util.batchAnimationFrame(callback);
          });
        } else {
          util.batchAnimationFrame(callback);
        }
      };
    }

    function createActualCssProps(css) {
      var result = {};

      Object.keys(css).forEach(function(name) {
        var value = css[name];

        if (util.hasCssProperty(name)) {
          result[name] = value;
          return;
        }

        var prefixed = util.vendorPrefix + util.capitalize(name);
        if (util.hasCssProperty(prefixed)) {
          result[prefixed] = value;
        } else {
          result[prefixed] = value;
          result[name] = value;
        }
      });

      return result;
    }

  }
};

export default  Animit;

