/*
Copyright 2013-2014 ASIAL CORPORATION

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

        this._mask.on('click', this._cancel.bind(this));

        this._element.css({
          display: "none",
        });

        this._visible = false;
        this._doorLock = new DoorLock();

        this._animation = PopoverView._animatorDict[typeof attrs.animation !== 'undefined' ? 
          attrs.animation : 'default'];

        if (!this._animation) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        window.addEventListener('resize', function() {
          if (this._currentTarget) {
            this._positionPopover(this._currentTarget);
          }
        }.bind(this));

        this._setDirection(attrs.direction || "up");
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
          offset = 20;

        this._setDirection(direction);
 
        if (direction == 'left') {
          el.css('left', (pos.right - pos.width - own.width - offset) + 'px');
          el.css('top', (pos.bottom - pos.height/2 - own.height/2) + 'px');
        } else if (direction == 'right') {
          el.css('left', (pos.right + offset) + 'px');
          el.css('top', (pos.bottom - pos.height/2 - own.height/2) + 'px');
        } else if (direction == 'up') {
          el.css('top', (pos.bottom - pos.height - own.height - offset) + 'px');
          el.css('left', (pos.right - pos.width/2 - own.width/2) + 'px');
        } else {
          el.css('top', (pos.bottom + offset) + 'px');
          el.css('left', (pos.right - pos.width/2 - own.width/2) + 'px');
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

        var scores = {
          left: position.left,
          right: window.innerWidth - position.right,
          up: position.top,
          down: window.innerHeight - position.bottom
        };

        var orderedDirections = Object.keys(scores).sort(function(a, b) {return -(scores[a] - scores[b])}); 
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
       * @param {Object} [options] options
       * @param {String} [options.animation] animation type
       */
      show: function(target, options) {
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
              animation = PopoverView._animatorDict[options.animation];
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
              animation = PopoverView._animatorDict[options.animation];
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
        this._element.remove();
        this._deviceBackButtonHandler.destroy();

        this._scope.destroy();

        this._deviceBackButtonHandler = this._element = this._scope = null;
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
      'fade': new FadePopoverAnimator(),
      'none': new PopoverAnimator()
    };

    /**
     * @param {String} name
     * @param {PopoverAnimator} animator
     */
    PopoverView.registerAnimator = function(name, animator) {
      if (!(animator instanceof DialogAnimator)) {
        throw new Error('"animator" param must be an instance of DialogAnimator');
      }
      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(PopoverView);

    return PopoverView;
  });
})();
