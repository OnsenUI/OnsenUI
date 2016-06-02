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
import {fade, union, translate, reverse} from 'ons/animations';

const dialogAnimator = ({defaults, show}) => {
  show = {
    _mask: fade.in,
    _dialog: {animation: union(fade.in, show), restore: true, callback: true}
  };
  return {defaults, show, hide: reverse(show)};
};

const AndroidDialogAnimator = dialogAnimator({
  defaults: {timing: 'ease-in-out', duration: 0.3},
  show: translate({from: '-50%, -60%', to: '-50%, -50%'})
});

const IOSDialogAnimator = dialogAnimator({
  defaults: {timing: 'ease-in-out', duration: 0.3},
  show: translate({from: '-50%, 300%', to: '-50%, -50%'})
});

const SlideDialogAnimator = dialogAnimator({
  defaults: {timing: 'cubic-bezier(.1, .7, .4, 1)'},
  show: translate({from: '-50%, -350%', to: '-50%, -50%'})
});

export default new AnimatorFactory({
  animators: {
    'default': 'fade',
    'fade-ios': IOSDialogAnimator,
    'fade-md': AndroidDialogAnimator,
    'slide': SlideDialogAnimator
  },
  methods: ['show', 'hide']
});

