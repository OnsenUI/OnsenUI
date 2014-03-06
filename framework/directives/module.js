/*
Copyright 2013 ASIAL CORPORATION, KRUY VANNA, HIROSHI SHIKATA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


(function() {
	var directiveModules = angular.module('onsen.directives', ['templates-main']); // [] -> create new module

	directiveModules.run(function($rootScope, $window) {
		$rootScope.ons = $rootScope.ons || {};
		$rootScope.ons.$get = function(id) {
			id = id.replace('#', '');
			return angular.element(document.getElementById(id)).isolateScope();
		};

		// Find first ancestor of el with tagName
		// or undefined if not found
		$rootScope.ons.upTo = function(el, tagName) {
			tagName = tagName.toLowerCase();

			do {
				el = el.parentNode;
				if (el.tagName.toLowerCase() == tagName) {
					return el;
				}
			} while (el.parentNode)

			return null;
		};

		$rootScope.console = $window.console;
		$rootScope.alert = $window.alert;
	});

	directiveModules.service('requestAnimationFrame', function() {
		var fn = window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			window.requestAnimationFrame ||
			function(callback) {
				return window.setTimeout(callback, 70);
			};

		return fn;
	});

	directiveModules.factory('ONSEN_CONSTANTS', function() {
		var CONSTANTS = {
			DIRECTIVE_TEMPLATE_URL: "templates"
		};

		return CONSTANTS;
	});
})();
