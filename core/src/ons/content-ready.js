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

let readyMap, queueMap;

function isContentReady(element) {
  if (element.childNodes.length > 0) {
    setContentReady(element);
  }
  return readyMap.has(element);
}

function setContentReady(element) {
  readyMap.set(element, true);
}

function addCallback(element, fn) {
  if (!queueMap.has(element)) {
    queueMap.set(element, []);
  }
  queueMap.get(element).push(fn);
}

function consumeQueue(element) {
  const callbacks = queueMap.get(element, []) || [];
  queueMap.delete(element);
  callbacks.forEach(callback => callback());
}

export default function contentReady(element, fn = () => {}) {
  if (readyMap === undefined) {
    readyMap = new WeakMap();
    queueMap = new WeakMap();
  }

  addCallback(element, fn);

  if (isContentReady(element)) {
    consumeQueue(element);
    return;
  }

  const observer = new MutationObserver(changes => {
    setContentReady(element);
    consumeQueue(element);
  });
  observer.observe(element, {childList: true, characterData: true});

  // failback for elements has empty content.
  setImmediate(() => {
    setContentReady(element);
    consumeQueue(element);
  });
}
