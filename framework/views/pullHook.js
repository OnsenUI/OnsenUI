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

  module.factory('PullHookView', function($onsen, $parse) {

    var PullHookView = Class.extend({

      STATE_INITIAL: 'initial',
      STATE_PREACTION: 'preaction',
      STATE_ACTION: 'action',

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scrollElement = this._createScrollElement();
        this._pageElement = this._scrollElement.parent();

        if (!this._pageElement.hasClass('page__content')) {
          throw new Error('<ons-pull-hook> must be a direct descendant of an <ons-page> element.');
        }

        this._currentTranslation = 0;

        this._createEventListeners();
        this._setState(this.STATE_INITIAL, true);
        this._setStyle();

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _createScrollElement: function() {
        var scrollElement = angular.element('<div>')
          .addClass('scroll');

        var pageElement = this._element.parent(),
          children = pageElement.children();

        pageElement.append(scrollElement);
        scrollElement.append(children);

        return scrollElement; 
      },

      _setStyle: function() {
        var h = this._getHeight();

        this._element.css({
          top: '-' + h + 'px',
          height: h + 'px',
          lineHeight: h + 'px'
        });
      },
    
      _onScroll: function(event) {
        var el = this._pageElement[0];

        if (el.scrollTop < 0) {
          el.scrollTop = 0;
        }
      },

      _generateTranslationTransform: function(scroll) {
        return 'translate3d(0px, ' + scroll + 'px, 0px)';
      },

      _onDrag: function(event) {
        if (this.isDisabled()) {
          return;
        }

        // Hack to make it work on Android 4.4 WebView. Scrolls manually near the top of the page so
        // there will be no inertial scroll when scrolling down. Allowing default scrolling will
        // kill all 'touchmove' events.
        var el = this._pageElement[0];
        el.scrollTop = this._startScroll - event.gesture.deltaY;
        if (el.scrollTop < window.innerHeight && event.gesture.direction !== 'up') {
          event.gesture.preventDefault();
        }

        if (this._currentTranslation === 0 && this._getCurrentScroll() === 0) {
          this._transitionDragLength = event.gesture.deltaY;

          var direction = event.gesture.interimDirection;
          if (direction === 'down') {
            this._transitionDragLength -= 1;
          }
          else {
            this._transitionDragLength += 1;
          }
        }

        var scroll = event.gesture.deltaY - this._startScroll;

        scroll = Math.max(scroll, 0);

        if (this._thresholdHeightEnabled() && scroll >= this._getThresholdHeight()) {
          event.gesture.stopDetect();

          setImmediate(function() {
            this._setState(this.STATE_ACTION);
            this._translateTo(this._getHeight(), {animate: true});

            this._waitForAction(this._onDone.bind(this));
          }.bind(this));
        }
        else if (scroll >= this._getHeight()) {
          this._setState(this.STATE_PREACTION);
        }
        else {
          this._setState(this.STATE_INITIAL);
        }
  
        this._translateTo(scroll);
      },

      _onDragStart: function(event) {
        if (this.isDisabled()) {
          return;
        }

        this._startScroll = this._getCurrentScroll();
      },

      _onDragEnd: function(event) {
        if (this.isDisabled()) {
          return;
        }

        if (this._currentTranslation > 0) {
          var scroll = this._currentTranslation;

          if (scroll > this._getHeight()) {
            this._setState(this.STATE_ACTION);

            this._translateTo(this._getHeight(), {animate: true});

            this._waitForAction(this._onDone.bind(this));
          }
          else {
            this._translateTo(0, {animate: true});
          }
        }
      },

      _waitForAction: function(done) {
        if (this._attrs.ngAction) {
          this._scope.$eval(this._attrs.ngAction, {$done: done});
        }
        else if (this._attrs.onAction) {
          eval(this._attrs.onAction);
        }
        else {
          done();
        }
      },

      _onDone: function(done) {
        this._translateTo(0, {animate: true});
        this._setState(this.STATE_INITIAL);
      },

      _getHeight: function() {
        return parseInt(this._element[0].getAttribute('height') || '64', 10);
      },

      setHeight: function(height) {
        this._element[0].setAttribute('height', height + 'px');

        this._setStyle();
      },

      setThresholdHeight: function(thresholdHeight) {
        this._element[0].setAttribute('threshold-height', thresholdHeight + 'px');
      },

      _getThresholdHeight: function() {
        return parseInt(this._element[0].getAttribute('threshold-height') || '96', 10);
      },

      _thresholdHeightEnabled: function() {
        var th = this._getThresholdHeight();
        return th > 0 && th >= this._getHeight();
      },

      _setState: function(state, noEvent) {
        var oldState = this._getState();

        this._scope.$evalAsync(function() {
          this._element[0].setAttribute('state', state);
        }.bind(this));

        if (!noEvent && oldState !== this._getState()) {
          this.emit('changestate', {
            state: state,
            pullHook: this
          });
        }
      },

      _getState: function() {
        return this._element[0].getAttribute('state');
      },

      getCurrentState: function() {
        return this._getState();
      },

      _getCurrentScroll: function() {
        return this._pageElement[0].scrollTop;
      },

      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      setDisabled: function(disabled) {
        if (disabled) {
          this._element[0].setAttribute('disabled', '');
        }
        else {
          this._element[0].removeAttribute('disabled');
        }
      },

      _translateTo: function(scroll, options) {
        options = options || {};
    
        this._currentTranslation = scroll;

        if (options.animate) {
          animit(this._scrollElement[0])
            .queue({
              transform: this._generateTranslationTransform(scroll)
            }, {
              duration: 0.3,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play(options.callback);
        }
        else {
          animit(this._scrollElement[0])
            .queue({
              transform: this._generateTranslationTransform(scroll)
            })
            .play(options.callback);
        }
      },

      _getMinimumScroll: function() {
        var scrollHeight = this._scrollElement[0].getBoundingClientRect().height,
          pageHeight = this._pageElement[0].getBoundingClientRect().height;

        if (scrollHeight > pageHeight) {
          return -(scrollHeight - pageHeight);
        }
        else {
          return 0;
        }

      },

      _createEventListeners: function() {
        var element = this._scrollElement.parent();

        this._hammer = new Hammer(element[0], {
          dragMinDistance: 1,
          dragDistanceCorrection: false
        });

        // Event listeners
        this._bindedOnDrag = this._onDrag.bind(this);
        this._bindedOnDragStart = this._onDragStart.bind(this);
        this._bindedOnDragEnd = this._onDragEnd.bind(this);
        this._bindedOnScroll = this._onScroll.bind(this);
        
        // Bind listeners
        this._hammer.on('drag', this._bindedOnDrag);
        this._hammer.on('dragstart', this._bindedOnDragStart);
        this._hammer.on('dragend', this._bindedOnDragEnd);
        element.on('scroll', this._bindedOnScroll);
      },

      _destroyEventListeners: function() {
        var element = this._scrollElement[0].parentNode;

        this._hammer.off('drag', this._bindedOnDrag);
        this._hammer.off('dragstart', this._bindedOnDragStart);
        this._hammer.off('dragend', this._bindedOnDragEnd);
        element.off('scroll', this._bindedOnScroll);
      },

      _destroy: function() {
        this._destroyEventListeners();
        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);
    return PullHookView;
  });
})();
