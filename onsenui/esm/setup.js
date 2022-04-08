import './ons/platform.js'; // This file must be loaded before Custom Elements polyfills.
import './polyfills/index.js';
import './vendor/index.js';
import './ons/microevent.js';
import internal from './ons/internal/index.js';

export default function setup(ons) {
  internal.waitDOMContentLoaded(function() {
    register('script[type="text/template"]');
    register('script[type="text/ng-template"]');
    register('template');

    function register(query) {
      const templates = window.document.querySelectorAll(query);
      for (let i = 0; i < templates.length; i++) {
        internal.templateStore.set(templates[i].getAttribute('id'), templates[i].textContent || templates[i].content);
      }
    }
  });

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
      });
    }

    // setup loading placeholder
    ons._setupLoadingPlaceHolders();
  });

  // viewport.js
  Viewport.setup();
}
