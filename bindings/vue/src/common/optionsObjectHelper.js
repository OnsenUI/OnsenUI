import ons from 'onsenui';

/**
 * Properties reserved by Custom Elements v1 and Onsen UI Core.
 */
const _reservedProperties = [
  /^_.*$/,
  /^init$/, // will be removed from Onsen UI Core (but still exists in 2.0.5)
  /^constructor$/,
  /^connectedCallback$/,
  /^disconnectedCallback$/,
  /^attributeChangedCallback$/,
  /^adoptedCallback$/,
];

/**
 * Check if or not the property is reserved.
 */
const _isReserved = (propertyName) => {
  return _reservedProperties
  .map((v) => v.test(propertyName)) // Output example: [false, true, false, false, false, false]
  .reduce((a, b) => a || b); // Output example: true
};

/**
 * Check if or not the property is method.
 */
const _isMethod = (propertyDescriptor) => {
  return typeof propertyDescriptor.value !== 'undefined';
};

const _scanNonReservedProperties = (targetClass, callback) => {
  // Caution:
  // This statement assumes that
  // each element is implemented in just one class.
  //
  // Even if <ons-foo> is implemented in ons.FooElement and ons.BarElement,
  // this statement will ignore properties and methods defined in ons.BarElement.
  const propertyDescriptors = Object.getOwnPropertyDescriptors(targetClass.prototype);

  Object.keys(propertyDescriptors).forEach(
    (propertyName) => {
      if (!_isReserved(propertyName)) { // ignore reserved properties
        callback(propertyName, propertyDescriptors[propertyName]);
      }
    }
  );
};

const createComputedPropertiesFor = (targetClass) => {
  const computed = {};

  _scanNonReservedProperties(targetClass, (propertyName, propertyDescriptor) => {
    if (!_isMethod(propertyDescriptor)) {
      // If the property is not a method,
      // register a computed property
      // which relay set/get operations to its corresponding property of DOM element
      computed[propertyName] = {
        get() { return this.$el[propertyName]; },
        set(newValue) { this.$el[propertyName] = newValue; }
      };
    }
  });

  return computed;
};

const createMethodsFor = (targetClass) => {
  const methods = {};

  _scanNonReservedProperties(targetClass, (propertyName, propertyDescriptor) => {
    if (_isMethod(propertyDescriptor)) {
      // If the property is a method,
      // register a method
      // which relay function call and its arguments to its corresponding method of DOM element
      methods[propertyName] = function(...args) { return this.$el[propertyName].apply(this.$el, args); };
    }
  });

  return methods;
};

const _getClassFrom = tagName => {
  let className = tagName.toLowerCase().slice(4);
  className = className.charAt(0).toUpperCase() + className.slice(1) + 'Element';
  return ons[className]
};

const deriveEvents = {
  mounted() {
    _getClassFrom(this.$el.tagName).events.forEach(key => {
      this.$el.addEventListener(key, this.$emit.bind(this, key));
    });
  },
  beforeDestroy() {
    _getClassFrom(this.$el.tagName).events.forEach(key => {
      this.$el.removeEventListener(key, this.$emit.bind(this, key));
    });
  }
};

const deriveMethods = {
  beforeCreate() {
    this.$options.methods = Object.assign({}, createMethodsFor(_getClassFrom(this.$options._componentTag.slice(2))), this.$options.methods);
  }
};

const deriveProperties = {
  beforeCreate() {
    this.$options.computed = Object.assign({}, createComputedPropertiesFor(_getClassFrom(this.$options._componentTag.slice(2))), this.$options.computed);
  }
};

export {createComputedPropertiesFor, createMethodsFor, deriveEvents, deriveMethods, deriveProperties};
