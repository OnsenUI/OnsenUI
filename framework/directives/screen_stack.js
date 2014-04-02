(function() {
  var directiveModules = angular.module('onsen.directives');

  directiveModules.factory('ScreenStack', function($rootScope) {
    var ScreenStack = Class.extend({
      screens: [],

      init: function() {
        $rootScope.ons = $rootScope.ons || {};
        $rootScope.ons.screen = {};
        $rootScope.ons.screen.presentPage = this.presentPage.bind(this);
        $rootScope.ons.screen.dismissPage = this.dismissPage.bind(this);
        $rootScope.ons.screen.resetToPage = this.resetToPage.bind(this);
      },

      _findClosestScreen: function($event) {
        // finding the right navigator
        var screen;
        if ($event) {
          var screenElement = $rootScope.ons.upTo($event.target, 'ons-screen');
          screen = angular.element(screenElement).isolateScope();
        } else {
          screen = this.screens[this.screens.length - 1];
        }

        return screen;
      },

      _checkExistence: function() {
        if (this.screens.length == 0) {
          throw new Error('oops!! no navigator registerred');
        }
      },

      addScreen: function(screen) {
        this.screens.push(screen);
      },

      removeScreen: function(screen){
        for (var i = 0; i < this.screens.length; i++) {
          if(this.screens[i] == screen){
            this.screens.splice(i, 1);
          }
        };
      },

      presentPage: function(page, $event) {
        this._checkExistence();

        var screen = this._findClosestScreen($event);
        screen.presentPage(page);
      },

      resetToPage: function(page, $event) {
        this._checkExistence();

        var screen = this._findClosestScreen($event);
        screen.resetToPage(page);
      },

      dismissPage: function($event) {
        this._checkExistence();

        var screen = this._findClosestScreen($event);
        screen.dismissPage();
      }
    });

    return new ScreenStack();
  });
})();
