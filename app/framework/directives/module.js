(function(){
	var directiveModules = angular.module('onsen.directives', []); // [] -> create new module

	directiveModules.factory('ONSEN_CONSTANTS', function() {
		var CONSTANTS = {
			// DIRECTIVE_TEMPLATE_URL: "plugins/onsenui/templates" // production
			DIRECTIVE_TEMPLATE_URL: "lib/maccha/app/templates" // test
		};

		return CONSTANTS;
	});
})();
