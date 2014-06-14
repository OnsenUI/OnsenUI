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

  module.service('Screen', function($compile, ScreenStack, requestAnimationFrame, $onsen) {
    var TRANSITION_END = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
    var TRANSITION_START = "webkitAnimationStart animationStart msAnimationStart oAnimationStart";

    var Screen = Class.extend({
      init: function(scope, element, attrs) {
        this.screenItems = [];
        this.scope = scope;
        this.element = element;
        this.attrs = attrs;

        this.isReady = true;
        this.attachMethods();

        if (scope.page) {
          this.resetToPage(scope.page);
        }
      },

      onTransitionEnded: function() {
        this.isReady = true;
      },

      animateInBehindPage: function() {
        var behindPage = this.screenItems[this.screenItems.length - 2].pageElement;
        try {
          behindPage.attr('class', 'ons-screen__page-container ons-screen__page-container--transition ons-screen__page-container--modal-behind');
        } catch(e) {
          console.log(e);
        }
      },

      animateInCurrentPage: function(pager) {
        pager.attr("class", "ons-screen__page-container ons-screen__page-container--unmodal");
        var that = this;
        pager.bind(TRANSITION_START, function transitionEnded() {
          that.isReady = false;
        });
        pager.bind(TRANSITION_END, function transitionEnded() {
          that.onTransitionEnded();
        });

        setTimeout(function() {
          requestAnimationFrame(function() {
            pager.attr("class", "ons-screen__page-container ons-screen__page-container--transition ons-screen__page-container--screen-center");
            that.animateInBehindPage();
          });
        }, 10);
      },

      animateOutBehindPage: function() {
        var behindPage = this.screenItems[this.screenItems.length - 1].pageElement;
        behindPage.attr('class', 'ons-screen__page-container ons-screen__page-container--transition');
      },

      isEmpty: function() {
        return this.screenItems.length < 1;
      },

      onPageAdded: function(page) {
        var blackMask = angular.element(page[0].querySelector('.ons-screen__black-mask'));
        blackMask.removeClass('ons-screen__black-mask--hidden');
      },

      generatePageEl: function(pageContent){
        var pageEl = angular.element('<div></div>');
        pageEl.addClass('onsne-screen__page-container');

        var blackMask = angular.element('<div></div>');
        blackMask.addClass('ons-screen__black-mask ons-screen__black-mask--hidden');
        pageEl.append(blackMask);

        var pageContainer = angular.element('<div></div>');
        pageContainer.addClass('ons-screen__page ons-screen-inner');
        pageEl.append(pageContainer);

        pageContainer.append(pageContent);
        return pageEl;
      },

      compilePageEl: function(pageEl, pageScope){
        var compiledPage = $compile(pageEl)(pageScope);
        return compiledPage;
      },

      createPageScope: function(){
        var pageScope = this.scope.$parent.$new();
        return pageScope;
      },

      /**
       * @param {String} pageUrl
       * @param {DOMElement} element This element is must be ons-page element.
       */
      _presentPageDOM: function(pageUrl, compiledPage, pageScope) {

        this.element.append(compiledPage);

        var isAnimate = this.screenItems.length >= 1;
        if (isAnimate) {
          this.animateInCurrentPage(compiledPage);
        } else {
          this.isReady = true;
        }

        var screenItem = {
          pageUrl: pageUrl,
          pageElement: compiledPage,
          pageScope: pageScope
        };

        this.screenItems.push(screenItem);

        setTimeout(function() {
          this.onPageAdded(compiledPage);
        }.bind(this), 400);
      },

      presentPage: function(page){
        if (!this.isReady) {
          return;
        }

        var self = this;

        $onsen.getPageHTMLAsync(page).then(function(html) {
          var pageContent = angular.element(html.trim());
          var pageEl = self.generatePageEl(pageContent);
          var pageScope = self.createPageScope();
          var compiledPage = self.compilePageEl(pageEl, pageScope);

          self._presentPageDOM(page, compiledPage, pageScope);
        }, function() {
          self.onTransitionEnded();
          throw new Error('Page is not found: ' + page);
        });
      },

      dismissPage: function(){
        if (this.screenItems.length < 2 || !this.isReady) {
          return;
        }

        var screenItem = this.screenItems.pop();
        var currentPage = screenItem.pageElement;
        this.animateOutBehindPage();
        currentPage.attr("class", "ons-screen__page-container ons-screen__page-container--transition ons-screen__page-container--unmodal");
        var that = this;

        currentPage.bind(TRANSITION_START, function transitionEnded() {
          that.isReady = false;
        });
        currentPage.bind(TRANSITION_END, function transitionEnded() {
          currentPage.remove();
          that.isReady = true;
          screenItem.pageScope.$destroy();
        });
      },

      resetToPage: function(page){
        this.scope.presentPage(page);
        for (var i = 0; i < this.screenItems.length - 1; i++) {
          this.screenItems[i].pageElement.remove();
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
      replace: true,
      transclude: true,
      scope: {
        page: '@'
      },

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/screen.tpl',

      compile: function(element, attrs, transclude) {
        return function(scope, element, attrs) {
          var screen = new Screen(scope, element, attrs);
          $onsen.declareVarAttribute(attrs, screen);

          if (!attrs.page) {
            var pageScope = screen.createPageScope();

            transclude(pageScope, function(pageContent) {
              var pageEl = screen.generatePageEl(pageContent);
              screen._presentPageDOM('', pageEl, pageScope);
            });
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
