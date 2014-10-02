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

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('TabbarAnimator', function() {

    var TabbarAnimator = Class.extend({
      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, done) {
        throw new Error('This method must be implemented.');
      }
    });

    return TabbarAnimator;
  });

  module.factory('TabbarNoneAnimator', function(TabbarAnimator) {

    var TabbarNoneAnimator = TabbarAnimator.extend({
      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, done) {
        done();
      }
    });

    return TabbarNoneAnimator;
  });

  module.factory('TabbarFadeAnimator', function(TabbarAnimator) {

    var TabbarFadeAnimator = TabbarAnimator.extend({
      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, done) {
        animit.runAll(
          animit(enterPage[0])
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            })
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            }, {
              duration: 0.4,
              timing: 'linear'
            })
            .resetStyle()
            .queue(function(callback) {
              done();
              callback();
            }),
          animit(leavePage[0])
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            })
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            }, {
              duration: 0.4,
              timing: 'linear'
            })
        );
      }
    });

    return TabbarFadeAnimator;
  });

  module.factory('TabbarView', function($onsen, $compile, TabbarAnimator, TabbarNoneAnimator, TabbarFadeAnimator) {
    var TabbarView = Class.extend({
      _tabbarId: undefined,

      _tabItems: undefined,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._tabbarId = Date.now();
        this._tabItems = [];

        this._contentElement = angular.element(element[0].querySelector('.ons-tab-bar__content'));
        this._tabbarElement = angular.element(element[0].querySelector('.ons-tab-bar__footer'));

        this._scope.$on('$destroy', this._destroy.bind(this));

        if (this._hasTopTabbar()) {
          this._prepareForTopTabbar();
        }
      },

      _prepareForTopTabbar: function() {
        this._contentElement.attr('no-status-bar-fill', '');

        setImmediate(function() {
          this._contentElement.addClass('tab-bar--top__content');
          this._tabbarElement.addClass('tab-bar--top');
        }.bind(this));

        var page = ons.findParentComponentUntil('ons-page', this._element[0]);
        if (page) {
          this._element.css('top', window.getComputedStyle(page.getContentElement(), null).getPropertyValue('padding-top'));
        }

        if ($onsen.shouldFillStatusBar(this._element[0])) {
          // Adjustments for IOS7
          var fill = angular.element(document.createElement('div'));
          fill.addClass('tab-bar__status-bar-fill');
          fill.css({width: '0px', height: '0px'});

          this._element.prepend(fill);
        }
      },

      _hasTopTabbar: function() {
        return this._attrs.position === 'top';
      },

      /**
       * @param {Number} index
       * @param {Object} [options]
       * @param {Boolean} [options.keepPage]
       * @return {Boolean} success or not
       */
      setActiveTab: function(index, options) {
        options = options || {};
        var previousTabItem = this._tabItems[this.getActiveTabIndex()];
        var selectedTabItem = this._tabItems[index];

        if(typeof selectedTabItem.noReload !== 'undefined' && 
            index == this.getActiveTabIndex()) {
          this.emit('reactive', {
            index: index,
            tabItem: selectedTabItem,
          }); 
          return false;
        }

        var needLoad = selectedTabItem.page && !options.keepPage;

        if (!selectedTabItem) {
          return false;
        }

        var canceled = false;
        this.emit('prechange', {
          index: index,
          tabItem: selectedTabItem,
          cancel: function() {
            canceled = true;
          }
        });

        if (canceled) {
          selectedTabItem.setInactive();
          if (previousTabItem) {
            previousTabItem.setActive();
          }
          return false;
        }

        selectedTabItem.setActive();

        if (needLoad) {
          this._loadPage(selectedTabItem.page, {
            callback: function() {
              this.emit('postchange', {index: index, tabItem: selectedTabItem});
            }.bind(this)
          });
        }

        for (var i = 0; i < this._tabItems.length; i++) {
          if (this._tabItems[i] != selectedTabItem) {
            this._tabItems[i].setInactive();
          } else {
            this._triggerActiveTabChanged(i, selectedTabItem);

            if (!needLoad) {
              this.emit('postchange', {index: index, tabItem: selectedTabItem});
            }
          }
        }

        return true;
      },

      _triggerActiveTabChanged: function(index, tabItem){
        this._scope.onActiveTabChanged({
          $index: index,
          $tabItem: tabItem
        });
      },

      /**
       * @param {Boolean} visible
       */
      setTabbarVisibility: function(visible) {
        this._scope.hideTabs = !visible;
        this._onTabbarVisibilityChanged();
      },

      _onTabbarVisibilityChanged: function() {
        if (this._hasTopTabbar()) {
          if (this._scope.hideTabs) {
            this._contentElement.css('top', '0px');
          } else {
            this._contentElement.css('top', '');
          }
        } else {
          if (this._scope.hideTabs) {
            this._tabbarElement.css('bottom', '0px');
          } else {
            this._tabbarElement.css('bottom', '');
          }
        }
      },

      /**
       * @param {Object} tabItem
       */
      addTabItem: function(tabItem) {
        this._tabItems.push(tabItem);
      },

      /**
       * @return {Number} When active tab is not found, returns -1.
       */
      getActiveTabIndex: function() {
        var tabItem;
        for (var i = 0; i < this._tabItems.length; i++) {
          tabItem = this._tabItems[i];
          if (tabItem.isActive()) {
            return i;
          }
        }

        return -1;
      },

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.animation]
       * @param {Object} [options.callback]
       */
      loadPage: function(page, options) {
        return this._loadPage(page, options);
      },

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.animation]
       */
      _loadPage: function(page, options) {

        $onsen.getPageHTMLAsync(page).then(function(html) {
          var pageElement = angular.element(html.trim());

          this._loadPageDOM(page, pageElement, options);

        }.bind(this), function() {
          throw new Error('Page is not found: ' + page);
        });
      },

      /**
       * @param {String} page
       * @param {jqLite} element
       * @param {Object} options
       * @param {Object} options.animation
       */
      _loadPageDOM: function(page, element, options) {
        options = options || {};
        var pageScope = this._scope.$parent.$new();
        var link = $compile(element);

        this._contentElement.append(element);
        var pageContent = link(pageScope);
        pageScope.$evalAsync();

        if (this._currentPageElement) {
          var oldPageElement = this._currentPageElement;
          var oldPageScope = this._currentPageScope;

          this._currentPageElement = pageContent;
          this._currentPageScope = pageScope;

          this._getAnimatorOption(options).apply(pageContent, oldPageElement, function() {
            oldPageElement.remove();
            oldPageScope.$destroy();

            if (options.callback instanceof Function) {
              options.callback();
            }
          });

        } else {
          this._currentPageElement = pageContent;
          this._currentPageScope = pageScope;

          if (options.callback instanceof Function) {
            options.callback();
          }
        }
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
        this.emit('destroy', {tabbar: this});

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    // Preset transition animators.
    TabbarView._animatorDict = {
      'default': new TabbarNoneAnimator(),
      'none': new TabbarNoneAnimator(),
      'fade': new TabbarFadeAnimator()
    };

    /**
     * @param {String} name
     * @param {NavigatorTransitionAnimator} animator
     */
    TabbarView.registerAnimator = function(name, animator) {
      if (!(animator instanceof TabbarAnimator)) {
        throw new Error('"animator" param must be an instance of TabbarAnimator');
      }

      this._transitionAnimatorDict[name] = animator;
    };


    return TabbarView;
  });

})();
