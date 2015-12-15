/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import deviceBackButtonDispatcher from './device-back-button-dispatcher';

const ons = {};

ons._readyLock = new DoorLock();
ons._config = {
  autoStatusBarFill: true,
  animationsDisabled: false
};

waitDeviceReady();

/**
 * @return {Boolean}
 */
ons.isReady = () => {
  return !ons._readyLock.isLocked();
};

/**
 * @return {Boolean}
 */
ons.isWebView = () => {
  if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
    throw new Error('isWebView() method is available after dom contents loaded.');
  }

  return !!(window.cordova || window.phonegap || window.PhoneGap);
};

/**
 * @param {Function} callback
 */
ons.ready = callback => {
  if (ons.isReady()) {
    callback();
  } else {
    ons._readyLock.waitUnlock(callback);
  }
};

/**
 * @param {Function} listener
 */
ons.setDefaultDeviceBackButtonListener = function(listener) {
  ons._defaultDeviceBackButtonHandler.setListener(listener);
};

/**
 * Disable this framework to handle cordova "backbutton" event.
 */
ons.disableDeviceBackButtonHandler = function() {
  deviceBackButtonDispatcher.disable();
};

/**
 * Enable this framework to handle cordova "backbutton" event.
 */
ons.enableDeviceBackButtonHandler = function() {
  ons._deviceBackButtonDispatcher.enable();
};


/**
 * Enable status bar fill feature on iOS7 and above.
 */
ons.enableAutoStatusBarFill = () => {
  if (ons.isReady()) {
    throw new Error('This method must be called before ons.isReady() is true.');
  }
  ons._config.autoStatusBarFill = true;
};

/**
 * Disable status bar fill feature on iOS7 and above.
 */
ons.disableAutoStatusBarFill = () => {
  if (ons.isReady()) {
    throw new Error('This method must be called before ons.isReady() is true.');
  }
  ons._config.autoStatusBarFill = false;
};

/**
 * Disable all animations. Could be handy for testing and older devices.
 */
ons.disableAnimations = () => {
  ons._config.animationsDisabled = true;
};

/**
 * Enable animations (default).
 */
ons.enableAnimations = () => {
  ons._config.animationsDisabled = false;
};

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons._createPopoverOriginal = function(page, options = {}) {

  if (!page) {
    throw new Error('Page url must be defined.');
  }

  return ons._internal.getPageHTMLAsync(page).then(html => {
    html = html.match(/<ons-popover/gi) ? `<div>${html}</div>` : `<ons-popover>${html}</ons-popover>`;
    const div = ons._util.createElement('<div>' + html + '</div>');

    const popover = div.querySelector('ons-popover');
    CustomElements.upgrade(popover);
    document.body.appendChild(popover);

    if (options.link instanceof Function) {
      options.link(popover);
    }

    return popover;
  });
};

/**
 * @param {String} page
 * @param {Object} [options]
 * @return {Promise}
 */
ons.createPopover = ons._createPopoverOriginal;

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons._createDialogOriginal = function(page, options = {}) {

  if (!page) {
    throw new Error('Page url must be defined.');
  }

  return ons._internal.getPageHTMLAsync(page).then(html => {
    html = html.match(/<ons-dialog/gi) ? `<div>${html}</div>` : `<ons-dialog>${html}</ons-dialog>`;
    const div = ons._util.createElement('<div>' + html + '</div>');

    const dialog = div.querySelector('ons-dialog');
    CustomElements.upgrade(dialog);
    document.body.appendChild(dialog);

    if (options.link instanceof Function) {
      options.link(dialog);
    }

    return dialog;
  });
};

/**
 * @param {String} page
 * @param {Object} [options]
 * @return {Promise}
 */
ons.createDialog = ons._createDialogOriginal;

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons._createAlertDialogOriginal = function(page, options = {}) {

  if (!page) {
    throw new Error('Page url must be defined.');
  }

  return ons._internal.getPageHTMLAsync(page).then(html => {
    html = html.match(/<ons-alert-dialog/gi) ? `<div>${html}</div>` : `<ons-alert-dialog>${html}</ons-alert-dialog>`;
    const div = ons._util.createElement('<div>' + html + '</div>');

    const alertDialog = div.querySelector('ons-alert-dialog');
    CustomElements.upgrade(alertDialog);
    document.body.appendChild(alertDialog);

    if (options.link instanceof Function) {
      options.link(alertDialog);
    }

    return alertDialog;
  });
};

/**
 * @param {String} page
 * @param {Object} [options]
 * @param {Function} [options.link]
 * @return {Promise}
 */
ons.createAlertDialog = ons._createAlertDialogOriginal;

/**
 * @param {String} page
 * @param {Function} link
 */
ons._resolveLoadingPlaceholderOriginal = function(page, link) {
  const elements = ons._util.arrayFrom(window.document.querySelectorAll('[ons-loading-placeholder]'));

  if (elements.length > 0) {
    elements
      .filter(element => !element.getAttribute('page'))
      .forEach(element => {
        element.setAttribute('ons-loading-placeholder', page);
        ons._resolveLoadingPlaceholder(element, page, link);
      });
  } else {
    throw new Error('No ons-loading-placeholder exists.');
  }
};

/**
 * @param {String} page
 */
ons.resolveLoadingPlaceholder = ons._resolveLoadingPlaceholderOriginal;

ons._setupLoadingPlaceHolders = function() {
  ons.ready(() => {
    const elements = ons._util.arrayFrom(window.document.querySelectorAll('[ons-loading-placeholder]'));

    elements.forEach(element => {
      const page = element.getAttribute('ons-loading-placeholder');
      if (typeof page === 'string') {
        ons._resolveLoadingPlaceholder(element, page);
      }
    });
  });
};

ons._resolveLoadingPlaceholder = function(element, page, link) {
  link = link || function(element, done) { done(); };
  ons._internal.getPageHTMLAsync(page).then(html => {

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    const contentElement = ons._util.createElement('<div>' + html + '</div>');
    contentElement.style.display = 'none';

    element.appendChild(contentElement);

    link(contentElement, function() {
      contentElement.style.display = '';
    });

  }).catch(error => {
    throw new Error('Unabled to resolve placeholder: ' + error);
  });
};

function waitDeviceReady() {
  const unlockDeviceReady = ons._readyLock.lock();
  window.addEventListener('DOMContentLoaded', () => {
    if (ons.isWebView()) {
      window.document.addEventListener('deviceready', unlockDeviceReady, false);
    } else {
      unlockDeviceReady();
    }
  }, false);
}

export default ons;
