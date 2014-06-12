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


/**
 * Minimal animation library for managing css transition on mobile browsers.
 */
window.animit = (function(){
  'use strict';

  var TRANSITION_END = [
    'webkitTransitionEnd',
    'oTransitionEnd',
    'mozTransitionEnd',
    'msTransitionEnd',
    'transitionend'
  ];

  /**
   * @param {HTMLElement} element
   */
  var Animit = function(element) {
    if (!(this instanceof Animit)) {
      return new Animit(element);
    }

    this.element = element;
    this.transitionQueue = [];

    if (!element.hasAttribute('data-animit-orig-style')) {
      this.lastStyleAttribute = element.getAttribute('style');
      if (this.lastStyleAttribute) {
        element.setAttribute('data-animit-orig-style', this.lastStyleAttribute);
      }
    } else {
      this.lastStyleAttribute = element.getAttribute('data-animit-orig-style');
    }
  };

  Animit.prototype = {

    /**
     * @property {Array}
     */
    transitionQueue: undefined,

    /**
     * @property {Boolean}
     */
    _started: false,

    /**
     * @property {HTMLElement}
     */
    element: undefined,

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
     * @param {Object|Animit.Transition|Function} transition
     */
    queue: function(transition) {
      var queue = this.transitionQueue;

      if (transition instanceof Function || transition instanceof Animit.Transition) {
        queue.push(transition);
      } else {
        queue.push(new Animit.Transition(transition));
      }

      return this;
    },

    /**
     * Queue transition animations.
     *
     * @param {Float} seconds
     */
    wait: function(seconds) {
      var self = this;
      this.transitionQueue.push(function(done) {
        setTimeout(done, 1000 * seconds);
      });

      return this;
    },

    /**
     * Reset element's style.
     *
     * @param {Object} options
     * @param {Float} options.duration
     * @param {String} options.timing
     */
    resetStyle: function(options) {
      options = options || {};
      var self = this;

      if (options.transition && !options.duration) {
        throw new Error('"options.duration" is required when "options.transition" is enabled.');
      }

      if (options.transition || (options.duration && options.duration > 0)) {
        var transitionValue = options.transition || ('all ' + options.duration + 's ' + (options.timing || 'linear'));
        var transitionStyle = 'transition: ' + transitionValue + '; -' + Animit.prefix + '-transition: ' + transitionValue + ';';

        this.transitionQueue.push(function(done) {

          self.element.style[Animit.prefix + 'Transition'] = transitionValue;
          self.element.style.transition = transitionValue;

          self.element.setAttribute(
            'style',
            (self.lastStyleAttribute ? self.lastStyleAttribute + '; ' : '') + transitionStyle
          );

          var onTransitionEnd = function() {
            clearTimeout(timeoutId);
            reset();
            done();
          };

          util.addOnTransitionEnd(self.element, onTransitionEnd);
          // fail safe
          var timeoutId = setTimeout(onTransitionEnd, options.duration * 1000 * 1.1);
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
        self.element.style[Animit.prefix + 'Transition'] = 'none';
        self.element.style.transition = 'none';

        if (self.lastStyleAttribute) {
          self.element.setAttribute('style', self.lastStyleAttribute);
        } else {
          self.element.setAttribute('style', '');
          self.element.removeAttribute('style');
        }
      }
    },

    /**
     * Start animation sequence.
     */
    startAnimation: function() {
      if (!this.started) {
        this._started = true;
        this._dequeueTransition();
      }
      return this;
    },

    _dequeueTransition: function() {
      if (this.transitionQueue.length === 0) {
        this._started = false;
      } else {
        var transition = this.transitionQueue.shift();
        var self = this;
        var done = function() {
          self._dequeueTransition();
        };

        if (typeof transition === 'function') {
          transition.apply(this, [done]);
        } else {
          transition.play(this.element, done);
        }
      }
    }

  };

  Animit.cssPropertyDict = (function() {
    var styles = window.getComputedStyle(document.documentElement, '');
    var dict = {};
    var a = 'A'.charCodeAt(0);
    var z = 'z'.charCodeAt(0);

    for (var key in styles) {
      if (styles.hasOwnProperty(key)) {
        var char = key.charCodeAt(0);
        if (a <= key.charCodeAt(0) && z >= key.charCodeAt(0)) {
          if (key !== 'cssText' && key !== 'parentText' && key !== 'length') {
            dict[key] = true;
          }
        }
      }
    }

    return dict;
  })();

  Animit.hasCssProperty = function(name) {
    return !!Animit.cssPropertyDict[name];
  };

  /**
   * Vendor prefix for css property.
   */
  Animit.prefix = (function() {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
    return pre;
  })();

  Animit.runAll = function() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].play();
    }
  };


  /**
   * @param {Object} options
   * @param {Float} [options.duration]
   * @param {String} [options.timing]
   */
  Animit.Transition = function(options) {
    this.options = options || {};
    this.options.duration = options.duration || 0;
    this.options.timing = options.timing || 'linear';
    this.options.css = options.css || {};
  };

  Animit.Transition.prototype = {
    play: function(element, callback) {

      if (this.options.duration > 0) {
        if (Object.keys(this.options.css).length === 0) {
          setTimeout(callback, this.options.duration * 1000);
        } else  {
          var onTransitionEnd = function() {
            clearTimeout(timeoutId);
            callback();
          };
          util.addOnTransitionEnd(element, callback);

          // for fail safe
          var timeoutId = setTimeout(onTransitionEnd, this.options.duration * 1000 * 1.1);

          element.style[Animit.prefix + 'Transition'] = 'all ' + this.options.duration + 's ' + this.options.timing;
          element.style.transition = 'all ' + this.options.duration + 's ' + this.options.timing;
        }
      } else if (Object.keys(this.options.css).length > 0) {
        element.style[Animit.prefix + 'Transition'] = 'all 0s linear';
        element.style.transition = 'all 0s linear';
      }

      // style setting
      var css = this.options.css;
      Object.keys(css).forEach(function(name) {
        var value = css[name];
        name = util.normalizeStyleName(name);
        element.style[Animit.prefix + util.capitalize(name)] = value;
        element.style[name] = value;
      });

      if (this.options.duration <= 0) {
        setTimeout(callback, 1000 / 60);
      }
    }
  };

  var util = {
    /**
     * Normalize style property name.
     */
    normalizeStyleName: function(name) {
      name = name.replace(/-[a-zA-Z]/g, function(all) {
        return all.slice(1).toUpperCase();
      });

      return name.charAt(0).toLowerCase() + name.slice(1);
    },

    // capitalize string
    capitalize : function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Add vendor prefix to transform style property value.
     */
    transformPropValue: function(value) {
      return value.replace(/transform/, function(all) {
        return '-' + Animit.prefix + '-' + all;
      });
    },

    /**
     * Add an event handler on "transitionend" event.
     */
    addOnTransitionEnd: function(element, callback) {
      var done = false;
      var fn = function(event) {
        if (element == event.target) {
          event.stopPropagation();

          TRANSITION_END.forEach(function(eventName) {
            element.removeEventListener(eventName, fn);
          });

          if (!done) {
            done = true;
            return callback.apply(null, arguments);
          }
        }
      };

      TRANSITION_END.forEach(function(transitionEnd) {
        element.addEventListener(transitionEnd, fn, false);
      });
    }
  };

  return Animit;
})();
