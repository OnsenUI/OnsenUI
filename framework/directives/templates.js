angular.module('templates-main', ['templates/button.tpl', 'templates/checkbox.tpl', 'templates/list.tpl', 'templates/list_item.tpl', 'templates/navigator.tpl', 'templates/radio_button.tpl', 'templates/screen.tpl', 'templates/scroller.tpl', 'templates/search_input.tpl', 'templates/select.tpl', 'templates/sliding_menu.tpl', 'templates/tab_bar.tpl', 'templates/tab_bar_item.tpl', 'templates/text_area.tpl', 'templates/text_input.tpl']);

angular.module("templates/button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/button.tpl",
    "<button ng-class=\"'topcoat-button--{{type}}'\" class=\"{{item.animation}} effeckt-button topcoat-button no-select\">\n" +
    "	<span class=\"label\" ng-transclude></span>\n" +
    "	<span class=\"spinner\"></span>\n" +
    "</button>\n" +
    "\n" +
    "");
}]);

angular.module("templates/checkbox.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/checkbox.tpl",
    "<label class=\"topcoat-checkbox\">\n" +
    "  <input type=\"checkbox\" ng-model=\"ngModel\" ng-true-value=\"{{ngTrueValue || true}}\" ng-false-value=\"{{ngFalseValue || false}}\">\n" +
    "  <div class=\"topcoat-checkbox__checkmark\"></div>\n" +
    "  <span ng-transclude>\n" +
    "  	\n" +
    "  </span>\n" +
    "</label>");
}]);

angular.module("templates/list.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/list.tpl",
    "<div class=\"scroller-wrapper page\" ons-scrollable>\n" +
    "	<div class=\"scroller\">\n" +
    "		<div class=\"topcoat-list__container\" ng-class=\"theme + '-container'\">\n" +
    "			<ul class=\"topcoat-list\" ng-class=\"theme + '-list'\" ng-transclude>\n" +
    "\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/list_item.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/list_item.tpl",
    "<li class=\"topcoat-list__item\">\n" +
    "		    		\n" +
    "</li>");
}]);

angular.module("templates/navigator.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navigator.tpl",
    "<div class=\"navigator-container\">	\n" +
    "	<div ng-hide=\"hideToolbar\" class=\"topcoat-navigation-bar no-select navigator-toolbar\">\n" +
    "	    <div class=\"topcoat-navigation-bar__item left quarter\">\n" +
    "	        <span ng-click=\"leftButtonClicked();\" class=\"topcoat-icon-button--quiet\" ng-hide=\"leftButtonIcon === '' || leftButtonIcon === undefined\" style=\"vertical-align: middle\">\n" +
    "	        	<i class=\"icon-2x\" ng-class=\"leftButtonIcon\"></i>\n" +
    "	        </span>\n" +
    "	    </div> \n" +
    "	    <div class=\"topcoat-navigation-bar__item center half\">\n" +
    "	        <span class=\"topcoat-navigation-bar__title\">{{navigationItem.title}}</span>        \n" +
    "	    </div> \n" +
    "	    <div class=\"topcoat-navigation-bar__item right quarter\">\n" +
    "	        <span ng-click=\"rightButtonClicked();\" class=\"topcoat-icon-button--quiet\" ng-hide=\"rightButtonIcon === '' || rightButtonIcon === undefined\" style=\"vertical-align: middle\">\n" +
    "	          <i class=\"icon-2x\" ng-class=\"rightButtonIcon\"></i>\n" +
    "	        </span>\n" +
    "	    </div>\n" +
    "	</div>	\n" +
    "	<div class=\"relative max navigator-content\">\n" +
    "		<ng-include class=\"content\" src=\"navigationItem.source\" ng-animate=\"animation\"></ng-include>\n" +
    "	</div>    \n" +
    "	\n" +
    "</div>");
}]);

angular.module("templates/radio_button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/radio_button.tpl",
    "<label class=\"topcoat-radio-button\">\n" +
    "	{{leftLabel}}\n" +
    "	<input type=\"radio\" name=\"{{name}}\" ng-model=\"ngModel\" value=\"{{value}}\">\n" +
    "	<div class=\"topcoat-radio-button__checkmark\"></div>\n" +
    "	{{rightLabel}}\n" +
    "</label>");
}]);

angular.module("templates/screen.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/screen.tpl",
    "<div class=\"screen\">\n" +
    "</div>");
}]);

angular.module("templates/scroller.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/scroller.tpl",
    "<div class=\"scroller-wrapper page\" ons-scrollable>\n" +
    "	<div class=\"scroller\">\n" +
    "		<div ng-transclude>\n" +
    "			\n" +
    "		</div>		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/search_input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search_input.tpl",
    "<input type=\"search\" class=\"topcoat-search-input\">");
}]);

angular.module("templates/select.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/select.tpl",
    "<select class=\"topcoat-text-input\" ng-transclude>\n" +
    "</select>");
}]);

angular.module("templates/sliding_menu.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/sliding_menu.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "	<ng-include ng-cloak src=\"pages.behind\" class=\"behind full-screen\">\n" +
    "	</ng-include>\n" +
    "\n" +
    "	<ng-include src=\"pages.above\" class=\"above full-screen\">\n" +
    "	</ng-include>\n" +
    "</div>");
}]);

angular.module("templates/tab_bar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tab_bar.tpl",
    "  <ng-include src=\"selectedTabItem.source\" style=\"margin-bottom: {{tabbarHeight}}\" class=\"tab-bar-content\">\n" +
    "    \n" +
    "  </ng-include>\n" +
    "  <div ng-hide=\"hideTabbar\" class=\"topcoat-tab-bar full footer\" ng-transclude>         \n" +
    "  </div>\n" +
    "\n" +
    "");
}]);

angular.module("templates/tab_bar_item.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tab_bar_item.tpl",
    "<label class=\"topcoat-tab-bar__item no-select\">\n" +
    "	<input type=\"radio\" name=\"tab-bar\">\n" +
    "	<button class=\"topcoat-tab-bar__button full\" ng-click=\"setActive()\" ng-transclude></button>\n" +
    "</label>\n" +
    "");
}]);

angular.module("templates/text_area.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/text_area.tpl",
    "<textarea class=\"topcoat-textarea\"></textarea>");
}]);

angular.module("templates/text_input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/text_input.tpl",
    "<input type=\"text\" class=\"topcoat-text-input\">");
}]);
