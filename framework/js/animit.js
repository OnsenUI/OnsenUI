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
 * Minimal animation library for managing css transition on mobile browser.
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
  var animit = function(element) {
    if (!(this instanceof animit)) {
      return new animit(element);
    }

    this.element = element;
    this.transitionQueue = [];
  };

  animit.prototype = {

    /**
     * @property {Array}
     */
    transitionQueue: undefined,

    /**
     * @property {Boolean}
     */
    _started: false,

    /**
     * Start animation sequence with passed animations.
     *
     * @param {Array|animit.Transition} transitions
     * @param {Function} callback
     */
    play: function(transitions, callback) {
      transitions = transitions instanceof animit.Transition ? [transitions] : transitions;

      var queue = this.transitionQueue;
      transitions.forEach(function(transition) {
        queue.push(transition);
      });

      if (typeof callback === 'function') {
        queue.push(callback);
      }
      this.startAnimation();
    },

    /**
     * Start animation sequence.
     */
    startAnimation: function() {
      if (!this.started) {
        this._started = true;
        this._dequeueTransition();
      }
    },

    _dequeueTransition: function() {
      if (this.transitionQueue.length === 0) {
        this._started = false;
      } else {
        var transition = this.transitionQueue.shift();

        if (typeof transition === 'function') {
          transition();
          this._dequeueTransition();
        } else {
          var self = this;
          transition.play(this.element, function() {
            self._dequeueTransition();
          });
        }
      }
    }

  };

  /**
   * Vendor prefix for css property.
   */
  animit.prefix = (function() {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
    return pre;
  })();


  /**
   * @param {Object} options
   * @param {Float} [options.duration]
   * @param {String} [options.timing]
   * @param {delay} [options.delay]
   */
  animit.Transition = function(options) {
    this.options = options || {};
    this.options.duration = options.duration || 0;
    this.options.timing = options.timing || 'linear';
    this.options.css = options.css || {};
  };

  animit.Transition.prototype = {
    play: function(element, callback) {

      if (this.options.duration > 0) {
        this._setTransitionEnd(element, callback);

        element.style[animit.prefix + 'Transition'] = 'all ' + this.options.duration + 's ' + this.options.timing;
        element.style.transition = 'all ' + this.options.duration + 's ' + this.options.timing;
      } else {
        element.style[animit.prefix + 'Transition'] = 'none';
        element.style.transition = 'none';
      }

      // style setting
      var css = this.options.css;
      Object.keys(css).forEach(function(name) {
        var value = css[name];
        name = util.normalizeStyleName(name);
        element.style[animit.prefix + util.capitalize(name)] = value;
        element.style[name] = value;
      });

      if (this.options.duration <= 0) {
        callback();
      }
    },

    _setTransitionEnd: function(element, callback) {
      var done = false;
      TRANSITION_END.forEach(function(transitionEnd) {
        var f = function() {
          TRANSITION_END.forEach(function(transitionEnd) {
            element.removeEventListener(transitionEnd, f);
          });
          if (!done) {
            done = true;
            return callback.apply(null, arguments);
          }
        };
        element.addEventListener(transitionEnd, f, false);
      });
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
        return '-' + animit.prefix + '-' + all;
      });
    }
  };

  return animit;
})();
