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


(function(){
	var directiveModules = angular.module('onsen.directives', []); // [] -> create new module

	directiveModules.factory('ONSEN_CONSTANTS', function() {
		var CONSTANTS = {
			// DIRECTIVE_TEMPLATE_URL: "plugins/onsenui/templates" // production
			DIRECTIVE_TEMPLATE_URL: "lib/onsen/templates" // test
		};

		return CONSTANTS;
	});
})();
