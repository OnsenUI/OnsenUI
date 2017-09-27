/*
 * Gesture detector library that forked from github.com/EightMedia/hammer.js.
 */

'use strict';

var Event, Utils, Detection, PointerEvent;

/**
 * @object ons.GestureDetector
 * @category gesture
 * @description
 *   [en]Utility class for gesture detection.[/en]
 *   [ja]ジェスチャを検知するためのユーティリティクラスです。[/ja]
 */

/**
 * @method constructor
 * @signature constructor(element[, options])
 * @description
 *  [en]Create a new GestureDetector instance.[/en]
 *  [ja]GestureDetectorのインスタンスを生成します。[/ja]
 * @param {Element} element
 *   [en]Name of the event.[/en]
 *   [ja]ジェスチャを検知するDOM要素を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Options object.[/en]
 *   [ja]オプションを指定します。[/ja]
 * @return {ons.GestureDetector.Instance}
 */
var GestureDetector = function GestureDetector(element, options) {
  return new GestureDetector.Instance(element, options || {});
};


/**
 * default settings.
 * more settings are defined per gesture at `/gestures`. Each gesture can be disabled/enabled
 * by setting it's name (like `swipe`) to false.
 * You can set the defaults for all instances by changing this object before creating an instance.
 * @example
 * ````
 *  GestureDetector.defaults.drag = false;
 *  GestureDetector.defaults.behavior.touchAction = 'pan-y';
 *  delete GestureDetector.defaults.behavior.userSelect;
 * ````
 * @property defaults
 * @type {Object}
 */
GestureDetector.defaults = {
  behavior: {
    // userSelect: 'none', // Also disables selection in `input` children
    touchAction: 'pan-y',
    touchCallout: 'none',
    contentZooming: 'none',
    userDrag: 'none',
    tapHighlightColor: 'rgba(0,0,0,0)'
  }
};

/**
 * GestureDetector document where the base events are added at
 * @property DOCUMENT
 * @type {HTMLElement}
 * @default window.document
 */
GestureDetector.DOCUMENT = document;

/**
 * detect support for pointer events
 * @property HAS_POINTEREVENTS
 * @type {Boolean}
 */
GestureDetector.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;

/**
 * detect support for touch events
 * @property HAS_TOUCHEVENTS
 * @type {Boolean}
 */
GestureDetector.HAS_TOUCHEVENTS = ('ontouchstart' in window);

/**
 * detect mobile browsers
 * @property IS_MOBILE
 * @type {Boolean}
 */
GestureDetector.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);

/**
 * detect if we want to support mouseevents at all
 * @property NO_MOUSEEVENTS
 * @type {Boolean}
 */
GestureDetector.NO_MOUSEEVENTS = (GestureDetector.HAS_TOUCHEVENTS && GestureDetector.IS_MOBILE) || GestureDetector.HAS_POINTEREVENTS;

/**
 * interval in which GestureDetector recalculates current velocity/direction/angle in ms
 * @property CALCULATE_INTERVAL
 * @type {Number}
 * @default 25
 */
GestureDetector.CALCULATE_INTERVAL = 25;

/**
 * eventtypes per touchevent (start, move, end) are filled by `Event.determineEventTypes` on `setup`
 * the object contains the DOM event names per type (`EVENT_START`, `EVENT_MOVE`, `EVENT_END`)
 * @property EVENT_TYPES
 * @private
 * @writeOnce
 * @type {Object}
 */
var EVENT_TYPES = {};

/**
 * direction strings, for safe comparisons
 * @property DIRECTION_DOWN|LEFT|UP|RIGHT
 * @final
 * @type {String}
 * @default 'down' 'left' 'up' 'right'
 */
var DIRECTION_DOWN = GestureDetector.DIRECTION_DOWN = 'down';
var DIRECTION_LEFT = GestureDetector.DIRECTION_LEFT = 'left';
var DIRECTION_UP = GestureDetector.DIRECTION_UP = 'up';
var DIRECTION_RIGHT = GestureDetector.DIRECTION_RIGHT = 'right';

/**
 * pointertype strings, for safe comparisons
 * @property POINTER_MOUSE|TOUCH|PEN
 * @final
 * @type {String}
 * @default 'mouse' 'touch' 'pen'
 */
var POINTER_MOUSE = GestureDetector.POINTER_MOUSE = 'mouse';
var POINTER_TOUCH = GestureDetector.POINTER_TOUCH = 'touch';
var POINTER_PEN = GestureDetector.POINTER_PEN = 'pen';

/**
 * eventtypes
 * @property EVENT_START|MOVE|END|RELEASE|TOUCH
 * @final
 * @type {String}
 * @default 'start' 'change' 'move' 'end' 'release' 'touch'
 */
var EVENT_START = GestureDetector.EVENT_START = 'start';
var EVENT_MOVE = GestureDetector.EVENT_MOVE = 'move';
var EVENT_END = GestureDetector.EVENT_END = 'end';
var EVENT_RELEASE = GestureDetector.EVENT_RELEASE = 'release';
var EVENT_TOUCH = GestureDetector.EVENT_TOUCH = 'touch';

/**
 * if the window events are set...
 * @property READY
 * @writeOnce
 * @type {Boolean}
 * @default false
 */
GestureDetector.READY = false;

/**
 * plugins namespace
 * @property plugins
 * @type {Object}
 */
GestureDetector.plugins = GestureDetector.plugins || {};

/**
 * gestures namespace
 * see `/gestures` for the definitions
 * @property gestures
 * @type {Object}
 */
GestureDetector.gestures = GestureDetector.gestures || {};

/**
 * setup events to detect gestures on the document
 * this function is called when creating an new instance
 * @private
 */
function setup() {
  if(GestureDetector.READY) {
    return;
  }

  // find what eventtypes we add listeners to
  Event.determineEventTypes();

  // Register all gestures inside GestureDetector.gestures
  Utils.each(GestureDetector.gestures, function(gesture) {
    Detection.register(gesture);
  });

  // Add touch events on the document
  Event.onTouch(GestureDetector.DOCUMENT, EVENT_MOVE, Detection.detect);
  Event.onTouch(GestureDetector.DOCUMENT, EVENT_END, Detection.detect);

  // GestureDetector is ready...!
  GestureDetector.READY = true;
}

/**
 * @module GestureDetector
 *
 * @class Utils
 * @static
 */
Utils = GestureDetector.utils = {
  /**
   * extend method, could also be used for cloning when `dest` is an empty object.
   * changes the dest object
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge=false]  do a merge
   * @return {Object} dest
   */
  extend: function extend(dest, src, merge) {
    for (var key in src) {
      if (src.hasOwnProperty(key) && (dest[key] === undefined || !merge)) {
        dest[key] = src[key];
      }
    }
    return dest;
  },

  /**
   * simple addEventListener wrapper
   * @param {HTMLElement} element
   * @param {String} type
   * @param {Function} handler
   */
  on: function on(element, type, handler) {
    element.addEventListener(type, handler, false);
  },

  /**
   * simple removeEventListener wrapper
   * @param {HTMLElement} element
   * @param {String} type
   * @param {Function} handler
   */
  off: function off(element, type, handler) {
    element.removeEventListener(type, handler, false);
  },

  /**
   * forEach over arrays and objects
   * @param {Object|Array} obj
   * @param {Function} iterator
   * @param {any} iterator.item
   * @param {Number} iterator.index
   * @param {Object|Array} iterator.obj the source object
   * @param {Object} context value to use as `this` in the iterator
   */
  each: function each(obj, iterator, context) {
    var i, len;

    // native forEach on arrays
    if('forEach' in obj) {
      obj.forEach(iterator, context);
      // arrays
    } else if(obj.length !== undefined) {
      for(i = 0, len = obj.length; i < len; i++) {
        if(iterator.call(context, obj[i], i, obj) === false) {
          return;
        }
      }
      // objects
    } else {
      for(i in obj) {
        if(obj.hasOwnProperty(i) &&
          iterator.call(context, obj[i], i, obj) === false) {
          return;
        }
      }
    }
  },

  /**
   * find if a string contains the string using indexOf
   * @param {String} src
   * @param {String} find
   * @return {Boolean} found
   */
  inStr: function inStr(src, find) {
    return src.indexOf(find) > -1;
  },

  /**
   * find if a array contains the object using indexOf or a simple polyfill
   * @param {String} src
   * @param {String} find
   * @return {Boolean|Number} false when not found, or the index
   */
  inArray: function inArray(src, find, deep) {
    if (deep) {
      for(var i = 0, len = src.length; i < len; i++) { // Array.findIndex
        if (Object.keys(find).every(function(key) { return src[i][key] === find[key]; })) {
          return i;
        }
      }
      return -1;
    }

    if(src.indexOf) {
      return src.indexOf(find);
    } else {
      for(var i = 0, len = src.length; i < len; i++) {
        if(src[i] === find) {
          return i;
        }
      }
      return -1;
    }
  },

  /**
   * convert an array-like object (`arguments`, `touchlist`) to an array
   * @param {Object} obj
   * @return {Array}
   */
  toArray: function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  },

  /**
   * find if a node is in the given parent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */
  hasParent: function hasParent(node, parent) {
    while(node) {
      if(node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },

  /**
   * get the center of all the touches
   * @param {Array} touches
   * @return {Object} center contains `pageX`, `pageY`, `clientX` and `clientY` properties
   */
  getCenter: function getCenter(touches) {
    var pageX = [],
        pageY = [],
        clientX = [],
        clientY = [],
        min = Math.min,
        max = Math.max;

    // no need to loop when only one touch
    if(touches.length === 1) {
      return {
        pageX: touches[0].pageX,
        pageY: touches[0].pageY,
        clientX: touches[0].clientX,
        clientY: touches[0].clientY
      };
    }

    Utils.each(touches, function(touch) {
      pageX.push(touch.pageX);
      pageY.push(touch.pageY);
      clientX.push(touch.clientX);
      clientY.push(touch.clientY);
    });

    return {
      pageX: (min.apply(Math, pageX) + max.apply(Math, pageX)) / 2,
      pageY: (min.apply(Math, pageY) + max.apply(Math, pageY)) / 2,
      clientX: (min.apply(Math, clientX) + max.apply(Math, clientX)) / 2,
      clientY: (min.apply(Math, clientY) + max.apply(Math, clientY)) / 2
    };
  },

  /**
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} deltaX
   * @param {Number} deltaY
   * @return {Object} velocity `x` and `y`
   */
  getVelocity: function getVelocity(deltaTime, deltaX, deltaY) {
    return {
      x: Math.abs(deltaX / deltaTime) || 0,
      y: Math.abs(deltaY / deltaTime) || 0
    };
  },

  /**
   * calculate the angle between two coordinates
   * @param {Touch} touch1
   * @param {Touch} touch2
   * @return {Number} angle
   */
  getAngle: function getAngle(touch1, touch2) {
    var x = touch2.clientX - touch1.clientX,
        y = touch2.clientY - touch1.clientY;

    return Math.atan2(y, x) * 180 / Math.PI;
  },

  /**
   * do a small comparison to get the direction between two touches.
   * @param {Touch} touch1
   * @param {Touch} touch2
   * @return {String} direction matches `DIRECTION_LEFT|RIGHT|UP|DOWN`
   */
  getDirection: function getDirection(touch1, touch2) {
    var x = Math.abs(touch1.clientX - touch2.clientX),
        y = Math.abs(touch1.clientY - touch2.clientY);

    if(x >= y) {
      return touch1.clientX - touch2.clientX > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return touch1.clientY - touch2.clientY > 0 ? DIRECTION_UP : DIRECTION_DOWN;
  },

  /**
   * calculate the distance between two touches
   * @param {Touch}touch1
   * @param {Touch} touch2
   * @return {Number} distance
   */
  getDistance: function getDistance(touch1, touch2) {
    var x = touch2.clientX - touch1.clientX,
        y = touch2.clientY - touch1.clientY;

    return Math.sqrt((x * x) + (y * y));
  },

  /**
   * calculate the scale factor between two touchLists
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of touches
   * @param {Array} end array of touches
   * @return {Number} scale
   */
  getScale: function getScale(start, end) {
    // need two fingers...
    if(start.length >= 2 && end.length >= 2) {
      return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
    }
    return 1;
  },

  /**
   * calculate the rotation degrees between two touchLists
   * @param {Array} start array of touches
   * @param {Array} end array of touches
   * @return {Number} rotation
   */
  getRotation: function getRotation(start, end) {
    // need two fingers
    if(start.length >= 2 && end.length >= 2) {
      return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
    }
    return 0;
  },

  /**
   * find out if the direction is vertical   *
   * @param {String} direction matches `DIRECTION_UP|DOWN`
   * @return {Boolean} is_vertical
   */
  isVertical: function isVertical(direction) {
    return direction == DIRECTION_UP || direction == DIRECTION_DOWN;
  },

  /**
   * set css properties with their prefixes
   * @param {HTMLElement} element
   * @param {String} prop
   * @param {String} value
   * @param {Boolean} [toggle=true]
   * @return {Boolean}
   */
  setPrefixedCss: function setPrefixedCss(element, prop, value, toggle) {
    var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
    prop = Utils.toCamelCase(prop);

    for(var i = 0; i < prefixes.length; i++) {
      var p = prop;
      // prefixes
      if(prefixes[i]) {
        p = prefixes[i] + p.slice(0, 1).toUpperCase() + p.slice(1);
      }

      // test the style
      if(p in element.style) {
        element.style[p] = (toggle === null || toggle) && value || '';
        break;
      }
    }
  },

  /**
   * toggle browser default behavior by setting css properties.
   * `userSelect='none'` also sets `element.onselectstart` to false
   * `userDrag='none'` also sets `element.ondragstart` to false
   *
   * @param {HtmlElement} element
   * @param {Object} props
   * @param {Boolean} [toggle=true]
   */
  toggleBehavior: function toggleBehavior(element, props, toggle) {
    if(!props || !element || !element.style) {
      return;
    }

    // set the css properties
    Utils.each(props, function(value, prop) {
      Utils.setPrefixedCss(element, prop, value, toggle);
    });

    var falseFn = toggle && function() {
      return false;
    };

    // also the disable onselectstart
    if(props.userSelect == 'none') {
      element.onselectstart = falseFn;
    }
    // and disable ondragstart
    if(props.userDrag == 'none') {
      element.ondragstart = falseFn;
    }
  },

  /**
   * convert a string with underscores to camelCase
   * so prevent_default becomes preventDefault
   * @param {String} str
   * @return {String} camelCaseStr
   */
  toCamelCase: function toCamelCase(str) {
    return str.replace(/[_-]([a-z])/g, function(s) {
      return s[1].toUpperCase();
    });
  }
};


/**
 * @module GestureDetector
 */
/**
 * @class Event
 * @static
 */
Event = GestureDetector.event = {
  /**
   * when touch events have been fired, this is true
   * this is used to stop mouse events
   * @property prevent_mouseevents
   * @private
   * @type {Boolean}
   */
  preventMouseEvents: false,

  /**
   * if EVENT_START has been fired
   * @property started
   * @private
   * @type {Boolean}
   */
  started: false,

  /**
   * when the mouse is hold down, this is true
   * @property should_detect
   * @private
   * @type {Boolean}
   */
  shouldDetect: false,

  /**
   * simple event binder with a hook and support for multiple types
   * @param {HTMLElement} element
   * @param {String} type
   * @param {Function} handler
   * @param {Function} [hook]
   * @param {Object} hook.type
   */
  on: function on(element, type, handler, hook) {
    var types = type.split(' ');
    Utils.each(types, function(type) {
      Utils.on(element, type, handler);
      hook && hook(type);
    });
  },

  /**
   * simple event unbinder with a hook and support for multiple types
   * @param {HTMLElement} element
   * @param {String} type
   * @param {Function} handler
   * @param {Function} [hook]
   * @param {Object} hook.type
   */
  off: function off(element, type, handler, hook) {
    var types = type.split(' ');
    Utils.each(types, function(type) {
      Utils.off(element, type, handler);
      hook && hook(type);
    });
  },

  /**
   * the core touch event handler.
   * this finds out if we should to detect gestures
   * @param {HTMLElement} element
   * @param {String} eventType matches `EVENT_START|MOVE|END`
   * @param {Function} handler
   * @return onTouchHandler {Function} the core event handler
   */
  onTouch: function onTouch(element, eventType, handler) {
    var self = this;

    var onTouchHandler = function onTouchHandler(ev) {
      var srcType = ev.type.toLowerCase(),
          isPointer = GestureDetector.HAS_POINTEREVENTS,
          isMouse = Utils.inStr(srcType, 'mouse'),
          triggerType;

      // if we are in a mouseevent, but there has been a touchevent triggered in this session
      // we want to do nothing. simply break out of the event.
      if(isMouse && self.preventMouseEvents) {
        return;

        // mousebutton must be down
      } else if(isMouse && eventType == EVENT_START && ev.button === 0) {
        self.preventMouseEvents = false;
        self.shouldDetect = true;
      } else if(isPointer && eventType == EVENT_START) {
        self.shouldDetect = (ev.buttons === 1 || PointerEvent.matchType(POINTER_TOUCH, ev));
        // just a valid start event, but no mouse
      } else if(!isMouse && eventType == EVENT_START) {
        self.preventMouseEvents = true;
        self.shouldDetect = true;
      }

      // update the pointer event before entering the detection
      if(isPointer && eventType != EVENT_END) {
        PointerEvent.updatePointer(eventType, ev);
      }

      // we are in a touch/down state, so allowed detection of gestures
      if(self.shouldDetect) {
        triggerType = self.doDetect.call(self, ev, eventType, element, handler);
      }

      // ...and we are done with the detection
      // so reset everything to start each detection totally fresh
      if(triggerType == EVENT_END) {
        self.preventMouseEvents = false;
        self.shouldDetect = false;
        PointerEvent.reset();
        // update the pointerevent object after the detection
      }

      if(isPointer && eventType == EVENT_END) {
        PointerEvent.updatePointer(eventType, ev);
      }
    };

    this.on(element, EVENT_TYPES[eventType], onTouchHandler);
    return onTouchHandler;
  },

  /**
   * the core detection method
   * this finds out what GestureDetector-touch-events to trigger
   * @param {Object} ev
   * @param {String} eventType matches `EVENT_START|MOVE|END`
   * @param {HTMLElement} element
   * @param {Function} handler
   * @return {String} triggerType matches `EVENT_START|MOVE|END`
   */
  doDetect: function doDetect(ev, eventType, element, handler) {
    var touchList = this.getTouchList(ev, eventType);
    var touchListLength = touchList.length;
    var triggerType = eventType;
    var triggerChange = touchList.trigger; // used by fakeMultitouch plugin
    var changedLength = touchListLength;

    // at each touchstart-like event we want also want to trigger a TOUCH event...
    if(eventType == EVENT_START) {
      triggerChange = EVENT_TOUCH;
      // ...the same for a touchend-like event
    } else if(eventType == EVENT_END) {
      triggerChange = EVENT_RELEASE;

      // keep track of how many touches have been removed
      changedLength = touchList.length - ((ev.changedTouches) ? ev.changedTouches.length : 1);
    }

    // after there are still touches on the screen,
    // we just want to trigger a MOVE event. so change the START or END to a MOVE
    // but only after detection has been started, the first time we actually want a START
    if(changedLength > 0 && this.started) {
      triggerType = EVENT_MOVE;
    }

    // detection has been started, we keep track of this, see above
    this.started = true;

    // generate some event data, some basic information
    var evData = this.collectEventData(element, triggerType, touchList, ev);

    // trigger the triggerType event before the change (TOUCH, RELEASE) events
    // but the END event should be at last
    if(eventType != EVENT_END) {
      handler.call(Detection, evData);
    }

    // trigger a change (TOUCH, RELEASE) event, this means the length of the touches changed
    if(triggerChange) {
      evData.changedLength = changedLength;
      evData.eventType = triggerChange;

      handler.call(Detection, evData);

      evData.eventType = triggerType;
      delete evData.changedLength;
    }

    // trigger the END event
    if(triggerType == EVENT_END) {
      handler.call(Detection, evData);

      // ...and we are done with the detection
      // so reset everything to start each detection totally fresh
      this.started = false;
    }

    return triggerType;
  },

  /**
   * we have different events for each device/browser
   * determine what we need and set them in the EVENT_TYPES constant
   * the `onTouch` method is bind to these properties.
   * @return {Object} events
   */
  determineEventTypes: function determineEventTypes() {
    var types;
    if(GestureDetector.HAS_POINTEREVENTS) {
      if(window.PointerEvent) {
        types = [
          'pointerdown',
          'pointermove',
          'pointerup pointercancel lostpointercapture'
        ];
      } else {
        types = [
          'MSPointerDown',
          'MSPointerMove',
          'MSPointerUp MSPointerCancel MSLostPointerCapture'
        ];
      }
    } else if(GestureDetector.NO_MOUSEEVENTS) {
      types = [
        'touchstart',
        'touchmove',
        'touchend touchcancel'
      ];
    } else {
      types = [
        'touchstart mousedown',
        'touchmove mousemove',
        'touchend touchcancel mouseup'
      ];
    }

    EVENT_TYPES[EVENT_START] = types[0];
    EVENT_TYPES[EVENT_MOVE] = types[1];
    EVENT_TYPES[EVENT_END] = types[2];
    return EVENT_TYPES;
  },

  /**
   * create touchList depending on the event
   * @param {Object} ev
   * @param {String} eventType
   * @return {Array} touches
   */
  getTouchList: function getTouchList(ev, eventType) {
    // get the fake pointerEvent touchlist
    if(GestureDetector.HAS_POINTEREVENTS) {
      return PointerEvent.getTouchList();
    }

    // get the touchlist
    if(ev.touches) {
      if(eventType == EVENT_MOVE) {
        return ev.touches;
      }

      var identifiers = [];
      var concat = [].concat(Utils.toArray(ev.touches), Utils.toArray(ev.changedTouches));
      var touchList = [];

      Utils.each(concat, function(touch) {
        if(Utils.inArray(identifiers, touch.identifier) === -1) {
          touchList.push(touch);
        }
        identifiers.push(touch.identifier);
      });

      return touchList;
    }

    // make fake touchList from mouse position
    ev.identifier = 1;
    return [ev];
  },

  /**
   * collect basic event data
   * @param {HTMLElement} element
   * @param {String} eventType matches `EVENT_START|MOVE|END`
   * @param {Array} touches
   * @param {Object} ev
   * @return {Object} ev
   */
  collectEventData: function collectEventData(element, eventType, touches, ev) {
    // find out pointerType
    var pointerType = POINTER_TOUCH;
    if(Utils.inStr(ev.type, 'mouse') || PointerEvent.matchType(POINTER_MOUSE, ev)) {
      pointerType = POINTER_MOUSE;
    } else if(PointerEvent.matchType(POINTER_PEN, ev)) {
      pointerType = POINTER_PEN;
    }

    return {
      center: Utils.getCenter(touches),
      timeStamp: Date.now(),
      target: ev.target,
      touches: touches,
      eventType: eventType,
      pointerType: pointerType,
      srcEvent: ev,

      /**
       * prevent the browser default actions
       * mostly used to disable scrolling of the browser
       */
      preventDefault: function() {
        var srcEvent = this.srcEvent;
        srcEvent.preventManipulation && srcEvent.preventManipulation();
        srcEvent.preventDefault && srcEvent.preventDefault();
      },

      /**
       * stop bubbling the event up to its parents
       */
      stopPropagation: function() {
        this.srcEvent.stopPropagation();
      },

      /**
       * immediately stop gesture detection
       * might be useful after a swipe was detected
       * @return {*}
       */
      stopDetect: function() {
        return Detection.stopDetect();
      }
    };
  }
};


/**
 * @module GestureDetector
 *
 * @class PointerEvent
 * @static
 */
PointerEvent = GestureDetector.PointerEvent = {
  /**
   * holds all pointers, by `identifier`
   * @property pointers
   * @type {Object}
   */
  pointers: {},

  /**
   * get the pointers as an array
   * @return {Array} touchlist
   */
  getTouchList: function getTouchList() {
    var touchlist = [];
    // we can use forEach since pointerEvents only is in IE10
    Utils.each(this.pointers, function(pointer) {
      touchlist.push(pointer);
    });
    return touchlist;
  },

  /**
   * update the position of a pointer
   * @param {String} eventType matches `EVENT_START|MOVE|END`
   * @param {Object} pointerEvent
   */
  updatePointer: function updatePointer(eventType, pointerEvent) {
    if(eventType == EVENT_END || (eventType != EVENT_END && pointerEvent.buttons !== 1)) {
      delete this.pointers[pointerEvent.pointerId];
    } else {
      pointerEvent.identifier = pointerEvent.pointerId;
      this.pointers[pointerEvent.pointerId] = pointerEvent;
    }
  },

  /**
   * check if ev matches pointertype
   * @param {String} pointerType matches `POINTER_MOUSE|TOUCH|PEN`
   * @param {PointerEvent} ev
   */
  matchType: function matchType(pointerType, ev) {
    if(!ev.pointerType) {
      return false;
    }

    var pt = ev.pointerType,
        types = {};

    types[POINTER_MOUSE] = (pt === (ev.MSPOINTER_TYPE_MOUSE || POINTER_MOUSE));
    types[POINTER_TOUCH] = (pt === (ev.MSPOINTER_TYPE_TOUCH || POINTER_TOUCH));
    types[POINTER_PEN] = (pt === (ev.MSPOINTER_TYPE_PEN || POINTER_PEN));
    return types[pointerType];
  },

  /**
   * reset the stored pointers
   */
  reset: function resetList() {
    this.pointers = {};
  }
};


/**
 * @module GestureDetector
 *
 * @class Detection
 * @static
 */
Detection = GestureDetector.detection = {
  // contains all registered GestureDetector.gestures in the correct order
  gestures: [],

  // data of the current GestureDetector.gesture detection session
  current: null,

  // the previous GestureDetector.gesture session data
  // is a full clone of the previous gesture.current object
  previous: null,

  // when this becomes true, no gestures are fired
  stopped: false,

  /**
   * start GestureDetector.gesture detection
   * @param {GestureDetector.Instance} inst
   * @param {Object} eventData
   */
  startDetect: function startDetect(inst, eventData) {
    // already busy with a GestureDetector.gesture detection on an element
    if(this.current) {
      return;
    }

    this.stopped = false;

    // holds current session
    this.current = {
      inst: inst, // reference to GestureDetectorInstance we're working for
      startEvent: Utils.extend({}, eventData), // start eventData for distances, timing etc
      lastEvent: false, // last eventData
      lastCalcEvent: false, // last eventData for calculations.
      futureCalcEvent: false, // last eventData for calculations.
      lastCalcData: {}, // last lastCalcData
      name: '' // current gesture we're in/detected, can be 'tap', 'hold' etc
    };

    this.detect(eventData);
  },

  /**
   * GestureDetector.gesture detection
   * @param {Object} eventData
   * @return {any}
   */
  detect: function detect(eventData) {
    if(!this.current || this.stopped) {
      return;
    }

    // extend event data with calculations about scale, distance etc
    eventData = this.extendEventData(eventData);

    // GestureDetector instance and instance options
    var inst = this.current.inst,
        instOptions = inst.options;

    // call GestureDetector.gesture handlers
    Utils.each(this.gestures, function triggerGesture(gesture) {
      // only when the instance options have enabled this gesture
      if(!this.stopped && inst.enabled && instOptions[gesture.name]) {
        gesture.handler.call(gesture, eventData, inst);
      }
    }, this);

    // store as previous event event
    if(this.current) {
      this.current.lastEvent = eventData;
    }

    if(eventData.eventType == EVENT_END) {
      this.stopDetect();
    }

    return eventData; // eslint-disable-line consistent-return
  },

  /**
   * clear the GestureDetector.gesture vars
   * this is called on endDetect, but can also be used when a final GestureDetector.gesture has been detected
   * to stop other GestureDetector.gestures from being fired
   */
  stopDetect: function stopDetect() {
    // clone current data to the store as the previous gesture
    // used for the double tap gesture, since this is an other gesture detect session
    this.previous = Utils.extend({}, this.current);

    // reset the current
    this.current = null;
    this.stopped = true;
  },

  /**
   * calculate velocity, angle and direction
   * @param {Object} ev
   * @param {Object} center
   * @param {Number} deltaTime
   * @param {Number} deltaX
   * @param {Number} deltaY
   */
  getCalculatedData: function getCalculatedData(ev, center, deltaTime, deltaX, deltaY) {
    var cur = this.current,
        recalc = false,
        calcEv = cur.lastCalcEvent,
        calcData = cur.lastCalcData;

    if(calcEv && ev.timeStamp - calcEv.timeStamp > GestureDetector.CALCULATE_INTERVAL) {
      center = calcEv.center;
      deltaTime = ev.timeStamp - calcEv.timeStamp;
      deltaX = ev.center.clientX - calcEv.center.clientX;
      deltaY = ev.center.clientY - calcEv.center.clientY;
      recalc = true;
    }

    if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
      cur.futureCalcEvent = ev;
    }

    if(!cur.lastCalcEvent || recalc) {
      calcData.velocity = Utils.getVelocity(deltaTime, deltaX, deltaY);
      calcData.angle = Utils.getAngle(center, ev.center);
      calcData.direction = Utils.getDirection(center, ev.center);

      cur.lastCalcEvent = cur.futureCalcEvent || ev;
      cur.futureCalcEvent = ev;
    }

    ev.velocityX = calcData.velocity.x;
    ev.velocityY = calcData.velocity.y;
    ev.interimAngle = calcData.angle;
    ev.interimDirection = calcData.direction;
  },

  /**
   * extend eventData for GestureDetector.gestures
   * @param {Object} ev
   * @return {Object} ev
   */
  extendEventData: function extendEventData(ev) {
    var cur = this.current,
        startEv = cur.startEvent,
        lastEv = cur.lastEvent || startEv;

    // update the start touchlist to calculate the scale/rotation
    if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
      startEv.touches = [];
      Utils.each(ev.touches, function(touch) {
        startEv.touches.push({
          clientX: touch.clientX,
          clientY: touch.clientY
        });
      });
    }

    var deltaTime = ev.timeStamp - startEv.timeStamp,
        deltaX = ev.center.clientX - startEv.center.clientX,
        deltaY = ev.center.clientY - startEv.center.clientY;

    this.getCalculatedData(ev, lastEv.center, deltaTime, deltaX, deltaY);

    Utils.extend(ev, {
      startEvent: startEv,

      deltaTime: deltaTime,
      deltaX: deltaX,
      deltaY: deltaY,

      distance: Utils.getDistance(startEv.center, ev.center),
      angle: Utils.getAngle(startEv.center, ev.center),
      direction: Utils.getDirection(startEv.center, ev.center),
      scale: Utils.getScale(startEv.touches, ev.touches),
      rotation: Utils.getRotation(startEv.touches, ev.touches)
    });

    return ev;
  },

  /**
   * register new gesture
   * @param {Object} gesture object, see `gestures/` for documentation
   * @return {Array} gestures
   */
  register: function register(gesture) {
    // add an enable gesture options if there is no given
    var options = gesture.defaults || {};
    if(options[gesture.name] === undefined) {
      options[gesture.name] = true;
    }

    // extend GestureDetector default options with the GestureDetector.gesture options
    Utils.extend(GestureDetector.defaults, options, true);

    // set its index
    gesture.index = gesture.index || 1000;

    // add GestureDetector.gesture to the list
    this.gestures.push(gesture);

    // sort the list by index
    this.gestures.sort(function(a, b) {
      if(a.index < b.index) {
        return -1;
      }
      if(a.index > b.index) {
        return 1;
      }
      return 0;
    });

    return this.gestures;
  }
};


/**
 * @module GestureDetector
 */

/**
 * create new GestureDetector instance
 * all methods should return the instance itself, so it is chainable.
 *
 * @class Instance
 * @constructor
 * @param {HTMLElement} element
 * @param {Object} [options={}] options are merged with `GestureDetector.defaults`
 * @return {GestureDetector.Instance}
 */
GestureDetector.Instance = function(element, options) {
  var self = this;

  // setup GestureDetectorJS window events and register all gestures
  // this also sets up the default options
  setup();

  /**
   * @property element
   * @type {HTMLElement}
   */
  this.element = element;

  /**
   * @property enabled
   * @type {Boolean}
   * @protected
   */
  this.enabled = true;

  /**
   * options, merged with the defaults
   * options with an _ are converted to camelCase
   * @property options
   * @type {Object}
   */
  Utils.each(options, function(value, name) {
    delete options[name];
    options[Utils.toCamelCase(name)] = value;
  });

  this.options = Utils.extend(Utils.extend({}, GestureDetector.defaults), options || {});

  // add some css to the element to prevent the browser from doing its native behavior
  if(this.options.behavior) {
    Utils.toggleBehavior(this.element, this.options.behavior, true);
  }

  /**
   * event start handler on the element to start the detection
   * @property eventStartHandler
   * @type {Object}
   */
  this.eventStartHandler = Event.onTouch(element, EVENT_START, function(ev) {
    if(self.enabled && ev.eventType == EVENT_START) {
      Detection.startDetect(self, ev);
    } else if(ev.eventType == EVENT_TOUCH) {
      Detection.detect(ev);
    }
  });

  /**
   * keep a list of user event handlers which needs to be removed when calling 'dispose'
   * @property eventHandlers
   * @type {Array}
   */
  this.eventHandlers = [];
};

GestureDetector.Instance.prototype = {
  /**
   * @method on
   * @signature on(gestures, handler)
   * @description
   *  [en]Adds an event handler for a gesture. Available gestures are: drag, dragleft, dragright, dragup, dragdown, hold, release, swipe, swipeleft, swiperight, swipeup, swipedown, tap, doubletap, touch, transform, pinch, pinchin, pinchout and rotate. [/en]
   *  [ja]ジェスチャに対するイベントハンドラを追加します。指定できるジェスチャ名は、drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate です。[/ja]
   * @param {String} gestures
   *   [en]A space separated list of gestures.[/en]
   *   [ja]検知するジェスチャ名を指定します。スペースで複数指定することができます。[/ja]
   * @param {Function} handler
   *   [en]An event handling function.[/en]
   *   [ja]イベントハンドラとなる関数オブジェクトを指定します。[/ja]
   */
  on: function onEvent(gestures, handler) {
    var self = this;
    Event.on(self.element, gestures, handler, function(type) {
      self.eventHandlers.push({ gesture: type, handler: handler });
    });
    return self;
  },

  /**
   * @method off
   * @signature off(gestures, handler)
   * @description
   *  [en]Remove an event listener.[/en]
   *  [ja]イベントリスナーを削除します。[/ja]
   * @param {String} gestures
   *   [en]A space separated list of gestures.[/en]
   *   [ja]ジェスチャ名を指定します。スペースで複数指定することができます。[/ja]
   * @param {Function} handler
   *   [en]An event handling function.[/en]
   *   [ja]イベントハンドラとなる関数オブジェクトを指定します。[/ja]
   */
  off: function offEvent(gestures, handler) {
    var self = this;

    Event.off(self.element, gestures, handler, function(type) {
      var index = Utils.inArray(self.eventHandlers, { gesture: type, handler: handler }, true);
      if(index >= 0) {
        self.eventHandlers.splice(index, 1);
      }
    });
    return self;
  },

  /**
   * trigger gesture event
   * @method trigger
   * @signature trigger(gesture, eventData)
   * @param {String} gesture
   * @param {Object} [eventData]
   */
  trigger: function triggerEvent(gesture, eventData) {
    // optional
    if(!eventData) {
      eventData = {};
    }

    // create DOM event
    var event = GestureDetector.DOCUMENT.createEvent('Event');
    event.initEvent(gesture, true, true);
    event.gesture = eventData;

    // trigger on the target if it is in the instance element,
    // this is for event delegation tricks
    var element = this.element;
    if(Utils.hasParent(eventData.target, element)) {
      element = eventData.target;
    }

    element.dispatchEvent(event);
    return this;
  },

  /**
   * @method enable
   * @signature enable(state)
   * @description
   *  [en]Enable or disable gesture detection.[/en]
   *  [ja]ジェスチャ検知を有効化/無効化します。[/ja]
   * @param {Boolean} state
   *   [en]Specify if it should be enabled or not.[/en]
   *   [ja]有効にするかどうかを指定します。[/ja]
   */
  enable: function enable(state) {
    this.enabled = state;
    return this;
  },

  /**
   * @method dispose
   * @signature dispose()
   * @description
   *  [en]Remove and destroy all event handlers for this instance.[/en]
   *  [ja]このインスタンスでのジェスチャの検知や、イベントハンドラを全て解除して廃棄します。[/ja]
   */
  dispose: function dispose() {
    var i, eh;

    // undo all changes made by stop_browser_behavior
    Utils.toggleBehavior(this.element, this.options.behavior, false);

    // unbind all custom event handlers
    for(i = -1; (eh = this.eventHandlers[++i]);) { // eslint-disable-line no-cond-assign
      Utils.off(this.element, eh.gesture, eh.handler);
    }

    this.eventHandlers = [];

    // unbind the start event listener
    Event.off(this.element, EVENT_TYPES[EVENT_START], this.eventStartHandler);

    return null;
  }
};


/**
 * @module gestures
 */
/**
 * Move with x fingers (default 1) around on the page.
 * Preventing the default browser behavior is a good way to improve feel and working.
 * ````
 *  GestureDetectortime.on("drag", function(ev) {
 *    console.log(ev);
 *    ev.gesture.preventDefault();
 *  });
 * ````
 *
 * @class Drag
 * @static
 */
/**
 * @event drag
 * @param {Object} ev
 */
/**
 * @event dragstart
 * @param {Object} ev
 */
/**
 * @event dragend
 * @param {Object} ev
 */
/**
 * @event drapleft
 * @param {Object} ev
 */
/**
 * @event dragright
 * @param {Object} ev
 */
/**
 * @event dragup
 * @param {Object} ev
 */
/**
 * @event dragdown
 * @param {Object} ev
 */

/**
 * @param {String} name
 */
(function(name) {
  var triggered = false;

  function dragGesture(ev, inst) {
    var cur = Detection.current;

    // max touches
    if(inst.options.dragMaxTouches > 0 &&
      ev.touches.length > inst.options.dragMaxTouches) {
      return;
    }

    switch(ev.eventType) {
    case EVENT_START:
      triggered = false;
      break;

    case EVENT_MOVE:
      // when the distance we moved is too small we skip this gesture
      // or we can be already in dragging
      if(ev.distance < inst.options.dragMinDistance &&
        cur.name != name) {
        return;
      }

      var startCenter = cur.startEvent.center;

      // we are dragging!
      if(cur.name != name) {
        cur.name = name;
        if(inst.options.dragDistanceCorrection && ev.distance > 0) {
          // When a drag is triggered, set the event center to dragMinDistance pixels from the original event center.
          // Without this correction, the dragged distance would jumpstart at dragMinDistance pixels instead of at 0.
          // It might be useful to save the original start point somewhere
          var factor = Math.abs(inst.options.dragMinDistance / ev.distance);
          startCenter.pageX += ev.deltaX * factor;
          startCenter.pageY += ev.deltaY * factor;
          startCenter.clientX += ev.deltaX * factor;
          startCenter.clientY += ev.deltaY * factor;

          // recalculate event data using new start point
          ev = Detection.extendEventData(ev);
        }
      }

      // lock drag to axis?
      if(cur.lastEvent.dragLockToAxis ||
        ( inst.options.dragLockToAxis &&
          inst.options.dragLockMinDistance <= ev.distance
        )) {
          ev.dragLockToAxis = true;
        }

        // keep direction on the axis that the drag gesture started on
        var lastDirection = cur.lastEvent.direction;
        if(ev.dragLockToAxis && lastDirection !== ev.direction) {
          if(Utils.isVertical(lastDirection)) {
            ev.direction = (ev.deltaY < 0) ? DIRECTION_UP : DIRECTION_DOWN;
          } else {
            ev.direction = (ev.deltaX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
          }
        }

        // first time, trigger dragstart event
        if(!triggered) {
          inst.trigger(name + 'start', ev);
          triggered = true;
        }

        // trigger events
        inst.trigger(name, ev);
        inst.trigger(name + ev.direction, ev);

        var isVertical = Utils.isVertical(ev.direction);

        // block the browser events
        if((inst.options.dragBlockVertical && isVertical) ||
          (inst.options.dragBlockHorizontal && !isVertical)) {
          ev.preventDefault();
        }
        break;

      case EVENT_RELEASE:
        if(triggered && ev.changedLength <= inst.options.dragMaxTouches) {
          inst.trigger(name + 'end', ev);
          triggered = false;
        }
        break;

      case EVENT_END:
        triggered = false;
        break;
      }
    }

    GestureDetector.gestures.Drag = {
      name: name,
      index: 50,
      handler: dragGesture,
      defaults: {
        /**
         * minimal movement that have to be made before the drag event gets triggered
         * @property dragMinDistance
         * @type {Number}
         * @default 10
         */
        dragMinDistance: 10,

        /**
         * Set dragDistanceCorrection to true to make the starting point of the drag
         * be calculated from where the drag was triggered, not from where the touch started.
         * Useful to avoid a jerk-starting drag, which can make fine-adjustments
         * through dragging difficult, and be visually unappealing.
         * @property dragDistanceCorrection
         * @type {Boolean}
         * @default true
         */
        dragDistanceCorrection: true,

        /**
         * set 0 for unlimited, but this can conflict with transform
         * @property dragMaxTouches
         * @type {Number}
         * @default 1
         */
        dragMaxTouches: 1,

        /**
         * prevent default browser behavior when dragging occurs
         * be careful with it, it makes the element a blocking element
         * when you are using the drag gesture, it is a good practice to set this true
         * @property dragBlockHorizontal
         * @type {Boolean}
         * @default false
         */
        dragBlockHorizontal: false,

        /**
         * same as `dragBlockHorizontal`, but for vertical movement
         * @property dragBlockVertical
         * @type {Boolean}
         * @default false
         */
        dragBlockVertical: false,

        /**
         * dragLockToAxis keeps the drag gesture on the axis that it started on,
         * It disallows vertical directions if the initial direction was horizontal, and vice versa.
         * @property dragLockToAxis
         * @type {Boolean}
         * @default false
         */
        dragLockToAxis: false,

        /**
         * drag lock only kicks in when distance > dragLockMinDistance
         * This way, locking occurs only when the distance has become large enough to reliably determine the direction
         * @property dragLockMinDistance
         * @type {Number}
         * @default 25
         */
        dragLockMinDistance: 25
      }
    };
  })('drag');

  /**
   * @module gestures
   */
  /**
   * trigger a simple gesture event, so you can do anything in your handler.
   * only usable if you know what your doing...
   *
   * @class Gesture
   * @static
   */
  /**
   * @event gesture
   * @param {Object} ev
   */
  GestureDetector.gestures.Gesture = {
    name: 'gesture',
    index: 1337,
    handler: function releaseGesture(ev, inst) {
      inst.trigger(this.name, ev);
    }
  };

  /**
   * @module gestures
   */
  /**
   * Touch stays at the same place for x time
   *
   * @class Hold
   * @static
   */
  /**
   * @event hold
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
    var timer;

    function holdGesture(ev, inst) {
      var options = inst.options,
          current = Detection.current;

      switch(ev.eventType) {
      case EVENT_START:
        clearTimeout(timer);

        // set the gesture so we can check in the timeout if it still is
        current.name = name;

        // set timer and if after the timeout it still is hold,
        // we trigger the hold event
        timer = setTimeout(function() {
          if(current && current.name == name) {
            inst.trigger(name, ev);
          }
        }, options.holdTimeout);
        break;

      case EVENT_MOVE:
        if(ev.distance > options.holdThreshold) {
          clearTimeout(timer);
        }
        break;

      case EVENT_RELEASE:
        clearTimeout(timer);
        break;
      }
    }

    GestureDetector.gestures.Hold = {
      name: name,
      index: 10,
      defaults: {
        /**
         * @property holdTimeout
         * @type {Number}
         * @default 500
         */
        holdTimeout: 500,

        /**
         * movement allowed while holding
         * @property holdThreshold
         * @type {Number}
         * @default 2
         */
        holdThreshold: 2
      },
      handler: holdGesture
    };
  })('hold');

  /**
   * @module gestures
   */
  /**
   * when a touch is being released from the page
   *
   * @class Release
   * @static
   */
  /**
   * @event release
   * @param {Object} ev
   */
  GestureDetector.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
      if(ev.eventType == EVENT_RELEASE) {
        inst.trigger(this.name, ev);
      }
    }
  };

  /**
   * @module gestures
   */
  /**
   * triggers swipe events when the end velocity is above the threshold
   * for best usage, set `preventDefault` (on the drag gesture) to `true`
   * ````
   *  GestureDetectortime.on("dragleft swipeleft", function(ev) {
   *    console.log(ev);
   *    ev.gesture.preventDefault();
   *  });
   * ````
   *
   * @class Swipe
   * @static
   */
  /**
   * @event swipe
   * @param {Object} ev
   */
  /**
   * @event swipeleft
   * @param {Object} ev
   */
  /**
   * @event swiperight
   * @param {Object} ev
   */
  /**
   * @event swipeup
   * @param {Object} ev
   */
  /**
   * @event swipedown
   * @param {Object} ev
   */
  GestureDetector.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
      /**
       * @property swipeMinTouches
       * @type {Number}
       * @default 1
       */
      swipeMinTouches: 1,

      /**
       * @property swipeMaxTouches
       * @type {Number}
       * @default 1
       */
      swipeMaxTouches: 1,

      /**
       * horizontal swipe velocity
       * @property swipeVelocityX
       * @type {Number}
       * @default 0.6
       */
      swipeVelocityX: 0.6,

      /**
       * vertical swipe velocity
       * @property swipeVelocityY
       * @type {Number}
       * @default 0.6
       */
      swipeVelocityY: 0.6
    },

    handler: function swipeGesture(ev, inst) {
      if(ev.eventType == EVENT_RELEASE) {
        var touches = ev.touches.length,
            options = inst.options;

        // max touches
        if(touches < options.swipeMinTouches ||
          touches > options.swipeMaxTouches) {
          return;
        }

        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(ev.velocityX > options.swipeVelocityX ||
          ev.velocityY > options.swipeVelocityY) {
          // trigger swipe events
          inst.trigger(this.name, ev);
          inst.trigger(this.name + ev.direction, ev);
        }
      }
    }
  };

  /**
   * @module gestures
   */
  /**
   * Single tap and a double tap on a place
   *
   * @class Tap
   * @static
   */
  /**
   * @event tap
   * @param {Object} ev
   */
  /**
   * @event doubletap
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
    var hasMoved = false;

    function tapGesture(ev, inst) {
      var options = inst.options,
          current = Detection.current,
          prev = Detection.previous,
          sincePrev,
          didDoubleTap;

      switch(ev.eventType) {
      case EVENT_START:
        hasMoved = false;
        break;

      case EVENT_MOVE:
        hasMoved = hasMoved || (ev.distance > options.tapMaxDistance);
        break;

      case EVENT_END:
        if(!Utils.inStr(ev.srcEvent.type, 'cancel') && ev.deltaTime < options.tapMaxTime && !hasMoved) {
          // previous gesture, for the double tap since these are two different gesture detections
          sincePrev = prev && prev.lastEvent && ev.timeStamp - prev.lastEvent.timeStamp;
          didDoubleTap = false;

          // check if double tap
          if(prev && prev.name == name &&
            (sincePrev && sincePrev < options.doubleTapInterval) &&
            ev.distance < options.doubleTapDistance) {
            inst.trigger('doubletap', ev);
            didDoubleTap = true;
          }

          // do a single tap
          if(!didDoubleTap || options.tapAlways) {
            current.name = name;
            inst.trigger(current.name, ev);
          }
        }
        break;
      }
    }

    GestureDetector.gestures.Tap = {
      name: name,
      index: 100,
      handler: tapGesture,
      defaults: {
        /**
         * max time of a tap, this is for the slow tappers
         * @property tapMaxTime
         * @type {Number}
         * @default 250
         */
        tapMaxTime: 250,

        /**
         * max distance of movement of a tap, this is for the slow tappers
         * @property tapMaxDistance
         * @type {Number}
         * @default 10
         */
        tapMaxDistance: 10,

        /**
         * always trigger the `tap` event, even while double-tapping
         * @property tapAlways
         * @type {Boolean}
         * @default true
         */
        tapAlways: true,

        /**
         * max distance between two taps
         * @property doubleTapDistance
         * @type {Number}
         * @default 20
         */
        doubleTapDistance: 20,

        /**
         * max time between two taps
         * @property doubleTapInterval
         * @type {Number}
         * @default 300
         */
        doubleTapInterval: 300
      }
    };
  })('tap');

  /**
   * @module gestures
   */
  /**
   * when a touch is being touched at the page
   *
   * @class Touch
   * @static
   */
  /**
   * @event touch
   * @param {Object} ev
   */
  GestureDetector.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
      /**
       * call preventDefault at touchstart, and makes the element blocking by disabling the scrolling of the page,
       * but it improves gestures like transforming and dragging.
       * be careful with using this, it can be very annoying for users to be stuck on the page
       * @property preventDefault
       * @type {Boolean}
       * @default false
       */
      preventDefault: false,

      /**
       * disable mouse events, so only touch (or pen!) input triggers events
       * @property preventMouse
       * @type {Boolean}
       * @default false
       */
      preventMouse: false
    },
    handler: function touchGesture(ev, inst) {
      if(inst.options.preventMouse && ev.pointerType == POINTER_MOUSE) {
        ev.stopDetect();
        return;
      }

      if(inst.options.preventDefault) {
        ev.preventDefault();
      }

      if(ev.eventType == EVENT_TOUCH) {
        inst.trigger('touch', ev);
      }
    }
  };

  /**
   * @module gestures
   */
  /**
   * User want to scale or rotate with 2 fingers
   * Preventing the default browser behavior is a good way to improve feel and working. This can be done with the
   * `preventDefault` option.
   *
   * @class Transform
   * @static
   */
  /**
   * @event transform
   * @param {Object} ev
   */
  /**
   * @event transformstart
   * @param {Object} ev
   */
  /**
   * @event transformend
   * @param {Object} ev
   */
  /**
   * @event pinchin
   * @param {Object} ev
   */
  /**
   * @event pinchout
   * @param {Object} ev
   */
  /**
   * @event rotate
   * @param {Object} ev
   */

  /**
   * @param {String} name
   */
  (function(name) {
    var triggered = false;

    function transformGesture(ev, inst) {
      switch(ev.eventType) {
      case EVENT_START:
        triggered = false;
        break;

      case EVENT_MOVE:
        // at least multitouch
        if(ev.touches.length < 2) {
          return;
        }

        var scaleThreshold = Math.abs(1 - ev.scale);
        var rotationThreshold = Math.abs(ev.rotation);

        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(scaleThreshold < inst.options.transformMinScale &&
          rotationThreshold < inst.options.transformMinRotation) {
          return;
        }

        // we are transforming!
        Detection.current.name = name;

        // first time, trigger dragstart event
        if(!triggered) {
          inst.trigger(name + 'start', ev);
          triggered = true;
        }

        inst.trigger(name, ev); // basic transform event

        // trigger rotate event
        if(rotationThreshold > inst.options.transformMinRotation) {
          inst.trigger('rotate', ev);
        }

        // trigger pinch event
        if(scaleThreshold > inst.options.transformMinScale) {
          inst.trigger('pinch', ev);
          inst.trigger('pinch' + (ev.scale < 1 ? 'in' : 'out'), ev);
        }
        break;

      case EVENT_RELEASE:
        if(triggered && ev.changedLength < 2) {
          inst.trigger(name + 'end', ev);
          triggered = false;
        }
        break;
      }
    }

    GestureDetector.gestures.Transform = {
      name: name,
      index: 45,
      defaults: {
        /**
         * minimal scale factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
         * @property transformMinScale
         * @type {Number}
         * @default 0.01
         */
        transformMinScale: 0.01,

        /**
         * rotation in degrees
         * @property transformMinRotation
         * @type {Number}
         * @default 1
         */
        transformMinRotation: 1
      },

      handler: transformGesture
    };
  })('transform');

export default GestureDetector;
