(function() {
  var directiveModules = angular.module('onsen.directives');

  directiveModules.factory('SlidingMenuStack', function($rootScope) {
    var SlidingMenuStack = Class.extend({
      slidingMenus: [],

      init: function() {
        $rootScope.ons = $rootScope.ons || {};
        $rootScope.ons.slidingMenu = {};
        $rootScope.ons.slidingMenu.setAbovePage = this.setAbovePage.bind(this);
        $rootScope.ons.slidingMenu.setBehindPage = this.setBehindPage.bind(this);
        $rootScope.ons.slidingMenu.toggleMenu = this.toggleMenu.bind(this);
        $rootScope.ons.slidingMenu.openMenu = this.openMenu.bind(this);
        $rootScope.ons.slidingMenu.closeMenu = this.closeMenu.bind(this);
      },

      _findClosestSlidingMenu: function($event) {				
        var slidingMenu;
        if ($event) {
          var slidingMenuElement = $rootScope.ons.upTo($event.target, 'ons-sliding-menu');
          slidingMenu = angular.element(slidingMenuElement).isolateScope();
        } else {
          slidingMenu = this.slidingMenus[this.slidingMenus.length - 1];
        }

        return slidingMenu;
      },

      _checkExistence: function() {
        if (this.slidingMenus.length == 0) {
          throw new Error('oops!! no sliding-menu registerred');
        }
      },

      addSlidingMenu: function(slidingMenu) {
        this.slidingMenus.push(slidingMenu);
      },

      removeSlidingMenu: function(slidingMenu){
        for (var i = 0; i < this.slidingMenus.length; i++) {
          if(this.slidingMenus[i] == slidingMenu){
            this.slidingMenus.splice(i, 1);
          }
        };
      },

      setAbovePage: function(page, $event) {
        this._checkExistence();

        var slidingMenu = this._findClosestSlidingMenu($event);
        slidingMenu.setAbovePage(page);
      },

      setBehindPage: function(page, $event) {
        this._checkExistence();

        var slidingMenu = this._findClosestSlidingMenu($event);
        slidingMenu.setBehindPage(page);
      },

      toggleMenu: function($event) {
        this._checkExistence();

        var slidingMenu = this._findClosestSlidingMenu($event);
        slidingMenu.toggleMenu();
      },

      openMenu: function($event) {
        this._checkExistence();

        var slidingMenu = this._findClosestSlidingMenu($event);
        slidingMenu.openMenu();
      },

      closeMenu: function($event) {
        this._checkExistence();

        var slidingMenu = this._findClosestSlidingMenu($event);
        slidingMenu.closeMenu();
      }
    });

    return new SlidingMenuStack();
  });
})();
