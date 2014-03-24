(function(){
	'use strict';

	var module = angular.module('onsen.services');

	module.service('OnsenUtil', function($rootScope, $window) {
		return {
			/**
			 * Create modifier templater function. The modifier templater generate css classes binded modifier name.
			 *
			 * @param {Object} attrs
			 * @return {Function} 
			 */
			generateModifierTemplater: function(attrs) {
				var modifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];

				/**
				 * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
				 * @return {String}
				 */
				return function(template) {
					return modifiers.map(function(modifier) {
						return template.replace('*', modifier);
					}).join(' ');
				};
			},

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
			 * Util.defineVar('foo', 'foo-value');
			 * // => window.foo and $scope.foo is now 'foo-value'
			 *
			 * Util.defineVar('foo.bar', 'foo-bar-value');
			 * // => window.foo.bar and $scope.foo.bar is now 'foo-bar-value'
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

