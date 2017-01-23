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

const _blackListedProperties = [
  'page',
  'pageLoader',
  'visible',
  'onDeviceBackButton'
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
      if (!_isReserved(propertyName) && !_blackListedProperties.includes(propertyName)) { // ignore reserved  and black listed properties
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
        cache: false,
        get() { return (this.$el[propertyName] && this.$el[propertyName].__vue__) || this.$el[propertyName]; },
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

export {createComputedPropertiesFor, createMethodsFor };
