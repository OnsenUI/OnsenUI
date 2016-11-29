// Code to be executed before the tests

window.browser = null; // supposed to be overridden

window.onlyChrome = (_) => {
  switch (_) {
    case it:
      return (window.browser === 'local_chrome') ? it : xit;
    case describe:
      return (window.browser === 'local_chrome') ? describe : xdescribe;
    default:
      throw new Error('argument must be `it` or `describe`.');
  }
};

ons.disableAnimations();
