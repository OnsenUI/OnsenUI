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
import util from 'ons/util';
import BaseAnimator from 'ons/base-animator';
import {union, fade, translate, scale} from 'ons/animations';

export class AlertDialogAnimator extends BaseAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .4, 1)'}, options));
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */
  show(dialog, done) {
    done();
  }

  /**
   * @param {HTMLElement} dialog
   * @param {Function} done
   */
  hide(dialog, done) {
    done();
  }
}

/**
 * Android style animator for alert dialog.
 */
export class AndroidAlertDialogAnimator extends AlertDialogAnimator {
  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  show(dialog, callback) {
    this._animateAll(dialog, {
      _mask: fade.in,
      _dialog: {
        animation: union(fade.in, translate('-50%'), scale({from: 0.9})),
        restore: true,
        callback: callback
      }
    });
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  hide(dialog, callback) {
    this._animateAll(dialog, {
      _mask: fade.out,
      _dialog: {
        animation: union(fade.out, translate('-50%'), scale({to: 0.9})),
        restore: true,
        callback: callback
      }
    });
  }
}

/**
 * iOS style animator for alert dialog.
 */
export class IOSAlertDialogAnimator extends AlertDialogAnimator {
  /*
   * @param {Object} dialog
   * @param {Function} callback
   */
  show(dialog, callback) {
    this._animateAll(dialog, {
      _mask: fade.in,
      _dialog: {
        animation: union(fade.in, translate('-50%'), scale({from: 1.3})),
        restore: true,
        callback: callback
      }
    });
  }

  /**
   * @param {Object} dialog
   * @param {Function} callback
   */
  hide(dialog, callback) {
    this._animateAll(dialog, {
      _mask: fade.out,
      _dialog: {animation: fade.out, restore: true, callback}
    });
  }
}
