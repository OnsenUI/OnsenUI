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
  'use strict';
  var module = angular.module('onsen');

  module.factory('SplitView', function($compile, RevealSlidingMenuAnimator, $onsen) {
    var SPLIT_MODE = 0;
    var COLLAPSE_MODE = 1;
    var MAIN_PAGE_RATIO = 0.9;

    var ON_PAGE_READY = 'onPageReady';

    var SplitView = Class.extend({

      init: function(scope, element) {
        element.addClass('onsen-sliding-menu');

        this._element = element;
        this._scope = scope;

        this._mainPage = angular.element(element[0].querySelector('.onsen-split-view__main'));
        this._secondaryPage = angular.element(element[0].querySelector('.onsen-split-view__secondary'));

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
        this._mode = SPLIT_MODE;
        this._doorLock = new DoorLock();

        this._doSplit = false;
        this._doCollapse = false;

        if ($onsen.isIOS()) {
          window.addEventListener('orientationchange', this._onResize.bind(this));
        } else {
          window.addEventListener('resize', this._onResize.bind(this));
        }

        this._animator = new RevealSlidingMenuAnimator();

        this._element.css('display', 'none');

        if (scope.mainPage) {
          this.setMainPage(scope.mainPage);
        }

        if (scope.secondaryPage) {
          this.setSecondaryPage(scope.secondaryPage);
        }

        var unlock = this._doorLock.lock();

        this._considerChangingCollapse();
        this._setSize();

        setTimeout(function() {
          this._element.css('display', 'block');
          unlock();
        }.bind(this), 1000 / 60 * 2);

        scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       * @param {String} templateHTML
       */
      _appendSecondPage: function(templateHTML) {
        var pageScope = this._scope.$parent.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._secondaryPage.append(pageContent);

        if (this._currentSecondaryPageElement) {
          this._currentSecondaryPageElement.remove();
          this._currentSecondaryPageScope.$destroy();
        }

        this._currentSecondaryPageElement = pageContent;
        this._currentSecondaryPageScope = pageScope;
      },

      /**
       * @param {String} templateHTML
       */
      _appendMainPage: function(templateHTML) {
        var pageScope = this._scope.$parent.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._mainPage.append(pageContent);

        if (this._currentPage) {
          this._currentPage.remove();
          this._currentPageScope.$destroy();
        }

        this._currentPage = pageContent;
        this._currentPageScope = pageScope;
      },

      /**
       * @param {String} page
       */
      setSecondaryPage : function(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then(function(html) {
            this._appendSecondPage(angular.element(html.trim()));
          }.bind(this), function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} page
       */
      setMainPage : function(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then(function(html) {
            this._appendMainPage(angular.element(html.trim()));
          }.bind(this), function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _onResize: function() {
        var lastMode = this._mode;
        this._considerChangingCollapse();

        if (lastMode === COLLAPSE_MODE && this._mode === COLLAPSE_MODE) {
          this._animator.onResized({
            isOpened: false,
            width: '90%'
          });
        }

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
      },

      _considerChangingCollapse: function() {
        if (this._shouldCollapse() && this._mode !== COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if(this._doSplit) {
            this._activateSplitMode();
          } else {
            this._activateCollapseMode();
          }
        } else if(!this._shouldCollapse() && this._mode === COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if(this._doCollapse) {
            this._activateCollapseMode();
          } else {
            this._activateSplitMode();
          }
        }

        this._doCollapse = this._doSplit = false;
      },

      update: function() {
        this._fireUpdateEvent();

        if(this._doSplit) {
          this._activateSplitMode(); 
        } else if(this._doCollapse) {
          this._activateCollapseMode(); 
        } else if(this._shouldCollapse()) {
          this._activateCollapseMode();
        } else if(!this._shouldCollapsei()) {
          this._activateSplitMode();
        }

        this._doSplit = this._doCollapse = false;
      },

      _getOrientation: function(asWord) {
        if(asWord !== true) {
          asWord = false;
        }

        var orientation = window.orientation;

        if (orientation === undefined) {
          orientation = window.innerWidth > window.innerHeight ? 90 : 0;
        }

        if(!asWord) {
          return orientation;
        } else {
          return orientation === 180 || orientation === 0 ? 'portrait' : 'landscape';
        }
      },

      getCurrentMode: function() {
        if(this._mode === COLLAPSE_MODE) {
          return 'collapse';
        } else {
          return 'split';
        }
      },

      _shouldCollapse: function() {
        var orientation = this._getOrientation();

        switch (this._scope.collapse) {
          case undefined:
          case 'none':
            return false;

          case 'portrait':
            return orientation === 180 || orientation === 0;

          case 'landscape':
            return orientation == 90 || orientation == -90;

          default:
            // by width
            if (this._scope.collapse === undefined) {
              return false;
            } 

            var widthToken;
            if (this._scope.collapse.indexOf('width') >= 0) {
              var tokens = this._scope.collapse.split(' ');
              widthToken = tokens[tokens.length - 1];
            } else {
              widthToken = this._scope.collapse;
            }

            if (widthToken.indexOf('px') > 0) {
              widthToken = widthToken.substr(0, widthToken.length - 2);
            }

            return isNumber(widthToken) && window.innerWidth < widthToken;
        }
      },

      _setSize: function() {
        if (this._mode === SPLIT_MODE) {
          if (!this._scope.mainPageWidth) {
            this._scope.mainPageWidth = '70';
          }

          var secondarySize = 100 - this._scope.mainPageWidth.replace('%', '');
          this._secondaryPage.css({
            width: secondarySize + '%',
            opacity: 1
          });

          this._mainPage.css({
            width: this._scope.mainPageWidth + '%'
          });

          this._mainPage.css('left', secondarySize + '%');
        }
      },

      _fireEvent: function(name) {
        this.emit(name, {
          splitView: this,
          width: window.innerWidth,
          orientation: this._getOrientation(true) 
        });
      },

      _fireUpdateEvent: function() {
        var that = this;

        this.emit('update', {
          splitView: this,
          shouldCollapse: this._shouldCollapse(),
          currentMode: this.getCurrentMode(),
          split: function() {
            that._doSplit = true;
            that._doCollapse = false;
          },
          collapse: function() {
            that._doSplit = false;
            that._doCollapse = true;
          },
          width: window.innerWidth,
          orientation: this._getOrientation(true)
        }); 
      },

      _activateCollapseMode: function() {
        if (this._mode !== COLLAPSE_MODE) {
          this._fireEvent('precollapse');
       
          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = COLLAPSE_MODE;

          this._animator.setup(
            this._element,
            this._mainPage,
            this._secondaryPage,
            {isRight: false, width: '90%'}
          );

          this._fireEvent('postcollapse');
        }
      },

      _activateSplitMode: function() {
        if (this._mode !== SPLIT_MODE) {
          this._fireEvent('presplit');

          this._animator.destroy();

          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = SPLIT_MODE;
          this._setSize();
       
          this._fireEvent('postsplit');
        }
      },

      _destroy: function() {
        this.emit('destroy', {splitView: this});

        this._element = null;
        this._scope = null;
      }
    });

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    MicroEvent.mixin(SplitView);

    return SplitView;
  });
})();
