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
import NavigatorTransitionAnimator from './animator';
import IOSSlideNavigatorTransitionAnimator from './ios-slide-animator';
import IOSLiftNavigatorTransitionAnimator from './ios-lift-animator';
import IOSFadeNavigatorTransitionAnimator from './ios-fade-animator';
import MDSlideNavigatorTransitionAnimator from './md-slide-animator';
import MDLiftNavigatorTransitionAnimator from './md-lift-animator';
import MDFadeNavigatorTransitionAnimator from './md-fade-animator';

export default new AnimatorFactory({
  base: NavigatorTransitionAnimator,
  animators: {
    'default': () => platform.isAndroid() ? MDFadeNavigatorTransitionAnimator : IOSSlideNavigatorTransitionAnimator,
    'slide-ios': IOSSlideNavigatorTransitionAnimator,
    'slide-md': MDSlideNavigatorTransitionAnimator,
    'lift-ios': IOSLiftNavigatorTransitionAnimator,
    'lift-md': MDLiftNavigatorTransitionAnimator,
    'fade-ios': IOSFadeNavigatorTransitionAnimator,
    'fade-md': MDFadeNavigatorTransitionAnimator,
    'none': NavigatorTransitionAnimator
  },
  methods: ['push', 'pop']
});

