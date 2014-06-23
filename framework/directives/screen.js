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

  var TransitionAnimator = Class.extend({
    push: function(enterPage, leavePage, callback) {
      callback();
    }, 

    pop: function(enterPage, leavePage, callback) {
      callback();
    }
  });

  var ModalTransitionAnimator = TransitionAnimator.extend({

    /** Black mask */
    backgroundMask : angular.element(
      '<div style="position: absolute; width: 100%;' +
      'height: 100%; background-color: black;"></div>'
    ),

    push: function(enterPage, leavePage, callback) {
      var mask = this.backgroundMask.remove();
      leavePage.pageElement[0].parentNode.insertBefore(mask[0], leavePage.pageElement[0]);

      animit.runAll(

        animit(mask[0])
          .wait(0.4)
          .queue(function(done) {
            mask.remove();
            done();
          }),
        
        animit(enterPage.pageElement[0])
          .queue({
            transform: 'translate3D(0, 100%, 0)'
          })
          .queue({
            transform: 'translate3D(0, 0, 0)'
          }, {
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          }),

        animit(leavePage.pageElement[0])
          .queue({
            transform: 'translate3D(0, 0, 0)',
            opacity: 1.0
          })
          .queue({
            transform: 'translate3D(0, -10%, 0)',
            opacity: 0.9
          }, {
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
      );
    },

    pop: function(enterPage, leavePage, callback) {

      var mask = this.backgroundMask.remove();
      enterPage.pageElement[0].parentNode.insertBefore(mask[0], enterPage.pageElement[0]);

      animit.runAll(

        animit(mask[0])
          .wait(0.4)
          .queue(function(done) {
            mask.remove();
            done();
          }),

        animit(enterPage.pageElement[0])
          .queue({
            transform: 'translate3D(0, -10%, 0)',
            opacity: 0.9
          })
          .queue({
            transform: 'translate3D(0, 0, 0)',
            opacity: 1.0
          }, {
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          }),

        animit(leavePage.pageElement[0])
          .queue({
            transform: 'translate3D(0, 0, 0)'
          })
          .queue({
            transform: 'translate3D(0, 100%, 0)'
          }, {
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
      );
    }
  });

  module.service('Screen', function($compile, ScreenStack, requestAnimationFrame, $onsen) {
    var TRANSITION_END = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd';
    var TRANSITION_START = 'webkitAnimationStart animationStart msAnimationStart oAnimationStart';

    var Screen = Class.extend({

      init: function(scope, element, attrs) {
        this.screenItems = [];
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;

        this._doorLock = new DoorLock();
        this.attachMethods();

        if (scope.page) {
          this.resetToPage(scope.page);
        }
      },

      isEmpty: function() {
        return this.screenItems.length < 1;
      },

      compilePageEl: function(pageEl, pageScope){
        var compiledPage = $compile(pageEl)(pageScope);
        return compiledPage;
      },

      createPageScope: function(){
        var pageScope = this.scope.$new();
        return pageScope;
      },

      /**
       * @param {String} pageUrl
       * @param {DOMElement} element This element is must be ons-page element.
       * @param {Object} pageScope
       * @param {Function} [callback]
       */
      _presentPageDOM: function(pageUrl, compiledPage, pageScope, callback) {
        callback = callback || function() {};

        var screenItem = {
          pageUrl: pageUrl,
          pageElement: compiledPage,
          pageScope: pageScope,
          destroy: function() {
            this.pageElement.remove();
            this.pageScope.$destroy();
          }
        };

        // create stack context.
        compiledPage.css('z-index', 0);

        this.screenItems.push(screenItem);

        if (this.screenItems.length > 1) {

          var enterPage = screenItem;
          var leavePage = this.screenItems[this.screenItems.length - 2];

          new ModalTransitionAnimator().push(enterPage, leavePage, function() {
            leavePage.pageElement.css({display: 'none'});
            callback();
          });
          this.element.append(compiledPage);
        } else {
          this.element.append(compiledPage);
          callback();
        }
      },

      presentPage: function(page) {
        var self = this;

        this._doorLock.waitUnlock(function() {
          var unlock = self._doorLock.lock();

          $onsen.getPageHTMLAsync(page).then(function(html) {
            var pageContent = angular.element(html.trim());
            var pageScope = self.createPageScope();
            var compiledPage = self.compilePageEl(pageContent, pageScope);

            self._presentPageDOM(page, compiledPage, pageScope, unlock);
          }, function() {
            unlock();
            throw new Error('Page is not found: ' + page);
          });
        });
      },

      dismissPage: function(){
        if (this.screenItems.length < 2) {
          return;
        }

        var self = this;
        this._doorLock.waitUnlock(function() {
          var unlock = self._doorLock.lock();

          var leavePage = self.screenItems.pop();
          var enterPage = self.screenItems[self.screenItems.length - 1];

          enterPage.pageElement.css({display: 'block'});

          new ModalTransitionAnimator().pop(enterPage, leavePage, function() {
            leavePage.destroy();
            unlock();
          });
        });
      },

      resetToPage: function(page){
        this.scope.presentPage(page);
        for (var i = 0; i < this.screenItems.length - 1; i++) {
          this.screenItems[i].destroy();
        }
      },

      attachMethods: function() {
        this.scope.presentPage = this.presentPage.bind(this);
        this.scope.resetToPage = this.resetToPage.bind(this);
        this.scope.dismissPage = this.dismissPage.bind(this);
      }
    });

    return Screen;
  });

  module.directive('onsScreen', function($compile, Screen, ScreenStack, $onsen) {

    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element, attrs, transclude) {
        var html = $onsen.normalizePageHTML(element.html().trim());
        element.contents().remove();

        return function(scope, element, attrs) {
          var screen = new Screen(scope, element, attrs);
          $onsen.declareVarAttribute(attrs, screen);

          if (!attrs.page) {
            var pageScope = screen.createPageScope();

            var compiled = $compile(angular.element(html))(pageScope);
            screen._presentPageDOM('', compiled, pageScope);
          }

          ScreenStack.addScreen(scope);

          scope.$on('$destroy', function(){
            ScreenStack.removeScreen(scope);
          });
        };

      }
    };
  });
})();
