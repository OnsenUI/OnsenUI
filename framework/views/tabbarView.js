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

      init: function(scope, element, attrs) {
        if (element[0].nodeName.toLowerCase() !== 'ons-tabbar') {
          throw new Error('"element" parameter must be a "ons-tabbar" element.');
        }

        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._scope.$on('$destroy', this._destroy.bind(this));

        setImmediate(function() {
          this._boundCompilePage = element[0]._compilePageHook.add(this._compilePage.bind(this));
          this._boundLinkPage = element[0]._linkPageHook.add(this._linkPage.bind(this));
        }.bind(this));

        this._clearDerivingEvents = $onsen.deriveEvents(this, element[0], ['reactive', 'postchange', 'prechange', 'init', 'show', 'hide', 'destroy']);
      },

      _compilePage: function(next, pageElement) {
        this._linkPage.link = $compile(pageElement);

        next(pageElement);
      },

      _linkPage: function(next, pageElement) {
        if (!this._linkPage.link) {
          throw new Error('Invalid state');
        }

        var pageScope = this._scope.$new();
        this._linkPage.link(pageScope);
        this._linkPage.link = null;
        pageScope.$evalAsync(function() {
          next(pageElement);
        });

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

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.animation]
       */
      _loadPage: function(page, options) {

        $onsen.getPageHTMLAsync(page).then(function(html) {
          var pageElement = angular.element(html.trim());

          this._loadPageDOM(pageElement, options);

        }.bind(this), function() {
          throw new Error('Page is not found: ' + page);
        });
      },

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} options
       * @param {String} [options.animation]
       * @param {Object} [options.animationOptions]
       */
      _switchPage: function(element, scope, options) {
        if (this._currentPageElement) {
          var oldPageElement = this._currentPageElement;
          var oldPageScope = this._currentPageScope;

          this._currentPageElement = element;
          this._currentPageScope = scope;

          this._animationChooser.newAnimator(options).apply(element, oldPageElement, options.selectedTabIndex, options.previousTabIndex, function() {
            if (options._removeElement) {
              oldPageScope.$destroy();
            }
            else {
              oldPageElement.css('display', 'none');
            }

            if (options.callback instanceof Function) {
              options.callback();
            }
          });

        } else {
          this._currentPageElement = element;
          this._currentPageScope = scope;

          if (options.callback instanceof Function) {
            options.callback();
          }
        }
      },

      /**
       * @param {jqLite} element
       * @param {Object} options
       * @param {Object} options.animation
       */
      _loadPageDOM: function(element, options) {
        options = options || {};
        var pageScope = this._scope.$new();
        var link = $compile(element);

        this._contentElement.append(element);
        var pageContent = link(pageScope);

        pageScope.$evalAsync();

        this._switchPage(pageContent, pageScope, options);
      },

      /**
       * @param {jqLite} element
       * @param {Object} options
       * @param {Object} options.animation
       */
      _loadPersistentPageDOM: function(element, options) {
        options = options || {};

        element.css('display', 'block');
        this._switchPage(element, element.scope(), options);
      },

      /**
       * @param {Object} options
       * @param {String} [options.animation]
       * @return {TabbarAnimator}
       */
      _getAnimatorOption: function(options) {
        var animationAttr = this._element.attr('animation') || 'default';

        return TabbarView._animatorDict[options.animation || animationAttr] || TabbarView._animatorDict['default'];
      },

      _destroy: function() {
        this.emit('destroy');

        element[0]._compilePageHook.remove(this._boundCompilePage);
        element[0]._linkPageHook.remove(this._boundLinkPage);

        this._clearDerivingEvents();

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
