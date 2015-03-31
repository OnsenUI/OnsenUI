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

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('PopoverView', function($onsen, PopoverAnimator, FadePopoverAnimator) {

    var PopoverView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;

        this._mask = angular.element(this._element[0].querySelector('.popover-mask'));
        this._popover = angular.element(this._element[0].querySelector('.popover'));

        this._mask.css('z-index', 20000);
        this._popover.css('z-index', 20001);
        this._element.css('display', 'none');

        if (attrs.maskColor) {
          this._mask.css('background-color', attrs.maskColor);
        }

        this._mask.on('click', this._cancel.bind(this));

        this._visible = false;
        this._doorLock = new DoorLock();

        var Animator = PopoverView._animatorDict[typeof attrs.animation !== 'undefined' ?
          attrs.animation : 'fade'];

        if (!Animator) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._animation = new Animator();

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        this._onChange = function() {
          setImmediate(function() {
            if (this._currentTarget) {
              this._positionPopover(this._currentTarget);
            }
          }.bind(this));
        }.bind(this);

        this._popover[0].addEventListener('DOMNodeInserted', this._onChange, false);
        this._popover[0].addEventListener('DOMNodeRemoved', this._onChange, false);
        window.addEventListener('resize', this._onChange, false);
      },

      _onDeviceBackButton: function(event) {
        if (this.isCancelable()) {
          this._cancel.bind(this)();
        } else {
          event.callParentHandler();
        }
      },

      _setDirection: function(direction) {
        if (direction === 'up') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'bottom';
        } else if (direction === 'left') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'right';
        } else if (direction === 'down') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'top';
        } else if (direction == 'right') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'left';
        } else {
          throw new Error('Invalid direction.');
        }

        if (!this._scope.$$phase) {
          this._scope.$apply();
        }
      },

      _positionPopoverByDirection: function(target, direction) {
        var el = angular.element(this._element[0].querySelector('.popover')),
          pos = target.getBoundingClientRect(),
          own = el[0].getBoundingClientRect(),
          arrow = angular.element(el.children()[1]),
          offset = 14,
          margin = 6,
          radius = parseInt(window.getComputedStyle(el[0].querySelector('.popover__content')).borderRadius);

        arrow.css({
          top: '',
          left: ''
        });

        // This is the difference between the side and the hypothenuse of the arrow.
        var diff = (function(x) {
          return (x / 2) * Math.sqrt(2) - x / 2;
        })(parseInt(window.getComputedStyle(arrow[0]).width));

        // This is the limit for the arrow. If it's moved further than this it's outside the popover.
        var limit = margin + radius + diff;

        this._setDirection(direction);

        // Position popover next to the target.
        if (['left', 'right'].indexOf(direction) > -1) {
          if (direction == 'left') {
            el.css('left', (pos.right - pos.width - own.width - offset) + 'px');
          } else {
            el.css('left', (pos.right + offset) + 'px');
          }
          el.css('top', (pos.bottom - pos.height / 2 - own.height / 2) + 'px');
        } else {
          if (direction == 'up') {
            el.css('top', (pos.bottom - pos.height - own.height - offset) + 'px');
          } else {
            el.css('top', (pos.bottom + offset) + 'px');
          }
          el.css('left', (pos.right - pos.width / 2 - own.width / 2) + 'px');
        }

        own = el[0].getBoundingClientRect();

        // Keep popover inside window and arrow inside popover.
        if (['left', 'right'].indexOf(direction) > -1) {
          if (own.top < margin) {
            arrow.css('top', Math.max(own.height / 2 + own.top - margin, limit)  + 'px');
            el.css('top', margin + 'px');
          } else if (own.bottom > window.innerHeight - margin) {
            arrow.css('top', Math.min(own.height / 2 - (window.innerHeight - own.bottom) + margin, own.height - limit) + 'px');
            el.css('top', (window.innerHeight - own.height - margin) + 'px');
          }
        } else {
        if (own.left < margin) {
            arrow.css('left', Math.max(own.width / 2 + own.left - margin, limit) + 'px');
            el.css('left', margin + 'px');
          } else if (own.right > window.innerWidth - margin) {
            arrow.css('left', Math.min(own.width / 2 - (window.innerWidth - own.right) + margin, own.width - limit) + 'px');
            el.css('left', (window.innerWidth - own.width - margin) + 'px');
          }
        }
      },

      _positionPopover: function(target) {
        var directions;
        if (!this._element.attr('direction')) {
          directions = ['up', 'down', 'left', 'right'];
        } else {
          directions = this._element.attr('direction').split(/\s+/);
        }

        var position = target.getBoundingClientRect();

        // The popover should be placed on the side with the most space.
        var scores = {
          left: position.left,
          right: window.innerWidth - position.right,
          up: position.top,
          down: window.innerHeight - position.bottom
        };

        var orderedDirections = Object.keys(scores).sort(function(a, b) {return -(scores[a] - scores[b]);});
        for (var i = 0, l = orderedDirections.length; i < l; i++) {
          var direction = orderedDirections[i];
          if (directions.indexOf(direction) > -1) {
            this._positionPopoverByDirection(target, direction);
            return;
          }
        }
      },

      /**
       * Show popover.
       *
       * @param {HTMLElement} [target] target element
       * @param {String} [target] css selector
       * @param {Event} [target] event
       * @param {Object} [options] options
       * @param {String} [options.animation] animation type
       */
      show: function(target, options) {
        if (typeof target === 'string') {
          target = document.querySelector(target);
        } else if (target instanceof Event) {
          target = target.target;
        }

        if (!target) {
         throw new Error('Target undefined');
        }

        options = options || {};

        var cancel = false;
        this.emit('preshow', {
          popover: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            this._element.css('display', 'block');

            this._currentTarget = target;
            this._positionPopover(target);

            if (options.animation) {
              animation = new PopoverView._animatorDict[options.animation]();
            }

            animation.show(this, function() {
              this._visible = true;
              this._positionPopover(target);
              unlock();
              this.emit('postshow', {popover: this});
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Hide popover.
       *
       * @param {Object} [options] options
       * @param {String} [options.animation] animation type
       */
      hide: function(options) {
        options = options || {};

        var cancel = false;
        this.emit('prehide', {
          popover: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            if (options.animation) {
              animation = new PopoverView._animatorDict[options.animation]();
            }

            animation.hide(this, function() {
              this._element.css('display', 'none');
              this._visible = false;
              unlock();
              this.emit('posthide', {popover: this});
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Returns whether the popover is visible or not.
       *
       * @return {Boolean}
       */
      isShown: function() {
        return this._visible;
      },

      /**
       * Destroy the popover and remove it from the DOM tree.
       */
      destroy: function() {
        this._scope.$destroy();

        this._mask.off();
        this._mask.remove();
        this._popover.remove();
        this._element.remove();

        this._deviceBackButtonHandler.destroy();
        this._popover[0].removeEventListener('DOMNodeInserted', this._onChange, false);
        this._popover[0].removeEventListener('DOMNodeRemoved', this._onChange, false);
        window.removeEventListener('resize', this._onChange, false);

        this._onChange = this._deviceBackButtonHandler = this._mask = this._popover = this._element = this._scope = null;
      },

      /**
       * Set whether the popover should be cancelable or not.
       *
       * @param {Boolean}
       */
      setCancelable: function(cancelable) {
        if (typeof cancelable !== 'boolean') {
          throw new Error('Argument must be a boolean.');
        }

        if (cancelable) {
          this._element.attr('cancelable', true);
        } else {
          this._element.removeAttr('cancelable');
        }
      },

      /**
       * Return whether the popover is cancelable or not.
       *
       * @return {Boolean}
       */
      isCancelable: function() {
        return this._element[0].hasAttribute('cancelable');
      },

      _cancel: function() {
        if (this.isCancelable()) {
          this.hide();
        }
      },

    });

    PopoverView._animatorDict = {
      'fade': FadePopoverAnimator,
      'none': PopoverAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    PopoverView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof PopoverAnimator)) {
        throw new Error('"Animator" param must inherit PopoverAnimator');
      }
      this._animatorDict[name] = Animator;
    };

    MicroEvent.mixin(PopoverView);

    return PopoverView;
  });
})();
