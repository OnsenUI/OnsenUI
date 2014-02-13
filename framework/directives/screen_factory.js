(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('ScreenFactory', function($rootScope) {
		var ScreenFactory = Class.extend({
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
				var navigator;
				if ($event) {
					var navigatorElement = $rootScope.ons.upTo($event.target, 'ons-screen');
					navigator = angular.element(navigatorElement).isolateScope();
				} else {
					navigator = this.screens[this.screens.length - 1];
				}

				return navigator;
			},

			_checkExistence: function() {
				if (this.screens.length == 0) {
					throw new Error('oops!! no navigator registerred');
				}
			},

			addScreen: function(screen) {
				this.screens.push(screen);
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

		return new ScreenFactory();
	});
})();