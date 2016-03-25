
ons._elementReady.installImplementation(function(element, callback) {
  const name = element.nodeName.toLowerCase();
  const delayElements = ['ons-navigator', 'ons-page', 'ons-toolbar'];

  if (delayElements.indexOf(name) !== -1) {
    setImmediate(callback);
  } else {
    callback();
  }
});

