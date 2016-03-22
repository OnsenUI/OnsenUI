
declare var ons: {_elementReady:{installImplementation: Function}};

ons._elementReady.installImplementation(function(element, callback) {
  setImmediate(callback);
});

