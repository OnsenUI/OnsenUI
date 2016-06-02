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
import AnimatorFactory from 'ons/internal/animator-factory';
import {union, fade, translate, scale, reverse} from 'ons/animations';


/**
 * Android style animator for alert dialog.
 */
const AndroidAlertDialogAnimator = {
  show: {
    _mask: fade.in,
    _dialog: {
      animation: union(fade.in, translate('-50%'), scale({from: 0.9})),
      restore: true,
      callback: true
    }
  }
}
AndroidAlertDialogAnimator.hide = reverse(AndroidAlertDialogAnimator.show);

/**
 * iOS style animator for alert dialog.
 */
const IOSAlertDialogAnimator = {
  show: {
    _mask: fade.in,
    _dialog: {
      animation: union(fade.in, translate('-50%'), scale({from: 1.3})),
      restore: true,
      callback: true
    }
  },

  hide: {
    _mask: fade.out,
    _dialog: {animation: fade.out, restore: true, callback: true}
  }
}

export default new AnimatorFactory({
  defaults: {timing: 'cubic-bezier(.1, .7, .4, 1)'},
  animators: {
    'default': 'fade',
    'fade-md': AndroidAlertDialogAnimator,
    'fade-ios': IOSAlertDialogAnimator
  },
  methods: ['show', 'hide']
});
