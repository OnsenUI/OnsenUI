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
import AnimatorFactory from 'ons/internal/animator-factory';
import {fade, union, scale} from 'ons/animations';

const animation = (mask, popover = mask) => ({
  _mask: mask,
  _popover: {animation: popover, restore: true, callback: true}
});

const MDFadePopoverAnimator = {
  show: animation(fade.in),
  hide: animation(fade.out)
};

const IOSFadePopoverAnimator = {
  show: animation(fade.in, union(scale({from: 1.3}), fade.in)),
  hide: animation(fade.out)
};

export default new AnimatorFactory({
  defaults: {timing: 'cubic-bezier(.1, .7, .4, 1)'},
  animators: {
    'default': 'fade',
    'fade-ios': IOSFadePopoverAnimator,
    'fade-md': MDFadePopoverAnimator
  },
  methods: ['show', 'hide']
});
