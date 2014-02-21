(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('SlidingMenuFactory', function($rootScope) {
		var SlidingMenuFactory = Class.extend({
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
					throw new Error('oops!! no navigator registerred');
				}
			},

			addSlidingMenu: function(slidingMenu) {
				this.slidingMenus.push(slidingMenu);
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

		return new SlidingMenuFactory();
	});
})();