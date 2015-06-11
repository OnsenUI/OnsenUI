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

  module.factory('TabbarAnimator', function() {

    var TabbarAnimator = Class.extend({

      /**
       * @param {Object} options
       * @param {String} options.timing
       * @param {Number} options.duration
       * @param {Number} options.delay
       */
      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
        this.delay = options.delay !== undefined ? options.delay : this.delay;
      },

      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       * @param {Function} done
       */
      apply: function(enterPage, leavePage, enterIndex, leaveIndex, done) {
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
       * @param {Function} done
       */
      apply: function(enterPage, leavePage, enterIndex, leaveIndex, done) {
        done();
      }
    });

    return TabbarNoneAnimator;
  });

  module.factory('TabbarFadeAnimator', function(TabbarAnimator) {

    var TabbarFadeAnimator = TabbarAnimator.extend({

      timing: 'linear',
      duration: 0.4,
      delay: 0,

      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, enterIndex, leaveIndex, done) {
        animit.runAll(
          animit(enterPage[0])
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            })
            .wait(this.delay)
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            }, {
              duration: this.duration,
              timing: this.timing
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
            .wait(this.delay)
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            })
        );
      }
    });

    return TabbarFadeAnimator;
  });

  module.factory('TabbarSlideAnimator', function(TabbarAnimator) {

    var TabbarSlideAnimator = TabbarAnimator.extend({

      timing: 'ease-in',
      duration: 0.15,
      delay: 0,

      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, enterIndex, leaveIndex, done) {
        var sgn = enterIndex > leaveIndex;

        animit.runAll(
          animit(enterPage[0])
            .queue({
              transform: 'translate3D(' + (sgn ? '' : '-') + '100%, 0, 0)',
            })
            .wait(this.delay)
            .queue({
              transform: 'translate3D(0, 0, 0)',
            }, {
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(callback) {
              done();
              callback();
            }),
          animit(leavePage[0])
            .queue({
              transform: 'translate3D(0, 0, 0)',
            })
            .wait(this.delay)
            .queue({
              transform: 'translate3D(' + (sgn ? '-' : '') + '100%, 0, 0)',
            }, {
              duration: this.duration,
              timing: this.timing
            })
        );
      }
    });

    return TabbarSlideAnimator;
  });

  module.factory('TabbarView', function($onsen, $compile, $parse, AnimationChooser, TabbarAnimator, TabbarNoneAnimator, TabbarFadeAnimator, TabbarSlideAnimator) {
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

        this._animationChooser = new AnimationChooser({
          animators: TabbarView._animatorDict,
          baseClass: TabbarAnimator,
          baseClassName: 'TabbarAnimator',
          defaultAnimation: attrs.animation,
          defaultAnimationOptions: $parse(attrs.animationOptions)()
        });
      },

      _prepareForTopTabbar: function() {
        this._contentElement.attr('no-status-bar-fill', '');

        setImmediate(function() {
          this._contentElement.addClass('tab-bar--top__content');
          this._tabbarElement.addClass('tab-bar--top');
        }.bind(this));

        var page = ons.findParentComponentUntil('ons-page', this._element[0]);
        if (page) {
          this._element.css('top', window.getComputedStyle(page._element[0]._getContentElement(), null).getPropertyValue('padding-top'));
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
       * @param {String} [options.animation]
       * @param {Object} [options.animationOptions]
       * @return {Boolean} success or not
       */
      setActiveTab: function(index, options) {
        options = options || {};

        var previousTabItem = this._tabItems[this.getActiveTabIndex()],
          selectedTabItem = this._tabItems[index],
          previousTabIndex = this.getActiveTabIndex(),
          selectedTabIndex = index;

        if((typeof selectedTabItem.noReload !== 'undefined' || selectedTabItem.isPersistent()) &&
            index === this.getActiveTabIndex()) {
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
          var removeElement = true;

          if (previousTabItem && previousTabItem.isPersistent()) {
              removeElement = false;
              previousTabItem._pageElement = this._currentPageElement;
          }

          var params = {
            callback: function() {
              this.emit('postchange', {index: index, tabItem: selectedTabItem});
            }.bind(this),
            previousTabIndex: previousTabIndex,
            selectedTabIndex: selectedTabIndex,
            _removeElement: removeElement
          };

          if (options.animation) {
            params.animation = options.animation;
          }

          if (selectedTabItem.isPersistent() && selectedTabItem._pageElement) {
            this._loadPersistentPageDOM(selectedTabItem._pageElement, params);
          }
          else {
            this._loadPage(selectedTabItem.page, params);
          }
        }

        for (var i = 0; i < this._tabItems.length; i++) {
          if (this._tabItems[i] != selectedTabItem) {
            this._tabItems[i].setInactive();
          } else {
            if (!needLoad) {
              this.emit('postchange', {index: index, tabItem: selectedTabItem});
            }
          }
        }

        return true;
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
            this._contentElement.css('bottom', '0px');
          } else {
            this._contentElement.css('bottom', '');
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

        element[0]._show();
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

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    // Preset transition animators.
    TabbarView._animatorDict = {
      'default': TabbarNoneAnimator,
      'none': TabbarNoneAnimator,
      'fade': TabbarFadeAnimator,
      'slide': TabbarSlideAnimator
    };

    /**
     * @param {String} name
     * @param {Function} Animator
     */
    TabbarView.registerAnimator = function(name, Animator) {
      if (!(Animator.prototype instanceof TabbarAnimator)) {
        throw new Error('"Animator" param must inherit TabbarAnimator');
      }

      this._animatorDict[name] = Animator;
    };

    return TabbarView;
  });

})();
