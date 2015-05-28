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

  module.value('TabbarNoneAnimator', ons._internal.TabbarNoneAnimator);
  module.value('TabbarFadeAnimator', ons._internal.TabbarFadeAnimator);
  module.value('TabbarSlideAnimator', ons._internal.TabbarSlideAnimator);

  module.factory('TabbarView', function($onsen, $compile, $parse) {
    var TabbarView = Class.extend({
      _tabItems: undefined,

      init: function(scope, element, attrs) {
        if (element[0].nodeName.toLowerCase() !== 'ons-tabbar') {
          throw new Error('"element" parameter must be a "ons-tabbar" element.');
        }

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      setActiveTab: function(index, options) {
        return this._element[0].setActiveTab(index, options);
      },

      setTabbarVisibility: function(visible) {
        this._element[0].setTabbarVisibility(visible);
      },

      getActiveTabIndex: function() {
        return this._element[0].getActiveTabIndex();
      },

      loadPage: function(page, options) {
        return this._element[0]._loadPage(page, options);
      },

      _destroy: function() {
        this.emit('destroy');
        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    TabbarView.registerAnimator = function(name, Animator) {
      return window.OnsTabbarElement.registerAnimator(name, Animator);
    };

    return TabbarView;
  });

})();
