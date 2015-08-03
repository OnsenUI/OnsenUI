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

((ons) => {
  'use strict';

  class RippleEffect {

    static onClick(e) {
      let el = e.target;

      if (!el.hasAttribute('material')) {
        el = el.parentNode;
      }

      let onMouseUp = (e) => {
        let ripple = el.querySelector('.ripple');
        if(ripple !== null) {
          setTimeout(function() {
            ripple.classList.remove('animate');
            ripple.classList.add('done');
          }, 300);
        }
        RippleEffect.removeMultiListener(document, 'mouseup', onMouseUp);
      };

      RippleEffect.addMultiListener(document, 'mouseup', onMouseUp);

      let ripple = el.querySelector('.ripple');
      let eventType = e.type;

      if(ripple !== null) {
        let size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
      } else {
        throw new Error('Ripple effect span not found');
      }

      ripple.classList.remove('done');
      ripple.classList.remove('animate');

      let x = e.clientX;
      let y = e.clientY;
      if(eventType == 'touchstart') {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
      }

      let pos = el.getBoundingClientRect();

      x = x - pos.left - ripple.offsetWidth / 2;
      y = y - pos.top - ripple.offsetHeight / 2;

      ripple.style.top = y + 'px';
      ripple.style.left = x + 'px';
      ripple.classList.add('animate');
    }

    static onMouseUp(e) {
      let el = e.target;
      if (!el.hasAttribute('material')) {
        el = el.parentNode;
      }

      let ripple = el.querySelector('.ripple');

      if(ripple !== null) {
        setTimeout(function() {
          ripple.classList.remove('animate');
          ripple.classList.add('done');
        }, 100);
      }
    }

    static addRippleEffect(el) {
      if(el.querySelector('.ripple') === null) {
        var ripple = document.createElement('span');
        ripple.classList.add('ripple');
        el.insertBefore(ripple, el.firstChild);
      }
      this.addMultiListener(el, 'mousedown touchstart', this.onClick);
    }

    static removeRippleEffect(el) {
      this.removeMultiListener(el, 'mousedown touchstart', this.onClick);
    }

    static addMultiListener(el, events, callback) {
      var e = events.split(' ');
      Array.prototype.forEach.call(e, function(event, i) {
        el.addEventListener(event, callback, false);
      });
    }

    static removeMultiListener(el, events, callback) {
      var e = events.split(' ');
      Array.prototype.forEach.call(e, function(event, i) {
        el.removeEventListener(event, callback, false);
      });
    }

  }

  ons._internal.RippleEffect = RippleEffect;

})(window.ons = window.ons || {});
