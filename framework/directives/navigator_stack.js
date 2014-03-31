(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('NavigatorStack', function($rootScope) {
		var NavigatorStack = Class.extend({
			navigators: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.navigator = {};
				$rootScope.ons.navigator.pushPage = this.pushPage.bind(this);
				$rootScope.ons.navigator.popPage = this.popPage.bind(this);
				$rootScope.ons.navigator.resetToPage = this.resetToPage.bind(this);
				$rootScope.ons.navigator.getCurrentPage = this.getCurrentPage.bind(this);
				$rootScope.ons.navigator.getPages = this.getPages.bind(this);
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

			removeNavigator: function(navigator){
				for (var i = 0; i < this.navigators.length; i++) {
					if(this.navigators[i] == navigator){
						this.navigators.splice(i, 1);
					}
				};
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
			},

			getCurrentPage: function() {
			    this._checkExistence();

			    var navigator = this._findNavigator();
			    return navigator.getCurrentNavigatorItem();
			},

			getPages: function() {
			    this._checkExistence();

			    var navigator = this._findNavigator();
			    return navigator.pages;
			}
		});

		return new NavigatorStack();
	});
})();