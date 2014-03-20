(function(){
	'use strict';

	var module = angular.module('onsen.services');

	module.service('OnsenUtil', function($rootScope, $window) {
		return {
			/**
			 * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
			 *
			 * @param {Object} attrs
			 * @param object
			 */
			declareVarAttribute: function(attrs, object) {
				if (typeof attrs['var'] === 'string') {
					this._defineVar(attrs['var'], object);
				}
			},

			/**
			 * Define a variable to JavaScript global scope and AngularJS scope.
			 *
			 * Util.defineVar('foo', 'foo');
			 * // => window.foo and $scope.foo is now 'foo'
			 *
			 * Util.defineVar('foo.bar', 'foo.bar');
			 * // => window.foo.bar and $scope.foo.bar is now 'foo.bar'
			 *
			 * @param {String} name
			 * @param object
			 */
			_defineVar: function(name, object) {
				var names = name.split(/\./);

				set($window, names, object);
				set($rootScope, names, object);

				function set(container, names, object) {
					var name;
					for (var i = 0; i < names.length - 1; i++) {
						name = names[i];
						if (container[name] === undefined || container[name] === null) {
							container[name] = {};
						}
						container = container[name];
					}

					container[names[names.length - 1]] = object;
				}
			}

		};
	});
})();

