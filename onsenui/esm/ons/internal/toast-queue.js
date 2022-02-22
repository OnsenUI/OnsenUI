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

class ToastQueue {
  constructor() {
    this.queue = [];
  }

  add(fn, promise) {
    this.queue.push(fn);

    if (this.queue.length === 1) {
      setImmediate(this.queue[0]);
    }

    promise.then(() => {
      this.queue.shift();

      if (this.queue.length > 0) {
        setTimeout(this.queue[0], 1000/30); // Apply some visual delay
      }
    });
  }
}

export default new ToastQueue();
