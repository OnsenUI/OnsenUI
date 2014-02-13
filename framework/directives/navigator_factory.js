(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('NavigatorFactory', function($rootScope) {
		var NavigatorFactory = Class.extend({
			navigators: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.navigator = {};
				$rootScope.ons.navigator.pushPage = this.pushPage.bind(this);
				$rootScope.ons.navigator.popPage = this.popPage.bind(this);
				$rootScope.ons.navigator.resetToPage = this.resetToPage.bind(this);
			},

			_findNavigator: function($event) {
				// finding the right navigator
				var navigator;
				if ($event) {
					var navigatorElement = $rootScope.ons.upTo($event.target, 'ons-navigator');
					navigator = angular.element(navigatorElement).isolateScope();
				} else {
					navigator = this.navigators[this.navigators.length - 1];
				}

				return navigator;
			},

			_checkExistence: function() {
				if (this.navigators.length == 0) {
					throw new Error('oops!! no navigator registerred');
				}
			},

			addNavigator: function(navigator) {
				this.navigators.push(navigator);
			},

			pushPage: function(page, options, $event) {
				this._checkExistence();

				var navigator = this._findNavigator($event);
				navigator.pushPage(page, options);
			},

			resetToPage: function(page, options, $event) {
				this._checkExistence();

				var navigator = this._findNavigator($event);
				navigator.resetToPage(page, options);
			},

			popPage: function($event) {
				this._checkExistence();

				var navigator = this._findNavigator($event);
				navigator.popPage();
			}
		});

		return new NavigatorFactory();
	});
})();