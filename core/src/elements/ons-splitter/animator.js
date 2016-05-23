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


class SplitterAnimator extends BaseAnimator {

  constructor(options = {}) {
    super(util.extend({timing: 'cubic-bezier(.1, .7, .1, 1)', duration: 0.3}, options));
    this.side = options.element;
  }

  get mask() {
    return this.side.parentNode.mask;
  }

  get sign() {
    return this.side._side === 'right' ? '-' : '';
  }

  translate({distance}) {
    animit(this.side).queue({
      transform: `translate3d(${this.sign + distance}px, 0, 0)`
    }).play();
  }

  open({callback} = {}) {
    this._animateAll(this, {
      mask: {from: {display: 'block'}, to: {opacity: 1}, timing: 'linear'},
      side: {to: {transform: `translate3d(${this.sign}100%, 0, 0)`}, callback},
    });
  }

  close({callback} = {}) {
    this._animateAll(this, {
      mask: {to: {opacity: 0}, timing: 'linear', after: {display: 'none'}},
      side: {to: {transform: 'translate3d(0, 0, 0)'}, callback}
    });
  }
}

export default new AnimatorFactory({
  base: SplitterAnimator,
  animators: {
    'default': 'overlay',
    'overlay': SplitterAnimator
  },
  methods: ['open', 'close', 'translate']
});
