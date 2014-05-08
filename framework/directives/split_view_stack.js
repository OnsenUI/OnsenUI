(function() {
	var directiveModules = angular.module('onsen.directives');

	directiveModules.factory('SplitViewStack', function($rootScope) {
		var SplitViewStack = Class.extend({
			splitViews: [],

			init: function() {
				$rootScope.ons = $rootScope.ons || {};
				$rootScope.ons.splitView = {};
				$rootScope.ons.splitView.setMainPage = this.setMainPage.bind(this);
				$rootScope.ons.splitView.setSecondaryPage = this.setSecondaryPage.bind(this);
				$rootScope.ons.splitView.toggle = this.toggle.bind(this);				
				$rootScope.ons.splitView.open = this.open.bind(this);
				$rootScope.ons.splitView.close = this.close.bind(this);
			},

			_findClosestSplitView: function($event) {				
				var splitView;
				if ($event) {
					var splitViewElement = $rootScope.ons.upTo($event.target, 'ons-split-view');
					splitView = angular.element(splitViewElement).isolateScope();
				} else {
					splitView = this.splitViews[this.splitViews.length - 1];
				}

				return splitView;
			},

			_checkExistence: function() {
				if (this.splitViews.length == 0) {
					throw new Error('oops!! no split-view registerred');
				}
			},

			addSplitView: function(splitView) {
				this.splitViews.push(splitView);
			},

			removeSplitView: function(splitView){
				for (var i = 0; i < this.splitViews.length; i++) {
					if(this.splitViews[i] == splitView){
						this.splitViews.splice(i, 1);
					}
				};
			},

			setMainPage: function(page, $event) {
				this._checkExistence();

				var splitview = this._findClosestSplitView($event);
				splitview.setMainPage(page);
			},

			setSecondaryPage: function(page, $event) {
				this._checkExistence();

				var splitview = this._findClosestSplitView($event);
				splitview.setSecondaryPage(page);
			},

			toggle: function($event) {
				this._checkExistence();

				var splitView = this._findClosestSplitView($event);
				splitView.toggle();
			},

            open: function($event) {
                this._checkExistence();

                var splitView = this._findClosestSplitView($event);
                splitView.open();
            },

            close: function($event) {
                this._checkExistence();

                var splitView = this._findClosestSplitView($event);
                splitView.close();
            }
		});

		return new SplitViewStack();
	});
})();