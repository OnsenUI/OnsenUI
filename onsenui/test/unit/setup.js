// Code to be executed before the tests

window.browser = null; // supposed to be overridden

window.onlyChrome = (_) => {
  const isChrome = window.browser === 'local_chrome' || window.browser === 'local_chrome_headless';

  switch (_) {
    case it:
      return isChrome ? it : xit;
    case describe:
      return isChrome ? describe : xdescribe;
    default:
      throw new Error('argument must be `it` or `describe`.');
  }
};

ons.disableAnimations();
