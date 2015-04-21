(ons => {

  // fastclick
  window.addEventListener('load', () => FastClick.attach(document.body), false);

  // viewport.js
  new Viewport().setup();

  // modernize
  Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
    Modernizr.addTest(
      'overflowtouch',
      window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
  });


  // BaseElement
  if (typeof HTMLElement !== 'function') {
    ons._BaseElement = () => {};
    ons._BaseElement.prototype = document.createElement('div');
  } else {
    ons._BaseElement = HTMLElement;
  }

})(window.ons = window.ons || {});
