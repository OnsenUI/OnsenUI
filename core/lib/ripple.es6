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

    static addRippleEffect(el) {

      this.addMultiListener(el, 'click touchstart', function(e) {
        var ripple = this.querySelector('.ripple');
        var eventType = e.type;

        if(ripple == null) {
          ripple = document.createElement('span');
          ripple.classList.add('ripple');

          this.insertBefore(ripple, this.firstChild);

          if(!ripple.offsetHeight && !ripple.offsetWidth) {
            var size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
          }
        }

        ripple.classList.remove('animate');

        if(eventType == 'click') {
          var x = e.clientX;
          var y = e.clientY;
        } else if(eventType == 'touchstart') {
          var x = e.changedTouches[0].clientX;
          var y = e.changedTouches[0].clientY;
        }

        x = x - this.offsetLeft - ripple.offsetWidth / 2;
        y = y - this.offsetTop - ripple.offsetHeight / 2;

        ripple.style.top = y - 44 + 'px';
        ripple.style.left = x + 'px';
        ripple.classList.add('animate');
      });

    }

    static addMultiListener(el, events, callback) {
      var e = events.split(' ');
      Array.prototype.forEach.call(e, function(event, i) {
        el.addEventListener(event, callback, false);
      });
    }


  }

  ons._internal.RippleEffect = RippleEffect;

})(window.ons = window.ons || {});
