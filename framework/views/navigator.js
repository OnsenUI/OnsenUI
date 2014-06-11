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

  /**
   * Null animator. Do nothing.
   */
  var NullAnimator = {
    push: function(enterPage, leavePage) {
    },

    pop: function(enterPage, leavePage, callback) {
      callback();
    }
  };

  /**
   * Simple slide animator for navigator transition.
   */
  var SimpleSlideAnimator = {
    push: function(enterPage, leavePage) {
    },

    pop: function(enterPage, leavePage, callback) {
      callback();
    }
  };

  /**
   * iOS like slide animator for navigator transition.
   */
  var NavigatorSlideLeftAnimator = {

    backgroundMask : angular.element(
      '<div style="position: absolute; width: 100%;' +
      'height: 100%; background-color: black;"></div>'
    ),

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     */
    push: function(enterPage, leavePage) {
      var mask = this.backgroundMask.remove();
      leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0]);

      animit.runAll(

        animit(mask[0])
          .wait(0.4)
          .queue(function(done) {
            mask.remove();
            done();
          }),

        animit(enterPage.controller.getContentElement())
          .queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)',
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle(),

        animit(enterPage.controller.getToolbarElement())
          .queue({
            css: {
              background: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)'
            },
            duration: 0
          })
          .wait(0.6)
          .resetStyle(),


        animit(enterPage.controller.getToolbarCenterItemsElement())
          .queue({
            css: {
              transform: 'translate3d(100%, 0, 0)',
              opacity: 0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle(),

        animit(enterPage.controller.getToolbarLeftItemsElement())
          .queue({
            css: {opacity: 0},
            duration: 0
          })
          .queue({
            css: {opacity: 1},
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle(),

        animit(enterPage.controller.getToolbarRightItemsElement())
          .queue({
            css: {opacity: 0},
            duration: 0
          })
          .queue({
            css: {opacity: 1},
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle(),

        animit(leavePage.controller.getContentElement())
          .queue({
            css: {
              transform: 'translate3D(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
              opacity: 0.9
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle(),

        animit(leavePage.controller.getToolbarCenterItemsElement())
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3d(-36%, 0, 0)',
              opacity: 0,
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle(),

        animit(leavePage.controller.getToolbarLeftItemsElement())
          .queue({
            css: {opacity: 1},
            duration: 0
          })
          .queue({
            css: {opacity: 0},
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle(),

        animit(leavePage.controller.getToolbarRightItemsElement())
          .queue({
            css: {opacity: 1},
            duration: 0
          })
          .queue({
            css: {opacity: 0},
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle()
      );
    },

    /**
     * @param {Object} enterPage
     * @param {Object} leavePage
     * @param {Function} done
     */
    pop: function(enterPage, leavePage, done) {
      var mask = this.backgroundMask.remove();
      enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0]);

      animit.runAll(

        animit(mask[0])
          .wait(0.4)
          .queue(function(done) {
            mask.remove();
            done();
          }),

        animit(enterPage.controller.getContentElement())
          .queue({
            css: {
              transform: 'translate3D(-25%, 0px, 0px)',
              opacity: 0.9
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1.0
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.4)
          .resetStyle(),

        animit(enterPage.controller.getToolbarCenterItemsElement())
          .queue({
            css: {
              transform: 'translate3d(-36%, 0, 0)',
              opacity: 0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle(),

        animit(enterPage.controller.getToolbarLeftItemsElement())
          .queue({
            css: {opacity: 0},
            duration: 0
          })
          .queue({
            css: {opacity: 1},
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle(),

        animit(enterPage.controller.getToolbarRightItemsElement())
          .queue({
            css: {opacity: 0},
            duration: 0
          })
          .queue({
            css: {opacity: 1},
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle(),

        animit(leavePage.controller.getContentElement())
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)'
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)'
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .queue(function(finish) {
            done();
            finish();
          }),

        animit(leavePage.controller.getToolbarElement())
          .queue({
            css: {
              background: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)'
            },
            duration: 0
          })
          .wait(0.4),


        animit(leavePage.controller.getToolbarCenterItemsElement())
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1.0
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3d(100%, 0, 0)',
              opacity: 0,
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          }),

        animit(leavePage.controller.getToolbarLeftItemsElement())
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 0
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle(),

        animit(leavePage.controller.getToolbarRightItemsElement())
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 1
            },
            duration: 0
          })
          .queue({
            css: {
              transform: 'translate3d(0, 0, 0)',
              opacity: 0
            },
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .wait(0.2)
          .resetStyle()
      );
    }
  };

  var directives = angular.module('onsen');

  directives.factory('Navigator', function($http, $parse, $templateCache, $compile, requestAnimationFrame, PredefinedPageCache, OnsenUtil) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class Navigator
     */
    var Navigator = Class.extend({

      /**
       * @member {Array}
       */
      element: undefined,

      /**
       * @member {Array}
       */
      pages: undefined,

      /**
       * @member {Object}
       */
      scope: undefined,

      /**
       * @param {Object} options
       * @param {HTMLElement} options.element jqLite Object to manage with navigator
       * @param options.scope Angular.js scope object
       */
      init: function(options) {
        options = options || options;

        this.element = options.element || angular.element(window.document.body);
        this.scope = options.scope || this.element.scope();
        this.pages = [];
      },

      /**
       * @param element jqLite Object
       * @return jqLite Object
       */
      _normalizePageElement: function(element) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].nodeType === 1) {
            return angular.element(element[i]);
          }
        }

        throw new Error('invalid state');
      },

      /**
       * Pushes the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      pushPage: function(page, options) {
        options = options || {};

        if (options && typeof options != 'object') {
          throw new Error('options must be an objected. You supplied ' + options);
        }

        var templateHTML = $templateCache.get(page);
        var that = this;

        if (templateHTML) {
          var pageScope = this._createPageScope();
          var pageElement = createPageElement(templateHTML, pageScope);
          setTimeout(function() {
            that._pushPageDOM(page, pageElement, pageScope, options);
          }, 1000 / 60);

        } else {

          $http({
            url: page,
            method: 'GET',
            cache: PredefinedPageCache
          })
            .success(function(templateHTML, status, headers, config) {
              var pageScope = that._createPageScope();
              var pageElement = createPageElement(templateHTML, pageScope);
              setTimeout(function() {
                that._pushPageDOM(page, pageElement, pageScope, options);
              }, 1000 / 60);
            })
            .error(function(data, status, headers, config) {
              console.error('error', data, status);
            });
        }

        function createPageElement(templateHTML, pageScope, done) {
          var div = document.createElement('div');
          div.innerHTML = templateHTML.trim();
          var pageElement = angular.element(div);

          var hasPage = div.childElementCount === 1 &&
            div.childNodes[0].nodeName.toLowerCase() === 'ons-page';
          if (hasPage) {
            pageElement = angular.element(div.childNodes[0]);
          }

          var element = $compile(pageElement)(pageScope);
          return element;
        }
      },

      _createPageScope: function() {
         return this.scope.$parent.$new();
      },

      /**
       * @param {String} page Page name.
       * @param {Object} element Compiled page element.
       * @param {Object} pageScope
       * @param {Object} options
       */
      _pushPageDOM: function(page, element, pageScope, options) {
        element = this._normalizePageElement(element);

        var pageController = element.inheritedData('$onsPageController');
        if (!pageController) {
          throw new Error('Fail to fetch $onsPageController.');
        }

        this.pages.push({
          page: page,
          element: element,
          pageScope: pageScope,
          controller: pageController,
          options: options || {}
        });

        if (this.pages.length > 1) {
          var leavePage = this.pages.slice(-2)[0];
          var enterPage = this.pages.slice(-1)[0];

          NavigatorSlideLeftAnimator.push(enterPage, leavePage);
          this.element.append(element);
        } else {
          this.element.append(element);
        }
      },

      /**
       * Pops current page from the page stack.
       */
      popPage: function() {
        if (this.pages.length === 0) {
          throw new Error('Navigator\'s page stack is empty.');
        }

        var deadPage = this.pages.pop();

        if (this.pages.length === 0) {
          deadPage.element.remove();
        } else {
          var enterPage = this.pages.slice(-1)[0];
          var callback = function() {
            deadPage.element.remove();
          };
          NavigatorSlideLeftAnimator.pop(enterPage, deadPage, callback);
        }
      },

      /**
       * Clears page stack and add the specified pageUrl to the page stack.
       * If options object is specified, apply the options.
       * the options object include all the attributes of this navigator
       *
       * @param {String} page
       * @param {Object} [options]
       */
      resetToPage: function(page, options) {
        while (this.pages.length > 0) {
          this.pages.pop().element.remove();
        }

        this.pushPage(page, options);
      },

      /**
       * Get current page's navigator item.
       *
       * Use this method to access options passed by pushPage() or resetToPage() method.
       * eg. ons.navigator.getCurrentPage().options
       *
       * @return {Object} 
       */
      getCurrentPage: function() {
        return this.pages.last();
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this.pages;
      }
    });

    return Navigator;
  });
})();
