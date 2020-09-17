import './ons/platform'; // This file must be loaded before Custom Elements polyfills.
import './polyfills/index.js';
import './vendor/index.js';
import './ons/microevent.js';

export default function setup(ons) {
  if (window._onsLoaded) {
    ons._util.warn('Onsen UI is loaded more than once.');
  }
  window._onsLoaded = true;

  ons.ready(function() {
    ons.enableDeviceBackButtonHandler();
    ons._defaultDeviceBackButtonHandler = ons._internal.dbbDispatcher.createHandler(window.document.body, () => {
      if (Object.hasOwnProperty.call(navigator, 'app')) {
        navigator.app.exitApp();
      } else {
        console.warn('Could not close the app. Is \'cordova.js\' included?\nError: \'window.navigator.app\' is undefined.');
      }
    });
    document.body._gestureDetector = new ons.GestureDetector(document.body, { passive: true });

    // Simulate Device Back Button on ESC press
    if (!ons.platform.isWebView()) {
      document.body.addEventListener('keydown', function(event) {
        if (event.keyCode === 27) {
          ons.fireDeviceBackButtonEvent();
        }
      })
    }

    // setup loading placeholder
    ons._setupLoadingPlaceHolders();
  });

  // viewport.js
  Viewport.setup();
}
