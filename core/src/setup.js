import './ons/platform'; // This file must be loaded before Custom Elements polyfills.
import './polyfills/index.js';
import './vendor/index.js';
import './ons/microevent.js';

export default function setup(ons) {
  if (window.ons) {
    ons._util.warn('Onsen UI is loaded more than once.');
  }

  // fastclick
  window.addEventListener('load', () => {
    ons.fastClick = FastClick.attach(document.body);

    const supportTouchAction = 'touch-action' in document.body.style;

    ons.platform._runOnActualPlatform(() => {
      if (ons.platform.isAndroid()) {
        // In Android4.4+, correct viewport settings can remove click delay.
        // So disable FastClick on Android.
        ons.fastClick.destroy();
      } else if (ons.platform.isIOS()) {
        if (supportTouchAction && (ons.platform.isIOSSafari() || ons.platform.isWKWebView())) {
          // If 'touch-action' supported in iOS Safari or WKWebView, disable FastClick.
          ons.fastClick.destroy();
        } else {
          // Do nothing. 'touch-action: manipulation' has no effect on UIWebView.
        }
      }
    });
  }, false);

  ons.ready(function() {
    // ons._defaultDeviceBackButtonHandler
    ons._deviceBackButtonDispatcher.enable();
    ons._defaultDeviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(window.document.body, () => {
      if (Object.hasOwnProperty.call(navigator, 'app')) {
        navigator.app.exitApp();
      } else {
        console.warn('Could not close the app. Is \'cordova.js\' included?\nError: \'window.navigator.app\' is undefined.');
      }
    });
    document.body._gestureDetector = new ons.GestureDetector(document.body);

    // Simulate Device Back Button on ESC press
    if (!ons.platform.isWebView()) {
      document.body.addEventListener('keydown', function(event) {
        if (event.keyCode === 27) {
          ons._deviceBackButtonDispatcher.fireDeviceBackButtonEvent();
        }
      })
    }

    // setup loading placeholder
    ons._setupLoadingPlaceHolders();
  });

  // viewport.js
  Viewport.setup();
}
