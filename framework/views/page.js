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

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('PageView', function($onsen, $parse) {

    var PageView = Class.extend({
      _registeredToolbarElement : false,
      _registeredBottomToolbarElement : false,

      _nullElement : window.document.createElement('div'),

      _toolbarElement : null,
      _bottomToolbarElement : null,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._registeredToolbarElement = false;
        this._registeredBottomToolbarElement = false;

        this._nullElement = window.document.createElement('div');

        this._toolbarElement = angular.element(this._nullElement);
        this._bottomToolbarElement = angular.element(this._nullElement);

        this._clearListener = scope.$on('$destroy', this._destroy.bind(this));
        this._userDeviceBackButtonListener = angular.noop;

        if (this._attrs.ngDeviceBackbutton || this._attrs.onDeviceBackbutton) {
          this._deviceBackButtonHandler = ons._deviceBackButtonHandler.createHandler(this._element[0], this._onDeviceBackButton.bind(this));
        }
      },

      _onDeviceBackButton: function($event) {
        this._userDeviceBackButtonListener($event);

        // ng-device-backbutton
        if (this._attrs.ngDeviceBackbutton) {
          $parse(this._attrs.ngDeviceBackbutton)(this._scope, {$event: $event});
        }

        // on-device-backbutton
        /* jshint ignore:start */
        if (this._attrs.onDeviceBackbutton) {
          var lastEvent = window.$event;
          window.$event = $event;
          new Function(this._attrs.onDeviceBackbutton)();
          window.$event = lastEvent;
        }
        /* jshint ignore:end */
      },

      /**
       * @param {Function} callback
       */
      setDeviceBackButtonHandler: function(callback) {
        if (!this._deviceBackButtonHandler) {
          this._deviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(this._element[0], this._onDeviceBackButton.bind(this));
        }

        this._userDeviceBackButtonListener = callback;
      },

      /**
       * @return {Object/null}
       */
      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler || null;
      },

      /**
       * Register toolbar element to this page.
       *
       * @param {jqLite} element
       */
      registerToolbar: function(element) {
        if (this._registeredToolbarElement) {
          throw new Error('This page\'s toolbar is already registered.');
        }

        angular.element(this.getContentElement()).attr('no-status-bar-fill', '');

        element.remove();
        var statusFill = this._element[0].querySelector('.page__status-bar-fill');
        if (statusFill) {
          angular.element(statusFill).after(element);
        } else {
          this._element.prepend(element);
        }

        this._toolbarElement = element;
        this._registeredToolbarElement = true;
      },

      /**
       * Register toolbar element to this page.
       *
       * @param {jqLite} element
       */
      registerBottomToolbar: function(element) {
        if (this._registeredBottomToolbarElement) {
          throw new Error('This page\'s bottom-toolbar is already registered.');
        }

        element.remove();

        this._bottomToolbarElement = element;
        this._registeredBottomToolbarElement = true;

        var fill = angular.element(document.createElement('div'));
        fill.addClass('page__bottom-bar-fill');
        fill.css({width: '0px', height: '0px'});

        this._element.prepend(fill);
        this._element.append(element);
      },

      /**
       * @param {jqLite} element
       */
      registerExtraElement: function(element) {
        if (!this._extraElement) {
          this._extraElement = angular.element('<div></div>');
          this._extraElement.addClass('page__extra');
          this._extraElement.css({
            'z-index': '10001'
          });
          this._element.append(this._extraElement);
        }
        this._extraElement.append(element.remove());
      },

      /**
       * @return {Boolean}
       */
      hasToolbarElement : function() {
        return !!this._registeredToolbarElement;
      },

      /**
       * @return {Boolean}
       */
      hasBottomToolbarElement : function() {
        return !!this._registeredBottomToolbarElement;
      },

      /**
       * @return {HTMLElement}
       */
      getContentElement : function() {
        for (var i = 0; i < this._element.length; i++) {
          if (this._element[i].querySelector) {
            var content = this._element[i].querySelector('.page__content');
            if (content) {
              return content;
            }
          }
        }
        throw Error('fail to get ".page__content" element.');
      },

      /**
       * @return {HTMLElement}
       */
      getBackgroundElement : function() {
        for (var i = 0; i < this._element.length; i++) {
          if (this._element[i].querySelector) {
            var content = this._element[i].querySelector('.page__background');
            if (content) {
              return content;
            }
          }
        }
        throw Error('fail to get ".page__background" element.');
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarElement : function() {
        return this._toolbarElement[0] || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getBottomToolbarElement : function() {
        return this._bottomToolbarElement[0] || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarLeftItemsElement : function() {
        return this._toolbarElement[0].querySelector('.left') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarCenterItemsElement : function() {
        return this._toolbarElement[0].querySelector('.center') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarRightItemsElement : function() {
        return this._toolbarElement[0].querySelector('.right') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarBackButtonLabelElement : function() {
        return this._toolbarElement[0].querySelector('ons-back-button .back-button__label') || this._nullElement;
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        if (this._deviceBackButtonHandler) {
          this._deviceBackButtonHandler.destroy();
          this._deviceBackButtonHandler = null;
        }

        this._element = null;
        this._toolbarElement = null;
        this._nullElement = null;
        this._bottomToolbarElement = null;
        this._extraElement = null;
        this._scope = null;

        this._clearListener();
      }
    });
    MicroEvent.mixin(PageView);

    return PageView;
  });
})();

