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

export default class SplitterAnimator {
  constructor(options = {}) {
    options = util.extend({
      timing: 'linear',
      duration: '0.3',
      delay: '0'
    }, options || {});

    this._timing = options.timing;
    this._duration = options.duration;
    this._delay = options.delay;
  }
  layoutOnOpen() {}
  layoutOnClose() {}
  translate(distance) {}
  open(done) {
    done();
  }
  close(done) {
    done();
  }
  activate(contentElement, sideElement, maskElement) {}
  inactivate() {}
  isActivated() {
    throw new Error();
  }
}

