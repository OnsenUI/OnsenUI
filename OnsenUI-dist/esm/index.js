import ons from './ons/index.js';
import './ons/platform';
import './ons/microevent.js';

// For @onsenui/custom-elements
if (window.customElements) {
    // even if native CE1 impl exists, use polyfill
    window.customElements.forcePolyfill = true;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.5.1' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _isObject = function _isObject(it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function _anObject(it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function _fails(exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function _domCreate(it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function _toPrimitive(it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
  f: f
};

var _propertyDesc = function _propertyDesc(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function _has(it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function _uid(key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
  var SRC = _uid('src');
  var TO_STRING = 'toString';
  var $toString = Function[TO_STRING];
  var TPL = ('' + $toString).split(TO_STRING);

  _core.inspectSource = function (it) {
    return $toString.call(it);
  };

  (module.exports = function (O, key, val, safe) {
    var isFunction = typeof val == 'function';
    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
    if (O[key] === val) return;
    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    if (O === _global) {
      O[key] = val;
    } else if (!safe) {
      delete O[key];
      _hide(O, key, val);
    } else if (O[key]) {
      O[key] = val;
    } else {
      _hide(O, key, val);
    }
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, TO_STRING, function toString() {
    return typeof this == 'function' && this[SRC] || $toString.call(this);
  });
});

var _aFunction = function _aFunction(it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function _ctx(fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

var toString = {}.toString;

var _cof = function _cof(it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function _defined(it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function _toIobject(it) {
  return _iobject(_defined(it));
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$1 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
  f: f$1
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */

var check = function check(O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function _shared(key) {
  return store[key] || (store[key] = {});
};

var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var _Symbol = _global.Symbol;
  var USE_SYMBOL = typeof _Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
});

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

var _classof = function _classof(it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? _cof(O)
  // ES3 arguments fallback
  : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

'use strict';
// 19.1.3.6 Object.prototype.toString()

var test = {};
test[_wks('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  _redefine(Object.prototype, 'toString', function toString() {
    return '[object ' + _classof(this) + ']';
  }, true);
}

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function _toInteger(it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function _stringAt(TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = false;

var _iterators = {};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function _toLength(it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes


var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function _sharedKey(key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO$1 = _sharedKey('IE_PROTO');

var _objectKeysInternal = function _objectKeysInternal(object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO$1) _has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    _objectDp.f(O, P = keys[i++], Properties[P]);
  }return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


var IE_PROTO = _sharedKey('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
  }return _createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var def = _objectDp.f;

var TAG$1 = _wks('toStringTag');

var _setToStringTag = function _setToStringTag(it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
};

'use strict';

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () {
  return this;
});

var _iterCreate = function _iterCreate(Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject = function _toObject(it) {
  return Object(_defined(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

'use strict';

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && !_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

'use strict';
var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function _addToUnscopables(key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

var _iterStep = function _iterStep(done, value) {
  return { value: value, done: !!done };
};

'use strict';

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var ITERATOR$1 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = ArrayValues;
    if (explicit) for (key in es6_array_iterator) {
      if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
    }
  }
}

var _redefineAll = function _redefineAll(target, src, safe) {
  for (var key in src) {
    _redefine(target, key, src[key], safe);
  }return target;
};

var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

// call something on iterator step with safe closing on error

var _iterCall = function _iterCall(iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$2 = _wks('iterator');
var ArrayProto$1 = Array.prototype;

var _isArrayIter = function _isArrayIter(it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it);
};

var ITERATOR$3 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || _iterators[_classof(it)];
};

var _forOf = createCommonjsModule(function (module) {
  var BREAK = {};
  var RETURN = {};
  var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
    var iterFn = ITERATOR ? function () {
      return iterable;
    } : core_getIteratorMethod(iterable);
    var f = _ctx(fn, that, entries ? 2 : 1);
    var index = 0;
    var length, step, iterator, result;
    if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
    // fast case for arrays with default iterator
    if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
      result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      if (result === BREAK || result === RETURN) return result;
    } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
      result = _iterCall(iterator, f, step.value, entries);
      if (result === BREAK || result === RETURN) return result;
    }
  };
  exports.BREAK = BREAK;
  exports.RETURN = RETURN;
});

'use strict';

var SPECIES = _wks('species');

var _setSpecies = function _setSpecies(KEY) {
  var C = _global[KEY];
  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

var _meta = createCommonjsModule(function (module) {
  var META = _uid('meta');

  var setDesc = _objectDp.f;
  var id = 0;
  var isExtensible = Object.isExtensible || function () {
    return true;
  };
  var FREEZE = !_fails(function () {
    return isExtensible(Object.preventExtensions({}));
  });
  var setMeta = function setMeta(it) {
    setDesc(it, META, { value: {
        i: 'O' + ++id, // object ID
        w: {} // weak collections IDs
      } });
  };
  var fastKey = function fastKey(it, create) {
    // return primitive with prefix
    if (!_isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMeta(it);
      // return object ID
    }return it[META].i;
  };
  var getWeak = function getWeak(it, create) {
    if (!_has(it, META)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMeta(it);
      // return hash weak collections IDs
    }return it[META].w;
  };
  // add metadata on freeze-family methods calling
  var onFreeze = function onFreeze(it) {
    if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
    return it;
  };
  var meta = module.exports = {
    KEY: META,
    NEED: false,
    fastKey: fastKey,
    getWeak: getWeak,
    onFreeze: onFreeze
  };
});

var _validateCollection = function _validateCollection(it, TYPE) {
  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

'use strict';
var dP$1 = _objectDp.f;

var fastKey = _meta.fastKey;

var SIZE = _descriptors ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      _anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = _objectCreate(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
    });
    _redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = _validateCollection(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        _validateCollection(this, NAME);
        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(_validateCollection(this, NAME), key);
      }
    });
    if (_descriptors) dP$1(C.prototype, 'size', {
      get: function get() {
        return _validateCollection(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key, // <- key
        v: value, // <- value
        p: prev = that._l, // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    }return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    _iterDefine(C, NAME, function (iterated, kind) {
      this._t = _validateCollection(iterated, NAME); // target
      this._k = kind; // kind
      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return _iterStep(1);
      }
      // return step by kind
      if (kind == 'keys') return _iterStep(0, entry.k);
      if (kind == 'values') return _iterStep(0, entry.v);
      return _iterStep(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    _setSpecies(NAME);
  }
};

var ITERATOR$4 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$4]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  
} catch (e) {/* empty */}

var _iterDetect = function _iterDetect(exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$4]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR$4] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

var setPrototypeOf$2 = _setProto.set;
var _inheritIfRequired = function _inheritIfRequired(that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf$2) {
    setPrototypeOf$2(that, P);
  }return that;
};

'use strict';

var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = _global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    _redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    _redefineAll(C.prototype, methods);
    _meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = _fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = _iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) {
        $instance[ADDER](index, index);
      }return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        _anInstance(target, C, NAME);
        var that = _inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  _setToStringTag(C, NAME);

  O[NAME] = C;
  _export(_export.G + _export.W + _export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

'use strict';

var SET = 'Set';

// 23.2 Set Objects
var es6_set = _collection(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
  }
}, _collectionStrong);

var _arrayFromIterable = function _arrayFromIterable(iter, ITERATOR) {
  var result = [];
  _forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


var _collectionToJson = function _collectionToJson(NAME) {
  return function toJSON() {
    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return _arrayFromIterable(this);
  };
};

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Set', { toJSON: _collectionToJson('Set') });

'use strict';
// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionOf = function _setCollectionOf(COLLECTION) {
  _export(_export.S, COLLECTION, { of: function of() {
      var length = arguments.length;
      var A = Array(length);
      while (length--) {
        A[length] = arguments[length];
      }return new this(A);
    } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
_setCollectionOf('Set');

'use strict';
// https://tc39.github.io/proposal-setmap-offrom/


var _setCollectionFrom = function _setCollectionFrom(COLLECTION) {
  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
      var mapFn = arguments[1];
      var mapping, A, n, cb;
      _aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) _aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];
      if (mapping) {
        n = 0;
        cb = _ctx(mapFn, arguments[2], 2);
        _forOf(source, false, function (nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        _forOf(source, false, A.push, A);
      }
      return new this(A);
    } });
};

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
_setCollectionFrom('Set');

'use strict';

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = _collection(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
  }
}, _collectionStrong, true);

// https://github.com/DavidBruant/Map-Set.prototype.toJSON


_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
_setCollectionOf('Map');

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
_setCollectionFrom('Map');

var reservedTagList = new Set(['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph']);

/**
 * @param {string} localName
 * @returns {boolean}
 */
function isValidCustomElementName(localName) {
  var reserved = reservedTagList.has(localName);
  var validForm = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(localName);
  return !reserved && validForm;
}

/**
 * @private
 * @param {!Node} node
 * @return {boolean}
 */
function isConnected(node) {
  // Use `Node#isConnected`, if defined.
  var nativeValue = node.isConnected;
  if (nativeValue !== undefined) {
    return nativeValue;
  }

  /** @type {?Node|undefined} */
  var current = node;
  while (current && !(current.__CE_isImportDocument || current instanceof Document)) {
    current = current.parentNode || (window.ShadowRoot && current instanceof ShadowRoot ? current.host : undefined);
  }
  return !!(current && (current.__CE_isImportDocument || current instanceof Document));
}

/**
 * @param {!Node} root
 * @param {!Node} start
 * @return {?Node}
 */
function nextSiblingOrAncestorSibling(root, start) {
  var node = start;
  while (node && node !== root && !node.nextSibling) {
    node = node.parentNode;
  }
  return !node || node === root ? null : node.nextSibling;
}

/**
 * @param {!Node} root
 * @param {!Node} start
 * @return {?Node}
 */
function nextNode(root, start) {
  return start.firstChild ? start.firstChild : nextSiblingOrAncestorSibling(root, start);
}

/**
 * @param {!Node} root
 * @param {!function(!Element)} callback
 * @param {!Set<Node>=} visitedImports
 */
function walkDeepDescendantElements(root, callback) {
  var visitedImports = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

  var node = root;
  while (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      var element = /** @type {!Element} */node;

      callback(element);

      var localName = element.localName;
      if (localName === 'link' && element.getAttribute('rel') === 'import') {
        // If this import (polyfilled or not) has it's root node available,
        // walk it.
        var importNode = /** @type {!Node} */element.import;
        if (importNode instanceof Node && !visitedImports.has(importNode)) {
          // Prevent multiple walks of the same import root.
          visitedImports.add(importNode);

          for (var child = importNode.firstChild; child; child = child.nextSibling) {
            walkDeepDescendantElements(child, callback, visitedImports);
          }
        }

        // Ignore descendants of import links to prevent attempting to walk the
        // elements created by the HTML Imports polyfill that we just walked
        // above.
        node = nextSiblingOrAncestorSibling(root, element);
        continue;
      } else if (localName === 'template') {
        // Ignore descendants of templates. There shouldn't be any descendants
        // because they will be moved into `.content` during construction in
        // browsers that support template but, in case they exist and are still
        // waiting to be moved by a polyfill, they will be ignored.
        node = nextSiblingOrAncestorSibling(root, element);
        continue;
      }

      // Walk shadow roots.
      var shadowRoot = element.__CE_shadowRoot;
      if (shadowRoot) {
        for (var _child = shadowRoot.firstChild; _child; _child = _child.nextSibling) {
          walkDeepDescendantElements(_child, callback, visitedImports);
        }
      }
    }

    node = nextNode(root, node);
  }
}

/**
 * Used to suppress Closure's "Modifying the prototype is only allowed if the
 * constructor is in the same scope" warning without using
 * `@suppress {newCheckTypes, duplicate}` because `newCheckTypes` is too broad.
 *
 * @param {!Object} destination
 * @param {string} name
 * @param {*} value
 */
function setPropertyUnchecked(destination, name, value) {
  destination[name] = value;
}

/**
 * @enum {number}
 */
var CustomElementState = {
  custom: 1,
  failed: 2
};

var CustomElementInternals = function () {
  function CustomElementInternals() {
    classCallCheck(this, CustomElementInternals);

    /** @type {!Map<string, !CustomElementDefinition>} */
    this._localNameToDefinition = new Map();

    /** @type {!Map<!Function, !CustomElementDefinition>} */
    this._constructorToDefinition = new Map();

    /** @type {!Array<!function(!Node)>} */
    this._patches = [];

    /** @type {boolean} */
    this._hasPatches = false;
  }

  /**
   * @param {string} localName
   * @param {!CustomElementDefinition} definition
   */


  createClass(CustomElementInternals, [{
    key: 'setDefinition',
    value: function setDefinition(localName, definition) {
      this._localNameToDefinition.set(localName, definition);
      this._constructorToDefinition.set(definition.constructor, definition);
    }

    /**
     * @param {string} localName
     * @return {!CustomElementDefinition|undefined}
     */

  }, {
    key: 'localNameToDefinition',
    value: function localNameToDefinition(localName) {
      return this._localNameToDefinition.get(localName);
    }

    /**
     * @param {!Function} constructor
     * @return {!CustomElementDefinition|undefined}
     */

  }, {
    key: 'constructorToDefinition',
    value: function constructorToDefinition(constructor) {
      return this._constructorToDefinition.get(constructor);
    }

    /**
     * @param {!function(!Node)} listener
     */

  }, {
    key: 'addPatch',
    value: function addPatch(listener) {
      this._hasPatches = true;
      this._patches.push(listener);
    }

    /**
     * @param {!Node} node
     */

  }, {
    key: 'patchTree',
    value: function patchTree(node) {
      var _this = this;

      if (!this._hasPatches) return;

      walkDeepDescendantElements(node, function (element) {
        return _this.patch(element);
      });
    }

    /**
     * @param {!Node} node
     */

  }, {
    key: 'patch',
    value: function patch(node) {
      if (!this._hasPatches) return;

      if (node.__CE_patched) return;
      node.__CE_patched = true;

      for (var i = 0; i < this._patches.length; i++) {
        this._patches[i](node);
      }
    }

    /**
     * @param {!Node} root
     */

  }, {
    key: 'connectTree',
    value: function connectTree(root) {
      var elements = [];

      walkDeepDescendantElements(root, function (element) {
        return elements.push(element);
      });

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.__CE_state === CustomElementState.custom) {
          if (isConnected(element)) {
            this.connectedCallback(element);
          }
        } else {
          this.upgradeElement(element);
        }
      }
    }

    /**
     * @param {!Node} root
     */

  }, {
    key: 'disconnectTree',
    value: function disconnectTree(root) {
      var elements = [];

      walkDeepDescendantElements(root, function (element) {
        return elements.push(element);
      });

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (element.__CE_state === CustomElementState.custom) {
          this.disconnectedCallback(element);
        }
      }
    }

    /**
     * Upgrades all uncustomized custom elements at and below a root node for
     * which there is a definition. When custom element reaction callbacks are
     * assumed to be called synchronously (which, by the current DOM / HTML spec
     * definitions, they are *not*), callbacks for both elements customized
     * synchronously by the parser and elements being upgraded occur in the same
     * relative order.
     *
     * NOTE: This function, when used to simulate the construction of a tree that
     * is already created but not customized (i.e. by the parser), does *not*
     * prevent the element from reading the 'final' (true) state of the tree. For
     * example, the element, during truly synchronous parsing / construction would
     * see that it contains no children as they have not yet been inserted.
     * However, this function does not modify the tree, the element will
     * (incorrectly) have children. Additionally, self-modification restrictions
     * for custom element constructors imposed by the DOM spec are *not* enforced.
     *
     *
     * The following nested list shows the steps extending down from the HTML
     * spec's parsing section that cause elements to be synchronously created and
     * upgraded:
     *
     * The "in body" insertion mode:
     * https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
     * - Switch on token:
     *   .. other cases ..
     *   -> Any other start tag
     *      - [Insert an HTML element](below) for the token.
     *
     * Insert an HTML element:
     * https://html.spec.whatwg.org/multipage/syntax.html#insert-an-html-element
     * - Insert a foreign element for the token in the HTML namespace:
     *   https://html.spec.whatwg.org/multipage/syntax.html#insert-a-foreign-element
     *   - Create an element for a token:
     *     https://html.spec.whatwg.org/multipage/syntax.html#create-an-element-for-the-token
     *     - Will execute script flag is true?
     *       - (Element queue pushed to the custom element reactions stack.)
     *     - Create an element:
     *       https://dom.spec.whatwg.org/#concept-create-element
     *       - Sync CE flag is true?
     *         - Constructor called.
     *         - Self-modification restrictions enforced.
     *       - Sync CE flag is false?
     *         - (Upgrade reaction enqueued.)
     *     - Attributes appended to element.
     *       (`attributeChangedCallback` reactions enqueued.)
     *     - Will execute script flag is true?
     *       - (Element queue popped from the custom element reactions stack.
     *         Reactions in the popped stack are invoked.)
     *   - (Element queue pushed to the custom element reactions stack.)
     *   - Insert the element:
     *     https://dom.spec.whatwg.org/#concept-node-insert
     *     - Shadow-including descendants are connected. During parsing
     *       construction, there are no shadow-*excluding* descendants.
     *       However, the constructor may have validly attached a shadow
     *       tree to itself and added descendants to that shadow tree.
     *       (`connectedCallback` reactions enqueued.)
     *   - (Element queue popped from the custom element reactions stack.
     *     Reactions in the popped stack are invoked.)
     *
     * @param {!Node} root
     * @param {!Set<Node>=} visitedImports
     */

  }, {
    key: 'patchAndUpgradeTree',
    value: function patchAndUpgradeTree(root) {
      var _this2 = this;

      var visitedImports = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

      var elements = [];

      var gatherElements = function gatherElements(element) {
        if (element.localName === 'link' && element.getAttribute('rel') === 'import') {
          // The HTML Imports polyfill sets a descendant element of the link to
          // the `import` property, specifically this is *not* a Document.
          var importNode = /** @type {?Node} */element.import;

          if (importNode instanceof Node && importNode.readyState === 'complete') {
            importNode.__CE_isImportDocument = true;

            // Connected links are associated with the registry.
            importNode.__CE_hasRegistry = true;
          } else {
            // If this link's import root is not available, its contents can't be
            // walked. Wait for 'load' and walk it when it's ready.
            element.addEventListener('load', function () {
              var importNode = /** @type {!Node} */element.import;

              if (importNode.__CE_documentLoadHandled) return;
              importNode.__CE_documentLoadHandled = true;

              importNode.__CE_isImportDocument = true;

              // Connected links are associated with the registry.
              importNode.__CE_hasRegistry = true;

              // Clone the `visitedImports` set that was populated sync during
              // the `patchAndUpgradeTree` call that caused this 'load' handler to
              // be added. Then, remove *this* link's import node so that we can
              // walk that import again, even if it was partially walked later
              // during the same `patchAndUpgradeTree` call.
              visitedImports.delete(importNode);

              _this2.patchAndUpgradeTree(importNode, visitedImports);
            });
          }
        } else {
          elements.push(element);
        }
      };

      // `walkDeepDescendantElements` populates (and internally checks against)
      // `visitedImports` when traversing a loaded import.
      walkDeepDescendantElements(root, gatherElements, visitedImports);

      if (this._hasPatches) {
        for (var i = 0; i < elements.length; i++) {
          this.patch(elements[i]);
        }
      }

      for (var _i = 0; _i < elements.length; _i++) {
        this.upgradeElement(elements[_i]);
      }
    }

    /**
     * @param {!Element} element
     */

  }, {
    key: 'upgradeElement',
    value: function upgradeElement(element) {
      var currentState = element.__CE_state;
      if (currentState !== undefined) return;

      var definition = this.localNameToDefinition(element.localName);
      if (!definition) return;

      definition.constructionStack.push(element);

      var constructor = definition.constructor;
      try {
        try {
          var result = new constructor();
          if (result !== element) {
            throw new Error('The custom element constructor did not produce the element being upgraded.');
          }
        } finally {
          definition.constructionStack.pop();
        }
      } catch (e) {
        element.__CE_state = CustomElementState.failed;
        throw e;
      }

      element.__CE_state = CustomElementState.custom;
      element.__CE_definition = definition;

      if (definition.attributeChangedCallback) {
        var observedAttributes = definition.observedAttributes;
        for (var i = 0; i < observedAttributes.length; i++) {
          var name = observedAttributes[i];
          var value = element.getAttribute(name);
          if (value !== null) {
            this.attributeChangedCallback(element, name, null, value, null);
          }
        }
      }

      if (isConnected(element)) {
        this.connectedCallback(element);
      }
    }

    /**
     * @param {!Element} element
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback(element) {
      var definition = element.__CE_definition;
      if (definition.connectedCallback) {
        definition.connectedCallback.call(element);
      }

      element.__CE_isConnectedCallbackCalled = true;
    }

    /**
     * @param {!Element} element
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback(element) {
      if (!element.__CE_isConnectedCallbackCalled) {
        this.connectedCallback(element);
      }

      var definition = element.__CE_definition;
      if (definition.disconnectedCallback) {
        definition.disconnectedCallback.call(element);
      }

      element.__CE_isConnectedCallbackCalled = undefined;
    }

    /**
     * @param {!Element} element
     * @param {string} name
     * @param {?string} oldValue
     * @param {?string} newValue
     * @param {?string} namespace
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(element, name, oldValue, newValue, namespace) {
      var definition = element.__CE_definition;
      if (definition.attributeChangedCallback && definition.observedAttributes.indexOf(name) > -1) {
        definition.attributeChangedCallback.call(element, name, oldValue, newValue, namespace);
      }
    }
  }]);
  return CustomElementInternals;
}();

var DocumentConstructionObserver = function () {
  function DocumentConstructionObserver(internals, doc) {
    classCallCheck(this, DocumentConstructionObserver);

    /**
     * @type {!CustomElementInternals}
     */
    this._internals = internals;

    /**
     * @type {!Document}
     */
    this._document = doc;

    /**
     * @type {MutationObserver|undefined}
     */
    this._observer = undefined;

    // Simulate tree construction for all currently accessible nodes in the
    // document.
    this._internals.patchAndUpgradeTree(this._document);

    if (this._document.readyState === 'loading') {
      this._observer = new MutationObserver(this._handleMutations.bind(this));

      // Nodes created by the parser are given to the observer *before* the next
      // task runs. Inline scripts are run in a new task. This means that the
      // observer will be able to handle the newly parsed nodes before the inline
      // script is run.
      this._observer.observe(this._document, {
        childList: true,
        subtree: true
      });
    }
  }

  createClass(DocumentConstructionObserver, [{
    key: 'disconnect',
    value: function disconnect() {
      if (this._observer) {
        this._observer.disconnect();
      }
    }

    /**
     * @param {!Array<!MutationRecord>} mutations
     */

  }, {
    key: '_handleMutations',
    value: function _handleMutations(mutations) {
      // Once the document's `readyState` is 'interactive' or 'complete', all new
      // nodes created within that document will be the result of script and
      // should be handled by patching.
      var readyState = this._document.readyState;
      if (readyState === 'interactive' || readyState === 'complete') {
        this.disconnect();
      }

      for (var i = 0; i < mutations.length; i++) {
        var addedNodes = mutations[i].addedNodes;
        for (var j = 0; j < addedNodes.length; j++) {
          var node = addedNodes[j];
          this._internals.patchAndUpgradeTree(node);
        }
      }
    }
  }]);
  return DocumentConstructionObserver;
}();

/**
 * @template T
 */
var Deferred = function () {
  function Deferred() {
    var _this = this;

    classCallCheck(this, Deferred);

    /**
     * @private
     * @type {T|undefined}
     */
    this._value = undefined;

    /**
     * @private
     * @type {Function|undefined}
     */
    this._resolve = undefined;

    /**
     * @private
     * @type {!Promise<T>}
     */
    this._promise = new Promise(function (resolve) {
      _this._resolve = resolve;

      if (_this._value) {
        resolve(_this._value);
      }
    });
  }

  /**
   * @param {T} value
   */


  createClass(Deferred, [{
    key: 'resolve',
    value: function resolve(value) {
      if (this._value) {
        throw new Error('Already resolved.');
      }

      this._value = value;

      if (this._resolve) {
        this._resolve(value);
      }
    }

    /**
     * @return {!Promise<T>}
     */

  }, {
    key: 'toPromise',
    value: function toPromise() {
      return this._promise;
    }
  }]);
  return Deferred;
}();

/**
 * @unrestricted
 */

var CustomElementRegistry = function () {

  /**
   * @param {!CustomElementInternals} internals
   */
  function CustomElementRegistry(internals) {
    classCallCheck(this, CustomElementRegistry);

    /**
     * @private
     * @type {boolean}
     */
    this._elementDefinitionIsRunning = false;

    /**
     * @private
     * @type {!CustomElementInternals}
     */
    this._internals = internals;

    /**
     * @private
     * @type {!Map<string, !Deferred<undefined>>}
     */
    this._whenDefinedDeferred = new Map();

    /**
     * The default flush callback triggers the document walk synchronously.
     * @private
     * @type {!Function}
     */
    this._flushCallback = function (fn) {
      return fn();
    };

    /**
     * @private
     * @type {boolean}
     */
    this._flushPending = false;

    /**
     * @private
     * @type {!Array<string>}
     */
    this._unflushedLocalNames = [];

    /**
     * @private
     * @type {!DocumentConstructionObserver}
     */
    this._documentConstructionObserver = new DocumentConstructionObserver(internals, document);
  }

  /**
   * @param {string} localName
   * @param {!Function} constructor
   */


  createClass(CustomElementRegistry, [{
    key: 'define',
    value: function define(localName, constructor) {
      var _this = this;

      if (!(constructor instanceof Function)) {
        throw new TypeError('Custom element constructors must be functions.');
      }

      if (!isValidCustomElementName(localName)) {
        throw new SyntaxError('The element name \'' + localName + '\' is not valid.');
      }

      if (this._internals.localNameToDefinition(localName)) {
        throw new Error('A custom element with name \'' + localName + '\' has already been defined.');
      }

      if (this._elementDefinitionIsRunning) {
        throw new Error('A custom element is already being defined.');
      }
      this._elementDefinitionIsRunning = true;

      var connectedCallback = void 0;
      var disconnectedCallback = void 0;
      var adoptedCallback = void 0;
      var attributeChangedCallback = void 0;
      var observedAttributes = void 0;
      try {
        var getCallback = function getCallback(name) {
          var callbackValue = prototype[name];
          if (callbackValue !== undefined && !(callbackValue instanceof Function)) {
            throw new Error('The \'' + name + '\' callback must be a function.');
          }
          return callbackValue;
        };

        /** @type {!Object} */
        var prototype = constructor.prototype;
        if (!(prototype instanceof Object)) {
          throw new TypeError('The custom element constructor\'s prototype is not an object.');
        }

        connectedCallback = getCallback('connectedCallback');
        disconnectedCallback = getCallback('disconnectedCallback');
        adoptedCallback = getCallback('adoptedCallback');
        attributeChangedCallback = getCallback('attributeChangedCallback');
        observedAttributes = constructor['observedAttributes'] || [];
      } catch (e) {
        return;
      } finally {
        this._elementDefinitionIsRunning = false;
      }

      var definition = {
        localName: localName,
        constructor: constructor,
        connectedCallback: connectedCallback,
        disconnectedCallback: disconnectedCallback,
        adoptedCallback: adoptedCallback,
        attributeChangedCallback: attributeChangedCallback,
        observedAttributes: observedAttributes,
        constructionStack: []
      };

      this._internals.setDefinition(localName, definition);

      this._unflushedLocalNames.push(localName);

      // If we've already called the flush callback and it hasn't called back yet,
      // don't call it again.
      if (!this._flushPending) {
        this._flushPending = true;
        this._flushCallback(function () {
          return _this._flush();
        });
      }
    }
  }, {
    key: '_flush',
    value: function _flush() {
      // If no new definitions were defined, don't attempt to flush. This could
      // happen if a flush callback keeps the function it is given and calls it
      // multiple times.
      if (this._flushPending === false) return;

      this._flushPending = false;
      this._internals.patchAndUpgradeTree(document);

      while (this._unflushedLocalNames.length > 0) {
        var localName = this._unflushedLocalNames.shift();
        var deferred = this._whenDefinedDeferred.get(localName);
        if (deferred) {
          deferred.resolve(undefined);
        }
      }
    }

    /**
     * @param {string} localName
     * @return {Function|undefined}
     */

  }, {
    key: 'get',
    value: function get$$1(localName) {
      var definition = this._internals.localNameToDefinition(localName);
      if (definition) {
        return definition.constructor;
      }

      return undefined;
    }

    /**
     * @param {string} localName
     * @return {!Promise<undefined>}
     */

  }, {
    key: 'whenDefined',
    value: function whenDefined(localName) {
      if (!isValidCustomElementName(localName)) {
        return Promise.reject(new SyntaxError('\'' + localName + '\' is not a valid custom element name.'));
      }

      var prior = this._whenDefinedDeferred.get(localName);
      if (prior) {
        return prior.toPromise();
      }

      var deferred = new Deferred();
      this._whenDefinedDeferred.set(localName, deferred);

      var definition = this._internals.localNameToDefinition(localName);
      // Resolve immediately only if the given local name has a definition *and*
      // the full document walk to upgrade elements with that local name has
      // already happened.
      if (definition && this._unflushedLocalNames.indexOf(localName) === -1) {
        deferred.resolve(undefined);
      }

      return deferred.toPromise();
    }
  }, {
    key: 'polyfillWrapFlushCallback',
    value: function polyfillWrapFlushCallback(outer) {
      this._documentConstructionObserver.disconnect();
      var inner = this._flushCallback;
      this._flushCallback = function (flush) {
        return outer(function () {
          return inner(flush);
        });
      };
    }
  }]);
  return CustomElementRegistry;
}();

window['CustomElementRegistry'] = CustomElementRegistry;
CustomElementRegistry.prototype['define'] = CustomElementRegistry.prototype.define;
CustomElementRegistry.prototype['get'] = CustomElementRegistry.prototype.get;
CustomElementRegistry.prototype['whenDefined'] = CustomElementRegistry.prototype.whenDefined;
CustomElementRegistry.prototype['polyfillWrapFlushCallback'] = CustomElementRegistry.prototype.polyfillWrapFlushCallback;

var Native = {
  Document_createElement: window.Document.prototype.createElement,
  Document_createElementNS: window.Document.prototype.createElementNS,
  Document_importNode: window.Document.prototype.importNode,
  Document_prepend: window.Document.prototype['prepend'],
  Document_append: window.Document.prototype['append'],
  Node_cloneNode: window.Node.prototype.cloneNode,
  Node_appendChild: window.Node.prototype.appendChild,
  Node_insertBefore: window.Node.prototype.insertBefore,
  Node_removeChild: window.Node.prototype.removeChild,
  Node_replaceChild: window.Node.prototype.replaceChild,
  Node_textContent: Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
  Element_attachShadow: window.Element.prototype['attachShadow'],
  Element_innerHTML: Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
  Element_getAttribute: window.Element.prototype.getAttribute,
  Element_setAttribute: window.Element.prototype.setAttribute,
  Element_removeAttribute: window.Element.prototype.removeAttribute,
  Element_getAttributeNS: window.Element.prototype.getAttributeNS,
  Element_setAttributeNS: window.Element.prototype.setAttributeNS,
  Element_removeAttributeNS: window.Element.prototype.removeAttributeNS,
  Element_insertAdjacentElement: window.Element.prototype['insertAdjacentElement'],
  Element_prepend: window.Element.prototype['prepend'],
  Element_append: window.Element.prototype['append'],
  Element_before: window.Element.prototype['before'],
  Element_after: window.Element.prototype['after'],
  Element_replaceWith: window.Element.prototype['replaceWith'],
  Element_remove: window.Element.prototype['remove'],
  HTMLElement: window.HTMLElement,
  HTMLElement_innerHTML: Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML'),
  HTMLElement_insertAdjacentElement: window.HTMLElement.prototype['insertAdjacentElement']
};

/**
 * This class exists only to work around Closure's lack of a way to describe
 * singletons. It represents the 'already constructed marker' used in custom
 * element construction stacks.
 *
 * https://html.spec.whatwg.org/#concept-already-constructed-marker
 */
var AlreadyConstructedMarker = function AlreadyConstructedMarker() {
  classCallCheck(this, AlreadyConstructedMarker);
};

var AlreadyConstructedMarker$1 = new AlreadyConstructedMarker();

/**
 * @param {!CustomElementInternals} internals
 */
var PatchHTMLElement = function (internals) {
  window['HTMLElement'] = function () {
    /**
     * @type {function(new: HTMLElement): !HTMLElement}
     */
    function HTMLElement() {
      // This should really be `new.target` but `new.target` can't be emulated
      // in ES5. Assuming the user keeps the default value of the constructor's
      // prototype's `constructor` property, this is equivalent.
      /** @type {!Function} */
      var constructor = this.constructor;

      var definition = internals.constructorToDefinition(constructor);
      if (!definition) {
        throw new Error('The custom element being constructed was not registered with `customElements`.');
      }

      var constructionStack = definition.constructionStack;

      if (constructionStack.length === 0) {
        var _element = Native.Document_createElement.call(document, definition.localName);
        Object.setPrototypeOf(_element, constructor.prototype);
        _element.__CE_state = CustomElementState.custom;
        _element.__CE_definition = definition;
        internals.patch(_element);
        return _element;
      }

      var lastIndex = constructionStack.length - 1;
      var element = constructionStack[lastIndex];
      if (element === AlreadyConstructedMarker$1) {
        throw new Error('The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.');
      }
      constructionStack[lastIndex] = AlreadyConstructedMarker$1;

      Object.setPrototypeOf(element, constructor.prototype);
      internals.patch( /** @type {!HTMLElement} */element);

      return element;
    }

    HTMLElement.prototype = Native.HTMLElement.prototype;

    return HTMLElement;
  }();
};

/**
 * @param {!CustomElementInternals} internals
 * @param {!Object} destination
 * @param {!ParentNodeNativeMethods} builtIn
 */
var PatchParentNode = function (internals, destination, builtIn) {
  /**
   * @param {...(!Node|string)} nodes
   */
  destination['prepend'] = function () {
    for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
      nodes[_key] = arguments[_key];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.prepend.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  /**
   * @param {...(!Node|string)} nodes
   */
  destination['append'] = function () {
    for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      nodes[_key2] = arguments[_key2];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.append.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i2 = 0; _i2 < nodes.length; _i2++) {
        var node = nodes[_i2];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };
};

/**
 * @param {!CustomElementInternals} internals
 */
var PatchDocument = function (internals) {
  setPropertyUnchecked(Document.prototype, 'createElement',
  /**
   * @this {Document}
   * @param {string} localName
   * @return {!Element}
   */
  function (localName) {
    // Only create custom elements if this document is associated with the registry.
    if (this.__CE_hasRegistry) {
      var definition = internals.localNameToDefinition(localName);
      if (definition) {
        return new definition.constructor();
      }
    }

    var result = /** @type {!Element} */
    Native.Document_createElement.call(this, localName);
    internals.patch(result);
    return result;
  });

  setPropertyUnchecked(Document.prototype, 'importNode',
  /**
   * @this {Document}
   * @param {!Node} node
   * @param {boolean=} deep
   * @return {!Node}
   */
  function (node, deep) {
    var clone = Native.Document_importNode.call(this, node, deep);
    // Only create custom elements if this document is associated with the registry.
    if (!this.__CE_hasRegistry) {
      internals.patchTree(clone);
    } else {
      internals.patchAndUpgradeTree(clone);
    }
    return clone;
  });

  var NS_HTML = "http://www.w3.org/1999/xhtml";

  setPropertyUnchecked(Document.prototype, 'createElementNS',
  /**
   * @this {Document}
   * @param {?string} namespace
   * @param {string} localName
   * @return {!Element}
   */
  function (namespace, localName) {
    // Only create custom elements if this document is associated with the registry.
    if (this.__CE_hasRegistry && (namespace === null || namespace === NS_HTML)) {
      var definition = internals.localNameToDefinition(localName);
      if (definition) {
        return new definition.constructor();
      }
    }

    var result = /** @type {!Element} */
    Native.Document_createElementNS.call(this, namespace, localName);
    internals.patch(result);
    return result;
  });

  PatchParentNode(internals, Document.prototype, {
    prepend: Native.Document_prepend,
    append: Native.Document_append
  });
};

/**
 * @param {!CustomElementInternals} internals
 */
var PatchNode = function (internals) {
  // `Node#nodeValue` is implemented on `Attr`.
  // `Node#textContent` is implemented on `Attr`, `Element`.

  setPropertyUnchecked(Node.prototype, 'insertBefore',
  /**
   * @this {Node}
   * @param {!Node} node
   * @param {?Node} refNode
   * @return {!Node}
   */
  function (node, refNode) {
    if (node instanceof DocumentFragment) {
      var insertedNodes = Array.prototype.slice.apply(node.childNodes);
      var _nativeResult = Native.Node_insertBefore.call(this, node, refNode);

      // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (isConnected(this)) {
        for (var i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return _nativeResult;
    }

    var nodeWasConnected = isConnected(node);
    var nativeResult = Native.Node_insertBefore.call(this, node, refNode);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    if (isConnected(this)) {
      internals.connectTree(node);
    }

    return nativeResult;
  });

  setPropertyUnchecked(Node.prototype, 'appendChild',
  /**
   * @this {Node}
   * @param {!Node} node
   * @return {!Node}
   */
  function (node) {
    if (node instanceof DocumentFragment) {
      var insertedNodes = Array.prototype.slice.apply(node.childNodes);
      var _nativeResult2 = Native.Node_appendChild.call(this, node);

      // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (isConnected(this)) {
        for (var i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return _nativeResult2;
    }

    var nodeWasConnected = isConnected(node);
    var nativeResult = Native.Node_appendChild.call(this, node);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    if (isConnected(this)) {
      internals.connectTree(node);
    }

    return nativeResult;
  });

  setPropertyUnchecked(Node.prototype, 'cloneNode',
  /**
   * @this {Node}
   * @param {boolean=} deep
   * @return {!Node}
   */
  function (deep) {
    var clone = Native.Node_cloneNode.call(this, deep);
    // Only create custom elements if this element's owner document is
    // associated with the registry.
    if (!this.ownerDocument.__CE_hasRegistry) {
      internals.patchTree(clone);
    } else {
      internals.patchAndUpgradeTree(clone);
    }
    return clone;
  });

  setPropertyUnchecked(Node.prototype, 'removeChild',
  /**
   * @this {Node}
   * @param {!Node} node
   * @return {!Node}
   */
  function (node) {
    var nodeWasConnected = isConnected(node);
    var nativeResult = Native.Node_removeChild.call(this, node);

    if (nodeWasConnected) {
      internals.disconnectTree(node);
    }

    return nativeResult;
  });

  setPropertyUnchecked(Node.prototype, 'replaceChild',
  /**
   * @this {Node}
   * @param {!Node} nodeToInsert
   * @param {!Node} nodeToRemove
   * @return {!Node}
   */
  function (nodeToInsert, nodeToRemove) {
    if (nodeToInsert instanceof DocumentFragment) {
      var insertedNodes = Array.prototype.slice.apply(nodeToInsert.childNodes);
      var _nativeResult3 = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove);

      // DocumentFragments can't be connected, so `disconnectTree` will never
      // need to be called on a DocumentFragment's children after inserting it.

      if (isConnected(this)) {
        internals.disconnectTree(nodeToRemove);
        for (var i = 0; i < insertedNodes.length; i++) {
          internals.connectTree(insertedNodes[i]);
        }
      }

      return _nativeResult3;
    }

    var nodeToInsertWasConnected = isConnected(nodeToInsert);
    var nativeResult = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove);
    var thisIsConnected = isConnected(this);

    if (thisIsConnected) {
      internals.disconnectTree(nodeToRemove);
    }

    if (nodeToInsertWasConnected) {
      internals.disconnectTree(nodeToInsert);
    }

    if (thisIsConnected) {
      internals.connectTree(nodeToInsert);
    }

    return nativeResult;
  });

  function patch_textContent(destination, baseDescriptor) {
    Object.defineProperty(destination, 'textContent', {
      enumerable: baseDescriptor.enumerable,
      configurable: true,
      get: baseDescriptor.get,
      set: /** @this {Node} */function set(assignedValue) {
        // If this is a text node then there are no nodes to disconnect.
        if (this.nodeType === Node.TEXT_NODE) {
          baseDescriptor.set.call(this, assignedValue);
          return;
        }

        var removedNodes = undefined;
        // Checking for `firstChild` is faster than reading `childNodes.length`
        // to compare with 0.
        if (this.firstChild) {
          // Using `childNodes` is faster than `children`, even though we only
          // care about elements.
          var childNodes = this.childNodes;
          var childNodesLength = childNodes.length;
          if (childNodesLength > 0 && isConnected(this)) {
            // Copying an array by iterating is faster than using slice.
            removedNodes = new Array(childNodesLength);
            for (var i = 0; i < childNodesLength; i++) {
              removedNodes[i] = childNodes[i];
            }
          }
        }

        baseDescriptor.set.call(this, assignedValue);

        if (removedNodes) {
          for (var _i = 0; _i < removedNodes.length; _i++) {
            internals.disconnectTree(removedNodes[_i]);
          }
        }
      }
    });
  }

  if (Native.Node_textContent && Native.Node_textContent.get) {
    patch_textContent(Node.prototype, Native.Node_textContent);
  } else {
    internals.addPatch(function (element) {
      patch_textContent(element, {
        enumerable: true,
        configurable: true,
        // NOTE: This implementation of the `textContent` getter assumes that
        // text nodes' `textContent` getter will not be patched.
        get: /** @this {Node} */function get() {
          /** @type {!Array<string>} */
          var parts = [];

          for (var i = 0; i < this.childNodes.length; i++) {
            parts.push(this.childNodes[i].textContent);
          }

          return parts.join('');
        },
        set: /** @this {Node} */function set(assignedValue) {
          while (this.firstChild) {
            Native.Node_removeChild.call(this, this.firstChild);
          }
          Native.Node_appendChild.call(this, document.createTextNode(assignedValue));
        }
      });
    });
  }
};

/**
 * @param {!CustomElementInternals} internals
 * @param {!Object} destination
 * @param {!ChildNodeNativeMethods} builtIn
 */
var PatchChildNode = function (internals, destination, builtIn) {
  /**
   * @param {...(!Node|string)} nodes
   */
  destination['before'] = function () {
    for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
      nodes[_key] = arguments[_key];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.before.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i = 0; _i < nodes.length; _i++) {
        var node = nodes[_i];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  /**
   * @param {...(!Node|string)} nodes
   */
  destination['after'] = function () {
    for (var _len2 = arguments.length, nodes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      nodes[_key2] = arguments[_key2];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    builtIn.after.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (isConnected(this)) {
      for (var _i2 = 0; _i2 < nodes.length; _i2++) {
        var node = nodes[_i2];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  /**
   * @param {...(!Node|string)} nodes
   */
  destination['replaceWith'] = function () {
    for (var _len3 = arguments.length, nodes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      nodes[_key3] = arguments[_key3];
    }

    // TODO: Fix this for when one of `nodes` is a DocumentFragment!
    var connectedBefore = /** @type {!Array<!Node>} */nodes.filter(function (node) {
      // DocumentFragments are not connected and will not be added to the list.
      return node instanceof Node && isConnected(node);
    });

    var wasConnected = isConnected(this);

    builtIn.replaceWith.apply(this, nodes);

    for (var i = 0; i < connectedBefore.length; i++) {
      internals.disconnectTree(connectedBefore[i]);
    }

    if (wasConnected) {
      internals.disconnectTree(this);
      for (var _i3 = 0; _i3 < nodes.length; _i3++) {
        var node = nodes[_i3];
        if (node instanceof Element) {
          internals.connectTree(node);
        }
      }
    }
  };

  destination['remove'] = function () {
    var wasConnected = isConnected(this);

    builtIn.remove.call(this);

    if (wasConnected) {
      internals.disconnectTree(this);
    }
  };
};

/**
 * @param {!CustomElementInternals} internals
 */
var PatchElement = function (internals) {
  if (Native.Element_attachShadow) {
    setPropertyUnchecked(Element.prototype, 'attachShadow',
    /**
     * @this {Element}
     * @param {!{mode: string}} init
     * @return {ShadowRoot}
     */
    function (init) {
      var shadowRoot = Native.Element_attachShadow.call(this, init);
      this.__CE_shadowRoot = shadowRoot;
      return shadowRoot;
    });
  } else {
    console.warn('Custom Elements: `Element#attachShadow` was not patched.');
  }

  function patch_innerHTML(destination, baseDescriptor) {
    Object.defineProperty(destination, 'innerHTML', {
      enumerable: baseDescriptor.enumerable,
      configurable: true,
      get: baseDescriptor.get,
      set: /** @this {Element} */function set(htmlString) {
        var _this = this;

        var isConnected$$1 = isConnected(this);

        // NOTE: In IE11, when using the native `innerHTML` setter, all nodes
        // that were previously descendants of the context element have all of
        // their children removed as part of the set - the entire subtree is
        // 'disassembled'. This work around walks the subtree *before* using the
        // native setter.
        /** @type {!Array<!Element>|undefined} */
        var removedElements = undefined;
        if (isConnected$$1) {
          removedElements = [];
          walkDeepDescendantElements(this, function (element) {
            if (element !== _this) {
              removedElements.push(element);
            }
          });
        }

        baseDescriptor.set.call(this, htmlString);

        if (removedElements) {
          for (var i = 0; i < removedElements.length; i++) {
            var element = removedElements[i];
            if (element.__CE_state === CustomElementState.custom) {
              internals.disconnectedCallback(element);
            }
          }
        }

        // Only create custom elements if this element's owner document is
        // associated with the registry.
        if (!this.ownerDocument.__CE_hasRegistry) {
          internals.patchTree(this);
        } else {
          internals.patchAndUpgradeTree(this);
        }
        return htmlString;
      }
    });
  }

  if (Native.Element_innerHTML && Native.Element_innerHTML.get) {
    patch_innerHTML(Element.prototype, Native.Element_innerHTML);
  } else if (Native.HTMLElement_innerHTML && Native.HTMLElement_innerHTML.get) {
    patch_innerHTML(HTMLElement.prototype, Native.HTMLElement_innerHTML);
  } else {

    /** @type {HTMLDivElement} */
    var rawDiv = Native.Document_createElement.call(document, 'div');

    internals.addPatch(function (element) {
      patch_innerHTML(element, {
        enumerable: true,
        configurable: true,
        // Implements getting `innerHTML` by performing an unpatched `cloneNode`
        // of the element and returning the resulting element's `innerHTML`.
        // TODO: Is this too expensive?
        get: /** @this {Element} */function get() {
          return Native.Node_cloneNode.call(this, true).innerHTML;
        },
        // Implements setting `innerHTML` by creating an unpatched element,
        // setting `innerHTML` of that element and replacing the target
        // element's children with those of the unpatched element.
        set: /** @this {Element} */function set(assignedValue) {
          // NOTE: re-route to `content` for `template` elements.
          // We need to do this because `template.appendChild` does not
          // route into `template.content`.
          /** @type {!Node} */
          var content = this.localName === 'template' ? /** @type {!HTMLTemplateElement} */this.content : this;
          rawDiv.innerHTML = assignedValue;

          while (content.childNodes.length > 0) {
            Native.Node_removeChild.call(content, content.childNodes[0]);
          }
          while (rawDiv.childNodes.length > 0) {
            Native.Node_appendChild.call(content, rawDiv.childNodes[0]);
          }
        }
      });
    });
  }

  setPropertyUnchecked(Element.prototype, 'setAttribute',
  /**
   * @this {Element}
   * @param {string} name
   * @param {string} newValue
   */
  function (name, newValue) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_setAttribute.call(this, name, newValue);
    }

    var oldValue = Native.Element_getAttribute.call(this, name);
    Native.Element_setAttribute.call(this, name, newValue);
    newValue = Native.Element_getAttribute.call(this, name);
    internals.attributeChangedCallback(this, name, oldValue, newValue, null);
  });

  setPropertyUnchecked(Element.prototype, 'setAttributeNS',
  /**
   * @this {Element}
   * @param {?string} namespace
   * @param {string} name
   * @param {string} newValue
   */
  function (namespace, name, newValue) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_setAttributeNS.call(this, namespace, name, newValue);
    }

    var oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
    Native.Element_setAttributeNS.call(this, namespace, name, newValue);
    newValue = Native.Element_getAttributeNS.call(this, namespace, name);
    internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
  });

  setPropertyUnchecked(Element.prototype, 'removeAttribute',
  /**
   * @this {Element}
   * @param {string} name
   */
  function (name) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_removeAttribute.call(this, name);
    }

    var oldValue = Native.Element_getAttribute.call(this, name);
    Native.Element_removeAttribute.call(this, name);
    if (oldValue !== null) {
      internals.attributeChangedCallback(this, name, oldValue, null, null);
    }
  });

  setPropertyUnchecked(Element.prototype, 'removeAttributeNS',
  /**
   * @this {Element}
   * @param {?string} namespace
   * @param {string} name
   */
  function (namespace, name) {
    // Fast path for non-custom elements.
    if (this.__CE_state !== CustomElementState.custom) {
      return Native.Element_removeAttributeNS.call(this, namespace, name);
    }

    var oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
    Native.Element_removeAttributeNS.call(this, namespace, name);
    // In older browsers, `Element#getAttributeNS` may return the empty string
    // instead of null if the attribute does not exist. For details, see;
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS#Notes
    var newValue = Native.Element_getAttributeNS.call(this, namespace, name);
    if (oldValue !== newValue) {
      internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
    }
  });

  function patch_insertAdjacentElement(destination, baseMethod) {
    setPropertyUnchecked(destination, 'insertAdjacentElement',
    /**
     * @this {Element}
     * @param {string} where
     * @param {!Element} element
     * @return {?Element}
     */
    function (where, element) {
      var wasConnected = isConnected(element);
      var insertedElement = /** @type {!Element} */
      baseMethod.call(this, where, element);

      if (wasConnected) {
        internals.disconnectTree(element);
      }

      if (isConnected(insertedElement)) {
        internals.connectTree(element);
      }
      return insertedElement;
    });
  }

  if (Native.HTMLElement_insertAdjacentElement) {
    patch_insertAdjacentElement(HTMLElement.prototype, Native.HTMLElement_insertAdjacentElement);
  } else if (Native.Element_insertAdjacentElement) {
    patch_insertAdjacentElement(Element.prototype, Native.Element_insertAdjacentElement);
  } else {
    console.warn('Custom Elements: `Element#insertAdjacentElement` was not patched.');
  }

  PatchParentNode(internals, Element.prototype, {
    prepend: Native.Element_prepend,
    append: Native.Element_append
  });

  PatchChildNode(internals, Element.prototype, {
    before: Native.Element_before,
    after: Native.Element_after,
    replaceWith: Native.Element_replaceWith,
    remove: Native.Element_remove
  });
};

/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

var priorCustomElements = window['customElements'];

if (!priorCustomElements || priorCustomElements['forcePolyfill'] || typeof priorCustomElements['define'] != 'function' || typeof priorCustomElements['get'] != 'function') {
  /** @type {!CustomElementInternals} */
  var internals = new CustomElementInternals();

  PatchHTMLElement(internals);
  PatchDocument(internals);
  PatchNode(internals);
  PatchElement(internals);

  // The main document is always associated with the registry.
  document.__CE_hasRegistry = true;

  /** @type {!CustomElementRegistry} */
  var customElements = new CustomElementRegistry(internals);

  Object.defineProperty(window, 'customElements', {
    configurable: true,
    enumerable: true,
    value: customElements
  });
}

/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.7.22
if (typeof WeakMap === "undefined") {
  (function () {
    var defineProperty = Object.defineProperty;
    var counter = Date.now() % 1e9;
    var WeakMap = function WeakMap() {
      this.name = "__st" + (Math.random() * 1e9 >>> 0) + (counter++ + "__");
    };
    WeakMap.prototype = {
      set: function set(key, value) {
        var entry = key[this.name];
        if (entry && entry[0] === key) entry[1] = value;else defineProperty(key, this.name, {
          value: [key, value],
          writable: true
        });
        return this;
      },
      get: function get(key) {
        var entry;
        return (entry = key[this.name]) && entry[0] === key ? entry[1] : undefined;
      },
      "delete": function _delete(key) {
        var entry = key[this.name];
        if (!entry || entry[0] !== key) return false;
        entry[0] = entry[1] = undefined;
        return true;
      },
      has: function has(key) {
        var entry = key[this.name];
        if (!entry) return false;
        return entry[0] === key;
      }
    };
    window.WeakMap = WeakMap;
  })();
}

(function (global) {
  if (global.JsMutationObserver) {
    return;
  }
  var registrationsTable = new WeakMap();
  var setImmediate;
  if (/Trident|Edge/.test(navigator.userAgent)) {
    setImmediate = setTimeout;
  } else if (window.setImmediate) {
    setImmediate = window.setImmediate;
  } else {
    var setImmediateQueue = [];
    var sentinel = String(Math.random());
    window.addEventListener("message", function (e) {
      if (e.data === sentinel) {
        var queue = setImmediateQueue;
        setImmediateQueue = [];
        queue.forEach(function (func) {
          func();
        });
      }
    });
    setImmediate = function setImmediate(func) {
      setImmediateQueue.push(func);
      window.postMessage(sentinel, "*");
    };
  }
  var isScheduled = false;
  var scheduledObservers = [];
  function scheduleCallback(observer) {
    scheduledObservers.push(observer);
    if (!isScheduled) {
      isScheduled = true;
      setImmediate(dispatchCallbacks);
    }
  }
  function wrapIfNeeded(node) {
    return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(node) || node;
  }
  function dispatchCallbacks() {
    isScheduled = false;
    var observers = scheduledObservers;
    scheduledObservers = [];
    observers.sort(function (o1, o2) {
      return o1.uid_ - o2.uid_;
    });
    var anyNonEmpty = false;
    observers.forEach(function (observer) {
      var queue = observer.takeRecords();
      removeTransientObserversFor(observer);
      if (queue.length) {
        observer.callback_(queue, observer);
        anyNonEmpty = true;
      }
    });
    if (anyNonEmpty) dispatchCallbacks();
  }
  function removeTransientObserversFor(observer) {
    observer.nodes_.forEach(function (node) {
      var registrations = registrationsTable.get(node);
      if (!registrations) return;
      registrations.forEach(function (registration) {
        if (registration.observer === observer) registration.removeTransientObservers();
      });
    });
  }
  function forEachAncestorAndObserverEnqueueRecord(target, callback) {
    for (var node = target; node; node = node.parentNode) {
      var registrations = registrationsTable.get(node);
      if (registrations) {
        for (var j = 0; j < registrations.length; j++) {
          var registration = registrations[j];
          var options = registration.options;
          if (node !== target && !options.subtree) continue;
          var record = callback(options);
          if (record) registration.enqueue(record);
        }
      }
    }
  }
  var uidCounter = 0;
  function JsMutationObserver(callback) {
    this.callback_ = callback;
    this.nodes_ = [];
    this.records_ = [];
    this.uid_ = ++uidCounter;
  }
  JsMutationObserver.prototype = {
    observe: function observe(target, options) {
      target = wrapIfNeeded(target);
      if (!options.childList && !options.attributes && !options.characterData || options.attributeOldValue && !options.attributes || options.attributeFilter && options.attributeFilter.length && !options.attributes || options.characterDataOldValue && !options.characterData) {
        throw new SyntaxError();
      }
      var registrations = registrationsTable.get(target);
      if (!registrations) registrationsTable.set(target, registrations = []);
      var registration;
      for (var i = 0; i < registrations.length; i++) {
        if (registrations[i].observer === this) {
          registration = registrations[i];
          registration.removeListeners();
          registration.options = options;
          break;
        }
      }
      if (!registration) {
        registration = new Registration(this, target, options);
        registrations.push(registration);
        this.nodes_.push(target);
      }
      registration.addListeners();
    },
    disconnect: function disconnect() {
      this.nodes_.forEach(function (node) {
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          var registration = registrations[i];
          if (registration.observer === this) {
            registration.removeListeners();
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
      this.records_ = [];
    },
    takeRecords: function takeRecords() {
      var copyOfRecords = this.records_;
      this.records_ = [];
      return copyOfRecords;
    }
  };
  function MutationRecord(type, target) {
    this.type = type;
    this.target = target;
    this.addedNodes = [];
    this.removedNodes = [];
    this.previousSibling = null;
    this.nextSibling = null;
    this.attributeName = null;
    this.attributeNamespace = null;
    this.oldValue = null;
  }
  function copyMutationRecord(original) {
    var record = new MutationRecord(original.type, original.target);
    record.addedNodes = original.addedNodes.slice();
    record.removedNodes = original.removedNodes.slice();
    record.previousSibling = original.previousSibling;
    record.nextSibling = original.nextSibling;
    record.attributeName = original.attributeName;
    record.attributeNamespace = original.attributeNamespace;
    record.oldValue = original.oldValue;
    return record;
  }
  var currentRecord, recordWithOldValue;
  function getRecord(type, target) {
    return currentRecord = new MutationRecord(type, target);
  }
  function getRecordWithOldValue(oldValue) {
    if (recordWithOldValue) return recordWithOldValue;
    recordWithOldValue = copyMutationRecord(currentRecord);
    recordWithOldValue.oldValue = oldValue;
    return recordWithOldValue;
  }
  function clearRecords() {
    currentRecord = recordWithOldValue = undefined;
  }
  function recordRepresentsCurrentMutation(record) {
    return record === recordWithOldValue || record === currentRecord;
  }
  function selectRecord(lastRecord, newRecord) {
    if (lastRecord === newRecord) return lastRecord;
    if (recordWithOldValue && recordRepresentsCurrentMutation(lastRecord)) return recordWithOldValue;
    return null;
  }
  function Registration(observer, target, options) {
    this.observer = observer;
    this.target = target;
    this.options = options;
    this.transientObservedNodes = [];
  }
  Registration.prototype = {
    enqueue: function enqueue(record) {
      var records = this.observer.records_;
      var length = records.length;
      if (records.length > 0) {
        var lastRecord = records[length - 1];
        var recordToReplaceLast = selectRecord(lastRecord, record);
        if (recordToReplaceLast) {
          records[length - 1] = recordToReplaceLast;
          return;
        }
      } else {
        scheduleCallback(this.observer);
      }
      records[length] = record;
    },
    addListeners: function addListeners() {
      this.addListeners_(this.target);
    },
    addListeners_: function addListeners_(node) {
      var options = this.options;
      if (options.attributes) node.addEventListener("DOMAttrModified", this, true);
      if (options.characterData) node.addEventListener("DOMCharacterDataModified", this, true);
      if (options.childList) node.addEventListener("DOMNodeInserted", this, true);
      if (options.childList || options.subtree) node.addEventListener("DOMNodeRemoved", this, true);
    },
    removeListeners: function removeListeners() {
      this.removeListeners_(this.target);
    },
    removeListeners_: function removeListeners_(node) {
      var options = this.options;
      if (options.attributes) node.removeEventListener("DOMAttrModified", this, true);
      if (options.characterData) node.removeEventListener("DOMCharacterDataModified", this, true);
      if (options.childList) node.removeEventListener("DOMNodeInserted", this, true);
      if (options.childList || options.subtree) node.removeEventListener("DOMNodeRemoved", this, true);
    },
    addTransientObserver: function addTransientObserver(node) {
      if (node === this.target) return;
      this.addListeners_(node);
      this.transientObservedNodes.push(node);
      var registrations = registrationsTable.get(node);
      if (!registrations) registrationsTable.set(node, registrations = []);
      registrations.push(this);
    },
    removeTransientObservers: function removeTransientObservers() {
      var transientObservedNodes = this.transientObservedNodes;
      this.transientObservedNodes = [];
      transientObservedNodes.forEach(function (node) {
        this.removeListeners_(node);
        var registrations = registrationsTable.get(node);
        for (var i = 0; i < registrations.length; i++) {
          if (registrations[i] === this) {
            registrations.splice(i, 1);
            break;
          }
        }
      }, this);
    },
    handleEvent: function handleEvent(e) {
      e.stopImmediatePropagation();
      switch (e.type) {
        case "DOMAttrModified":
          var name = e.attrName;
          var namespace = e.relatedNode.namespaceURI;
          var target = e.target;
          var record = new getRecord("attributes", target);
          record.attributeName = name;
          record.attributeNamespace = namespace;
          var oldValue = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
          forEachAncestorAndObserverEnqueueRecord(target, function (options) {
            if (!options.attributes) return;
            if (options.attributeFilter && options.attributeFilter.length && options.attributeFilter.indexOf(name) === -1 && options.attributeFilter.indexOf(namespace) === -1) {
              return;
            }
            if (options.attributeOldValue) return getRecordWithOldValue(oldValue);
            return record;
          });
          break;

        case "DOMCharacterDataModified":
          var target = e.target;
          var record = getRecord("characterData", target);
          var oldValue = e.prevValue;
          forEachAncestorAndObserverEnqueueRecord(target, function (options) {
            if (!options.characterData) return;
            if (options.characterDataOldValue) return getRecordWithOldValue(oldValue);
            return record;
          });
          break;

        case "DOMNodeRemoved":
          this.addTransientObserver(e.target);

        case "DOMNodeInserted":
          var changedNode = e.target;
          var addedNodes, removedNodes;
          if (e.type === "DOMNodeInserted") {
            addedNodes = [changedNode];
            removedNodes = [];
          } else {
            addedNodes = [];
            removedNodes = [changedNode];
          }
          var previousSibling = changedNode.previousSibling;
          var nextSibling = changedNode.nextSibling;
          var record = getRecord("childList", e.target.parentNode);
          record.addedNodes = addedNodes;
          record.removedNodes = removedNodes;
          record.previousSibling = previousSibling;
          record.nextSibling = nextSibling;
          forEachAncestorAndObserverEnqueueRecord(e.relatedNode, function (options) {
            if (!options.childList) return;
            return record;
          });
      }
      clearRecords();
    }
  };
  global.JsMutationObserver = JsMutationObserver;
  if (!global.MutationObserver) {
    global.MutationObserver = JsMutationObserver;
    JsMutationObserver._isPolyfilled = true;
  }
})(self);

/*
Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function () {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                new Function("" + handler)();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function setImmediate() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(self);

// Caution:
// Do not replace this import statement with codes.
//
// If you replace this import statement with codes,
// the codes will be executed after the following polyfills are imported
// because import statements are hoisted during compilation.
// Polyfill ECMAScript standard features with global namespace pollution
// Polyfill Custom Elements v1 with global namespace pollution
// Polyfill MutationObserver with global namespace pollution
// Polyfill setImmediate with global namespace pollution

(function () {
	'use strict';

	/**
  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
  *
  * @codingstandard ftlabs-jsv2
  * @copyright The Financial Times Limited [All Rights Reserved]
  * @license MIT License (see LICENSE.txt)
  */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/

	/**
  * Instantiate fast-clicking listeners on the specified layer.
  *
  * @constructor
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */

	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
   * Whether a click is currently being tracked.
   *
   * @type boolean
   */
		this.trackingClick = false;

		/**
   * Timestamp for when click tracking started.
   *
   * @type number
   */
		this.trackingClickStart = 0;

		/**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
		this.targetElement = null;

		/**
   * X-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartX = 0;

		/**
   * Y-coordinate of touch start event.
   *
   * @type number
   */
		this.touchStartY = 0;

		/**
   * ID of the last touch, retrieved from Touch.identifier.
   *
   * @type number
   */
		this.lastTouchIdentifier = 0;

		/**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
		this.touchBoundary = options.touchBoundary || 10;

		/**
   * The FastClick layer.
   *
   * @type Element
   */
		this.layer = layer;

		/**
   * The minimum time between tap(touchstart and touchend) events
   *
   * @type number
   */
		this.tapDelay = options.tapDelay || 200;

		/**
   * The maximum time for a tap
   *
   * @type number
   */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function () {
				return method.apply(context, arguments);
			};
		}

		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function (type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function (type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function (event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
 *
 * @type boolean
 */
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
  * Android requires exceptions.
  *
  * @type boolean
  */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	/**
  * iOS requires exceptions.
  *
  * @type boolean
  */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	/**
  * iOS 4 requires an exception for select elements.
  *
  * @type boolean
  */
	var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

	/**
  * iOS 6.0-7.* requires the target element to be manually derived
  *
  * @type boolean
  */
	var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

	/**
  * BlackBerry requires exceptions.
  *
  * @type boolean
  */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
  * Determine whether a given element requires a native click.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element needs a native click
  */
	FastClick.prototype.needsClick = function (target) {
		switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if (deviceIsIOS && target.type === 'file' || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
		}

		return (/\bneedsclick\b/.test(target.className)
		);
	};

	/**
  * Determine whether a given element requires a call to focus to simulate click into element.
  *
  * @param {EventTarget|Element} target Target DOM element
  * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
  */
	FastClick.prototype.needsFocus = function (target) {
		switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
					case 'button':
					case 'checkbox':
					case 'file':
					case 'image':
					case 'radio':
					case 'submit':
						return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/.test(target.className)
				);
		}
	};

	/**
  * Send a click event to the specified element.
  *
  * @param {EventTarget|Element} targetElement
  * @param {Event} event
  */
	FastClick.prototype.sendClick = function (targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesize a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function (targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	/**
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.focus = function (targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

	/**
  * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
  *
  * @param {EventTarget|Element} targetElement
  */
	FastClick.prototype.updateScrollParent = function (targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};

	/**
  * @param {EventTarget} targetElement
  * @returns {Element|EventTarget}
  */
	FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

	/**
  * On touch start, record the position and scroll offset.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchStart = function (event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		// Ignore touches on contenteditable elements to prevent conflict with text selection.
		// (For details: https://github.com/ftlabs/fastclick/pull/211 )
		if (targetElement.isContentEditable) {
			return true;
		}

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay && event.timeStamp - this.lastClickTime > -1) {
			event.preventDefault();
		}

		return true;
	};

	/**
  * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.touchHasMoved = function (event) {
		var touch = event.changedTouches[0],
		    boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};

	/**
  * Update the last position.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchMove = function (event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};

	/**
  * Attempt to find the labelled control for the given label element.
  *
  * @param {EventTarget|HTMLLabelElement} labelElement
  * @returns {Element|null}
  */
	FastClick.prototype.findControl = function (labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};

	/**
  * On touch end, determine whether to send a click event at once.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onTouchEnd = function (event) {
		var forElement,
		    trackingClickStart,
		    targetTagName,
		    scrollParent,
		    touch,
		    targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if (event.timeStamp - this.lastClickTime < this.tapDelay && event.timeStamp - this.lastClickTime > -1) {
			this.cancelNextClick = true;
			return true;
		}

		if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};

	/**
  * On touch cancel, stop tracking the click.
  *
  * @returns {void}
  */
	FastClick.prototype.onTouchCancel = function () {
		this.trackingClick = false;
		this.targetElement = null;
	};

	/**
  * Determine mouse events which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onMouse = function (event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};

	/**
  * On actual clicks, determine whether this is a touch-generated click, a click action occurring
  * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
  * an actual click which should be permitted.
  *
  * @param {Event} event
  * @returns {boolean}
  */
	FastClick.prototype.onClick = function (event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behavior on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};

	/**
  * Remove all FastClick's event listeners.
  *
  * @returns {void}
  */
	FastClick.prototype.destroy = function () {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};

	/**
  * Check whether FastClick is needed.
  *
  * @param {Element} layer The layer to listen on
  */
	FastClick.notNeeded = function (layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

				// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recommended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};

	/**
  * Factory method for creating a FastClick object
  *
  * @param {Element} layer The layer to listen on
  * @param {Object} [options={}] The options to override the defaults
  */
	FastClick.attach = function (layer, options) {
		return new FastClick(layer, options);
	};

	window.FastClick = FastClick;
})();

(function () {
  var DEFAULT_VIEWPORT = 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no';

  var Viewport = {
    ensureViewportElement: function ensureViewportElement() {
      var viewportElement = document.querySelector('meta[name=viewport]');

      if (!viewportElement) {
        viewportElement = document.createElement('meta');
        viewportElement.name = 'viewport';
        document.head.appendChild(viewportElement);
      }

      return viewportElement;
    },

    setup: function setup() {
      var viewportElement = Viewport.ensureViewportElement();

      if (!viewportElement) {
        return;
      }

      if (!viewportElement.hasAttribute('content')) {
        viewportElement.setAttribute('content', DEFAULT_VIEWPORT);
      }
    }
  };

  window.Viewport = Viewport;
})();

// Load non-polyfill libraries
// import './microevent.js@47cbc14+mod/microevent.js';

function setup(ons$$1) {
  if (window.ons) {
    ons$$1._util.warn('Onsen UI is loaded more than once.');
  }

  // fastclick
  window.addEventListener('load', function () {
    ons$$1.fastClick = FastClick.attach(document.body);

    var supportTouchAction = 'touch-action' in document.body.style;

    ons$$1.platform._runOnActualPlatform(function () {
      if (ons$$1.platform.isAndroid()) {
        // In Android4.4+, correct viewport settings can remove click delay.
        // So disable FastClick on Android.
        ons$$1.fastClick.destroy();
      } else if (ons$$1.platform.isIOS()) {
        if (supportTouchAction && (ons$$1.platform.isIOSSafari() || ons$$1.platform.isWKWebView())) {
          // If 'touch-action' supported in iOS Safari or WKWebView, disable FastClick.
          ons$$1.fastClick.destroy();
        } else {
          // Do nothing. 'touch-action: manipulation' has no effect on UIWebView.
        }
      }
    });
  }, false);

  ons$$1.ready(function () {
    ons$$1.enableDeviceBackButtonHandler();
    ons$$1._defaultDeviceBackButtonHandler = ons$$1._internal.dbbDispatcher.createHandler(window.document.body, function () {
      if (Object.hasOwnProperty.call(navigator, 'app')) {
        navigator.app.exitApp();
      } else {
        console.warn('Could not close the app. Is \'cordova.js\' included?\nError: \'window.navigator.app\' is undefined.');
      }
    });
    document.body._gestureDetector = new ons$$1.GestureDetector(document.body);

    // Simulate Device Back Button on ESC press
    if (!ons$$1.platform.isWebView()) {
      document.body.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
          ons$$1.fireDeviceBackButtonEvent();
        }
      });
    }

    // setup loading placeholder
    ons$$1._setupLoadingPlaceHolders();
  });

  // viewport.js
  Viewport.setup();
}

setup(ons); // Setup initial listeners

export default ons;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL2NvcmUvc3JjL3BvbHlmaWxscy9wb2x5ZmlsbC1zd2l0Y2hlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jdHguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mb3Itb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21ldGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL192YWxpZGF0ZS1jb2xsZWN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2luaGVyaXQtaWYtcmVxdWlyZWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYuc2V0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnNldC50by1qc29uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tb2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5zZXQub2YuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcuc2V0LmZyb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5tYXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC5vZi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3Lm1hcC5mcm9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvVXRpbGl0aWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvQ3VzdG9tRWxlbWVudFN0YXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL0RvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9EZWZlcnJlZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL0N1c3RvbUVsZW1lbnRSZWdpc3RyeS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL1BhdGNoL05hdGl2ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL0FscmVhZHlDb25zdHJ1Y3RlZE1hcmtlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL1BhdGNoL0hUTUxFbGVtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvUGF0Y2gvSW50ZXJmYWNlL1BhcmVudE5vZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9QYXRjaC9Eb2N1bWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL1BhdGNoL05vZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvQG9uc2VudWkvY3VzdG9tLWVsZW1lbnRzL3NyYy9QYXRjaC9JbnRlcmZhY2UvQ2hpbGROb2RlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL0BvbnNlbnVpL2N1c3RvbS1lbGVtZW50cy9zcmMvUGF0Y2gvRWxlbWVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ab25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL2N1c3RvbS1lbGVtZW50cy5qcyIsIi4uLy4uL2NvcmUvc3JjL3BvbHlmaWxscy9NdXRhdGlvbk9ic2VydmVyQDAuNy4yMi9NdXRhdGlvbk9ic2VydmVyLmpzIiwiLi4vLi4vY29yZS9zcmMvcG9seWZpbGxzL3NldEltbWVkaWF0ZUAxLjAuMittb2Qvc2V0SW1tZWRpYXRlLmpzIiwiLi4vLi4vY29yZS9zcmMvcG9seWZpbGxzL2luZGV4LmpzIiwiLi4vLi4vY29yZS9zcmMvdmVuZG9yL0Zhc3RDbGlja0AxLjAuNittb2QvZmFzdGNsaWNrLmpzIiwiLi4vLi4vY29yZS9zcmMvdmVuZG9yL3ZpZXdwb3J0LmpzIiwiLi4vLi4vY29yZS9zcmMvdmVuZG9yL2luZGV4LmpzIiwiLi4vLi4vY29yZS9zcmMvc2V0dXAuanMiLCIuLi8uLi9jb3JlL3NyYy9pbmRleC5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRm9yIEBvbnNlbnVpL2N1c3RvbS1lbGVtZW50c1xuaWYgKHdpbmRvdy5jdXN0b21FbGVtZW50cykgeyAvLyBldmVuIGlmIG5hdGl2ZSBDRTEgaW1wbCBleGlzdHMsIHVzZSBwb2x5ZmlsbFxuICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5mb3JjZVBvbHlmaWxsID0gdHJ1ZTtcbn1cbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSk7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSAob3duID8gdGFyZ2V0IDogc291cmNlKVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZXhwID0gSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIGlmICh0YXJnZXQpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmIChleHBvcnRzW2tleV0gIT0gb3V0KSBoaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZiAoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpIGV4cFByb3RvW2tleV0gPSBvdXQ7XG4gIH1cbn07XG5nbG9iYWwuY29yZSA9IGNvcmU7XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsInZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzKE8sIFApKSByZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uIChPLCBwcm90bykge1xuICBhbk9iamVjdChPKTtcbiAgaWYgKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpIHRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uICh0ZXN0LCBidWdneSwgc2V0KSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmIChidWdneSkgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgc2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldCB9KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIHRlc3QgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYgKHRlc3QgKyAnJyAhPSAnW29iamVjdCB6XScpIHtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufVxuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IDA7XG4gIHZhciBQO1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgdGFnLCBzdGF0KSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKSBkZWYoaXQsIFRBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWcgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgTyA9IHRoaXMuX3Q7XG4gIHZhciBpbmRleCA9IHRoaXMuX2k7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IE8ubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7IHZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2UgfTtcbn0pO1xuIiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcbmlmIChBcnJheVByb3RvW1VOU0NPUEFCTEVTXSA9PSB1bmRlZmluZWQpIHJlcXVpcmUoJy4vX2hpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsInZhciAkaXRlcmF0b3JzID0gcmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciB3a3MgPSByZXF1aXJlKCcuL193a3MnKTtcbnZhciBJVEVSQVRPUiA9IHdrcygnaXRlcmF0b3InKTtcbnZhciBUT19TVFJJTkdfVEFHID0gd2tzKCd0b1N0cmluZ1RhZycpO1xudmFyIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5O1xuXG52YXIgRE9NSXRlcmFibGVzID0ge1xuICBDU1NSdWxlTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIENTU1N0eWxlRGVjbGFyYXRpb246IGZhbHNlLFxuICBDU1NWYWx1ZUxpc3Q6IGZhbHNlLFxuICBDbGllbnRSZWN0TGlzdDogZmFsc2UsXG4gIERPTVJlY3RMaXN0OiBmYWxzZSxcbiAgRE9NU3RyaW5nTGlzdDogZmFsc2UsXG4gIERPTVRva2VuTGlzdDogdHJ1ZSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IGZhbHNlLFxuICBGaWxlTGlzdDogZmFsc2UsXG4gIEhUTUxBbGxDb2xsZWN0aW9uOiBmYWxzZSxcbiAgSFRNTENvbGxlY3Rpb246IGZhbHNlLFxuICBIVE1MRm9ybUVsZW1lbnQ6IGZhbHNlLFxuICBIVE1MU2VsZWN0RWxlbWVudDogZmFsc2UsXG4gIE1lZGlhTGlzdDogdHJ1ZSwgLy8gVE9ETzogTm90IHNwZWMgY29tcGxpYW50LCBzaG91bGQgYmUgZmFsc2UuXG4gIE1pbWVUeXBlQXJyYXk6IGZhbHNlLFxuICBOYW1lZE5vZGVNYXA6IGZhbHNlLFxuICBOb2RlTGlzdDogdHJ1ZSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogZmFsc2UsXG4gIFBsdWdpbjogZmFsc2UsXG4gIFBsdWdpbkFycmF5OiBmYWxzZSxcbiAgU1ZHTGVuZ3RoTGlzdDogZmFsc2UsXG4gIFNWR051bWJlckxpc3Q6IGZhbHNlLFxuICBTVkdQYXRoU2VnTGlzdDogZmFsc2UsXG4gIFNWR1BvaW50TGlzdDogZmFsc2UsXG4gIFNWR1N0cmluZ0xpc3Q6IGZhbHNlLFxuICBTVkdUcmFuc2Zvcm1MaXN0OiBmYWxzZSxcbiAgU291cmNlQnVmZmVyTGlzdDogZmFsc2UsXG4gIFN0eWxlU2hlZXRMaXN0OiB0cnVlLCAvLyBUT0RPOiBOb3Qgc3BlYyBjb21wbGlhbnQsIHNob3VsZCBiZSBmYWxzZS5cbiAgVGV4dFRyYWNrQ3VlTGlzdDogZmFsc2UsXG4gIFRleHRUcmFja0xpc3Q6IGZhbHNlLFxuICBUb3VjaExpc3Q6IGZhbHNlXG59O1xuXG5mb3IgKHZhciBjb2xsZWN0aW9ucyA9IGdldEtleXMoRE9NSXRlcmFibGVzKSwgaSA9IDA7IGkgPCBjb2xsZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICB2YXIgTkFNRSA9IGNvbGxlY3Rpb25zW2ldO1xuICB2YXIgZXhwbGljaXQgPSBET01JdGVyYWJsZXNbTkFNRV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICB2YXIga2V5O1xuICBpZiAocHJvdG8pIHtcbiAgICBpZiAoIXByb3RvW0lURVJBVE9SXSkgaGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZiAoIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBBcnJheVZhbHVlcztcbiAgICBpZiAoZXhwbGljaXQpIGZvciAoa2V5IGluICRpdGVyYXRvcnMpIGlmICghcHJvdG9ba2V5XSkgcmVkZWZpbmUocHJvdG8sIGtleSwgJGl0ZXJhdG9yc1trZXldLCB0cnVlKTtcbiAgfVxufVxuIiwidmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBzYWZlKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0ICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcbiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCAhPSB1bmRlZmluZWQpIHJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpO1xudmFyIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBnZXRJdGVyRm4gPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIEJSRUFLID0ge307XG52YXIgUkVUVVJOID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1IpIHtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpO1xuICB2YXIgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZiAoaXNBcnJheUl0ZXIoaXRlckZuKSkgZm9yIChsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvciAoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZiAocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTikgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgVFlQRSkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSB8fCBpdC5fdCAhPT0gVFlQRSkgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciBmYXN0S2V5ID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXk7XG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL192YWxpZGF0ZS1jb2xsZWN0aW9uJyk7XG52YXIgU0laRSA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24gKHRoYXQsIGtleSkge1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpO1xuICB2YXIgZW50cnk7XG4gIGlmIChpbmRleCAhPT0gJ0YnKSByZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IgKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubikge1xuICAgIGlmIChlbnRyeS5rID09IGtleSkgcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uICh3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKSB7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0aGF0LCBpdGVyYWJsZSkge1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX3QgPSBOQU1FOyAgICAgICAgIC8vIGNvbGxlY3Rpb24gdHlwZVxuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZiAoaXRlcmFibGUgIT0gdW5kZWZpbmVkKSBmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIGZvciAodmFyIHRoYXQgPSB2YWxpZGF0ZSh0aGlzLCBOQU1FKSwgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubikge1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmIChlbnRyeS5wKSBlbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB0aGF0ID0gdmFsaWRhdGUodGhpcywgTkFNRSk7XG4gICAgICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkubjtcbiAgICAgICAgICB2YXIgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYgKHByZXYpIHByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYgKG5leHQpIG5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYgKHRoYXQuX2YgPT0gZW50cnkpIHRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmICh0aGF0Ll9sID09IGVudHJ5KSB0aGF0Ll9sID0gcHJldjtcbiAgICAgICAgICB0aGF0W1NJWkVdLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMi4zLjYgU2V0LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICAgICAgdmFsaWRhdGUodGhpcywgTkFNRSk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKTtcbiAgICAgICAgdmFyIGVudHJ5O1xuICAgICAgICB3aGlsZSAoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKSB7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZSAoZW50cnkgJiYgZW50cnkucikgZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodmFsaWRhdGUodGhpcywgTkFNRSksIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHRoaXMsIE5BTUUpW1NJWkVdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uICh0aGF0LCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICB2YXIgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZiAoIXRoYXQuX2YpIHRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmIChwcmV2KSBwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYgKGluZGV4ICE9PSAnRicpIHRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uIChDLCBOQU1FLCBJU19NQVApIHtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gICAgICB0aGlzLl90ID0gdmFsaWRhdGUoaXRlcmF0ZWQsIE5BTUUpOyAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7ICAgICAgICAgICAgICAgIC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGtpbmQgPSB0aGF0Ll9rO1xuICAgICAgdmFyIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUgKGVudHJ5ICYmIGVudHJ5LnIpIGVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZiAoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSkge1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmIChraW5kID09ICdrZXlzJykgcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZiAoa2luZCA9PSAndmFsdWVzJykgcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTtcbiIsInZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uICgpIHsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24gKCkgeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBza2lwQ2xvc2luZykge1xuICBpZiAoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpIHJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gWzddO1xuICAgIHZhciBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHsgZG9uZTogc2FmZSA9IHRydWUgfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRoYXQsIHRhcmdldCwgQykge1xuICB2YXIgUyA9IHRhcmdldC5jb25zdHJ1Y3RvcjtcbiAgdmFyIFA7XG4gIGlmIChTICE9PSBDICYmIHR5cGVvZiBTID09ICdmdW5jdGlvbicgJiYgKFAgPSBTLnByb3RvdHlwZSkgIT09IEMucHJvdG90eXBlICYmIGlzT2JqZWN0KFApICYmIHNldFByb3RvdHlwZU9mKSB7XG4gICAgc2V0UHJvdG90eXBlT2YodGhhdCwgUCk7XG4gIH0gcmV0dXJuIHRoYXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgJGl0ZXJEZXRlY3QgPSByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4vX2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspIHtcbiAgdmFyIEJhc2UgPSBnbG9iYWxbTkFNRV07XG4gIHZhciBDID0gQmFzZTtcbiAgdmFyIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJztcbiAgdmFyIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZTtcbiAgdmFyIE8gPSB7fTtcbiAgdmFyIGZpeE1ldGhvZCA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgICB2YXIgZm4gPSBwcm90b1tLRVldO1xuICAgIHJlZGVmaW5lKHByb3RvLCBLRVksXG4gICAgICBLRVkgPT0gJ2RlbGV0ZScgPyBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2hhcycgPyBmdW5jdGlvbiBoYXMoYSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyBmYWxzZSA6IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhKTtcbiAgICAgIH0gOiBLRVkgPT0gJ2dldCcgPyBmdW5jdGlvbiBnZXQoYSkge1xuICAgICAgICByZXR1cm4gSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkgPyB1bmRlZmluZWQgOiBmbi5jYWxsKHRoaXMsIGEgPT09IDAgPyAwIDogYSk7XG4gICAgICB9IDogS0VZID09ICdhZGQnID8gZnVuY3Rpb24gYWRkKGEpIHsgZm4uY2FsbCh0aGlzLCBhID09PSAwID8gMCA6IGEpOyByZXR1cm4gdGhpczsgfVxuICAgICAgICA6IGZ1bmN0aW9uIHNldChhLCBiKSB7IGZuLmNhbGwodGhpcywgYSA9PT0gMCA/IDAgOiBhLCBiKTsgcmV0dXJuIHRoaXM7IH1cbiAgICApO1xuICB9O1xuICBpZiAodHlwZW9mIEMgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgcHJvdG8uZm9yRWFjaCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKSB7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgICBtZXRhLk5FRUQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDKCk7XG4gICAgLy8gZWFybHkgaW1wbGVtZW50YXRpb25zIG5vdCBzdXBwb3J0cyBjaGFpbmluZ1xuICAgIHZhciBIQVNOVF9DSEFJTklORyA9IGluc3RhbmNlW0FEREVSXShJU19XRUFLID8ge30gOiAtMCwgMSkgIT0gaW5zdGFuY2U7XG4gICAgLy8gVjggfiAgQ2hyb21pdW0gNDAtIHdlYWstY29sbGVjdGlvbnMgdGhyb3dzIG9uIHByaW1pdGl2ZXMsIGJ1dCBzaG91bGQgcmV0dXJuIGZhbHNlXG4gICAgdmFyIFRIUk9XU19PTl9QUklNSVRJVkVTID0gZmFpbHMoZnVuY3Rpb24gKCkgeyBpbnN0YW5jZS5oYXMoMSk7IH0pO1xuICAgIC8vIG1vc3QgZWFybHkgaW1wbGVtZW50YXRpb25zIGRvZXNuJ3Qgc3VwcG9ydHMgaXRlcmFibGVzLCBtb3N0IG1vZGVybiAtIG5vdCBjbG9zZSBpdCBjb3JyZWN0bHlcbiAgICB2YXIgQUNDRVBUX0lURVJBQkxFUyA9ICRpdGVyRGV0ZWN0KGZ1bmN0aW9uIChpdGVyKSB7IG5ldyBDKGl0ZXIpOyB9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICAvLyBmb3IgZWFybHkgaW1wbGVtZW50YXRpb25zIC0wIGFuZCArMCBub3QgdGhlIHNhbWVcbiAgICB2YXIgQlVHR1lfWkVSTyA9ICFJU19XRUFLICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFY4IH4gQ2hyb21pdW0gNDItIGZhaWxzIG9ubHkgd2l0aCA1KyBlbGVtZW50c1xuICAgICAgdmFyICRpbnN0YW5jZSA9IG5ldyBDKCk7XG4gICAgICB2YXIgaW5kZXggPSA1O1xuICAgICAgd2hpbGUgKGluZGV4LS0pICRpbnN0YW5jZVtBRERFUl0oaW5kZXgsIGluZGV4KTtcbiAgICAgIHJldHVybiAhJGluc3RhbmNlLmhhcygtMCk7XG4gICAgfSk7XG4gICAgaWYgKCFBQ0NFUFRfSVRFUkFCTEVTKSB7XG4gICAgICBDID0gd3JhcHBlcihmdW5jdGlvbiAodGFyZ2V0LCBpdGVyYWJsZSkge1xuICAgICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSk7XG4gICAgICAgIHZhciB0aGF0ID0gaW5oZXJpdElmUmVxdWlyZWQobmV3IEJhc2UoKSwgdGFyZ2V0LCBDKTtcbiAgICAgICAgaWYgKGl0ZXJhYmxlICE9IHVuZGVmaW5lZCkgZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgIH0pO1xuICAgICAgQy5wcm90b3R5cGUgPSBwcm90bztcbiAgICAgIHByb3RvLmNvbnN0cnVjdG9yID0gQztcbiAgICB9XG4gICAgaWYgKFRIUk9XU19PTl9QUklNSVRJVkVTIHx8IEJVR0dZX1pFUk8pIHtcbiAgICAgIGZpeE1ldGhvZCgnZGVsZXRlJyk7XG4gICAgICBmaXhNZXRob2QoJ2hhcycpO1xuICAgICAgSVNfTUFQICYmIGZpeE1ldGhvZCgnZ2V0Jyk7XG4gICAgfVxuICAgIGlmIChCVUdHWV9aRVJPIHx8IEhBU05UX0NIQUlOSU5HKSBmaXhNZXRob2QoQURERVIpO1xuICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgc2hvdWxkIG5vdCBjb250YWlucyAuY2xlYXIgbWV0aG9kXG4gICAgaWYgKElTX1dFQUsgJiYgcHJvdG8uY2xlYXIpIGRlbGV0ZSBwcm90by5jbGVhcjtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqIChDICE9IEJhc2UpLCBPKTtcblxuICBpZiAoIUlTX1dFQUspIGNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBTRVQgPSAnU2V0JztcblxuLy8gMjMuMiBTZXQgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoU0VULCBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBTZXQoKSB7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4yLjMuMSBTZXQucHJvdG90eXBlLmFkZCh2YWx1ZSlcbiAgYWRkOiBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih2YWxpZGF0ZSh0aGlzLCBTRVQpLCB2YWx1ZSA9IHZhbHVlID09PSAwID8gMCA6IHZhbHVlLCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZyk7XG4iLCJ2YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlciwgSVRFUkFUT1IpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIGZyb20gPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgaWYgKGNsYXNzb2YodGhpcykgIT0gTkFNRSkgdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1NldCcsIHsgdG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnU2V0JykgfSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLXNldG1hcC1vZmZyb20vXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT0xMRUNUSU9OKSB7XG4gICRleHBvcnQoJGV4cG9ydC5TLCBDT0xMRUNUSU9OLCB7IG9mOiBmdW5jdGlvbiBvZigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgQSA9IEFycmF5KGxlbmd0aCk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSBBW2xlbmd0aF0gPSBhcmd1bWVudHNbbGVuZ3RoXTtcbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtc2V0Lm9mXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1vZicpKCdTZXQnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS9cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTExFQ1RJT04pIHtcbiAgJGV4cG9ydCgkZXhwb3J0LlMsIENPTExFQ1RJT04sIHsgZnJvbTogZnVuY3Rpb24gZnJvbShzb3VyY2UgLyogLCBtYXBGbiwgdGhpc0FyZyAqLykge1xuICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgbWFwcGluZywgQSwgbiwgY2I7XG4gICAgYUZ1bmN0aW9uKHRoaXMpO1xuICAgIG1hcHBpbmcgPSBtYXBGbiAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChtYXBwaW5nKSBhRnVuY3Rpb24obWFwRm4pO1xuICAgIGlmIChzb3VyY2UgPT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3IHRoaXMoKTtcbiAgICBBID0gW107XG4gICAgaWYgKG1hcHBpbmcpIHtcbiAgICAgIG4gPSAwO1xuICAgICAgY2IgPSBjdHgobWFwRm4sIGFyZ3VtZW50c1syXSwgMik7XG4gICAgICBmb3JPZihzb3VyY2UsIGZhbHNlLCBmdW5jdGlvbiAobmV4dEl0ZW0pIHtcbiAgICAgICAgQS5wdXNoKGNiKG5leHRJdGVtLCBuKyspKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JPZihzb3VyY2UsIGZhbHNlLCBBLnB1c2gsIEEpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHRoaXMoQSk7XG4gIH0gfSk7XG59O1xuIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtc2V0LmZyb21cbnJlcXVpcmUoJy4vX3NldC1jb2xsZWN0aW9uLWZyb20nKSgnU2V0Jyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4vX3ZhbGlkYXRlLWNvbGxlY3Rpb24nKTtcbnZhciBNQVAgPSAnTWFwJztcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoTUFQLCBmdW5jdGlvbiAoZ2V0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKSB7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh2YWxpZGF0ZSh0aGlzLCBNQVApLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodmFsaWRhdGUodGhpcywgTUFQKSwga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpO1xuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdNYXAnLCB7IHRvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpIH0pO1xuIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtbWFwLm9mXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1vZicpKCdNYXAnKTtcbiIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLW1hcC5mcm9tXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1mcm9tJykoJ01hcCcpO1xuIiwiY29uc3QgcmVzZXJ2ZWRUYWdMaXN0ID0gbmV3IFNldChbXG4gICdhbm5vdGF0aW9uLXhtbCcsXG4gICdjb2xvci1wcm9maWxlJyxcbiAgJ2ZvbnQtZmFjZScsXG4gICdmb250LWZhY2Utc3JjJyxcbiAgJ2ZvbnQtZmFjZS11cmknLFxuICAnZm9udC1mYWNlLWZvcm1hdCcsXG4gICdmb250LWZhY2UtbmFtZScsXG4gICdtaXNzaW5nLWdseXBoJyxcbl0pO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbE5hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEN1c3RvbUVsZW1lbnROYW1lKGxvY2FsTmFtZSkge1xuICBjb25zdCByZXNlcnZlZCA9IHJlc2VydmVkVGFnTGlzdC5oYXMobG9jYWxOYW1lKTtcbiAgY29uc3QgdmFsaWRGb3JtID0gL15bYS16XVsuMC05X2Etel0qLVtcXC0uMC05X2Etel0qJC8udGVzdChsb2NhbE5hbWUpO1xuICByZXR1cm4gIXJlc2VydmVkICYmIHZhbGlkRm9ybTtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ29ubmVjdGVkKG5vZGUpIHtcbiAgLy8gVXNlIGBOb2RlI2lzQ29ubmVjdGVkYCwgaWYgZGVmaW5lZC5cbiAgY29uc3QgbmF0aXZlVmFsdWUgPSBub2RlLmlzQ29ubmVjdGVkO1xuICBpZiAobmF0aXZlVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBuYXRpdmVWYWx1ZTtcbiAgfVxuXG4gIC8qKiBAdHlwZSB7P05vZGV8dW5kZWZpbmVkfSAqL1xuICBsZXQgY3VycmVudCA9IG5vZGU7XG4gIHdoaWxlIChjdXJyZW50ICYmICEoY3VycmVudC5fX0NFX2lzSW1wb3J0RG9jdW1lbnQgfHwgY3VycmVudCBpbnN0YW5jZW9mIERvY3VtZW50KSkge1xuICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGUgfHwgKHdpbmRvdy5TaGFkb3dSb290ICYmIGN1cnJlbnQgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gY3VycmVudC5ob3N0IDogdW5kZWZpbmVkKTtcbiAgfVxuICByZXR1cm4gISEoY3VycmVudCAmJiAoY3VycmVudC5fX0NFX2lzSW1wb3J0RG9jdW1lbnQgfHwgY3VycmVudCBpbnN0YW5jZW9mIERvY3VtZW50KSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gcm9vdFxuICogQHBhcmFtIHshTm9kZX0gc3RhcnRcbiAqIEByZXR1cm4gez9Ob2RlfVxuICovXG5mdW5jdGlvbiBuZXh0U2libGluZ09yQW5jZXN0b3JTaWJsaW5nKHJvb3QsIHN0YXJ0KSB7XG4gIGxldCBub2RlID0gc3RhcnQ7XG4gIHdoaWxlIChub2RlICYmIG5vZGUgIT09IHJvb3QgJiYgIW5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiAoIW5vZGUgfHwgbm9kZSA9PT0gcm9vdCkgPyBudWxsIDogbm9kZS5uZXh0U2libGluZztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFOb2RlfSByb290XG4gKiBAcGFyYW0geyFOb2RlfSBzdGFydFxuICogQHJldHVybiB7P05vZGV9XG4gKi9cbmZ1bmN0aW9uIG5leHROb2RlKHJvb3QsIHN0YXJ0KSB7XG4gIHJldHVybiBzdGFydC5maXJzdENoaWxkID8gc3RhcnQuZmlyc3RDaGlsZCA6IG5leHRTaWJsaW5nT3JBbmNlc3RvclNpYmxpbmcocm9vdCwgc3RhcnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU5vZGV9IHJvb3RcbiAqIEBwYXJhbSB7IWZ1bmN0aW9uKCFFbGVtZW50KX0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7IVNldDxOb2RlPj19IHZpc2l0ZWRJbXBvcnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhyb290LCBjYWxsYmFjaywgdmlzaXRlZEltcG9ydHMgPSBuZXcgU2V0KCkpIHtcbiAgbGV0IG5vZGUgPSByb290O1xuICB3aGlsZSAobm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovKG5vZGUpO1xuXG4gICAgICBjYWxsYmFjayhlbGVtZW50KTtcblxuICAgICAgY29uc3QgbG9jYWxOYW1lID0gZWxlbWVudC5sb2NhbE5hbWU7XG4gICAgICBpZiAobG9jYWxOYW1lID09PSAnbGluaycgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnaW1wb3J0Jykge1xuICAgICAgICAvLyBJZiB0aGlzIGltcG9ydCAocG9seWZpbGxlZCBvciBub3QpIGhhcyBpdCdzIHJvb3Qgbm9kZSBhdmFpbGFibGUsXG4gICAgICAgIC8vIHdhbGsgaXQuXG4gICAgICAgIGNvbnN0IGltcG9ydE5vZGUgPSAvKiogQHR5cGUgeyFOb2RlfSAqLyAoZWxlbWVudC5pbXBvcnQpO1xuICAgICAgICBpZiAoaW1wb3J0Tm9kZSBpbnN0YW5jZW9mIE5vZGUgJiYgIXZpc2l0ZWRJbXBvcnRzLmhhcyhpbXBvcnROb2RlKSkge1xuICAgICAgICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgd2Fsa3Mgb2YgdGhlIHNhbWUgaW1wb3J0IHJvb3QuXG4gICAgICAgICAgdmlzaXRlZEltcG9ydHMuYWRkKGltcG9ydE5vZGUpO1xuXG4gICAgICAgICAgZm9yIChsZXQgY2hpbGQgPSBpbXBvcnROb2RlLmZpcnN0Q2hpbGQ7IGNoaWxkOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICB3YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhjaGlsZCwgY2FsbGJhY2ssIHZpc2l0ZWRJbXBvcnRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZ25vcmUgZGVzY2VuZGFudHMgb2YgaW1wb3J0IGxpbmtzIHRvIHByZXZlbnQgYXR0ZW1wdGluZyB0byB3YWxrIHRoZVxuICAgICAgICAvLyBlbGVtZW50cyBjcmVhdGVkIGJ5IHRoZSBIVE1MIEltcG9ydHMgcG9seWZpbGwgdGhhdCB3ZSBqdXN0IHdhbGtlZFxuICAgICAgICAvLyBhYm92ZS5cbiAgICAgICAgbm9kZSA9IG5leHRTaWJsaW5nT3JBbmNlc3RvclNpYmxpbmcocm9vdCwgZWxlbWVudCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChsb2NhbE5hbWUgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgLy8gSWdub3JlIGRlc2NlbmRhbnRzIG9mIHRlbXBsYXRlcy4gVGhlcmUgc2hvdWxkbid0IGJlIGFueSBkZXNjZW5kYW50c1xuICAgICAgICAvLyBiZWNhdXNlIHRoZXkgd2lsbCBiZSBtb3ZlZCBpbnRvIGAuY29udGVudGAgZHVyaW5nIGNvbnN0cnVjdGlvbiBpblxuICAgICAgICAvLyBicm93c2VycyB0aGF0IHN1cHBvcnQgdGVtcGxhdGUgYnV0LCBpbiBjYXNlIHRoZXkgZXhpc3QgYW5kIGFyZSBzdGlsbFxuICAgICAgICAvLyB3YWl0aW5nIHRvIGJlIG1vdmVkIGJ5IGEgcG9seWZpbGwsIHRoZXkgd2lsbCBiZSBpZ25vcmVkLlxuICAgICAgICBub2RlID0gbmV4dFNpYmxpbmdPckFuY2VzdG9yU2libGluZyhyb290LCBlbGVtZW50KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFdhbGsgc2hhZG93IHJvb3RzLlxuICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IGVsZW1lbnQuX19DRV9zaGFkb3dSb290O1xuICAgICAgaWYgKHNoYWRvd1Jvb3QpIHtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgPSBzaGFkb3dSb290LmZpcnN0Q2hpbGQ7IGNoaWxkOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgd2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMoY2hpbGQsIGNhbGxiYWNrLCB2aXNpdGVkSW1wb3J0cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBub2RlID0gbmV4dE5vZGUocm9vdCwgbm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2VkIHRvIHN1cHByZXNzIENsb3N1cmUncyBcIk1vZGlmeWluZyB0aGUgcHJvdG90eXBlIGlzIG9ubHkgYWxsb3dlZCBpZiB0aGVcbiAqIGNvbnN0cnVjdG9yIGlzIGluIHRoZSBzYW1lIHNjb3BlXCIgd2FybmluZyB3aXRob3V0IHVzaW5nXG4gKiBgQHN1cHByZXNzIHtuZXdDaGVja1R5cGVzLCBkdXBsaWNhdGV9YCBiZWNhdXNlIGBuZXdDaGVja1R5cGVzYCBpcyB0b28gYnJvYWQuXG4gKlxuICogQHBhcmFtIHshT2JqZWN0fSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFByb3BlcnR5VW5jaGVja2VkKGRlc3RpbmF0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICBkZXN0aW5hdGlvbltuYW1lXSA9IHZhbHVlO1xufVxuIiwiLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5jb25zdCBDdXN0b21FbGVtZW50U3RhdGUgPSB7XG4gIGN1c3RvbTogMSxcbiAgZmFpbGVkOiAyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tRWxlbWVudFN0YXRlO1xuIiwiaW1wb3J0ICogYXMgVXRpbGl0aWVzIGZyb20gJy4vVXRpbGl0aWVzLmpzJztcbmltcG9ydCBDRVN0YXRlIGZyb20gJy4vQ3VzdG9tRWxlbWVudFN0YXRlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tRWxlbWVudEludGVybmFscyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8qKiBAdHlwZSB7IU1hcDxzdHJpbmcsICFDdXN0b21FbGVtZW50RGVmaW5pdGlvbj59ICovXG4gICAgdGhpcy5fbG9jYWxOYW1lVG9EZWZpbml0aW9uID0gbmV3IE1hcCgpO1xuXG4gICAgLyoqIEB0eXBlIHshTWFwPCFGdW5jdGlvbiwgIUN1c3RvbUVsZW1lbnREZWZpbml0aW9uPn0gKi9cbiAgICB0aGlzLl9jb25zdHJ1Y3RvclRvRGVmaW5pdGlvbiA9IG5ldyBNYXAoKTtcblxuICAgIC8qKiBAdHlwZSB7IUFycmF5PCFmdW5jdGlvbighTm9kZSk+fSAqL1xuICAgIHRoaXMuX3BhdGNoZXMgPSBbXTtcblxuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLl9oYXNQYXRjaGVzID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsTmFtZVxuICAgKiBAcGFyYW0geyFDdXN0b21FbGVtZW50RGVmaW5pdGlvbn0gZGVmaW5pdGlvblxuICAgKi9cbiAgc2V0RGVmaW5pdGlvbihsb2NhbE5hbWUsIGRlZmluaXRpb24pIHtcbiAgICB0aGlzLl9sb2NhbE5hbWVUb0RlZmluaXRpb24uc2V0KGxvY2FsTmFtZSwgZGVmaW5pdGlvbik7XG4gICAgdGhpcy5fY29uc3RydWN0b3JUb0RlZmluaXRpb24uc2V0KGRlZmluaXRpb24uY29uc3RydWN0b3IsIGRlZmluaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbE5hbWVcbiAgICogQHJldHVybiB7IUN1c3RvbUVsZW1lbnREZWZpbml0aW9ufHVuZGVmaW5lZH1cbiAgICovXG4gIGxvY2FsTmFtZVRvRGVmaW5pdGlvbihsb2NhbE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxOYW1lVG9EZWZpbml0aW9uLmdldChsb2NhbE5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIHshQ3VzdG9tRWxlbWVudERlZmluaXRpb258dW5kZWZpbmVkfVxuICAgKi9cbiAgY29uc3RydWN0b3JUb0RlZmluaXRpb24oY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0b3JUb0RlZmluaXRpb24uZ2V0KGNvbnN0cnVjdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFmdW5jdGlvbighTm9kZSl9IGxpc3RlbmVyXG4gICAqL1xuICBhZGRQYXRjaChsaXN0ZW5lcikge1xuICAgIHRoaXMuX2hhc1BhdGNoZXMgPSB0cnVlO1xuICAgIHRoaXMuX3BhdGNoZXMucHVzaChsaXN0ZW5lcik7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICAgKi9cbiAgcGF0Y2hUcmVlKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1BhdGNoZXMpIHJldHVybjtcblxuICAgIFV0aWxpdGllcy53YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhub2RlLCBlbGVtZW50ID0+IHRoaXMucGF0Y2goZWxlbWVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICovXG4gIHBhdGNoKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuX2hhc1BhdGNoZXMpIHJldHVybjtcblxuICAgIGlmIChub2RlLl9fQ0VfcGF0Y2hlZCkgcmV0dXJuO1xuICAgIG5vZGUuX19DRV9wYXRjaGVkID0gdHJ1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcGF0Y2hlc1tpXShub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTm9kZX0gcm9vdFxuICAgKi9cbiAgY29ubmVjdFRyZWUocm9vdCkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gW107XG5cbiAgICBVdGlsaXRpZXMud2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMocm9vdCwgZWxlbWVudCA9PiBlbGVtZW50cy5wdXNoKGVsZW1lbnQpKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIGlmIChlbGVtZW50Ll9fQ0Vfc3RhdGUgPT09IENFU3RhdGUuY3VzdG9tKSB7XG4gICAgICAgIGlmIChVdGlsaXRpZXMuaXNDb25uZWN0ZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZ3JhZGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFOb2RlfSByb290XG4gICAqL1xuICBkaXNjb25uZWN0VHJlZShyb290KSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICAgIFV0aWxpdGllcy53YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyhyb290LCBlbGVtZW50ID0+IGVsZW1lbnRzLnB1c2goZWxlbWVudCkpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgaWYgKGVsZW1lbnQuX19DRV9zdGF0ZSA9PT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWRDYWxsYmFjayhlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBncmFkZXMgYWxsIHVuY3VzdG9taXplZCBjdXN0b20gZWxlbWVudHMgYXQgYW5kIGJlbG93IGEgcm9vdCBub2RlIGZvclxuICAgKiB3aGljaCB0aGVyZSBpcyBhIGRlZmluaXRpb24uIFdoZW4gY3VzdG9tIGVsZW1lbnQgcmVhY3Rpb24gY2FsbGJhY2tzIGFyZVxuICAgKiBhc3N1bWVkIHRvIGJlIGNhbGxlZCBzeW5jaHJvbm91c2x5ICh3aGljaCwgYnkgdGhlIGN1cnJlbnQgRE9NIC8gSFRNTCBzcGVjXG4gICAqIGRlZmluaXRpb25zLCB0aGV5IGFyZSAqbm90KiksIGNhbGxiYWNrcyBmb3IgYm90aCBlbGVtZW50cyBjdXN0b21pemVkXG4gICAqIHN5bmNocm9ub3VzbHkgYnkgdGhlIHBhcnNlciBhbmQgZWxlbWVudHMgYmVpbmcgdXBncmFkZWQgb2NjdXIgaW4gdGhlIHNhbWVcbiAgICogcmVsYXRpdmUgb3JkZXIuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZnVuY3Rpb24sIHdoZW4gdXNlZCB0byBzaW11bGF0ZSB0aGUgY29uc3RydWN0aW9uIG9mIGEgdHJlZSB0aGF0XG4gICAqIGlzIGFscmVhZHkgY3JlYXRlZCBidXQgbm90IGN1c3RvbWl6ZWQgKGkuZS4gYnkgdGhlIHBhcnNlciksIGRvZXMgKm5vdCpcbiAgICogcHJldmVudCB0aGUgZWxlbWVudCBmcm9tIHJlYWRpbmcgdGhlICdmaW5hbCcgKHRydWUpIHN0YXRlIG9mIHRoZSB0cmVlLiBGb3JcbiAgICogZXhhbXBsZSwgdGhlIGVsZW1lbnQsIGR1cmluZyB0cnVseSBzeW5jaHJvbm91cyBwYXJzaW5nIC8gY29uc3RydWN0aW9uIHdvdWxkXG4gICAqIHNlZSB0aGF0IGl0IGNvbnRhaW5zIG5vIGNoaWxkcmVuIGFzIHRoZXkgaGF2ZSBub3QgeWV0IGJlZW4gaW5zZXJ0ZWQuXG4gICAqIEhvd2V2ZXIsIHRoaXMgZnVuY3Rpb24gZG9lcyBub3QgbW9kaWZ5IHRoZSB0cmVlLCB0aGUgZWxlbWVudCB3aWxsXG4gICAqIChpbmNvcnJlY3RseSkgaGF2ZSBjaGlsZHJlbi4gQWRkaXRpb25hbGx5LCBzZWxmLW1vZGlmaWNhdGlvbiByZXN0cmljdGlvbnNcbiAgICogZm9yIGN1c3RvbSBlbGVtZW50IGNvbnN0cnVjdG9ycyBpbXBvc2VkIGJ5IHRoZSBET00gc3BlYyBhcmUgKm5vdCogZW5mb3JjZWQuXG4gICAqXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgbmVzdGVkIGxpc3Qgc2hvd3MgdGhlIHN0ZXBzIGV4dGVuZGluZyBkb3duIGZyb20gdGhlIEhUTUxcbiAgICogc3BlYydzIHBhcnNpbmcgc2VjdGlvbiB0aGF0IGNhdXNlIGVsZW1lbnRzIHRvIGJlIHN5bmNocm9ub3VzbHkgY3JlYXRlZCBhbmRcbiAgICogdXBncmFkZWQ6XG4gICAqXG4gICAqIFRoZSBcImluIGJvZHlcIiBpbnNlcnRpb24gbW9kZTpcbiAgICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keVxuICAgKiAtIFN3aXRjaCBvbiB0b2tlbjpcbiAgICogICAuLiBvdGhlciBjYXNlcyAuLlxuICAgKiAgIC0+IEFueSBvdGhlciBzdGFydCB0YWdcbiAgICogICAgICAtIFtJbnNlcnQgYW4gSFRNTCBlbGVtZW50XShiZWxvdykgZm9yIHRoZSB0b2tlbi5cbiAgICpcbiAgICogSW5zZXJ0IGFuIEhUTUwgZWxlbWVudDpcbiAgICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjaW5zZXJ0LWFuLWh0bWwtZWxlbWVudFxuICAgKiAtIEluc2VydCBhIGZvcmVpZ24gZWxlbWVudCBmb3IgdGhlIHRva2VuIGluIHRoZSBIVE1MIG5hbWVzcGFjZTpcbiAgICogICBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNpbnNlcnQtYS1mb3JlaWduLWVsZW1lbnRcbiAgICogICAtIENyZWF0ZSBhbiBlbGVtZW50IGZvciBhIHRva2VuOlxuICAgKiAgICAgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjY3JlYXRlLWFuLWVsZW1lbnQtZm9yLXRoZS10b2tlblxuICAgKiAgICAgLSBXaWxsIGV4ZWN1dGUgc2NyaXB0IGZsYWcgaXMgdHJ1ZT9cbiAgICogICAgICAgLSAoRWxlbWVudCBxdWV1ZSBwdXNoZWQgdG8gdGhlIGN1c3RvbSBlbGVtZW50IHJlYWN0aW9ucyBzdGFjay4pXG4gICAqICAgICAtIENyZWF0ZSBhbiBlbGVtZW50OlxuICAgKiAgICAgICBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtY3JlYXRlLWVsZW1lbnRcbiAgICogICAgICAgLSBTeW5jIENFIGZsYWcgaXMgdHJ1ZT9cbiAgICogICAgICAgICAtIENvbnN0cnVjdG9yIGNhbGxlZC5cbiAgICogICAgICAgICAtIFNlbGYtbW9kaWZpY2F0aW9uIHJlc3RyaWN0aW9ucyBlbmZvcmNlZC5cbiAgICogICAgICAgLSBTeW5jIENFIGZsYWcgaXMgZmFsc2U/XG4gICAqICAgICAgICAgLSAoVXBncmFkZSByZWFjdGlvbiBlbnF1ZXVlZC4pXG4gICAqICAgICAtIEF0dHJpYnV0ZXMgYXBwZW5kZWQgdG8gZWxlbWVudC5cbiAgICogICAgICAgKGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgIHJlYWN0aW9ucyBlbnF1ZXVlZC4pXG4gICAqICAgICAtIFdpbGwgZXhlY3V0ZSBzY3JpcHQgZmxhZyBpcyB0cnVlP1xuICAgKiAgICAgICAtIChFbGVtZW50IHF1ZXVlIHBvcHBlZCBmcm9tIHRoZSBjdXN0b20gZWxlbWVudCByZWFjdGlvbnMgc3RhY2suXG4gICAqICAgICAgICAgUmVhY3Rpb25zIGluIHRoZSBwb3BwZWQgc3RhY2sgYXJlIGludm9rZWQuKVxuICAgKiAgIC0gKEVsZW1lbnQgcXVldWUgcHVzaGVkIHRvIHRoZSBjdXN0b20gZWxlbWVudCByZWFjdGlvbnMgc3RhY2suKVxuICAgKiAgIC0gSW5zZXJ0IHRoZSBlbGVtZW50OlxuICAgKiAgICAgaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LW5vZGUtaW5zZXJ0XG4gICAqICAgICAtIFNoYWRvdy1pbmNsdWRpbmcgZGVzY2VuZGFudHMgYXJlIGNvbm5lY3RlZC4gRHVyaW5nIHBhcnNpbmdcbiAgICogICAgICAgY29uc3RydWN0aW9uLCB0aGVyZSBhcmUgbm8gc2hhZG93LSpleGNsdWRpbmcqIGRlc2NlbmRhbnRzLlxuICAgKiAgICAgICBIb3dldmVyLCB0aGUgY29uc3RydWN0b3IgbWF5IGhhdmUgdmFsaWRseSBhdHRhY2hlZCBhIHNoYWRvd1xuICAgKiAgICAgICB0cmVlIHRvIGl0c2VsZiBhbmQgYWRkZWQgZGVzY2VuZGFudHMgdG8gdGhhdCBzaGFkb3cgdHJlZS5cbiAgICogICAgICAgKGBjb25uZWN0ZWRDYWxsYmFja2AgcmVhY3Rpb25zIGVucXVldWVkLilcbiAgICogICAtIChFbGVtZW50IHF1ZXVlIHBvcHBlZCBmcm9tIHRoZSBjdXN0b20gZWxlbWVudCByZWFjdGlvbnMgc3RhY2suXG4gICAqICAgICBSZWFjdGlvbnMgaW4gdGhlIHBvcHBlZCBzdGFjayBhcmUgaW52b2tlZC4pXG4gICAqXG4gICAqIEBwYXJhbSB7IU5vZGV9IHJvb3RcbiAgICogQHBhcmFtIHshU2V0PE5vZGU+PX0gdmlzaXRlZEltcG9ydHNcbiAgICovXG4gIHBhdGNoQW5kVXBncmFkZVRyZWUocm9vdCwgdmlzaXRlZEltcG9ydHMgPSBuZXcgU2V0KCkpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IFtdO1xuXG4gICAgY29uc3QgZ2F0aGVyRWxlbWVudHMgPSBlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmxvY2FsTmFtZSA9PT0gJ2xpbmsnICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PT0gJ2ltcG9ydCcpIHtcbiAgICAgICAgLy8gVGhlIEhUTUwgSW1wb3J0cyBwb2x5ZmlsbCBzZXRzIGEgZGVzY2VuZGFudCBlbGVtZW50IG9mIHRoZSBsaW5rIHRvXG4gICAgICAgIC8vIHRoZSBgaW1wb3J0YCBwcm9wZXJ0eSwgc3BlY2lmaWNhbGx5IHRoaXMgaXMgKm5vdCogYSBEb2N1bWVudC5cbiAgICAgICAgY29uc3QgaW1wb3J0Tm9kZSA9IC8qKiBAdHlwZSB7P05vZGV9ICovIChlbGVtZW50LmltcG9ydCk7XG5cbiAgICAgICAgaWYgKGltcG9ydE5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIGltcG9ydE5vZGUucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgIGltcG9ydE5vZGUuX19DRV9pc0ltcG9ydERvY3VtZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIENvbm5lY3RlZCBsaW5rcyBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSByZWdpc3RyeS5cbiAgICAgICAgICBpbXBvcnROb2RlLl9fQ0VfaGFzUmVnaXN0cnkgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIHRoaXMgbGluaydzIGltcG9ydCByb290IGlzIG5vdCBhdmFpbGFibGUsIGl0cyBjb250ZW50cyBjYW4ndCBiZVxuICAgICAgICAgIC8vIHdhbGtlZC4gV2FpdCBmb3IgJ2xvYWQnIGFuZCB3YWxrIGl0IHdoZW4gaXQncyByZWFkeS5cbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnROb2RlID0gLyoqIEB0eXBlIHshTm9kZX0gKi8gKGVsZW1lbnQuaW1wb3J0KTtcblxuICAgICAgICAgICAgaWYgKGltcG9ydE5vZGUuX19DRV9kb2N1bWVudExvYWRIYW5kbGVkKSByZXR1cm47XG4gICAgICAgICAgICBpbXBvcnROb2RlLl9fQ0VfZG9jdW1lbnRMb2FkSGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGltcG9ydE5vZGUuX19DRV9pc0ltcG9ydERvY3VtZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ29ubmVjdGVkIGxpbmtzIGFyZSBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICAgICAgICAgICAgaW1wb3J0Tm9kZS5fX0NFX2hhc1JlZ2lzdHJ5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ2xvbmUgdGhlIGB2aXNpdGVkSW1wb3J0c2Agc2V0IHRoYXQgd2FzIHBvcHVsYXRlZCBzeW5jIGR1cmluZ1xuICAgICAgICAgICAgLy8gdGhlIGBwYXRjaEFuZFVwZ3JhZGVUcmVlYCBjYWxsIHRoYXQgY2F1c2VkIHRoaXMgJ2xvYWQnIGhhbmRsZXIgdG9cbiAgICAgICAgICAgIC8vIGJlIGFkZGVkLiBUaGVuLCByZW1vdmUgKnRoaXMqIGxpbmsncyBpbXBvcnQgbm9kZSBzbyB0aGF0IHdlIGNhblxuICAgICAgICAgICAgLy8gd2FsayB0aGF0IGltcG9ydCBhZ2FpbiwgZXZlbiBpZiBpdCB3YXMgcGFydGlhbGx5IHdhbGtlZCBsYXRlclxuICAgICAgICAgICAgLy8gZHVyaW5nIHRoZSBzYW1lIGBwYXRjaEFuZFVwZ3JhZGVUcmVlYCBjYWxsLlxuICAgICAgICAgICAgY29uc3QgY2xvbmVkVmlzaXRlZEltcG9ydHMgPSBuZXcgU2V0KHZpc2l0ZWRJbXBvcnRzKTtcbiAgICAgICAgICAgIHZpc2l0ZWRJbXBvcnRzLmRlbGV0ZShpbXBvcnROb2RlKTtcblxuICAgICAgICAgICAgdGhpcy5wYXRjaEFuZFVwZ3JhZGVUcmVlKGltcG9ydE5vZGUsIHZpc2l0ZWRJbXBvcnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gYHdhbGtEZWVwRGVzY2VuZGFudEVsZW1lbnRzYCBwb3B1bGF0ZXMgKGFuZCBpbnRlcm5hbGx5IGNoZWNrcyBhZ2FpbnN0KVxuICAgIC8vIGB2aXNpdGVkSW1wb3J0c2Agd2hlbiB0cmF2ZXJzaW5nIGEgbG9hZGVkIGltcG9ydC5cbiAgICBVdGlsaXRpZXMud2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMocm9vdCwgZ2F0aGVyRWxlbWVudHMsIHZpc2l0ZWRJbXBvcnRzKTtcblxuICAgIGlmICh0aGlzLl9oYXNQYXRjaGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucGF0Y2goZWxlbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudXBncmFkZUVsZW1lbnQoZWxlbWVudHNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XG4gICAqL1xuICB1cGdyYWRlRWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlID0gZWxlbWVudC5fX0NFX3N0YXRlO1xuICAgIGlmIChjdXJyZW50U3RhdGUgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IHRoaXMubG9jYWxOYW1lVG9EZWZpbml0aW9uKGVsZW1lbnQubG9jYWxOYW1lKTtcbiAgICBpZiAoIWRlZmluaXRpb24pIHJldHVybjtcblxuICAgIGRlZmluaXRpb24uY29uc3RydWN0aW9uU3RhY2sucHVzaChlbGVtZW50KTtcblxuICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gZGVmaW5pdGlvbi5jb25zdHJ1Y3RvcjtcbiAgICB0cnkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyAoY29uc3RydWN0b3IpKCk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXN0b20gZWxlbWVudCBjb25zdHJ1Y3RvciBkaWQgbm90IHByb2R1Y2UgdGhlIGVsZW1lbnQgYmVpbmcgdXBncmFkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlZmluaXRpb24uY29uc3RydWN0aW9uU3RhY2sucG9wKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZWxlbWVudC5fX0NFX3N0YXRlID0gQ0VTdGF0ZS5mYWlsZWQ7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX19DRV9zdGF0ZSA9IENFU3RhdGUuY3VzdG9tO1xuICAgIGVsZW1lbnQuX19DRV9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblxuICAgIGlmIChkZWZpbml0aW9uLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaykge1xuICAgICAgY29uc3Qgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gZGVmaW5pdGlvbi5vYnNlcnZlZEF0dHJpYnV0ZXM7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9ic2VydmVkQXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuYW1lID0gb2JzZXJ2ZWRBdHRyaWJ1dGVzW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhlbGVtZW50LCBuYW1lLCBudWxsLCB2YWx1ZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKGVsZW1lbnQpKSB7XG4gICAgICB0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XG4gICAqL1xuICBjb25uZWN0ZWRDYWxsYmFjayhlbGVtZW50KSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IGVsZW1lbnQuX19DRV9kZWZpbml0aW9uO1xuICAgIGlmIChkZWZpbml0aW9uLmNvbm5lY3RlZENhbGxiYWNrKSB7XG4gICAgICBkZWZpbml0aW9uLmNvbm5lY3RlZENhbGxiYWNrLmNhbGwoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5fX0NFX2lzQ29ubmVjdGVkQ2FsbGJhY2tDYWxsZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnRcbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQuX19DRV9pc0Nvbm5lY3RlZENhbGxiYWNrQ2FsbGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSBlbGVtZW50Ll9fQ0VfZGVmaW5pdGlvbjtcbiAgICBpZiAoZGVmaW5pdGlvbi5kaXNjb25uZWN0ZWRDYWxsYmFjaykge1xuICAgICAgZGVmaW5pdGlvbi5kaXNjb25uZWN0ZWRDYWxsYmFjay5jYWxsKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX19DRV9pc0Nvbm5lY3RlZENhbGxiYWNrQ2FsbGVkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHs/c3RyaW5nfSBvbGRWYWx1ZVxuICAgKiBAcGFyYW0gez9zdHJpbmd9IG5ld1ZhbHVlXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gbmFtZXNwYWNlXG4gICAqL1xuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soZWxlbWVudCwgbmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBuYW1lc3BhY2UpIHtcbiAgICBjb25zdCBkZWZpbml0aW9uID0gZWxlbWVudC5fX0NFX2RlZmluaXRpb247XG4gICAgaWYgKFxuICAgICAgZGVmaW5pdGlvbi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgJiZcbiAgICAgIGRlZmluaXRpb24ub2JzZXJ2ZWRBdHRyaWJ1dGVzLmluZGV4T2YobmFtZSkgPiAtMVxuICAgICkge1xuICAgICAgZGVmaW5pdGlvbi5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbChlbGVtZW50LCBuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIG5hbWVzcGFjZSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuL0N1c3RvbUVsZW1lbnRJbnRlcm5hbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudENvbnN0cnVjdGlvbk9ic2VydmVyIHtcbiAgY29uc3RydWN0b3IoaW50ZXJuYWxzLCBkb2MpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9XG4gICAgICovXG4gICAgdGhpcy5faW50ZXJuYWxzID0gaW50ZXJuYWxzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUgeyFEb2N1bWVudH1cbiAgICAgKi9cbiAgICB0aGlzLl9kb2N1bWVudCA9IGRvYztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtNdXRhdGlvbk9ic2VydmVyfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB0aGlzLl9vYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuXG4gICAgLy8gU2ltdWxhdGUgdHJlZSBjb25zdHJ1Y3Rpb24gZm9yIGFsbCBjdXJyZW50bHkgYWNjZXNzaWJsZSBub2RlcyBpbiB0aGVcbiAgICAvLyBkb2N1bWVudC5cbiAgICB0aGlzLl9pbnRlcm5hbHMucGF0Y2hBbmRVcGdyYWRlVHJlZSh0aGlzLl9kb2N1bWVudCk7XG5cbiAgICBpZiAodGhpcy5fZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuX2hhbmRsZU11dGF0aW9ucy5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gTm9kZXMgY3JlYXRlZCBieSB0aGUgcGFyc2VyIGFyZSBnaXZlbiB0byB0aGUgb2JzZXJ2ZXIgKmJlZm9yZSogdGhlIG5leHRcbiAgICAgIC8vIHRhc2sgcnVucy4gSW5saW5lIHNjcmlwdHMgYXJlIHJ1biBpbiBhIG5ldyB0YXNrLiBUaGlzIG1lYW5zIHRoYXQgdGhlXG4gICAgICAvLyBvYnNlcnZlciB3aWxsIGJlIGFibGUgdG8gaGFuZGxlIHRoZSBuZXdseSBwYXJzZWQgbm9kZXMgYmVmb3JlIHRoZSBpbmxpbmVcbiAgICAgIC8vIHNjcmlwdCBpcyBydW4uXG4gICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX2RvY3VtZW50LCB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFycmF5PCFNdXRhdGlvblJlY29yZD59IG11dGF0aW9uc1xuICAgKi9cbiAgX2hhbmRsZU11dGF0aW9ucyhtdXRhdGlvbnMpIHtcbiAgICAvLyBPbmNlIHRoZSBkb2N1bWVudCdzIGByZWFkeVN0YXRlYCBpcyAnaW50ZXJhY3RpdmUnIG9yICdjb21wbGV0ZScsIGFsbCBuZXdcbiAgICAvLyBub2RlcyBjcmVhdGVkIHdpdGhpbiB0aGF0IGRvY3VtZW50IHdpbGwgYmUgdGhlIHJlc3VsdCBvZiBzY3JpcHQgYW5kXG4gICAgLy8gc2hvdWxkIGJlIGhhbmRsZWQgYnkgcGF0Y2hpbmcuXG4gICAgY29uc3QgcmVhZHlTdGF0ZSA9IHRoaXMuX2RvY3VtZW50LnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgfHwgcmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkZGVkTm9kZXMgPSBtdXRhdGlvbnNbaV0uYWRkZWROb2RlcztcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWRkZWROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBub2RlID0gYWRkZWROb2Rlc1tqXTtcbiAgICAgICAgdGhpcy5faW50ZXJuYWxzLnBhdGNoQW5kVXBncmFkZVRyZWUobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlZmVycmVkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7VHx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAgICovXG4gICAgdGhpcy5fcmVzb2x2ZSA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFQcm9taXNlPFQ+fVxuICAgICAqL1xuICAgIHRoaXMuX3Byb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHRoaXMuX3Jlc29sdmUgPSByZXNvbHZlO1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUfSB2YWx1ZVxuICAgKi9cbiAgcmVzb2x2ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl92YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbHJlYWR5IHJlc29sdmVkLicpO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fcmVzb2x2ZSkge1xuICAgICAgdGhpcy5fcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFQcm9taXNlPFQ+fVxuICAgKi9cbiAgdG9Qcm9taXNlKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9taXNlO1xuICB9XG59XG4iLCJpbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuL0N1c3RvbUVsZW1lbnRJbnRlcm5hbHMuanMnO1xuaW1wb3J0IERvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIgZnJvbSAnLi9Eb2N1bWVudENvbnN0cnVjdGlvbk9ic2VydmVyLmpzJztcbmltcG9ydCBEZWZlcnJlZCBmcm9tICcuL0RlZmVycmVkLmpzJztcbmltcG9ydCAqIGFzIFV0aWxpdGllcyBmcm9tICcuL1V0aWxpdGllcy5qcyc7XG5cbi8qKlxuICogQHVucmVzdHJpY3RlZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21FbGVtZW50UmVnaXN0cnkge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFDdXN0b21FbGVtZW50SW50ZXJuYWxzfSBpbnRlcm5hbHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGludGVybmFscykge1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fZWxlbWVudERlZmluaXRpb25Jc1J1bm5pbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFDdXN0b21FbGVtZW50SW50ZXJuYWxzfVxuICAgICAqL1xuICAgIHRoaXMuX2ludGVybmFscyA9IGludGVybmFscztcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFNYXA8c3RyaW5nLCAhRGVmZXJyZWQ8dW5kZWZpbmVkPj59XG4gICAgICovXG4gICAgdGhpcy5fd2hlbkRlZmluZWREZWZlcnJlZCA9IG5ldyBNYXAoKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGZsdXNoIGNhbGxiYWNrIHRyaWdnZXJzIHRoZSBkb2N1bWVudCB3YWxrIHN5bmNocm9ub3VzbHkuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7IUZ1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMuX2ZsdXNoQ2FsbGJhY2sgPSBmbiA9PiBmbigpO1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9mbHVzaFBlbmRpbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFBcnJheTxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMuX3VuZmx1c2hlZExvY2FsTmFtZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHR5cGUgeyFEb2N1bWVudENvbnN0cnVjdGlvbk9ic2VydmVyfVxuICAgICAqL1xuICAgIHRoaXMuX2RvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIgPSBuZXcgRG9jdW1lbnRDb25zdHJ1Y3Rpb25PYnNlcnZlcihpbnRlcm5hbHMsIGRvY3VtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxOYW1lXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZGVmaW5lKGxvY2FsTmFtZSwgY29uc3RydWN0b3IpIHtcbiAgICBpZiAoIShjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3JzIG11c3QgYmUgZnVuY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICghVXRpbGl0aWVzLmlzVmFsaWRDdXN0b21FbGVtZW50TmFtZShsb2NhbE5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFRoZSBlbGVtZW50IG5hbWUgJyR7bG9jYWxOYW1lfScgaXMgbm90IHZhbGlkLmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcm5hbHMubG9jYWxOYW1lVG9EZWZpbml0aW9uKGxvY2FsTmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQSBjdXN0b20gZWxlbWVudCB3aXRoIG5hbWUgJyR7bG9jYWxOYW1lfScgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkLmApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9lbGVtZW50RGVmaW5pdGlvbklzUnVubmluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGN1c3RvbSBlbGVtZW50IGlzIGFscmVhZHkgYmVpbmcgZGVmaW5lZC4nKTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudERlZmluaXRpb25Jc1J1bm5pbmcgPSB0cnVlO1xuXG4gICAgbGV0IGNvbm5lY3RlZENhbGxiYWNrO1xuICAgIGxldCBkaXNjb25uZWN0ZWRDYWxsYmFjaztcbiAgICBsZXQgYWRvcHRlZENhbGxiYWNrO1xuICAgIGxldCBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2s7XG4gICAgbGV0IG9ic2VydmVkQXR0cmlidXRlcztcbiAgICB0cnkge1xuICAgICAgLyoqIEB0eXBlIHshT2JqZWN0fSAqL1xuICAgICAgY29uc3QgcHJvdG90eXBlID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICAgICAgaWYgKCEocHJvdG90eXBlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY3VzdG9tIGVsZW1lbnQgY29uc3RydWN0b3JcXCdzIHByb3RvdHlwZSBpcyBub3QgYW4gb2JqZWN0LicpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRDYWxsYmFjayhuYW1lKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrVmFsdWUgPSBwcm90b3R5cGVbbmFtZV07XG4gICAgICAgIGlmIChjYWxsYmFja1ZhbHVlICE9PSB1bmRlZmluZWQgJiYgIShjYWxsYmFja1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgJyR7bmFtZX0nIGNhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2tWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgY29ubmVjdGVkQ2FsbGJhY2sgPSBnZXRDYWxsYmFjaygnY29ubmVjdGVkQ2FsbGJhY2snKTtcbiAgICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrID0gZ2V0Q2FsbGJhY2soJ2Rpc2Nvbm5lY3RlZENhbGxiYWNrJyk7XG4gICAgICBhZG9wdGVkQ2FsbGJhY2sgPSBnZXRDYWxsYmFjaygnYWRvcHRlZENhbGxiYWNrJyk7XG4gICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBnZXRDYWxsYmFjaygnYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJyk7XG4gICAgICBvYnNlcnZlZEF0dHJpYnV0ZXMgPSBjb25zdHJ1Y3Rvclsnb2JzZXJ2ZWRBdHRyaWJ1dGVzJ10gfHwgW107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLl9lbGVtZW50RGVmaW5pdGlvbklzUnVubmluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSB7XG4gICAgICBsb2NhbE5hbWUsXG4gICAgICBjb25zdHJ1Y3RvcixcbiAgICAgIGNvbm5lY3RlZENhbGxiYWNrLFxuICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2ssXG4gICAgICBhZG9wdGVkQ2FsbGJhY2ssXG4gICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2ssXG4gICAgICBvYnNlcnZlZEF0dHJpYnV0ZXMsXG4gICAgICBjb25zdHJ1Y3Rpb25TdGFjazogW10sXG4gICAgfTtcblxuICAgIHRoaXMuX2ludGVybmFscy5zZXREZWZpbml0aW9uKGxvY2FsTmFtZSwgZGVmaW5pdGlvbik7XG5cbiAgICB0aGlzLl91bmZsdXNoZWRMb2NhbE5hbWVzLnB1c2gobG9jYWxOYW1lKTtcblxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgY2FsbGVkIHRoZSBmbHVzaCBjYWxsYmFjayBhbmQgaXQgaGFzbid0IGNhbGxlZCBiYWNrIHlldCxcbiAgICAvLyBkb24ndCBjYWxsIGl0IGFnYWluLlxuICAgIGlmICghdGhpcy5fZmx1c2hQZW5kaW5nKSB7XG4gICAgICB0aGlzLl9mbHVzaFBlbmRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fZmx1c2hDYWxsYmFjaygoKSA9PiB0aGlzLl9mbHVzaCgpKTtcbiAgICB9XG4gIH1cblxuICBfZmx1c2goKSB7XG4gICAgLy8gSWYgbm8gbmV3IGRlZmluaXRpb25zIHdlcmUgZGVmaW5lZCwgZG9uJ3QgYXR0ZW1wdCB0byBmbHVzaC4gVGhpcyBjb3VsZFxuICAgIC8vIGhhcHBlbiBpZiBhIGZsdXNoIGNhbGxiYWNrIGtlZXBzIHRoZSBmdW5jdGlvbiBpdCBpcyBnaXZlbiBhbmQgY2FsbHMgaXRcbiAgICAvLyBtdWx0aXBsZSB0aW1lcy5cbiAgICBpZiAodGhpcy5fZmx1c2hQZW5kaW5nID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fZmx1c2hQZW5kaW5nID0gZmFsc2U7XG4gICAgdGhpcy5faW50ZXJuYWxzLnBhdGNoQW5kVXBncmFkZVRyZWUoZG9jdW1lbnQpO1xuXG4gICAgd2hpbGUgKHRoaXMuX3VuZmx1c2hlZExvY2FsTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbG9jYWxOYW1lID0gdGhpcy5fdW5mbHVzaGVkTG9jYWxOYW1lcy5zaGlmdCgpO1xuICAgICAgY29uc3QgZGVmZXJyZWQgPSB0aGlzLl93aGVuRGVmaW5lZERlZmVycmVkLmdldChsb2NhbE5hbWUpO1xuICAgICAgaWYgKGRlZmVycmVkKSB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsTmFtZVxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbnx1bmRlZmluZWR9XG4gICAqL1xuICBnZXQobG9jYWxOYW1lKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbiA9IHRoaXMuX2ludGVybmFscy5sb2NhbE5hbWVUb0RlZmluaXRpb24obG9jYWxOYW1lKTtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgcmV0dXJuIGRlZmluaXRpb24uY29uc3RydWN0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxOYW1lXG4gICAqIEByZXR1cm4geyFQcm9taXNlPHVuZGVmaW5lZD59XG4gICAqL1xuICB3aGVuRGVmaW5lZChsb2NhbE5hbWUpIHtcbiAgICBpZiAoIVV0aWxpdGllcy5pc1ZhbGlkQ3VzdG9tRWxlbWVudE5hbWUobG9jYWxOYW1lKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBTeW50YXhFcnJvcihgJyR7bG9jYWxOYW1lfScgaXMgbm90IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgbmFtZS5gKSk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJpb3IgPSB0aGlzLl93aGVuRGVmaW5lZERlZmVycmVkLmdldChsb2NhbE5hbWUpO1xuICAgIGlmIChwcmlvcikge1xuICAgICAgcmV0dXJuIHByaW9yLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XG4gICAgdGhpcy5fd2hlbkRlZmluZWREZWZlcnJlZC5zZXQobG9jYWxOYW1lLCBkZWZlcnJlZCk7XG5cbiAgICBjb25zdCBkZWZpbml0aW9uID0gdGhpcy5faW50ZXJuYWxzLmxvY2FsTmFtZVRvRGVmaW5pdGlvbihsb2NhbE5hbWUpO1xuICAgIC8vIFJlc29sdmUgaW1tZWRpYXRlbHkgb25seSBpZiB0aGUgZ2l2ZW4gbG9jYWwgbmFtZSBoYXMgYSBkZWZpbml0aW9uICphbmQqXG4gICAgLy8gdGhlIGZ1bGwgZG9jdW1lbnQgd2FsayB0byB1cGdyYWRlIGVsZW1lbnRzIHdpdGggdGhhdCBsb2NhbCBuYW1lIGhhc1xuICAgIC8vIGFscmVhZHkgaGFwcGVuZWQuXG4gICAgaWYgKGRlZmluaXRpb24gJiYgdGhpcy5fdW5mbHVzaGVkTG9jYWxOYW1lcy5pbmRleE9mKGxvY2FsTmFtZSkgPT09IC0xKSB7XG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgcG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjayhvdXRlcikge1xuICAgIHRoaXMuX2RvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIGNvbnN0IGlubmVyID0gdGhpcy5fZmx1c2hDYWxsYmFjaztcbiAgICB0aGlzLl9mbHVzaENhbGxiYWNrID0gZmx1c2ggPT4gb3V0ZXIoKCkgPT4gaW5uZXIoZmx1c2gpKTtcbiAgfVxufVxuXG4vLyBDbG9zdXJlIGNvbXBpbGVyIGV4cG9ydHMuXG53aW5kb3dbJ0N1c3RvbUVsZW1lbnRSZWdpc3RyeSddID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5O1xuQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LnByb3RvdHlwZVsnZGVmaW5lJ10gPSBDdXN0b21FbGVtZW50UmVnaXN0cnkucHJvdG90eXBlLmRlZmluZTtcbkN1c3RvbUVsZW1lbnRSZWdpc3RyeS5wcm90b3R5cGVbJ2dldCddID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LnByb3RvdHlwZS5nZXQ7XG5DdXN0b21FbGVtZW50UmVnaXN0cnkucHJvdG90eXBlWyd3aGVuRGVmaW5lZCddID0gQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LnByb3RvdHlwZS53aGVuRGVmaW5lZDtcbkN1c3RvbUVsZW1lbnRSZWdpc3RyeS5wcm90b3R5cGVbJ3BvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2snXSA9IEN1c3RvbUVsZW1lbnRSZWdpc3RyeS5wcm90b3R5cGUucG9seWZpbGxXcmFwRmx1c2hDYWxsYmFjaztcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgRG9jdW1lbnRfY3JlYXRlRWxlbWVudDogd2luZG93LkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50LFxuICBEb2N1bWVudF9jcmVhdGVFbGVtZW50TlM6IHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudE5TLFxuICBEb2N1bWVudF9pbXBvcnROb2RlOiB3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGUsXG4gIERvY3VtZW50X3ByZXBlbmQ6IHdpbmRvdy5Eb2N1bWVudC5wcm90b3R5cGVbJ3ByZXBlbmQnXSxcbiAgRG9jdW1lbnRfYXBwZW5kOiB3aW5kb3cuRG9jdW1lbnQucHJvdG90eXBlWydhcHBlbmQnXSxcbiAgTm9kZV9jbG9uZU5vZGU6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5jbG9uZU5vZGUsXG4gIE5vZGVfYXBwZW5kQ2hpbGQ6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCxcbiAgTm9kZV9pbnNlcnRCZWZvcmU6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5pbnNlcnRCZWZvcmUsXG4gIE5vZGVfcmVtb3ZlQ2hpbGQ6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCxcbiAgTm9kZV9yZXBsYWNlQ2hpbGQ6IHdpbmRvdy5Ob2RlLnByb3RvdHlwZS5yZXBsYWNlQ2hpbGQsXG4gIE5vZGVfdGV4dENvbnRlbnQ6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93Lk5vZGUucHJvdG90eXBlLCAndGV4dENvbnRlbnQnKSxcbiAgRWxlbWVudF9hdHRhY2hTaGFkb3c6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsnYXR0YWNoU2hhZG93J10sXG4gIEVsZW1lbnRfaW5uZXJIVE1MOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZSwgJ2lubmVySFRNTCcpLFxuICBFbGVtZW50X2dldEF0dHJpYnV0ZTogd2luZG93LkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSxcbiAgRWxlbWVudF9zZXRBdHRyaWJ1dGU6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUsXG4gIEVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlLFxuICBFbGVtZW50X2dldEF0dHJpYnV0ZU5TOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUuZ2V0QXR0cmlidXRlTlMsXG4gIEVsZW1lbnRfc2V0QXR0cmlidXRlTlM6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVOUyxcbiAgRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGVOUzogd2luZG93LkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TLFxuICBFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudDogd2luZG93LkVsZW1lbnQucHJvdG90eXBlWydpbnNlcnRBZGphY2VudEVsZW1lbnQnXSxcbiAgRWxlbWVudF9wcmVwZW5kOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbJ3ByZXBlbmQnXSxcbiAgRWxlbWVudF9hcHBlbmQ6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsnYXBwZW5kJ10sXG4gIEVsZW1lbnRfYmVmb3JlOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbJ2JlZm9yZSddLFxuICBFbGVtZW50X2FmdGVyOiB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGVbJ2FmdGVyJ10sXG4gIEVsZW1lbnRfcmVwbGFjZVdpdGg6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsncmVwbGFjZVdpdGgnXSxcbiAgRWxlbWVudF9yZW1vdmU6IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZVsncmVtb3ZlJ10sXG4gIEhUTUxFbGVtZW50OiB3aW5kb3cuSFRNTEVsZW1lbnQsXG4gIEhUTUxFbGVtZW50X2lubmVySFRNTDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnaW5uZXJIVE1MJyksXG4gIEhUTUxFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudDogd2luZG93LkhUTUxFbGVtZW50LnByb3RvdHlwZVsnaW5zZXJ0QWRqYWNlbnRFbGVtZW50J10sXG59O1xuIiwiLyoqXG4gKiBUaGlzIGNsYXNzIGV4aXN0cyBvbmx5IHRvIHdvcmsgYXJvdW5kIENsb3N1cmUncyBsYWNrIG9mIGEgd2F5IHRvIGRlc2NyaWJlXG4gKiBzaW5nbGV0b25zLiBJdCByZXByZXNlbnRzIHRoZSAnYWxyZWFkeSBjb25zdHJ1Y3RlZCBtYXJrZXInIHVzZWQgaW4gY3VzdG9tXG4gKiBlbGVtZW50IGNvbnN0cnVjdGlvbiBzdGFja3MuXG4gKlxuICogaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1hbHJlYWR5LWNvbnN0cnVjdGVkLW1hcmtlclxuICovXG5jbGFzcyBBbHJlYWR5Q29uc3RydWN0ZWRNYXJrZXIge31cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEFscmVhZHlDb25zdHJ1Y3RlZE1hcmtlcigpO1xuIiwiaW1wb3J0IE5hdGl2ZSBmcm9tICcuL05hdGl2ZS5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuLi9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzJztcbmltcG9ydCBDRVN0YXRlIGZyb20gJy4uL0N1c3RvbUVsZW1lbnRTdGF0ZS5qcyc7XG5pbXBvcnQgQWxyZWFkeUNvbnN0cnVjdGVkTWFya2VyIGZyb20gJy4uL0FscmVhZHlDb25zdHJ1Y3RlZE1hcmtlci5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gaW50ZXJuYWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVybmFscykge1xuICB3aW5kb3dbJ0hUTUxFbGVtZW50J10gPSAoZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2Z1bmN0aW9uKG5ldzogSFRNTEVsZW1lbnQpOiAhSFRNTEVsZW1lbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gSFRNTEVsZW1lbnQoKSB7XG4gICAgICAvLyBUaGlzIHNob3VsZCByZWFsbHkgYmUgYG5ldy50YXJnZXRgIGJ1dCBgbmV3LnRhcmdldGAgY2FuJ3QgYmUgZW11bGF0ZWRcbiAgICAgIC8vIGluIEVTNS4gQXNzdW1pbmcgdGhlIHVzZXIga2VlcHMgdGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIGNvbnN0cnVjdG9yJ3NcbiAgICAgIC8vIHByb3RvdHlwZSdzIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHksIHRoaXMgaXMgZXF1aXZhbGVudC5cbiAgICAgIC8qKiBAdHlwZSB7IUZ1bmN0aW9ufSAqL1xuICAgICAgY29uc3QgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgICBjb25zdCBkZWZpbml0aW9uID0gaW50ZXJuYWxzLmNvbnN0cnVjdG9yVG9EZWZpbml0aW9uKGNvbnN0cnVjdG9yKTtcbiAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXN0b20gZWxlbWVudCBiZWluZyBjb25zdHJ1Y3RlZCB3YXMgbm90IHJlZ2lzdGVyZWQgd2l0aCBgY3VzdG9tRWxlbWVudHNgLicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25zdHJ1Y3Rpb25TdGFjayA9IGRlZmluaXRpb24uY29uc3RydWN0aW9uU3RhY2s7XG5cbiAgICAgIGlmIChjb25zdHJ1Y3Rpb25TdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IE5hdGl2ZS5Eb2N1bWVudF9jcmVhdGVFbGVtZW50LmNhbGwoZG9jdW1lbnQsIGRlZmluaXRpb24ubG9jYWxOYW1lKTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVsZW1lbnQsIGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgIGVsZW1lbnQuX19DRV9zdGF0ZSA9IENFU3RhdGUuY3VzdG9tO1xuICAgICAgICBlbGVtZW50Ll9fQ0VfZGVmaW5pdGlvbiA9IGRlZmluaXRpb247XG4gICAgICAgIGludGVybmFscy5wYXRjaChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3RJbmRleCA9IGNvbnN0cnVjdGlvblN0YWNrLmxlbmd0aCAtIDE7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29uc3RydWN0aW9uU3RhY2tbbGFzdEluZGV4XTtcbiAgICAgIGlmIChlbGVtZW50ID09PSBBbHJlYWR5Q29uc3RydWN0ZWRNYXJrZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgSFRNTEVsZW1lbnQgY29uc3RydWN0b3Igd2FzIGVpdGhlciBjYWxsZWQgcmVlbnRyYW50bHkgZm9yIHRoaXMgY29uc3RydWN0b3Igb3IgY2FsbGVkIG11bHRpcGxlIHRpbWVzLicpO1xuICAgICAgfVxuICAgICAgY29uc3RydWN0aW9uU3RhY2tbbGFzdEluZGV4XSA9IEFscmVhZHlDb25zdHJ1Y3RlZE1hcmtlcjtcblxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVsZW1lbnQsIGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICBpbnRlcm5hbHMucGF0Y2goLyoqIEB0eXBlIHshSFRNTEVsZW1lbnR9ICovIChlbGVtZW50KSk7XG5cbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZSA9IE5hdGl2ZS5IVE1MRWxlbWVudC5wcm90b3R5cGU7XG5cbiAgICByZXR1cm4gSFRNTEVsZW1lbnQ7XG4gIH0pKCk7XG59O1xuIiwiaW1wb3J0IEN1c3RvbUVsZW1lbnRJbnRlcm5hbHMgZnJvbSAnLi4vLi4vQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBwcmVwZW5kOiAhZnVuY3Rpb24oLi4uKCFOb2RlfHN0cmluZykpLFxuICAqICBhcHBlbmQ6ICFmdW5jdGlvbiguLi4oIU5vZGV8c3RyaW5nKSksXG4gKiB9fVxuICovXG5sZXQgUGFyZW50Tm9kZU5hdGl2ZU1ldGhvZHM7XG5cbi8qKlxuICogQHBhcmFtIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gaW50ZXJuYWxzXG4gKiBAcGFyYW0geyFPYmplY3R9IGRlc3RpbmF0aW9uXG4gKiBAcGFyYW0geyFQYXJlbnROb2RlTmF0aXZlTWV0aG9kc30gYnVpbHRJblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMsIGRlc3RpbmF0aW9uLCBidWlsdEluKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ3ByZXBlbmQnXSA9IGZ1bmN0aW9uKC4uLm5vZGVzKSB7XG4gICAgLy8gVE9ETzogRml4IHRoaXMgZm9yIHdoZW4gb25lIG9mIGBub2Rlc2AgaXMgYSBEb2N1bWVudEZyYWdtZW50IVxuICAgIGNvbnN0IGNvbm5lY3RlZEJlZm9yZSA9IC8qKiBAdHlwZSB7IUFycmF5PCFOb2RlPn0gKi8gKG5vZGVzLmZpbHRlcihub2RlID0+IHtcbiAgICAgIC8vIERvY3VtZW50RnJhZ21lbnRzIGFyZSBub3QgY29ubmVjdGVkIGFuZCB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgbGlzdC5cbiAgICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgTm9kZSAmJiBVdGlsaXRpZXMuaXNDb25uZWN0ZWQobm9kZSk7XG4gICAgfSkpO1xuXG4gICAgYnVpbHRJbi5wcmVwZW5kLmFwcGx5KHRoaXMsIG5vZGVzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29ubmVjdGVkQmVmb3JlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUoY29ubmVjdGVkQmVmb3JlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmNvbm5lY3RUcmVlKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ2FwcGVuZCddID0gZnVuY3Rpb24oLi4ubm9kZXMpIHtcbiAgICAvLyBUT0RPOiBGaXggdGhpcyBmb3Igd2hlbiBvbmUgb2YgYG5vZGVzYCBpcyBhIERvY3VtZW50RnJhZ21lbnQhXG4gICAgY29uc3QgY29ubmVjdGVkQmVmb3JlID0gLyoqIEB0eXBlIHshQXJyYXk8IU5vZGU+fSAqLyAobm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgYXJlIG5vdCBjb25uZWN0ZWQgYW5kIHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBsaXN0LlxuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICB9KSk7XG5cbiAgICBidWlsdEluLmFwcGVuZC5hcHBseSh0aGlzLCBub2Rlcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbm5lY3RlZEJlZm9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKGNvbm5lY3RlZEJlZm9yZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG4iLCJpbXBvcnQgTmF0aXZlIGZyb20gJy4vTmF0aXZlLmpzJztcbmltcG9ydCBDdXN0b21FbGVtZW50SW50ZXJuYWxzIGZyb20gJy4uL0N1c3RvbUVsZW1lbnRJbnRlcm5hbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbGl0aWVzIGZyb20gJy4uL1V0aWxpdGllcy5qcyc7XG5cbmltcG9ydCBQYXRjaFBhcmVudE5vZGUgZnJvbSAnLi9JbnRlcmZhY2UvUGFyZW50Tm9kZS5qcyc7XG5cbi8qKlxuICogQHBhcmFtIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gaW50ZXJuYWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGludGVybmFscykge1xuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRG9jdW1lbnQucHJvdG90eXBlLCAnY3JlYXRlRWxlbWVudCcsXG4gICAgLyoqXG4gICAgICogQHRoaXMge0RvY3VtZW50fVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbE5hbWVcbiAgICAgKiBAcmV0dXJuIHshRWxlbWVudH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbihsb2NhbE5hbWUpIHtcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGRvY3VtZW50IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVnaXN0cnkuXG4gICAgICBpZiAodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5KSB7XG4gICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSBpbnRlcm5hbHMubG9jYWxOYW1lVG9EZWZpbml0aW9uKGxvY2FsTmFtZSk7XG4gICAgICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyAoZGVmaW5pdGlvbi5jb25zdHJ1Y3RvcikoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSAvKiogQHR5cGUgeyFFbGVtZW50fSAqL1xuICAgICAgICAoTmF0aXZlLkRvY3VtZW50X2NyZWF0ZUVsZW1lbnQuY2FsbCh0aGlzLCBsb2NhbE5hbWUpKTtcbiAgICAgIGludGVybmFscy5wYXRjaChyZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRG9jdW1lbnQucHJvdG90eXBlLCAnaW1wb3J0Tm9kZScsXG4gICAgLyoqXG4gICAgICogQHRoaXMge0RvY3VtZW50fVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBkZWVwXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24obm9kZSwgZGVlcCkge1xuICAgICAgY29uc3QgY2xvbmUgPSBOYXRpdmUuRG9jdW1lbnRfaW1wb3J0Tm9kZS5jYWxsKHRoaXMsIG5vZGUsIGRlZXApO1xuICAgICAgLy8gT25seSBjcmVhdGUgY3VzdG9tIGVsZW1lbnRzIGlmIHRoaXMgZG9jdW1lbnQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSByZWdpc3RyeS5cbiAgICAgIGlmICghdGhpcy5fX0NFX2hhc1JlZ2lzdHJ5KSB7XG4gICAgICAgIGludGVybmFscy5wYXRjaFRyZWUoY2xvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJuYWxzLnBhdGNoQW5kVXBncmFkZVRyZWUoY2xvbmUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH0pO1xuXG4gIGNvbnN0IE5TX0hUTUwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRG9jdW1lbnQucHJvdG90eXBlLCAnY3JlYXRlRWxlbWVudE5TJyxcbiAgICAvKipcbiAgICAgKiBAdGhpcyB7RG9jdW1lbnR9XG4gICAgICogQHBhcmFtIHs/c3RyaW5nfSBuYW1lc3BhY2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxOYW1lXG4gICAgICogQHJldHVybiB7IUVsZW1lbnR9XG4gICAgICovXG4gICAgZnVuY3Rpb24obmFtZXNwYWNlLCBsb2NhbE5hbWUpIHtcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGRvY3VtZW50IGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVnaXN0cnkuXG4gICAgICBpZiAodGhpcy5fX0NFX2hhc1JlZ2lzdHJ5ICYmIChuYW1lc3BhY2UgPT09IG51bGwgfHwgbmFtZXNwYWNlID09PSBOU19IVE1MKSkge1xuICAgICAgICBjb25zdCBkZWZpbml0aW9uID0gaW50ZXJuYWxzLmxvY2FsTmFtZVRvRGVmaW5pdGlvbihsb2NhbE5hbWUpO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICAgIHJldHVybiBuZXcgKGRlZmluaXRpb24uY29uc3RydWN0b3IpKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gLyoqIEB0eXBlIHshRWxlbWVudH0gKi9cbiAgICAgICAgKE5hdGl2ZS5Eb2N1bWVudF9jcmVhdGVFbGVtZW50TlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIGxvY2FsTmFtZSkpO1xuICAgICAgaW50ZXJuYWxzLnBhdGNoKHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gIFBhdGNoUGFyZW50Tm9kZShpbnRlcm5hbHMsIERvY3VtZW50LnByb3RvdHlwZSwge1xuICAgIHByZXBlbmQ6IE5hdGl2ZS5Eb2N1bWVudF9wcmVwZW5kLFxuICAgIGFwcGVuZDogTmF0aXZlLkRvY3VtZW50X2FwcGVuZCxcbiAgfSk7XG59O1xuIiwiaW1wb3J0IE5hdGl2ZSBmcm9tICcuL05hdGl2ZS5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuLi9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxpdGllcyBmcm9tICcuLi9VdGlsaXRpZXMuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9IGludGVybmFsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMpIHtcbiAgLy8gYE5vZGUjbm9kZVZhbHVlYCBpcyBpbXBsZW1lbnRlZCBvbiBgQXR0cmAuXG4gIC8vIGBOb2RlI3RleHRDb250ZW50YCBpcyBpbXBsZW1lbnRlZCBvbiBgQXR0cmAsIGBFbGVtZW50YC5cblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoTm9kZS5wcm90b3R5cGUsICdpbnNlcnRCZWZvcmUnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcGFyYW0gez9Ob2RlfSByZWZOb2RlXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24obm9kZSwgcmVmTm9kZSkge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IGluc2VydGVkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobm9kZS5jaGlsZE5vZGVzKTtcbiAgICAgICAgY29uc3QgbmF0aXZlUmVzdWx0ID0gTmF0aXZlLk5vZGVfaW5zZXJ0QmVmb3JlLmNhbGwodGhpcywgbm9kZSwgcmVmTm9kZSk7XG5cbiAgICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgY2FuJ3QgYmUgY29ubmVjdGVkLCBzbyBgZGlzY29ubmVjdFRyZWVgIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gbmVlZCB0byBiZSBjYWxsZWQgb24gYSBEb2N1bWVudEZyYWdtZW50J3MgY2hpbGRyZW4gYWZ0ZXIgaW5zZXJ0aW5nIGl0LlxuXG4gICAgICAgIGlmIChVdGlsaXRpZXMuaXNDb25uZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc2VydGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShpbnNlcnRlZE5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmF0aXZlUmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub2RlV2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKG5vZGUpO1xuICAgICAgY29uc3QgbmF0aXZlUmVzdWx0ID0gTmF0aXZlLk5vZGVfaW5zZXJ0QmVmb3JlLmNhbGwodGhpcywgbm9kZSwgcmVmTm9kZSk7XG5cbiAgICAgIGlmIChub2RlV2FzQ29ubmVjdGVkKSB7XG4gICAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZShub2RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuYXRpdmVSZXN1bHQ7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKE5vZGUucHJvdG90eXBlLCAnYXBwZW5kQ2hpbGQnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHshTm9kZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgY29uc3QgaW5zZXJ0ZWROb2RlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShub2RlLmNoaWxkTm9kZXMpO1xuICAgICAgICBjb25zdCBuYXRpdmVSZXN1bHQgPSBOYXRpdmUuTm9kZV9hcHBlbmRDaGlsZC5jYWxsKHRoaXMsIG5vZGUpO1xuXG4gICAgICAgIC8vIERvY3VtZW50RnJhZ21lbnRzIGNhbid0IGJlIGNvbm5lY3RlZCwgc28gYGRpc2Nvbm5lY3RUcmVlYCB3aWxsIG5ldmVyXG4gICAgICAgIC8vIG5lZWQgdG8gYmUgY2FsbGVkIG9uIGEgRG9jdW1lbnRGcmFnbWVudCdzIGNoaWxkcmVuIGFmdGVyIGluc2VydGluZyBpdC5cblxuICAgICAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnNlcnRlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUoaW5zZXJ0ZWROb2Rlc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5hdGl2ZVJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZVdhc0Nvbm5lY3RlZCA9IFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICAgIGNvbnN0IG5hdGl2ZVJlc3VsdCA9IE5hdGl2ZS5Ob2RlX2FwcGVuZENoaWxkLmNhbGwodGhpcywgbm9kZSk7XG5cbiAgICAgIGlmIChub2RlV2FzQ29ubmVjdGVkKSB7XG4gICAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZShub2RlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuYXRpdmVSZXN1bHQ7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKE5vZGUucHJvdG90eXBlLCAnY2xvbmVOb2RlJyxcbiAgICAvKipcbiAgICAgKiBAdGhpcyB7Tm9kZX1cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBkZWVwXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24oZGVlcCkge1xuICAgICAgY29uc3QgY2xvbmUgPSBOYXRpdmUuTm9kZV9jbG9uZU5vZGUuY2FsbCh0aGlzLCBkZWVwKTtcbiAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGVsZW1lbnQncyBvd25lciBkb2N1bWVudCBpc1xuICAgICAgLy8gYXNzb2NpYXRlZCB3aXRoIHRoZSByZWdpc3RyeS5cbiAgICAgIGlmICghdGhpcy5vd25lckRvY3VtZW50Ll9fQ0VfaGFzUmVnaXN0cnkpIHtcbiAgICAgICAgaW50ZXJuYWxzLnBhdGNoVHJlZShjbG9uZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnRlcm5hbHMucGF0Y2hBbmRVcGdyYWRlVHJlZShjbG9uZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2xvbmU7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKE5vZGUucHJvdG90eXBlLCAncmVtb3ZlQ2hpbGQnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtOb2RlfVxuICAgICAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHshTm9kZX1cbiAgICAgKi9cbiAgICBmdW5jdGlvbihub2RlKSB7XG4gICAgICBjb25zdCBub2RlV2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKG5vZGUpO1xuICAgICAgY29uc3QgbmF0aXZlUmVzdWx0ID0gTmF0aXZlLk5vZGVfcmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCBub2RlKTtcblxuICAgICAgaWYgKG5vZGVXYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKG5vZGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmF0aXZlUmVzdWx0O1xuICAgIH0pO1xuXG4gIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChOb2RlLnByb3RvdHlwZSwgJ3JlcGxhY2VDaGlsZCcsXG4gICAgLyoqXG4gICAgICogQHRoaXMge05vZGV9XG4gICAgICogQHBhcmFtIHshTm9kZX0gbm9kZVRvSW5zZXJ0XG4gICAgICogQHBhcmFtIHshTm9kZX0gbm9kZVRvUmVtb3ZlXG4gICAgICogQHJldHVybiB7IU5vZGV9XG4gICAgICovXG4gICAgZnVuY3Rpb24obm9kZVRvSW5zZXJ0LCBub2RlVG9SZW1vdmUpIHtcbiAgICAgIGlmIChub2RlVG9JbnNlcnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgIGNvbnN0IGluc2VydGVkTm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobm9kZVRvSW5zZXJ0LmNoaWxkTm9kZXMpO1xuICAgICAgICBjb25zdCBuYXRpdmVSZXN1bHQgPSBOYXRpdmUuTm9kZV9yZXBsYWNlQ2hpbGQuY2FsbCh0aGlzLCBub2RlVG9JbnNlcnQsIG5vZGVUb1JlbW92ZSk7XG5cbiAgICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgY2FuJ3QgYmUgY29ubmVjdGVkLCBzbyBgZGlzY29ubmVjdFRyZWVgIHdpbGwgbmV2ZXJcbiAgICAgICAgLy8gbmVlZCB0byBiZSBjYWxsZWQgb24gYSBEb2N1bWVudEZyYWdtZW50J3MgY2hpbGRyZW4gYWZ0ZXIgaW5zZXJ0aW5nIGl0LlxuXG4gICAgICAgIGlmIChVdGlsaXRpZXMuaXNDb25uZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUobm9kZVRvUmVtb3ZlKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc2VydGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShpbnNlcnRlZE5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmF0aXZlUmVzdWx0O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub2RlVG9JbnNlcnRXYXNDb25uZWN0ZWQgPSBVdGlsaXRpZXMuaXNDb25uZWN0ZWQobm9kZVRvSW5zZXJ0KTtcbiAgICAgIGNvbnN0IG5hdGl2ZVJlc3VsdCA9IE5hdGl2ZS5Ob2RlX3JlcGxhY2VDaGlsZC5jYWxsKHRoaXMsIG5vZGVUb0luc2VydCwgbm9kZVRvUmVtb3ZlKTtcbiAgICAgIGNvbnN0IHRoaXNJc0Nvbm5lY3RlZCA9IFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXNJc0Nvbm5lY3RlZCkge1xuICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUobm9kZVRvUmVtb3ZlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGVUb0luc2VydFdhc0Nvbm5lY3RlZCkge1xuICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUobm9kZVRvSW5zZXJ0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXNJc0Nvbm5lY3RlZCkge1xuICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZVRvSW5zZXJ0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5hdGl2ZVJlc3VsdDtcbiAgICB9KTtcblxuXG4gIGZ1bmN0aW9uIHBhdGNoX3RleHRDb250ZW50KGRlc3RpbmF0aW9uLCBiYXNlRGVzY3JpcHRvcikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0aW5hdGlvbiwgJ3RleHRDb250ZW50Jywge1xuICAgICAgZW51bWVyYWJsZTogYmFzZURlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogYmFzZURlc2NyaXB0b3IuZ2V0LFxuICAgICAgc2V0OiAvKiogQHRoaXMge05vZGV9ICovIGZ1bmN0aW9uKGFzc2lnbmVkVmFsdWUpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHRleHQgbm9kZSB0aGVuIHRoZXJlIGFyZSBubyBub2RlcyB0byBkaXNjb25uZWN0LlxuICAgICAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgICBiYXNlRGVzY3JpcHRvci5zZXQuY2FsbCh0aGlzLCBhc3NpZ25lZFZhbHVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBDaGVja2luZyBmb3IgYGZpcnN0Q2hpbGRgIGlzIGZhc3RlciB0aGFuIHJlYWRpbmcgYGNoaWxkTm9kZXMubGVuZ3RoYFxuICAgICAgICAvLyB0byBjb21wYXJlIHdpdGggMC5cbiAgICAgICAgaWYgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIC8vIFVzaW5nIGBjaGlsZE5vZGVzYCBpcyBmYXN0ZXIgdGhhbiBgY2hpbGRyZW5gLCBldmVuIHRob3VnaCB3ZSBvbmx5XG4gICAgICAgICAgLy8gY2FyZSBhYm91dCBlbGVtZW50cy5cbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZXNMZW5ndGggPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICBpZiAoY2hpbGROb2Rlc0xlbmd0aCA+IDAgJiYgVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICAvLyBDb3B5aW5nIGFuIGFycmF5IGJ5IGl0ZXJhdGluZyBpcyBmYXN0ZXIgdGhhbiB1c2luZyBzbGljZS5cbiAgICAgICAgICAgIHJlbW92ZWROb2RlcyA9IG5ldyBBcnJheShjaGlsZE5vZGVzTGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHJlbW92ZWROb2Rlc1tpXSA9IGNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYmFzZURlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgYXNzaWduZWRWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWROb2Rlcykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUocmVtb3ZlZE5vZGVzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAoTmF0aXZlLk5vZGVfdGV4dENvbnRlbnQgJiYgTmF0aXZlLk5vZGVfdGV4dENvbnRlbnQuZ2V0KSB7XG4gICAgcGF0Y2hfdGV4dENvbnRlbnQoTm9kZS5wcm90b3R5cGUsIE5hdGl2ZS5Ob2RlX3RleHRDb250ZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpbnRlcm5hbHMuYWRkUGF0Y2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcGF0Y2hfdGV4dENvbnRlbnQoZWxlbWVudCwge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIC8vIE5PVEU6IFRoaXMgaW1wbGVtZW50YXRpb24gb2YgdGhlIGB0ZXh0Q29udGVudGAgZ2V0dGVyIGFzc3VtZXMgdGhhdFxuICAgICAgICAvLyB0ZXh0IG5vZGVzJyBgdGV4dENvbnRlbnRgIGdldHRlciB3aWxsIG5vdCBiZSBwYXRjaGVkLlxuICAgICAgICBnZXQ6IC8qKiBAdGhpcyB7Tm9kZX0gKi8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLyoqIEB0eXBlIHshQXJyYXk8c3RyaW5nPn0gKi9cbiAgICAgICAgICBjb25zdCBwYXJ0cyA9IFtdO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2godGhpcy5jaGlsZE5vZGVzW2ldLnRleHRDb250ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogLyoqIEB0aGlzIHtOb2RlfSAqLyBmdW5jdGlvbihhc3NpZ25lZFZhbHVlKSB7XG4gICAgICAgICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgTmF0aXZlLk5vZGVfcmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCB0aGlzLmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBOYXRpdmUuTm9kZV9hcHBlbmRDaGlsZC5jYWxsKHRoaXMsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGFzc2lnbmVkVmFsdWUpKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuIiwiaW1wb3J0IEN1c3RvbUVsZW1lbnRJbnRlcm5hbHMgZnJvbSAnLi4vLi4vQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi4vLi4vVXRpbGl0aWVzLmpzJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBiZWZvcmU6ICFmdW5jdGlvbiguLi4oIU5vZGV8c3RyaW5nKSksXG4gKiAgIGFmdGVyOiAhZnVuY3Rpb24oLi4uKCFOb2RlfHN0cmluZykpLFxuICogICByZXBsYWNlV2l0aDogIWZ1bmN0aW9uKC4uLighTm9kZXxzdHJpbmcpKSxcbiAqICAgcmVtb3ZlOiAhZnVuY3Rpb24oKSxcbiAqIH19XG4gKi9cbmxldCBDaGlsZE5vZGVOYXRpdmVNZXRob2RzO1xuXG4vKipcbiAqIEBwYXJhbSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9IGludGVybmFsc1xuICogQHBhcmFtIHshT2JqZWN0fSBkZXN0aW5hdGlvblxuICogQHBhcmFtIHshQ2hpbGROb2RlTmF0aXZlTWV0aG9kc30gYnVpbHRJblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMsIGRlc3RpbmF0aW9uLCBidWlsdEluKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ2JlZm9yZSddID0gZnVuY3Rpb24oLi4ubm9kZXMpIHtcbiAgICAvLyBUT0RPOiBGaXggdGhpcyBmb3Igd2hlbiBvbmUgb2YgYG5vZGVzYCBpcyBhIERvY3VtZW50RnJhZ21lbnQhXG4gICAgY29uc3QgY29ubmVjdGVkQmVmb3JlID0gLyoqIEB0eXBlIHshQXJyYXk8IU5vZGU+fSAqLyAobm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgYXJlIG5vdCBjb25uZWN0ZWQgYW5kIHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBsaXN0LlxuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICB9KSk7XG5cbiAgICBidWlsdEluLmJlZm9yZS5hcHBseSh0aGlzLCBub2Rlcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbm5lY3RlZEJlZm9yZS5sZW5ndGg7IGkrKykge1xuICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKGNvbm5lY3RlZEJlZm9yZVtpXSk7XG4gICAgfVxuXG4gICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgIGludGVybmFscy5jb25uZWN0VHJlZShub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHsuLi4oIU5vZGV8c3RyaW5nKX0gbm9kZXNcbiAgICovXG4gIGRlc3RpbmF0aW9uWydhZnRlciddID0gZnVuY3Rpb24oLi4ubm9kZXMpIHtcbiAgICAvLyBUT0RPOiBGaXggdGhpcyBmb3Igd2hlbiBvbmUgb2YgYG5vZGVzYCBpcyBhIERvY3VtZW50RnJhZ21lbnQhXG4gICAgY29uc3QgY29ubmVjdGVkQmVmb3JlID0gLyoqIEB0eXBlIHshQXJyYXk8IU5vZGU+fSAqLyAobm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgLy8gRG9jdW1lbnRGcmFnbWVudHMgYXJlIG5vdCBjb25uZWN0ZWQgYW5kIHdpbGwgbm90IGJlIGFkZGVkIHRvIHRoZSBsaXN0LlxuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBOb2RlICYmIFV0aWxpdGllcy5pc0Nvbm5lY3RlZChub2RlKTtcbiAgICB9KSk7XG5cbiAgICBidWlsdEluLmFmdGVyLmFwcGx5KHRoaXMsIG5vZGVzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29ubmVjdGVkQmVmb3JlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnRlcm5hbHMuZGlzY29ubmVjdFRyZWUoY29ubmVjdGVkQmVmb3JlW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmNvbm5lY3RUcmVlKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gey4uLighTm9kZXxzdHJpbmcpfSBub2Rlc1xuICAgKi9cbiAgZGVzdGluYXRpb25bJ3JlcGxhY2VXaXRoJ10gPSBmdW5jdGlvbiguLi5ub2Rlcykge1xuICAgIC8vIFRPRE86IEZpeCB0aGlzIGZvciB3aGVuIG9uZSBvZiBgbm9kZXNgIGlzIGEgRG9jdW1lbnRGcmFnbWVudCFcbiAgICBjb25zdCBjb25uZWN0ZWRCZWZvcmUgPSAvKiogQHR5cGUgeyFBcnJheTwhTm9kZT59ICovIChub2Rlcy5maWx0ZXIobm9kZSA9PiB7XG4gICAgICAvLyBEb2N1bWVudEZyYWdtZW50cyBhcmUgbm90IGNvbm5lY3RlZCBhbmQgd2lsbCBub3QgYmUgYWRkZWQgdG8gdGhlIGxpc3QuXG4gICAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE5vZGUgJiYgVXRpbGl0aWVzLmlzQ29ubmVjdGVkKG5vZGUpO1xuICAgIH0pKTtcblxuICAgIGNvbnN0IHdhc0Nvbm5lY3RlZCA9IFV0aWxpdGllcy5pc0Nvbm5lY3RlZCh0aGlzKTtcblxuICAgIGJ1aWx0SW4ucmVwbGFjZVdpdGguYXBwbHkodGhpcywgbm9kZXMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25uZWN0ZWRCZWZvcmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZShjb25uZWN0ZWRCZWZvcmVbaV0pO1xuICAgIH1cblxuICAgIGlmICh3YXNDb25uZWN0ZWQpIHtcbiAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZSh0aGlzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICBpbnRlcm5hbHMuY29ubmVjdFRyZWUobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZGVzdGluYXRpb25bJ3JlbW92ZSddID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgd2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKHRoaXMpO1xuXG4gICAgYnVpbHRJbi5yZW1vdmUuY2FsbCh0aGlzKTtcblxuICAgIGlmICh3YXNDb25uZWN0ZWQpIHtcbiAgICAgIGludGVybmFscy5kaXNjb25uZWN0VHJlZSh0aGlzKTtcbiAgICB9XG4gIH07XG59O1xuIiwiaW1wb3J0IE5hdGl2ZSBmcm9tICcuL05hdGl2ZS5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudEludGVybmFscyBmcm9tICcuLi9DdXN0b21FbGVtZW50SW50ZXJuYWxzLmpzJztcbmltcG9ydCBDRVN0YXRlIGZyb20gJy4uL0N1c3RvbUVsZW1lbnRTdGF0ZS5qcyc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi4vVXRpbGl0aWVzLmpzJztcblxuaW1wb3J0IFBhdGNoUGFyZW50Tm9kZSBmcm9tICcuL0ludGVyZmFjZS9QYXJlbnROb2RlLmpzJztcbmltcG9ydCBQYXRjaENoaWxkTm9kZSBmcm9tICcuL0ludGVyZmFjZS9DaGlsZE5vZGUuanMnO1xuXG4vKipcbiAqIEBwYXJhbSB7IUN1c3RvbUVsZW1lbnRJbnRlcm5hbHN9IGludGVybmFsc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnRlcm5hbHMpIHtcbiAgaWYgKE5hdGl2ZS5FbGVtZW50X2F0dGFjaFNoYWRvdykge1xuICAgIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChFbGVtZW50LnByb3RvdHlwZSwgJ2F0dGFjaFNoYWRvdycsXG4gICAgICAvKipcbiAgICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAgICogQHBhcmFtIHshe21vZGU6IHN0cmluZ319IGluaXRcbiAgICAgICAqIEByZXR1cm4ge1NoYWRvd1Jvb3R9XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uKGluaXQpIHtcbiAgICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IE5hdGl2ZS5FbGVtZW50X2F0dGFjaFNoYWRvdy5jYWxsKHRoaXMsIGluaXQpO1xuICAgICAgICB0aGlzLl9fQ0Vfc2hhZG93Um9vdCA9IHNoYWRvd1Jvb3Q7XG4gICAgICAgIHJldHVybiBzaGFkb3dSb290O1xuICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS53YXJuKCdDdXN0b20gRWxlbWVudHM6IGBFbGVtZW50I2F0dGFjaFNoYWRvd2Agd2FzIG5vdCBwYXRjaGVkLicpO1xuICB9XG5cblxuICBmdW5jdGlvbiBwYXRjaF9pbm5lckhUTUwoZGVzdGluYXRpb24sIGJhc2VEZXNjcmlwdG9yKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRlc3RpbmF0aW9uLCAnaW5uZXJIVE1MJywge1xuICAgICAgZW51bWVyYWJsZTogYmFzZURlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogYmFzZURlc2NyaXB0b3IuZ2V0LFxuICAgICAgc2V0OiAvKiogQHRoaXMge0VsZW1lbnR9ICovIGZ1bmN0aW9uKGh0bWxTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaXNDb25uZWN0ZWQgPSBVdGlsaXRpZXMuaXNDb25uZWN0ZWQodGhpcyk7XG5cbiAgICAgICAgLy8gTk9URTogSW4gSUUxMSwgd2hlbiB1c2luZyB0aGUgbmF0aXZlIGBpbm5lckhUTUxgIHNldHRlciwgYWxsIG5vZGVzXG4gICAgICAgIC8vIHRoYXQgd2VyZSBwcmV2aW91c2x5IGRlc2NlbmRhbnRzIG9mIHRoZSBjb250ZXh0IGVsZW1lbnQgaGF2ZSBhbGwgb2ZcbiAgICAgICAgLy8gdGhlaXIgY2hpbGRyZW4gcmVtb3ZlZCBhcyBwYXJ0IG9mIHRoZSBzZXQgLSB0aGUgZW50aXJlIHN1YnRyZWUgaXNcbiAgICAgICAgLy8gJ2Rpc2Fzc2VtYmxlZCcuIFRoaXMgd29yayBhcm91bmQgd2Fsa3MgdGhlIHN1YnRyZWUgKmJlZm9yZSogdXNpbmcgdGhlXG4gICAgICAgIC8vIG5hdGl2ZSBzZXR0ZXIuXG4gICAgICAgIC8qKiBAdHlwZSB7IUFycmF5PCFFbGVtZW50Pnx1bmRlZmluZWR9ICovXG4gICAgICAgIGxldCByZW1vdmVkRWxlbWVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgIHJlbW92ZWRFbGVtZW50cyA9IFtdO1xuICAgICAgICAgIFV0aWxpdGllcy53YWxrRGVlcERlc2NlbmRhbnRFbGVtZW50cyh0aGlzLCBlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIHJlbW92ZWRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFzZURlc2NyaXB0b3Iuc2V0LmNhbGwodGhpcywgaHRtbFN0cmluZyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWRFbGVtZW50cykge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlZEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcmVtb3ZlZEVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuX19DRV9zdGF0ZSA9PT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RlZENhbGxiYWNrKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE9ubHkgY3JlYXRlIGN1c3RvbSBlbGVtZW50cyBpZiB0aGlzIGVsZW1lbnQncyBvd25lciBkb2N1bWVudCBpc1xuICAgICAgICAvLyBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICAgICAgICBpZiAoIXRoaXMub3duZXJEb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5KSB7XG4gICAgICAgICAgaW50ZXJuYWxzLnBhdGNoVHJlZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnRlcm5hbHMucGF0Y2hBbmRVcGdyYWRlVHJlZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaHRtbFN0cmluZztcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBpZiAoTmF0aXZlLkVsZW1lbnRfaW5uZXJIVE1MICYmIE5hdGl2ZS5FbGVtZW50X2lubmVySFRNTC5nZXQpIHtcbiAgICBwYXRjaF9pbm5lckhUTUwoRWxlbWVudC5wcm90b3R5cGUsIE5hdGl2ZS5FbGVtZW50X2lubmVySFRNTCk7XG4gIH0gZWxzZSBpZiAoTmF0aXZlLkhUTUxFbGVtZW50X2lubmVySFRNTCAmJiBOYXRpdmUuSFRNTEVsZW1lbnRfaW5uZXJIVE1MLmdldCkge1xuICAgIHBhdGNoX2lubmVySFRNTChIVE1MRWxlbWVudC5wcm90b3R5cGUsIE5hdGl2ZS5IVE1MRWxlbWVudF9pbm5lckhUTUwpO1xuICB9IGVsc2Uge1xuXG4gICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cbiAgICBjb25zdCByYXdEaXYgPSBOYXRpdmUuRG9jdW1lbnRfY3JlYXRlRWxlbWVudC5jYWxsKGRvY3VtZW50LCAnZGl2Jyk7XG5cbiAgICBpbnRlcm5hbHMuYWRkUGF0Y2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgcGF0Y2hfaW5uZXJIVE1MKGVsZW1lbnQsIHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAvLyBJbXBsZW1lbnRzIGdldHRpbmcgYGlubmVySFRNTGAgYnkgcGVyZm9ybWluZyBhbiB1bnBhdGNoZWQgYGNsb25lTm9kZWBcbiAgICAgICAgLy8gb2YgdGhlIGVsZW1lbnQgYW5kIHJldHVybmluZyB0aGUgcmVzdWx0aW5nIGVsZW1lbnQncyBgaW5uZXJIVE1MYC5cbiAgICAgICAgLy8gVE9ETzogSXMgdGhpcyB0b28gZXhwZW5zaXZlP1xuICAgICAgICBnZXQ6IC8qKiBAdGhpcyB7RWxlbWVudH0gKi8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIE5hdGl2ZS5Ob2RlX2Nsb25lTm9kZS5jYWxsKHRoaXMsIHRydWUpLmlubmVySFRNTDtcbiAgICAgICAgfSxcbiAgICAgICAgLy8gSW1wbGVtZW50cyBzZXR0aW5nIGBpbm5lckhUTUxgIGJ5IGNyZWF0aW5nIGFuIHVucGF0Y2hlZCBlbGVtZW50LFxuICAgICAgICAvLyBzZXR0aW5nIGBpbm5lckhUTUxgIG9mIHRoYXQgZWxlbWVudCBhbmQgcmVwbGFjaW5nIHRoZSB0YXJnZXRcbiAgICAgICAgLy8gZWxlbWVudCdzIGNoaWxkcmVuIHdpdGggdGhvc2Ugb2YgdGhlIHVucGF0Y2hlZCBlbGVtZW50LlxuICAgICAgICBzZXQ6IC8qKiBAdGhpcyB7RWxlbWVudH0gKi8gZnVuY3Rpb24oYXNzaWduZWRWYWx1ZSkge1xuICAgICAgICAgIC8vIE5PVEU6IHJlLXJvdXRlIHRvIGBjb250ZW50YCBmb3IgYHRlbXBsYXRlYCBlbGVtZW50cy5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGRvIHRoaXMgYmVjYXVzZSBgdGVtcGxhdGUuYXBwZW5kQ2hpbGRgIGRvZXMgbm90XG4gICAgICAgICAgLy8gcm91dGUgaW50byBgdGVtcGxhdGUuY29udGVudGAuXG4gICAgICAgICAgLyoqIEB0eXBlIHshTm9kZX0gKi9cbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5sb2NhbE5hbWUgPT09ICd0ZW1wbGF0ZScgPyAoLyoqIEB0eXBlIHshSFRNTFRlbXBsYXRlRWxlbWVudH0gKi8gKHRoaXMpKS5jb250ZW50IDogdGhpcztcbiAgICAgICAgICByYXdEaXYuaW5uZXJIVE1MID0gYXNzaWduZWRWYWx1ZTtcblxuICAgICAgICAgIHdoaWxlIChjb250ZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgTmF0aXZlLk5vZGVfcmVtb3ZlQ2hpbGQuY2FsbChjb250ZW50LCBjb250ZW50LmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAocmF3RGl2LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgTmF0aXZlLk5vZGVfYXBwZW5kQ2hpbGQuY2FsbChjb250ZW50LCByYXdEaXYuY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChFbGVtZW50LnByb3RvdHlwZSwgJ3NldEF0dHJpYnV0ZScsXG4gICAgLyoqXG4gICAgICogQHRoaXMge0VsZW1lbnR9XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbihuYW1lLCBuZXdWYWx1ZSkge1xuICAgICAgLy8gRmFzdCBwYXRoIGZvciBub24tY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgaWYgKHRoaXMuX19DRV9zdGF0ZSAhPT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZS5FbGVtZW50X3NldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBOYXRpdmUuRWxlbWVudF9nZXRBdHRyaWJ1dGUuY2FsbCh0aGlzLCBuYW1lKTtcbiAgICAgIE5hdGl2ZS5FbGVtZW50X3NldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIG5ld1ZhbHVlID0gTmF0aXZlLkVsZW1lbnRfZ2V0QXR0cmlidXRlLmNhbGwodGhpcywgbmFtZSk7XG4gICAgICBpbnRlcm5hbHMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbnVsbCk7XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKEVsZW1lbnQucHJvdG90eXBlLCAnc2V0QXR0cmlidXRlTlMnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gbmFtZXNwYWNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3VmFsdWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbihuYW1lc3BhY2UsIG5hbWUsIG5ld1ZhbHVlKSB7XG4gICAgICAvLyBGYXN0IHBhdGggZm9yIG5vbi1jdXN0b20gZWxlbWVudHMuXG4gICAgICBpZiAodGhpcy5fX0NFX3N0YXRlICE9PSBDRVN0YXRlLmN1c3RvbSkge1xuICAgICAgICByZXR1cm4gTmF0aXZlLkVsZW1lbnRfc2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUsIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBOYXRpdmUuRWxlbWVudF9nZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICBOYXRpdmUuRWxlbWVudF9zZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSwgbmV3VmFsdWUpO1xuICAgICAgbmV3VmFsdWUgPSBOYXRpdmUuRWxlbWVudF9nZXRBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICBpbnRlcm5hbHMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgICB9KTtcblxuICBVdGlsaXRpZXMuc2V0UHJvcGVydHlVbmNoZWNrZWQoRWxlbWVudC5wcm90b3R5cGUsICdyZW1vdmVBdHRyaWJ1dGUnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24obmFtZSkge1xuICAgICAgLy8gRmFzdCBwYXRoIGZvciBub24tY3VzdG9tIGVsZW1lbnRzLlxuICAgICAgaWYgKHRoaXMuX19DRV9zdGF0ZSAhPT0gQ0VTdGF0ZS5jdXN0b20pIHtcbiAgICAgICAgcmV0dXJuIE5hdGl2ZS5FbGVtZW50X3JlbW92ZUF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IE5hdGl2ZS5FbGVtZW50X2dldEF0dHJpYnV0ZS5jYWxsKHRoaXMsIG5hbWUpO1xuICAgICAgTmF0aXZlLkVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlLmNhbGwodGhpcywgbmFtZSk7XG4gICAgICBpZiAob2xkVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgaW50ZXJuYWxzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayh0aGlzLCBuYW1lLCBvbGRWYWx1ZSwgbnVsbCwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgVXRpbGl0aWVzLnNldFByb3BlcnR5VW5jaGVja2VkKEVsZW1lbnQucHJvdG90eXBlLCAncmVtb3ZlQXR0cmlidXRlTlMnLFxuICAgIC8qKlxuICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gbmFtZXNwYWNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbihuYW1lc3BhY2UsIG5hbWUpIHtcbiAgICAgIC8vIEZhc3QgcGF0aCBmb3Igbm9uLWN1c3RvbSBlbGVtZW50cy5cbiAgICAgIGlmICh0aGlzLl9fQ0Vfc3RhdGUgIT09IENFU3RhdGUuY3VzdG9tKSB7XG4gICAgICAgIHJldHVybiBOYXRpdmUuRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGVOUy5jYWxsKHRoaXMsIG5hbWVzcGFjZSwgbmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gTmF0aXZlLkVsZW1lbnRfZ2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgICAgTmF0aXZlLkVsZW1lbnRfcmVtb3ZlQXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgICAgLy8gSW4gb2xkZXIgYnJvd3NlcnMsIGBFbGVtZW50I2dldEF0dHJpYnV0ZU5TYCBtYXkgcmV0dXJuIHRoZSBlbXB0eSBzdHJpbmdcbiAgICAgIC8vIGluc3RlYWQgb2YgbnVsbCBpZiB0aGUgYXR0cmlidXRlIGRvZXMgbm90IGV4aXN0LiBGb3IgZGV0YWlscywgc2VlO1xuICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvZ2V0QXR0cmlidXRlTlMjTm90ZXNcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gTmF0aXZlLkVsZW1lbnRfZ2V0QXR0cmlidXRlTlMuY2FsbCh0aGlzLCBuYW1lc3BhY2UsIG5hbWUpO1xuICAgICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBpbnRlcm5hbHMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKHRoaXMsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gIGZ1bmN0aW9uIHBhdGNoX2luc2VydEFkamFjZW50RWxlbWVudChkZXN0aW5hdGlvbiwgYmFzZU1ldGhvZCkge1xuICAgIFV0aWxpdGllcy5zZXRQcm9wZXJ0eVVuY2hlY2tlZChkZXN0aW5hdGlvbiwgJ2luc2VydEFkamFjZW50RWxlbWVudCcsXG4gICAgICAvKipcbiAgICAgICAqIEB0aGlzIHtFbGVtZW50fVxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHdoZXJlXG4gICAgICAgKiBAcGFyYW0geyFFbGVtZW50fSBlbGVtZW50XG4gICAgICAgKiBAcmV0dXJuIHs/RWxlbWVudH1cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24od2hlcmUsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgd2FzQ29ubmVjdGVkID0gVXRpbGl0aWVzLmlzQ29ubmVjdGVkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpbnNlcnRlZEVsZW1lbnQgPSAvKiogQHR5cGUgeyFFbGVtZW50fSAqL1xuICAgICAgICAgIChiYXNlTWV0aG9kLmNhbGwodGhpcywgd2hlcmUsIGVsZW1lbnQpKTtcblxuICAgICAgICBpZiAod2FzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmRpc2Nvbm5lY3RUcmVlKGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWxpdGllcy5pc0Nvbm5lY3RlZChpbnNlcnRlZEVsZW1lbnQpKSB7XG4gICAgICAgICAgaW50ZXJuYWxzLmNvbm5lY3RUcmVlKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnNlcnRlZEVsZW1lbnQ7XG4gICAgICB9KTtcbiAgfVxuXG4gIGlmIChOYXRpdmUuSFRNTEVsZW1lbnRfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KSB7XG4gICAgcGF0Y2hfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KEhUTUxFbGVtZW50LnByb3RvdHlwZSwgTmF0aXZlLkhUTUxFbGVtZW50X2luc2VydEFkamFjZW50RWxlbWVudCk7XG4gIH0gZWxzZSBpZiAoTmF0aXZlLkVsZW1lbnRfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KSB7XG4gICAgcGF0Y2hfaW5zZXJ0QWRqYWNlbnRFbGVtZW50KEVsZW1lbnQucHJvdG90eXBlLCBOYXRpdmUuRWxlbWVudF9pbnNlcnRBZGphY2VudEVsZW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybignQ3VzdG9tIEVsZW1lbnRzOiBgRWxlbWVudCNpbnNlcnRBZGphY2VudEVsZW1lbnRgIHdhcyBub3QgcGF0Y2hlZC4nKTtcbiAgfVxuXG5cbiAgUGF0Y2hQYXJlbnROb2RlKGludGVybmFscywgRWxlbWVudC5wcm90b3R5cGUsIHtcbiAgICBwcmVwZW5kOiBOYXRpdmUuRWxlbWVudF9wcmVwZW5kLFxuICAgIGFwcGVuZDogTmF0aXZlLkVsZW1lbnRfYXBwZW5kLFxuICB9KTtcblxuICBQYXRjaENoaWxkTm9kZShpbnRlcm5hbHMsIEVsZW1lbnQucHJvdG90eXBlLCB7XG4gICAgYmVmb3JlOiBOYXRpdmUuRWxlbWVudF9iZWZvcmUsXG4gICAgYWZ0ZXI6IE5hdGl2ZS5FbGVtZW50X2FmdGVyLFxuICAgIHJlcGxhY2VXaXRoOiBOYXRpdmUuRWxlbWVudF9yZXBsYWNlV2l0aCxcbiAgICByZW1vdmU6IE5hdGl2ZS5FbGVtZW50X3JlbW92ZSxcbiAgfSk7XG59O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG5cbmltcG9ydCBDdXN0b21FbGVtZW50SW50ZXJuYWxzIGZyb20gJy4vQ3VzdG9tRWxlbWVudEludGVybmFscy5qcyc7XG5pbXBvcnQgQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5IGZyb20gJy4vQ3VzdG9tRWxlbWVudFJlZ2lzdHJ5LmpzJztcblxuaW1wb3J0IFBhdGNoSFRNTEVsZW1lbnQgZnJvbSAnLi9QYXRjaC9IVE1MRWxlbWVudC5qcyc7XG5pbXBvcnQgUGF0Y2hEb2N1bWVudCBmcm9tICcuL1BhdGNoL0RvY3VtZW50LmpzJztcbmltcG9ydCBQYXRjaE5vZGUgZnJvbSAnLi9QYXRjaC9Ob2RlLmpzJztcbmltcG9ydCBQYXRjaEVsZW1lbnQgZnJvbSAnLi9QYXRjaC9FbGVtZW50LmpzJztcblxuY29uc3QgcHJpb3JDdXN0b21FbGVtZW50cyA9IHdpbmRvd1snY3VzdG9tRWxlbWVudHMnXTtcblxuaWYgKCFwcmlvckN1c3RvbUVsZW1lbnRzIHx8XG4gICAgIHByaW9yQ3VzdG9tRWxlbWVudHNbJ2ZvcmNlUG9seWZpbGwnXSB8fFxuICAgICAodHlwZW9mIHByaW9yQ3VzdG9tRWxlbWVudHNbJ2RlZmluZSddICE9ICdmdW5jdGlvbicpIHx8XG4gICAgICh0eXBlb2YgcHJpb3JDdXN0b21FbGVtZW50c1snZ2V0J10gIT0gJ2Z1bmN0aW9uJykpIHtcbiAgLyoqIEB0eXBlIHshQ3VzdG9tRWxlbWVudEludGVybmFsc30gKi9cbiAgY29uc3QgaW50ZXJuYWxzID0gbmV3IEN1c3RvbUVsZW1lbnRJbnRlcm5hbHMoKTtcblxuICBQYXRjaEhUTUxFbGVtZW50KGludGVybmFscyk7XG4gIFBhdGNoRG9jdW1lbnQoaW50ZXJuYWxzKTtcbiAgUGF0Y2hOb2RlKGludGVybmFscyk7XG4gIFBhdGNoRWxlbWVudChpbnRlcm5hbHMpO1xuXG4gIC8vIFRoZSBtYWluIGRvY3VtZW50IGlzIGFsd2F5cyBhc3NvY2lhdGVkIHdpdGggdGhlIHJlZ2lzdHJ5LlxuICBkb2N1bWVudC5fX0NFX2hhc1JlZ2lzdHJ5ID0gdHJ1ZTtcblxuICAvKiogQHR5cGUgeyFDdXN0b21FbGVtZW50UmVnaXN0cnl9ICovXG4gIGNvbnN0IGN1c3RvbUVsZW1lbnRzID0gbmV3IEN1c3RvbUVsZW1lbnRSZWdpc3RyeShpbnRlcm5hbHMpO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csICdjdXN0b21FbGVtZW50cycsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY3VzdG9tRWxlbWVudHMsXG4gIH0pO1xufVxuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE0IFRoZSBQb2x5bWVyIFByb2plY3QgQXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFRoaXMgY29kZSBtYXkgb25seSBiZSB1c2VkIHVuZGVyIHRoZSBCU0Qgc3R5bGUgbGljZW5zZSBmb3VuZCBhdCBodHRwOi8vcG9seW1lci5naXRodWIuaW8vTElDRU5TRS50eHRcbiAqIFRoZSBjb21wbGV0ZSBzZXQgb2YgYXV0aG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0FVVEhPUlMudHh0XG4gKiBUaGUgY29tcGxldGUgc2V0IG9mIGNvbnRyaWJ1dG9ycyBtYXkgYmUgZm91bmQgYXQgaHR0cDovL3BvbHltZXIuZ2l0aHViLmlvL0NPTlRSSUJVVE9SUy50eHRcbiAqIENvZGUgZGlzdHJpYnV0ZWQgYnkgR29vZ2xlIGFzIHBhcnQgb2YgdGhlIHBvbHltZXIgcHJvamVjdCBpcyBhbHNvXG4gKiBzdWJqZWN0IHRvIGFuIGFkZGl0aW9uYWwgSVAgcmlnaHRzIGdyYW50IGZvdW5kIGF0IGh0dHA6Ly9wb2x5bWVyLmdpdGh1Yi5pby9QQVRFTlRTLnR4dFxuICovXG4vLyBAdmVyc2lvbiAwLjcuMjJcbmlmICh0eXBlb2YgV2Vha01hcCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgIHZhciBjb3VudGVyID0gRGF0ZS5ub3coKSAlIDFlOTtcbiAgICB2YXIgV2Vha01hcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5uYW1lID0gXCJfX3N0XCIgKyAoTWF0aC5yYW5kb20oKSAqIDFlOSA+Pj4gMCkgKyAoY291bnRlcisrICsgXCJfX1wiKTtcbiAgICB9O1xuICAgIFdlYWtNYXAucHJvdG90eXBlID0ge1xuICAgICAgc2V0OiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGtleVt0aGlzLm5hbWVdO1xuICAgICAgICBpZiAoZW50cnkgJiYgZW50cnlbMF0gPT09IGtleSkgZW50cnlbMV0gPSB2YWx1ZTsgZWxzZSBkZWZpbmVQcm9wZXJ0eShrZXksIHRoaXMubmFtZSwge1xuICAgICAgICAgIHZhbHVlOiBbIGtleSwgdmFsdWUgXSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgdmFyIGVudHJ5O1xuICAgICAgICByZXR1cm4gKGVudHJ5ID0ga2V5W3RoaXMubmFtZV0pICYmIGVudHJ5WzBdID09PSBrZXkgPyBlbnRyeVsxXSA6IHVuZGVmaW5lZDtcbiAgICAgIH0sXG4gICAgICBcImRlbGV0ZVwiOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0ga2V5W3RoaXMubmFtZV07XG4gICAgICAgIGlmICghZW50cnkgfHwgZW50cnlbMF0gIT09IGtleSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbnRyeVswXSA9IGVudHJ5WzFdID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICB2YXIgZW50cnkgPSBrZXlbdGhpcy5uYW1lXTtcbiAgICAgICAgaWYgKCFlbnRyeSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gZW50cnlbMF0gPT09IGtleTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5XZWFrTWFwID0gV2Vha01hcDtcbiAgfSkoKTtcbn1cblxuKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBpZiAoZ2xvYmFsLkpzTXV0YXRpb25PYnNlcnZlcikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcmVnaXN0cmF0aW9uc1RhYmxlID0gbmV3IFdlYWtNYXAoKTtcbiAgdmFyIHNldEltbWVkaWF0ZTtcbiAgaWYgKC9UcmlkZW50fEVkZ2UvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICBzZXRJbW1lZGlhdGUgPSBzZXRUaW1lb3V0O1xuICB9IGVsc2UgaWYgKHdpbmRvdy5zZXRJbW1lZGlhdGUpIHtcbiAgICBzZXRJbW1lZGlhdGUgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICB9IGVsc2Uge1xuICAgIHZhciBzZXRJbW1lZGlhdGVRdWV1ZSA9IFtdO1xuICAgIHZhciBzZW50aW5lbCA9IFN0cmluZyhNYXRoLnJhbmRvbSgpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUuZGF0YSA9PT0gc2VudGluZWwpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gc2V0SW1tZWRpYXRlUXVldWU7XG4gICAgICAgIHNldEltbWVkaWF0ZVF1ZXVlID0gW107XG4gICAgICAgIHF1ZXVlLmZvckVhY2goZnVuY3Rpb24oZnVuYykge1xuICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24oZnVuYykge1xuICAgICAgc2V0SW1tZWRpYXRlUXVldWUucHVzaChmdW5jKTtcbiAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZShzZW50aW5lbCwgXCIqXCIpO1xuICAgIH07XG4gIH1cbiAgdmFyIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gIHZhciBzY2hlZHVsZWRPYnNlcnZlcnMgPSBbXTtcbiAgZnVuY3Rpb24gc2NoZWR1bGVDYWxsYmFjayhvYnNlcnZlcikge1xuICAgIHNjaGVkdWxlZE9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICBpZiAoIWlzU2NoZWR1bGVkKSB7XG4gICAgICBpc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICBzZXRJbW1lZGlhdGUoZGlzcGF0Y2hDYWxsYmFja3MpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB3cmFwSWZOZWVkZWQobm9kZSkge1xuICAgIHJldHVybiB3aW5kb3cuU2hhZG93RE9NUG9seWZpbGwgJiYgd2luZG93LlNoYWRvd0RPTVBvbHlmaWxsLndyYXBJZk5lZWRlZChub2RlKSB8fCBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIGRpc3BhdGNoQ2FsbGJhY2tzKCkge1xuICAgIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgdmFyIG9ic2VydmVycyA9IHNjaGVkdWxlZE9ic2VydmVycztcbiAgICBzY2hlZHVsZWRPYnNlcnZlcnMgPSBbXTtcbiAgICBvYnNlcnZlcnMuc29ydChmdW5jdGlvbihvMSwgbzIpIHtcbiAgICAgIHJldHVybiBvMS51aWRfIC0gbzIudWlkXztcbiAgICB9KTtcbiAgICB2YXIgYW55Tm9uRW1wdHkgPSBmYWxzZTtcbiAgICBvYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbihvYnNlcnZlcikge1xuICAgICAgdmFyIHF1ZXVlID0gb2JzZXJ2ZXIudGFrZVJlY29yZHMoKTtcbiAgICAgIHJlbW92ZVRyYW5zaWVudE9ic2VydmVyc0ZvcihvYnNlcnZlcik7XG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIG9ic2VydmVyLmNhbGxiYWNrXyhxdWV1ZSwgb2JzZXJ2ZXIpO1xuICAgICAgICBhbnlOb25FbXB0eSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGFueU5vbkVtcHR5KSBkaXNwYXRjaENhbGxiYWNrcygpO1xuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZVRyYW5zaWVudE9ic2VydmVyc0ZvcihvYnNlcnZlcikge1xuICAgIG9ic2VydmVyLm5vZGVzXy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciByZWdpc3RyYXRpb25zID0gcmVnaXN0cmF0aW9uc1RhYmxlLmdldChub2RlKTtcbiAgICAgIGlmICghcmVnaXN0cmF0aW9ucykgcmV0dXJuO1xuICAgICAgcmVnaXN0cmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlZ2lzdHJhdGlvbikge1xuICAgICAgICBpZiAocmVnaXN0cmF0aW9uLm9ic2VydmVyID09PSBvYnNlcnZlcikgcmVnaXN0cmF0aW9uLnJlbW92ZVRyYW5zaWVudE9ic2VydmVycygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZm9yRWFjaEFuY2VzdG9yQW5kT2JzZXJ2ZXJFbnF1ZXVlUmVjb3JkKHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBub2RlID0gdGFyZ2V0OyBub2RlOyBub2RlID0gbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICB2YXIgcmVnaXN0cmF0aW9ucyA9IHJlZ2lzdHJhdGlvbnNUYWJsZS5nZXQobm9kZSk7XG4gICAgICBpZiAocmVnaXN0cmF0aW9ucykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlZ2lzdHJhdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmVnaXN0cmF0aW9uID0gcmVnaXN0cmF0aW9uc1tqXTtcbiAgICAgICAgICB2YXIgb3B0aW9ucyA9IHJlZ2lzdHJhdGlvbi5vcHRpb25zO1xuICAgICAgICAgIGlmIChub2RlICE9PSB0YXJnZXQgJiYgIW9wdGlvbnMuc3VidHJlZSkgY29udGludWU7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGNhbGxiYWNrKG9wdGlvbnMpO1xuICAgICAgICAgIGlmIChyZWNvcmQpIHJlZ2lzdHJhdGlvbi5lbnF1ZXVlKHJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIHVpZENvdW50ZXIgPSAwO1xuICBmdW5jdGlvbiBKc011dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLmNhbGxiYWNrXyA9IGNhbGxiYWNrO1xuICAgIHRoaXMubm9kZXNfID0gW107XG4gICAgdGhpcy5yZWNvcmRzXyA9IFtdO1xuICAgIHRoaXMudWlkXyA9ICsrdWlkQ291bnRlcjtcbiAgfVxuICBKc011dGF0aW9uT2JzZXJ2ZXIucHJvdG90eXBlID0ge1xuICAgIG9ic2VydmU6IGZ1bmN0aW9uKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgdGFyZ2V0ID0gd3JhcElmTmVlZGVkKHRhcmdldCk7XG4gICAgICBpZiAoIW9wdGlvbnMuY2hpbGRMaXN0ICYmICFvcHRpb25zLmF0dHJpYnV0ZXMgJiYgIW9wdGlvbnMuY2hhcmFjdGVyRGF0YSB8fCBvcHRpb25zLmF0dHJpYnV0ZU9sZFZhbHVlICYmICFvcHRpb25zLmF0dHJpYnV0ZXMgfHwgb3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIgJiYgb3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIubGVuZ3RoICYmICFvcHRpb25zLmF0dHJpYnV0ZXMgfHwgb3B0aW9ucy5jaGFyYWN0ZXJEYXRhT2xkVmFsdWUgJiYgIW9wdGlvbnMuY2hhcmFjdGVyRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIHZhciByZWdpc3RyYXRpb25zID0gcmVnaXN0cmF0aW9uc1RhYmxlLmdldCh0YXJnZXQpO1xuICAgICAgaWYgKCFyZWdpc3RyYXRpb25zKSByZWdpc3RyYXRpb25zVGFibGUuc2V0KHRhcmdldCwgcmVnaXN0cmF0aW9ucyA9IFtdKTtcbiAgICAgIHZhciByZWdpc3RyYXRpb247XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdHJhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbnNbaV0ub2JzZXJ2ZXIgPT09IHRoaXMpIHtcbiAgICAgICAgICByZWdpc3RyYXRpb24gPSByZWdpc3RyYXRpb25zW2ldO1xuICAgICAgICAgIHJlZ2lzdHJhdGlvbi5yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgICAgICByZWdpc3RyYXRpb24ub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghcmVnaXN0cmF0aW9uKSB7XG4gICAgICAgIHJlZ2lzdHJhdGlvbiA9IG5ldyBSZWdpc3RyYXRpb24odGhpcywgdGFyZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgcmVnaXN0cmF0aW9ucy5wdXNoKHJlZ2lzdHJhdGlvbik7XG4gICAgICAgIHRoaXMubm9kZXNfLnB1c2godGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJlZ2lzdHJhdGlvbi5hZGRMaXN0ZW5lcnMoKTtcbiAgICB9LFxuICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5ub2Rlc18uZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHZhciByZWdpc3RyYXRpb25zID0gcmVnaXN0cmF0aW9uc1RhYmxlLmdldChub2RlKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RyYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHJlZ2lzdHJhdGlvbiA9IHJlZ2lzdHJhdGlvbnNbaV07XG4gICAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbi5vYnNlcnZlciA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmVnaXN0cmF0aW9uLnJlbW92ZUxpc3RlbmVycygpO1xuICAgICAgICAgICAgcmVnaXN0cmF0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgICAgdGhpcy5yZWNvcmRzXyA9IFtdO1xuICAgIH0sXG4gICAgdGFrZVJlY29yZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvcHlPZlJlY29yZHMgPSB0aGlzLnJlY29yZHNfO1xuICAgICAgdGhpcy5yZWNvcmRzXyA9IFtdO1xuICAgICAgcmV0dXJuIGNvcHlPZlJlY29yZHM7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBNdXRhdGlvblJlY29yZCh0eXBlLCB0YXJnZXQpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuYWRkZWROb2RlcyA9IFtdO1xuICAgIHRoaXMucmVtb3ZlZE5vZGVzID0gW107XG4gICAgdGhpcy5wcmV2aW91c1NpYmxpbmcgPSBudWxsO1xuICAgIHRoaXMubmV4dFNpYmxpbmcgPSBudWxsO1xuICAgIHRoaXMuYXR0cmlidXRlTmFtZSA9IG51bGw7XG4gICAgdGhpcy5hdHRyaWJ1dGVOYW1lc3BhY2UgPSBudWxsO1xuICAgIHRoaXMub2xkVmFsdWUgPSBudWxsO1xuICB9XG4gIGZ1bmN0aW9uIGNvcHlNdXRhdGlvblJlY29yZChvcmlnaW5hbCkge1xuICAgIHZhciByZWNvcmQgPSBuZXcgTXV0YXRpb25SZWNvcmQob3JpZ2luYWwudHlwZSwgb3JpZ2luYWwudGFyZ2V0KTtcbiAgICByZWNvcmQuYWRkZWROb2RlcyA9IG9yaWdpbmFsLmFkZGVkTm9kZXMuc2xpY2UoKTtcbiAgICByZWNvcmQucmVtb3ZlZE5vZGVzID0gb3JpZ2luYWwucmVtb3ZlZE5vZGVzLnNsaWNlKCk7XG4gICAgcmVjb3JkLnByZXZpb3VzU2libGluZyA9IG9yaWdpbmFsLnByZXZpb3VzU2libGluZztcbiAgICByZWNvcmQubmV4dFNpYmxpbmcgPSBvcmlnaW5hbC5uZXh0U2libGluZztcbiAgICByZWNvcmQuYXR0cmlidXRlTmFtZSA9IG9yaWdpbmFsLmF0dHJpYnV0ZU5hbWU7XG4gICAgcmVjb3JkLmF0dHJpYnV0ZU5hbWVzcGFjZSA9IG9yaWdpbmFsLmF0dHJpYnV0ZU5hbWVzcGFjZTtcbiAgICByZWNvcmQub2xkVmFsdWUgPSBvcmlnaW5hbC5vbGRWYWx1ZTtcbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG4gIHZhciBjdXJyZW50UmVjb3JkLCByZWNvcmRXaXRoT2xkVmFsdWU7XG4gIGZ1bmN0aW9uIGdldFJlY29yZCh0eXBlLCB0YXJnZXQpIHtcbiAgICByZXR1cm4gY3VycmVudFJlY29yZCA9IG5ldyBNdXRhdGlvblJlY29yZCh0eXBlLCB0YXJnZXQpO1xuICB9XG4gIGZ1bmN0aW9uIGdldFJlY29yZFdpdGhPbGRWYWx1ZShvbGRWYWx1ZSkge1xuICAgIGlmIChyZWNvcmRXaXRoT2xkVmFsdWUpIHJldHVybiByZWNvcmRXaXRoT2xkVmFsdWU7XG4gICAgcmVjb3JkV2l0aE9sZFZhbHVlID0gY29weU11dGF0aW9uUmVjb3JkKGN1cnJlbnRSZWNvcmQpO1xuICAgIHJlY29yZFdpdGhPbGRWYWx1ZS5vbGRWYWx1ZSA9IG9sZFZhbHVlO1xuICAgIHJldHVybiByZWNvcmRXaXRoT2xkVmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gY2xlYXJSZWNvcmRzKCkge1xuICAgIGN1cnJlbnRSZWNvcmQgPSByZWNvcmRXaXRoT2xkVmFsdWUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgZnVuY3Rpb24gcmVjb3JkUmVwcmVzZW50c0N1cnJlbnRNdXRhdGlvbihyZWNvcmQpIHtcbiAgICByZXR1cm4gcmVjb3JkID09PSByZWNvcmRXaXRoT2xkVmFsdWUgfHwgcmVjb3JkID09PSBjdXJyZW50UmVjb3JkO1xuICB9XG4gIGZ1bmN0aW9uIHNlbGVjdFJlY29yZChsYXN0UmVjb3JkLCBuZXdSZWNvcmQpIHtcbiAgICBpZiAobGFzdFJlY29yZCA9PT0gbmV3UmVjb3JkKSByZXR1cm4gbGFzdFJlY29yZDtcbiAgICBpZiAocmVjb3JkV2l0aE9sZFZhbHVlICYmIHJlY29yZFJlcHJlc2VudHNDdXJyZW50TXV0YXRpb24obGFzdFJlY29yZCkpIHJldHVybiByZWNvcmRXaXRoT2xkVmFsdWU7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZnVuY3Rpb24gUmVnaXN0cmF0aW9uKG9ic2VydmVyLCB0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gb2JzZXJ2ZXI7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnRyYW5zaWVudE9ic2VydmVkTm9kZXMgPSBbXTtcbiAgfVxuICBSZWdpc3RyYXRpb24ucHJvdG90eXBlID0ge1xuICAgIGVucXVldWU6IGZ1bmN0aW9uKHJlY29yZCkge1xuICAgICAgdmFyIHJlY29yZHMgPSB0aGlzLm9ic2VydmVyLnJlY29yZHNfO1xuICAgICAgdmFyIGxlbmd0aCA9IHJlY29yZHMubGVuZ3RoO1xuICAgICAgaWYgKHJlY29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgbGFzdFJlY29yZCA9IHJlY29yZHNbbGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciByZWNvcmRUb1JlcGxhY2VMYXN0ID0gc2VsZWN0UmVjb3JkKGxhc3RSZWNvcmQsIHJlY29yZCk7XG4gICAgICAgIGlmIChyZWNvcmRUb1JlcGxhY2VMYXN0KSB7XG4gICAgICAgICAgcmVjb3Jkc1tsZW5ndGggLSAxXSA9IHJlY29yZFRvUmVwbGFjZUxhc3Q7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlZHVsZUNhbGxiYWNrKHRoaXMub2JzZXJ2ZXIpO1xuICAgICAgfVxuICAgICAgcmVjb3Jkc1tsZW5ndGhdID0gcmVjb3JkO1xuICAgIH0sXG4gICAgYWRkTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzXyh0aGlzLnRhcmdldCk7XG4gICAgfSxcbiAgICBhZGRMaXN0ZW5lcnNfOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZXMpIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUF0dHJNb2RpZmllZFwiLCB0aGlzLCB0cnVlKTtcbiAgICAgIGlmIChvcHRpb25zLmNoYXJhY3RlckRhdGEpIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNoYXJhY3RlckRhdGFNb2RpZmllZFwiLCB0aGlzLCB0cnVlKTtcbiAgICAgIGlmIChvcHRpb25zLmNoaWxkTGlzdCkgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiRE9NTm9kZUluc2VydGVkXCIsIHRoaXMsIHRydWUpO1xuICAgICAgaWYgKG9wdGlvbnMuY2hpbGRMaXN0IHx8IG9wdGlvbnMuc3VidHJlZSkgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiRE9NTm9kZVJlbW92ZWRcIiwgdGhpcywgdHJ1ZSk7XG4gICAgfSxcbiAgICByZW1vdmVMaXN0ZW5lcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnNfKHRoaXMudGFyZ2V0KTtcbiAgICB9LFxuICAgIHJlbW92ZUxpc3RlbmVyc186IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlcykgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQXR0ck1vZGlmaWVkXCIsIHRoaXMsIHRydWUpO1xuICAgICAgaWYgKG9wdGlvbnMuY2hhcmFjdGVyRGF0YSkgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NQ2hhcmFjdGVyRGF0YU1vZGlmaWVkXCIsIHRoaXMsIHRydWUpO1xuICAgICAgaWYgKG9wdGlvbnMuY2hpbGRMaXN0KSBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Ob2RlSW5zZXJ0ZWRcIiwgdGhpcywgdHJ1ZSk7XG4gICAgICBpZiAob3B0aW9ucy5jaGlsZExpc3QgfHwgb3B0aW9ucy5zdWJ0cmVlKSBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Ob2RlUmVtb3ZlZFwiLCB0aGlzLCB0cnVlKTtcbiAgICB9LFxuICAgIGFkZFRyYW5zaWVudE9ic2VydmVyOiBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gdGhpcy50YXJnZXQpIHJldHVybjtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzXyhub2RlKTtcbiAgICAgIHRoaXMudHJhbnNpZW50T2JzZXJ2ZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgdmFyIHJlZ2lzdHJhdGlvbnMgPSByZWdpc3RyYXRpb25zVGFibGUuZ2V0KG5vZGUpO1xuICAgICAgaWYgKCFyZWdpc3RyYXRpb25zKSByZWdpc3RyYXRpb25zVGFibGUuc2V0KG5vZGUsIHJlZ2lzdHJhdGlvbnMgPSBbXSk7XG4gICAgICByZWdpc3RyYXRpb25zLnB1c2godGhpcyk7XG4gICAgfSxcbiAgICByZW1vdmVUcmFuc2llbnRPYnNlcnZlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRyYW5zaWVudE9ic2VydmVkTm9kZXMgPSB0aGlzLnRyYW5zaWVudE9ic2VydmVkTm9kZXM7XG4gICAgICB0aGlzLnRyYW5zaWVudE9ic2VydmVkTm9kZXMgPSBbXTtcbiAgICAgIHRyYW5zaWVudE9ic2VydmVkTm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzXyhub2RlKTtcbiAgICAgICAgdmFyIHJlZ2lzdHJhdGlvbnMgPSByZWdpc3RyYXRpb25zVGFibGUuZ2V0KG5vZGUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdHJhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocmVnaXN0cmF0aW9uc1tpXSA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmVnaXN0cmF0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG4gICAgaGFuZGxlRXZlbnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgIGNhc2UgXCJET01BdHRyTW9kaWZpZWRcIjpcbiAgICAgICAgdmFyIG5hbWUgPSBlLmF0dHJOYW1lO1xuICAgICAgICB2YXIgbmFtZXNwYWNlID0gZS5yZWxhdGVkTm9kZS5uYW1lc3BhY2VVUkk7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgdmFyIHJlY29yZCA9IG5ldyBnZXRSZWNvcmQoXCJhdHRyaWJ1dGVzXCIsIHRhcmdldCk7XG4gICAgICAgIHJlY29yZC5hdHRyaWJ1dGVOYW1lID0gbmFtZTtcbiAgICAgICAgcmVjb3JkLmF0dHJpYnV0ZU5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gZS5hdHRyQ2hhbmdlID09PSBNdXRhdGlvbkV2ZW50LkFERElUSU9OID8gbnVsbCA6IGUucHJldlZhbHVlO1xuICAgICAgICBmb3JFYWNoQW5jZXN0b3JBbmRPYnNlcnZlckVucXVldWVSZWNvcmQodGFyZ2V0LCBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLmF0dHJpYnV0ZXMpIHJldHVybjtcbiAgICAgICAgICBpZiAob3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIgJiYgb3B0aW9ucy5hdHRyaWJ1dGVGaWx0ZXIubGVuZ3RoICYmIG9wdGlvbnMuYXR0cmlidXRlRmlsdGVyLmluZGV4T2YobmFtZSkgPT09IC0xICYmIG9wdGlvbnMuYXR0cmlidXRlRmlsdGVyLmluZGV4T2YobmFtZXNwYWNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9wdGlvbnMuYXR0cmlidXRlT2xkVmFsdWUpIHJldHVybiBnZXRSZWNvcmRXaXRoT2xkVmFsdWUob2xkVmFsdWUpO1xuICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgIGNhc2UgXCJET01DaGFyYWN0ZXJEYXRhTW9kaWZpZWRcIjpcbiAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgcmVjb3JkID0gZ2V0UmVjb3JkKFwiY2hhcmFjdGVyRGF0YVwiLCB0YXJnZXQpO1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBlLnByZXZWYWx1ZTtcbiAgICAgICAgZm9yRWFjaEFuY2VzdG9yQW5kT2JzZXJ2ZXJFbnF1ZXVlUmVjb3JkKHRhcmdldCwgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5jaGFyYWN0ZXJEYXRhKSByZXR1cm47XG4gICAgICAgICAgaWYgKG9wdGlvbnMuY2hhcmFjdGVyRGF0YU9sZFZhbHVlKSByZXR1cm4gZ2V0UmVjb3JkV2l0aE9sZFZhbHVlKG9sZFZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICBjYXNlIFwiRE9NTm9kZVJlbW92ZWRcIjpcbiAgICAgICAgdGhpcy5hZGRUcmFuc2llbnRPYnNlcnZlcihlLnRhcmdldCk7XG5cbiAgICAgICBjYXNlIFwiRE9NTm9kZUluc2VydGVkXCI6XG4gICAgICAgIHZhciBjaGFuZ2VkTm9kZSA9IGUudGFyZ2V0O1xuICAgICAgICB2YXIgYWRkZWROb2RlcywgcmVtb3ZlZE5vZGVzO1xuICAgICAgICBpZiAoZS50eXBlID09PSBcIkRPTU5vZGVJbnNlcnRlZFwiKSB7XG4gICAgICAgICAgYWRkZWROb2RlcyA9IFsgY2hhbmdlZE5vZGUgXTtcbiAgICAgICAgICByZW1vdmVkTm9kZXMgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGRlZE5vZGVzID0gW107XG4gICAgICAgICAgcmVtb3ZlZE5vZGVzID0gWyBjaGFuZ2VkTm9kZSBdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2aW91c1NpYmxpbmcgPSBjaGFuZ2VkTm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IGNoYW5nZWROb2RlLm5leHRTaWJsaW5nO1xuICAgICAgICB2YXIgcmVjb3JkID0gZ2V0UmVjb3JkKFwiY2hpbGRMaXN0XCIsIGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuICAgICAgICByZWNvcmQuYWRkZWROb2RlcyA9IGFkZGVkTm9kZXM7XG4gICAgICAgIHJlY29yZC5yZW1vdmVkTm9kZXMgPSByZW1vdmVkTm9kZXM7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIHJlY29yZC5uZXh0U2libGluZyA9IG5leHRTaWJsaW5nO1xuICAgICAgICBmb3JFYWNoQW5jZXN0b3JBbmRPYnNlcnZlckVucXVldWVSZWNvcmQoZS5yZWxhdGVkTm9kZSwgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIGlmICghb3B0aW9ucy5jaGlsZExpc3QpIHJldHVybjtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNsZWFyUmVjb3JkcygpO1xuICAgIH1cbiAgfTtcbiAgZ2xvYmFsLkpzTXV0YXRpb25PYnNlcnZlciA9IEpzTXV0YXRpb25PYnNlcnZlcjtcbiAgaWYgKCFnbG9iYWwuTXV0YXRpb25PYnNlcnZlcikge1xuICAgIGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyID0gSnNNdXRhdGlvbk9ic2VydmVyO1xuICAgIEpzTXV0YXRpb25PYnNlcnZlci5faXNQb2x5ZmlsbGVkID0gdHJ1ZTtcbiAgfVxufSkoc2VsZik7IiwiLypcbkNvcHlyaWdodCAoYykgMjAxMiBCYXJuZXNhbmRub2JsZS5jb20sIGxsYywgRG9uYXZvbiBXZXN0LCBhbmQgRG9tZW5pYyBEZW5pY29sYVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbmEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5kaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbnBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xudGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG5OT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG5MSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG5PRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbldJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgc2V0SW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyhhcmdzKSB7XG4gICAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSBwYXJ0aWFsbHlBcHBsaWVkLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhY2NlcHRzIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyBzZXRJbW1lZGlhdGUsIGJ1dFxuICAgIC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHJlcXVpcmVzIG5vIGFyZ3VtZW50cy5cbiAgICBmdW5jdGlvbiBwYXJ0aWFsbHlBcHBsaWVkKGhhbmRsZXIpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAobmV3IEZ1bmN0aW9uKFwiXCIgKyBoYW5kbGVyKSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHBhcnRpYWxseUFwcGxpZWQocnVuSWZQcmVzZW50LCBoYW5kbGUpLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRhc2soKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhwYXJ0aWFsbHlBcHBsaWVkKHJ1bklmUHJlc2VudCwgaGFuZGxlKSk7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRJbW1lZGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBhZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZXRJbW1lZGlhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBhZGRGcm9tU2V0SW1tZWRpYXRlQXJndW1lbnRzKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgc2V0SW1tZWRpYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGFkZEZyb21TZXRJbW1lZGlhdGVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocGFydGlhbGx5QXBwbGllZChydW5JZlByZXNlbnQsIGhhbmRsZSksIDApO1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHNlbGYpKTtcbiIsIi8vIENhdXRpb246XG4vLyBEbyBub3QgcmVwbGFjZSB0aGlzIGltcG9ydCBzdGF0ZW1lbnQgd2l0aCBjb2Rlcy5cbi8vXG4vLyBJZiB5b3UgcmVwbGFjZSB0aGlzIGltcG9ydCBzdGF0ZW1lbnQgd2l0aCBjb2Rlcyxcbi8vIHRoZSBjb2RlcyB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIHRoZSBmb2xsb3dpbmcgcG9seWZpbGxzIGFyZSBpbXBvcnRlZFxuLy8gYmVjYXVzZSBpbXBvcnQgc3RhdGVtZW50cyBhcmUgaG9pc3RlZCBkdXJpbmcgY29tcGlsYXRpb24uXG5pbXBvcnQgJy4vcG9seWZpbGwtc3dpdGNoZXMnO1xuXG4vLyBQb2x5ZmlsbCBFQ01BU2NyaXB0IHN0YW5kYXJkIGZlYXR1cmVzIHdpdGggZ2xvYmFsIG5hbWVzcGFjZSBwb2xsdXRpb25cbmltcG9ydCAnY29yZS1qcy9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZic7XG5pbXBvcnQgJ2NvcmUtanMvZm4vc2V0JztcbmltcG9ydCAnY29yZS1qcy9mbi9tYXAnO1xuXG4vLyBQb2x5ZmlsbCBDdXN0b20gRWxlbWVudHMgdjEgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICdAb25zZW51aS9jdXN0b20tZWxlbWVudHMvc3JjL2N1c3RvbS1lbGVtZW50cyc7XG5cbi8vIFBvbHlmaWxsIE11dGF0aW9uT2JzZXJ2ZXIgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICcuL011dGF0aW9uT2JzZXJ2ZXJAMC43LjIyL011dGF0aW9uT2JzZXJ2ZXIuanMnO1xuXG4vLyBQb2x5ZmlsbCBzZXRJbW1lZGlhdGUgd2l0aCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvblxuaW1wb3J0ICcuL3NldEltbWVkaWF0ZUAxLjAuMittb2Qvc2V0SW1tZWRpYXRlLmpzJztcbiIsIjsoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEBwcmVzZXJ2ZSBGYXN0Q2xpY2s6IHBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXMuXG5cdCAqXG5cdCAqIEBjb2RpbmdzdGFuZGFyZCBmdGxhYnMtanN2MlxuXHQgKiBAY29weXJpZ2h0IFRoZSBGaW5hbmNpYWwgVGltZXMgTGltaXRlZCBbQWxsIFJpZ2h0cyBSZXNlcnZlZF1cblx0ICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKHNlZSBMSUNFTlNFLnR4dClcblx0ICovXG5cblx0Lypqc2xpbnQgYnJvd3Nlcjp0cnVlLCBub2RlOnRydWUqL1xuXHQvKmdsb2JhbCBkZWZpbmUsIEV2ZW50LCBOb2RlKi9cblxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBmYXN0LWNsaWNraW5nIGxpc3RlbmVycyBvbiB0aGUgc3BlY2lmaWVkIGxheWVyLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRmdW5jdGlvbiBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpIHtcblx0XHR2YXIgb2xkT25DbGljaztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0LyoqXG5cdFx0ICogV2hldGhlciBhIGNsaWNrIGlzIGN1cnJlbnRseSBiZWluZyB0cmFja2VkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgYm9vbGVhblxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaW1lc3RhbXAgZm9yIHdoZW4gY2xpY2sgdHJhY2tpbmcgc3RhcnRlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGVsZW1lbnQgYmVpbmcgdHJhY2tlZCBmb3IgYSBjbGljay5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEV2ZW50VGFyZ2V0XG5cdFx0ICovXG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWC1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFktY29vcmRpbmF0ZSBvZiB0b3VjaCBzdGFydCBldmVudC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBJRCBvZiB0aGUgbGFzdCB0b3VjaCwgcmV0cmlldmVkIGZyb20gVG91Y2guaWRlbnRpZmllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMubGFzdFRvdWNoSWRlbnRpZmllciA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRvdWNobW92ZSBib3VuZGFyeSwgYmV5b25kIHdoaWNoIGEgY2xpY2sgd2lsbCBiZSBjYW5jZWxsZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoQm91bmRhcnkgPSBvcHRpb25zLnRvdWNoQm91bmRhcnkgfHwgMTA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBGYXN0Q2xpY2sgbGF5ZXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBFbGVtZW50XG5cdFx0ICovXG5cdFx0dGhpcy5sYXllciA9IGxheWVyO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIHRhcCh0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCkgZXZlbnRzXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcERlbGF5ID0gb3B0aW9ucy50YXBEZWxheSB8fCAyMDA7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWF4aW11bSB0aW1lIGZvciBhIHRhcFxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50YXBUaW1lb3V0ID0gb3B0aW9ucy50YXBUaW1lb3V0IHx8IDcwMDtcblxuXHRcdGlmIChGYXN0Q2xpY2subm90TmVlZGVkKGxheWVyKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIEFuZHJvaWQgZG9uJ3QgaGF2ZSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuXHRcdGZ1bmN0aW9uIGJpbmQobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTsgfTtcblx0XHR9XG5cblxuXHRcdHZhciBtZXRob2RzID0gWydvbk1vdXNlJywgJ29uQ2xpY2snLCAnb25Ub3VjaFN0YXJ0JywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaENhbmNlbCddO1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IG1ldGhvZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRjb250ZXh0W21ldGhvZHNbaV1dID0gYmluZChjb250ZXh0W21ldGhvZHNbaV1dLCBjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdXAgZXZlbnQgaGFuZGxlcnMgYXMgcmVxdWlyZWRcblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXG5cdFx0Ly8gSGFjayBpcyByZXF1aXJlZCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0Ly8gd2hpY2ggaXMgaG93IEZhc3RDbGljayBub3JtYWxseSBzdG9wcyBjbGljayBldmVudHMgYnViYmxpbmcgdG8gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgb24gdGhlIEZhc3RDbGlja1xuXHRcdC8vIGxheWVyIHdoZW4gdGhleSBhcmUgY2FuY2VsbGVkLlxuXHRcdGlmICghRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBybXYgPSBOb2RlLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdHJtdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBhZHYgPSBOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCAoY2FsbGJhY2suaGlqYWNrZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKCFldmVudC5wcm9wYWdhdGlvblN0b3BwZWQpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhZHYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIElmIGEgaGFuZGxlciBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIHRoZSBlbGVtZW50J3Mgb25jbGljayBhdHRyaWJ1dGUsIGl0IHdpbGwgYmUgZmlyZWQgYmVmb3JlXG5cdFx0Ly8gRmFzdENsaWNrJ3Mgb25DbGljayBoYW5kbGVyLiBGaXggdGhpcyBieSBwdWxsaW5nIG91dCB0aGUgdXNlci1kZWZpbmVkIGhhbmRsZXIgZnVuY3Rpb24gYW5kXG5cdFx0Ly8gYWRkaW5nIGl0IGFzIGxpc3RlbmVyLlxuXHRcdGlmICh0eXBlb2YgbGF5ZXIub25jbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuXG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgb24gYXQgbGVhc3QgMy4yIHJlcXVpcmVzIGEgbmV3IHJlZmVyZW5jZSB0byB0aGUgZnVuY3Rpb24gaW4gbGF5ZXIub25jbGlja1xuXHRcdFx0Ly8gLSB0aGUgb2xkIG9uZSB3b24ndCB3b3JrIGlmIHBhc3NlZCB0byBhZGRFdmVudExpc3RlbmVyIGRpcmVjdGx5LlxuXHRcdFx0b2xkT25DbGljayA9IGxheWVyLm9uY2xpY2s7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdG9sZE9uQ2xpY2soZXZlbnQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0bGF5ZXIub25jbGljayA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogV2luZG93cyBQaG9uZSA4LjEgZmFrZXMgdXNlciBhZ2VudCBzdHJpbmcgdG8gbG9vayBsaWtlIEFuZHJvaWQgYW5kIGlQaG9uZS5cblx0KlxuXHQqIEB0eXBlIGJvb2xlYW5cblx0Ki9cblx0dmFyIGRldmljZUlzV2luZG93c1Bob25lID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luZG93cyBQaG9uZVwiKSA+PSAwO1xuXG5cdC8qKlxuXHQgKiBBbmRyb2lkIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0FuZHJvaWQnKSA+IDAgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1MgPSAvaVAoYWR8aG9uZXxvZCkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA0IHJlcXVpcmVzIGFuIGV4Y2VwdGlvbiBmb3Igc2VsZWN0IGVsZW1lbnRzLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1M0ID0gZGV2aWNlSXNJT1MgJiYgKC9PUyA0X1xcZChfXFxkKT8vKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA2LjAtNy4qIHJlcXVpcmVzIHRoZSB0YXJnZXQgZWxlbWVudCB0byBiZSBtYW51YWxseSBkZXJpdmVkXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIFs2LTddX1xcZC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblx0LyoqXG5cdCAqIEJsYWNrQmVycnkgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQmxhY2tCZXJyeTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdCQjEwJykgPiAwO1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBuYXRpdmUgY2xpY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IG5lZWRzIGEgbmF0aXZlIGNsaWNrXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cblx0XHQvLyBEb24ndCBzZW5kIGEgc3ludGhldGljIGNsaWNrIHRvIGRpc2FibGVkIGlucHV0cyAoaXNzdWUgIzYyKVxuXHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRpZiAodGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdpbnB1dCc6XG5cblx0XHRcdC8vIEZpbGUgaW5wdXRzIG5lZWQgcmVhbCBjbGlja3Mgb24gaU9TIDYgZHVlIHRvIGEgYnJvd3NlciBidWcgKGlzc3VlICM2OClcblx0XHRcdGlmICgoZGV2aWNlSXNJT1MgJiYgdGFyZ2V0LnR5cGUgPT09ICdmaWxlJykgfHwgdGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdsYWJlbCc6XG5cdFx0Y2FzZSAnaWZyYW1lJzogLy8gaU9TOCBob21lc2NyZWVuIGFwcHMgY2FuIHByZXZlbnQgZXZlbnRzIGJ1YmJsaW5nIGludG8gZnJhbWVzXG5cdFx0Y2FzZSAndmlkZW8nOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgvXFxibmVlZHNjbGlja1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBnaXZlbiBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBjbGljayBpbnRvIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBuYXRpdmUgY2xpY2suXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzRm9jdXMgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0Y2FzZSAndGV4dGFyZWEnOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRcdHJldHVybiAhZGV2aWNlSXNBbmRyb2lkO1xuXHRcdGNhc2UgJ2lucHV0Jzpcblx0XHRcdHN3aXRjaCAodGFyZ2V0LnR5cGUpIHtcblx0XHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRjYXNlICdmaWxlJzpcblx0XHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdGNhc2UgJ3N1Ym1pdCc6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTm8gcG9pbnQgaW4gYXR0ZW1wdGluZyB0byBmb2N1cyBkaXNhYmxlZCBpbnB1dHNcblx0XHRcdHJldHVybiAhdGFyZ2V0LmRpc2FibGVkICYmICF0YXJnZXQucmVhZE9ubHk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoL1xcYm5lZWRzZm9jdXNcXGIvKS50ZXN0KHRhcmdldC5jbGFzc05hbWUpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuc2VuZENsaWNrID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCwgZXZlbnQpIHtcblx0XHR2YXIgY2xpY2tFdmVudCwgdG91Y2g7XG5cblx0XHQvLyBPbiBzb21lIEFuZHJvaWQgZGV2aWNlcyBhY3RpdmVFbGVtZW50IG5lZWRzIHRvIGJlIGJsdXJyZWQgb3RoZXJ3aXNlIHRoZSBzeW50aGV0aWMgY2xpY2sgd2lsbCBoYXZlIG5vIGVmZmVjdCAoIzI0KVxuXHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRhcmdldEVsZW1lbnQpIHtcblx0XHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXHRcdH1cblxuXHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHQvLyBTeW50aGVzaXplIGEgY2xpY2sgZXZlbnQsIHdpdGggYW4gZXh0cmEgYXR0cmlidXRlIHNvIGl0IGNhbiBiZSB0cmFja2VkXG5cdFx0Y2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXHRcdGNsaWNrRXZlbnQuaW5pdE1vdXNlRXZlbnQodGhpcy5kZXRlcm1pbmVFdmVudFR5cGUodGFyZ2V0RWxlbWVudCksIHRydWUsIHRydWUsIHdpbmRvdywgMSwgdG91Y2guc2NyZWVuWCwgdG91Y2guc2NyZWVuWSwgdG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuXHRcdGNsaWNrRXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCA9IHRydWU7XG5cdFx0dGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXHR9O1xuXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGV0ZXJtaW5lRXZlbnRUeXBlID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXG5cdFx0Ly9Jc3N1ZSAjMTU5OiBBbmRyb2lkIENocm9tZSBTZWxlY3QgQm94IGRvZXMgbm90IG9wZW4gd2l0aCBhIHN5bnRoZXRpYyBjbGljayBldmVudFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQgJiYgdGFyZ2V0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG5cdFx0XHRyZXR1cm4gJ21vdXNlZG93bic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICdjbGljayc7XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBsZW5ndGg7XG5cblx0XHQvLyBJc3N1ZSAjMTYwOiBvbiBpT1MgNywgc29tZSBpbnB1dCBlbGVtZW50cyAoZS5nLiBkYXRlIGRhdGV0aW1lIG1vbnRoKSB0aHJvdyBhIHZhZ3VlIFR5cGVFcnJvciBvbiBzZXRTZWxlY3Rpb25SYW5nZS4gVGhlc2UgZWxlbWVudHMgZG9uJ3QgaGF2ZSBhbiBpbnRlZ2VyIHZhbHVlIGZvciB0aGUgc2VsZWN0aW9uU3RhcnQgYW5kIHNlbGVjdGlvbkVuZCBwcm9wZXJ0aWVzLCBidXQgdW5mb3J0dW5hdGVseSB0aGF0IGNhbid0IGJlIHVzZWQgZm9yIGRldGVjdGlvbiBiZWNhdXNlIGFjY2Vzc2luZyB0aGUgcHJvcGVydGllcyBhbHNvIHRocm93cyBhIFR5cGVFcnJvci4gSnVzdCBjaGVjayB0aGUgdHlwZSBpbnN0ZWFkLiBGaWxlZCBhcyBBcHBsZSBidWcgIzE1MTIyNzI0LlxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiB0YXJnZXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlICYmIHRhcmdldEVsZW1lbnQudHlwZS5pbmRleE9mKCdkYXRlJykgIT09IDAgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAndGltZScgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAnbW9udGgnKSB7XG5cdFx0XHRsZW5ndGggPSB0YXJnZXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcblx0XHRcdHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobGVuZ3RoLCBsZW5ndGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZvY3VzKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRhcmdldCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgYSBzY3JvbGxhYmxlIGxheWVyIGFuZCBpZiBzbywgc2V0IGEgZmxhZyBvbiBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnVwZGF0ZVNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHR2YXIgc2Nyb2xsUGFyZW50LCBwYXJlbnRFbGVtZW50O1xuXG5cdFx0c2Nyb2xsUGFyZW50ID0gdGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cblx0XHQvLyBBdHRlbXB0IHRvIGRpc2NvdmVyIHdoZXRoZXIgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBzY3JvbGxhYmxlIGxheWVyLiBSZS1jaGVjayBpZiB0aGVcblx0XHQvLyB0YXJnZXQgZWxlbWVudCB3YXMgbW92ZWQgdG8gYW5vdGhlciBwYXJlbnQuXG5cdFx0aWYgKCFzY3JvbGxQYXJlbnQgfHwgIXNjcm9sbFBhcmVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0cGFyZW50RWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChwYXJlbnRFbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0c2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fSB3aGlsZSAocGFyZW50RWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWx3YXlzIHVwZGF0ZSB0aGUgc2Nyb2xsIHRvcCB0cmFja2VyIGlmIHBvc3NpYmxlLlxuXHRcdGlmIChzY3JvbGxQYXJlbnQpIHtcblx0XHRcdHNjcm9sbFBhcmVudC5mYXN0Q2xpY2tMYXN0U2Nyb2xsVG9wID0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcDtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxFdmVudFRhcmdldH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKGV2ZW50VGFyZ2V0KSB7XG5cblx0XHQvLyBPbiBzb21lIG9sZGVyIGJyb3dzZXJzIChub3RhYmx5IFNhZmFyaSBvbiBpT1MgNC4xIC0gc2VlIGlzc3VlICM1NikgdGhlIGV2ZW50IHRhcmdldCBtYXkgYmUgYSB0ZXh0IG5vZGUuXG5cdFx0aWYgKGV2ZW50VGFyZ2V0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0cmV0dXJuIGV2ZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50VGFyZ2V0O1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIHN0YXJ0LCByZWNvcmQgdGhlIHBvc2l0aW9uIGFuZCBzY3JvbGwgb2Zmc2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdGFyZ2V0RWxlbWVudCwgdG91Y2gsIHNlbGVjdGlvbjtcblxuXHRcdC8vIElnbm9yZSBtdWx0aXBsZSB0b3VjaGVzLCBvdGhlcndpc2UgcGluY2gtdG8tem9vbSBpcyBwcmV2ZW50ZWQgaWYgYm90aCBmaW5nZXJzIGFyZSBvbiB0aGUgRmFzdENsaWNrIGVsZW1lbnQgKGlzc3VlICMxMTEpLlxuXHRcdGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldEVsZW1lbnQgPSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KTtcblx0XHR0b3VjaCA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XG5cblx0XHQvLyBJZ25vcmUgdG91Y2hlcyBvbiBjb250ZW50ZWRpdGFibGUgZWxlbWVudHMgdG8gcHJldmVudCBjb25mbGljdCB3aXRoIHRleHQgc2VsZWN0aW9uLlxuXHRcdC8vIChGb3IgZGV0YWlsczogaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2svcHVsbC8yMTEgKVxuXHRcdGlmICh0YXJnZXRFbGVtZW50LmlzQ29udGVudEVkaXRhYmxlKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MpIHtcblxuXHRcdFx0Ly8gT25seSB0cnVzdGVkIGV2ZW50cyB3aWxsIGRlc2VsZWN0IHRleHQgb24gaU9TIChpc3N1ZSAjNDkpXG5cdFx0XHRzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0XHRpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgJiYgIXNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0XHQvLyBXZWlyZCB0aGluZ3MgaGFwcGVuIG9uIGlPUyB3aGVuIGFuIGFsZXJ0IG9yIGNvbmZpcm0gZGlhbG9nIGlzIG9wZW5lZCBmcm9tIGEgY2xpY2sgZXZlbnQgY2FsbGJhY2sgKGlzc3VlICMyMyk6XG5cdFx0XHRcdC8vIHdoZW4gdGhlIHVzZXIgbmV4dCB0YXBzIGFueXdoZXJlIGVsc2Ugb24gdGhlIHBhZ2UsIG5ldyB0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCBldmVudHMgYXJlIGRpc3BhdGNoZWRcblx0XHRcdFx0Ly8gd2l0aCB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIHRoZSB0b3VjaCBldmVudCB0aGF0IHByZXZpb3VzbHkgdHJpZ2dlcmVkIHRoZSBjbGljayB0aGF0IHRyaWdnZXJlZCB0aGUgYWxlcnQuXG5cdFx0XHRcdC8vIFNhZGx5LCB0aGVyZSBpcyBhbiBpc3N1ZSBvbiBpT1MgNCB0aGF0IGNhdXNlcyBzb21lIG5vcm1hbCB0b3VjaCBldmVudHMgdG8gaGF2ZSB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIGFuXG5cdFx0XHRcdC8vIGltbWVkaWF0ZWx5IHByZWNlZGluZyB0b3VjaCBldmVudCAoaXNzdWUgIzUyKSwgc28gdGhpcyBmaXggaXMgdW5hdmFpbGFibGUgb24gdGhhdCBwbGF0Zm9ybS5cblx0XHRcdFx0Ly8gSXNzdWUgMTIwOiB0b3VjaC5pZGVudGlmaWVyIGlzIDAgd2hlbiBDaHJvbWUgZGV2IHRvb2xzICdFbXVsYXRlIHRvdWNoIGV2ZW50cycgaXMgc2V0IHdpdGggYW4gaU9TIGRldmljZSBVQSBzdHJpbmcsXG5cdFx0XHRcdC8vIHdoaWNoIGNhdXNlcyBhbGwgdG91Y2ggZXZlbnRzIHRvIGJlIGlnbm9yZWQuIEFzIHRoaXMgYmxvY2sgb25seSBhcHBsaWVzIHRvIGlPUywgYW5kIGlPUyBpZGVudGlmaWVycyBhcmUgYWx3YXlzIGxvbmcsXG5cdFx0XHRcdC8vIHJhbmRvbSBpbnRlZ2VycywgaXQncyBzYWZlIHRvIHRvIGNvbnRpbnVlIGlmIHRoZSBpZGVudGlmaWVyIGlzIDAgaGVyZS5cblx0XHRcdFx0aWYgKHRvdWNoLmlkZW50aWZpZXIgJiYgdG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG5cdFx0XHRcdC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciAodXNpbmcgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoKSBhbmQ6XG5cdFx0XHRcdC8vIDEpIHRoZSB1c2VyIGRvZXMgYSBmbGluZyBzY3JvbGwgb24gdGhlIHNjcm9sbGFibGUgbGF5ZXJcblx0XHRcdFx0Ly8gMikgdGhlIHVzZXIgc3RvcHMgdGhlIGZsaW5nIHNjcm9sbCB3aXRoIGFub3RoZXIgdGFwXG5cdFx0XHRcdC8vIHRoZW4gdGhlIGV2ZW50LnRhcmdldCBvZiB0aGUgbGFzdCAndG91Y2hlbmQnIGV2ZW50IHdpbGwgYmUgdGhlIGVsZW1lbnQgdGhhdCB3YXMgdW5kZXIgdGhlIHVzZXIncyBmaW5nZXJcblx0XHRcdFx0Ly8gd2hlbiB0aGUgZmxpbmcgc2Nyb2xsIHdhcyBzdGFydGVkLCBjYXVzaW5nIEZhc3RDbGljayB0byBzZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhhdCBsYXllciAtIHVubGVzcyBhIGNoZWNrXG5cdFx0XHRcdC8vIGlzIG1hZGUgdG8gZW5zdXJlIHRoYXQgYSBwYXJlbnQgbGF5ZXIgd2FzIG5vdCBzY3JvbGxlZCBiZWZvcmUgc2VuZGluZyBhIHN5bnRoZXRpYyBjbGljayAoaXNzdWUgIzQyKS5cblx0XHRcdFx0dGhpcy51cGRhdGVTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gdHJ1ZTtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IGV2ZW50LnRpbWVTdGFtcDtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IHRvdWNoLnBhZ2VYO1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSB0b3VjaC5wYWdlWTtcblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSAmJiAoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA+IC0xKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGEgdG91Y2htb3ZlIGV2ZW50IG9iamVjdCwgY2hlY2sgd2hldGhlciB0aGUgdG91Y2ggaGFzIG1vdmVkIHBhc3QgYSBib3VuZGFyeSBzaW5jZSBpdCBzdGFydGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUudG91Y2hIYXNNb3ZlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0sIGJvdW5kYXJ5ID0gdGhpcy50b3VjaEJvdW5kYXJ5O1xuXG5cdFx0aWYgKE1hdGguYWJzKHRvdWNoLnBhZ2VYIC0gdGhpcy50b3VjaFN0YXJ0WCkgPiBib3VuZGFyeSB8fCBNYXRoLmFicyh0b3VjaC5wYWdlWSAtIHRoaXMudG91Y2hTdGFydFkpID4gYm91bmRhcnkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIGxhc3QgcG9zaXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSB0b3VjaCBoYXMgbW92ZWQsIGNhbmNlbCB0aGUgY2xpY2sgdHJhY2tpbmdcblx0XHRpZiAodGhpcy50YXJnZXRFbGVtZW50ICE9PSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLnRvdWNoSGFzTW92ZWQoZXZlbnQpKSB7XG5cdFx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogQXR0ZW1wdCB0byBmaW5kIHRoZSBsYWJlbGxlZCBjb250cm9sIGZvciB0aGUgZ2l2ZW4gbGFiZWwgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxIVE1MTGFiZWxFbGVtZW50fSBsYWJlbEVsZW1lbnRcblx0ICogQHJldHVybnMge0VsZW1lbnR8bnVsbH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZmluZENvbnRyb2wgPSBmdW5jdGlvbihsYWJlbEVsZW1lbnQpIHtcblxuXHRcdC8vIEZhc3QgcGF0aCBmb3IgbmV3ZXIgYnJvd3NlcnMgc3VwcG9ydGluZyB0aGUgSFRNTDUgY29udHJvbCBhdHRyaWJ1dGVcblx0XHRpZiAobGFiZWxFbGVtZW50LmNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGxhYmVsRWxlbWVudC5jb250cm9sO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBicm93c2VycyB1bmRlciB0ZXN0IHRoYXQgc3VwcG9ydCB0b3VjaCBldmVudHMgYWxzbyBzdXBwb3J0IHRoZSBIVE1MNSBodG1sRm9yIGF0dHJpYnV0ZVxuXHRcdGlmIChsYWJlbEVsZW1lbnQuaHRtbEZvcikge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxhYmVsRWxlbWVudC5odG1sRm9yKTtcblx0XHR9XG5cblx0XHQvLyBJZiBubyBmb3IgYXR0cmlidXRlIGV4aXN0cywgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgZmlyc3QgbGFiZWxsYWJsZSBkZXNjZW5kYW50IGVsZW1lbnRcblx0XHQvLyB0aGUgbGlzdCBvZiB3aGljaCBpcyBkZWZpbmVkIGhlcmU6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjY2F0ZWdvcnktbGFiZWxcblx0XHRyZXR1cm4gbGFiZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiwgaW5wdXQ6bm90KFt0eXBlPWhpZGRlbl0pLCBrZXlnZW4sIG1ldGVyLCBvdXRwdXQsIHByb2dyZXNzLCBzZWxlY3QsIHRleHRhcmVhJyk7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggZW5kLCBkZXRlcm1pbmUgd2hldGhlciB0byBzZW5kIGEgY2xpY2sgZXZlbnQgYXQgb25jZS5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hFbmQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBmb3JFbGVtZW50LCB0cmFja2luZ0NsaWNrU3RhcnQsIHRhcmdldFRhZ05hbWUsIHNjcm9sbFBhcmVudCwgdG91Y2gsIHRhcmdldEVsZW1lbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQ7XG5cblx0XHRpZiAoIXRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCBwaGFudG9tIGNsaWNrcyBvbiBmYXN0IGRvdWJsZS10YXAgKGlzc3VlICMzNilcblx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRoaXMubGFzdENsaWNrVGltZSkgPCB0aGlzLnRhcERlbGF5ICYmIChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpID4gLTEpIHtcblx0XHRcdHRoaXMuY2FuY2VsTmV4dENsaWNrID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQpID4gdGhpcy50YXBUaW1lb3V0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBSZXNldCB0byBwcmV2ZW50IHdyb25nIGNsaWNrIGNhbmNlbCBvbiBpbnB1dCAoaXNzdWUgIzE1NikuXG5cdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSBmYWxzZTtcblxuXHRcdHRoaXMubGFzdENsaWNrVGltZSA9IGV2ZW50LnRpbWVTdGFtcDtcblxuXHRcdHRyYWNraW5nQ2xpY2tTdGFydCA9IHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0O1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXHRcdC8vIE9uIHNvbWUgaU9TIGRldmljZXMsIHRoZSB0YXJnZXRFbGVtZW50IHN1cHBsaWVkIHdpdGggdGhlIGV2ZW50IGlzIGludmFsaWQgaWYgdGhlIGxheWVyXG5cdFx0Ly8gaXMgcGVyZm9ybWluZyBhIHRyYW5zaXRpb24gb3Igc2Nyb2xsLCBhbmQgaGFzIHRvIGJlIHJlLWRldGVjdGVkIG1hbnVhbGx5LiBOb3RlIHRoYXRcblx0XHQvLyBmb3IgdGhpcyB0byBmdW5jdGlvbiBjb3JyZWN0bHksIGl0IG11c3QgYmUgY2FsbGVkICphZnRlciogdGhlIGV2ZW50IHRhcmdldCBpcyBjaGVja2VkIVxuXHRcdC8vIFNlZSBpc3N1ZSAjNTc7IGFsc28gZmlsZWQgYXMgcmRhcjovLzEzMDQ4NTg5IC5cblx0XHRpZiAoZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0KSB7XG5cdFx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHQvLyBJbiBjZXJ0YWluIGNhc2VzIGFyZ3VtZW50cyBvZiBlbGVtZW50RnJvbVBvaW50IGNhbiBiZSBuZWdhdGl2ZSwgc28gcHJldmVudCBzZXR0aW5nIHRhcmdldEVsZW1lbnQgdG8gbnVsbFxuXHRcdFx0dGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0KSB8fCB0YXJnZXRFbGVtZW50O1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdH1cblxuXHRcdHRhcmdldFRhZ05hbWUgPSB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodGFyZ2V0VGFnTmFtZSA9PT0gJ2xhYmVsJykge1xuXHRcdFx0Zm9yRWxlbWVudCA9IHRoaXMuZmluZENvbnRyb2wodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRpZiAoZm9yRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGFyZ2V0RWxlbWVudCA9IGZvckVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLm5lZWRzRm9jdXModGFyZ2V0RWxlbWVudCkpIHtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBJZiB0aGUgdG91Y2ggc3RhcnRlZCBhIHdoaWxlIGFnbyAoYmVzdCBndWVzcyBpcyAxMDBtcyBiYXNlZCBvbiB0ZXN0cyBmb3IgaXNzdWUgIzM2KSB0aGVuIGZvY3VzIHdpbGwgYmUgdHJpZ2dlcmVkIGFueXdheS4gUmV0dXJuIGVhcmx5IGFuZCB1bnNldCB0aGUgdGFyZ2V0IGVsZW1lbnQgcmVmZXJlbmNlIHNvIHRoYXQgdGhlIHN1YnNlcXVlbnQgY2xpY2sgd2lsbCBiZSBhbGxvd2VkIHRocm91Z2guXG5cdFx0XHQvLyBDYXNlIDI6IFdpdGhvdXQgdGhpcyBleGNlcHRpb24gZm9yIGlucHV0IGVsZW1lbnRzIHRhcHBlZCB3aGVuIHRoZSBkb2N1bWVudCBpcyBjb250YWluZWQgaW4gYW4gaWZyYW1lLCB0aGVuIGFueSBpbnB1dHRlZCB0ZXh0IHdvbid0IGJlIHZpc2libGUgZXZlbiB0aG91Z2ggdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyB1cGRhdGVkIGFzIHRoZSB1c2VyIHR5cGVzIChpc3N1ZSAjMzcpLlxuXHRcdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0cmFja2luZ0NsaWNrU3RhcnQpID4gMTAwIHx8IChkZXZpY2VJc0lPUyAmJiB3aW5kb3cudG9wICE9PSB3aW5kb3cgJiYgdGFyZ2V0VGFnTmFtZSA9PT0gJ2lucHV0JykpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXG5cdFx0XHQvLyBTZWxlY3QgZWxlbWVudHMgbmVlZCB0aGUgZXZlbnQgdG8gZ28gdGhyb3VnaCBvbiBpT1MgNCwgb3RoZXJ3aXNlIHRoZSBzZWxlY3RvciBtZW51IHdvbid0IG9wZW4uXG5cdFx0XHQvLyBBbHNvIHRoaXMgYnJlYWtzIG9wZW5pbmcgc2VsZWN0cyB3aGVuIFZvaWNlT3ZlciBpcyBhY3RpdmUgb24gaU9TNiwgaU9TNyAoYW5kIHBvc3NpYmx5IG90aGVycylcblx0XHRcdGlmICghZGV2aWNlSXNJT1MgfHwgdGFyZ2V0VGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiAhZGV2aWNlSXNJT1M0KSB7XG5cblx0XHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgZXZlbnQgaWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBwYXJlbnQgbGF5ZXIgdGhhdCB3YXMgc2Nyb2xsZWRcblx0XHRcdC8vIGFuZCB0aGlzIHRhcCBpcyBiZWluZyB1c2VkIHRvIHN0b3AgdGhlIHNjcm9sbGluZyAodXN1YWxseSBpbml0aWF0ZWQgYnkgYSBmbGluZyAtIGlzc3VlICM0MikuXG5cdFx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblx0XHRcdGlmIChzY3JvbGxQYXJlbnQgJiYgc2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgIT09IHNjcm9sbFBhcmVudC5zY3JvbGxUb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCB0aGUgYWN0dWFsIGNsaWNrIGZyb20gZ29pbmcgdGhvdWdoIC0gdW5sZXNzIHRoZSB0YXJnZXQgbm9kZSBpcyBtYXJrZWQgYXMgcmVxdWlyaW5nXG5cdFx0Ly8gcmVhbCBjbGlja3Mgb3IgaWYgaXQgaXMgaW4gdGhlIHdoaXRlbGlzdCBpbiB3aGljaCBjYXNlIG9ubHkgbm9uLXByb2dyYW1tYXRpYyBjbGlja3MgYXJlIHBlcm1pdHRlZC5cblx0XHRpZiAoIXRoaXMubmVlZHNDbGljayh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuc2VuZENsaWNrKHRhcmdldEVsZW1lbnQsIGV2ZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggY2FuY2VsLCBzdG9wIHRyYWNraW5nIHRoZSBjbGljay5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hDYW5jZWwgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIERldGVybWluZSBtb3VzZSBldmVudHMgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uTW91c2UgPSBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gSWYgYSB0YXJnZXQgZWxlbWVudCB3YXMgbmV2ZXIgc2V0IChiZWNhdXNlIGEgdG91Y2ggZXZlbnQgd2FzIG5ldmVyIGZpcmVkKSBhbGxvdyB0aGUgZXZlbnRcblx0XHRpZiAoIXRoaXMudGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LmZvcndhcmRlZFRvdWNoRXZlbnQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByb2dyYW1tYXRpY2FsbHkgZ2VuZXJhdGVkIGV2ZW50cyB0YXJnZXRpbmcgYSBzcGVjaWZpYyBlbGVtZW50IHNob3VsZCBiZSBwZXJtaXR0ZWRcblx0XHRpZiAoIWV2ZW50LmNhbmNlbGFibGUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIERlcml2ZSBhbmQgY2hlY2sgdGhlIHRhcmdldCBlbGVtZW50IHRvIHNlZSB3aGV0aGVyIHRoZSBtb3VzZSBldmVudCBuZWVkcyB0byBiZSBwZXJtaXR0ZWQ7XG5cdFx0Ly8gdW5sZXNzIGV4cGxpY2l0bHkgZW5hYmxlZCwgcHJldmVudCBub24tdG91Y2ggY2xpY2sgZXZlbnRzIGZyb20gdHJpZ2dlcmluZyBhY3Rpb25zLFxuXHRcdC8vIHRvIHByZXZlbnQgZ2hvc3QvZG91YmxlY2xpY2tzLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRoaXMudGFyZ2V0RWxlbWVudCkgfHwgdGhpcy5jYW5jZWxOZXh0Q2xpY2spIHtcblxuXHRcdFx0Ly8gUHJldmVudCBhbnkgdXNlci1hZGRlZCBsaXN0ZW5lcnMgZGVjbGFyZWQgb24gRmFzdENsaWNrIGVsZW1lbnQgZnJvbSBiZWluZyBmaXJlZC5cblx0XHRcdGlmIChldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnQgb2YgdGhlIGhhY2sgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBFdmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKGUuZy4gQW5kcm9pZCAyKVxuXHRcdFx0XHRldmVudC5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYW5jZWwgdGhlIGV2ZW50XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgbW91c2UgZXZlbnQgaXMgcGVybWl0dGVkLCByZXR1cm4gdHJ1ZSBmb3IgdGhlIGFjdGlvbiB0byBnbyB0aHJvdWdoLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIGFjdHVhbCBjbGlja3MsIGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaC1nZW5lcmF0ZWQgY2xpY2ssIGEgY2xpY2sgYWN0aW9uIG9jY3VycmluZ1xuXHQgKiBuYXR1cmFsbHkgYWZ0ZXIgYSBkZWxheSBhZnRlciBhIHRvdWNoICh3aGljaCBuZWVkcyB0byBiZSBjYW5jZWxsZWQgdG8gYXZvaWQgZHVwbGljYXRpb24pLCBvclxuXHQgKiBhbiBhY3R1YWwgY2xpY2sgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBwZXJtaXR0ZWQ7XG5cblx0XHQvLyBJdCdzIHBvc3NpYmxlIGZvciBhbm90aGVyIEZhc3RDbGljay1saWtlIGxpYnJhcnkgZGVsaXZlcmVkIHdpdGggdGhpcmQtcGFydHkgY29kZSB0byBmaXJlIGEgY2xpY2sgZXZlbnQgYmVmb3JlIEZhc3RDbGljayBkb2VzIChpc3N1ZSAjNDQpLiBJbiB0aGF0IGNhc2UsIHNldCB0aGUgY2xpY2stdHJhY2tpbmcgZmxhZyBiYWNrIHRvIGZhbHNlIGFuZCByZXR1cm4gZWFybHkuIFRoaXMgd2lsbCBjYXVzZSBvblRvdWNoRW5kIHRvIHJldHVybiBlYXJseS5cblx0XHRpZiAodGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBWZXJ5IG9kZCBiZWhhdmlvciBvbiBpT1MgKGlzc3VlICMxOCk6IGlmIGEgc3VibWl0IGVsZW1lbnQgaXMgcHJlc2VudCBpbnNpZGUgYSBmb3JtIGFuZCB0aGUgdXNlciBoaXRzIGVudGVyIGluIHRoZSBpT1Mgc2ltdWxhdG9yIG9yIGNsaWNrcyB0aGUgR28gYnV0dG9uIG9uIHRoZSBwb3AtdXAgT1Mga2V5Ym9hcmQgdGhlIGEga2luZCBvZiAnZmFrZScgY2xpY2sgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgd2l0aCB0aGUgc3VibWl0LXR5cGUgaW5wdXQgZWxlbWVudCBhcyB0aGUgdGFyZ2V0LlxuXHRcdGlmIChldmVudC50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcgJiYgZXZlbnQuZGV0YWlsID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRwZXJtaXR0ZWQgPSB0aGlzLm9uTW91c2UoZXZlbnQpO1xuXG5cdFx0Ly8gT25seSB1bnNldCB0YXJnZXRFbGVtZW50IGlmIHRoZSBjbGljayBpcyBub3QgcGVybWl0dGVkLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgdGhlIGNoZWNrIGZvciAhdGFyZ2V0RWxlbWVudCBpbiBvbk1vdXNlIGZhaWxzIGFuZCB0aGUgYnJvd3NlcidzIGNsaWNrIGRvZXNuJ3QgZ28gdGhyb3VnaC5cblx0XHRpZiAoIXBlcm1pdHRlZCkge1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBJZiBjbGlja3MgYXJlIHBlcm1pdHRlZCwgcmV0dXJuIHRydWUgZm9yIHRoZSBhY3Rpb24gdG8gZ28gdGhyb3VnaC5cblx0XHRyZXR1cm4gcGVybWl0dGVkO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgRmFzdENsaWNrJ3MgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBsYXllciA9IHRoaXMubGF5ZXI7XG5cblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgRmFzdENsaWNrIGlzIG5lZWRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqL1xuXHRGYXN0Q2xpY2subm90TmVlZGVkID0gZnVuY3Rpb24obGF5ZXIpIHtcblx0XHR2YXIgbWV0YVZpZXdwb3J0O1xuXHRcdHZhciBjaHJvbWVWZXJzaW9uO1xuXHRcdHZhciBibGFja2JlcnJ5VmVyc2lvbjtcblx0XHR2YXIgZmlyZWZveFZlcnNpb247XG5cblx0XHQvLyBEZXZpY2VzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0b3VjaCBkb24ndCBuZWVkIEZhc3RDbGlja1xuXHRcdGlmICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIENocm9tZSB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRjaHJvbWVWZXJzaW9uID0gKygvQ2hyb21lXFwvKFswLTldKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWywwXSlbMV07XG5cblx0XHRpZiAoY2hyb21lVmVyc2lvbikge1xuXG5cdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuXHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIG9uIEFuZHJvaWQgd2l0aCB1c2VyLXNjYWxhYmxlPVwibm9cIiBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjODkpXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBDaHJvbWUgMzIgYW5kIGFib3ZlIHdpdGggd2lkdGg9ZGV2aWNlLXdpZHRoIG9yIGxlc3MgZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRcdFx0XHRpZiAoY2hyb21lVmVyc2lvbiA+IDMxICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIENocm9tZSBkZXNrdG9wIGRvZXNuJ3QgbmVlZCBGYXN0Q2xpY2sgKGlzc3VlICMxNSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0JsYWNrQmVycnkxMCkge1xuXHRcdFx0YmxhY2tiZXJyeVZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9WZXJzaW9uXFwvKFswLTldKilcXC4oWzAtOV0qKS8pO1xuXG5cdFx0XHQvLyBCbGFja0JlcnJ5IDEwLjMrIGRvZXMgbm90IHJlcXVpcmUgRmFzdGNsaWNrIGxpYnJhcnkuXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljay9pc3N1ZXMvMjUxXG5cdFx0XHRpZiAoYmxhY2tiZXJyeVZlcnNpb25bMV0gPj0gMTAgJiYgYmxhY2tiZXJyeVZlcnNpb25bMl0gPj0gMykge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIHVzZXItc2NhbGFibGU9bm8gZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHdpZHRoPWRldmljZS13aWR0aCAob3IgbGVzcyB0aGFuIGRldmljZS13aWR0aCkgZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTEwIHdpdGggLW1zLXRvdWNoLWFjdGlvbjogbm9uZSBvciBtYW5pcHVsYXRpb24sIHdoaWNoIGRpc2FibGVzIGRvdWJsZS10YXAtdG8tem9vbSAoaXNzdWUgIzk3KVxuXHRcdGlmIChsYXllci5zdHlsZS5tc1RvdWNoQWN0aW9uID09PSAnbm9uZScgfHwgbGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdtYW5pcHVsYXRpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBGaXJlZm94IHZlcnNpb24gLSB6ZXJvIGZvciBvdGhlciBicm93c2Vyc1xuXHRcdGZpcmVmb3hWZXJzaW9uID0gKygvRmlyZWZveFxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGZpcmVmb3hWZXJzaW9uID49IDI3KSB7XG5cdFx0XHQvLyBGaXJlZm94IDI3KyBkb2VzIG5vdCBoYXZlIHRhcCBkZWxheSBpZiB0aGUgY29udGVudCBpcyBub3Qgem9vbWFibGUgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MjI4OTZcblxuXHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXHRcdFx0aWYgKG1ldGFWaWV3cG9ydCAmJiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElFMTE6IHByZWZpeGVkIC1tcy10b3VjaC1hY3Rpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBhbmQgaXQncyByZWNvbW1lbmRlZCB0byB1c2Ugbm9uLXByZWZpeGVkIHZlcnNpb25cblx0XHQvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvd2luZG93cy9hcHBzL0hoNzY3MzEzLmFzcHhcblx0XHRpZiAobGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdub25lJyB8fCBsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ21hbmlwdWxhdGlvbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBGYWN0b3J5IG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBGYXN0Q2xpY2sgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuXHQgKi9cblx0RmFzdENsaWNrLmF0dGFjaCA9IGZ1bmN0aW9uKGxheWVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIG5ldyBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpO1xuXHR9O1xuXG4gIHdpbmRvdy5GYXN0Q2xpY2sgPSBGYXN0Q2xpY2s7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgREVGQVVMVF9WSUVXUE9SVCA9ICd3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xLG1heGltdW0tc2NhbGU9MSxtaW5pbXVtLXNjYWxlPTEsdXNlci1zY2FsYWJsZT1ubyc7XG5cbiAgdmFyIFZpZXdwb3J0ID0geyBcbiAgICBlbnN1cmVWaWV3cG9ydEVsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZpZXdwb3J0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuICAgICAgaWYgKCF2aWV3cG9ydEVsZW1lbnQpIHtcbiAgICAgICAgdmlld3BvcnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWV0YScpO1xuICAgICAgICB2aWV3cG9ydEVsZW1lbnQubmFtZSA9ICd2aWV3cG9ydCc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodmlld3BvcnRFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZpZXdwb3J0RWxlbWVudDtcbiAgICB9LFxuXG4gICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZpZXdwb3J0RWxlbWVudCA9IFZpZXdwb3J0LmVuc3VyZVZpZXdwb3J0RWxlbWVudCgpO1xuXG4gICAgICBpZiAoIXZpZXdwb3J0RWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdmlld3BvcnRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29udGVudCcpKSB7XG4gICAgICAgIHZpZXdwb3J0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnLCBERUZBVUxUX1ZJRVdQT1JUKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2luZG93LlZpZXdwb3J0ID0gVmlld3BvcnQ7XG59KSgpO1xuIiwiLy8gTG9hZCBub24tcG9seWZpbGwgbGlicmFyaWVzXG5pbXBvcnQgJy4vRmFzdENsaWNrQDEuMC42K21vZC9mYXN0Y2xpY2suanMnO1xuLy8gaW1wb3J0ICcuL21pY3JvZXZlbnQuanNANDdjYmMxNCttb2QvbWljcm9ldmVudC5qcyc7XG5pbXBvcnQgJy4vdmlld3BvcnQuanMnO1xuIiwiaW1wb3J0ICcuL29ucy9wbGF0Zm9ybSc7IC8vIFRoaXMgZmlsZSBtdXN0IGJlIGxvYWRlZCBiZWZvcmUgQ3VzdG9tIEVsZW1lbnRzIHBvbHlmaWxscy5cbmltcG9ydCAnLi9wb2x5ZmlsbHMvaW5kZXguanMnO1xuaW1wb3J0ICcuL3ZlbmRvci9pbmRleC5qcyc7XG5pbXBvcnQgJy4vb25zL21pY3JvZXZlbnQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR1cChvbnMpIHtcbiAgaWYgKHdpbmRvdy5vbnMpIHtcbiAgICBvbnMuX3V0aWwud2FybignT25zZW4gVUkgaXMgbG9hZGVkIG1vcmUgdGhhbiBvbmNlLicpO1xuICB9XG5cbiAgLy8gZmFzdGNsaWNrXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgIG9ucy5mYXN0Q2xpY2sgPSBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuXG4gICAgY29uc3Qgc3VwcG9ydFRvdWNoQWN0aW9uID0gJ3RvdWNoLWFjdGlvbicgaW4gZG9jdW1lbnQuYm9keS5zdHlsZTtcblxuICAgIG9ucy5wbGF0Zm9ybS5fcnVuT25BY3R1YWxQbGF0Zm9ybSgoKSA9PiB7XG4gICAgICBpZiAob25zLnBsYXRmb3JtLmlzQW5kcm9pZCgpKSB7XG4gICAgICAgIC8vIEluIEFuZHJvaWQ0LjQrLCBjb3JyZWN0IHZpZXdwb3J0IHNldHRpbmdzIGNhbiByZW1vdmUgY2xpY2sgZGVsYXkuXG4gICAgICAgIC8vIFNvIGRpc2FibGUgRmFzdENsaWNrIG9uIEFuZHJvaWQuXG4gICAgICAgIG9ucy5mYXN0Q2xpY2suZGVzdHJveSgpO1xuICAgICAgfSBlbHNlIGlmIChvbnMucGxhdGZvcm0uaXNJT1MoKSkge1xuICAgICAgICBpZiAoc3VwcG9ydFRvdWNoQWN0aW9uICYmIChvbnMucGxhdGZvcm0uaXNJT1NTYWZhcmkoKSB8fCBvbnMucGxhdGZvcm0uaXNXS1dlYlZpZXcoKSkpIHtcbiAgICAgICAgICAvLyBJZiAndG91Y2gtYWN0aW9uJyBzdXBwb3J0ZWQgaW4gaU9TIFNhZmFyaSBvciBXS1dlYlZpZXcsIGRpc2FibGUgRmFzdENsaWNrLlxuICAgICAgICAgIG9ucy5mYXN0Q2xpY2suZGVzdHJveSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIERvIG5vdGhpbmcuICd0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbicgaGFzIG5vIGVmZmVjdCBvbiBVSVdlYlZpZXcuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgZmFsc2UpO1xuXG4gIG9ucy5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBvbnMuZW5hYmxlRGV2aWNlQmFja0J1dHRvbkhhbmRsZXIoKTtcbiAgICBvbnMuX2RlZmF1bHREZXZpY2VCYWNrQnV0dG9uSGFuZGxlciA9IG9ucy5faW50ZXJuYWwuZGJiRGlzcGF0Y2hlci5jcmVhdGVIYW5kbGVyKHdpbmRvdy5kb2N1bWVudC5ib2R5LCAoKSA9PiB7XG4gICAgICBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobmF2aWdhdG9yLCAnYXBwJykpIHtcbiAgICAgICAgbmF2aWdhdG9yLmFwcC5leGl0QXBwKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBjbG9zZSB0aGUgYXBwLiBJcyBcXCdjb3Jkb3ZhLmpzXFwnIGluY2x1ZGVkP1xcbkVycm9yOiBcXCd3aW5kb3cubmF2aWdhdG9yLmFwcFxcJyBpcyB1bmRlZmluZWQuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5fZ2VzdHVyZURldGVjdG9yID0gbmV3IG9ucy5HZXN0dXJlRGV0ZWN0b3IoZG9jdW1lbnQuYm9keSk7XG5cbiAgICAvLyBTaW11bGF0ZSBEZXZpY2UgQmFjayBCdXR0b24gb24gRVNDIHByZXNzXG4gICAgaWYgKCFvbnMucGxhdGZvcm0uaXNXZWJWaWV3KCkpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgIG9ucy5maXJlRGV2aWNlQmFja0J1dHRvbkV2ZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gc2V0dXAgbG9hZGluZyBwbGFjZWhvbGRlclxuICAgIG9ucy5fc2V0dXBMb2FkaW5nUGxhY2VIb2xkZXJzKCk7XG4gIH0pO1xuXG4gIC8vIHZpZXdwb3J0LmpzXG4gIFZpZXdwb3J0LnNldHVwKCk7XG59XG4iLCJpbXBvcnQgb25zIGZyb20gJy4vb25zJzsgLy8gRXh0ZXJuYWwgZGVwZW5kZW5jeSwgYWx3YXlzIGhvaXN0ZWRcbmltcG9ydCBzZXR1cCBmcm9tICcuL3NldHVwJztcblxuc2V0dXAob25zKTsgLy8gU2V0dXAgaW5pdGlhbCBsaXN0ZW5lcnNcblxuZXhwb3J0IGRlZmF1bHQgb25zO1xuIl0sIm5hbWVzIjpbIndpbmRvdyIsImN1c3RvbUVsZW1lbnRzIiwiZm9yY2VQb2x5ZmlsbCIsImdsb2JhbCIsIm1vZHVsZSIsIk1hdGgiLCJzZWxmIiwiRnVuY3Rpb24iLCJfX2ciLCJjb3JlIiwidmVyc2lvbiIsIl9fZSIsIml0IiwiaXNPYmplY3QiLCJUeXBlRXJyb3IiLCJleGVjIiwiZSIsInJlcXVpcmUkJDAiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImEiLCJkb2N1bWVudCIsImlzIiwiY3JlYXRlRWxlbWVudCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiUyIsImZuIiwidmFsIiwidG9TdHJpbmciLCJjYWxsIiwidmFsdWVPZiIsImRQIiwiTyIsIlAiLCJBdHRyaWJ1dGVzIiwidG9QcmltaXRpdmUiLCJJRThfRE9NX0RFRklORSIsInZhbHVlIiwiYml0bWFwIiwib2JqZWN0Iiwia2V5IiwiZiIsImNyZWF0ZURlc2MiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwicHgiLCJyYW5kb20iLCJjb25jYXQiLCJ1bmRlZmluZWQiLCJTUkMiLCJUT19TVFJJTkciLCIkdG9TdHJpbmciLCJUUEwiLCJzcGxpdCIsImluc3BlY3RTb3VyY2UiLCJzYWZlIiwiaXNGdW5jdGlvbiIsImhhcyIsImhpZGUiLCJqb2luIiwiU3RyaW5nIiwicHJvdG90eXBlIiwidGhhdCIsImxlbmd0aCIsImIiLCJjIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJQUk9UT1RZUEUiLCIkZXhwb3J0IiwidHlwZSIsIm5hbWUiLCJzb3VyY2UiLCJJU19GT1JDRUQiLCJGIiwiSVNfR0xPQkFMIiwiRyIsIklTX1NUQVRJQyIsIklTX1BST1RPIiwiSVNfQklORCIsIkIiLCJ0YXJnZXQiLCJleHBvcnRzIiwiZXhwUHJvdG8iLCJvd24iLCJvdXQiLCJleHAiLCJjdHgiLCJyZWRlZmluZSIsIlUiLCJXIiwiUiIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwic2xpY2UiLCJjb2YiLCJJT2JqZWN0IiwiZGVmaW5lZCIsImdPUEQiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJ0b0lPYmplY3QiLCJwSUUiLCJjaGVjayIsInByb3RvIiwic2V0UHJvdG90eXBlT2YiLCJ0ZXN0IiwiYnVnZ3kiLCJzZXQiLCJBcnJheSIsIl9fcHJvdG9fXyIsIlNIQVJFRCIsInN0b3JlIiwiU3ltYm9sIiwiVVNFX1NZTUJPTCIsIiRleHBvcnRzIiwidWlkIiwiVEFHIiwiQVJHIiwidHJ5R2V0IiwiVCIsImNhbGxlZSIsImNsYXNzb2YiLCJjZWlsIiwiZmxvb3IiLCJpc05hTiIsInBvcyIsInMiLCJpIiwidG9JbnRlZ2VyIiwibCIsImNoYXJDb2RlQXQiLCJjaGFyQXQiLCJtaW4iLCJtYXgiLCJpbmRleCIsIklTX0lOQ0xVREVTIiwiJHRoaXMiLCJlbCIsImZyb21JbmRleCIsInRvTGVuZ3RoIiwidG9BYnNvbHV0ZUluZGV4Iiwic2hhcmVkIiwiYXJyYXlJbmRleE9mIiwiSUVfUFJPVE8iLCJuYW1lcyIsInJlc3VsdCIsInB1c2giLCJrZXlzIiwiJGtleXMiLCJlbnVtQnVnS2V5cyIsImRlZmluZVByb3BlcnRpZXMiLCJQcm9wZXJ0aWVzIiwiZ2V0S2V5cyIsImRvY3VtZW50RWxlbWVudCIsIkVtcHR5IiwiY3JlYXRlRGljdCIsImlmcmFtZSIsImx0IiwiZ3QiLCJpZnJhbWVEb2N1bWVudCIsInN0eWxlIiwiZGlzcGxheSIsImFwcGVuZENoaWxkIiwic3JjIiwiY29udGVudFdpbmRvdyIsIm9wZW4iLCJ3cml0ZSIsImNsb3NlIiwiY3JlYXRlIiwiYW5PYmplY3QiLCJkUHMiLCJkZWYiLCJ0YWciLCJzdGF0IiwiY29uZmlndXJhYmxlIiwiSXRlcmF0b3JQcm90b3R5cGUiLCJDb25zdHJ1Y3RvciIsIk5BTUUiLCJuZXh0IiwiZGVzY3JpcHRvciIsIk9iamVjdFByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJ0b09iamVjdCIsImNvbnN0cnVjdG9yIiwiSVRFUkFUT1IiLCJCVUdHWSIsIkZGX0lURVJBVE9SIiwiS0VZUyIsIlZBTFVFUyIsInJldHVyblRoaXMiLCJCYXNlIiwiREVGQVVMVCIsIklTX1NFVCIsIkZPUkNFRCIsImdldE1ldGhvZCIsImtpbmQiLCJ2YWx1ZXMiLCJlbnRyaWVzIiwiREVGX1ZBTFVFUyIsIlZBTFVFU19CVUciLCIkbmF0aXZlIiwiJGRlZmF1bHQiLCIkZW50cmllcyIsIiRhbnlOYXRpdmUiLCJtZXRob2RzIiwiTElCUkFSWSIsIiRhdCIsIml0ZXJhdGVkIiwiX3QiLCJfaSIsInBvaW50IiwiZG9uZSIsIlVOU0NPUEFCTEVTIiwiQXJyYXlQcm90byIsIl9rIiwic3RlcCIsIkl0ZXJhdG9ycyIsIkFyZ3VtZW50cyIsImFkZFRvVW5zY29wYWJsZXMiLCJ3a3MiLCJUT19TVFJJTkdfVEFHIiwiQXJyYXlWYWx1ZXMiLCJET01JdGVyYWJsZXMiLCJjb2xsZWN0aW9ucyIsImV4cGxpY2l0IiwiQ29sbGVjdGlvbiIsIiRpdGVyYXRvcnMiLCJmb3JiaWRkZW5GaWVsZCIsIml0ZXJhdG9yIiwicmV0IiwiZ2V0SXRlcmF0b3JNZXRob2QiLCJCUkVBSyIsIlJFVFVSTiIsIml0ZXJhYmxlIiwiaXRlckZuIiwiZ2V0SXRlckZuIiwiaXNBcnJheUl0ZXIiLCJTUEVDSUVTIiwiS0VZIiwiQyIsIkRFU0NSSVBUT1JTIiwiTUVUQSIsInNldERlc2MiLCJpc0V4dGVuc2libGUiLCJGUkVFWkUiLCJwcmV2ZW50RXh0ZW5zaW9ucyIsInNldE1ldGEiLCJmYXN0S2V5IiwiZ2V0V2VhayIsInciLCJvbkZyZWV6ZSIsIm1ldGEiLCJORUVEIiwiVFlQRSIsIlNJWkUiLCJnZXRFbnRyeSIsImVudHJ5IiwiX2YiLCJuIiwiayIsIndyYXBwZXIiLCJJU19NQVAiLCJBRERFUiIsIl9sIiwiZm9yT2YiLCJjbGVhciIsInZhbGlkYXRlIiwiZGF0YSIsInIiLCJwIiwicHJldiIsImZvckVhY2giLCJjYWxsYmFja2ZuIiwidiIsIlNBRkVfQ0xPU0lORyIsInJpdGVyIiwic2tpcENsb3NpbmciLCJhcnIiLCJpdGVyIiwiY29tbW9uIiwiSVNfV0VBSyIsImZpeE1ldGhvZCIsImFkZCIsImZhaWxzIiwiZ2V0Q29uc3RydWN0b3IiLCJpbnN0YW5jZSIsIkhBU05UX0NIQUlOSU5HIiwiVEhST1dTX09OX1BSSU1JVElWRVMiLCJBQ0NFUFRfSVRFUkFCTEVTIiwiJGl0ZXJEZXRlY3QiLCJCVUdHWV9aRVJPIiwiJGluc3RhbmNlIiwiaW5oZXJpdElmUmVxdWlyZWQiLCJzZXRTdHJvbmciLCJTRVQiLCJTZXQiLCJzdHJvbmciLCJ0b0pTT04iLCJmcm9tIiwiQ09MTEVDVElPTiIsIm9mIiwiQSIsIm1hcEZuIiwibWFwcGluZyIsImNiIiwiYUZ1bmN0aW9uIiwibmV4dEl0ZW0iLCJNQVAiLCJNYXAiLCJyZXNlcnZlZFRhZ0xpc3QiLCJpc1ZhbGlkQ3VzdG9tRWxlbWVudE5hbWUiLCJsb2NhbE5hbWUiLCJyZXNlcnZlZCIsInZhbGlkRm9ybSIsImlzQ29ubmVjdGVkIiwibm9kZSIsIm5hdGl2ZVZhbHVlIiwiY3VycmVudCIsIl9fQ0VfaXNJbXBvcnREb2N1bWVudCIsIkRvY3VtZW50IiwicGFyZW50Tm9kZSIsIlNoYWRvd1Jvb3QiLCJob3N0IiwibmV4dFNpYmxpbmdPckFuY2VzdG9yU2libGluZyIsInJvb3QiLCJzdGFydCIsIm5leHRTaWJsaW5nIiwibmV4dE5vZGUiLCJmaXJzdENoaWxkIiwid2Fsa0RlZXBEZXNjZW5kYW50RWxlbWVudHMiLCJjYWxsYmFjayIsInZpc2l0ZWRJbXBvcnRzIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiZWxlbWVudCIsImdldEF0dHJpYnV0ZSIsImltcG9ydE5vZGUiLCJpbXBvcnQiLCJjaGlsZCIsInNoYWRvd1Jvb3QiLCJfX0NFX3NoYWRvd1Jvb3QiLCJzZXRQcm9wZXJ0eVVuY2hlY2tlZCIsImRlc3RpbmF0aW9uIiwiQ3VzdG9tRWxlbWVudFN0YXRlIiwiQ3VzdG9tRWxlbWVudEludGVybmFscyIsIl9sb2NhbE5hbWVUb0RlZmluaXRpb24iLCJfY29uc3RydWN0b3JUb0RlZmluaXRpb24iLCJfcGF0Y2hlcyIsIl9oYXNQYXRjaGVzIiwiZGVmaW5pdGlvbiIsImxpc3RlbmVyIiwicGF0Y2giLCJfX0NFX3BhdGNoZWQiLCJlbGVtZW50cyIsIl9fQ0Vfc3RhdGUiLCJDRVN0YXRlIiwiY3VzdG9tIiwiVXRpbGl0aWVzIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJ1cGdyYWRlRWxlbWVudCIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwiZ2F0aGVyRWxlbWVudHMiLCJyZWFkeVN0YXRlIiwiX19DRV9oYXNSZWdpc3RyeSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfX0NFX2RvY3VtZW50TG9hZEhhbmRsZWQiLCJkZWxldGUiLCJwYXRjaEFuZFVwZ3JhZGVUcmVlIiwiY3VycmVudFN0YXRlIiwibG9jYWxOYW1lVG9EZWZpbml0aW9uIiwiY29uc3RydWN0aW9uU3RhY2siLCJFcnJvciIsInBvcCIsImZhaWxlZCIsIl9fQ0VfZGVmaW5pdGlvbiIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayIsIm9ic2VydmVkQXR0cmlidXRlcyIsIl9fQ0VfaXNDb25uZWN0ZWRDYWxsYmFja0NhbGxlZCIsIm9sZFZhbHVlIiwibmV3VmFsdWUiLCJuYW1lc3BhY2UiLCJpbmRleE9mIiwiRG9jdW1lbnRDb25zdHJ1Y3Rpb25PYnNlcnZlciIsImludGVybmFscyIsImRvYyIsIl9pbnRlcm5hbHMiLCJfZG9jdW1lbnQiLCJfb2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwiX2hhbmRsZU11dGF0aW9ucyIsImJpbmQiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsIm11dGF0aW9ucyIsImFkZGVkTm9kZXMiLCJqIiwiRGVmZXJyZWQiLCJfdmFsdWUiLCJfcmVzb2x2ZSIsIl9wcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJDdXN0b21FbGVtZW50UmVnaXN0cnkiLCJfZWxlbWVudERlZmluaXRpb25Jc1J1bm5pbmciLCJfd2hlbkRlZmluZWREZWZlcnJlZCIsIl9mbHVzaENhbGxiYWNrIiwiX2ZsdXNoUGVuZGluZyIsIl91bmZsdXNoZWRMb2NhbE5hbWVzIiwiX2RvY3VtZW50Q29uc3RydWN0aW9uT2JzZXJ2ZXIiLCJTeW50YXhFcnJvciIsImFkb3B0ZWRDYWxsYmFjayIsImdldENhbGxiYWNrIiwiY2FsbGJhY2tWYWx1ZSIsInNldERlZmluaXRpb24iLCJfZmx1c2giLCJzaGlmdCIsImRlZmVycmVkIiwicmVqZWN0IiwicHJpb3IiLCJ0b1Byb21pc2UiLCJvdXRlciIsImlubmVyIiwiZmx1c2giLCJkZWZpbmUiLCJ3aGVuRGVmaW5lZCIsInBvbHlmaWxsV3JhcEZsdXNoQ2FsbGJhY2siLCJjcmVhdGVFbGVtZW50TlMiLCJjbG9uZU5vZGUiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVDaGlsZCIsInJlcGxhY2VDaGlsZCIsIkVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGVOUyIsInNldEF0dHJpYnV0ZU5TIiwicmVtb3ZlQXR0cmlidXRlTlMiLCJIVE1MRWxlbWVudCIsIkFscmVhZHlDb25zdHJ1Y3RlZE1hcmtlciIsImNvbnN0cnVjdG9yVG9EZWZpbml0aW9uIiwiTmF0aXZlIiwiRG9jdW1lbnRfY3JlYXRlRWxlbWVudCIsImxhc3RJbmRleCIsImJ1aWx0SW4iLCJub2RlcyIsImNvbm5lY3RlZEJlZm9yZSIsImZpbHRlciIsInByZXBlbmQiLCJkaXNjb25uZWN0VHJlZSIsImNvbm5lY3RUcmVlIiwiYXBwZW5kIiwiZGVlcCIsImNsb25lIiwiRG9jdW1lbnRfaW1wb3J0Tm9kZSIsInBhdGNoVHJlZSIsIk5TX0hUTUwiLCJEb2N1bWVudF9jcmVhdGVFbGVtZW50TlMiLCJEb2N1bWVudF9wcmVwZW5kIiwiRG9jdW1lbnRfYXBwZW5kIiwicmVmTm9kZSIsIkRvY3VtZW50RnJhZ21lbnQiLCJpbnNlcnRlZE5vZGVzIiwiY2hpbGROb2RlcyIsIm5hdGl2ZVJlc3VsdCIsIk5vZGVfaW5zZXJ0QmVmb3JlIiwibm9kZVdhc0Nvbm5lY3RlZCIsIk5vZGVfYXBwZW5kQ2hpbGQiLCJOb2RlX2Nsb25lTm9kZSIsIm93bmVyRG9jdW1lbnQiLCJOb2RlX3JlbW92ZUNoaWxkIiwibm9kZVRvSW5zZXJ0Iiwibm9kZVRvUmVtb3ZlIiwiTm9kZV9yZXBsYWNlQ2hpbGQiLCJub2RlVG9JbnNlcnRXYXNDb25uZWN0ZWQiLCJ0aGlzSXNDb25uZWN0ZWQiLCJwYXRjaF90ZXh0Q29udGVudCIsImJhc2VEZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImFzc2lnbmVkVmFsdWUiLCJURVhUX05PREUiLCJyZW1vdmVkTm9kZXMiLCJjaGlsZE5vZGVzTGVuZ3RoIiwiTm9kZV90ZXh0Q29udGVudCIsImFkZFBhdGNoIiwicGFydHMiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZVRleHROb2RlIiwiYmVmb3JlIiwiYWZ0ZXIiLCJ3YXNDb25uZWN0ZWQiLCJyZXBsYWNlV2l0aCIsInJlbW92ZSIsIkVsZW1lbnRfYXR0YWNoU2hhZG93IiwiaW5pdCIsIndhcm4iLCJwYXRjaF9pbm5lckhUTUwiLCJodG1sU3RyaW5nIiwicmVtb3ZlZEVsZW1lbnRzIiwiRWxlbWVudF9pbm5lckhUTUwiLCJIVE1MRWxlbWVudF9pbm5lckhUTUwiLCJyYXdEaXYiLCJpbm5lckhUTUwiLCJjb250ZW50IiwiRWxlbWVudF9zZXRBdHRyaWJ1dGUiLCJFbGVtZW50X2dldEF0dHJpYnV0ZSIsIkVsZW1lbnRfc2V0QXR0cmlidXRlTlMiLCJFbGVtZW50X2dldEF0dHJpYnV0ZU5TIiwiRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGUiLCJFbGVtZW50X3JlbW92ZUF0dHJpYnV0ZU5TIiwicGF0Y2hfaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiYmFzZU1ldGhvZCIsIndoZXJlIiwiaW5zZXJ0ZWRFbGVtZW50IiwiSFRNTEVsZW1lbnRfaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiRWxlbWVudF9pbnNlcnRBZGphY2VudEVsZW1lbnQiLCJFbGVtZW50X3ByZXBlbmQiLCJFbGVtZW50X2FwcGVuZCIsIkVsZW1lbnRfYmVmb3JlIiwiRWxlbWVudF9hZnRlciIsIkVsZW1lbnRfcmVwbGFjZVdpdGgiLCJFbGVtZW50X3JlbW92ZSIsInByaW9yQ3VzdG9tRWxlbWVudHMiLCJXZWFrTWFwIiwiY291bnRlciIsIkRhdGUiLCJub3ciLCJKc011dGF0aW9uT2JzZXJ2ZXIiLCJyZWdpc3RyYXRpb25zVGFibGUiLCJzZXRJbW1lZGlhdGUiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJzZXRUaW1lb3V0Iiwic2V0SW1tZWRpYXRlUXVldWUiLCJzZW50aW5lbCIsInF1ZXVlIiwiZnVuYyIsInBvc3RNZXNzYWdlIiwiaXNTY2hlZHVsZWQiLCJzY2hlZHVsZWRPYnNlcnZlcnMiLCJzY2hlZHVsZUNhbGxiYWNrIiwib2JzZXJ2ZXIiLCJkaXNwYXRjaENhbGxiYWNrcyIsIndyYXBJZk5lZWRlZCIsIlNoYWRvd0RPTVBvbHlmaWxsIiwib2JzZXJ2ZXJzIiwic29ydCIsIm8xIiwibzIiLCJ1aWRfIiwiYW55Tm9uRW1wdHkiLCJ0YWtlUmVjb3JkcyIsImNhbGxiYWNrXyIsInJlbW92ZVRyYW5zaWVudE9ic2VydmVyc0ZvciIsIm5vZGVzXyIsInJlZ2lzdHJhdGlvbnMiLCJyZWdpc3RyYXRpb24iLCJyZW1vdmVUcmFuc2llbnRPYnNlcnZlcnMiLCJmb3JFYWNoQW5jZXN0b3JBbmRPYnNlcnZlckVucXVldWVSZWNvcmQiLCJvcHRpb25zIiwic3VidHJlZSIsInJlY29yZCIsImVucXVldWUiLCJ1aWRDb3VudGVyIiwicmVjb3Jkc18iLCJjaGlsZExpc3QiLCJhdHRyaWJ1dGVzIiwiY2hhcmFjdGVyRGF0YSIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwiY2hhcmFjdGVyRGF0YU9sZFZhbHVlIiwicmVtb3ZlTGlzdGVuZXJzIiwiUmVnaXN0cmF0aW9uIiwiYWRkTGlzdGVuZXJzIiwic3BsaWNlIiwiY29weU9mUmVjb3JkcyIsIk11dGF0aW9uUmVjb3JkIiwicHJldmlvdXNTaWJsaW5nIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZU5hbWVzcGFjZSIsImNvcHlNdXRhdGlvblJlY29yZCIsIm9yaWdpbmFsIiwiY3VycmVudFJlY29yZCIsInJlY29yZFdpdGhPbGRWYWx1ZSIsImdldFJlY29yZCIsImdldFJlY29yZFdpdGhPbGRWYWx1ZSIsImNsZWFyUmVjb3JkcyIsInJlY29yZFJlcHJlc2VudHNDdXJyZW50TXV0YXRpb24iLCJzZWxlY3RSZWNvcmQiLCJsYXN0UmVjb3JkIiwibmV3UmVjb3JkIiwidHJhbnNpZW50T2JzZXJ2ZWROb2RlcyIsInJlY29yZHMiLCJyZWNvcmRUb1JlcGxhY2VMYXN0IiwiYWRkTGlzdGVuZXJzXyIsInJlbW92ZUxpc3RlbmVyc18iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiYXR0ck5hbWUiLCJyZWxhdGVkTm9kZSIsIm5hbWVzcGFjZVVSSSIsImF0dHJDaGFuZ2UiLCJNdXRhdGlvbkV2ZW50IiwiQURESVRJT04iLCJwcmV2VmFsdWUiLCJhZGRUcmFuc2llbnRPYnNlcnZlciIsImNoYW5nZWROb2RlIiwiX2lzUG9seWZpbGxlZCIsIm5leHRIYW5kbGUiLCJ0YXNrc0J5SGFuZGxlIiwiY3VycmVudGx5UnVubmluZ0FUYXNrIiwiYWRkRnJvbVNldEltbWVkaWF0ZUFyZ3VtZW50cyIsImFyZ3MiLCJwYXJ0aWFsbHlBcHBsaWVkIiwiaGFuZGxlciIsInJ1bklmUHJlc2VudCIsImhhbmRsZSIsInRhc2siLCJjbGVhckltbWVkaWF0ZSIsImluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uIiwibmV4dFRpY2siLCJjYW5Vc2VQb3N0TWVzc2FnZSIsImltcG9ydFNjcmlwdHMiLCJwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzIiwib2xkT25NZXNzYWdlIiwib25tZXNzYWdlIiwiaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24iLCJtZXNzYWdlUHJlZml4Iiwib25HbG9iYWxNZXNzYWdlIiwiZXZlbnQiLCJhdHRhY2hFdmVudCIsImluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uIiwiY2hhbm5lbCIsIk1lc3NhZ2VDaGFubmVsIiwicG9ydDEiLCJwb3J0MiIsImluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24iLCJodG1sIiwic2NyaXB0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwiaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbiIsImF0dGFjaFRvIiwicHJvY2VzcyIsIkZhc3RDbGljayIsImxheWVyIiwib2xkT25DbGljayIsInRyYWNraW5nQ2xpY2siLCJ0cmFja2luZ0NsaWNrU3RhcnQiLCJ0YXJnZXRFbGVtZW50IiwidG91Y2hTdGFydFgiLCJ0b3VjaFN0YXJ0WSIsImxhc3RUb3VjaElkZW50aWZpZXIiLCJ0b3VjaEJvdW5kYXJ5IiwidGFwRGVsYXkiLCJ0YXBUaW1lb3V0Iiwibm90TmVlZGVkIiwibWV0aG9kIiwiY29udGV4dCIsImRldmljZUlzQW5kcm9pZCIsIm9uTW91c2UiLCJvbkNsaWNrIiwib25Ub3VjaFN0YXJ0Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwib25Ub3VjaENhbmNlbCIsIkV2ZW50IiwiY2FwdHVyZSIsInJtdiIsImhpamFja2VkIiwiYWR2IiwicHJvcGFnYXRpb25TdG9wcGVkIiwib25jbGljayIsImRldmljZUlzV2luZG93c1Bob25lIiwiZGV2aWNlSXNJT1MiLCJkZXZpY2VJc0lPUzQiLCJkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQiLCJkZXZpY2VJc0JsYWNrQmVycnkxMCIsIm5lZWRzQ2xpY2siLCJub2RlTmFtZSIsInRvTG93ZXJDYXNlIiwiZGlzYWJsZWQiLCJjbGFzc05hbWUiLCJuZWVkc0ZvY3VzIiwicmVhZE9ubHkiLCJzZW5kQ2xpY2siLCJjbGlja0V2ZW50IiwidG91Y2giLCJhY3RpdmVFbGVtZW50IiwiYmx1ciIsImNoYW5nZWRUb3VjaGVzIiwiY3JlYXRlRXZlbnQiLCJpbml0TW91c2VFdmVudCIsImRldGVybWluZUV2ZW50VHlwZSIsInNjcmVlblgiLCJzY3JlZW5ZIiwiY2xpZW50WCIsImNsaWVudFkiLCJmb3J3YXJkZWRUb3VjaEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInRhZ05hbWUiLCJmb2N1cyIsInNldFNlbGVjdGlvblJhbmdlIiwidXBkYXRlU2Nyb2xsUGFyZW50Iiwic2Nyb2xsUGFyZW50IiwicGFyZW50RWxlbWVudCIsImZhc3RDbGlja1Njcm9sbFBhcmVudCIsImNvbnRhaW5zIiwic2Nyb2xsSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiZmFzdENsaWNrTGFzdFNjcm9sbFRvcCIsInNjcm9sbFRvcCIsImdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQiLCJldmVudFRhcmdldCIsInNlbGVjdGlvbiIsInRhcmdldFRvdWNoZXMiLCJpc0NvbnRlbnRFZGl0YWJsZSIsImdldFNlbGVjdGlvbiIsInJhbmdlQ291bnQiLCJpc0NvbGxhcHNlZCIsImlkZW50aWZpZXIiLCJwcmV2ZW50RGVmYXVsdCIsInRpbWVTdGFtcCIsInBhZ2VYIiwicGFnZVkiLCJsYXN0Q2xpY2tUaW1lIiwidG91Y2hIYXNNb3ZlZCIsImJvdW5kYXJ5IiwiYWJzIiwiZmluZENvbnRyb2wiLCJsYWJlbEVsZW1lbnQiLCJjb250cm9sIiwiaHRtbEZvciIsImdldEVsZW1lbnRCeUlkIiwicXVlcnlTZWxlY3RvciIsImZvckVsZW1lbnQiLCJ0YXJnZXRUYWdOYW1lIiwiY2FuY2VsTmV4dENsaWNrIiwiZWxlbWVudEZyb21Qb2ludCIsInBhZ2VYT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJ0b3AiLCJjYW5jZWxhYmxlIiwic3RvcFByb3BhZ2F0aW9uIiwicGVybWl0dGVkIiwiZGV0YWlsIiwiZGVzdHJveSIsIm1ldGFWaWV3cG9ydCIsImNocm9tZVZlcnNpb24iLCJibGFja2JlcnJ5VmVyc2lvbiIsImZpcmVmb3hWZXJzaW9uIiwib250b3VjaHN0YXJ0Iiwic2Nyb2xsV2lkdGgiLCJvdXRlcldpZHRoIiwibWF0Y2giLCJtc1RvdWNoQWN0aW9uIiwidG91Y2hBY3Rpb24iLCJhdHRhY2giLCJERUZBVUxUX1ZJRVdQT1JUIiwiVmlld3BvcnQiLCJ2aWV3cG9ydEVsZW1lbnQiLCJoZWFkIiwiZW5zdXJlVmlld3BvcnRFbGVtZW50IiwiaGFzQXR0cmlidXRlIiwic2V0dXAiLCJvbnMiLCJfdXRpbCIsImZhc3RDbGljayIsImJvZHkiLCJzdXBwb3J0VG91Y2hBY3Rpb24iLCJwbGF0Zm9ybSIsIl9ydW5PbkFjdHVhbFBsYXRmb3JtIiwiaXNBbmRyb2lkIiwiaXNJT1MiLCJpc0lPU1NhZmFyaSIsImlzV0tXZWJWaWV3IiwicmVhZHkiLCJlbmFibGVEZXZpY2VCYWNrQnV0dG9uSGFuZGxlciIsIl9kZWZhdWx0RGV2aWNlQmFja0J1dHRvbkhhbmRsZXIiLCJfaW50ZXJuYWwiLCJkYmJEaXNwYXRjaGVyIiwiY3JlYXRlSGFuZGxlciIsImFwcCIsImV4aXRBcHAiLCJfZ2VzdHVyZURldGVjdG9yIiwiR2VzdHVyZURldGVjdG9yIiwiaXNXZWJWaWV3Iiwia2V5Q29kZSIsImZpcmVEZXZpY2VCYWNrQnV0dG9uRXZlbnQiLCJfc2V0dXBMb2FkaW5nUGxhY2VIb2xkZXJzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxJQUFJQSxPQUFPQyxjQUFYLEVBQTJCOztXQUNoQkEsY0FBUCxDQUFzQkMsYUFBdEIsR0FBc0MsSUFBdEM7Ozs7Ozs7OztNQ0RBQyxTQUFTQyxjQUFBLEdBQWlCLE9BQU9KLE1BQVAsSUFBaUIsV0FBakIsSUFBZ0NBLE9BQU9LLElBQVAsSUFBZUEsSUFBL0MsR0FDMUJMLE1BRDBCLEdBQ2pCLE9BQU9NLElBQVAsSUFBZSxXQUFmLElBQThCQSxLQUFLRCxJQUFMLElBQWFBLElBQTNDLEdBQWtEQzs7SUFFM0RDLFNBQVMsYUFBVCxHQUhKO01BSUksT0FBT0MsR0FBUCxJQUFjLFFBQWxCLEVBQTRCQSxNQUFNTCxNQUFOOzs7O01DTHhCTSxPQUFPTCxjQUFBLEdBQWlCLEVBQUVNLFNBQVMsT0FBWCxFQUE1QjtNQUNJLE9BQU9DLEdBQVAsSUFBYyxRQUFsQixFQUE0QkEsTUFBTUYsSUFBTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0Q1QixnQkFBaUIsa0JBQUEsQ0FBVUcsRUFBVixFQUFjO1NBQ3RCLFFBQU9BLEVBQVAseUNBQU9BLEVBQVAsT0FBYyxRQUFkLEdBQXlCQSxPQUFPLElBQWhDLEdBQXVDLE9BQU9BLEVBQVAsS0FBYyxVQUE1RDtDQURGOztBQ0NBLGdCQUFpQixrQkFBQSxDQUFVQSxFQUFWLEVBQWM7TUFDekIsQ0FBQ0MsVUFBU0QsRUFBVCxDQUFMLEVBQW1CLE1BQU1FLFVBQVVGLEtBQUssb0JBQWYsQ0FBTjtTQUNaQSxFQUFQO0NBRkY7O0FDREEsYUFBaUIsZUFBQSxDQUFVRyxJQUFWLEVBQWdCO01BQzNCO1dBQ0ssQ0FBQyxDQUFDQSxNQUFUO0dBREYsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7V0FDSCxJQUFQOztDQUpKOztBQ0FBO0FBQ0EsbUJBQWlCLENBQUNDLE9BQW9CLFlBQVk7U0FDekNDLE9BQU9DLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEIsR0FBMUIsRUFBK0IsRUFBRUMsS0FBSyxlQUFZO2FBQVMsQ0FBUDtLQUFyQixFQUEvQixFQUFtRUMsQ0FBbkUsSUFBd0UsQ0FBL0U7Q0FEZ0IsQ0FBbEI7O0FDQUEsSUFBSUMsYUFBV0wsUUFBcUJLLFFBQXBDOztBQUVBLElBQUlDLEtBQUtWLFVBQVNTLFVBQVQsS0FBc0JULFVBQVNTLFdBQVNFLGFBQWxCLENBQS9CO0FBQ0EsaUJBQWlCLG1CQUFBLENBQVVaLEVBQVYsRUFBYztTQUN0QlcsS0FBS0QsV0FBU0UsYUFBVCxDQUF1QlosRUFBdkIsQ0FBTCxHQUFrQyxFQUF6QztDQURGOztBQ0pBLG9CQUFpQixDQUFDSyxZQUFELElBQThCLENBQUNRLE9BQW9CLFlBQVk7U0FDdkVQLE9BQU9DLGNBQVAsQ0FBc0JPLFdBQXlCLEtBQXpCLENBQXRCLEVBQXVELEdBQXZELEVBQTRELEVBQUVOLEtBQUssZUFBWTthQUFTLENBQVA7S0FBckIsRUFBNUQsRUFBZ0dDLENBQWhHLElBQXFHLENBQTVHO0NBRDhDLENBQWhEOztBQ0FBOzs7O0FBSUEsbUJBQWlCLHFCQUFBLENBQVVULEVBQVYsRUFBY2UsQ0FBZCxFQUFpQjtNQUM1QixDQUFDZCxVQUFTRCxFQUFULENBQUwsRUFBbUIsT0FBT0EsRUFBUDtNQUNmZ0IsRUFBSixFQUFRQyxHQUFSO01BQ0lGLEtBQUssUUFBUUMsS0FBS2hCLEdBQUdrQixRQUFoQixLQUE2QixVQUFsQyxJQUFnRCxDQUFDakIsVUFBU2dCLE1BQU1ELEdBQUdHLElBQUgsQ0FBUW5CLEVBQVIsQ0FBZixDQUFyRCxFQUFrRixPQUFPaUIsR0FBUDtNQUM5RSxRQUFRRCxLQUFLaEIsR0FBR29CLE9BQWhCLEtBQTRCLFVBQTVCLElBQTBDLENBQUNuQixVQUFTZ0IsTUFBTUQsR0FBR0csSUFBSCxDQUFRbkIsRUFBUixDQUFmLENBQS9DLEVBQTRFLE9BQU9pQixHQUFQO01BQ3hFLENBQUNGLENBQUQsSUFBTSxRQUFRQyxLQUFLaEIsR0FBR2tCLFFBQWhCLEtBQTZCLFVBQW5DLElBQWlELENBQUNqQixVQUFTZ0IsTUFBTUQsR0FBR0csSUFBSCxDQUFRbkIsRUFBUixDQUFmLENBQXRELEVBQW1GLE9BQU9pQixHQUFQO1FBQzdFZixVQUFVLHlDQUFWLENBQU47Q0FORjs7QUNEQSxJQUFJbUIsS0FBS2YsT0FBT0MsY0FBaEI7O0FBRUEsUUFBWUYsZUFBNEJDLE9BQU9DLGNBQW5DLEdBQW9ELFNBQVNBLGNBQVQsQ0FBd0JlLENBQXhCLEVBQTJCQyxDQUEzQixFQUE4QkMsVUFBOUIsRUFBMEM7WUFDL0ZGLENBQVQ7TUFDSUcsYUFBWUYsQ0FBWixFQUFlLElBQWYsQ0FBSjtZQUNTQyxVQUFUO01BQ0lFLGFBQUosRUFBb0IsSUFBSTtXQUNmTCxHQUFHQyxDQUFILEVBQU1DLENBQU4sRUFBU0MsVUFBVCxDQUFQO0dBRGtCLENBRWxCLE9BQU9wQixDQUFQLEVBQVU7TUFDUixTQUFTb0IsVUFBVCxJQUF1QixTQUFTQSxVQUFwQyxFQUFnRCxNQUFNdEIsVUFBVSwwQkFBVixDQUFOO01BQzVDLFdBQVdzQixVQUFmLEVBQTJCRixFQUFFQyxDQUFGLElBQU9DLFdBQVdHLEtBQWxCO1NBQ3BCTCxDQUFQO0NBVEY7Ozs7OztBQ0xBLG9CQUFpQixzQkFBQSxDQUFVTSxNQUFWLEVBQWtCRCxLQUFsQixFQUF5QjtTQUNqQztnQkFDTyxFQUFFQyxTQUFTLENBQVgsQ0FEUDtrQkFFUyxFQUFFQSxTQUFTLENBQVgsQ0FGVDtjQUdLLEVBQUVBLFNBQVMsQ0FBWCxDQUhMO1dBSUVEO0dBSlQ7Q0FERjs7QUNFQSxZQUFpQnRCLGVBQTRCLFVBQVV3QixNQUFWLEVBQWtCQyxHQUFsQixFQUF1QkgsS0FBdkIsRUFBOEI7U0FDbEVOLFVBQUdVLENBQUgsQ0FBS0YsTUFBTCxFQUFhQyxHQUFiLEVBQWtCRSxjQUFXLENBQVgsRUFBY0wsS0FBZCxDQUFsQixDQUFQO0NBRGUsR0FFYixVQUFVRSxNQUFWLEVBQWtCQyxHQUFsQixFQUF1QkgsS0FBdkIsRUFBOEI7U0FDekJHLEdBQVAsSUFBY0gsS0FBZDtTQUNPRSxNQUFQO0NBSkY7O0FDRkEsSUFBSUksaUJBQWlCLEdBQUdBLGNBQXhCO0FBQ0EsV0FBaUIsYUFBQSxDQUFVakMsRUFBVixFQUFjOEIsR0FBZCxFQUFtQjtTQUMzQkcsZUFBZWQsSUFBZixDQUFvQm5CLEVBQXBCLEVBQXdCOEIsR0FBeEIsQ0FBUDtDQURGOztBQ0RBLElBQUlJLEtBQUssQ0FBVDtBQUNBLElBQUlDLEtBQUsxQyxLQUFLMkMsTUFBTCxFQUFUO0FBQ0EsV0FBaUIsYUFBQSxDQUFVTixHQUFWLEVBQWU7U0FDdkIsVUFBVU8sTUFBVixDQUFpQlAsUUFBUVEsU0FBUixHQUFvQixFQUFwQixHQUF5QlIsR0FBMUMsRUFBK0MsSUFBL0MsRUFBcUQsQ0FBQyxFQUFFSSxFQUFGLEdBQU9DLEVBQVIsRUFBWWpCLFFBQVosQ0FBcUIsRUFBckIsQ0FBckQsQ0FBUDtDQURGOzs7TUNDSXFCLE1BQU1sQyxLQUFrQixLQUFsQixDQUFWO01BQ0ltQyxZQUFZLFVBQWhCO01BQ0lDLFlBQVk5QyxTQUFTNkMsU0FBVCxDQUFoQjtNQUNJRSxNQUFNLENBQUMsS0FBS0QsU0FBTixFQUFpQkUsS0FBakIsQ0FBdUJILFNBQXZCLENBQVY7O1FBRW1CSSxhQUFuQixHQUFtQyxVQUFVNUMsRUFBVixFQUFjO1dBQ3hDeUMsVUFBVXRCLElBQVYsQ0FBZW5CLEVBQWYsQ0FBUDtHQURGOztHQUlDUixjQUFBLEdBQWlCLFVBQVU4QixDQUFWLEVBQWFRLEdBQWIsRUFBa0JiLEdBQWxCLEVBQXVCNEIsSUFBdkIsRUFBNkI7UUFDekNDLGFBQWEsT0FBTzdCLEdBQVAsSUFBYyxVQUEvQjtRQUNJNkIsVUFBSixFQUFnQkMsS0FBSTlCLEdBQUosRUFBUyxNQUFULEtBQW9CK0IsTUFBSy9CLEdBQUwsRUFBVSxNQUFWLEVBQWtCYSxHQUFsQixDQUFwQjtRQUNaUixFQUFFUSxHQUFGLE1BQVdiLEdBQWYsRUFBb0I7UUFDaEI2QixVQUFKLEVBQWdCQyxLQUFJOUIsR0FBSixFQUFTc0IsR0FBVCxLQUFpQlMsTUFBSy9CLEdBQUwsRUFBVXNCLEdBQVYsRUFBZWpCLEVBQUVRLEdBQUYsSUFBUyxLQUFLUixFQUFFUSxHQUFGLENBQWQsR0FBdUJZLElBQUlPLElBQUosQ0FBU0MsT0FBT3BCLEdBQVAsQ0FBVCxDQUF0QyxDQUFqQjtRQUNaUixNQUFNL0IsT0FBVixFQUFrQjtRQUNkdUMsR0FBRixJQUFTYixHQUFUO0tBREYsTUFFTyxJQUFJLENBQUM0QixJQUFMLEVBQVc7YUFDVHZCLEVBQUVRLEdBQUYsQ0FBUDtZQUNLUixDQUFMLEVBQVFRLEdBQVIsRUFBYWIsR0FBYjtLQUZLLE1BR0EsSUFBSUssRUFBRVEsR0FBRixDQUFKLEVBQVk7UUFDZkEsR0FBRixJQUFTYixHQUFUO0tBREssTUFFQTtZQUNBSyxDQUFMLEVBQVFRLEdBQVIsRUFBYWIsR0FBYjs7O0dBYkosRUFnQkd0QixTQUFTd0QsU0FoQlosRUFnQnVCWCxTQWhCdkIsRUFnQmtDLFNBQVN0QixRQUFULEdBQW9CO1dBQzdDLE9BQU8sSUFBUCxJQUFlLFVBQWYsSUFBNkIsS0FBS3FCLEdBQUwsQ0FBN0IsSUFBMENFLFVBQVV0QixJQUFWLENBQWUsSUFBZixDQUFqRDtHQWpCRjs7O0FDWkEsaUJBQWlCLG1CQUFBLENBQVVuQixFQUFWLEVBQWM7TUFDekIsT0FBT0EsRUFBUCxJQUFhLFVBQWpCLEVBQTZCLE1BQU1FLFVBQVVGLEtBQUsscUJBQWYsQ0FBTjtTQUN0QkEsRUFBUDtDQUZGOztBQ0FBOztBQUVBLFdBQWlCLGFBQUEsQ0FBVWdCLEVBQVYsRUFBY29DLElBQWQsRUFBb0JDLE1BQXBCLEVBQTRCO2FBQ2pDckMsRUFBVjtNQUNJb0MsU0FBU2QsU0FBYixFQUF3QixPQUFPdEIsRUFBUDtVQUNoQnFDLE1BQVI7U0FDTyxDQUFMO2FBQWUsVUFBVTVDLENBQVYsRUFBYTtlQUNuQk8sR0FBR0csSUFBSCxDQUFRaUMsSUFBUixFQUFjM0MsQ0FBZCxDQUFQO09BRE07U0FHSCxDQUFMO2FBQWUsVUFBVUEsQ0FBVixFQUFhNkMsQ0FBYixFQUFnQjtlQUN0QnRDLEdBQUdHLElBQUgsQ0FBUWlDLElBQVIsRUFBYzNDLENBQWQsRUFBaUI2QyxDQUFqQixDQUFQO09BRE07U0FHSCxDQUFMO2FBQWUsVUFBVTdDLENBQVYsRUFBYTZDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CO2VBQ3pCdkMsR0FBR0csSUFBSCxDQUFRaUMsSUFBUixFQUFjM0MsQ0FBZCxFQUFpQjZDLENBQWpCLEVBQW9CQyxDQUFwQixDQUFQO09BRE07O1NBSUgseUJBQXlCO1dBQ3ZCdkMsR0FBR3dDLEtBQUgsQ0FBU0osSUFBVCxFQUFlSyxTQUFmLENBQVA7R0FERjtDQWRGOztBQ0dBLElBQUlDLFlBQVksV0FBaEI7O0FBRUEsSUFBSUMsVUFBVSxTQUFWQSxPQUFVLENBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxNQUF0QixFQUE4QjtNQUN0Q0MsWUFBWUgsT0FBT0QsUUFBUUssQ0FBL0I7TUFDSUMsWUFBWUwsT0FBT0QsUUFBUU8sQ0FBL0I7TUFDSUMsWUFBWVAsT0FBT0QsUUFBUTVDLENBQS9CO01BQ0lxRCxXQUFXUixPQUFPRCxRQUFRcEMsQ0FBOUI7TUFDSThDLFVBQVVULE9BQU9ELFFBQVFXLENBQTdCO01BQ0lDLFNBQVNOLFlBQVkxRSxPQUFaLEdBQXFCNEUsWUFBWTVFLFFBQU9zRSxJQUFQLE1BQWlCdEUsUUFBT3NFLElBQVAsSUFBZSxFQUFoQyxDQUFaLEdBQWtELENBQUN0RSxRQUFPc0UsSUFBUCxLQUFnQixFQUFqQixFQUFxQkgsU0FBckIsQ0FBcEY7TUFDSWMsVUFBVVAsWUFBWXBFLEtBQVosR0FBbUJBLE1BQUtnRSxJQUFMLE1BQWVoRSxNQUFLZ0UsSUFBTCxJQUFhLEVBQTVCLENBQWpDO01BQ0lZLFdBQVdELFFBQVFkLFNBQVIsTUFBdUJjLFFBQVFkLFNBQVIsSUFBcUIsRUFBNUMsQ0FBZjtNQUNJNUIsR0FBSixFQUFTNEMsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxHQUFuQjtNQUNJWCxTQUFKLEVBQWVILFNBQVNELElBQVQ7T0FDVi9CLEdBQUwsSUFBWWdDLE1BQVosRUFBb0I7O1VBRVosQ0FBQ0MsU0FBRCxJQUFjUSxNQUFkLElBQXdCQSxPQUFPekMsR0FBUCxNQUFnQlEsU0FBOUM7O1VBRU0sQ0FBQ29DLE1BQU1ILE1BQU4sR0FBZVQsTUFBaEIsRUFBd0JoQyxHQUF4QixDQUFOOztVQUVNdUMsV0FBV0ssR0FBWCxHQUFpQkcsS0FBSUYsR0FBSixFQUFTcEYsT0FBVCxDQUFqQixHQUFvQzZFLFlBQVksT0FBT08sR0FBUCxJQUFjLFVBQTFCLEdBQXVDRSxLQUFJbEYsU0FBU3dCLElBQWIsRUFBbUJ3RCxHQUFuQixDQUF2QyxHQUFpRUEsR0FBM0c7O1FBRUlKLE1BQUosRUFBWU8sVUFBU1AsTUFBVCxFQUFpQnpDLEdBQWpCLEVBQXNCNkMsR0FBdEIsRUFBMkJmLE9BQU9ELFFBQVFvQixDQUExQzs7UUFFUlAsUUFBUTFDLEdBQVIsS0FBZ0I2QyxHQUFwQixFQUF5QjNCLE1BQUt3QixPQUFMLEVBQWMxQyxHQUFkLEVBQW1COEMsR0FBbkI7UUFDckJSLFlBQVlLLFNBQVMzQyxHQUFULEtBQWlCNkMsR0FBakMsRUFBc0NGLFNBQVMzQyxHQUFULElBQWdCNkMsR0FBaEI7O0NBdEIxQztBQXlCQXBGLFFBQU9NLElBQVAsR0FBY0EsS0FBZDs7QUFFQThELFFBQVFLLENBQVIsR0FBWSxDQUFaO0FBQ0FMLFFBQVFPLENBQVIsR0FBWSxDQUFaO0FBQ0FQLFFBQVE1QyxDQUFSLEdBQVksQ0FBWjtBQUNBNEMsUUFBUXBDLENBQVIsR0FBWSxDQUFaO0FBQ0FvQyxRQUFRVyxDQUFSLEdBQVksRUFBWjtBQUNBWCxRQUFRcUIsQ0FBUixHQUFZLEVBQVo7QUFDQXJCLFFBQVFvQixDQUFSLEdBQVksRUFBWjtBQUNBcEIsUUFBUXNCLENBQVIsR0FBWSxHQUFaO0FBQ0EsY0FBaUJ0QixPQUFqQjs7QUMxQ0EsVUFBWSxHQUFHdUIsb0JBQWY7Ozs7OztBQ0FBLElBQUloRSxXQUFXLEdBQUdBLFFBQWxCOztBQUVBLFdBQWlCLGFBQUEsQ0FBVWxCLEVBQVYsRUFBYztTQUN0QmtCLFNBQVNDLElBQVQsQ0FBY25CLEVBQWQsRUFBa0JtRixLQUFsQixDQUF3QixDQUF4QixFQUEyQixDQUFDLENBQTVCLENBQVA7Q0FERjs7QUNGQTs7O0FBR0EsZUFBaUI3RSxPQUFPLEdBQVAsRUFBWTRFLG9CQUFaLENBQWlDLENBQWpDLElBQXNDNUUsTUFBdEMsR0FBK0MsVUFBVU4sRUFBVixFQUFjO1NBQ3JFb0YsS0FBSXBGLEVBQUosS0FBVyxRQUFYLEdBQXNCQSxHQUFHMkMsS0FBSCxDQUFTLEVBQVQsQ0FBdEIsR0FBcUNyQyxPQUFPTixFQUFQLENBQTVDO0NBREY7O0FDSEE7QUFDQSxlQUFpQixpQkFBQSxDQUFVQSxFQUFWLEVBQWM7TUFDekJBLE1BQU1zQyxTQUFWLEVBQXFCLE1BQU1wQyxVQUFVLDJCQUEyQkYsRUFBckMsQ0FBTjtTQUNkQSxFQUFQO0NBRkY7O0FDREE7OztBQUdBLGlCQUFpQixtQkFBQSxDQUFVQSxFQUFWLEVBQWM7U0FDdEJxRixTQUFRQyxTQUFRdEYsRUFBUixDQUFSLENBQVA7Q0FERjs7QUNHQSxJQUFJdUYsT0FBT2pGLE9BQU9rRix3QkFBbEI7O0FBRUEsVUFBWW5GLGVBQTRCa0YsSUFBNUIsR0FBbUMsU0FBU0Msd0JBQVQsQ0FBa0NsRSxDQUFsQyxFQUFxQ0MsQ0FBckMsRUFBd0M7TUFDakZrRSxXQUFVbkUsQ0FBVixDQUFKO01BQ0lHLGFBQVlGLENBQVosRUFBZSxJQUFmLENBQUo7TUFDSUcsYUFBSixFQUFvQixJQUFJO1dBQ2Y2RCxLQUFLakUsQ0FBTCxFQUFRQyxDQUFSLENBQVA7R0FEa0IsQ0FFbEIsT0FBT25CLENBQVAsRUFBVTtNQUNSMkMsS0FBSXpCLENBQUosRUFBT0MsQ0FBUCxDQUFKLEVBQWUsT0FBT1MsY0FBVyxDQUFDMEQsV0FBSTNELENBQUosQ0FBTVosSUFBTixDQUFXRyxDQUFYLEVBQWNDLENBQWQsQ0FBWixFQUE4QkQsRUFBRUMsQ0FBRixDQUE5QixDQUFQO0NBTmpCOzs7Ozs7QUNSQTs7O0FBSUEsSUFBSW9FLFFBQVEsU0FBUkEsS0FBUSxDQUFVckUsQ0FBVixFQUFhc0UsS0FBYixFQUFvQjtZQUNyQnRFLENBQVQ7TUFDSSxDQUFDckIsVUFBUzJGLEtBQVQsQ0FBRCxJQUFvQkEsVUFBVSxJQUFsQyxFQUF3QyxNQUFNMUYsVUFBVTBGLFFBQVEsMkJBQWxCLENBQU47Q0FGMUM7QUFJQSxnQkFBaUI7T0FDVnRGLE9BQU91RixjQUFQLEtBQTBCLGVBQWUsRUFBZjtZQUNuQkMsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUJDLEdBQXZCLEVBQTRCO1FBQ3RCO1lBQ0kzRixLQUFrQlYsU0FBU3dCLElBQTNCLEVBQWlDTixZQUEwQmtCLENBQTFCLENBQTRCekIsT0FBTzZDLFNBQW5DLEVBQThDLFdBQTlDLEVBQTJENkMsR0FBNUYsRUFBaUcsQ0FBakcsQ0FBTjtVQUNJRixJQUFKLEVBQVUsRUFBVjtjQUNRLEVBQUVBLGdCQUFnQkcsS0FBbEIsQ0FBUjtLQUhGLENBSUUsT0FBTzdGLENBQVAsRUFBVTtjQUFVLElBQVI7O1dBQ1AsU0FBU3lGLGNBQVQsQ0FBd0J2RSxDQUF4QixFQUEyQnNFLEtBQTNCLEVBQWtDO1lBQ2pDdEUsQ0FBTixFQUFTc0UsS0FBVDtVQUNJRyxLQUFKLEVBQVd6RSxFQUFFNEUsU0FBRixHQUFjTixLQUFkLENBQVgsS0FDS0ksSUFBSTFFLENBQUosRUFBT3NFLEtBQVA7YUFDRXRFLENBQVA7S0FKRjtHQU5GLENBWUUsRUFaRixFQVlNLEtBWk4sQ0FENkIsR0FhZGdCLFNBYlosQ0FEVTtTQWVScUQ7Q0FmVDs7QUNSQTs7QUFFQWhDLFFBQVFBLFFBQVE1QyxDQUFoQixFQUFtQixRQUFuQixFQUE2QixFQUFFOEUsZ0JBQWdCeEYsVUFBd0IyRixHQUExQyxFQUE3Qjs7QUNEQSxJQUFJRyxTQUFTLG9CQUFiO0FBQ0EsSUFBSUMsUUFBUTdHLFFBQU80RyxNQUFQLE1BQW1CNUcsUUFBTzRHLE1BQVAsSUFBaUIsRUFBcEMsQ0FBWjtBQUNBLGNBQWlCLGdCQUFBLENBQVVyRSxHQUFWLEVBQWU7U0FDdkJzRSxNQUFNdEUsR0FBTixNQUFlc0UsTUFBTXRFLEdBQU4sSUFBYSxFQUE1QixDQUFQO0NBREY7OztNQ0hJc0UsUUFBUS9GLFFBQXFCLEtBQXJCLENBQVo7O01BRUlnRyxVQUFTeEYsUUFBcUJ3RixNQUFsQztNQUNJQyxhQUFhLE9BQU9ELE9BQVAsSUFBaUIsVUFBbEM7O01BRUlFLFdBQVcvRyxjQUFBLEdBQWlCLFVBQVVxRSxJQUFWLEVBQWdCO1dBQ3ZDdUMsTUFBTXZDLElBQU4sTUFBZ0J1QyxNQUFNdkMsSUFBTixJQUNyQnlDLGNBQWNELFFBQU94QyxJQUFQLENBQWQsSUFBOEIsQ0FBQ3lDLGFBQWFELE9BQWIsR0FBc0JHLElBQXZCLEVBQTRCLFlBQVkzQyxJQUF4QyxDQUR6QixDQUFQO0dBREY7O1dBS1N1QyxLQUFULEdBQWlCQSxLQUFqQjs7O0FDVkE7O0FBRUEsSUFBSUssTUFBTXBHLEtBQWtCLGFBQWxCLENBQVY7O0FBRUEsSUFBSXFHLE1BQU10QixLQUFJLFlBQVk7U0FBUzNCLFNBQVA7Q0FBZCxFQUFKLEtBQTRDLFdBQXREOzs7QUFHQSxJQUFJa0QsU0FBUyxTQUFUQSxNQUFTLENBQVUzRyxFQUFWLEVBQWM4QixHQUFkLEVBQW1CO01BQzFCO1dBQ0s5QixHQUFHOEIsR0FBSCxDQUFQO0dBREYsQ0FFRSxPQUFPMUIsQ0FBUCxFQUFVO0NBSGQ7O0FBTUEsZUFBaUIsaUJBQUEsQ0FBVUosRUFBVixFQUFjO01BQ3pCc0IsQ0FBSixFQUFPc0YsQ0FBUCxFQUFVdEMsQ0FBVjtTQUNPdEUsT0FBT3NDLFNBQVAsR0FBbUIsV0FBbkIsR0FBaUN0QyxPQUFPLElBQVAsR0FBYzs7SUFFbEQsUUFBUTRHLElBQUlELE9BQU9yRixJQUFJaEIsT0FBT04sRUFBUCxDQUFYLEVBQXVCeUcsR0FBdkIsQ0FBWixLQUE0QyxRQUE1QyxHQUF1REc7O0lBRXZERixNQUFNdEIsS0FBSTlELENBQUo7O0lBRU4sQ0FBQ2dELElBQUljLEtBQUk5RCxDQUFKLENBQUwsS0FBZ0IsUUFBaEIsSUFBNEIsT0FBT0EsRUFBRXVGLE1BQVQsSUFBbUIsVUFBL0MsR0FBNEQsV0FBNUQsR0FBMEV2QyxDQU45RTtDQUZGOztBQ2JBOzs7QUFHQSxJQUFJd0IsT0FBTyxFQUFYO0FBQ0FBLEtBQUt6RixLQUFrQixhQUFsQixDQUFMLElBQXlDLEdBQXpDO0FBQ0EsSUFBSXlGLE9BQU8sRUFBUCxJQUFhLFlBQWpCLEVBQStCO1lBQ054RixPQUFPNkMsU0FBOUIsRUFBeUMsVUFBekMsRUFBcUQsU0FBU2pDLFFBQVQsR0FBb0I7V0FDaEUsYUFBYTRGLFNBQVEsSUFBUixDQUFiLEdBQTZCLEdBQXBDO0dBREYsRUFFRyxJQUZIOzs7QUNORjtBQUNBLElBQUlDLE9BQU90SCxLQUFLc0gsSUFBaEI7QUFDQSxJQUFJQyxRQUFRdkgsS0FBS3VILEtBQWpCO0FBQ0EsaUJBQWlCLG1CQUFBLENBQVVoSCxFQUFWLEVBQWM7U0FDdEJpSCxNQUFNakgsS0FBSyxDQUFDQSxFQUFaLElBQWtCLENBQWxCLEdBQXNCLENBQUNBLEtBQUssQ0FBTCxHQUFTZ0gsS0FBVCxHQUFpQkQsSUFBbEIsRUFBd0IvRyxFQUF4QixDQUE3QjtDQURGOztBQ0RBOztBQUVBLGdCQUFpQixrQkFBQSxDQUFVd0MsU0FBVixFQUFxQjtTQUM3QixVQUFVWSxJQUFWLEVBQWdCOEQsR0FBaEIsRUFBcUI7UUFDdEJDLElBQUlqRSxPQUFPb0MsU0FBUWxDLElBQVIsQ0FBUCxDQUFSO1FBQ0lnRSxJQUFJQyxXQUFVSCxHQUFWLENBQVI7UUFDSUksSUFBSUgsRUFBRTlELE1BQVY7UUFDSTVDLENBQUosRUFBTzZDLENBQVA7UUFDSThELElBQUksQ0FBSixJQUFTQSxLQUFLRSxDQUFsQixFQUFxQixPQUFPOUUsWUFBWSxFQUFaLEdBQWlCRixTQUF4QjtRQUNqQjZFLEVBQUVJLFVBQUYsQ0FBYUgsQ0FBYixDQUFKO1dBQ08zRyxJQUFJLE1BQUosSUFBY0EsSUFBSSxNQUFsQixJQUE0QjJHLElBQUksQ0FBSixLQUFVRSxDQUF0QyxJQUEyQyxDQUFDaEUsSUFBSTZELEVBQUVJLFVBQUYsQ0FBYUgsSUFBSSxDQUFqQixDQUFMLElBQTRCLE1BQXZFLElBQWlGOUQsSUFBSSxNQUFyRixHQUNIZCxZQUFZMkUsRUFBRUssTUFBRixDQUFTSixDQUFULENBQVosR0FBMEIzRyxDQUR2QixHQUVIK0IsWUFBWTJFLEVBQUVoQyxLQUFGLENBQVFpQyxDQUFSLEVBQVdBLElBQUksQ0FBZixDQUFaLEdBQWdDLENBQUMzRyxJQUFJLE1BQUosSUFBYyxFQUFmLEtBQXNCNkMsSUFBSSxNQUExQixJQUFvQyxPQUZ4RTtHQVBGO0NBREY7O0FDSkEsZUFBaUIsS0FBakI7O0FDQUEsaUJBQWlCLEVBQWpCOztBQ0FBOztBQUVBLElBQUltRSxNQUFNaEksS0FBS2dJLEdBQWY7QUFDQSxnQkFBaUIsa0JBQUEsQ0FBVXpILEVBQVYsRUFBYztTQUN0QkEsS0FBSyxDQUFMLEdBQVN5SCxJQUFJSixXQUFVckgsRUFBVixDQUFKLEVBQW1CLGdCQUFuQixDQUFULEdBQWdELENBQXZELENBRDZCO0NBQS9COztBQ0ZBLElBQUkwSCxNQUFNakksS0FBS2lJLEdBQWY7QUFDQSxJQUFJRCxRQUFNaEksS0FBS2dJLEdBQWY7QUFDQSx1QkFBaUIseUJBQUEsQ0FBVUUsS0FBVixFQUFpQnRFLE1BQWpCLEVBQXlCO1VBQ2hDZ0UsV0FBVU0sS0FBVixDQUFSO1NBQ09BLFFBQVEsQ0FBUixHQUFZRCxJQUFJQyxRQUFRdEUsTUFBWixFQUFvQixDQUFwQixDQUFaLEdBQXFDb0UsTUFBSUUsS0FBSixFQUFXdEUsTUFBWCxDQUE1QztDQUZGOztBQ0hBOzs7O0FBS0EscUJBQWlCLHVCQUFBLENBQVV1RSxXQUFWLEVBQXVCO1NBQy9CLFVBQVVDLEtBQVYsRUFBaUJDLEVBQWpCLEVBQXFCQyxTQUFyQixFQUFnQztRQUNqQ3pHLElBQUltRSxXQUFVb0MsS0FBVixDQUFSO1FBQ0l4RSxTQUFTMkUsVUFBUzFHLEVBQUUrQixNQUFYLENBQWI7UUFDSXNFLFFBQVFNLGlCQUFnQkYsU0FBaEIsRUFBMkIxRSxNQUEzQixDQUFaO1FBQ0kxQixLQUFKOzs7UUFHSWlHLGVBQWVFLE1BQU1BLEVBQXpCLEVBQTZCLE9BQU96RSxTQUFTc0UsS0FBaEIsRUFBdUI7Y0FDMUNyRyxFQUFFcUcsT0FBRixDQUFSOztVQUVJaEcsU0FBU0EsS0FBYixFQUFvQixPQUFPLElBQVA7O0tBSHRCLE1BS08sT0FBTTBCLFNBQVNzRSxLQUFmLEVBQXNCQSxPQUF0QjtVQUFtQ0MsZUFBZUQsU0FBU3JHLENBQTVCLEVBQStCO1lBQy9EQSxFQUFFcUcsS0FBRixNQUFhRyxFQUFqQixFQUFxQixPQUFPRixlQUFlRCxLQUFmLElBQXdCLENBQS9COztLQUNyQixPQUFPLENBQUNDLFdBQUQsSUFBZ0IsQ0FBQyxDQUF4QjtHQWRKO0NBREY7O0FDTEEsSUFBSU0sU0FBUzdILFFBQXFCLE1BQXJCLENBQWI7O0FBRUEsaUJBQWlCLG1CQUFBLENBQVV5QixHQUFWLEVBQWU7U0FDdkJvRyxPQUFPcEcsR0FBUCxNQUFnQm9HLE9BQU9wRyxHQUFQLElBQWMwRSxLQUFJMUUsR0FBSixDQUE5QixDQUFQO0NBREY7O0FDQUEsSUFBSXFHLGVBQWU5SCxlQUE2QixLQUE3QixDQUFuQjtBQUNBLElBQUkrSCxhQUFXdkgsV0FBeUIsVUFBekIsQ0FBZjs7QUFFQSwwQkFBaUIsNEJBQUEsQ0FBVWdCLE1BQVYsRUFBa0J3RyxLQUFsQixFQUF5QjtNQUNwQy9HLElBQUltRSxXQUFVNUQsTUFBVixDQUFSO01BQ0l1RixJQUFJLENBQVI7TUFDSWtCLFNBQVMsRUFBYjtNQUNJeEcsR0FBSjtPQUNLQSxHQUFMLElBQVlSLENBQVo7UUFBbUJRLE9BQU9zRyxVQUFYLEVBQXFCckYsS0FBSXpCLENBQUosRUFBT1EsR0FBUCxLQUFld0csT0FBT0MsSUFBUCxDQUFZekcsR0FBWixDQUFmO0dBTEk7U0FPakN1RyxNQUFNaEYsTUFBTixHQUFlK0QsQ0FBdEI7UUFBNkJyRSxLQUFJekIsQ0FBSixFQUFPUSxNQUFNdUcsTUFBTWpCLEdBQU4sQ0FBYixDQUFKLEVBQThCO09BQ3BEZSxhQUFhRyxNQUFiLEVBQXFCeEcsR0FBckIsQ0FBRCxJQUE4QndHLE9BQU9DLElBQVAsQ0FBWXpHLEdBQVosQ0FBOUI7O0dBRUYsT0FBT3dHLE1BQVA7Q0FWRjs7QUNMQTtBQUNBLG1CQUNFLCtGQURlLENBRWYzRixLQUZlLENBRVQsR0FGUyxDQUFqQjs7QUNEQTs7O0FBSUEsa0JBQWlCckMsT0FBT2tJLElBQVAsSUFBZSxTQUFTQSxJQUFULENBQWNsSCxDQUFkLEVBQWlCO1NBQ3hDbUgsb0JBQU1uSCxDQUFOLEVBQVNvSCxZQUFULENBQVA7Q0FERjs7QUNBQSxpQkFBaUJySSxlQUE0QkMsT0FBT3FJLGdCQUFuQyxHQUFzRCxTQUFTQSxnQkFBVCxDQUEwQnJILENBQTFCLEVBQTZCc0gsVUFBN0IsRUFBeUM7WUFDckd0SCxDQUFUO01BQ0lrSCxPQUFPSyxZQUFRRCxVQUFSLENBQVg7TUFDSXZGLFNBQVNtRixLQUFLbkYsTUFBbEI7TUFDSStELElBQUksQ0FBUjtNQUNJN0YsQ0FBSjtTQUNPOEIsU0FBUytELENBQWhCO2NBQXNCckYsQ0FBSCxDQUFLVCxDQUFMLEVBQVFDLElBQUlpSCxLQUFLcEIsR0FBTCxDQUFaLEVBQXVCd0IsV0FBV3JILENBQVgsQ0FBdkI7R0FDbkIsT0FBT0QsQ0FBUDtDQVBGOztBQ0pBLElBQUlaLGFBQVdMLFFBQXFCSyxRQUFwQztBQUNBLFlBQWlCQSxjQUFZQSxXQUFTb0ksZUFBdEM7O0FDREE7OztBQUlBLElBQUlWLFdBQVcvSCxXQUF5QixVQUF6QixDQUFmO0FBQ0EsSUFBSTBJLFFBQVEsU0FBUkEsS0FBUSxHQUFZLGFBQXhCO0FBQ0EsSUFBSXJGLGNBQVksV0FBaEI7OztBQUdBLElBQUlzRixjQUFhLHNCQUFZOztNQUV2QkMsU0FBU3BJLFdBQXlCLFFBQXpCLENBQWI7TUFDSXVHLElBQUlzQixhQUFZckYsTUFBcEI7TUFDSTZGLEtBQUssR0FBVDtNQUNJQyxLQUFLLEdBQVQ7TUFDSUMsY0FBSjtTQUNPQyxLQUFQLENBQWFDLE9BQWIsR0FBdUIsTUFBdkI7UUFDbUJDLFdBQW5CLENBQStCTixNQUEvQjtTQUNPTyxHQUFQLEdBQWEsYUFBYixDQVQyQjs7O21CQVlWUCxPQUFPUSxhQUFQLENBQXFCL0ksUUFBdEM7aUJBQ2VnSixJQUFmO2lCQUNlQyxLQUFmLENBQXFCVCxLQUFLLFFBQUwsR0FBZ0JDLEVBQWhCLEdBQXFCLG1CQUFyQixHQUEyQ0QsRUFBM0MsR0FBZ0QsU0FBaEQsR0FBNERDLEVBQWpGO2lCQUNlUyxLQUFmO2dCQUNhUixlQUFlcEYsQ0FBNUI7U0FDT29ELEdBQVA7V0FBbUI0QixZQUFXdEYsV0FBWCxFQUFzQmdGLGFBQVl0QixDQUFaLENBQXRCLENBQVA7R0FDWixPQUFPNEIsYUFBUDtDQWxCRjs7QUFxQkEsb0JBQWlCMUksT0FBT3VKLE1BQVAsSUFBaUIsU0FBU0EsTUFBVCxDQUFnQnZJLENBQWhCLEVBQW1Cc0gsVUFBbkIsRUFBK0I7TUFDM0ROLE1BQUo7TUFDSWhILE1BQU0sSUFBVixFQUFnQjtVQUNSb0MsV0FBTixJQUFtQm9HLFVBQVN4SSxDQUFULENBQW5CO2FBQ1MsSUFBSXlILEtBQUosRUFBVDtVQUNNckYsV0FBTixJQUFtQixJQUFuQjs7V0FFTzBFLFFBQVAsSUFBbUI5RyxDQUFuQjtHQUxGLE1BTU9nSCxTQUFTVSxhQUFUO1NBQ0FKLGVBQWV0RyxTQUFmLEdBQTJCZ0csTUFBM0IsR0FBb0N5QixXQUFJekIsTUFBSixFQUFZTSxVQUFaLENBQTNDO0NBVEY7O0FDOUJBLElBQUlvQixNQUFNM0osVUFBd0IwQixDQUFsQzs7QUFFQSxJQUFJMEUsUUFBTTVGLEtBQWtCLGFBQWxCLENBQVY7O0FBRUEsc0JBQWlCLHdCQUFBLENBQVViLEVBQVYsRUFBY2lLLEdBQWQsRUFBbUJDLElBQW5CLEVBQXlCO01BQ3BDbEssTUFBTSxDQUFDK0MsS0FBSS9DLEtBQUtrSyxPQUFPbEssRUFBUCxHQUFZQSxHQUFHbUQsU0FBeEIsRUFBbUNzRCxLQUFuQyxDQUFYLEVBQW9EdUQsSUFBSWhLLEVBQUosRUFBUXlHLEtBQVIsRUFBYSxFQUFFMEQsY0FBYyxJQUFoQixFQUFzQnhJLE9BQU9zSSxHQUE3QixFQUFiO0NBRHREOztBQ0pBOztBQUlBLElBQUlHLG9CQUFvQixFQUF4Qjs7O0FBR0EvSixNQUFtQitKLGlCQUFuQixFQUFzQ3ZKLEtBQWtCLFVBQWxCLENBQXRDLEVBQXFFLFlBQVk7U0FBUyxJQUFQO0NBQW5GOztBQUVBLGtCQUFpQixvQkFBQSxDQUFVd0osV0FBVixFQUF1QkMsSUFBdkIsRUFBNkJDLElBQTdCLEVBQW1DO2NBQ3RDcEgsU0FBWixHQUF3QjBHLGNBQU9PLGlCQUFQLEVBQTBCLEVBQUVHLE1BQU1DLGNBQVcsQ0FBWCxFQUFjRCxJQUFkLENBQVIsRUFBMUIsQ0FBeEI7a0JBQ2VGLFdBQWYsRUFBNEJDLE9BQU8sV0FBbkM7Q0FGRjs7QUNUQTs7QUFFQSxnQkFBaUIsa0JBQUEsQ0FBVXRLLEVBQVYsRUFBYztTQUN0Qk0sT0FBT2dGLFNBQVF0RixFQUFSLENBQVAsQ0FBUDtDQURGOztBQ0ZBOzs7QUFHQSxJQUFJb0ksYUFBVy9ILFdBQXlCLFVBQXpCLENBQWY7QUFDQSxJQUFJb0ssY0FBY25LLE9BQU82QyxTQUF6Qjs7QUFFQSxpQkFBaUI3QyxPQUFPb0ssY0FBUCxJQUF5QixVQUFVcEosQ0FBVixFQUFhO01BQ2pEcUosVUFBU3JKLENBQVQsQ0FBSjtNQUNJeUIsS0FBSXpCLENBQUosRUFBTzhHLFVBQVAsQ0FBSixFQUFzQixPQUFPOUcsRUFBRThHLFVBQUYsQ0FBUDtNQUNsQixPQUFPOUcsRUFBRXNKLFdBQVQsSUFBd0IsVUFBeEIsSUFBc0N0SixhQUFhQSxFQUFFc0osV0FBekQsRUFBc0U7V0FDN0R0SixFQUFFc0osV0FBRixDQUFjekgsU0FBckI7R0FDQSxPQUFPN0IsYUFBYWhCLE1BQWIsR0FBc0JtSyxXQUF0QixHQUFvQyxJQUEzQztDQUxKOztBQ05BOztBQVVBLElBQUlJLFdBQVd4SyxLQUFrQixVQUFsQixDQUFmO0FBQ0EsSUFBSXlLLFFBQVEsRUFBRSxHQUFHdEMsSUFBSCxJQUFXLFVBQVUsR0FBR0EsSUFBSCxFQUF2QixDQUFaO0FBQ0EsSUFBSXVDLGNBQWMsWUFBbEI7QUFDQSxJQUFJQyxPQUFPLE1BQVg7QUFDQSxJQUFJQyxTQUFTLFFBQWI7O0FBRUEsSUFBSUMsYUFBYSxTQUFiQSxVQUFhLEdBQVk7U0FBUyxJQUFQO0NBQS9COztBQUVBLGtCQUFpQixvQkFBQSxDQUFVQyxJQUFWLEVBQWdCYixJQUFoQixFQUFzQkQsV0FBdEIsRUFBbUNFLElBQW5DLEVBQXlDYSxPQUF6QyxFQUFrREMsTUFBbEQsRUFBMERDLE1BQTFELEVBQWtFO2NBQ3JFakIsV0FBWixFQUF5QkMsSUFBekIsRUFBK0JDLElBQS9CO01BQ0lnQixZQUFZLFNBQVpBLFNBQVksQ0FBVUMsSUFBVixFQUFnQjtRQUMxQixDQUFDVixLQUFELElBQVVVLFFBQVE1RixLQUF0QixFQUE2QixPQUFPQSxNQUFNNEYsSUFBTixDQUFQO1lBQ3JCQSxJQUFSO1dBQ09SLElBQUw7ZUFBa0IsU0FBU3hDLElBQVQsR0FBZ0I7aUJBQVMsSUFBSTZCLFdBQUosQ0FBZ0IsSUFBaEIsRUFBc0JtQixJQUF0QixDQUFQO1NBQXpCO1dBQ05QLE1BQUw7ZUFBb0IsU0FBU1EsTUFBVCxHQUFrQjtpQkFBUyxJQUFJcEIsV0FBSixDQUFnQixJQUFoQixFQUFzQm1CLElBQXRCLENBQVA7U0FBM0I7S0FDYixPQUFPLFNBQVNFLE9BQVQsR0FBbUI7YUFBUyxJQUFJckIsV0FBSixDQUFnQixJQUFoQixFQUFzQm1CLElBQXRCLENBQVA7S0FBNUI7R0FMSjtNQU9JL0UsTUFBTTZELE9BQU8sV0FBakI7TUFDSXFCLGFBQWFQLFdBQVdILE1BQTVCO01BQ0lXLGFBQWEsS0FBakI7TUFDSWhHLFFBQVF1RixLQUFLaEksU0FBakI7TUFDSTBJLFVBQVVqRyxNQUFNaUYsUUFBTixLQUFtQmpGLE1BQU1tRixXQUFOLENBQW5CLElBQXlDSyxXQUFXeEYsTUFBTXdGLE9BQU4sQ0FBbEU7TUFDSVUsV0FBV0QsV0FBV04sVUFBVUgsT0FBVixDQUExQjtNQUNJVyxXQUFXWCxVQUFVLENBQUNPLFVBQUQsR0FBY0csUUFBZCxHQUF5QlAsVUFBVSxTQUFWLENBQW5DLEdBQTBEakosU0FBekU7TUFDSTBKLGFBQWExQixRQUFRLE9BQVIsR0FBa0IxRSxNQUFNOEYsT0FBTixJQUFpQkcsT0FBbkMsR0FBNkNBLE9BQTlEO01BQ0lJLE9BQUosRUFBYW5LLEdBQWIsRUFBa0JzSSxpQkFBbEI7O01BRUk0QixVQUFKLEVBQWdCO3dCQUNNdEIsV0FBZXNCLFdBQVc3SyxJQUFYLENBQWdCLElBQUlnSyxJQUFKLEVBQWhCLENBQWYsQ0FBcEI7UUFDSWYsc0JBQXNCOUosT0FBTzZDLFNBQTdCLElBQTBDaUgsa0JBQWtCRyxJQUFoRSxFQUFzRTs7c0JBRXJESCxpQkFBZixFQUFrQzNELEdBQWxDLEVBQXVDLElBQXZDOztVQUVJLENBQUN5RixRQUFELElBQVksQ0FBQ25KLEtBQUlxSCxpQkFBSixFQUF1QlMsUUFBdkIsQ0FBakIsRUFBbUQ3SCxNQUFLb0gsaUJBQUwsRUFBd0JTLFFBQXhCLEVBQWtDSyxVQUFsQzs7OztNQUluRFMsY0FBY0UsT0FBZCxJQUF5QkEsUUFBUWhJLElBQVIsS0FBaUJvSCxNQUE5QyxFQUFzRDtpQkFDdkMsSUFBYjtlQUNXLFNBQVNRLE1BQVQsR0FBa0I7YUFBU0ksUUFBUTFLLElBQVIsQ0FBYSxJQUFiLENBQVA7S0FBL0I7OztNQUdFLENBQUMsQ0FBQytLLFFBQUQsSUFBWVosTUFBYixNQUF5QlIsU0FBU2MsVUFBVCxJQUF1QixDQUFDaEcsTUFBTWlGLFFBQU4sQ0FBakQsQ0FBSixFQUF1RTtVQUNoRWpGLEtBQUwsRUFBWWlGLFFBQVosRUFBc0JpQixRQUF0Qjs7O2FBR1F4QixJQUFWLElBQWtCd0IsUUFBbEI7YUFDVXJGLEdBQVYsSUFBaUJ5RSxVQUFqQjtNQUNJRSxPQUFKLEVBQWE7Y0FDRDtjQUNBTyxhQUFhRyxRQUFiLEdBQXdCUCxVQUFVTixNQUFWLENBRHhCO1lBRUZJLFNBQVNTLFFBQVQsR0FBb0JQLFVBQVVQLElBQVYsQ0FGbEI7ZUFHQ2U7S0FIWDtRQUtJVCxNQUFKLEVBQVksS0FBS3hKLEdBQUwsSUFBWW1LLE9BQVosRUFBcUI7VUFDM0IsRUFBRW5LLE9BQU84RCxLQUFULENBQUosRUFBcUJkLFVBQVNjLEtBQVQsRUFBZ0I5RCxHQUFoQixFQUFxQm1LLFFBQVFuSyxHQUFSLENBQXJCO0tBRHZCLE1BRU82QixRQUFRQSxRQUFRcEMsQ0FBUixHQUFZb0MsUUFBUUssQ0FBUixJQUFhOEcsU0FBU2MsVUFBdEIsQ0FBcEIsRUFBdUR0QixJQUF2RCxFQUE2RDJCLE9BQTdEOztTQUVGQSxPQUFQO0NBbERGOztBQ2xCQTtBQUNBLElBQUlFLE1BQU05TCxVQUF3QixJQUF4QixDQUFWOzs7QUFHQVEsWUFBMEJxQyxNQUExQixFQUFrQyxRQUFsQyxFQUE0QyxVQUFVa0osUUFBVixFQUFvQjtPQUN6REMsRUFBTCxHQUFVbkosT0FBT2tKLFFBQVAsQ0FBVixDQUQ4RDtPQUV6REUsRUFBTCxHQUFVLENBQVYsQ0FGOEQ7O0NBQWhFLEVBSUcsWUFBWTtNQUNUaEwsSUFBSSxLQUFLK0ssRUFBYjtNQUNJMUUsUUFBUSxLQUFLMkUsRUFBakI7TUFDSUMsS0FBSjtNQUNJNUUsU0FBU3JHLEVBQUUrQixNQUFmLEVBQXVCLE9BQU8sRUFBRTFCLE9BQU9XLFNBQVQsRUFBb0JrSyxNQUFNLElBQTFCLEVBQVA7VUFDZkwsSUFBSTdLLENBQUosRUFBT3FHLEtBQVAsQ0FBUjtPQUNLMkUsRUFBTCxJQUFXQyxNQUFNbEosTUFBakI7U0FDTyxFQUFFMUIsT0FBTzRLLEtBQVQsRUFBZ0JDLE1BQU0sS0FBdEIsRUFBUDtDQVhGOztBQ0pBO0FBQ0EsSUFBSUMsY0FBY3BNLEtBQWtCLGFBQWxCLENBQWxCO0FBQ0EsSUFBSXFNLGFBQWF6RyxNQUFNOUMsU0FBdkI7QUFDQSxJQUFJdUosV0FBV0QsV0FBWCxLQUEyQm5LLFNBQS9CLEVBQTBDekIsTUFBbUI2TCxVQUFuQixFQUErQkQsV0FBL0IsRUFBNEMsRUFBNUM7QUFDMUMsd0JBQWlCLDBCQUFBLENBQVUzSyxHQUFWLEVBQWU7YUFDbkIySyxXQUFYLEVBQXdCM0ssR0FBeEIsSUFBK0IsSUFBL0I7Q0FERjs7QUNKQSxnQkFBaUIsa0JBQUEsQ0FBVTBLLElBQVYsRUFBZ0I3SyxLQUFoQixFQUF1QjtTQUMvQixFQUFFQSxPQUFPQSxLQUFULEVBQWdCNkssTUFBTSxDQUFDLENBQUNBLElBQXhCLEVBQVA7Q0FERjs7QUNBQTs7Ozs7O0FBVUEseUJBQWlCbk0sWUFBMEI0RixLQUExQixFQUFpQyxPQUFqQyxFQUEwQyxVQUFVbUcsUUFBVixFQUFvQlosSUFBcEIsRUFBMEI7T0FDOUVhLEVBQUwsR0FBVTVHLFdBQVUyRyxRQUFWLENBQVYsQ0FEbUY7T0FFOUVFLEVBQUwsR0FBVSxDQUFWLENBRm1GO09BRzlFSyxFQUFMLEdBQVVuQixJQUFWLENBSG1GOztDQUFwRSxFQUtkLFlBQVk7TUFDVGxLLElBQUksS0FBSytLLEVBQWI7TUFDSWIsT0FBTyxLQUFLbUIsRUFBaEI7TUFDSWhGLFFBQVEsS0FBSzJFLEVBQUwsRUFBWjtNQUNJLENBQUNoTCxDQUFELElBQU1xRyxTQUFTckcsRUFBRStCLE1BQXJCLEVBQTZCO1NBQ3RCZ0osRUFBTCxHQUFVL0osU0FBVjtXQUNPc0ssVUFBSyxDQUFMLENBQVA7O01BRUVwQixRQUFRLE1BQVosRUFBb0IsT0FBT29CLFVBQUssQ0FBTCxFQUFRakYsS0FBUixDQUFQO01BQ2hCNkQsUUFBUSxRQUFaLEVBQXNCLE9BQU9vQixVQUFLLENBQUwsRUFBUXRMLEVBQUVxRyxLQUFGLENBQVIsQ0FBUDtTQUNmaUYsVUFBSyxDQUFMLEVBQVEsQ0FBQ2pGLEtBQUQsRUFBUXJHLEVBQUVxRyxLQUFGLENBQVIsQ0FBUixDQUFQO0NBZmUsRUFnQmQsUUFoQmMsQ0FBakI7OztBQW1CQWtGLFdBQVVDLFNBQVYsR0FBc0JELFdBQVU1RyxLQUFoQzs7QUFFQThHLGtCQUFpQixNQUFqQjtBQUNBQSxrQkFBaUIsUUFBakI7QUFDQUEsa0JBQWlCLFNBQWpCOztBQzFCQSxJQUFJbEMsYUFBV21DLEtBQUksVUFBSixDQUFmO0FBQ0EsSUFBSUMsZ0JBQWdCRCxLQUFJLGFBQUosQ0FBcEI7QUFDQSxJQUFJRSxjQUFjTCxXQUFVNUcsS0FBNUI7O0FBRUEsSUFBSWtILGVBQWU7ZUFDSixJQURJO3VCQUVJLEtBRko7Z0JBR0gsS0FIRztrQkFJRCxLQUpDO2VBS0osS0FMSTtpQkFNRixLQU5FO2dCQU9ILElBUEc7d0JBUUssS0FSTDtZQVNQLEtBVE87cUJBVUUsS0FWRjtrQkFXRCxLQVhDO21CQVlBLEtBWkE7cUJBYUUsS0FiRjthQWNOLElBZE07aUJBZUYsS0FmRTtnQkFnQkgsS0FoQkc7WUFpQlAsSUFqQk87b0JBa0JDLEtBbEJEO1VBbUJULEtBbkJTO2VBb0JKLEtBcEJJO2lCQXFCRixLQXJCRTtpQkFzQkYsS0F0QkU7a0JBdUJELEtBdkJDO2dCQXdCSCxLQXhCRztpQkF5QkYsS0F6QkU7b0JBMEJDLEtBMUJEO29CQTJCQyxLQTNCRDtrQkE0QkQsSUE1QkM7b0JBNkJDLEtBN0JEO2lCQThCRixLQTlCRTthQStCTjtDQS9CYjs7QUFrQ0EsS0FBSyxJQUFJQyxjQUFjdkUsWUFBUXNFLFlBQVIsQ0FBbEIsRUFBeUMvRixJQUFJLENBQWxELEVBQXFEQSxJQUFJZ0csWUFBWS9KLE1BQXJFLEVBQTZFK0QsR0FBN0UsRUFBa0Y7TUFDNUVrRCxPQUFPOEMsWUFBWWhHLENBQVosQ0FBWDtNQUNJaUcsV0FBV0YsYUFBYTdDLElBQWIsQ0FBZjtNQUNJZ0QsYUFBYS9OLFFBQU8rSyxJQUFQLENBQWpCO01BQ0kxRSxRQUFRMEgsY0FBY0EsV0FBV25LLFNBQXJDO01BQ0lyQixHQUFKO01BQ0k4RCxLQUFKLEVBQVc7UUFDTCxDQUFDQSxNQUFNaUYsVUFBTixDQUFMLEVBQXNCN0gsTUFBSzRDLEtBQUwsRUFBWWlGLFVBQVosRUFBc0JxQyxXQUF0QjtRQUNsQixDQUFDdEgsTUFBTXFILGFBQU4sQ0FBTCxFQUEyQmpLLE1BQUs0QyxLQUFMLEVBQVlxSCxhQUFaLEVBQTJCM0MsSUFBM0I7ZUFDakJBLElBQVYsSUFBa0I0QyxXQUFsQjtRQUNJRyxRQUFKLEVBQWMsS0FBS3ZMLEdBQUwsSUFBWXlMLGtCQUFaO1VBQTRCLENBQUMzSCxNQUFNOUQsR0FBTixDQUFMLEVBQWlCZ0QsVUFBU2MsS0FBVCxFQUFnQjlELEdBQWhCLEVBQXFCeUwsbUJBQVd6TCxHQUFYLENBQXJCLEVBQXNDLElBQXRDOzs7OztBQ3REM0QsbUJBQWlCLHFCQUFBLENBQVV5QyxNQUFWLEVBQWtCaUYsR0FBbEIsRUFBdUIzRyxJQUF2QixFQUE2QjtPQUN2QyxJQUFJZixHQUFULElBQWdCMEgsR0FBaEI7Y0FBOEJqRixNQUFULEVBQWlCekMsR0FBakIsRUFBc0IwSCxJQUFJMUgsR0FBSixDQUF0QixFQUFnQ2UsSUFBaEM7R0FDckIsT0FBTzBCLE1BQVA7Q0FGRjs7QUNEQSxrQkFBaUIsb0JBQUEsQ0FBVXZFLEVBQVYsRUFBY3FLLFdBQWQsRUFBMkJ4RyxJQUEzQixFQUFpQzJKLGNBQWpDLEVBQWlEO01BQzVELEVBQUV4TixjQUFjcUssV0FBaEIsS0FBaUNtRCxtQkFBbUJsTCxTQUFuQixJQUFnQ2tMLGtCQUFrQnhOLEVBQXZGLEVBQTRGO1VBQ3BGRSxVQUFVMkQsT0FBTyx5QkFBakIsQ0FBTjtHQUNBLE9BQU83RCxFQUFQO0NBSEo7O0FDQUE7O0FBRUEsZ0JBQWlCLGtCQUFBLENBQVV5TixRQUFWLEVBQW9Cek0sRUFBcEIsRUFBd0JXLEtBQXhCLEVBQStCK0osT0FBL0IsRUFBd0M7TUFDbkQ7V0FDS0EsVUFBVTFLLEdBQUc4SSxVQUFTbkksS0FBVCxFQUFnQixDQUFoQixDQUFILEVBQXVCQSxNQUFNLENBQU4sQ0FBdkIsQ0FBVixHQUE2Q1gsR0FBR1csS0FBSCxDQUFwRDs7R0FERixDQUdFLE9BQU92QixDQUFQLEVBQVU7UUFDTnNOLE1BQU1ELFNBQVMsUUFBVCxDQUFWO1FBQ0lDLFFBQVFwTCxTQUFaLEVBQXVCd0gsVUFBUzRELElBQUl2TSxJQUFKLENBQVNzTSxRQUFULENBQVQ7VUFDakJyTixDQUFOOztDQVBKOztBQ0ZBOztBQUVBLElBQUl5SyxhQUFXeEssS0FBa0IsVUFBbEIsQ0FBZjtBQUNBLElBQUlxTSxlQUFhekcsTUFBTTlDLFNBQXZCOztBQUVBLG1CQUFpQixxQkFBQSxDQUFVbkQsRUFBVixFQUFjO1NBQ3RCQSxPQUFPc0MsU0FBUCxLQUFxQnVLLFdBQVU1RyxLQUFWLEtBQW9CakcsRUFBcEIsSUFBMEIwTSxhQUFXN0IsVUFBWCxNQUF5QjdLLEVBQXhFLENBQVA7Q0FERjs7QUNKQSxJQUFJNkssYUFBV3hLLEtBQWtCLFVBQWxCLENBQWY7O0FBRUEsNkJBQWlCUSxNQUFtQjhNLGlCQUFuQixHQUF1QyxVQUFVM04sRUFBVixFQUFjO01BQ2hFQSxNQUFNc0MsU0FBVixFQUFxQixPQUFPdEMsR0FBRzZLLFVBQUgsS0FDdkI3SyxHQUFHLFlBQUgsQ0FEdUIsSUFFdkI2TSxXQUFVL0YsU0FBUTlHLEVBQVIsQ0FBVixDQUZnQjtDQUR2Qjs7O01DR0k0TixRQUFRLEVBQVo7TUFDSUMsU0FBUyxFQUFiO01BQ0lySixVQUFVaEYsY0FBQSxHQUFpQixVQUFVc08sUUFBVixFQUFvQnBDLE9BQXBCLEVBQTZCMUssRUFBN0IsRUFBaUNvQyxJQUFqQyxFQUF1Q3lILFFBQXZDLEVBQWlEO1FBQzFFa0QsU0FBU2xELFdBQVcsWUFBWTthQUFTaUQsUUFBUDtLQUF6QixHQUE4Q0UsdUJBQVVGLFFBQVYsQ0FBM0Q7UUFDSS9MLElBQUk4QyxLQUFJN0QsRUFBSixFQUFRb0MsSUFBUixFQUFjc0ksVUFBVSxDQUFWLEdBQWMsQ0FBNUIsQ0FBUjtRQUNJL0QsUUFBUSxDQUFaO1FBQ0l0RSxNQUFKLEVBQVl1SixJQUFaLEVBQWtCYSxRQUFsQixFQUE0Qm5GLE1BQTVCO1FBQ0ksT0FBT3lGLE1BQVAsSUFBaUIsVUFBckIsRUFBaUMsTUFBTTdOLFVBQVU0TixXQUFXLG1CQUFyQixDQUFOOztRQUU3QkcsYUFBWUYsTUFBWixDQUFKLEVBQXlCLEtBQUsxSyxTQUFTMkUsVUFBUzhGLFNBQVN6SyxNQUFsQixDQUFkLEVBQXlDQSxTQUFTc0UsS0FBbEQsRUFBeURBLE9BQXpELEVBQWtFO2VBQ2hGK0QsVUFBVTNKLEVBQUUrSCxVQUFTOEMsT0FBT2tCLFNBQVNuRyxLQUFULENBQWhCLEVBQWlDLENBQWpDLENBQUYsRUFBdUNpRixLQUFLLENBQUwsQ0FBdkMsQ0FBVixHQUE0RDdLLEVBQUUrTCxTQUFTbkcsS0FBVCxDQUFGLENBQXJFO1VBQ0lXLFdBQVdzRixLQUFYLElBQW9CdEYsV0FBV3VGLE1BQW5DLEVBQTJDLE9BQU92RixNQUFQO0tBRjdDLE1BR08sS0FBS21GLFdBQVdNLE9BQU81TSxJQUFQLENBQVkyTSxRQUFaLENBQWhCLEVBQXVDLENBQUMsQ0FBQ2xCLE9BQU9hLFNBQVNsRCxJQUFULEVBQVIsRUFBeUJpQyxJQUFqRSxHQUF3RTtlQUNwRXJMLFVBQUtzTSxRQUFMLEVBQWUxTCxDQUFmLEVBQWtCNkssS0FBS2pMLEtBQXZCLEVBQThCK0osT0FBOUIsQ0FBVDtVQUNJcEQsV0FBV3NGLEtBQVgsSUFBb0J0RixXQUFXdUYsTUFBbkMsRUFBMkMsT0FBT3ZGLE1BQVA7O0dBWi9DO1VBZVFzRixLQUFSLEdBQWdCQSxLQUFoQjtVQUNRQyxNQUFSLEdBQWlCQSxNQUFqQjs7O0FDeEJBOztBQUlBLElBQUlLLFVBQVU3TixLQUFrQixTQUFsQixDQUFkOztBQUVBLGtCQUFpQixvQkFBQSxDQUFVOE4sR0FBVixFQUFlO01BQzFCQyxJQUFJN08sUUFBTzRPLEdBQVAsQ0FBUjtNQUNJRSxnQkFBZUQsQ0FBZixJQUFvQixDQUFDQSxFQUFFRixPQUFGLENBQXpCLEVBQXFDN00sVUFBR1UsQ0FBSCxDQUFLcU0sQ0FBTCxFQUFRRixPQUFSLEVBQWlCO2tCQUN0QyxJQURzQztTQUUvQyxlQUFZO2FBQVMsSUFBUDs7R0FGZ0I7Q0FGdkM7OztNQ05JSSxPQUFPak8sS0FBa0IsTUFBbEIsQ0FBWDs7TUFHSWtPLFVBQVUxTixVQUF3QmtCLENBQXRDO01BQ0lHLEtBQUssQ0FBVDtNQUNJc00sZUFBZWxPLE9BQU9rTyxZQUFQLElBQXVCLFlBQVk7V0FDN0MsSUFBUDtHQURGO01BR0lDLFNBQVMsQ0FBQzNOLE9BQW9CLFlBQVk7V0FDckMwTixhQUFhbE8sT0FBT29PLGlCQUFQLENBQXlCLEVBQXpCLENBQWIsQ0FBUDtHQURZLENBQWQ7TUFHSUMsVUFBVSxTQUFWQSxPQUFVLENBQVUzTyxFQUFWLEVBQWM7WUFDbEJBLEVBQVIsRUFBWXNPLElBQVosRUFBa0IsRUFBRTNNLE9BQU87V0FDdEIsTUFBTSxFQUFFTyxFQURjO1dBRXRCLEVBRnNCO09BQVQsRUFBbEI7R0FERjtNQU1JME0sVUFBVSxTQUFWQSxPQUFVLENBQVU1TyxFQUFWLEVBQWM2SixNQUFkLEVBQXNCOztRQUU5QixDQUFDNUosVUFBU0QsRUFBVCxDQUFMLEVBQW1CLE9BQU8sUUFBT0EsRUFBUCx5Q0FBT0EsRUFBUCxNQUFhLFFBQWIsR0FBd0JBLEVBQXhCLEdBQTZCLENBQUMsT0FBT0EsRUFBUCxJQUFhLFFBQWIsR0FBd0IsR0FBeEIsR0FBOEIsR0FBL0IsSUFBc0NBLEVBQTFFO1FBQ2YsQ0FBQytDLEtBQUkvQyxFQUFKLEVBQVFzTyxJQUFSLENBQUwsRUFBb0I7O1VBRWQsQ0FBQ0UsYUFBYXhPLEVBQWIsQ0FBTCxFQUF1QixPQUFPLEdBQVA7O1VBRW5CLENBQUM2SixNQUFMLEVBQWEsT0FBTyxHQUFQOztjQUVMN0osRUFBUjs7S0FFQSxPQUFPQSxHQUFHc08sSUFBSCxFQUFTbEgsQ0FBaEI7R0FYSjtNQWFJeUgsVUFBVSxTQUFWQSxPQUFVLENBQVU3TyxFQUFWLEVBQWM2SixNQUFkLEVBQXNCO1FBQzlCLENBQUM5RyxLQUFJL0MsRUFBSixFQUFRc08sSUFBUixDQUFMLEVBQW9COztVQUVkLENBQUNFLGFBQWF4TyxFQUFiLENBQUwsRUFBdUIsT0FBTyxJQUFQOztVQUVuQixDQUFDNkosTUFBTCxFQUFhLE9BQU8sS0FBUDs7Y0FFTDdKLEVBQVI7O0tBRUEsT0FBT0EsR0FBR3NPLElBQUgsRUFBU1EsQ0FBaEI7R0FUSjs7TUFZSUMsV0FBVyxTQUFYQSxRQUFXLENBQVUvTyxFQUFWLEVBQWM7UUFDdkJ5TyxVQUFVTyxLQUFLQyxJQUFmLElBQXVCVCxhQUFheE8sRUFBYixDQUF2QixJQUEyQyxDQUFDK0MsS0FBSS9DLEVBQUosRUFBUXNPLElBQVIsQ0FBaEQsRUFBK0RLLFFBQVEzTyxFQUFSO1dBQ3hEQSxFQUFQO0dBRkY7TUFJSWdQLE9BQU94UCxjQUFBLEdBQWlCO1NBQ3JCOE8sSUFEcUI7VUFFcEIsS0FGb0I7YUFHakJNLE9BSGlCO2FBSWpCQyxPQUppQjtjQUtoQkU7R0FMWjs7O0FDN0NBLDBCQUFpQiw0QkFBQSxDQUFVL08sRUFBVixFQUFja1AsSUFBZCxFQUFvQjtNQUMvQixDQUFDalAsVUFBU0QsRUFBVCxDQUFELElBQWlCQSxHQUFHcU0sRUFBSCxLQUFVNkMsSUFBL0IsRUFBcUMsTUFBTWhQLFVBQVUsNEJBQTRCZ1AsSUFBNUIsR0FBbUMsWUFBN0MsQ0FBTjtTQUM5QmxQLEVBQVA7Q0FGRjs7QUNEQTtBQUNBLElBQUlxQixPQUFLaEIsVUFBd0IwQixDQUFqQzs7QUFVQSxJQUFJNk0sVUFBVS9OLE1BQW1CK04sT0FBakM7O0FBRUEsSUFBSU8sT0FBT2QsZUFBYyxJQUFkLEdBQXFCLE1BQWhDOztBQUVBLElBQUllLFdBQVcsU0FBWEEsUUFBVyxDQUFVaE0sSUFBVixFQUFnQnRCLEdBQWhCLEVBQXFCOztNQUU5QjZGLFFBQVFpSCxRQUFROU0sR0FBUixDQUFaO01BQ0l1TixLQUFKO01BQ0kxSCxVQUFVLEdBQWQsRUFBbUIsT0FBT3ZFLEtBQUtrSixFQUFMLENBQVEzRSxLQUFSLENBQVA7O09BRWQwSCxRQUFRak0sS0FBS2tNLEVBQWxCLEVBQXNCRCxLQUF0QixFQUE2QkEsUUFBUUEsTUFBTUUsQ0FBM0MsRUFBOEM7UUFDeENGLE1BQU1HLENBQU4sSUFBVzFOLEdBQWYsRUFBb0IsT0FBT3VOLEtBQVA7O0NBUHhCOztBQVdBLHdCQUFpQjtrQkFDQyx3QkFBVUksT0FBVixFQUFtQm5GLElBQW5CLEVBQXlCb0YsTUFBekIsRUFBaUNDLEtBQWpDLEVBQXdDO1FBQ2xEdkIsSUFBSXFCLFFBQVEsVUFBVXJNLElBQVYsRUFBZ0IwSyxRQUFoQixFQUEwQjtrQkFDN0IxSyxJQUFYLEVBQWlCZ0wsQ0FBakIsRUFBb0I5RCxJQUFwQixFQUEwQixJQUExQjtXQUNLK0IsRUFBTCxHQUFVL0IsSUFBVixDQUZ3QztXQUduQ2dDLEVBQUwsR0FBVXpDLGNBQU8sSUFBUCxDQUFWLENBSHdDO1dBSW5DeUYsRUFBTCxHQUFVaE4sU0FBVixDQUp3QztXQUtuQ3NOLEVBQUwsR0FBVXROLFNBQVYsQ0FMd0M7V0FNbkM2TSxJQUFMLElBQWEsQ0FBYixDQU53QztVQU9wQ3JCLFlBQVl4TCxTQUFoQixFQUEyQnVOLE9BQU0vQixRQUFOLEVBQWdCNEIsTUFBaEIsRUFBd0J0TSxLQUFLdU0sS0FBTCxDQUF4QixFQUFxQ3ZNLElBQXJDO0tBUHJCLENBQVI7aUJBU1lnTCxFQUFFakwsU0FBZCxFQUF5Qjs7O2FBR2hCLFNBQVMyTSxLQUFULEdBQWlCO2FBQ2pCLElBQUkxTSxPQUFPMk0sb0JBQVMsSUFBVCxFQUFlekYsSUFBZixDQUFYLEVBQWlDMEYsT0FBTzVNLEtBQUtrSixFQUE3QyxFQUFpRCtDLFFBQVFqTSxLQUFLa00sRUFBbkUsRUFBdUVELEtBQXZFLEVBQThFQSxRQUFRQSxNQUFNRSxDQUE1RixFQUErRjtnQkFDdkZVLENBQU4sR0FBVSxJQUFWO2NBQ0laLE1BQU1hLENBQVYsRUFBYWIsTUFBTWEsQ0FBTixHQUFVYixNQUFNYSxDQUFOLENBQVFYLENBQVIsR0FBWWpOLFNBQXRCO2lCQUNOME4sS0FBS1gsTUFBTWpJLENBQVgsQ0FBUDs7YUFFR2tJLEVBQUwsR0FBVWxNLEtBQUt3TSxFQUFMLEdBQVV0TixTQUFwQjthQUNLNk0sSUFBTCxJQUFhLENBQWI7T0FWcUI7OztnQkFjYixpQkFBVXJOLEdBQVYsRUFBZTtZQUNuQnNCLE9BQU8yTSxvQkFBUyxJQUFULEVBQWV6RixJQUFmLENBQVg7WUFDSStFLFFBQVFELFNBQVNoTSxJQUFULEVBQWV0QixHQUFmLENBQVo7WUFDSXVOLEtBQUosRUFBVztjQUNMOUUsT0FBTzhFLE1BQU1FLENBQWpCO2NBQ0lZLE9BQU9kLE1BQU1hLENBQWpCO2lCQUNPOU0sS0FBS2tKLEVBQUwsQ0FBUStDLE1BQU1qSSxDQUFkLENBQVA7Z0JBQ002SSxDQUFOLEdBQVUsSUFBVjtjQUNJRSxJQUFKLEVBQVVBLEtBQUtaLENBQUwsR0FBU2hGLElBQVQ7Y0FDTkEsSUFBSixFQUFVQSxLQUFLMkYsQ0FBTCxHQUFTQyxJQUFUO2NBQ04vTSxLQUFLa00sRUFBTCxJQUFXRCxLQUFmLEVBQXNCak0sS0FBS2tNLEVBQUwsR0FBVS9FLElBQVY7Y0FDbEJuSCxLQUFLd00sRUFBTCxJQUFXUCxLQUFmLEVBQXNCak0sS0FBS3dNLEVBQUwsR0FBVU8sSUFBVjtlQUNqQmhCLElBQUw7U0FDQSxPQUFPLENBQUMsQ0FBQ0UsS0FBVDtPQTNCbUI7OztlQStCZCxTQUFTZSxPQUFULENBQWlCQyxVQUFqQiwyQkFBc0Q7NEJBQ3BELElBQVQsRUFBZS9GLElBQWY7WUFDSXZJLElBQUk4QyxLQUFJd0wsVUFBSixFQUFnQjVNLFVBQVVKLE1BQVYsR0FBbUIsQ0FBbkIsR0FBdUJJLFVBQVUsQ0FBVixDQUF2QixHQUFzQ25CLFNBQXRELEVBQWlFLENBQWpFLENBQVI7WUFDSStNLEtBQUo7ZUFDT0EsUUFBUUEsUUFBUUEsTUFBTUUsQ0FBZCxHQUFrQixLQUFLRCxFQUF0QyxFQUEwQztZQUN0Q0QsTUFBTWlCLENBQVIsRUFBV2pCLE1BQU1HLENBQWpCLEVBQW9CLElBQXBCOztpQkFFT0gsU0FBU0EsTUFBTVksQ0FBdEI7b0JBQWlDWixNQUFNYSxDQUFkOzs7T0F0Q047OztXQTJDbEIsU0FBU25OLEdBQVQsQ0FBYWpCLEdBQWIsRUFBa0I7ZUFDZCxDQUFDLENBQUNzTixTQUFTVyxvQkFBUyxJQUFULEVBQWV6RixJQUFmLENBQVQsRUFBK0J4SSxHQUEvQixDQUFUOztLQTVDSjtRQStDSXVNLFlBQUosRUFBaUJoTixLQUFHK00sRUFBRWpMLFNBQUwsRUFBZ0IsTUFBaEIsRUFBd0I7V0FDbEMsZUFBWTtlQUNSNE0sb0JBQVMsSUFBVCxFQUFlekYsSUFBZixFQUFxQjZFLElBQXJCLENBQVA7O0tBRmE7V0FLVmYsQ0FBUDtHQS9EYTtPQWlFVixhQUFVaEwsSUFBVixFQUFnQnRCLEdBQWhCLEVBQXFCSCxLQUFyQixFQUE0QjtRQUMzQjBOLFFBQVFELFNBQVNoTSxJQUFULEVBQWV0QixHQUFmLENBQVo7UUFDSXFPLElBQUosRUFBVXhJLEtBQVY7O1FBRUkwSCxLQUFKLEVBQVc7WUFDSGlCLENBQU4sR0FBVTNPLEtBQVY7O0tBREYsTUFHTztXQUNBaU8sRUFBTCxHQUFVUCxRQUFRO1dBQ2IxSCxRQUFRaUgsUUFBUTlNLEdBQVIsRUFBYSxJQUFiLENBREs7V0FFYkEsR0FGYTtXQUdiSCxLQUhhO1dBSWJ3TyxPQUFPL00sS0FBS3dNLEVBSkM7V0FLYnROLFNBTGE7V0FNYixLQU5hO09BQWxCO1VBUUksQ0FBQ2MsS0FBS2tNLEVBQVYsRUFBY2xNLEtBQUtrTSxFQUFMLEdBQVVELEtBQVY7VUFDVmMsSUFBSixFQUFVQSxLQUFLWixDQUFMLEdBQVNGLEtBQVQ7V0FDTEYsSUFBTDs7VUFFSXhILFVBQVUsR0FBZCxFQUFtQnZFLEtBQUtrSixFQUFMLENBQVEzRSxLQUFSLElBQWlCMEgsS0FBakI7S0FDbkIsT0FBT2pNLElBQVA7R0F0Rlc7WUF3RkxnTSxRQXhGSzthQXlGSixtQkFBVWhCLENBQVYsRUFBYTlELElBQWIsRUFBbUJvRixNQUFuQixFQUEyQjs7O2dCQUd4QnRCLENBQVosRUFBZTlELElBQWYsRUFBcUIsVUFBVThCLFFBQVYsRUFBb0JaLElBQXBCLEVBQTBCO1dBQ3hDYSxFQUFMLEdBQVUwRCxvQkFBUzNELFFBQVQsRUFBbUI5QixJQUFuQixDQUFWLENBRDZDO1dBRXhDcUMsRUFBTCxHQUFVbkIsSUFBVixDQUY2QztXQUd4Q29FLEVBQUwsR0FBVXROLFNBQVYsQ0FINkM7S0FBL0MsRUFJRyxZQUFZO1VBQ1RjLE9BQU8sSUFBWDtVQUNJb0ksT0FBT3BJLEtBQUt1SixFQUFoQjtVQUNJMEMsUUFBUWpNLEtBQUt3TSxFQUFqQjs7YUFFT1AsU0FBU0EsTUFBTVksQ0FBdEI7Z0JBQWlDWixNQUFNYSxDQUFkO09BTFo7VUFPVCxDQUFDOU0sS0FBS2lKLEVBQU4sSUFBWSxFQUFFakosS0FBS3dNLEVBQUwsR0FBVVAsUUFBUUEsUUFBUUEsTUFBTUUsQ0FBZCxHQUFrQm5NLEtBQUtpSixFQUFMLENBQVFpRCxFQUE5QyxDQUFoQixFQUFtRTs7YUFFNURqRCxFQUFMLEdBQVUvSixTQUFWO2VBQ09zSyxVQUFLLENBQUwsQ0FBUDs7O1VBR0VwQixRQUFRLE1BQVosRUFBb0IsT0FBT29CLFVBQUssQ0FBTCxFQUFReUMsTUFBTUcsQ0FBZCxDQUFQO1VBQ2hCaEUsUUFBUSxRQUFaLEVBQXNCLE9BQU9vQixVQUFLLENBQUwsRUFBUXlDLE1BQU1pQixDQUFkLENBQVA7YUFDZjFELFVBQUssQ0FBTCxFQUFRLENBQUN5QyxNQUFNRyxDQUFQLEVBQVVILE1BQU1pQixDQUFoQixDQUFSLENBQVA7S0FuQkYsRUFvQkdaLFNBQVMsU0FBVCxHQUFxQixRQXBCeEIsRUFvQmtDLENBQUNBLE1BcEJuQyxFQW9CMkMsSUFwQjNDOzs7Z0JBdUJXcEYsSUFBWDs7Q0FuSEo7O0FDMUJBLElBQUlPLGFBQVd4SyxLQUFrQixVQUFsQixDQUFmO0FBQ0EsSUFBSWtRLGVBQWUsS0FBbkI7O0FBRUEsSUFBSTtNQUNFQyxRQUFRLENBQUMsQ0FBRCxFQUFJM0YsVUFBSixHQUFaO1FBQ00sUUFBTixJQUFrQixZQUFZO21CQUFpQixJQUFmO0dBQWhDOzs7Q0FGRixDQUtFLE9BQU96SyxDQUFQLEVBQVU7O0FBRVosa0JBQWlCLG9CQUFBLENBQVVELElBQVYsRUFBZ0JzUSxXQUFoQixFQUE2QjtNQUN4QyxDQUFDQSxXQUFELElBQWdCLENBQUNGLFlBQXJCLEVBQW1DLE9BQU8sS0FBUDtNQUMvQjFOLE9BQU8sS0FBWDtNQUNJO1FBQ0U2TixNQUFNLENBQUMsQ0FBRCxDQUFWO1FBQ0lDLE9BQU9ELElBQUk3RixVQUFKLEdBQVg7U0FDS04sSUFBTCxHQUFZLFlBQVk7YUFBUyxFQUFFaUMsTUFBTTNKLE9BQU8sSUFBZixFQUFQO0tBQTFCO1FBQ0lnSSxVQUFKLElBQWdCLFlBQVk7YUFBUzhGLElBQVA7S0FBOUI7U0FDS0QsR0FBTDtHQUxGLENBTUUsT0FBT3RRLENBQVAsRUFBVTtTQUNMeUMsSUFBUDtDQVZGOztBQ1RBLElBQUlnRCxtQkFBaUJ4RixVQUF3QjJGLEdBQTdDO0FBQ0EseUJBQWlCLDJCQUFBLENBQVU1QyxJQUFWLEVBQWdCbUIsTUFBaEIsRUFBd0I2SixDQUF4QixFQUEyQjtNQUN0Q3JOLElBQUl3RCxPQUFPcUcsV0FBZjtNQUNJckosQ0FBSjtNQUNJUixNQUFNcU4sQ0FBTixJQUFXLE9BQU9yTixDQUFQLElBQVksVUFBdkIsSUFBcUMsQ0FBQ1EsSUFBSVIsRUFBRW9DLFNBQVAsTUFBc0JpTCxFQUFFakwsU0FBN0QsSUFBMEVsRCxVQUFTc0IsQ0FBVCxDQUExRSxJQUF5RnNFLGdCQUE3RixFQUE2RztxQkFDNUZ6QyxJQUFmLEVBQXFCN0IsQ0FBckI7R0FDQSxPQUFPNkIsSUFBUDtDQUxKOztBQ0ZBOztBQWNBLGtCQUFpQixvQkFBQSxDQUFVa0gsSUFBVixFQUFnQm1GLE9BQWhCLEVBQXlCeEQsT0FBekIsRUFBa0MyRSxNQUFsQyxFQUEwQ2xCLE1BQTFDLEVBQWtEbUIsT0FBbEQsRUFBMkQ7TUFDdEUxRixPQUFPNUwsUUFBTytLLElBQVAsQ0FBWDtNQUNJOEQsSUFBSWpELElBQVI7TUFDSXdFLFFBQVFELFNBQVMsS0FBVCxHQUFpQixLQUE3QjtNQUNJOUosUUFBUXdJLEtBQUtBLEVBQUVqTCxTQUFuQjtNQUNJN0IsSUFBSSxFQUFSO01BQ0l3UCxZQUFZLFNBQVpBLFNBQVksQ0FBVTNDLEdBQVYsRUFBZTtRQUN6Qm5OLEtBQUs0RSxNQUFNdUksR0FBTixDQUFUO2NBQ1N2SSxLQUFULEVBQWdCdUksR0FBaEIsRUFDRUEsT0FBTyxRQUFQLEdBQWtCLFVBQVUxTixDQUFWLEVBQWE7YUFDdEJvUSxXQUFXLENBQUM1USxVQUFTUSxDQUFULENBQVosR0FBMEIsS0FBMUIsR0FBa0NPLEdBQUdHLElBQUgsQ0FBUSxJQUFSLEVBQWNWLE1BQU0sQ0FBTixHQUFVLENBQVYsR0FBY0EsQ0FBNUIsQ0FBekM7S0FERixHQUVJME4sT0FBTyxLQUFQLEdBQWUsU0FBU3BMLEdBQVQsQ0FBYXRDLENBQWIsRUFBZ0I7YUFDMUJvUSxXQUFXLENBQUM1USxVQUFTUSxDQUFULENBQVosR0FBMEIsS0FBMUIsR0FBa0NPLEdBQUdHLElBQUgsQ0FBUSxJQUFSLEVBQWNWLE1BQU0sQ0FBTixHQUFVLENBQVYsR0FBY0EsQ0FBNUIsQ0FBekM7S0FERSxHQUVBME4sT0FBTyxLQUFQLEdBQWUsU0FBUzNOLEdBQVQsQ0FBYUMsQ0FBYixFQUFnQjthQUMxQm9RLFdBQVcsQ0FBQzVRLFVBQVNRLENBQVQsQ0FBWixHQUEwQjZCLFNBQTFCLEdBQXNDdEIsR0FBR0csSUFBSCxDQUFRLElBQVIsRUFBY1YsTUFBTSxDQUFOLEdBQVUsQ0FBVixHQUFjQSxDQUE1QixDQUE3QztLQURFLEdBRUEwTixPQUFPLEtBQVAsR0FBZSxTQUFTNEMsR0FBVCxDQUFhdFEsQ0FBYixFQUFnQjtTQUFLVSxJQUFILENBQVEsSUFBUixFQUFjVixNQUFNLENBQU4sR0FBVSxDQUFWLEdBQWNBLENBQTVCLEVBQWdDLE9BQU8sSUFBUDtLQUFqRSxHQUNBLFNBQVN1RixHQUFULENBQWF2RixDQUFiLEVBQWdCNkMsQ0FBaEIsRUFBbUI7U0FBS25DLElBQUgsQ0FBUSxJQUFSLEVBQWNWLE1BQU0sQ0FBTixHQUFVLENBQVYsR0FBY0EsQ0FBNUIsRUFBK0I2QyxDQUEvQixFQUFtQyxPQUFPLElBQVA7S0FSOUQ7R0FGRjtNQWFJLE9BQU84SyxDQUFQLElBQVksVUFBWixJQUEwQixFQUFFeUMsV0FBV2pMLE1BQU13SyxPQUFOLElBQWlCLENBQUNZLE9BQU0sWUFBWTtRQUN6RTVDLENBQUosR0FBUTFDLE9BQVIsR0FBa0JuQixJQUFsQjtHQUQyRCxDQUEvQixDQUE5QixFQUVLOztRQUVDcUcsT0FBT0ssY0FBUCxDQUFzQnhCLE9BQXRCLEVBQStCbkYsSUFBL0IsRUFBcUNvRixNQUFyQyxFQUE2Q0MsS0FBN0MsQ0FBSjtpQkFDWXZCLEVBQUVqTCxTQUFkLEVBQXlCOEksT0FBekI7VUFDS2dELElBQUwsR0FBWSxJQUFaO0dBTkYsTUFPTztRQUNEaUMsV0FBVyxJQUFJOUMsQ0FBSixFQUFmOztRQUVJK0MsaUJBQWlCRCxTQUFTdkIsS0FBVCxFQUFnQmtCLFVBQVUsRUFBVixHQUFlLENBQUMsQ0FBaEMsRUFBbUMsQ0FBbkMsS0FBeUNLLFFBQTlEOztRQUVJRSx1QkFBdUJKLE9BQU0sWUFBWTtlQUFXak8sR0FBVCxDQUFhLENBQWI7S0FBcEIsQ0FBM0I7O1FBRUlzTyxtQkFBbUJDLFlBQVksVUFBVVgsSUFBVixFQUFnQjtVQUFNdkMsQ0FBSixDQUFNdUMsSUFBTjtLQUE5QixDQUF2QixDQVBLOztRQVNEWSxhQUFhLENBQUNWLE9BQUQsSUFBWUcsT0FBTSxZQUFZOztVQUV6Q1EsWUFBWSxJQUFJcEQsQ0FBSixFQUFoQjtVQUNJekcsUUFBUSxDQUFaO2FBQ09BLE9BQVA7a0JBQTBCZ0ksS0FBVixFQUFpQmhJLEtBQWpCLEVBQXdCQSxLQUF4QjtPQUNoQixPQUFPLENBQUM2SixVQUFVek8sR0FBVixDQUFjLENBQUMsQ0FBZixDQUFSO0tBTDJCLENBQTdCO1FBT0ksQ0FBQ3NPLGdCQUFMLEVBQXVCO1VBQ2pCNUIsUUFBUSxVQUFVbEwsTUFBVixFQUFrQnVKLFFBQWxCLEVBQTRCO29CQUMzQnZKLE1BQVgsRUFBbUI2SixDQUFuQixFQUFzQjlELElBQXRCO1lBQ0lsSCxPQUFPcU8sbUJBQWtCLElBQUl0RyxJQUFKLEVBQWxCLEVBQThCNUcsTUFBOUIsRUFBc0M2SixDQUF0QyxDQUFYO1lBQ0lOLFlBQVl4TCxTQUFoQixFQUEyQnVOLE9BQU0vQixRQUFOLEVBQWdCNEIsTUFBaEIsRUFBd0J0TSxLQUFLdU0sS0FBTCxDQUF4QixFQUFxQ3ZNLElBQXJDO2VBQ3BCQSxJQUFQO09BSkUsQ0FBSjtRQU1FRCxTQUFGLEdBQWN5QyxLQUFkO1lBQ01nRixXQUFOLEdBQW9Cd0QsQ0FBcEI7O1FBRUVnRCx3QkFBd0JHLFVBQTVCLEVBQXdDO2dCQUM1QixRQUFWO2dCQUNVLEtBQVY7Z0JBQ1VULFVBQVUsS0FBVixDQUFWOztRQUVFUyxjQUFjSixjQUFsQixFQUFrQ0wsVUFBVW5CLEtBQVY7O1FBRTlCa0IsV0FBV2pMLE1BQU1rSyxLQUFyQixFQUE0QixPQUFPbEssTUFBTWtLLEtBQWI7OztrQkFHZjFCLENBQWYsRUFBa0I5RCxJQUFsQjs7SUFFRUEsSUFBRixJQUFVOEQsQ0FBVjtVQUNRekssUUFBUU8sQ0FBUixHQUFZUCxRQUFRcUIsQ0FBcEIsR0FBd0JyQixRQUFRSyxDQUFSLElBQWFvSyxLQUFLakQsSUFBbEIsQ0FBaEMsRUFBeUQ3SixDQUF6RDs7TUFFSSxDQUFDdVAsT0FBTCxFQUFjRCxPQUFPYyxTQUFQLENBQWlCdEQsQ0FBakIsRUFBb0I5RCxJQUFwQixFQUEwQm9GLE1BQTFCOztTQUVQdEIsQ0FBUDtDQXJFRjs7QUNkQTs7QUFHQSxJQUFJdUQsTUFBTSxLQUFWOzs7QUFHQSxjQUFpQnRSLFlBQXlCc1IsR0FBekIsRUFBOEIsVUFBVW5SLEdBQVYsRUFBZTtTQUNyRCxTQUFTb1IsR0FBVCxHQUFlO1dBQVNwUixJQUFJLElBQUosRUFBVWlELFVBQVVKLE1BQVYsR0FBbUIsQ0FBbkIsR0FBdUJJLFVBQVUsQ0FBVixDQUF2QixHQUFzQ25CLFNBQWhELENBQVA7R0FBeEI7Q0FEZSxFQUVkOztPQUVJLFNBQVN5TyxHQUFULENBQWFwUCxLQUFiLEVBQW9CO1dBQ2hCa1Esa0JBQU83SCxHQUFQLENBQVcrRixvQkFBUyxJQUFULEVBQWU0QixHQUFmLENBQVgsRUFBZ0NoUSxRQUFRQSxVQUFVLENBQVYsR0FBYyxDQUFkLEdBQWtCQSxLQUExRCxFQUFpRUEsS0FBakUsQ0FBUDs7Q0FMYSxFQU9ka1EsaUJBUGMsQ0FBakI7O0FDSkEseUJBQWlCLDJCQUFBLENBQVVsQixJQUFWLEVBQWdCOUYsUUFBaEIsRUFBMEI7TUFDckN2QyxTQUFTLEVBQWI7U0FDTXFJLElBQU4sRUFBWSxLQUFaLEVBQW1CckksT0FBT0MsSUFBMUIsRUFBZ0NELE1BQWhDLEVBQXdDdUMsUUFBeEM7U0FDT3ZDLE1BQVA7Q0FIRjs7QUNGQTs7O0FBR0Esd0JBQWlCLDBCQUFBLENBQVVnQyxJQUFWLEVBQWdCO1NBQ3hCLFNBQVN3SCxNQUFULEdBQWtCO1FBQ25CaEwsU0FBUSxJQUFSLEtBQWlCd0QsSUFBckIsRUFBMkIsTUFBTXBLLFVBQVVvSyxPQUFPLHVCQUFqQixDQUFOO1dBQ3BCeUgsbUJBQUssSUFBTCxDQUFQO0dBRkY7Q0FERjs7QUNIQTs7O0FBR0FwTyxRQUFRQSxRQUFRcEMsQ0FBUixHQUFZb0MsUUFBUXNCLENBQTVCLEVBQStCLEtBQS9CLEVBQXNDLEVBQUU2TSxRQUFRelIsa0JBQWlDLEtBQWpDLENBQVYsRUFBdEM7O0FDSEE7Ozs7QUFJQSx1QkFBaUIseUJBQUEsQ0FBVTJSLFVBQVYsRUFBc0I7VUFDN0JyTyxRQUFRNUMsQ0FBaEIsRUFBbUJpUixVQUFuQixFQUErQixFQUFFQyxJQUFJLFNBQVNBLEVBQVQsR0FBYztVQUM3QzVPLFNBQVNJLFVBQVVKLE1BQXZCO1VBQ0k2TyxJQUFJak0sTUFBTTVDLE1BQU4sQ0FBUjthQUNPQSxRQUFQO1VBQW1CQSxNQUFGLElBQVlJLFVBQVVKLE1BQVYsQ0FBWjtPQUNqQixPQUFPLElBQUksSUFBSixDQUFTNk8sQ0FBVCxDQUFQO0tBSjZCLEVBQS9CO0NBREY7O0FDSkE7QUFDQTdSLGlCQUFnQyxLQUFoQzs7QUNEQTs7OztBQU9BLHlCQUFpQiwyQkFBQSxDQUFVMlIsVUFBVixFQUFzQjtVQUM3QnJPLFFBQVE1QyxDQUFoQixFQUFtQmlSLFVBQW5CLEVBQStCLEVBQUVELE1BQU0sU0FBU0EsSUFBVCxDQUFjak8sTUFBZCx5QkFBNkM7VUFDOUVxTyxRQUFRMU8sVUFBVSxDQUFWLENBQVo7VUFDSTJPLE9BQUosRUFBYUYsQ0FBYixFQUFnQjNDLENBQWhCLEVBQW1COEMsRUFBbkI7aUJBQ1UsSUFBVjtnQkFDVUYsVUFBVTdQLFNBQXBCO1VBQ0k4UCxPQUFKLEVBQWFFLFdBQVVILEtBQVY7VUFDVHJPLFVBQVV4QixTQUFkLEVBQXlCLE9BQU8sSUFBSSxJQUFKLEVBQVA7VUFDckIsRUFBSjtVQUNJOFAsT0FBSixFQUFhO1lBQ1AsQ0FBSjthQUNLdk4sS0FBSXNOLEtBQUosRUFBVzFPLFVBQVUsQ0FBVixDQUFYLEVBQXlCLENBQXpCLENBQUw7ZUFDTUssTUFBTixFQUFjLEtBQWQsRUFBcUIsVUFBVXlPLFFBQVYsRUFBb0I7WUFDckNoSyxJQUFGLENBQU84SixHQUFHRSxRQUFILEVBQWFoRCxHQUFiLENBQVA7U0FERjtPQUhGLE1BTU87ZUFDQ3pMLE1BQU4sRUFBYyxLQUFkLEVBQXFCb08sRUFBRTNKLElBQXZCLEVBQTZCMkosQ0FBN0I7O2FBRUssSUFBSSxJQUFKLENBQVNBLENBQVQsQ0FBUDtLQWpCNkIsRUFBL0I7Q0FERjs7QUNQQTtBQUNBN1IsbUJBQWtDLEtBQWxDOztBQ0RBOztBQUdBLElBQUltUyxNQUFNLEtBQVY7OztBQUdBLGNBQWlCblMsWUFBeUJtUyxHQUF6QixFQUE4QixVQUFVaFMsR0FBVixFQUFlO1NBQ3JELFNBQVNpUyxHQUFULEdBQWU7V0FBU2pTLElBQUksSUFBSixFQUFVaUQsVUFBVUosTUFBVixHQUFtQixDQUFuQixHQUF1QkksVUFBVSxDQUFWLENBQXZCLEdBQXNDbkIsU0FBaEQsQ0FBUDtHQUF4QjtDQURlLEVBRWQ7O09BRUksU0FBUzlCLEdBQVQsQ0FBYXNCLEdBQWIsRUFBa0I7UUFDakJ1TixRQUFRd0Msa0JBQU96QyxRQUFQLENBQWdCVyxvQkFBUyxJQUFULEVBQWV5QyxHQUFmLENBQWhCLEVBQXFDMVEsR0FBckMsQ0FBWjtXQUNPdU4sU0FBU0EsTUFBTWlCLENBQXRCO0dBSkQ7O09BT0ksU0FBU3RLLEdBQVQsQ0FBYWxFLEdBQWIsRUFBa0JILEtBQWxCLEVBQXlCO1dBQ3JCa1Esa0JBQU83SCxHQUFQLENBQVcrRixvQkFBUyxJQUFULEVBQWV5QyxHQUFmLENBQVgsRUFBZ0MxUSxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCQSxHQUFoRCxFQUFxREgsS0FBckQsQ0FBUDs7Q0FWYSxFQVlka1EsaUJBWmMsRUFZTixJQVpNLENBQWpCOztBQ05BOzs7QUFHQWxPLFFBQVFBLFFBQVFwQyxDQUFSLEdBQVlvQyxRQUFRc0IsQ0FBNUIsRUFBK0IsS0FBL0IsRUFBc0MsRUFBRTZNLFFBQVF6UixrQkFBaUMsS0FBakMsQ0FBVixFQUF0Qzs7QUNIQTtBQUNBQSxpQkFBZ0MsS0FBaEM7O0FDREE7QUFDQUEsbUJBQWtDLEtBQWxDOztBQ0RBLElBQU1xUyxrQkFBa0IsSUFBSWQsR0FBSixDQUFRLENBQzlCLGdCQUQ4QixFQUU5QixlQUY4QixFQUc5QixXQUg4QixFQUk5QixlQUo4QixFQUs5QixlQUw4QixFQU05QixrQkFOOEIsRUFPOUIsZ0JBUDhCLEVBUTlCLGVBUjhCLENBQVIsQ0FBeEI7Ozs7OztBQWVBLEFBQU8sU0FBU2Usd0JBQVQsQ0FBa0NDLFNBQWxDLEVBQTZDO01BQzVDQyxXQUFXSCxnQkFBZ0IzUCxHQUFoQixDQUFvQjZQLFNBQXBCLENBQWpCO01BQ01FLFlBQVksbUNBQW1DaE4sSUFBbkMsQ0FBd0M4TSxTQUF4QyxDQUFsQjtTQUNPLENBQUNDLFFBQUQsSUFBYUMsU0FBcEI7Ozs7Ozs7O0FBUUYsQUFBTyxTQUFTQyxXQUFULENBQXFCQyxJQUFyQixFQUEyQjs7TUFFMUJDLGNBQWNELEtBQUtELFdBQXpCO01BQ0lFLGdCQUFnQjNRLFNBQXBCLEVBQStCO1dBQ3RCMlEsV0FBUDs7OztNQUlFQyxVQUFVRixJQUFkO1NBQ09FLFdBQVcsRUFBRUEsUUFBUUMscUJBQVIsSUFBaUNELG1CQUFtQkUsUUFBdEQsQ0FBbEIsRUFBbUY7Y0FDdkVGLFFBQVFHLFVBQVIsS0FBdUJqVSxPQUFPa1UsVUFBUCxJQUFxQkosbUJBQW1CSSxVQUF4QyxHQUFxREosUUFBUUssSUFBN0QsR0FBb0VqUixTQUEzRixDQUFWOztTQUVLLENBQUMsRUFBRTRRLFlBQVlBLFFBQVFDLHFCQUFSLElBQWlDRCxtQkFBbUJFLFFBQWhFLENBQUYsQ0FBUjs7Ozs7Ozs7QUFRRixTQUFTSSw0QkFBVCxDQUFzQ0MsSUFBdEMsRUFBNENDLEtBQTVDLEVBQW1EO01BQzdDVixPQUFPVSxLQUFYO1NBQ09WLFFBQVFBLFNBQVNTLElBQWpCLElBQXlCLENBQUNULEtBQUtXLFdBQXRDLEVBQW1EO1dBQzFDWCxLQUFLSyxVQUFaOztTQUVNLENBQUNMLElBQUQsSUFBU0EsU0FBU1MsSUFBbkIsR0FBMkIsSUFBM0IsR0FBa0NULEtBQUtXLFdBQTlDOzs7Ozs7OztBQVFGLFNBQVNDLFFBQVQsQ0FBa0JILElBQWxCLEVBQXdCQyxLQUF4QixFQUErQjtTQUN0QkEsTUFBTUcsVUFBTixHQUFtQkgsTUFBTUcsVUFBekIsR0FBc0NMLDZCQUE2QkMsSUFBN0IsRUFBbUNDLEtBQW5DLENBQTdDOzs7Ozs7OztBQVFGLEFBQU8sU0FBU0ksMEJBQVQsQ0FBb0NMLElBQXBDLEVBQTBDTSxRQUExQyxFQUFnRjtNQUE1QkMsY0FBNEIsdUVBQVgsSUFBSXBDLEdBQUosRUFBVzs7TUFDakZvQixPQUFPUyxJQUFYO1NBQ09ULElBQVAsRUFBYTtRQUNQQSxLQUFLaUIsUUFBTCxLQUFrQkMsS0FBS0MsWUFBM0IsRUFBeUM7VUFDakNDLGlDQUFrQ3BCLElBQXhDOztlQUVTb0IsT0FBVDs7VUFFTXhCLFlBQVl3QixRQUFReEIsU0FBMUI7VUFDSUEsY0FBYyxNQUFkLElBQXdCd0IsUUFBUUMsWUFBUixDQUFxQixLQUFyQixNQUFnQyxRQUE1RCxFQUFzRTs7O1lBRzlEQyxpQ0FBbUNGLFFBQVFHLE1BQWpEO1lBQ0lELHNCQUFzQkosSUFBdEIsSUFBOEIsQ0FBQ0YsZUFBZWpSLEdBQWYsQ0FBbUJ1UixVQUFuQixDQUFuQyxFQUFtRTs7eUJBRWxEdkQsR0FBZixDQUFtQnVELFVBQW5COztlQUVLLElBQUlFLFFBQVFGLFdBQVdULFVBQTVCLEVBQXdDVyxLQUF4QyxFQUErQ0EsUUFBUUEsTUFBTWIsV0FBN0QsRUFBMEU7dUNBQzdDYSxLQUEzQixFQUFrQ1QsUUFBbEMsRUFBNENDLGNBQTVDOzs7Ozs7O2VBT0dSLDZCQUE2QkMsSUFBN0IsRUFBbUNXLE9BQW5DLENBQVA7O09BaEJGLE1Ba0JPLElBQUl4QixjQUFjLFVBQWxCLEVBQThCOzs7OztlQUs1QlksNkJBQTZCQyxJQUE3QixFQUFtQ1csT0FBbkMsQ0FBUDs7Ozs7VUFLSUssYUFBYUwsUUFBUU0sZUFBM0I7VUFDSUQsVUFBSixFQUFnQjthQUNULElBQUlELFNBQVFDLFdBQVdaLFVBQTVCLEVBQXdDVyxNQUF4QyxFQUErQ0EsU0FBUUEsT0FBTWIsV0FBN0QsRUFBMEU7cUNBQzdDYSxNQUEzQixFQUFrQ1QsUUFBbEMsRUFBNENDLGNBQTVDOzs7OztXQUtDSixTQUFTSCxJQUFULEVBQWVULElBQWYsQ0FBUDs7Ozs7Ozs7Ozs7OztBQWFKLEFBQU8sU0FBUzJCLG9CQUFULENBQThCQyxXQUE5QixFQUEyQy9RLElBQTNDLEVBQWlEbEMsS0FBakQsRUFBd0Q7Y0FDakRrQyxJQUFaLElBQW9CbEMsS0FBcEI7OztBQy9IRjs7O0FBR0EsSUFBTWtULHFCQUFxQjtVQUNqQixDQURpQjtVQUVqQjtDQUZWOztJQ0FxQkM7b0NBQ0w7Ozs7U0FFUEMsc0JBQUwsR0FBOEIsSUFBSXRDLEdBQUosRUFBOUI7OztTQUdLdUMsd0JBQUwsR0FBZ0MsSUFBSXZDLEdBQUosRUFBaEM7OztTQUdLd0MsUUFBTCxHQUFnQixFQUFoQjs7O1NBR0tDLFdBQUwsR0FBbUIsS0FBbkI7Ozs7Ozs7Ozs7O2tDQU9ZdEMsV0FBV3VDLFlBQVk7V0FDOUJKLHNCQUFMLENBQTRCL08sR0FBNUIsQ0FBZ0M0TSxTQUFoQyxFQUEyQ3VDLFVBQTNDO1dBQ0tILHdCQUFMLENBQThCaFAsR0FBOUIsQ0FBa0NtUCxXQUFXdkssV0FBN0MsRUFBMER1SyxVQUExRDs7Ozs7Ozs7OzswQ0FPb0J2QyxXQUFXO2FBQ3hCLEtBQUttQyxzQkFBTCxDQUE0QnZVLEdBQTVCLENBQWdDb1MsU0FBaEMsQ0FBUDs7Ozs7Ozs7Ozs0Q0FPc0JoSSxhQUFhO2FBQzVCLEtBQUtvSyx3QkFBTCxDQUE4QnhVLEdBQTlCLENBQWtDb0ssV0FBbEMsQ0FBUDs7Ozs7Ozs7OzZCQU1Pd0ssVUFBVTtXQUNaRixXQUFMLEdBQW1CLElBQW5CO1dBQ0tELFFBQUwsQ0FBYzFNLElBQWQsQ0FBbUI2TSxRQUFuQjs7Ozs7Ozs7OzhCQU1RcEMsTUFBTTs7O1VBQ1YsQ0FBQyxLQUFLa0MsV0FBVixFQUF1Qjs7Z0NBRXZCLENBQXFDbEMsSUFBckMsRUFBMkM7ZUFBVyxNQUFLcUMsS0FBTCxDQUFXakIsT0FBWCxDQUFYO09BQTNDOzs7Ozs7Ozs7MEJBTUlwQixNQUFNO1VBQ04sQ0FBQyxLQUFLa0MsV0FBVixFQUF1Qjs7VUFFbkJsQyxLQUFLc0MsWUFBVCxFQUF1QjtXQUNsQkEsWUFBTCxHQUFvQixJQUFwQjs7V0FFSyxJQUFJbE8sSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUs2TixRQUFMLENBQWM1UixNQUFsQyxFQUEwQytELEdBQTFDLEVBQStDO2FBQ3hDNk4sUUFBTCxDQUFjN04sQ0FBZCxFQUFpQjRMLElBQWpCOzs7Ozs7Ozs7O2dDQU9RUyxNQUFNO1VBQ1Y4QixXQUFXLEVBQWpCOztnQ0FFQSxDQUFxQzlCLElBQXJDLEVBQTJDO2VBQVc4QixTQUFTaE4sSUFBVCxDQUFjNkwsT0FBZCxDQUFYO09BQTNDOztXQUVLLElBQUloTixJQUFJLENBQWIsRUFBZ0JBLElBQUltTyxTQUFTbFMsTUFBN0IsRUFBcUMrRCxHQUFyQyxFQUEwQztZQUNsQ2dOLFVBQVVtQixTQUFTbk8sQ0FBVCxDQUFoQjtZQUNJZ04sUUFBUW9CLFVBQVIsS0FBdUJDLG1CQUFRQyxNQUFuQyxFQUEyQztjQUNyQ0MsV0FBQSxDQUFzQnZCLE9BQXRCLENBQUosRUFBb0M7aUJBQzdCd0IsaUJBQUwsQ0FBdUJ4QixPQUF2Qjs7U0FGSixNQUlPO2VBQ0F5QixjQUFMLENBQW9CekIsT0FBcEI7Ozs7Ozs7Ozs7O21DQVFTWCxNQUFNO1VBQ2I4QixXQUFXLEVBQWpCOztnQ0FFQSxDQUFxQzlCLElBQXJDLEVBQTJDO2VBQVc4QixTQUFTaE4sSUFBVCxDQUFjNkwsT0FBZCxDQUFYO09BQTNDOztXQUVLLElBQUloTixJQUFJLENBQWIsRUFBZ0JBLElBQUltTyxTQUFTbFMsTUFBN0IsRUFBcUMrRCxHQUFyQyxFQUEwQztZQUNsQ2dOLFVBQVVtQixTQUFTbk8sQ0FBVCxDQUFoQjtZQUNJZ04sUUFBUW9CLFVBQVIsS0FBdUJDLG1CQUFRQyxNQUFuQyxFQUEyQztlQUNwQ0ksb0JBQUwsQ0FBMEIxQixPQUExQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0NBb0VjWCxNQUFrQzs7O1VBQTVCTyxjQUE0Qix1RUFBWCxJQUFJcEMsR0FBSixFQUFXOztVQUM5QzJELFdBQVcsRUFBakI7O1VBRU1RLGlCQUFpQixTQUFqQkEsY0FBaUIsVUFBVztZQUM1QjNCLFFBQVF4QixTQUFSLEtBQXNCLE1BQXRCLElBQWdDd0IsUUFBUUMsWUFBUixDQUFxQixLQUFyQixNQUFnQyxRQUFwRSxFQUE4RTs7O2NBR3RFQyxpQ0FBbUNGLFFBQVFHLE1BQWpEOztjQUVJRCxzQkFBc0JKLElBQXRCLElBQThCSSxXQUFXMEIsVUFBWCxLQUEwQixVQUE1RCxFQUF3RTt1QkFDM0Q3QyxxQkFBWCxHQUFtQyxJQUFuQzs7O3VCQUdXOEMsZ0JBQVgsR0FBOEIsSUFBOUI7V0FKRixNQUtPOzs7b0JBR0dDLGdCQUFSLENBQXlCLE1BQXpCLEVBQWlDLFlBQU07a0JBQy9CNUIsaUNBQW1DRixRQUFRRyxNQUFqRDs7a0JBRUlELFdBQVc2Qix3QkFBZixFQUF5Qzt5QkFDOUJBLHdCQUFYLEdBQXNDLElBQXRDOzt5QkFFV2hELHFCQUFYLEdBQW1DLElBQW5DOzs7eUJBR1c4QyxnQkFBWCxHQUE4QixJQUE5Qjs7Ozs7Ozs2QkFRZUcsTUFBZixDQUFzQjlCLFVBQXRCOztxQkFFSytCLG1CQUFMLENBQXlCL0IsVUFBekIsRUFBcUNOLGNBQXJDO2FBbkJGOztTQWJKLE1BbUNPO21CQUNJekwsSUFBVCxDQUFjNkwsT0FBZDs7T0FyQ0o7Ozs7Z0NBMkNBLENBQXFDWCxJQUFyQyxFQUEyQ3NDLGNBQTNDLEVBQTJEL0IsY0FBM0Q7O1VBRUksS0FBS2tCLFdBQVQsRUFBc0I7YUFDZixJQUFJOU4sSUFBSSxDQUFiLEVBQWdCQSxJQUFJbU8sU0FBU2xTLE1BQTdCLEVBQXFDK0QsR0FBckMsRUFBMEM7ZUFDbkNpTyxLQUFMLENBQVdFLFNBQVNuTyxDQUFULENBQVg7Ozs7V0FJQyxJQUFJQSxLQUFJLENBQWIsRUFBZ0JBLEtBQUltTyxTQUFTbFMsTUFBN0IsRUFBcUMrRCxJQUFyQyxFQUEwQzthQUNuQ3lPLGNBQUwsQ0FBb0JOLFNBQVNuTyxFQUFULENBQXBCOzs7Ozs7Ozs7O21DQU9XZ04sU0FBUztVQUNoQmtDLGVBQWVsQyxRQUFRb0IsVUFBN0I7VUFDSWMsaUJBQWlCaFUsU0FBckIsRUFBZ0M7O1VBRTFCNlMsYUFBYSxLQUFLb0IscUJBQUwsQ0FBMkJuQyxRQUFReEIsU0FBbkMsQ0FBbkI7VUFDSSxDQUFDdUMsVUFBTCxFQUFpQjs7aUJBRU5xQixpQkFBWCxDQUE2QmpPLElBQTdCLENBQWtDNkwsT0FBbEM7O1VBRU14SixjQUFjdUssV0FBV3ZLLFdBQS9CO1VBQ0k7WUFDRTtjQUNFdEMsU0FBUyxJQUFLc0MsV0FBTCxFQUFiO2NBQ0l0QyxXQUFXOEwsT0FBZixFQUF3QjtrQkFDaEIsSUFBSXFDLEtBQUosQ0FBVSw0RUFBVixDQUFOOztTQUhKLFNBS1U7cUJBQ0dELGlCQUFYLENBQTZCRSxHQUE3Qjs7T0FQSixDQVNFLE9BQU90VyxDQUFQLEVBQVU7Z0JBQ0ZvVixVQUFSLEdBQXFCQyxtQkFBUWtCLE1BQTdCO2NBQ012VyxDQUFOOzs7Y0FHTW9WLFVBQVIsR0FBcUJDLG1CQUFRQyxNQUE3QjtjQUNRa0IsZUFBUixHQUEwQnpCLFVBQTFCOztVQUVJQSxXQUFXMEIsd0JBQWYsRUFBeUM7WUFDakNDLHFCQUFxQjNCLFdBQVcyQixrQkFBdEM7YUFDSyxJQUFJMVAsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMFAsbUJBQW1CelQsTUFBdkMsRUFBK0MrRCxHQUEvQyxFQUFvRDtjQUM1Q3ZELE9BQU9pVCxtQkFBbUIxUCxDQUFuQixDQUFiO2NBQ016RixRQUFReVMsUUFBUUMsWUFBUixDQUFxQnhRLElBQXJCLENBQWQ7Y0FDSWxDLFVBQVUsSUFBZCxFQUFvQjtpQkFDYmtWLHdCQUFMLENBQThCekMsT0FBOUIsRUFBdUN2USxJQUF2QyxFQUE2QyxJQUE3QyxFQUFtRGxDLEtBQW5ELEVBQTBELElBQTFEOzs7OztVQUtGZ1UsV0FBQSxDQUFzQnZCLE9BQXRCLENBQUosRUFBb0M7YUFDN0J3QixpQkFBTCxDQUF1QnhCLE9BQXZCOzs7Ozs7Ozs7O3NDQU9jQSxTQUFTO1VBQ25CZSxhQUFhZixRQUFRd0MsZUFBM0I7VUFDSXpCLFdBQVdTLGlCQUFmLEVBQWtDO21CQUNyQkEsaUJBQVgsQ0FBNkJ6VSxJQUE3QixDQUFrQ2lULE9BQWxDOzs7Y0FHTTJDLDhCQUFSLEdBQXlDLElBQXpDOzs7Ozs7Ozs7eUNBTW1CM0MsU0FBUztVQUN4QixDQUFDQSxRQUFRMkMsOEJBQWIsRUFBNkM7YUFDdENuQixpQkFBTCxDQUF1QnhCLE9BQXZCOzs7VUFHSWUsYUFBYWYsUUFBUXdDLGVBQTNCO1VBQ0l6QixXQUFXVyxvQkFBZixFQUFxQzttQkFDeEJBLG9CQUFYLENBQWdDM1UsSUFBaEMsQ0FBcUNpVCxPQUFyQzs7O2NBR00yQyw4QkFBUixHQUF5Q3pVLFNBQXpDOzs7Ozs7Ozs7Ozs7OzZDQVV1QjhSLFNBQVN2USxNQUFNbVQsVUFBVUMsVUFBVUMsV0FBVztVQUMvRC9CLGFBQWFmLFFBQVF3QyxlQUEzQjtVQUVFekIsV0FBVzBCLHdCQUFYLElBQ0ExQixXQUFXMkIsa0JBQVgsQ0FBOEJLLE9BQTlCLENBQXNDdFQsSUFBdEMsSUFBOEMsQ0FBQyxDQUZqRCxFQUdFO21CQUNXZ1Qsd0JBQVgsQ0FBb0MxVixJQUFwQyxDQUF5Q2lULE9BQXpDLEVBQWtEdlEsSUFBbEQsRUFBd0RtVCxRQUF4RCxFQUFrRUMsUUFBbEUsRUFBNEVDLFNBQTVFOzs7Ozs7O0lDN1RlRTt3Q0FDUEMsU0FBWixFQUF1QkMsR0FBdkIsRUFBNEI7Ozs7OztTQUlyQkMsVUFBTCxHQUFrQkYsU0FBbEI7Ozs7O1NBS0tHLFNBQUwsR0FBaUJGLEdBQWpCOzs7OztTQUtLRyxTQUFMLEdBQWlCblYsU0FBakI7Ozs7U0FLS2lWLFVBQUwsQ0FBZ0JsQixtQkFBaEIsQ0FBb0MsS0FBS21CLFNBQXpDOztRQUVJLEtBQUtBLFNBQUwsQ0FBZXhCLFVBQWYsS0FBOEIsU0FBbEMsRUFBNkM7V0FDdEN5QixTQUFMLEdBQWlCLElBQUlDLGdCQUFKLENBQXFCLEtBQUtDLGdCQUFMLENBQXNCQyxJQUF0QixDQUEyQixJQUEzQixDQUFyQixDQUFqQjs7Ozs7O1dBTUtILFNBQUwsQ0FBZUksT0FBZixDQUF1QixLQUFLTCxTQUE1QixFQUF1QzttQkFDMUIsSUFEMEI7aUJBRTVCO09BRlg7Ozs7OztpQ0FPUztVQUNQLEtBQUtDLFNBQVQsRUFBb0I7YUFDYkEsU0FBTCxDQUFlSyxVQUFmOzs7Ozs7Ozs7O3FDQU9hQyxXQUFXOzs7O1VBSXBCL0IsYUFBYSxLQUFLd0IsU0FBTCxDQUFleEIsVUFBbEM7VUFDSUEsZUFBZSxhQUFmLElBQWdDQSxlQUFlLFVBQW5ELEVBQStEO2FBQ3hEOEIsVUFBTDs7O1dBR0csSUFBSTFRLElBQUksQ0FBYixFQUFnQkEsSUFBSTJRLFVBQVUxVSxNQUE5QixFQUFzQytELEdBQXRDLEVBQTJDO1lBQ25DNFEsYUFBYUQsVUFBVTNRLENBQVYsRUFBYTRRLFVBQWhDO2FBQ0ssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxXQUFXM1UsTUFBL0IsRUFBdUM0VSxHQUF2QyxFQUE0QztjQUNwQ2pGLE9BQU9nRixXQUFXQyxDQUFYLENBQWI7ZUFDS1YsVUFBTCxDQUFnQmxCLG1CQUFoQixDQUFvQ3JELElBQXBDOzs7Ozs7OztBQzVEUjs7O0lBR3FCa0Y7c0JBQ0w7Ozs7Ozs7OztTQUtQQyxNQUFMLEdBQWM3VixTQUFkOzs7Ozs7U0FNSzhWLFFBQUwsR0FBZ0I5VixTQUFoQjs7Ozs7O1NBTUsrVixRQUFMLEdBQWdCLElBQUlDLE9BQUosQ0FBWSxtQkFBVztZQUNoQ0YsUUFBTCxHQUFnQkcsT0FBaEI7O1VBRUksTUFBS0osTUFBVCxFQUFpQjtnQkFDUCxNQUFLQSxNQUFiOztLQUpZLENBQWhCOzs7Ozs7Ozs7OzRCQVlNeFcsT0FBTztVQUNULEtBQUt3VyxNQUFULEVBQWlCO2NBQ1QsSUFBSTFCLEtBQUosQ0FBVSxtQkFBVixDQUFOOzs7V0FHRzBCLE1BQUwsR0FBY3hXLEtBQWQ7O1VBRUksS0FBS3lXLFFBQVQsRUFBbUI7YUFDWkEsUUFBTCxDQUFjelcsS0FBZDs7Ozs7Ozs7OztnQ0FPUTthQUNILEtBQUswVyxRQUFaOzs7Ozs7QUM1Q0o7Ozs7SUFHcUJHOzs7OztpQ0FLUG5CLFNBQVosRUFBdUI7Ozs7Ozs7U0FLaEJvQiwyQkFBTCxHQUFtQyxLQUFuQzs7Ozs7O1NBTUtsQixVQUFMLEdBQWtCRixTQUFsQjs7Ozs7O1NBTUtxQixvQkFBTCxHQUE0QixJQUFJakcsR0FBSixFQUE1Qjs7Ozs7OztTQU9La0csY0FBTCxHQUFzQjthQUFNM1gsSUFBTjtLQUF0Qjs7Ozs7O1NBTUs0WCxhQUFMLEdBQXFCLEtBQXJCOzs7Ozs7U0FNS0Msb0JBQUwsR0FBNEIsRUFBNUI7Ozs7OztTQU1LQyw2QkFBTCxHQUFxQyxJQUFJMUIsNEJBQUosQ0FBaUNDLFNBQWpDLEVBQTRDM1csUUFBNUMsQ0FBckM7Ozs7Ozs7Ozs7OzJCQU9La1MsV0FBV2hJLGFBQWE7OztVQUN6QixFQUFFQSx1QkFBdUJqTCxRQUF6QixDQUFKLEVBQXdDO2NBQ2hDLElBQUlPLFNBQUosQ0FBYyxnREFBZCxDQUFOOzs7VUFHRSxDQUFDeVYsd0JBQUEsQ0FBbUMvQyxTQUFuQyxDQUFMLEVBQW9EO2NBQzVDLElBQUltRyxXQUFKLHlCQUFxQ25HLFNBQXJDLHNCQUFOOzs7VUFHRSxLQUFLMkUsVUFBTCxDQUFnQmhCLHFCQUFoQixDQUFzQzNELFNBQXRDLENBQUosRUFBc0Q7Y0FDOUMsSUFBSTZELEtBQUosbUNBQXlDN0QsU0FBekMsa0NBQU47OztVQUdFLEtBQUs2RiwyQkFBVCxFQUFzQztjQUM5QixJQUFJaEMsS0FBSixDQUFVLDRDQUFWLENBQU47O1dBRUdnQywyQkFBTCxHQUFtQyxJQUFuQzs7VUFFSTdDLDBCQUFKO1VBQ0lFLDZCQUFKO1VBQ0lrRCx3QkFBSjtVQUNJbkMsaUNBQUo7VUFDSUMsMkJBQUo7VUFDSTtZQU9PbUMsV0FQUCxHQU9GLFNBQVNBLFdBQVQsQ0FBcUJwVixJQUFyQixFQUEyQjtjQUNuQnFWLGdCQUFnQi9WLFVBQVVVLElBQVYsQ0FBdEI7Y0FDSXFWLGtCQUFrQjVXLFNBQWxCLElBQStCLEVBQUU0Vyx5QkFBeUJ2WixRQUEzQixDQUFuQyxFQUF5RTtrQkFDakUsSUFBSThXLEtBQUosWUFBa0I1UyxJQUFsQixxQ0FBTjs7aUJBRUtxVixhQUFQO1NBWkE7OztZQUVJL1YsWUFBWXlILFlBQVl6SCxTQUE5QjtZQUNJLEVBQUVBLHFCQUFxQjdDLE1BQXZCLENBQUosRUFBb0M7Z0JBQzVCLElBQUlKLFNBQUosQ0FBYywrREFBZCxDQUFOOzs7NEJBV2tCK1ksWUFBWSxtQkFBWixDQUFwQjsrQkFDdUJBLFlBQVksc0JBQVosQ0FBdkI7MEJBQ2tCQSxZQUFZLGlCQUFaLENBQWxCO21DQUMyQkEsWUFBWSwwQkFBWixDQUEzQjs2QkFDcUJyTyxZQUFZLG9CQUFaLEtBQXFDLEVBQTFEO09BbkJGLENBb0JFLE9BQU94SyxDQUFQLEVBQVU7O09BcEJaLFNBc0JVO2FBQ0hxWSwyQkFBTCxHQUFtQyxLQUFuQzs7O1VBR0l0RCxhQUFhOzRCQUFBO2dDQUFBOzRDQUFBO2tEQUFBO3dDQUFBOzBEQUFBOzhDQUFBOzJCQVFFO09BUnJCOztXQVdLb0MsVUFBTCxDQUFnQjRCLGFBQWhCLENBQThCdkcsU0FBOUIsRUFBeUN1QyxVQUF6Qzs7V0FFSzBELG9CQUFMLENBQTBCdFEsSUFBMUIsQ0FBK0JxSyxTQUEvQjs7OztVQUlJLENBQUMsS0FBS2dHLGFBQVYsRUFBeUI7YUFDbEJBLGFBQUwsR0FBcUIsSUFBckI7YUFDS0QsY0FBTCxDQUFvQjtpQkFBTSxNQUFLUyxNQUFMLEVBQU47U0FBcEI7Ozs7OzZCQUlLOzs7O1VBSUgsS0FBS1IsYUFBTCxLQUF1QixLQUEzQixFQUFrQzs7V0FFN0JBLGFBQUwsR0FBcUIsS0FBckI7V0FDS3JCLFVBQUwsQ0FBZ0JsQixtQkFBaEIsQ0FBb0MzVixRQUFwQzs7YUFFTyxLQUFLbVksb0JBQUwsQ0FBMEJ4VixNQUExQixHQUFtQyxDQUExQyxFQUE2QztZQUNyQ3VQLFlBQVksS0FBS2lHLG9CQUFMLENBQTBCUSxLQUExQixFQUFsQjtZQUNNQyxXQUFXLEtBQUtaLG9CQUFMLENBQTBCbFksR0FBMUIsQ0FBOEJvUyxTQUE5QixDQUFqQjtZQUNJMEcsUUFBSixFQUFjO21CQUNIZixPQUFULENBQWlCalcsU0FBakI7Ozs7Ozs7Ozs7OzsyQkFTRnNRLFdBQVc7VUFDUHVDLGFBQWEsS0FBS29DLFVBQUwsQ0FBZ0JoQixxQkFBaEIsQ0FBc0MzRCxTQUF0QyxDQUFuQjtVQUNJdUMsVUFBSixFQUFnQjtlQUNQQSxXQUFXdkssV0FBbEI7OzthQUdLdEksU0FBUDs7Ozs7Ozs7OztnQ0FPVXNRLFdBQVc7VUFDakIsQ0FBQytDLHdCQUFBLENBQW1DL0MsU0FBbkMsQ0FBTCxFQUFvRDtlQUMzQzBGLFFBQVFpQixNQUFSLENBQWUsSUFBSVIsV0FBSixRQUFvQm5HLFNBQXBCLDRDQUFmLENBQVA7OztVQUdJNEcsUUFBUSxLQUFLZCxvQkFBTCxDQUEwQmxZLEdBQTFCLENBQThCb1MsU0FBOUIsQ0FBZDtVQUNJNEcsS0FBSixFQUFXO2VBQ0ZBLE1BQU1DLFNBQU4sRUFBUDs7O1VBR0lILFdBQVcsSUFBSXBCLFFBQUosRUFBakI7V0FDS1Esb0JBQUwsQ0FBMEIxUyxHQUExQixDQUE4QjRNLFNBQTlCLEVBQXlDMEcsUUFBekM7O1VBRU1uRSxhQUFhLEtBQUtvQyxVQUFMLENBQWdCaEIscUJBQWhCLENBQXNDM0QsU0FBdEMsQ0FBbkI7Ozs7VUFJSXVDLGNBQWMsS0FBSzBELG9CQUFMLENBQTBCMUIsT0FBMUIsQ0FBa0N2RSxTQUFsQyxNQUFpRCxDQUFDLENBQXBFLEVBQXVFO2lCQUM1RDJGLE9BQVQsQ0FBaUJqVyxTQUFqQjs7O2FBR0tnWCxTQUFTRyxTQUFULEVBQVA7Ozs7OENBR3dCQyxPQUFPO1dBQzFCWiw2QkFBTCxDQUFtQ2hCLFVBQW5DO1VBQ002QixRQUFRLEtBQUtoQixjQUFuQjtXQUNLQSxjQUFMLEdBQXNCO2VBQVNlLE1BQU07aUJBQU1DLE1BQU1DLEtBQU4sQ0FBTjtTQUFOLENBQVQ7T0FBdEI7Ozs7OztBQUlKLEFBQ0F4YSxPQUFPLHVCQUFQLElBQWtDb1oscUJBQWxDO0FBQ0FBLHNCQUFzQnJWLFNBQXRCLENBQWdDLFFBQWhDLElBQTRDcVYsc0JBQXNCclYsU0FBdEIsQ0FBZ0MwVyxNQUE1RTtBQUNBckIsc0JBQXNCclYsU0FBdEIsQ0FBZ0MsS0FBaEMsSUFBeUNxVixzQkFBc0JyVixTQUF0QixDQUFnQzNDLEdBQXpFO0FBQ0FnWSxzQkFBc0JyVixTQUF0QixDQUFnQyxhQUFoQyxJQUFpRHFWLHNCQUFzQnJWLFNBQXRCLENBQWdDMlcsV0FBakY7QUFDQXRCLHNCQUFzQnJWLFNBQXRCLENBQWdDLDJCQUFoQyxJQUErRHFWLHNCQUFzQnJWLFNBQXRCLENBQWdDNFcseUJBQS9GOztBQzdNQSxhQUFlOzBCQUNXM2EsT0FBT2dVLFFBQVAsQ0FBZ0JqUSxTQUFoQixDQUEwQnZDLGFBRHJDOzRCQUVheEIsT0FBT2dVLFFBQVAsQ0FBZ0JqUSxTQUFoQixDQUEwQjZXLGVBRnZDO3VCQUdRNWEsT0FBT2dVLFFBQVAsQ0FBZ0JqUSxTQUFoQixDQUEwQm1SLFVBSGxDO29CQUlLbFYsT0FBT2dVLFFBQVAsQ0FBZ0JqUSxTQUFoQixDQUEwQixTQUExQixDQUpMO21CQUtJL0QsT0FBT2dVLFFBQVAsQ0FBZ0JqUSxTQUFoQixDQUEwQixRQUExQixDQUxKO2tCQU1HL0QsT0FBTzhVLElBQVAsQ0FBWS9RLFNBQVosQ0FBc0I4VyxTQU56QjtvQkFPSzdhLE9BQU84VSxJQUFQLENBQVkvUSxTQUFaLENBQXNCb0csV0FQM0I7cUJBUU1uSyxPQUFPOFUsSUFBUCxDQUFZL1EsU0FBWixDQUFzQitXLFlBUjVCO29CQVNLOWEsT0FBTzhVLElBQVAsQ0FBWS9RLFNBQVosQ0FBc0JnWCxXQVQzQjtxQkFVTS9hLE9BQU84VSxJQUFQLENBQVkvUSxTQUFaLENBQXNCaVgsWUFWNUI7b0JBV0s5WixPQUFPa0Ysd0JBQVAsQ0FBZ0NwRyxPQUFPOFUsSUFBUCxDQUFZL1EsU0FBNUMsRUFBdUQsYUFBdkQsQ0FYTDt3QkFZUy9ELE9BQU9pYixPQUFQLENBQWVsWCxTQUFmLENBQXlCLGNBQXpCLENBWlQ7cUJBYU03QyxPQUFPa0Ysd0JBQVAsQ0FBZ0NwRyxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBL0MsRUFBMEQsV0FBMUQsQ0FiTjt3QkFjUy9ELE9BQU9pYixPQUFQLENBQWVsWCxTQUFmLENBQXlCa1IsWUFkbEM7d0JBZVNqVixPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5Qm1YLFlBZmxDOzJCQWdCWWxiLE9BQU9pYixPQUFQLENBQWVsWCxTQUFmLENBQXlCb1gsZUFoQnJDOzBCQWlCV25iLE9BQU9pYixPQUFQLENBQWVsWCxTQUFmLENBQXlCcVgsY0FqQnBDOzBCQWtCV3BiLE9BQU9pYixPQUFQLENBQWVsWCxTQUFmLENBQXlCc1gsY0FsQnBDOzZCQW1CY3JiLE9BQU9pYixPQUFQLENBQWVsWCxTQUFmLENBQXlCdVgsaUJBbkJ2QztpQ0FvQmtCdGIsT0FBT2liLE9BQVAsQ0FBZWxYLFNBQWYsQ0FBeUIsdUJBQXpCLENBcEJsQjttQkFxQkkvRCxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5QixTQUF6QixDQXJCSjtrQkFzQkcvRCxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5QixRQUF6QixDQXRCSDtrQkF1QkcvRCxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5QixRQUF6QixDQXZCSDtpQkF3QkUvRCxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5QixPQUF6QixDQXhCRjt1QkF5QlEvRCxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5QixhQUF6QixDQXpCUjtrQkEwQkcvRCxPQUFPaWIsT0FBUCxDQUFlbFgsU0FBZixDQUF5QixRQUF6QixDQTFCSDtlQTJCQS9ELE9BQU91YixXQTNCUDt5QkE0QlVyYSxPQUFPa0Ysd0JBQVAsQ0FBZ0NwRyxPQUFPdWIsV0FBUCxDQUFtQnhYLFNBQW5ELEVBQThELFdBQTlELENBNUJWO3FDQTZCc0IvRCxPQUFPdWIsV0FBUCxDQUFtQnhYLFNBQW5CLENBQTZCLHVCQUE3QjtDQTdCckM7O0FDQUE7Ozs7Ozs7SUFPTXlYOzs7O0FBRU4saUNBQWUsSUFBSUEsd0JBQUosRUFBZjs7QUNKQTs7O0FBR0EsdUJBQWUsVUFBU3ZELFNBQVQsRUFBb0I7U0FDMUIsYUFBUCxJQUF5QixZQUFXOzs7O2FBSXpCc0QsV0FBVCxHQUF1Qjs7Ozs7VUFLZi9QLGNBQWMsS0FBS0EsV0FBekI7O1VBRU11SyxhQUFha0MsVUFBVXdELHVCQUFWLENBQWtDalEsV0FBbEMsQ0FBbkI7VUFDSSxDQUFDdUssVUFBTCxFQUFpQjtjQUNULElBQUlzQixLQUFKLENBQVUsZ0ZBQVYsQ0FBTjs7O1VBR0lELG9CQUFvQnJCLFdBQVdxQixpQkFBckM7O1VBRUlBLGtCQUFrQm5ULE1BQWxCLEtBQTZCLENBQWpDLEVBQW9DO1lBQzVCK1EsV0FBVTBHLE9BQU9DLHNCQUFQLENBQThCNVosSUFBOUIsQ0FBbUNULFFBQW5DLEVBQTZDeVUsV0FBV3ZDLFNBQXhELENBQWhCO2VBQ08vTSxjQUFQLENBQXNCdU8sUUFBdEIsRUFBK0J4SixZQUFZekgsU0FBM0M7aUJBQ1FxUyxVQUFSLEdBQXFCQyxtQkFBUUMsTUFBN0I7aUJBQ1FrQixlQUFSLEdBQTBCekIsVUFBMUI7a0JBQ1VFLEtBQVYsQ0FBZ0JqQixRQUFoQjtlQUNPQSxRQUFQOzs7VUFHSTRHLFlBQVl4RSxrQkFBa0JuVCxNQUFsQixHQUEyQixDQUE3QztVQUNNK1EsVUFBVW9DLGtCQUFrQndFLFNBQWxCLENBQWhCO1VBQ0k1RyxZQUFZd0csMEJBQWhCLEVBQTBDO2NBQ2xDLElBQUluRSxLQUFKLENBQVUsMEdBQVYsQ0FBTjs7d0JBRWdCdUUsU0FBbEIsSUFBK0JKLDBCQUEvQjs7YUFFTy9VLGNBQVAsQ0FBc0J1TyxPQUF0QixFQUErQnhKLFlBQVl6SCxTQUEzQztnQkFDVWtTLEtBQVYsNkJBQTZDakIsT0FBN0M7O2FBRU9BLE9BQVA7OztnQkFHVWpSLFNBQVosR0FBd0IyWCxPQUFPSCxXQUFQLENBQW1CeFgsU0FBM0M7O1dBRU93WCxXQUFQO0dBMUNzQixFQUF4Qjs7O0FDRUY7Ozs7O0FBS0Esc0JBQWUsVUFBU3RELFNBQVQsRUFBb0J6QyxXQUFwQixFQUFpQ3FHLE9BQWpDLEVBQTBDOzs7O2NBSTNDLFNBQVosSUFBeUIsWUFBbUI7c0NBQVBDLEtBQU87V0FBQTs7OztRQUVwQ0MsOENBQWdERCxNQUFNRSxNQUFOLENBQWEsZ0JBQVE7O2FBRWxFcEksZ0JBQWdCa0IsSUFBaEIsSUFBd0J5QixXQUFBLENBQXNCM0MsSUFBdEIsQ0FBL0I7S0FGb0QsQ0FBdEQ7O1lBS1FxSSxPQUFSLENBQWdCN1gsS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEIwWCxLQUE1Qjs7U0FFSyxJQUFJOVQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK1QsZ0JBQWdCOVgsTUFBcEMsRUFBNEMrRCxHQUE1QyxFQUFpRDtnQkFDckNrVSxjQUFWLENBQXlCSCxnQkFBZ0IvVCxDQUFoQixDQUF6Qjs7O1FBR0V1TyxXQUFBLENBQXNCLElBQXRCLENBQUosRUFBaUM7V0FDMUIsSUFBSXZPLEtBQUksQ0FBYixFQUFnQkEsS0FBSThULE1BQU03WCxNQUExQixFQUFrQytELElBQWxDLEVBQXVDO1lBQy9CNEwsT0FBT2tJLE1BQU05VCxFQUFOLENBQWI7WUFDSTRMLGdCQUFnQnFILE9BQXBCLEVBQTZCO29CQUNqQmtCLFdBQVYsQ0FBc0J2SSxJQUF0Qjs7OztHQWpCUjs7Ozs7Y0EwQlksUUFBWixJQUF3QixZQUFtQjt1Q0FBUGtJLEtBQU87V0FBQTs7OztRQUVuQ0MsOENBQWdERCxNQUFNRSxNQUFOLENBQWEsZ0JBQVE7O2FBRWxFcEksZ0JBQWdCa0IsSUFBaEIsSUFBd0J5QixXQUFBLENBQXNCM0MsSUFBdEIsQ0FBL0I7S0FGb0QsQ0FBdEQ7O1lBS1F3SSxNQUFSLENBQWVoWSxLQUFmLENBQXFCLElBQXJCLEVBQTJCMFgsS0FBM0I7O1NBRUssSUFBSTlULElBQUksQ0FBYixFQUFnQkEsSUFBSStULGdCQUFnQjlYLE1BQXBDLEVBQTRDK0QsR0FBNUMsRUFBaUQ7Z0JBQ3JDa1UsY0FBVixDQUF5QkgsZ0JBQWdCL1QsQ0FBaEIsQ0FBekI7OztRQUdFdU8sV0FBQSxDQUFzQixJQUF0QixDQUFKLEVBQWlDO1dBQzFCLElBQUl2TyxNQUFJLENBQWIsRUFBZ0JBLE1BQUk4VCxNQUFNN1gsTUFBMUIsRUFBa0MrRCxLQUFsQyxFQUF1QztZQUMvQjRMLE9BQU9rSSxNQUFNOVQsR0FBTixDQUFiO1lBQ0k0TCxnQkFBZ0JxSCxPQUFwQixFQUE2QjtvQkFDakJrQixXQUFWLENBQXNCdkksSUFBdEI7Ozs7R0FqQlI7OztBQ3hDRjs7O0FBR0Esb0JBQWUsVUFBU3FFLFNBQVQsRUFBb0I7c0JBQ2pDLENBQStCakUsU0FBU2pRLFNBQXhDLEVBQW1ELGVBQW5EOzs7Ozs7WUFNV3lQLFNBQVQsRUFBb0I7O1FBRWQsS0FBS3FELGdCQUFULEVBQTJCO1VBQ25CZCxhQUFha0MsVUFBVWQscUJBQVYsQ0FBZ0MzRCxTQUFoQyxDQUFuQjtVQUNJdUMsVUFBSixFQUFnQjtlQUNQLElBQUtBLFdBQVd2SyxXQUFoQixFQUFQOzs7O1FBSUV0QztXQUNJeVMsc0JBQVAsQ0FBOEI1WixJQUE5QixDQUFtQyxJQUFuQyxFQUF5Q3lSLFNBQXpDLENBREg7Y0FFVXlDLEtBQVYsQ0FBZ0IvTSxNQUFoQjtXQUNPQSxNQUFQO0dBbEJKOztzQkFxQkEsQ0FBK0I4SyxTQUFTalEsU0FBeEMsRUFBbUQsWUFBbkQ7Ozs7Ozs7WUFPVzZQLElBQVQsRUFBZXlJLElBQWYsRUFBcUI7UUFDYkMsUUFBUVosT0FBT2EsbUJBQVAsQ0FBMkJ4YSxJQUEzQixDQUFnQyxJQUFoQyxFQUFzQzZSLElBQXRDLEVBQTRDeUksSUFBNUMsQ0FBZDs7UUFFSSxDQUFDLEtBQUt4RixnQkFBVixFQUE0QjtnQkFDaEIyRixTQUFWLENBQW9CRixLQUFwQjtLQURGLE1BRU87Z0JBQ0tyRixtQkFBVixDQUE4QnFGLEtBQTlCOztXQUVLQSxLQUFQO0dBZko7O01Ba0JNRyxVQUFVLDhCQUFoQjs7c0JBRUEsQ0FBK0J6SSxTQUFTalEsU0FBeEMsRUFBbUQsaUJBQW5EOzs7Ozs7O1lBT1crVCxTQUFULEVBQW9CdEUsU0FBcEIsRUFBK0I7O1FBRXpCLEtBQUtxRCxnQkFBTCxLQUEwQmlCLGNBQWMsSUFBZCxJQUFzQkEsY0FBYzJFLE9BQTlELENBQUosRUFBNEU7VUFDcEUxRyxhQUFha0MsVUFBVWQscUJBQVYsQ0FBZ0MzRCxTQUFoQyxDQUFuQjtVQUNJdUMsVUFBSixFQUFnQjtlQUNQLElBQUtBLFdBQVd2SyxXQUFoQixFQUFQOzs7O1FBSUV0QztXQUNJd1Qsd0JBQVAsQ0FBZ0MzYSxJQUFoQyxDQUFxQyxJQUFyQyxFQUEyQytWLFNBQTNDLEVBQXNEdEUsU0FBdEQsQ0FESDtjQUVVeUMsS0FBVixDQUFnQi9NLE1BQWhCO1dBQ09BLE1BQVA7R0FuQko7O2tCQXNCZ0IrTyxTQUFoQixFQUEyQmpFLFNBQVNqUSxTQUFwQyxFQUErQzthQUNwQzJYLE9BQU9pQixnQkFENkI7WUFFckNqQixPQUFPa0I7R0FGakI7OztBQ3JFRjs7O0FBR0EsZ0JBQWUsVUFBUzNFLFNBQVQsRUFBb0I7Ozs7c0JBSWpDLENBQStCbkQsS0FBSy9RLFNBQXBDLEVBQStDLGNBQS9DOzs7Ozs7O1lBT1c2UCxJQUFULEVBQWVpSixPQUFmLEVBQXdCO1FBQ2xCakosZ0JBQWdCa0osZ0JBQXBCLEVBQXNDO1VBQzlCQyxnQkFBZ0JsVyxNQUFNOUMsU0FBTixDQUFnQmdDLEtBQWhCLENBQXNCM0IsS0FBdEIsQ0FBNEJ3UCxLQUFLb0osVUFBakMsQ0FBdEI7VUFDTUMsZ0JBQWV2QixPQUFPd0IsaUJBQVAsQ0FBeUJuYixJQUF6QixDQUE4QixJQUE5QixFQUFvQzZSLElBQXBDLEVBQTBDaUosT0FBMUMsQ0FBckI7Ozs7O1VBS0l0RyxXQUFBLENBQXNCLElBQXRCLENBQUosRUFBaUM7YUFDMUIsSUFBSXZPLElBQUksQ0FBYixFQUFnQkEsSUFBSStVLGNBQWM5WSxNQUFsQyxFQUEwQytELEdBQTFDLEVBQStDO29CQUNuQ21VLFdBQVYsQ0FBc0JZLGNBQWMvVSxDQUFkLENBQXRCOzs7O2FBSUdpVixhQUFQOzs7UUFHSUUsbUJBQW1CNUcsV0FBQSxDQUFzQjNDLElBQXRCLENBQXpCO1FBQ01xSixlQUFldkIsT0FBT3dCLGlCQUFQLENBQXlCbmIsSUFBekIsQ0FBOEIsSUFBOUIsRUFBb0M2UixJQUFwQyxFQUEwQ2lKLE9BQTFDLENBQXJCOztRQUVJTSxnQkFBSixFQUFzQjtnQkFDVmpCLGNBQVYsQ0FBeUJ0SSxJQUF6Qjs7O1FBR0UyQyxXQUFBLENBQXNCLElBQXRCLENBQUosRUFBaUM7Z0JBQ3JCNEYsV0FBVixDQUFzQnZJLElBQXRCOzs7V0FHS3FKLFlBQVA7R0FuQ0o7O3NCQXNDQSxDQUErQm5JLEtBQUsvUSxTQUFwQyxFQUErQyxhQUEvQzs7Ozs7O1lBTVc2UCxJQUFULEVBQWU7UUFDVEEsZ0JBQWdCa0osZ0JBQXBCLEVBQXNDO1VBQzlCQyxnQkFBZ0JsVyxNQUFNOUMsU0FBTixDQUFnQmdDLEtBQWhCLENBQXNCM0IsS0FBdEIsQ0FBNEJ3UCxLQUFLb0osVUFBakMsQ0FBdEI7VUFDTUMsaUJBQWV2QixPQUFPMEIsZ0JBQVAsQ0FBd0JyYixJQUF4QixDQUE2QixJQUE3QixFQUFtQzZSLElBQW5DLENBQXJCOzs7OztVQUtJMkMsV0FBQSxDQUFzQixJQUF0QixDQUFKLEVBQWlDO2FBQzFCLElBQUl2TyxJQUFJLENBQWIsRUFBZ0JBLElBQUkrVSxjQUFjOVksTUFBbEMsRUFBMEMrRCxHQUExQyxFQUErQztvQkFDbkNtVSxXQUFWLENBQXNCWSxjQUFjL1UsQ0FBZCxDQUF0Qjs7OzthQUlHaVYsY0FBUDs7O1FBR0lFLG1CQUFtQjVHLFdBQUEsQ0FBc0IzQyxJQUF0QixDQUF6QjtRQUNNcUosZUFBZXZCLE9BQU8wQixnQkFBUCxDQUF3QnJiLElBQXhCLENBQTZCLElBQTdCLEVBQW1DNlIsSUFBbkMsQ0FBckI7O1FBRUl1SixnQkFBSixFQUFzQjtnQkFDVmpCLGNBQVYsQ0FBeUJ0SSxJQUF6Qjs7O1FBR0UyQyxXQUFBLENBQXNCLElBQXRCLENBQUosRUFBaUM7Z0JBQ3JCNEYsV0FBVixDQUFzQnZJLElBQXRCOzs7V0FHS3FKLFlBQVA7R0FsQ0o7O3NCQXFDQSxDQUErQm5JLEtBQUsvUSxTQUFwQyxFQUErQyxXQUEvQzs7Ozs7O1lBTVdzWSxJQUFULEVBQWU7UUFDUEMsUUFBUVosT0FBTzJCLGNBQVAsQ0FBc0J0YixJQUF0QixDQUEyQixJQUEzQixFQUFpQ3NhLElBQWpDLENBQWQ7OztRQUdJLENBQUMsS0FBS2lCLGFBQUwsQ0FBbUJ6RyxnQkFBeEIsRUFBMEM7Z0JBQzlCMkYsU0FBVixDQUFvQkYsS0FBcEI7S0FERixNQUVPO2dCQUNLckYsbUJBQVYsQ0FBOEJxRixLQUE5Qjs7V0FFS0EsS0FBUDtHQWZKOztzQkFrQkEsQ0FBK0J4SCxLQUFLL1EsU0FBcEMsRUFBK0MsYUFBL0M7Ozs7OztZQU1XNlAsSUFBVCxFQUFlO1FBQ1B1SixtQkFBbUI1RyxXQUFBLENBQXNCM0MsSUFBdEIsQ0FBekI7UUFDTXFKLGVBQWV2QixPQUFPNkIsZ0JBQVAsQ0FBd0J4YixJQUF4QixDQUE2QixJQUE3QixFQUFtQzZSLElBQW5DLENBQXJCOztRQUVJdUosZ0JBQUosRUFBc0I7Z0JBQ1ZqQixjQUFWLENBQXlCdEksSUFBekI7OztXQUdLcUosWUFBUDtHQWRKOztzQkFpQkEsQ0FBK0JuSSxLQUFLL1EsU0FBcEMsRUFBK0MsY0FBL0M7Ozs7Ozs7WUFPV3laLFlBQVQsRUFBdUJDLFlBQXZCLEVBQXFDO1FBQy9CRCx3QkFBd0JWLGdCQUE1QixFQUE4QztVQUN0Q0MsZ0JBQWdCbFcsTUFBTTlDLFNBQU4sQ0FBZ0JnQyxLQUFoQixDQUFzQjNCLEtBQXRCLENBQTRCb1osYUFBYVIsVUFBekMsQ0FBdEI7VUFDTUMsaUJBQWV2QixPQUFPZ0MsaUJBQVAsQ0FBeUIzYixJQUF6QixDQUE4QixJQUE5QixFQUFvQ3liLFlBQXBDLEVBQWtEQyxZQUFsRCxDQUFyQjs7Ozs7VUFLSWxILFdBQUEsQ0FBc0IsSUFBdEIsQ0FBSixFQUFpQztrQkFDckIyRixjQUFWLENBQXlCdUIsWUFBekI7YUFDSyxJQUFJelYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK1UsY0FBYzlZLE1BQWxDLEVBQTBDK0QsR0FBMUMsRUFBK0M7b0JBQ25DbVUsV0FBVixDQUFzQlksY0FBYy9VLENBQWQsQ0FBdEI7Ozs7YUFJR2lWLGNBQVA7OztRQUdJVSwyQkFBMkJwSCxXQUFBLENBQXNCaUgsWUFBdEIsQ0FBakM7UUFDTVAsZUFBZXZCLE9BQU9nQyxpQkFBUCxDQUF5QjNiLElBQXpCLENBQThCLElBQTlCLEVBQW9DeWIsWUFBcEMsRUFBa0RDLFlBQWxELENBQXJCO1FBQ01HLGtCQUFrQnJILFdBQUEsQ0FBc0IsSUFBdEIsQ0FBeEI7O1FBRUlxSCxlQUFKLEVBQXFCO2dCQUNUMUIsY0FBVixDQUF5QnVCLFlBQXpCOzs7UUFHRUUsd0JBQUosRUFBOEI7Z0JBQ2xCekIsY0FBVixDQUF5QnNCLFlBQXpCOzs7UUFHRUksZUFBSixFQUFxQjtnQkFDVHpCLFdBQVYsQ0FBc0JxQixZQUF0Qjs7O1dBR0tQLFlBQVA7R0F6Q0o7O1dBNkNTWSxpQkFBVCxDQUEyQnJJLFdBQTNCLEVBQXdDc0ksY0FBeEMsRUFBd0Q7V0FDL0MzYyxjQUFQLENBQXNCcVUsV0FBdEIsRUFBbUMsYUFBbkMsRUFBa0Q7a0JBQ3BDc0ksZUFBZUMsVUFEcUI7b0JBRWxDLElBRmtDO1dBRzNDRCxlQUFlMWMsR0FINEI7OEJBSXZCLGFBQVM0YyxhQUFULEVBQXdCOztZQUUzQyxLQUFLbkosUUFBTCxLQUFrQkMsS0FBS21KLFNBQTNCLEVBQXNDO3lCQUNyQnJYLEdBQWYsQ0FBbUI3RSxJQUFuQixDQUF3QixJQUF4QixFQUE4QmljLGFBQTlCOzs7O1lBSUVFLGVBQWVoYixTQUFuQjs7O1lBR0ksS0FBS3VSLFVBQVQsRUFBcUI7OztjQUdidUksYUFBYSxLQUFLQSxVQUF4QjtjQUNNbUIsbUJBQW1CbkIsV0FBVy9ZLE1BQXBDO2NBQ0lrYSxtQkFBbUIsQ0FBbkIsSUFBd0I1SCxXQUFBLENBQXNCLElBQXRCLENBQTVCLEVBQXlEOzsyQkFFeEMsSUFBSTFQLEtBQUosQ0FBVXNYLGdCQUFWLENBQWY7aUJBQ0ssSUFBSW5XLElBQUksQ0FBYixFQUFnQkEsSUFBSW1XLGdCQUFwQixFQUFzQ25XLEdBQXRDLEVBQTJDOzJCQUM1QkEsQ0FBYixJQUFrQmdWLFdBQVdoVixDQUFYLENBQWxCOzs7Ozt1QkFLU3BCLEdBQWYsQ0FBbUI3RSxJQUFuQixDQUF3QixJQUF4QixFQUE4QmljLGFBQTlCOztZQUVJRSxZQUFKLEVBQWtCO2VBQ1gsSUFBSWxXLEtBQUksQ0FBYixFQUFnQkEsS0FBSWtXLGFBQWFqYSxNQUFqQyxFQUF5QytELElBQXpDLEVBQThDO3NCQUNsQ2tVLGNBQVYsQ0FBeUJnQyxhQUFhbFcsRUFBYixDQUF6Qjs7OztLQWhDUjs7O01BdUNFMFQsT0FBTzBDLGdCQUFQLElBQTJCMUMsT0FBTzBDLGdCQUFQLENBQXdCaGQsR0FBdkQsRUFBNEQ7c0JBQ3hDMFQsS0FBSy9RLFNBQXZCLEVBQWtDMlgsT0FBTzBDLGdCQUF6QztHQURGLE1BRU87Y0FDS0MsUUFBVixDQUFtQixVQUFTckosT0FBVCxFQUFrQjt3QkFDakJBLE9BQWxCLEVBQTJCO29CQUNiLElBRGE7c0JBRVgsSUFGVzs7O2dDQUtBLGVBQVc7O2NBRTVCc0osUUFBUSxFQUFkOztlQUVLLElBQUl0VyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2dWLFVBQUwsQ0FBZ0IvWSxNQUFwQyxFQUE0QytELEdBQTVDLEVBQWlEO2tCQUN6Q21CLElBQU4sQ0FBVyxLQUFLNlQsVUFBTCxDQUFnQmhWLENBQWhCLEVBQW1CdVcsV0FBOUI7OztpQkFHS0QsTUFBTXphLElBQU4sQ0FBVyxFQUFYLENBQVA7U0FidUI7Z0NBZUEsYUFBU21hLGFBQVQsRUFBd0I7aUJBQ3hDLEtBQUt2SixVQUFaLEVBQXdCO21CQUNmOEksZ0JBQVAsQ0FBd0J4YixJQUF4QixDQUE2QixJQUE3QixFQUFtQyxLQUFLMFMsVUFBeEM7O2lCQUVLMkksZ0JBQVAsQ0FBd0JyYixJQUF4QixDQUE2QixJQUE3QixFQUFtQ1QsU0FBU2tkLGNBQVQsQ0FBd0JSLGFBQXhCLENBQW5DOztPQW5CSjtLQURGOzs7O0FDcE1KOzs7OztBQUtBLHFCQUFlLFVBQVMvRixTQUFULEVBQW9CekMsV0FBcEIsRUFBaUNxRyxPQUFqQyxFQUEwQzs7OztjQUkzQyxRQUFaLElBQXdCLFlBQW1CO3NDQUFQQyxLQUFPO1dBQUE7Ozs7UUFFbkNDLDhDQUFnREQsTUFBTUUsTUFBTixDQUFhLGdCQUFROzthQUVsRXBJLGdCQUFnQmtCLElBQWhCLElBQXdCeUIsV0FBQSxDQUFzQjNDLElBQXRCLENBQS9CO0tBRm9ELENBQXREOztZQUtRNkssTUFBUixDQUFlcmEsS0FBZixDQUFxQixJQUFyQixFQUEyQjBYLEtBQTNCOztTQUVLLElBQUk5VCxJQUFJLENBQWIsRUFBZ0JBLElBQUkrVCxnQkFBZ0I5WCxNQUFwQyxFQUE0QytELEdBQTVDLEVBQWlEO2dCQUNyQ2tVLGNBQVYsQ0FBeUJILGdCQUFnQi9ULENBQWhCLENBQXpCOzs7UUFHRXVPLFdBQUEsQ0FBc0IsSUFBdEIsQ0FBSixFQUFpQztXQUMxQixJQUFJdk8sS0FBSSxDQUFiLEVBQWdCQSxLQUFJOFQsTUFBTTdYLE1BQTFCLEVBQWtDK0QsSUFBbEMsRUFBdUM7WUFDL0I0TCxPQUFPa0ksTUFBTTlULEVBQU4sQ0FBYjtZQUNJNEwsZ0JBQWdCcUgsT0FBcEIsRUFBNkI7b0JBQ2pCa0IsV0FBVixDQUFzQnZJLElBQXRCOzs7O0dBakJSOzs7OztjQTBCWSxPQUFaLElBQXVCLFlBQW1CO3VDQUFQa0ksS0FBTztXQUFBOzs7O1FBRWxDQyw4Q0FBZ0RELE1BQU1FLE1BQU4sQ0FBYSxnQkFBUTs7YUFFbEVwSSxnQkFBZ0JrQixJQUFoQixJQUF3QnlCLFdBQUEsQ0FBc0IzQyxJQUF0QixDQUEvQjtLQUZvRCxDQUF0RDs7WUFLUThLLEtBQVIsQ0FBY3RhLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEIwWCxLQUExQjs7U0FFSyxJQUFJOVQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK1QsZ0JBQWdCOVgsTUFBcEMsRUFBNEMrRCxHQUE1QyxFQUFpRDtnQkFDckNrVSxjQUFWLENBQXlCSCxnQkFBZ0IvVCxDQUFoQixDQUF6Qjs7O1FBR0V1TyxXQUFBLENBQXNCLElBQXRCLENBQUosRUFBaUM7V0FDMUIsSUFBSXZPLE1BQUksQ0FBYixFQUFnQkEsTUFBSThULE1BQU03WCxNQUExQixFQUFrQytELEtBQWxDLEVBQXVDO1lBQy9CNEwsT0FBT2tJLE1BQU05VCxHQUFOLENBQWI7WUFDSTRMLGdCQUFnQnFILE9BQXBCLEVBQTZCO29CQUNqQmtCLFdBQVYsQ0FBc0J2SSxJQUF0Qjs7OztHQWpCUjs7Ozs7Y0EwQlksYUFBWixJQUE2QixZQUFtQjt1Q0FBUGtJLEtBQU87V0FBQTs7OztRQUV4Q0MsOENBQWdERCxNQUFNRSxNQUFOLENBQWEsZ0JBQVE7O2FBRWxFcEksZ0JBQWdCa0IsSUFBaEIsSUFBd0J5QixXQUFBLENBQXNCM0MsSUFBdEIsQ0FBL0I7S0FGb0QsQ0FBdEQ7O1FBS00rSyxlQUFlcEksV0FBQSxDQUFzQixJQUF0QixDQUFyQjs7WUFFUXFJLFdBQVIsQ0FBb0J4YSxLQUFwQixDQUEwQixJQUExQixFQUFnQzBYLEtBQWhDOztTQUVLLElBQUk5VCxJQUFJLENBQWIsRUFBZ0JBLElBQUkrVCxnQkFBZ0I5WCxNQUFwQyxFQUE0QytELEdBQTVDLEVBQWlEO2dCQUNyQ2tVLGNBQVYsQ0FBeUJILGdCQUFnQi9ULENBQWhCLENBQXpCOzs7UUFHRTJXLFlBQUosRUFBa0I7Z0JBQ056QyxjQUFWLENBQXlCLElBQXpCO1dBQ0ssSUFBSWxVLE1BQUksQ0FBYixFQUFnQkEsTUFBSThULE1BQU03WCxNQUExQixFQUFrQytELEtBQWxDLEVBQXVDO1lBQy9CNEwsT0FBT2tJLE1BQU05VCxHQUFOLENBQWI7WUFDSTRMLGdCQUFnQnFILE9BQXBCLEVBQTZCO29CQUNqQmtCLFdBQVYsQ0FBc0J2SSxJQUF0Qjs7OztHQXBCUjs7Y0EwQlksUUFBWixJQUF3QixZQUFXO1FBQzNCK0ssZUFBZXBJLFdBQUEsQ0FBc0IsSUFBdEIsQ0FBckI7O1lBRVFzSSxNQUFSLENBQWU5YyxJQUFmLENBQW9CLElBQXBCOztRQUVJNGMsWUFBSixFQUFrQjtnQkFDTnpDLGNBQVYsQ0FBeUIsSUFBekI7O0dBTko7OztBQzVGRjs7O0FBR0EsbUJBQWUsVUFBU2pFLFNBQVQsRUFBb0I7TUFDN0J5RCxPQUFPb0Qsb0JBQVgsRUFBaUM7d0JBQy9CLENBQStCN0QsUUFBUWxYLFNBQXZDLEVBQWtELGNBQWxEOzs7Ozs7Y0FNV2diLElBQVQsRUFBZTtVQUNQMUosYUFBYXFHLE9BQU9vRCxvQkFBUCxDQUE0Qi9jLElBQTVCLENBQWlDLElBQWpDLEVBQXVDZ2QsSUFBdkMsQ0FBbkI7V0FDS3pKLGVBQUwsR0FBdUJELFVBQXZCO2FBQ09BLFVBQVA7S0FUSjtHQURGLE1BWU87WUFDRzJKLElBQVIsQ0FBYSwwREFBYjs7O1dBSU9DLGVBQVQsQ0FBeUJ6SixXQUF6QixFQUFzQ3NJLGNBQXRDLEVBQXNEO1dBQzdDM2MsY0FBUCxDQUFzQnFVLFdBQXRCLEVBQW1DLFdBQW5DLEVBQWdEO2tCQUNsQ3NJLGVBQWVDLFVBRG1CO29CQUVoQyxJQUZnQztXQUd6Q0QsZUFBZTFjLEdBSDBCO2lDQUlsQixhQUFTOGQsVUFBVCxFQUFxQjs7O1lBQ3pDdkwsaUJBQWM0QyxXQUFBLENBQXNCLElBQXRCLENBQXBCOzs7Ozs7OztZQVFJNEksa0JBQWtCamMsU0FBdEI7WUFDSXlRLGNBQUosRUFBaUI7NEJBQ0csRUFBbEI7b0NBQ0EsQ0FBcUMsSUFBckMsRUFBMkMsbUJBQVc7Z0JBQ2hEcUIsaUJBQUosRUFBc0I7OEJBQ0o3TCxJQUFoQixDQUFxQjZMLE9BQXJCOztXQUZKOzs7dUJBT2FwTyxHQUFmLENBQW1CN0UsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJtZCxVQUE5Qjs7WUFFSUMsZUFBSixFQUFxQjtlQUNkLElBQUluWCxJQUFJLENBQWIsRUFBZ0JBLElBQUltWCxnQkFBZ0JsYixNQUFwQyxFQUE0QytELEdBQTVDLEVBQWlEO2dCQUN6Q2dOLFVBQVVtSyxnQkFBZ0JuWCxDQUFoQixDQUFoQjtnQkFDSWdOLFFBQVFvQixVQUFSLEtBQXVCQyxtQkFBUUMsTUFBbkMsRUFBMkM7d0JBQy9CSSxvQkFBVixDQUErQjFCLE9BQS9COzs7Ozs7O1lBT0YsQ0FBQyxLQUFLc0ksYUFBTCxDQUFtQnpHLGdCQUF4QixFQUEwQztvQkFDOUIyRixTQUFWLENBQW9CLElBQXBCO1NBREYsTUFFTztvQkFDS3ZGLG1CQUFWLENBQThCLElBQTlCOztlQUVLaUksVUFBUDs7S0F6Q0o7OztNQThDRXhELE9BQU8wRCxpQkFBUCxJQUE0QjFELE9BQU8wRCxpQkFBUCxDQUF5QmhlLEdBQXpELEVBQThEO29CQUM1QzZaLFFBQVFsWCxTQUF4QixFQUFtQzJYLE9BQU8wRCxpQkFBMUM7R0FERixNQUVPLElBQUkxRCxPQUFPMkQscUJBQVAsSUFBZ0MzRCxPQUFPMkQscUJBQVAsQ0FBNkJqZSxHQUFqRSxFQUFzRTtvQkFDM0RtYSxZQUFZeFgsU0FBNUIsRUFBdUMyWCxPQUFPMkQscUJBQTlDO0dBREssTUFFQTs7O1FBR0NDLFNBQVM1RCxPQUFPQyxzQkFBUCxDQUE4QjVaLElBQTlCLENBQW1DVCxRQUFuQyxFQUE2QyxLQUE3QyxDQUFmOztjQUVVK2MsUUFBVixDQUFtQixVQUFTckosT0FBVCxFQUFrQjtzQkFDbkJBLE9BQWhCLEVBQXlCO29CQUNYLElBRFc7c0JBRVQsSUFGUzs7OzttQ0FNSyxlQUFXO2lCQUM5QjBHLE9BQU8yQixjQUFQLENBQXNCdGIsSUFBdEIsQ0FBMkIsSUFBM0IsRUFBaUMsSUFBakMsRUFBdUN3ZCxTQUE5QztTQVBxQjs7OzttQ0FZSyxhQUFTdkIsYUFBVCxFQUF3Qjs7Ozs7Y0FLNUN3QixVQUFVLEtBQUtoTSxTQUFMLEtBQW1CLFVBQW5CLHNDQUFzRSxJQUF0QyxDQUE2Q2dNLE9BQTdFLEdBQXVGLElBQXZHO2lCQUNPRCxTQUFQLEdBQW1CdkIsYUFBbkI7O2lCQUVPd0IsUUFBUXhDLFVBQVIsQ0FBbUIvWSxNQUFuQixHQUE0QixDQUFuQyxFQUFzQzttQkFDN0JzWixnQkFBUCxDQUF3QnhiLElBQXhCLENBQTZCeWQsT0FBN0IsRUFBc0NBLFFBQVF4QyxVQUFSLENBQW1CLENBQW5CLENBQXRDOztpQkFFS3NDLE9BQU90QyxVQUFQLENBQWtCL1ksTUFBbEIsR0FBMkIsQ0FBbEMsRUFBcUM7bUJBQzVCbVosZ0JBQVAsQ0FBd0JyYixJQUF4QixDQUE2QnlkLE9BQTdCLEVBQXNDRixPQUFPdEMsVUFBUCxDQUFrQixDQUFsQixDQUF0Qzs7O09BeEJOO0tBREY7OztzQkFpQ0YsQ0FBK0IvQixRQUFRbFgsU0FBdkMsRUFBa0QsY0FBbEQ7Ozs7OztZQU1XVSxJQUFULEVBQWVvVCxRQUFmLEVBQXlCOztRQUVuQixLQUFLekIsVUFBTCxLQUFvQkMsbUJBQVFDLE1BQWhDLEVBQXdDO2FBQy9Cb0YsT0FBTytELG9CQUFQLENBQTRCMWQsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUMwQyxJQUF2QyxFQUE2Q29ULFFBQTdDLENBQVA7OztRQUdJRCxXQUFXOEQsT0FBT2dFLG9CQUFQLENBQTRCM2QsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUMwQyxJQUF2QyxDQUFqQjtXQUNPZ2Isb0JBQVAsQ0FBNEIxZCxJQUE1QixDQUFpQyxJQUFqQyxFQUF1QzBDLElBQXZDLEVBQTZDb1QsUUFBN0M7ZUFDVzZELE9BQU9nRSxvQkFBUCxDQUE0QjNkLElBQTVCLENBQWlDLElBQWpDLEVBQXVDMEMsSUFBdkMsQ0FBWDtjQUNVZ1Qsd0JBQVYsQ0FBbUMsSUFBbkMsRUFBeUNoVCxJQUF6QyxFQUErQ21ULFFBQS9DLEVBQXlEQyxRQUF6RCxFQUFtRSxJQUFuRTtHQWZKOztzQkFrQkEsQ0FBK0JvRCxRQUFRbFgsU0FBdkMsRUFBa0QsZ0JBQWxEOzs7Ozs7O1lBT1crVCxTQUFULEVBQW9CclQsSUFBcEIsRUFBMEJvVCxRQUExQixFQUFvQzs7UUFFOUIsS0FBS3pCLFVBQUwsS0FBb0JDLG1CQUFRQyxNQUFoQyxFQUF3QzthQUMvQm9GLE9BQU9pRSxzQkFBUCxDQUE4QjVkLElBQTlCLENBQW1DLElBQW5DLEVBQXlDK1YsU0FBekMsRUFBb0RyVCxJQUFwRCxFQUEwRG9ULFFBQTFELENBQVA7OztRQUdJRCxXQUFXOEQsT0FBT2tFLHNCQUFQLENBQThCN2QsSUFBOUIsQ0FBbUMsSUFBbkMsRUFBeUMrVixTQUF6QyxFQUFvRHJULElBQXBELENBQWpCO1dBQ09rYixzQkFBUCxDQUE4QjVkLElBQTlCLENBQW1DLElBQW5DLEVBQXlDK1YsU0FBekMsRUFBb0RyVCxJQUFwRCxFQUEwRG9ULFFBQTFEO2VBQ1c2RCxPQUFPa0Usc0JBQVAsQ0FBOEI3ZCxJQUE5QixDQUFtQyxJQUFuQyxFQUF5QytWLFNBQXpDLEVBQW9EclQsSUFBcEQsQ0FBWDtjQUNVZ1Qsd0JBQVYsQ0FBbUMsSUFBbkMsRUFBeUNoVCxJQUF6QyxFQUErQ21ULFFBQS9DLEVBQXlEQyxRQUF6RCxFQUFtRUMsU0FBbkU7R0FoQko7O3NCQW1CQSxDQUErQm1ELFFBQVFsWCxTQUF2QyxFQUFrRCxpQkFBbEQ7Ozs7O1lBS1dVLElBQVQsRUFBZTs7UUFFVCxLQUFLMlIsVUFBTCxLQUFvQkMsbUJBQVFDLE1BQWhDLEVBQXdDO2FBQy9Cb0YsT0FBT21FLHVCQUFQLENBQStCOWQsSUFBL0IsQ0FBb0MsSUFBcEMsRUFBMEMwQyxJQUExQyxDQUFQOzs7UUFHSW1ULFdBQVc4RCxPQUFPZ0Usb0JBQVAsQ0FBNEIzZCxJQUE1QixDQUFpQyxJQUFqQyxFQUF1QzBDLElBQXZDLENBQWpCO1dBQ09vYix1QkFBUCxDQUErQjlkLElBQS9CLENBQW9DLElBQXBDLEVBQTBDMEMsSUFBMUM7UUFDSW1ULGFBQWEsSUFBakIsRUFBdUI7Z0JBQ1hILHdCQUFWLENBQW1DLElBQW5DLEVBQXlDaFQsSUFBekMsRUFBK0NtVCxRQUEvQyxFQUF5RCxJQUF6RCxFQUErRCxJQUEvRDs7R0FkTjs7c0JBa0JBLENBQStCcUQsUUFBUWxYLFNBQXZDLEVBQWtELG1CQUFsRDs7Ozs7O1lBTVcrVCxTQUFULEVBQW9CclQsSUFBcEIsRUFBMEI7O1FBRXBCLEtBQUsyUixVQUFMLEtBQW9CQyxtQkFBUUMsTUFBaEMsRUFBd0M7YUFDL0JvRixPQUFPb0UseUJBQVAsQ0FBaUMvZCxJQUFqQyxDQUFzQyxJQUF0QyxFQUE0QytWLFNBQTVDLEVBQXVEclQsSUFBdkQsQ0FBUDs7O1FBR0ltVCxXQUFXOEQsT0FBT2tFLHNCQUFQLENBQThCN2QsSUFBOUIsQ0FBbUMsSUFBbkMsRUFBeUMrVixTQUF6QyxFQUFvRHJULElBQXBELENBQWpCO1dBQ09xYix5QkFBUCxDQUFpQy9kLElBQWpDLENBQXNDLElBQXRDLEVBQTRDK1YsU0FBNUMsRUFBdURyVCxJQUF2RDs7OztRQUlNb1QsV0FBVzZELE9BQU9rRSxzQkFBUCxDQUE4QjdkLElBQTlCLENBQW1DLElBQW5DLEVBQXlDK1YsU0FBekMsRUFBb0RyVCxJQUFwRCxDQUFqQjtRQUNJbVQsYUFBYUMsUUFBakIsRUFBMkI7Z0JBQ2ZKLHdCQUFWLENBQW1DLElBQW5DLEVBQXlDaFQsSUFBekMsRUFBK0NtVCxRQUEvQyxFQUF5REMsUUFBekQsRUFBbUVDLFNBQW5FOztHQW5CTjs7V0F3QlNpSSwyQkFBVCxDQUFxQ3ZLLFdBQXJDLEVBQWtEd0ssVUFBbEQsRUFBOEQ7d0JBQzVELENBQStCeEssV0FBL0IsRUFBNEMsdUJBQTVDOzs7Ozs7O2NBT1d5SyxLQUFULEVBQWdCakwsT0FBaEIsRUFBeUI7VUFDakIySixlQUFlcEksV0FBQSxDQUFzQnZCLE9BQXRCLENBQXJCO1VBQ01rTDtpQkFDUW5lLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0JrZSxLQUF0QixFQUE2QmpMLE9BQTdCLENBREg7O1VBR0kySixZQUFKLEVBQWtCO2tCQUNOekMsY0FBVixDQUF5QmxILE9BQXpCOzs7VUFHRXVCLFdBQUEsQ0FBc0IySixlQUF0QixDQUFKLEVBQTRDO2tCQUNoQy9ELFdBQVYsQ0FBc0JuSCxPQUF0Qjs7YUFFS2tMLGVBQVA7S0FuQko7OztNQXVCRXhFLE9BQU95RSxpQ0FBWCxFQUE4QztnQ0FDaEI1RSxZQUFZeFgsU0FBeEMsRUFBbUQyWCxPQUFPeUUsaUNBQTFEO0dBREYsTUFFTyxJQUFJekUsT0FBTzBFLDZCQUFYLEVBQTBDO2dDQUNuQm5GLFFBQVFsWCxTQUFwQyxFQUErQzJYLE9BQU8wRSw2QkFBdEQ7R0FESyxNQUVBO1lBQ0dwQixJQUFSLENBQWEsbUVBQWI7OztrQkFJYy9HLFNBQWhCLEVBQTJCZ0QsUUFBUWxYLFNBQW5DLEVBQThDO2FBQ25DMlgsT0FBTzJFLGVBRDRCO1lBRXBDM0UsT0FBTzRFO0dBRmpCOztpQkFLZXJJLFNBQWYsRUFBMEJnRCxRQUFRbFgsU0FBbEMsRUFBNkM7WUFDbkMyWCxPQUFPNkUsY0FENEI7V0FFcEM3RSxPQUFPOEUsYUFGNkI7aUJBRzlCOUUsT0FBTytFLG1CQUh1QjtZQUluQy9FLE9BQU9nRjtHQUpqQjs7O0FDM09GOzs7Ozs7Ozs7O0FBVUEsQUFRQSxJQUFNQyxzQkFBc0IzZ0IsT0FBTyxnQkFBUCxDQUE1Qjs7QUFFQSxJQUFJLENBQUMyZ0IsbUJBQUQsSUFDQ0Esb0JBQW9CLGVBQXBCLENBREQsSUFFRSxPQUFPQSxvQkFBb0IsUUFBcEIsQ0FBUCxJQUF3QyxVQUYxQyxJQUdFLE9BQU9BLG9CQUFvQixLQUFwQixDQUFQLElBQXFDLFVBSDNDLEVBR3dEOztNQUVoRDFJLFlBQVksSUFBSXZDLHNCQUFKLEVBQWxCOzttQkFFaUJ1QyxTQUFqQjtnQkFDY0EsU0FBZDtZQUNVQSxTQUFWO2VBQ2FBLFNBQWI7OztXQUdTcEIsZ0JBQVQsR0FBNEIsSUFBNUI7OztNQUdNNVcsaUJBQWlCLElBQUltWixxQkFBSixDQUEwQm5CLFNBQTFCLENBQXZCOztTQUVPOVcsY0FBUCxDQUFzQm5CLE1BQXRCLEVBQThCLGdCQUE5QixFQUFnRDtrQkFDaEMsSUFEZ0M7Z0JBRWxDLElBRmtDO1dBR3ZDQztHQUhUOzs7QUN0Q0Y7Ozs7Ozs7Ozs7QUFVQSxJQUFJLE9BQU8yZ0IsT0FBUCxLQUFtQixXQUF2QixFQUFvQztHQUNqQyxZQUFXO1FBQ056ZixpQkFBaUJELE9BQU9DLGNBQTVCO1FBQ0kwZixVQUFVQyxLQUFLQyxHQUFMLEtBQWEsR0FBM0I7UUFDSUgsVUFBVSxTQUFWQSxPQUFVLEdBQVc7V0FDbEJuYyxJQUFMLEdBQVksVUFBVXBFLEtBQUsyQyxNQUFMLEtBQWdCLEdBQWhCLEtBQXdCLENBQWxDLEtBQXdDNmQsWUFBWSxJQUFwRCxDQUFaO0tBREY7WUFHUTljLFNBQVIsR0FBb0I7V0FDYixhQUFTckIsR0FBVCxFQUFjSCxLQUFkLEVBQXFCO1lBQ3BCME4sUUFBUXZOLElBQUksS0FBSytCLElBQVQsQ0FBWjtZQUNJd0wsU0FBU0EsTUFBTSxDQUFOLE1BQWF2TixHQUExQixFQUErQnVOLE1BQU0sQ0FBTixJQUFXMU4sS0FBWCxDQUEvQixLQUFzRHBCLGVBQWV1QixHQUFmLEVBQW9CLEtBQUsrQixJQUF6QixFQUErQjtpQkFDNUUsQ0FBRS9CLEdBQUYsRUFBT0gsS0FBUCxDQUQ0RTtvQkFFekU7U0FGMEM7ZUFJL0MsSUFBUDtPQVBnQjtXQVNiLGFBQVNHLEdBQVQsRUFBYztZQUNidU4sS0FBSjtlQUNPLENBQUNBLFFBQVF2TixJQUFJLEtBQUsrQixJQUFULENBQVQsS0FBNEJ3TCxNQUFNLENBQU4sTUFBYXZOLEdBQXpDLEdBQStDdU4sTUFBTSxDQUFOLENBQS9DLEdBQTBEL00sU0FBakU7T0FYZ0I7Z0JBYVIsaUJBQVNSLEdBQVQsRUFBYztZQUNsQnVOLFFBQVF2TixJQUFJLEtBQUsrQixJQUFULENBQVo7WUFDSSxDQUFDd0wsS0FBRCxJQUFVQSxNQUFNLENBQU4sTUFBYXZOLEdBQTNCLEVBQWdDLE9BQU8sS0FBUDtjQUMxQixDQUFOLElBQVd1TixNQUFNLENBQU4sSUFBVy9NLFNBQXRCO2VBQ08sSUFBUDtPQWpCZ0I7V0FtQmIsYUFBU1IsR0FBVCxFQUFjO1lBQ2J1TixRQUFRdk4sSUFBSSxLQUFLK0IsSUFBVCxDQUFaO1lBQ0ksQ0FBQ3dMLEtBQUwsRUFBWSxPQUFPLEtBQVA7ZUFDTEEsTUFBTSxDQUFOLE1BQWF2TixHQUFwQjs7S0F0Qko7V0F5Qk9rZSxPQUFQLEdBQWlCQSxPQUFqQjtHQS9CRjs7O0FBbUNGLENBQUMsVUFBU3pnQixNQUFULEVBQWlCO01BQ1pBLE9BQU82Z0Isa0JBQVgsRUFBK0I7OztNQUczQkMscUJBQXFCLElBQUlMLE9BQUosRUFBekI7TUFDSU0sWUFBSjtNQUNJLGVBQWV4YSxJQUFmLENBQW9CeWEsVUFBVUMsU0FBOUIsQ0FBSixFQUE4QzttQkFDN0JDLFVBQWY7R0FERixNQUVPLElBQUlyaEIsT0FBT2toQixZQUFYLEVBQXlCO21CQUNmbGhCLE9BQU9raEIsWUFBdEI7R0FESyxNQUVBO1FBQ0RJLG9CQUFvQixFQUF4QjtRQUNJQyxXQUFXemQsT0FBT3pELEtBQUsyQyxNQUFMLEVBQVAsQ0FBZjtXQUNPOFQsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsVUFBUzlWLENBQVQsRUFBWTtVQUN6Q0EsRUFBRTRQLElBQUYsS0FBVzJRLFFBQWYsRUFBeUI7WUFDbkJDLFFBQVFGLGlCQUFaOzRCQUNvQixFQUFwQjtjQUNNdFEsT0FBTixDQUFjLFVBQVN5USxJQUFULEVBQWU7O1NBQTdCOztLQUpKO21CQVNlLHNCQUFTQSxJQUFULEVBQWU7d0JBQ1Z0WSxJQUFsQixDQUF1QnNZLElBQXZCO2FBQ09DLFdBQVAsQ0FBbUJILFFBQW5CLEVBQTZCLEdBQTdCO0tBRkY7O01BS0VJLGNBQWMsS0FBbEI7TUFDSUMscUJBQXFCLEVBQXpCO1dBQ1NDLGdCQUFULENBQTBCQyxRQUExQixFQUFvQzt1QkFDZjNZLElBQW5CLENBQXdCMlksUUFBeEI7UUFDSSxDQUFDSCxXQUFMLEVBQWtCO29CQUNGLElBQWQ7bUJBQ2FJLGlCQUFiOzs7V0FHS0MsWUFBVCxDQUFzQnBPLElBQXRCLEVBQTRCO1dBQ25CNVQsT0FBT2lpQixpQkFBUCxJQUE0QmppQixPQUFPaWlCLGlCQUFQLENBQXlCRCxZQUF6QixDQUFzQ3BPLElBQXRDLENBQTVCLElBQTJFQSxJQUFsRjs7V0FFT21PLGlCQUFULEdBQTZCO2tCQUNiLEtBQWQ7UUFDSUcsWUFBWU4sa0JBQWhCO3lCQUNxQixFQUFyQjtjQUNVTyxJQUFWLENBQWUsVUFBU0MsRUFBVCxFQUFhQyxFQUFiLEVBQWlCO2FBQ3ZCRCxHQUFHRSxJQUFILEdBQVVELEdBQUdDLElBQXBCO0tBREY7UUFHSUMsY0FBYyxLQUFsQjtjQUNVdlIsT0FBVixDQUFrQixVQUFTOFEsUUFBVCxFQUFtQjtVQUMvQk4sUUFBUU0sU0FBU1UsV0FBVCxFQUFaO2tDQUM0QlYsUUFBNUI7VUFDSU4sTUFBTXZkLE1BQVYsRUFBa0I7aUJBQ1B3ZSxTQUFULENBQW1CakIsS0FBbkIsRUFBMEJNLFFBQTFCO3NCQUNjLElBQWQ7O0tBTEo7UUFRSVMsV0FBSixFQUFpQlI7O1dBRVZXLDJCQUFULENBQXFDWixRQUFyQyxFQUErQzthQUNwQ2EsTUFBVCxDQUFnQjNSLE9BQWhCLENBQXdCLFVBQVM0QyxJQUFULEVBQWU7VUFDakNnUCxnQkFBZ0IzQixtQkFBbUI3ZixHQUFuQixDQUF1QndTLElBQXZCLENBQXBCO1VBQ0ksQ0FBQ2dQLGFBQUwsRUFBb0I7b0JBQ041UixPQUFkLENBQXNCLFVBQVM2UixZQUFULEVBQXVCO1lBQ3ZDQSxhQUFhZixRQUFiLEtBQTBCQSxRQUE5QixFQUF3Q2UsYUFBYUMsd0JBQWI7T0FEMUM7S0FIRjs7V0FRT0MsdUNBQVQsQ0FBaUQ1ZCxNQUFqRCxFQUF5RHdQLFFBQXpELEVBQW1FO1NBQzVELElBQUlmLE9BQU96TyxNQUFoQixFQUF3QnlPLElBQXhCLEVBQThCQSxPQUFPQSxLQUFLSyxVQUExQyxFQUFzRDtVQUNoRDJPLGdCQUFnQjNCLG1CQUFtQjdmLEdBQW5CLENBQXVCd1MsSUFBdkIsQ0FBcEI7VUFDSWdQLGFBQUosRUFBbUI7YUFDWixJQUFJL0osSUFBSSxDQUFiLEVBQWdCQSxJQUFJK0osY0FBYzNlLE1BQWxDLEVBQTBDNFUsR0FBMUMsRUFBK0M7Y0FDekNnSyxlQUFlRCxjQUFjL0osQ0FBZCxDQUFuQjtjQUNJbUssVUFBVUgsYUFBYUcsT0FBM0I7Y0FDSXBQLFNBQVN6TyxNQUFULElBQW1CLENBQUM2ZCxRQUFRQyxPQUFoQyxFQUF5QztjQUNyQ0MsU0FBU3ZPLFNBQVNxTyxPQUFULENBQWI7Y0FDSUUsTUFBSixFQUFZTCxhQUFhTSxPQUFiLENBQXFCRCxNQUFyQjs7Ozs7TUFLaEJFLGFBQWEsQ0FBakI7V0FDU3BDLGtCQUFULENBQTRCck0sUUFBNUIsRUFBc0M7U0FDL0I4TixTQUFMLEdBQWlCOU4sUUFBakI7U0FDS2dPLE1BQUwsR0FBYyxFQUFkO1NBQ0tVLFFBQUwsR0FBZ0IsRUFBaEI7U0FDS2YsSUFBTCxHQUFZLEVBQUVjLFVBQWQ7O3FCQUVpQnJmLFNBQW5CLEdBQStCO2FBQ3BCLGlCQUFTb0IsTUFBVCxFQUFpQjZkLE9BQWpCLEVBQTBCO2VBQ3hCaEIsYUFBYTdjLE1BQWIsQ0FBVDtVQUNJLENBQUM2ZCxRQUFRTSxTQUFULElBQXNCLENBQUNOLFFBQVFPLFVBQS9CLElBQTZDLENBQUNQLFFBQVFRLGFBQXRELElBQXVFUixRQUFRUyxpQkFBUixJQUE2QixDQUFDVCxRQUFRTyxVQUE3RyxJQUEySFAsUUFBUVUsZUFBUixJQUEyQlYsUUFBUVUsZUFBUixDQUF3QnpmLE1BQW5ELElBQTZELENBQUMrZSxRQUFRTyxVQUFqTSxJQUErTVAsUUFBUVcscUJBQVIsSUFBaUMsQ0FBQ1gsUUFBUVEsYUFBN1AsRUFBNFE7Y0FDcFEsSUFBSTdKLFdBQUosRUFBTjs7VUFFRWlKLGdCQUFnQjNCLG1CQUFtQjdmLEdBQW5CLENBQXVCK0QsTUFBdkIsQ0FBcEI7VUFDSSxDQUFDeWQsYUFBTCxFQUFvQjNCLG1CQUFtQnJhLEdBQW5CLENBQXVCekIsTUFBdkIsRUFBK0J5ZCxnQkFBZ0IsRUFBL0M7VUFDaEJDLFlBQUo7V0FDSyxJQUFJN2EsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNGEsY0FBYzNlLE1BQWxDLEVBQTBDK0QsR0FBMUMsRUFBK0M7WUFDekM0YSxjQUFjNWEsQ0FBZCxFQUFpQjhaLFFBQWpCLEtBQThCLElBQWxDLEVBQXdDO3lCQUN2QmMsY0FBYzVhLENBQWQsQ0FBZjt1QkFDYTRiLGVBQWI7dUJBQ2FaLE9BQWIsR0FBdUJBLE9BQXZCOzs7O1VBSUEsQ0FBQ0gsWUFBTCxFQUFtQjt1QkFDRixJQUFJZ0IsWUFBSixDQUFpQixJQUFqQixFQUF1QjFlLE1BQXZCLEVBQStCNmQsT0FBL0IsQ0FBZjtzQkFDYzdaLElBQWQsQ0FBbUIwWixZQUFuQjthQUNLRixNQUFMLENBQVl4WixJQUFaLENBQWlCaEUsTUFBakI7O21CQUVXMmUsWUFBYjtLQXRCMkI7Z0JBd0JqQixzQkFBVztXQUNoQm5CLE1BQUwsQ0FBWTNSLE9BQVosQ0FBb0IsVUFBUzRDLElBQVQsRUFBZTtZQUM3QmdQLGdCQUFnQjNCLG1CQUFtQjdmLEdBQW5CLENBQXVCd1MsSUFBdkIsQ0FBcEI7YUFDSyxJQUFJNUwsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNGEsY0FBYzNlLE1BQWxDLEVBQTBDK0QsR0FBMUMsRUFBK0M7Y0FDekM2YSxlQUFlRCxjQUFjNWEsQ0FBZCxDQUFuQjtjQUNJNmEsYUFBYWYsUUFBYixLQUEwQixJQUE5QixFQUFvQzt5QkFDckI4QixlQUFiOzBCQUNjRyxNQUFkLENBQXFCL2IsQ0FBckIsRUFBd0IsQ0FBeEI7Ozs7T0FOTixFQVVHLElBVkg7V0FXS3FiLFFBQUwsR0FBZ0IsRUFBaEI7S0FwQzJCO2lCQXNDaEIsdUJBQVc7VUFDbEJXLGdCQUFnQixLQUFLWCxRQUF6QjtXQUNLQSxRQUFMLEdBQWdCLEVBQWhCO2FBQ09XLGFBQVA7O0dBekNKO1dBNENTQyxjQUFULENBQXdCemYsSUFBeEIsRUFBOEJXLE1BQTlCLEVBQXNDO1NBQy9CWCxJQUFMLEdBQVlBLElBQVo7U0FDS1csTUFBTCxHQUFjQSxNQUFkO1NBQ0t5VCxVQUFMLEdBQWtCLEVBQWxCO1NBQ0tzRixZQUFMLEdBQW9CLEVBQXBCO1NBQ0tnRyxlQUFMLEdBQXVCLElBQXZCO1NBQ0szUCxXQUFMLEdBQW1CLElBQW5CO1NBQ0s0UCxhQUFMLEdBQXFCLElBQXJCO1NBQ0tDLGtCQUFMLEdBQTBCLElBQTFCO1NBQ0t4TSxRQUFMLEdBQWdCLElBQWhCOztXQUVPeU0sa0JBQVQsQ0FBNEJDLFFBQTVCLEVBQXNDO1FBQ2hDcEIsU0FBUyxJQUFJZSxjQUFKLENBQW1CSyxTQUFTOWYsSUFBNUIsRUFBa0M4ZixTQUFTbmYsTUFBM0MsQ0FBYjtXQUNPeVQsVUFBUCxHQUFvQjBMLFNBQVMxTCxVQUFULENBQW9CN1MsS0FBcEIsRUFBcEI7V0FDT21ZLFlBQVAsR0FBc0JvRyxTQUFTcEcsWUFBVCxDQUFzQm5ZLEtBQXRCLEVBQXRCO1dBQ09tZSxlQUFQLEdBQXlCSSxTQUFTSixlQUFsQztXQUNPM1AsV0FBUCxHQUFxQitQLFNBQVMvUCxXQUE5QjtXQUNPNFAsYUFBUCxHQUF1QkcsU0FBU0gsYUFBaEM7V0FDT0Msa0JBQVAsR0FBNEJFLFNBQVNGLGtCQUFyQztXQUNPeE0sUUFBUCxHQUFrQjBNLFNBQVMxTSxRQUEzQjtXQUNPc0wsTUFBUDs7TUFFRXFCLGFBQUosRUFBbUJDLGtCQUFuQjtXQUNTQyxTQUFULENBQW1CamdCLElBQW5CLEVBQXlCVyxNQUF6QixFQUFpQztXQUN4Qm9mLGdCQUFnQixJQUFJTixjQUFKLENBQW1CemYsSUFBbkIsRUFBeUJXLE1BQXpCLENBQXZCOztXQUVPdWYscUJBQVQsQ0FBK0I5TSxRQUEvQixFQUF5QztRQUNuQzRNLGtCQUFKLEVBQXdCLE9BQU9BLGtCQUFQO3lCQUNISCxtQkFBbUJFLGFBQW5CLENBQXJCO3VCQUNtQjNNLFFBQW5CLEdBQThCQSxRQUE5QjtXQUNPNE0sa0JBQVA7O1dBRU9HLFlBQVQsR0FBd0I7b0JBQ05ILHFCQUFxQnRoQixTQUFyQzs7V0FFTzBoQiwrQkFBVCxDQUF5QzFCLE1BQXpDLEVBQWlEO1dBQ3hDQSxXQUFXc0Isa0JBQVgsSUFBaUN0QixXQUFXcUIsYUFBbkQ7O1dBRU9NLFlBQVQsQ0FBc0JDLFVBQXRCLEVBQWtDQyxTQUFsQyxFQUE2QztRQUN2Q0QsZUFBZUMsU0FBbkIsRUFBOEIsT0FBT0QsVUFBUDtRQUMxQk4sc0JBQXNCSSxnQ0FBZ0NFLFVBQWhDLENBQTFCLEVBQXVFLE9BQU9OLGtCQUFQO1dBQ2hFLElBQVA7O1dBRU9YLFlBQVQsQ0FBc0IvQixRQUF0QixFQUFnQzNjLE1BQWhDLEVBQXdDNmQsT0FBeEMsRUFBaUQ7U0FDMUNsQixRQUFMLEdBQWdCQSxRQUFoQjtTQUNLM2MsTUFBTCxHQUFjQSxNQUFkO1NBQ0s2ZCxPQUFMLEdBQWVBLE9BQWY7U0FDS2dDLHNCQUFMLEdBQThCLEVBQTlCOztlQUVXamhCLFNBQWIsR0FBeUI7YUFDZCxpQkFBU21mLE1BQVQsRUFBaUI7VUFDcEIrQixVQUFVLEtBQUtuRCxRQUFMLENBQWN1QixRQUE1QjtVQUNJcGYsU0FBU2doQixRQUFRaGhCLE1BQXJCO1VBQ0lnaEIsUUFBUWhoQixNQUFSLEdBQWlCLENBQXJCLEVBQXdCO1lBQ2xCNmdCLGFBQWFHLFFBQVFoaEIsU0FBUyxDQUFqQixDQUFqQjtZQUNJaWhCLHNCQUFzQkwsYUFBYUMsVUFBYixFQUF5QjVCLE1BQXpCLENBQTFCO1lBQ0lnQyxtQkFBSixFQUF5QjtrQkFDZmpoQixTQUFTLENBQWpCLElBQXNCaWhCLG1CQUF0Qjs7O09BSkosTUFPTzt5QkFDWSxLQUFLcEQsUUFBdEI7O2NBRU03ZCxNQUFSLElBQWtCaWYsTUFBbEI7S0FkcUI7a0JBZ0JULHdCQUFXO1dBQ2xCaUMsYUFBTCxDQUFtQixLQUFLaGdCLE1BQXhCO0tBakJxQjttQkFtQlIsdUJBQVN5TyxJQUFULEVBQWU7VUFDeEJvUCxVQUFVLEtBQUtBLE9BQW5CO1VBQ0lBLFFBQVFPLFVBQVosRUFBd0IzUCxLQUFLa0QsZ0JBQUwsQ0FBc0IsaUJBQXRCLEVBQXlDLElBQXpDLEVBQStDLElBQS9DO1VBQ3BCa00sUUFBUVEsYUFBWixFQUEyQjVQLEtBQUtrRCxnQkFBTCxDQUFzQiwwQkFBdEIsRUFBa0QsSUFBbEQsRUFBd0QsSUFBeEQ7VUFDdkJrTSxRQUFRTSxTQUFaLEVBQXVCMVAsS0FBS2tELGdCQUFMLENBQXNCLGlCQUF0QixFQUF5QyxJQUF6QyxFQUErQyxJQUEvQztVQUNuQmtNLFFBQVFNLFNBQVIsSUFBcUJOLFFBQVFDLE9BQWpDLEVBQTBDclAsS0FBS2tELGdCQUFMLENBQXNCLGdCQUF0QixFQUF3QyxJQUF4QyxFQUE4QyxJQUE5QztLQXhCckI7cUJBMEJOLDJCQUFXO1dBQ3JCc08sZ0JBQUwsQ0FBc0IsS0FBS2pnQixNQUEzQjtLQTNCcUI7c0JBNkJMLDBCQUFTeU8sSUFBVCxFQUFlO1VBQzNCb1AsVUFBVSxLQUFLQSxPQUFuQjtVQUNJQSxRQUFRTyxVQUFaLEVBQXdCM1AsS0FBS3lSLG1CQUFMLENBQXlCLGlCQUF6QixFQUE0QyxJQUE1QyxFQUFrRCxJQUFsRDtVQUNwQnJDLFFBQVFRLGFBQVosRUFBMkI1UCxLQUFLeVIsbUJBQUwsQ0FBeUIsMEJBQXpCLEVBQXFELElBQXJELEVBQTJELElBQTNEO1VBQ3ZCckMsUUFBUU0sU0FBWixFQUF1QjFQLEtBQUt5UixtQkFBTCxDQUF5QixpQkFBekIsRUFBNEMsSUFBNUMsRUFBa0QsSUFBbEQ7VUFDbkJyQyxRQUFRTSxTQUFSLElBQXFCTixRQUFRQyxPQUFqQyxFQUEwQ3JQLEtBQUt5UixtQkFBTCxDQUF5QixnQkFBekIsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQ7S0FsQ3JCOzBCQW9DRCw4QkFBU3pSLElBQVQsRUFBZTtVQUMvQkEsU0FBUyxLQUFLek8sTUFBbEIsRUFBMEI7V0FDckJnZ0IsYUFBTCxDQUFtQnZSLElBQW5CO1dBQ0tvUixzQkFBTCxDQUE0QjdiLElBQTVCLENBQWlDeUssSUFBakM7VUFDSWdQLGdCQUFnQjNCLG1CQUFtQjdmLEdBQW5CLENBQXVCd1MsSUFBdkIsQ0FBcEI7VUFDSSxDQUFDZ1AsYUFBTCxFQUFvQjNCLG1CQUFtQnJhLEdBQW5CLENBQXVCZ04sSUFBdkIsRUFBNkJnUCxnQkFBZ0IsRUFBN0M7b0JBQ056WixJQUFkLENBQW1CLElBQW5CO0tBMUNxQjs4QkE0Q0csb0NBQVc7VUFDL0I2Yix5QkFBeUIsS0FBS0Esc0JBQWxDO1dBQ0tBLHNCQUFMLEdBQThCLEVBQTlCOzZCQUN1QmhVLE9BQXZCLENBQStCLFVBQVM0QyxJQUFULEVBQWU7YUFDdkN3UixnQkFBTCxDQUFzQnhSLElBQXRCO1lBQ0lnUCxnQkFBZ0IzQixtQkFBbUI3ZixHQUFuQixDQUF1QndTLElBQXZCLENBQXBCO2FBQ0ssSUFBSTVMLElBQUksQ0FBYixFQUFnQkEsSUFBSTRhLGNBQWMzZSxNQUFsQyxFQUEwQytELEdBQTFDLEVBQStDO2NBQ3pDNGEsY0FBYzVhLENBQWQsTUFBcUIsSUFBekIsRUFBK0I7MEJBQ2YrYixNQUFkLENBQXFCL2IsQ0FBckIsRUFBd0IsQ0FBeEI7Ozs7T0FMTixFQVNHLElBVEg7S0EvQ3FCO2lCQTBEVixxQkFBU2hILENBQVQsRUFBWTtRQUNyQnNrQix3QkFBRjtjQUNRdGtCLEVBQUV3RCxJQUFWO2FBQ00saUJBQUw7Y0FDS0MsT0FBT3pELEVBQUV1a0IsUUFBYjtjQUNJek4sWUFBWTlXLEVBQUV3a0IsV0FBRixDQUFjQyxZQUE5QjtjQUNJdGdCLFNBQVNuRSxFQUFFbUUsTUFBZjtjQUNJK2QsU0FBUyxJQUFJdUIsU0FBSixDQUFjLFlBQWQsRUFBNEJ0ZixNQUE1QixDQUFiO2lCQUNPZ2YsYUFBUCxHQUF1QjFmLElBQXZCO2lCQUNPMmYsa0JBQVAsR0FBNEJ0TSxTQUE1QjtjQUNJRixXQUFXNVcsRUFBRTBrQixVQUFGLEtBQWlCQyxjQUFjQyxRQUEvQixHQUEwQyxJQUExQyxHQUFpRDVrQixFQUFFNmtCLFNBQWxFO2tEQUN3QzFnQixNQUF4QyxFQUFnRCxVQUFTNmQsT0FBVCxFQUFrQjtnQkFDNUQsQ0FBQ0EsUUFBUU8sVUFBYixFQUF5QjtnQkFDckJQLFFBQVFVLGVBQVIsSUFBMkJWLFFBQVFVLGVBQVIsQ0FBd0J6ZixNQUFuRCxJQUE2RCtlLFFBQVFVLGVBQVIsQ0FBd0IzTCxPQUF4QixDQUFnQ3RULElBQWhDLE1BQTBDLENBQUMsQ0FBeEcsSUFBNkd1ZSxRQUFRVSxlQUFSLENBQXdCM0wsT0FBeEIsQ0FBZ0NELFNBQWhDLE1BQStDLENBQUMsQ0FBakssRUFBb0s7OztnQkFHaEtrTCxRQUFRUyxpQkFBWixFQUErQixPQUFPaUIsc0JBQXNCOU0sUUFBdEIsQ0FBUDttQkFDeEJzTCxNQUFQO1dBTkY7OzthQVVJLDBCQUFMO2NBQ0svZCxTQUFTbkUsRUFBRW1FLE1BQWY7Y0FDSStkLFNBQVN1QixVQUFVLGVBQVYsRUFBMkJ0ZixNQUEzQixDQUFiO2NBQ0l5UyxXQUFXNVcsRUFBRTZrQixTQUFqQjtrREFDd0MxZ0IsTUFBeEMsRUFBZ0QsVUFBUzZkLE9BQVQsRUFBa0I7Z0JBQzVELENBQUNBLFFBQVFRLGFBQWIsRUFBNEI7Z0JBQ3hCUixRQUFRVyxxQkFBWixFQUFtQyxPQUFPZSxzQkFBc0I5TSxRQUF0QixDQUFQO21CQUM1QnNMLE1BQVA7V0FIRjs7O2FBT0ksZ0JBQUw7ZUFDTTRDLG9CQUFMLENBQTBCOWtCLEVBQUVtRSxNQUE1Qjs7YUFFSSxpQkFBTDtjQUNLNGdCLGNBQWMva0IsRUFBRW1FLE1BQXBCO2NBQ0l5VCxVQUFKLEVBQWdCc0YsWUFBaEI7Y0FDSWxkLEVBQUV3RCxJQUFGLEtBQVcsaUJBQWYsRUFBa0M7eUJBQ25CLENBQUV1aEIsV0FBRixDQUFiOzJCQUNlLEVBQWY7V0FGRixNQUdPO3lCQUNRLEVBQWI7MkJBQ2UsQ0FBRUEsV0FBRixDQUFmOztjQUVFN0Isa0JBQWtCNkIsWUFBWTdCLGVBQWxDO2NBQ0kzUCxjQUFjd1IsWUFBWXhSLFdBQTlCO2NBQ0kyTyxTQUFTdUIsVUFBVSxXQUFWLEVBQXVCempCLEVBQUVtRSxNQUFGLENBQVM4TyxVQUFoQyxDQUFiO2lCQUNPMkUsVUFBUCxHQUFvQkEsVUFBcEI7aUJBQ09zRixZQUFQLEdBQXNCQSxZQUF0QjtpQkFDT2dHLGVBQVAsR0FBeUJBLGVBQXpCO2lCQUNPM1AsV0FBUCxHQUFxQkEsV0FBckI7a0RBQ3dDdlQsRUFBRXdrQixXQUExQyxFQUF1RCxVQUFTeEMsT0FBVCxFQUFrQjtnQkFDbkUsQ0FBQ0EsUUFBUU0sU0FBYixFQUF3QjttQkFDakJKLE1BQVA7V0FGRjs7OztHQTlHTjtTQXNIT2xDLGtCQUFQLEdBQTRCQSxrQkFBNUI7TUFDSSxDQUFDN2dCLE9BQU9tWSxnQkFBWixFQUE4QjtXQUNyQkEsZ0JBQVAsR0FBMEIwSSxrQkFBMUI7dUJBQ21CZ0YsYUFBbkIsR0FBbUMsSUFBbkM7O0NBN1NKLEVBK1NHMWxCLElBL1NIOztBQzlDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkMsV0FBVUgsTUFBVixFQUFrQitDLFNBQWxCLEVBQTZCOzs7UUFHdEIvQyxPQUFPK2dCLFlBQVgsRUFBeUI7Ozs7UUFJckIrRSxhQUFhLENBQWpCLENBUDBCO1FBUXRCQyxnQkFBZ0IsRUFBcEI7UUFDSUMsd0JBQXdCLEtBQTVCO1FBQ0lqTyxNQUFNL1gsT0FBT21CLFFBQWpCO1FBQ0k0ZixZQUFKOzthQUVTa0YsNEJBQVQsQ0FBc0NDLElBQXRDLEVBQTRDO3NCQUMxQkosVUFBZCxJQUE0QkssaUJBQWlCbGlCLEtBQWpCLENBQXVCbEIsU0FBdkIsRUFBa0NtakIsSUFBbEMsQ0FBNUI7ZUFDT0osWUFBUDs7Ozs7YUFLS0ssZ0JBQVQsQ0FBMEJDLE9BQTFCLEVBQW1DO1lBQzNCRixPQUFPLEdBQUd0Z0IsS0FBSCxDQUFTaEUsSUFBVCxDQUFjc0MsU0FBZCxFQUF5QixDQUF6QixDQUFYO2VBQ08sWUFBVztnQkFDVixPQUFPa2lCLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7d0JBQ3ZCbmlCLEtBQVIsQ0FBY2xCLFNBQWQsRUFBeUJtakIsSUFBekI7YUFESixNQUVPO29CQUNFOWxCLFFBQUosQ0FBYSxLQUFLZ21CLE9BQWxCLENBQUQ7O1NBSlI7OzthQVNLQyxZQUFULENBQXNCQyxNQUF0QixFQUE4Qjs7O1lBR3RCTixxQkFBSixFQUEyQjs7O3VCQUdaRyxpQkFBaUJFLFlBQWpCLEVBQStCQyxNQUEvQixDQUFYLEVBQW1ELENBQW5EO1NBSEosTUFJTztnQkFDQ0MsT0FBT1IsY0FBY08sTUFBZCxDQUFYO2dCQUNJQyxJQUFKLEVBQVU7d0NBQ2tCLElBQXhCO29CQUNJOztpQkFBSixTQUVVO21DQUNTRCxNQUFmOzRDQUN3QixLQUF4Qjs7Ozs7O2FBTVBFLGNBQVQsQ0FBd0JGLE1BQXhCLEVBQWdDO2VBQ3JCUCxjQUFjTyxNQUFkLENBQVA7OzthQUdLRyw2QkFBVCxHQUF5Qzt1QkFDdEIsd0JBQVc7Z0JBQ2xCSCxTQUFTTCw2QkFBNkIvaEIsU0FBN0IsQ0FBYjtvQkFDUXdpQixRQUFSLENBQWlCUCxpQkFBaUJFLFlBQWpCLEVBQStCQyxNQUEvQixDQUFqQjttQkFDT0EsTUFBUDtTQUhKOzs7YUFPS0ssaUJBQVQsR0FBNkI7OztZQUdyQjNtQixPQUFPdWhCLFdBQVAsSUFBc0IsQ0FBQ3ZoQixPQUFPNG1CLGFBQWxDLEVBQWlEO2dCQUN6Q0MsNEJBQTRCLElBQWhDO2dCQUNJQyxlQUFlOW1CLE9BQU8rbUIsU0FBMUI7bUJBQ09BLFNBQVAsR0FBbUIsWUFBVzs0Q0FDRSxLQUE1QjthQURKO21CQUdPeEYsV0FBUCxDQUFtQixFQUFuQixFQUF1QixHQUF2QjttQkFDT3dGLFNBQVAsR0FBbUJELFlBQW5CO21CQUNPRCx5QkFBUDs7OzthQUlDRyxnQ0FBVCxHQUE0Qzs7Ozs7WUFLcENDLGdCQUFnQixrQkFBa0IvbUIsS0FBSzJDLE1BQUwsRUFBbEIsR0FBa0MsR0FBdEQ7WUFDSXFrQixrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVNDLEtBQVQsRUFBZ0I7Z0JBQzlCQSxNQUFNNWlCLE1BQU4sS0FBaUJ2RSxNQUFqQixJQUNBLE9BQU9tbkIsTUFBTTFXLElBQWIsS0FBc0IsUUFEdEIsSUFFQTBXLE1BQU0xVyxJQUFOLENBQVdtSCxPQUFYLENBQW1CcVAsYUFBbkIsTUFBc0MsQ0FGMUMsRUFFNkM7NkJBQzVCLENBQUNFLE1BQU0xVyxJQUFOLENBQVc3SyxLQUFYLENBQWlCcWhCLGNBQWNuakIsTUFBL0IsQ0FBZDs7U0FKUjs7WUFRSTlELE9BQU8yVyxnQkFBWCxFQUE2QjttQkFDbEJBLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DdVEsZUFBbkMsRUFBb0QsS0FBcEQ7U0FESixNQUVPO21CQUNJRSxXQUFQLENBQW1CLFdBQW5CLEVBQWdDRixlQUFoQzs7O3VCQUdXLHdCQUFXO2dCQUNsQlosU0FBU0wsNkJBQTZCL2hCLFNBQTdCLENBQWI7bUJBQ09xZCxXQUFQLENBQW1CMEYsZ0JBQWdCWCxNQUFuQyxFQUEyQyxHQUEzQzttQkFDT0EsTUFBUDtTQUhKOzs7YUFPS2UsbUNBQVQsR0FBK0M7WUFDdkNDLFVBQVUsSUFBSUMsY0FBSixFQUFkO2dCQUNRQyxLQUFSLENBQWNULFNBQWQsR0FBMEIsVUFBU0ksS0FBVCxFQUFnQjtnQkFDbENiLFNBQVNhLE1BQU0xVyxJQUFuQjt5QkFDYTZWLE1BQWI7U0FGSjs7dUJBS2Usd0JBQVc7Z0JBQ2xCQSxTQUFTTCw2QkFBNkIvaEIsU0FBN0IsQ0FBYjtvQkFDUXVqQixLQUFSLENBQWNsRyxXQUFkLENBQTBCK0UsTUFBMUI7bUJBQ09BLE1BQVA7U0FISjs7O2FBT0tvQixxQ0FBVCxHQUFpRDtZQUN6Q0MsT0FBTzVQLElBQUl4TyxlQUFmO3VCQUNlLHdCQUFXO2dCQUNsQitjLFNBQVNMLDZCQUE2Qi9oQixTQUE3QixDQUFiOzs7Z0JBR0kwakIsU0FBUzdQLElBQUkxVyxhQUFKLENBQWtCLFFBQWxCLENBQWI7bUJBQ093bUIsa0JBQVAsR0FBNEIsWUFBWTs2QkFDdkJ2QixNQUFiO3VCQUNPdUIsa0JBQVAsR0FBNEIsSUFBNUI7cUJBQ0tqTixXQUFMLENBQWlCZ04sTUFBakI7eUJBQ1MsSUFBVDthQUpKO2lCQU1LNWQsV0FBTCxDQUFpQjRkLE1BQWpCO21CQUNPdEIsTUFBUDtTQVpKOzs7YUFnQkt3QiwrQkFBVCxHQUEyQzt1QkFDeEIsd0JBQVc7Z0JBQ2xCeEIsU0FBU0wsNkJBQTZCL2hCLFNBQTdCLENBQWI7dUJBQ1dpaUIsaUJBQWlCRSxZQUFqQixFQUErQkMsTUFBL0IsQ0FBWCxFQUFtRCxDQUFuRDttQkFDT0EsTUFBUDtTQUhKOzs7O1FBUUF5QixXQUFXaG5CLE9BQU9vSyxjQUFQLElBQXlCcEssT0FBT29LLGNBQVAsQ0FBc0JuTCxNQUF0QixDQUF4QztlQUNXK25CLFlBQVlBLFNBQVM3RyxVQUFyQixHQUFrQzZHLFFBQWxDLEdBQTZDL25CLE1BQXhEOzs7UUFHSSxHQUFHMkIsUUFBSCxDQUFZQyxJQUFaLENBQWlCNUIsT0FBT2dvQixPQUF4QixNQUFxQyxrQkFBekMsRUFBNkQ7OztLQUE3RCxNQUlPLElBQUlyQixtQkFBSixFQUF5Qjs7O0tBQXpCLE1BSUEsSUFBSTNtQixPQUFPdW5CLGNBQVgsRUFBMkI7OztLQUEzQixNQUlBLElBQUl4UCxPQUFPLHdCQUF3QkEsSUFBSTFXLGFBQUosQ0FBa0IsUUFBbEIsQ0FBbkMsRUFBZ0U7OztLQUFoRSxNQUlBOzs7OzthQUtFMGYsWUFBVCxHQUF3QkEsWUFBeEI7YUFDU3lGLGNBQVQsR0FBMEJBLGNBQTFCO0NBN0tILEVBOEtDcm1CLElBOUtELENBQUQ7O0FDdkJBOzs7Ozs7QUFNQSxBQUVBO0FBQ0EsQUFJQTtBQUNBLEFBRUE7QUFDQSxBQUVBOztBQ25CRSxhQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBc0JKOG5CLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCckYsT0FBMUIsRUFBbUM7TUFDOUJzRixVQUFKOztZQUVVdEYsV0FBVyxFQUFyQjs7Ozs7OztPQU9LdUYsYUFBTCxHQUFxQixLQUFyQjs7Ozs7OztPQVFLQyxrQkFBTCxHQUEwQixDQUExQjs7Ozs7OztPQVFLQyxhQUFMLEdBQXFCLElBQXJCOzs7Ozs7O09BUUtDLFdBQUwsR0FBbUIsQ0FBbkI7Ozs7Ozs7T0FRS0MsV0FBTCxHQUFtQixDQUFuQjs7Ozs7OztPQVFLQyxtQkFBTCxHQUEyQixDQUEzQjs7Ozs7OztPQVFLQyxhQUFMLEdBQXFCN0YsUUFBUTZGLGFBQVIsSUFBeUIsRUFBOUM7Ozs7Ozs7T0FRS1IsS0FBTCxHQUFhQSxLQUFiOzs7Ozs7O09BT0tTLFFBQUwsR0FBZ0I5RixRQUFROEYsUUFBUixJQUFvQixHQUFwQzs7Ozs7OztPQU9LQyxVQUFMLEdBQWtCL0YsUUFBUStGLFVBQVIsSUFBc0IsR0FBeEM7O01BRUlYLFVBQVVZLFNBQVYsQ0FBb0JYLEtBQXBCLENBQUosRUFBZ0M7Ozs7O1dBS3ZCN1AsSUFBVCxDQUFjeVEsTUFBZCxFQUFzQkMsT0FBdEIsRUFBK0I7VUFDdkIsWUFBVztXQUFTRCxPQUFPN2tCLEtBQVAsQ0FBYThrQixPQUFiLEVBQXNCN2tCLFNBQXRCLENBQVA7SUFBcEI7OztNQUlHd0ksVUFBVSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLGNBQXZCLEVBQXVDLGFBQXZDLEVBQXNELFlBQXRELEVBQW9FLGVBQXBFLENBQWQ7TUFDSXFjLFVBQVUsSUFBZDtPQUNLLElBQUlsaEIsSUFBSSxDQUFSLEVBQVdFLElBQUkyRSxRQUFRNUksTUFBNUIsRUFBb0MrRCxJQUFJRSxDQUF4QyxFQUEyQ0YsR0FBM0MsRUFBZ0Q7V0FDdkM2RSxRQUFRN0UsQ0FBUixDQUFSLElBQXNCd1EsS0FBSzBRLFFBQVFyYyxRQUFRN0UsQ0FBUixDQUFSLENBQUwsRUFBMEJraEIsT0FBMUIsQ0FBdEI7Ozs7TUFJR0MsZUFBSixFQUFxQjtTQUNkclMsZ0JBQU4sQ0FBdUIsV0FBdkIsRUFBb0MsS0FBS3NTLE9BQXpDLEVBQWtELElBQWxEO1NBQ010UyxnQkFBTixDQUF1QixXQUF2QixFQUFvQyxLQUFLc1MsT0FBekMsRUFBa0QsSUFBbEQ7U0FDTXRTLGdCQUFOLENBQXVCLFNBQXZCLEVBQWtDLEtBQUtzUyxPQUF2QyxFQUFnRCxJQUFoRDs7O1FBR0t0UyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxLQUFLdVMsT0FBckMsRUFBOEMsSUFBOUM7UUFDTXZTLGdCQUFOLENBQXVCLFlBQXZCLEVBQXFDLEtBQUt3UyxZQUExQyxFQUF3RCxLQUF4RDtRQUNNeFMsZ0JBQU4sQ0FBdUIsV0FBdkIsRUFBb0MsS0FBS3lTLFdBQXpDLEVBQXNELEtBQXREO1FBQ016UyxnQkFBTixDQUF1QixVQUF2QixFQUFtQyxLQUFLMFMsVUFBeEMsRUFBb0QsS0FBcEQ7UUFDTTFTLGdCQUFOLENBQXVCLGFBQXZCLEVBQXNDLEtBQUsyUyxhQUEzQyxFQUEwRCxLQUExRDs7Ozs7TUFLSSxDQUFDQyxNQUFNM2xCLFNBQU4sQ0FBZ0J1aEIsd0JBQXJCLEVBQStDO1NBQ3hDRCxtQkFBTixHQUE0QixVQUFTN2dCLElBQVQsRUFBZW1RLFFBQWYsRUFBeUJnVixPQUF6QixFQUFrQztRQUN6REMsTUFBTTlVLEtBQUsvUSxTQUFMLENBQWVzaEIsbUJBQXpCO1FBQ0k3Z0IsU0FBUyxPQUFiLEVBQXNCO1NBQ2pCekMsSUFBSixDQUFTc21CLEtBQVQsRUFBZ0I3akIsSUFBaEIsRUFBc0JtUSxTQUFTa1YsUUFBVCxJQUFxQmxWLFFBQTNDLEVBQXFEZ1YsT0FBckQ7S0FERCxNQUVPO1NBQ0Y1bkIsSUFBSixDQUFTc21CLEtBQVQsRUFBZ0I3akIsSUFBaEIsRUFBc0JtUSxRQUF0QixFQUFnQ2dWLE9BQWhDOztJQUxGOztTQVNNN1MsZ0JBQU4sR0FBeUIsVUFBU3RTLElBQVQsRUFBZW1RLFFBQWYsRUFBeUJnVixPQUF6QixFQUFrQztRQUN0REcsTUFBTWhWLEtBQUsvUSxTQUFMLENBQWUrUyxnQkFBekI7UUFDSXRTLFNBQVMsT0FBYixFQUFzQjtTQUNqQnpDLElBQUosQ0FBU3NtQixLQUFULEVBQWdCN2pCLElBQWhCLEVBQXNCbVEsU0FBU2tWLFFBQVQsS0FBc0JsVixTQUFTa1YsUUFBVCxHQUFvQixVQUFTdkMsS0FBVCxFQUFnQjtVQUMzRSxDQUFDQSxNQUFNeUMsa0JBQVgsRUFBK0I7Z0JBQ3JCekMsS0FBVDs7TUFGb0IsQ0FBdEIsRUFJSXFDLE9BSko7S0FERCxNQU1PO1NBQ0Y1bkIsSUFBSixDQUFTc21CLEtBQVQsRUFBZ0I3akIsSUFBaEIsRUFBc0JtUSxRQUF0QixFQUFnQ2dWLE9BQWhDOztJQVRGOzs7Ozs7TUFpQkcsT0FBT3RCLE1BQU0yQixPQUFiLEtBQXlCLFVBQTdCLEVBQXlDOzs7O2dCQUkzQjNCLE1BQU0yQixPQUFuQjtTQUNNbFQsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBU3dRLEtBQVQsRUFBZ0I7ZUFDcENBLEtBQVg7SUFERCxFQUVHLEtBRkg7U0FHTTBDLE9BQU4sR0FBZ0IsSUFBaEI7Ozs7Ozs7OztLQVNFQyx1QkFBdUI5SSxVQUFVQyxTQUFWLENBQW9CckosT0FBcEIsQ0FBNEIsZUFBNUIsS0FBZ0QsQ0FBM0U7Ozs7Ozs7S0FPSW9SLGtCQUFrQmhJLFVBQVVDLFNBQVYsQ0FBb0JySixPQUFwQixDQUE0QixTQUE1QixJQUF5QyxDQUF6QyxJQUE4QyxDQUFDa1Msb0JBQXJFOzs7Ozs7O0tBUUlDLGNBQWMsaUJBQWlCeGpCLElBQWpCLENBQXNCeWEsVUFBVUMsU0FBaEMsS0FBOEMsQ0FBQzZJLG9CQUFqRTs7Ozs7OztLQVFJRSxlQUFlRCxlQUFnQixlQUFELENBQWtCeGpCLElBQWxCLENBQXVCeWEsVUFBVUMsU0FBakMsQ0FBbEM7Ozs7Ozs7S0FRSWdKLDJCQUEyQkYsZUFBZ0IsYUFBRCxDQUFnQnhqQixJQUFoQixDQUFxQnlhLFVBQVVDLFNBQS9CLENBQTlDOzs7Ozs7O0tBT0lpSix1QkFBdUJsSixVQUFVQyxTQUFWLENBQW9CckosT0FBcEIsQ0FBNEIsTUFBNUIsSUFBc0MsQ0FBakU7Ozs7Ozs7O1dBUVVoVSxTQUFWLENBQW9CdW1CLFVBQXBCLEdBQWlDLFVBQVNubEIsTUFBVCxFQUFpQjtVQUN6Q0EsT0FBT29sQixRQUFQLENBQWdCQyxXQUFoQixFQUFSOzs7UUFHSyxRQUFMO1FBQ0ssUUFBTDtRQUNLLFVBQUw7UUFDS3JsQixPQUFPc2xCLFFBQVgsRUFBcUI7WUFDYixJQUFQOzs7O1FBSUcsT0FBTDs7O1FBR01QLGVBQWUva0IsT0FBT1gsSUFBUCxLQUFnQixNQUFoQyxJQUEyQ1csT0FBT3NsQixRQUF0RCxFQUFnRTtZQUN4RCxJQUFQOzs7O1FBSUcsT0FBTDtRQUNLLFFBQUwsQ0FwQkE7UUFxQkssT0FBTDtXQUNRLElBQVA7OzswQkFHTSxDQUFtQi9qQixJQUFuQixDQUF3QnZCLE9BQU91bEIsU0FBL0I7O0VBMUJSOzs7Ozs7OztXQW9DVTNtQixTQUFWLENBQW9CNG1CLFVBQXBCLEdBQWlDLFVBQVN4bEIsTUFBVCxFQUFpQjtVQUN6Q0EsT0FBT29sQixRQUFQLENBQWdCQyxXQUFoQixFQUFSO1FBQ0ssVUFBTDtXQUNRLElBQVA7UUFDSSxRQUFMO1dBQ1EsQ0FBQ3JCLGVBQVI7UUFDSSxPQUFMO1lBQ1Noa0IsT0FBT1gsSUFBZjtVQUNLLFFBQUw7VUFDSyxVQUFMO1VBQ0ssTUFBTDtVQUNLLE9BQUw7VUFDSyxPQUFMO1VBQ0ssUUFBTDthQUNRLEtBQVA7Ozs7V0FJTSxDQUFDVyxPQUFPc2xCLFFBQVIsSUFBb0IsQ0FBQ3RsQixPQUFPeWxCLFFBQW5DOzs0QkFFTyxDQUFtQmxrQixJQUFuQixDQUF3QnZCLE9BQU91bEIsU0FBL0I7OztFQXBCVDs7Ozs7Ozs7V0ErQlUzbUIsU0FBVixDQUFvQjhtQixTQUFwQixHQUFnQyxVQUFTcEMsYUFBVCxFQUF3Qm5CLEtBQXhCLEVBQStCO01BQzFEd0QsVUFBSixFQUFnQkMsS0FBaEI7OztNQUdJenBCLFNBQVMwcEIsYUFBVCxJQUEwQjFwQixTQUFTMHBCLGFBQVQsS0FBMkJ2QyxhQUF6RCxFQUF3RTtZQUM5RHVDLGFBQVQsQ0FBdUJDLElBQXZCOzs7VUFHTzNELE1BQU00RCxjQUFOLENBQXFCLENBQXJCLENBQVI7OztlQUdhNXBCLFNBQVM2cEIsV0FBVCxDQUFxQixhQUFyQixDQUFiO2FBQ1dDLGNBQVgsQ0FBMEIsS0FBS0Msa0JBQUwsQ0FBd0I1QyxhQUF4QixDQUExQixFQUFrRSxJQUFsRSxFQUF3RSxJQUF4RSxFQUE4RXpvQixNQUE5RSxFQUFzRixDQUF0RixFQUF5RitxQixNQUFNTyxPQUEvRixFQUF3R1AsTUFBTVEsT0FBOUcsRUFBdUhSLE1BQU1TLE9BQTdILEVBQXNJVCxNQUFNVSxPQUE1SSxFQUFxSixLQUFySixFQUE0SixLQUE1SixFQUFtSyxLQUFuSyxFQUEwSyxLQUExSyxFQUFpTCxDQUFqTCxFQUFvTCxJQUFwTDthQUNXQyxtQkFBWCxHQUFpQyxJQUFqQztnQkFDY0MsYUFBZCxDQUE0QmIsVUFBNUI7RUFkRDs7V0FpQlUvbUIsU0FBVixDQUFvQnNuQixrQkFBcEIsR0FBeUMsVUFBUzVDLGFBQVQsRUFBd0I7OztNQUc1RFUsbUJBQW1CVixjQUFjbUQsT0FBZCxDQUFzQnBCLFdBQXRCLE9BQXdDLFFBQS9ELEVBQXlFO1VBQ2pFLFdBQVA7OztTQUdNLE9BQVA7RUFQRDs7Ozs7V0FjVXptQixTQUFWLENBQW9COG5CLEtBQXBCLEdBQTRCLFVBQVNwRCxhQUFULEVBQXdCO01BQy9DeGtCLE1BQUo7OztNQUdJaW1CLGVBQWV6QixjQUFjcUQsaUJBQTdCLElBQWtEckQsY0FBY2prQixJQUFkLENBQW1CdVQsT0FBbkIsQ0FBMkIsTUFBM0IsTUFBdUMsQ0FBekYsSUFBOEYwUSxjQUFjamtCLElBQWQsS0FBdUIsTUFBckgsSUFBK0hpa0IsY0FBY2prQixJQUFkLEtBQXVCLE9BQTFKLEVBQW1LO1lBQ3pKaWtCLGNBQWNsbUIsS0FBZCxDQUFvQjBCLE1BQTdCO2lCQUNjNm5CLGlCQUFkLENBQWdDN25CLE1BQWhDLEVBQXdDQSxNQUF4QztHQUZELE1BR087aUJBQ1E0bkIsS0FBZDs7RUFSRjs7Ozs7OztXQWtCVTluQixTQUFWLENBQW9CZ29CLGtCQUFwQixHQUF5QyxVQUFTdEQsYUFBVCxFQUF3QjtNQUM1RHVELFlBQUosRUFBa0JDLGFBQWxCOztpQkFFZXhELGNBQWN5RCxxQkFBN0I7Ozs7TUFJSSxDQUFDRixZQUFELElBQWlCLENBQUNBLGFBQWFHLFFBQWIsQ0FBc0IxRCxhQUF0QixDQUF0QixFQUE0RDttQkFDM0NBLGFBQWhCO01BQ0c7UUFDRXdELGNBQWNHLFlBQWQsR0FBNkJILGNBQWNJLFlBQS9DLEVBQTZEO29CQUM3Q0osYUFBZjttQkFDY0MscUJBQWQsR0FBc0NELGFBQXRDOzs7O29CQUllQSxjQUFjQSxhQUE5QjtJQVBELFFBUVNBLGFBUlQ7Ozs7TUFZR0QsWUFBSixFQUFrQjtnQkFDSk0sc0JBQWIsR0FBc0NOLGFBQWFPLFNBQW5EOztFQXRCRjs7Ozs7O1dBK0JVeG9CLFNBQVYsQ0FBb0J5b0IsK0JBQXBCLEdBQXNELFVBQVNDLFdBQVQsRUFBc0I7OztNQUd2RUEsWUFBWTVYLFFBQVosS0FBeUJDLEtBQUttSixTQUFsQyxFQUE2QztVQUNyQ3dPLFlBQVl4WSxVQUFuQjs7O1NBR013WSxXQUFQO0VBUEQ7Ozs7Ozs7O1dBaUJVMW9CLFNBQVYsQ0FBb0J1bEIsWUFBcEIsR0FBbUMsVUFBU2hDLEtBQVQsRUFBZ0I7TUFDOUNtQixhQUFKLEVBQW1Cc0MsS0FBbkIsRUFBMEIyQixTQUExQjs7O01BR0lwRixNQUFNcUYsYUFBTixDQUFvQjFvQixNQUFwQixHQUE2QixDQUFqQyxFQUFvQztVQUM1QixJQUFQOzs7a0JBR2UsS0FBS3VvQiwrQkFBTCxDQUFxQ2xGLE1BQU1uaUIsTUFBM0MsQ0FBaEI7VUFDUW1pQixNQUFNcUYsYUFBTixDQUFvQixDQUFwQixDQUFSOzs7O01BSUlsRSxjQUFjbUUsaUJBQWxCLEVBQXFDO1VBQzdCLElBQVA7OztNQUdHMUMsV0FBSixFQUFpQjs7O2VBR0pscUIsT0FBTzZzQixZQUFQLEVBQVo7T0FDSUgsVUFBVUksVUFBVixJQUF3QixDQUFDSixVQUFVSyxXQUF2QyxFQUFvRDtXQUM1QyxJQUFQOzs7T0FHRyxDQUFDNUMsWUFBTCxFQUFtQjs7Ozs7Ozs7OztRQVVkWSxNQUFNaUMsVUFBTixJQUFvQmpDLE1BQU1pQyxVQUFOLEtBQXFCLEtBQUtwRSxtQkFBbEQsRUFBdUU7V0FDaEVxRSxjQUFOO1lBQ08sS0FBUDs7O1NBR0lyRSxtQkFBTCxHQUEyQm1DLE1BQU1pQyxVQUFqQzs7Ozs7Ozs7U0FRS2pCLGtCQUFMLENBQXdCdEQsYUFBeEI7Ozs7T0FJR0YsYUFBTCxHQUFxQixJQUFyQjtPQUNLQyxrQkFBTCxHQUEwQmxCLE1BQU00RixTQUFoQztPQUNLekUsYUFBTCxHQUFxQkEsYUFBckI7O09BRUtDLFdBQUwsR0FBbUJxQyxNQUFNb0MsS0FBekI7T0FDS3hFLFdBQUwsR0FBbUJvQyxNQUFNcUMsS0FBekI7OztNQUdLOUYsTUFBTTRGLFNBQU4sR0FBa0IsS0FBS0csYUFBeEIsR0FBeUMsS0FBS3ZFLFFBQTlDLElBQTJEeEIsTUFBTTRGLFNBQU4sR0FBa0IsS0FBS0csYUFBeEIsR0FBeUMsQ0FBQyxDQUF4RyxFQUEyRztTQUNwR0osY0FBTjs7O1NBR00sSUFBUDtFQWhFRDs7Ozs7Ozs7V0EwRVVscEIsU0FBVixDQUFvQnVwQixhQUFwQixHQUFvQyxVQUFTaEcsS0FBVCxFQUFnQjtNQUMvQ3lELFFBQVF6RCxNQUFNNEQsY0FBTixDQUFxQixDQUFyQixDQUFaO01BQXFDcUMsV0FBVyxLQUFLMUUsYUFBckQ7O01BRUl4b0IsS0FBS210QixHQUFMLENBQVN6QyxNQUFNb0MsS0FBTixHQUFjLEtBQUt6RSxXQUE1QixJQUEyQzZFLFFBQTNDLElBQXVEbHRCLEtBQUttdEIsR0FBTCxDQUFTekMsTUFBTXFDLEtBQU4sR0FBYyxLQUFLekUsV0FBNUIsSUFBMkM0RSxRQUF0RyxFQUFnSDtVQUN4RyxJQUFQOzs7U0FHTSxLQUFQO0VBUEQ7Ozs7Ozs7O1dBaUJVeHBCLFNBQVYsQ0FBb0J3bEIsV0FBcEIsR0FBa0MsVUFBU2pDLEtBQVQsRUFBZ0I7TUFDN0MsQ0FBQyxLQUFLaUIsYUFBVixFQUF5QjtVQUNqQixJQUFQOzs7O01BSUcsS0FBS0UsYUFBTCxLQUF1QixLQUFLK0QsK0JBQUwsQ0FBcUNsRixNQUFNbmlCLE1BQTNDLENBQXZCLElBQTZFLEtBQUttb0IsYUFBTCxDQUFtQmhHLEtBQW5CLENBQWpGLEVBQTRHO1FBQ3RHaUIsYUFBTCxHQUFxQixLQUFyQjtRQUNLRSxhQUFMLEdBQXFCLElBQXJCOzs7U0FHTSxJQUFQO0VBWEQ7Ozs7Ozs7O1dBcUJVMWtCLFNBQVYsQ0FBb0IwcEIsV0FBcEIsR0FBa0MsVUFBU0MsWUFBVCxFQUF1Qjs7O01BR3BEQSxhQUFhQyxPQUFiLEtBQXlCenFCLFNBQTdCLEVBQXdDO1VBQ2hDd3FCLGFBQWFDLE9BQXBCOzs7O01BSUdELGFBQWFFLE9BQWpCLEVBQTBCO1VBQ2xCdHNCLFNBQVN1c0IsY0FBVCxDQUF3QkgsYUFBYUUsT0FBckMsQ0FBUDs7Ozs7U0FLTUYsYUFBYUksYUFBYixDQUEyQixxRkFBM0IsQ0FBUDtFQWREOzs7Ozs7OztXQXdCVS9wQixTQUFWLENBQW9CeWxCLFVBQXBCLEdBQWlDLFVBQVNsQyxLQUFULEVBQWdCO01BQzVDeUcsVUFBSjtNQUFnQnZGLGtCQUFoQjtNQUFvQ3dGLGFBQXBDO01BQW1EaEMsWUFBbkQ7TUFBaUVqQixLQUFqRTtNQUF3RXRDLGdCQUFnQixLQUFLQSxhQUE3Rjs7TUFFSSxDQUFDLEtBQUtGLGFBQVYsRUFBeUI7VUFDakIsSUFBUDs7OztNQUlJakIsTUFBTTRGLFNBQU4sR0FBa0IsS0FBS0csYUFBeEIsR0FBeUMsS0FBS3ZFLFFBQTlDLElBQTJEeEIsTUFBTTRGLFNBQU4sR0FBa0IsS0FBS0csYUFBeEIsR0FBeUMsQ0FBQyxDQUF4RyxFQUEyRztRQUNyR1ksZUFBTCxHQUF1QixJQUF2QjtVQUNPLElBQVA7OztNQUdJM0csTUFBTTRGLFNBQU4sR0FBa0IsS0FBSzFFLGtCQUF4QixHQUE4QyxLQUFLTyxVQUF2RCxFQUFtRTtVQUMzRCxJQUFQOzs7O09BSUlrRixlQUFMLEdBQXVCLEtBQXZCOztPQUVLWixhQUFMLEdBQXFCL0YsTUFBTTRGLFNBQTNCOzt1QkFFcUIsS0FBSzFFLGtCQUExQjtPQUNLRCxhQUFMLEdBQXFCLEtBQXJCO09BQ0tDLGtCQUFMLEdBQTBCLENBQTFCOzs7Ozs7TUFNSTRCLHdCQUFKLEVBQThCO1dBQ3JCOUMsTUFBTTRELGNBQU4sQ0FBcUIsQ0FBckIsQ0FBUjs7O21CQUdnQjVwQixTQUFTNHNCLGdCQUFULENBQTBCbkQsTUFBTW9DLEtBQU4sR0FBY250QixPQUFPbXVCLFdBQS9DLEVBQTREcEQsTUFBTXFDLEtBQU4sR0FBY3B0QixPQUFPb3VCLFdBQWpGLEtBQWlHM0YsYUFBakg7aUJBQ2N5RCxxQkFBZCxHQUFzQyxLQUFLekQsYUFBTCxDQUFtQnlELHFCQUF6RDs7O2tCQUdlekQsY0FBY21ELE9BQWQsQ0FBc0JwQixXQUF0QixFQUFoQjtNQUNJd0Qsa0JBQWtCLE9BQXRCLEVBQStCO2dCQUNqQixLQUFLUCxXQUFMLENBQWlCaEYsYUFBakIsQ0FBYjtPQUNJc0YsVUFBSixFQUFnQjtTQUNWbEMsS0FBTCxDQUFXcEQsYUFBWDtRQUNJVSxlQUFKLEVBQXFCO1lBQ2IsS0FBUDs7O29CQUdlNEUsVUFBaEI7O0dBUkYsTUFVTyxJQUFJLEtBQUtwRCxVQUFMLENBQWdCbEMsYUFBaEIsQ0FBSixFQUFvQzs7OztPQUlyQ25CLE1BQU00RixTQUFOLEdBQWtCMUUsa0JBQW5CLEdBQXlDLEdBQXpDLElBQWlEMEIsZUFBZWxxQixPQUFPcXVCLEdBQVAsS0FBZXJ1QixNQUE5QixJQUF3Q2d1QixrQkFBa0IsT0FBL0csRUFBeUg7U0FDbkh2RixhQUFMLEdBQXFCLElBQXJCO1dBQ08sS0FBUDs7O1FBR0lvRCxLQUFMLENBQVdwRCxhQUFYO1FBQ0tvQyxTQUFMLENBQWVwQyxhQUFmLEVBQThCbkIsS0FBOUI7Ozs7T0FJSSxDQUFDNEMsV0FBRCxJQUFnQjhELGtCQUFrQixRQUF0QyxFQUFnRDtTQUMxQ3ZGLGFBQUwsR0FBcUIsSUFBckI7VUFDTXdFLGNBQU47OztVQUdNLEtBQVA7OztNQUdHL0MsZUFBZSxDQUFDQyxZQUFwQixFQUFrQzs7OztrQkFJbEIxQixjQUFjeUQscUJBQTdCO09BQ0lGLGdCQUFnQkEsYUFBYU0sc0JBQWIsS0FBd0NOLGFBQWFPLFNBQXpFLEVBQW9GO1dBQzVFLElBQVA7Ozs7OztNQU1FLENBQUMsS0FBS2pDLFVBQUwsQ0FBZ0I3QixhQUFoQixDQUFMLEVBQXFDO1NBQzlCd0UsY0FBTjtRQUNLcEMsU0FBTCxDQUFlcEMsYUFBZixFQUE4Qm5CLEtBQTlCOzs7U0FHTSxLQUFQO0VBeEZEOzs7Ozs7O1dBaUdVdmpCLFNBQVYsQ0FBb0IwbEIsYUFBcEIsR0FBb0MsWUFBVztPQUN6Q2xCLGFBQUwsR0FBcUIsS0FBckI7T0FDS0UsYUFBTCxHQUFxQixJQUFyQjtFQUZEOzs7Ozs7OztXQVlVMWtCLFNBQVYsQ0FBb0JxbEIsT0FBcEIsR0FBOEIsVUFBUzlCLEtBQVQsRUFBZ0I7OztNQUd6QyxDQUFDLEtBQUttQixhQUFWLEVBQXlCO1VBQ2pCLElBQVA7OztNQUdHbkIsTUFBTW9FLG1CQUFWLEVBQStCO1VBQ3ZCLElBQVA7Ozs7TUFJRyxDQUFDcEUsTUFBTWdILFVBQVgsRUFBdUI7VUFDZixJQUFQOzs7Ozs7TUFNRyxDQUFDLEtBQUtoRSxVQUFMLENBQWdCLEtBQUs3QixhQUFyQixDQUFELElBQXdDLEtBQUt3RixlQUFqRCxFQUFrRTs7O09BRzdEM0csTUFBTWhDLHdCQUFWLEVBQW9DO1VBQzdCQSx3QkFBTjtJQURELE1BRU87OztVQUdBeUUsa0JBQU4sR0FBMkIsSUFBM0I7Ozs7U0FJS3dFLGVBQU47U0FDTXRCLGNBQU47O1VBRU8sS0FBUDs7OztTQUlNLElBQVA7RUF0Q0Q7Ozs7Ozs7Ozs7V0FrRFVscEIsU0FBVixDQUFvQnNsQixPQUFwQixHQUE4QixVQUFTL0IsS0FBVCxFQUFnQjtNQUN6Q2tILFNBQUo7OztNQUdJLEtBQUtqRyxhQUFULEVBQXdCO1FBQ2xCRSxhQUFMLEdBQXFCLElBQXJCO1FBQ0tGLGFBQUwsR0FBcUIsS0FBckI7VUFDTyxJQUFQOzs7O01BSUdqQixNQUFNbmlCLE1BQU4sQ0FBYVgsSUFBYixLQUFzQixRQUF0QixJQUFrQzhpQixNQUFNbUgsTUFBTixLQUFpQixDQUF2RCxFQUEwRDtVQUNsRCxJQUFQOzs7Y0FHVyxLQUFLckYsT0FBTCxDQUFhOUIsS0FBYixDQUFaOzs7TUFHSSxDQUFDa0gsU0FBTCxFQUFnQjtRQUNWL0YsYUFBTCxHQUFxQixJQUFyQjs7OztTQUlNK0YsU0FBUDtFQXZCRDs7Ozs7OztXQWdDVXpxQixTQUFWLENBQW9CMnFCLE9BQXBCLEdBQThCLFlBQVc7TUFDcENyRyxRQUFRLEtBQUtBLEtBQWpCOztNQUVJYyxlQUFKLEVBQXFCO1NBQ2Q5RCxtQkFBTixDQUEwQixXQUExQixFQUF1QyxLQUFLK0QsT0FBNUMsRUFBcUQsSUFBckQ7U0FDTS9ELG1CQUFOLENBQTBCLFdBQTFCLEVBQXVDLEtBQUsrRCxPQUE1QyxFQUFxRCxJQUFyRDtTQUNNL0QsbUJBQU4sQ0FBMEIsU0FBMUIsRUFBcUMsS0FBSytELE9BQTFDLEVBQW1ELElBQW5EOzs7UUFHSy9ELG1CQUFOLENBQTBCLE9BQTFCLEVBQW1DLEtBQUtnRSxPQUF4QyxFQUFpRCxJQUFqRDtRQUNNaEUsbUJBQU4sQ0FBMEIsWUFBMUIsRUFBd0MsS0FBS2lFLFlBQTdDLEVBQTJELEtBQTNEO1FBQ01qRSxtQkFBTixDQUEwQixXQUExQixFQUF1QyxLQUFLa0UsV0FBNUMsRUFBeUQsS0FBekQ7UUFDTWxFLG1CQUFOLENBQTBCLFVBQTFCLEVBQXNDLEtBQUttRSxVQUEzQyxFQUF1RCxLQUF2RDtRQUNNbkUsbUJBQU4sQ0FBMEIsYUFBMUIsRUFBeUMsS0FBS29FLGFBQTlDLEVBQTZELEtBQTdEO0VBYkQ7Ozs7Ozs7V0FzQlVULFNBQVYsR0FBc0IsVUFBU1gsS0FBVCxFQUFnQjtNQUNqQ3NHLFlBQUo7TUFDSUMsYUFBSjtNQUNJQyxpQkFBSjtNQUNJQyxjQUFKOzs7TUFHSSxPQUFPOXVCLE9BQU8rdUIsWUFBZCxLQUErQixXQUFuQyxFQUFnRDtVQUN4QyxJQUFQOzs7O2tCQUllLENBQUMsQ0FBQyxtQkFBbUJodUIsSUFBbkIsQ0FBd0JvZ0IsVUFBVUMsU0FBbEMsS0FBZ0QsR0FBRSxDQUFGLENBQWpELEVBQXVELENBQXZELENBQWpCOztNQUVJd04sYUFBSixFQUFtQjs7T0FFZHpGLGVBQUosRUFBcUI7bUJBQ0w3bkIsU0FBU3dzQixhQUFULENBQXVCLHFCQUF2QixDQUFmOztRQUVJYSxZQUFKLEVBQWtCOztTQUViQSxhQUFhblAsT0FBYixDQUFxQnpILE9BQXJCLENBQTZCLGtCQUE3QixNQUFxRCxDQUFDLENBQTFELEVBQTZEO2FBQ3JELElBQVA7OztTQUdHNlcsZ0JBQWdCLEVBQWhCLElBQXNCdHRCLFNBQVNvSSxlQUFULENBQXlCc2xCLFdBQXpCLElBQXdDaHZCLE9BQU9pdkIsVUFBekUsRUFBcUY7YUFDN0UsSUFBUDs7Ozs7SUFWSCxNQWVPO1dBQ0MsSUFBUDs7OztNQUlFNUUsb0JBQUosRUFBMEI7dUJBQ0xsSixVQUFVQyxTQUFWLENBQW9COE4sS0FBcEIsQ0FBMEIsNkJBQTFCLENBQXBCOzs7O09BSUlMLGtCQUFrQixDQUFsQixLQUF3QixFQUF4QixJQUE4QkEsa0JBQWtCLENBQWxCLEtBQXdCLENBQTFELEVBQTZEO21CQUM3Q3Z0QixTQUFTd3NCLGFBQVQsQ0FBdUIscUJBQXZCLENBQWY7O1FBRUlhLFlBQUosRUFBa0I7O1NBRWJBLGFBQWFuUCxPQUFiLENBQXFCekgsT0FBckIsQ0FBNkIsa0JBQTdCLE1BQXFELENBQUMsQ0FBMUQsRUFBNkQ7YUFDckQsSUFBUDs7O1NBR0d6VyxTQUFTb0ksZUFBVCxDQUF5QnNsQixXQUF6QixJQUF3Q2h2QixPQUFPaXZCLFVBQW5ELEVBQStEO2FBQ3ZELElBQVA7Ozs7Ozs7TUFPQTVHLE1BQU1wZSxLQUFOLENBQVlrbEIsYUFBWixLQUE4QixNQUE5QixJQUF3QzlHLE1BQU1wZSxLQUFOLENBQVltbEIsV0FBWixLQUE0QixjQUF4RSxFQUF3RjtVQUNoRixJQUFQOzs7O21CQUlnQixDQUFDLENBQUMsb0JBQW9CcnVCLElBQXBCLENBQXlCb2dCLFVBQVVDLFNBQW5DLEtBQWlELEdBQUUsQ0FBRixDQUFsRCxFQUF3RCxDQUF4RCxDQUFsQjs7TUFFSTBOLGtCQUFrQixFQUF0QixFQUEwQjs7O2tCQUdWeHRCLFNBQVN3c0IsYUFBVCxDQUF1QixxQkFBdkIsQ0FBZjtPQUNJYSxpQkFBaUJBLGFBQWFuUCxPQUFiLENBQXFCekgsT0FBckIsQ0FBNkIsa0JBQTdCLE1BQXFELENBQUMsQ0FBdEQsSUFBMkR6VyxTQUFTb0ksZUFBVCxDQUF5QnNsQixXQUF6QixJQUF3Q2h2QixPQUFPaXZCLFVBQTNILENBQUosRUFBNEk7V0FDcEksSUFBUDs7Ozs7O01BTUU1RyxNQUFNcGUsS0FBTixDQUFZbWxCLFdBQVosS0FBNEIsTUFBNUIsSUFBc0MvRyxNQUFNcGUsS0FBTixDQUFZbWxCLFdBQVosS0FBNEIsY0FBdEUsRUFBc0Y7VUFDOUUsSUFBUDs7O1NBR00sS0FBUDtFQWhGRDs7Ozs7Ozs7V0EwRlVDLE1BQVYsR0FBbUIsVUFBU2hILEtBQVQsRUFBZ0JyRixPQUFoQixFQUF5QjtTQUNwQyxJQUFJb0YsU0FBSixDQUFjQyxLQUFkLEVBQXFCckYsT0FBckIsQ0FBUDtFQUREOztRQUlRb0YsU0FBUCxHQUFtQkEsU0FBbkI7Q0FqMEJBLEdBQUQ7O0FDQUQsQ0FBQyxZQUFXO01BQ05rSCxtQkFBbUIscUZBQXZCOztNQUVJQyxXQUFXOzJCQUNVLGlDQUFXO1VBQzVCQyxrQkFBa0JsdUIsU0FBU3dzQixhQUFULENBQXVCLHFCQUF2QixDQUF0Qjs7VUFFSSxDQUFDMEIsZUFBTCxFQUFzQjswQkFDRmx1QixTQUFTRSxhQUFULENBQXVCLE1BQXZCLENBQWxCO3dCQUNnQmlELElBQWhCLEdBQXVCLFVBQXZCO2lCQUNTZ3JCLElBQVQsQ0FBY3RsQixXQUFkLENBQTBCcWxCLGVBQTFCOzs7YUFHS0EsZUFBUDtLQVZXOztXQWFOLGlCQUFXO1VBQ1pBLGtCQUFrQkQsU0FBU0cscUJBQVQsRUFBdEI7O1VBRUksQ0FBQ0YsZUFBTCxFQUFzQjs7OztVQUlsQixDQUFDQSxnQkFBZ0JHLFlBQWhCLENBQTZCLFNBQTdCLENBQUwsRUFBOEM7d0JBQzVCelUsWUFBaEIsQ0FBNkIsU0FBN0IsRUFBd0NvVSxnQkFBeEM7OztHQXJCTjs7U0EwQk9DLFFBQVAsR0FBa0JBLFFBQWxCO0NBN0JGOztBQ0FBO0FBQ0EsQUFDQTs7QUNHZSxTQUFTSyxLQUFULENBQWVDLE1BQWYsRUFBb0I7TUFDN0I3dkIsT0FBTzZ2QixHQUFYLEVBQWdCO1dBQ1ZDLEtBQUosQ0FBVTlRLElBQVYsQ0FBZSxvQ0FBZjs7OztTQUlLbEksZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtXQUNoQ2laLFNBQUosR0FBZ0IzSCxVQUFVaUgsTUFBVixDQUFpQi90QixTQUFTMHVCLElBQTFCLENBQWhCOztRQUVNQyxxQkFBcUIsa0JBQWtCM3VCLFNBQVMwdUIsSUFBVCxDQUFjL2xCLEtBQTNEOztXQUVJaW1CLFFBQUosQ0FBYUMsb0JBQWIsQ0FBa0MsWUFBTTtVQUNsQ04sT0FBSUssUUFBSixDQUFhRSxTQUFiLEVBQUosRUFBOEI7OztlQUd4QkwsU0FBSixDQUFjckIsT0FBZDtPQUhGLE1BSU8sSUFBSW1CLE9BQUlLLFFBQUosQ0FBYUcsS0FBYixFQUFKLEVBQTBCO1lBQzNCSix1QkFBdUJKLE9BQUlLLFFBQUosQ0FBYUksV0FBYixNQUE4QlQsT0FBSUssUUFBSixDQUFhSyxXQUFiLEVBQXJELENBQUosRUFBc0Y7O2lCQUVoRlIsU0FBSixDQUFjckIsT0FBZDtTQUZGLE1BR087Ozs7S0FUWDtHQUxGLEVBbUJHLEtBbkJIOztTQXFCSThCLEtBQUosQ0FBVSxZQUFXO1dBQ2ZDLDZCQUFKO1dBQ0lDLCtCQUFKLEdBQXNDYixPQUFJYyxTQUFKLENBQWNDLGFBQWQsQ0FBNEJDLGFBQTVCLENBQTBDN3dCLE9BQU9zQixRQUFQLENBQWdCMHVCLElBQTFELEVBQWdFLFlBQU07VUFDdEc5dUIsT0FBTzJCLGNBQVAsQ0FBc0JkLElBQXRCLENBQTJCb2YsU0FBM0IsRUFBc0MsS0FBdEMsQ0FBSixFQUFrRDtrQkFDdEMyUCxHQUFWLENBQWNDLE9BQWQ7T0FERixNQUVPO2dCQUNHL1IsSUFBUixDQUFhLHFHQUFiOztLQUprQyxDQUF0QzthQU9TZ1IsSUFBVCxDQUFjZ0IsZ0JBQWQsR0FBaUMsSUFBSW5CLE9BQUlvQixlQUFSLENBQXdCM3ZCLFNBQVMwdUIsSUFBakMsQ0FBakM7OztRQUdJLENBQUNILE9BQUlLLFFBQUosQ0FBYWdCLFNBQWIsRUFBTCxFQUErQjtlQUNwQmxCLElBQVQsQ0FBY2xaLGdCQUFkLENBQStCLFNBQS9CLEVBQTBDLFVBQVN3USxLQUFULEVBQWdCO1lBQ3BEQSxNQUFNNkosT0FBTixLQUFrQixFQUF0QixFQUEwQjtpQkFDcEJDLHlCQUFKOztPQUZKOzs7O1dBUUVDLHlCQUFKO0dBckJGOzs7V0F5QlN6QixLQUFUOzs7QUN0REZBLE1BQU1DLEdBQU47Ozs7In0=
