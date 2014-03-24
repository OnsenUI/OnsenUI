(function(){
	'use strict';

	// for initialization hook.
	if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
		document.write('<ons-dummy-for-init/>');
	} else {
		var dom = document.createElement('ons-dummy-for-init');
		document.body.appendChild(dom);
	}

	angular.module('onsen.directives').run(function($compile, $rootScope) {
		ons.$compile = $compile;
		$rootScope.$on('$ons-ready', function() {
			ons.isReady = function() {
				return true;
			};
		});
	});

	var ons = window.ons = {
		/**
		 * @return {Boolean}
		 */
		isReady : function() {
			return false;
		},

		/**
		 * @param {HTMLElement} dom
		 */
		compile : function(dom) {
			if (!(dom instanceof HTMLElement)) {
				throw new Error('First argument must be instance of HTMLElement.');
			}
			var scope = angular.element(dom).scope();
			if (!scope) {
				throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
			}
			ons.$compile(dom)(scope);
		},

		/**
		 * @param {Function} callback
		 */
		ready : function(callback) {
			if (ons.isReady()) {
				callback();
			} else {
				angular.module('onsen.directives').run(function($rootScope) {
					$rootScope.$on('$ons-ready', callback);
				});
			}
		}
	};

})();
