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
import {union, fade, acceleration, translate} from 'ons/animations';

const TabbarFadeAnimator = {
  switchTab: function ({newPage, oldPage, callback}) {
    this.animate({oldPage, newPage}, {
      oldPage: {animation: union(fade.out, acceleration)},
      newPage: {animation: union(fade.in, acceleration), restore: true, callback}
    });
  }
};

const TabbarSlideAnimator = {
  defaults: {timing: 'ease-in', duration: 0.15},
  switchTab: function ({newPage, oldPage, newIndex, oldIndex, callback}) {
    const signs = newIndex > oldIndex ? '- ' : ' -';

    this.animate({oldPage, newPage}, {
      oldPage: {animation: translate({to: signs[0] + '100%, 0'})},
      newPage: {animation: translate({from: signs[1] + '100%, 0'}), restore: true, callback}
    });
  }
};

export default new AnimatorFactory({
  defaults: {duration: 0.4},
  animators: {
    'default': 'none',
    'fade': TabbarFadeAnimator,
    'slide': TabbarSlideAnimator
  },
  methods: ['switchTab']
});

