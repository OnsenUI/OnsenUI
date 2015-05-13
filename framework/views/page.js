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
      _nullElement : window.document.createElement('div'),

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

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
        this._element[0]._registerToolbar(element[0]);
      },

      /**
       * Register toolbar element to this page.
       *
       * @param {jqLite} element
       */
      registerBottomToolbar: function(element) {
        this._element[0]._registerBottomToolbar(element[0]);
      },

      /**
       * @param {jqLite} element
       */
      registerExtraElement: function(element) {
        this._element[0]._registerExtraElement(element[0]);
      },

      /**
       * @return {Boolean}
       */
      hasToolbarElement : function() {
        return !!this._element[0].querySelector('ons-toolbar');
      },

      /**
       * @return {Boolean}
       */
      hasBottomToolbarElement : function() {
        return !!this._element[0].querySelector('ons-bottom-toolbar');
      },

      /**
       * @return {HTMLElement}
       */
      getContentElement : function() {
        return this._element[0]._getContentElement();
      },

      /**
       * @return {HTMLElement}
       */
      getBackgroundElement : function() {
        return this._element[0]._getBackgroundElement();
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarElement : function() {
        return this._element[0].querySelector('ons-toolbar');
      },

      /**
       * @return {HTMLElement}
       */
      getBottomToolbarElement : function() {
        return this._element[0].querySelector('ons-bottom-toolbar') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarLeftItemsElement : function() {
        return this.getToolbarElement().querySelector('.left') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarCenterItemsElement : function() {
        return this.getToolbarElement().querySelector('.center') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarRightItemsElement : function() {
        return this.getToolbarElement().querySelector('.right') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarBackButtonLabelElement : function() {
        return this.getToolbarElement().querySelector('ons-back-button .back-button__label') || this._nullElement;
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        if (this._deviceBackButtonHandler) {
          this._deviceBackButtonHandler.destroy();
          this._deviceBackButtonHandler = null;
        }

        this._element = null;
        this._nullElement = null;
        this._scope = null;

        this._clearListener();
      }
    });
    MicroEvent.mixin(PageView);

    return PageView;
  });
})();

