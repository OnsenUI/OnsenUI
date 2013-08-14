var directiveModules = angular.module('monaca.directives', []); // [] -> create new module

directiveModules.factory('MONACA_CONSTANTS', function() {
	var CONSTANTS = {
		DIRECTIVE_TEMPLATE_URL: "lib/maccha/app/templates"
	};

	return CONSTANTS;
});