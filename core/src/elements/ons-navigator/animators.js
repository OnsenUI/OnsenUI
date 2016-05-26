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
import platform from 'ons/platform';
import AnimatorFactory from 'ons/internal/animator-factory';
import IOSSlideNavigatorTransitionAnimator from './ios-slide-animator';

import util from 'ons/util';
import {union, translate, animate, fade ,acceleration} from 'ons/animations';

const maskedAnimator = obj => util.extend({}, obj, {
  maskedAnimation: function (before, obj, {enterPage, leavePage, callback}) {
    const mask = util.createElement(`<div style="background: ${this.maskBackground || 'black'}; position: absolute; width: 100%; height: 100%; opacity: 0; z-index: 2;"></div>`);
    before.parentNode.insertBefore(mask, before);

    this.animate({enterPage, leavePage, mask}, util.extend({}, obj, {
      mask: util.extend({callback, after: () => mask.remove()}, obj.mask)
    }));
  },
  push: function (options) {
    this.maskedAnimation(options.enterPage, obj.push, options);
  },
  pop: function (options) {
    this.maskedAnimation(options.leavePage, obj.pop, options);
  }
});


const IOSLiftNavigatorTransitionAnimator = maskedAnimator({
  maskBackground: 'linear-gradient(black, white)',
  defaults: {timing: 'cubic-bezier(.1, .7, .1, 1)'},
  push: {
    mask: animate({opacity: [0, 0.1]}),
    enterPage: {restore: true, animation: translate({from: '0, 100%'})},
    leavePage: translate({to: '0, -10%'})
  },
  pop: {
    mask: animate({opacity: [0.1, 0]}),
    enterPage: translate({from: '0, -10%'}),
    leavePage: translate({to: '0, 100%'})
  }
});

const MDLiftNavigatorTransitionAnimator = maskedAnimator({
  defaults: {timing: 'cubic-bezier(.1, .7, .1, 1)', delay: 0.05},
  push: {
    mask: {delay: 0, animation: animate({opacity: [0, 0.6]})},
    enterPage: {restore: true, animation: translate({from: '0, 100%'})}
  },
  pop: {
    mask: animate({opacity: [0.6, 0]}),
    leavePage: translate({to: '0, 100%'})
  }
});

const MDSlideNavigatorTransitionAnimator = maskedAnimator({
  defaults: {timing: 'cubic-bezier(.1, .7, .1, 1)', duration: 0.3},
  push: {
    mask: union(acceleration, animate({opacity: [0, 0.4]})),
    enterPage: {restore: true, animation: translate({from: '100%, 0'})},
    leavePage: {restore: true, animation: translate({to: '-45%, 0'})}
  },
  pop: {
    mask: union(acceleration, animate({opacity: [0.4, 0]})),
    enterPage: {
      restore: true,
      animation: union(translate({from: '-45%, 0'}), animate({opacity: [0.9, 1]})),
    },
    leavePage: translate({to: '100%, 0'})
  }
});

const MDFadeNavigatorTransitionAnimator = {
  defaults: {timing: 'ease-out', duration: 0.25, delay: 0.2},
  push: {
    enterPage: {
      animation: union(translate({from: '0, 42px'}), fade.in),
      restore: true,
      callback: true
    }
  },
  pop: function({enterPage, leavePage, callback}) {
    this.animate({move: leavePage, fade: leavePage}, {
      move: {delay: 0.15, animation: translate({to: '0, 38px'}), callback},
      fade: {delay: 0.04, animation: fade.out}
    });
  }
}

const IOSFadeNavigatorTransitionAnimator = {
  elements: page => [page._content, page._background, page._toolbar],
  push: function ({enterPage, callback}) {
    this.animate(this.elements(enterPage), {
      animation: union(fade.in, acceleration), restore: true, callback
    });
  },
  pop: function ({leavePage, callback}) {
    this.animate(this.elements(leavePage), {
      animation: union(fade.out, acceleration), callback
    });
  }
};

export default new AnimatorFactory({
  defaults: {duration: 0.4},
  animators: {
    'default': () => platform.isAndroid() ? MDFadeNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
    'slide-ios': IOSSlideNavigatorTransitionAnimator,
    'slide-md': MDSlideNavigatorTransitionAnimator,
    'lift-ios': IOSLiftNavigatorTransitionAnimator,
    'lift-md': MDLiftNavigatorTransitionAnimator,
    'fade-ios': IOSFadeNavigatorTransitionAnimator,
    'fade-md': MDFadeNavigatorTransitionAnimator,
  },
  methods: ['push', 'pop']
});

