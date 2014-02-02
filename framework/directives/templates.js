angular.module('templates-main', ['templates/bottom_toolbar.tpl', 'templates/button.tpl', 'templates/checkbox.tpl', 'templates/column.tpl', 'templates/icon.tpl', 'templates/if_orientation.tpl', 'templates/if_platform.tpl', 'templates/list.tpl', 'templates/list_item.tpl', 'templates/navigator.tpl', 'templates/navigator_toolbar.tpl', 'templates/page.tpl', 'templates/radio_button.tpl', 'templates/row.tpl', 'templates/screen.tpl', 'templates/scroller.tpl', 'templates/search_input.tpl', 'templates/select.tpl', 'templates/sliding_menu.tpl', 'templates/split_view.tpl', 'templates/tab_bar.tpl', 'templates/tab_bar_item.tpl', 'templates/text_area.tpl', 'templates/text_input.tpl']);

angular.module("templates/bottom_toolbar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bottom_toolbar.tpl",
    "<div class=\"onsen_bottom-toolbar topcoat-navigation-bar\" ng-transclude></div>");
}]);

angular.module("templates/button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/button.tpl",
    "<button ng-class=\"'topcoat-button--{{type}}'\" class=\"{{item.animation}} effeckt-button topcoat-button no-select\">\n" +
    "	<span class=\"label\" ng-transclude></span>\n" +
    "	<span class=\"spinner topcoat-button__spinner\"></span>\n" +
    "</button>");
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

angular.module("templates/column.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/column.tpl",
    "<div class=\"col col-{{align}} col-{{size}} col-{{offset}}\" ng-transclude></div>");
}]);

angular.module("templates/icon.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/icon.tpl",
    "<i class=\"fa fa-{{icon}} fa-{{size}} fa-{{spin}} fa-{{fixedWidth}} fa-rotate-{{rotate}} fa-flip-{{flip}}\"></i>");
}]);

angular.module("templates/if_orientation.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/if_orientation.tpl",
    "<div ng-show=\"orientation == userOrientation\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/if_platform.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/if_platform.tpl",
    "<div ng-show=\"platform == userPlatform\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/list.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/list.tpl",
    "<div class=\"scroller-wrapper full-screen\" ons-scrollable>\n" +
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
    "	<div ng-hide=\"hideToolbar\" class=\"topcoat-navigation-bar no-select navigator-toolbar relative\">	 \n" +
    "		<div class=\"navigator-toolbar__content relative\">\n" +
    "			<div class=\"onsen_navigator-item topcoat-navigation-bar__bg onsen_navigator__left-button-container transition hide\">\n" +
    "				<span id=\"left-section\" class=\"topcoat-icon-button--quiet\">\n" +
    "					<i class=\"fa fa-angle-left fa-2x topcoat-navigation-bar__line-height\"></i>\n" +
    "				</span>			\n" +
    "			</div>		\n" +
    "			<div class=\"onsen_navigator__right-button onsen_navigator-item\">\n" +
    "				<span id=\"right-section-icon\" class=\"topcoat-icon-button--quiet\">\n" +
    "				</span>\n" +
    "\n" +
    "			</div>\n" +
    "		</div>	\n" +
    "	</div>\n" +
    "	<div class=\"relative navigator-content topcoat-page__bg\">\n" +
    "		\n" +
    "	</div>    \n" +
    "	\n" +
    "</div>");
}]);

angular.module("templates/navigator_toolbar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navigator_toolbar.tpl",
    "<div class=\"onse_navigator-toolbar\"></div>");
}]);

angular.module("templates/page.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/page.tpl",
    "<div class=\"page\" ng-transclude></div>");
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

angular.module("templates/row.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/row.tpl",
    "<div class=\"row row-{{align}}\" ng-transclude></div>");
}]);

angular.module("templates/screen.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/screen.tpl",
    "<div class=\"screen\">\n" +
    "</div>");
}]);

angular.module("templates/scroller.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/scroller.tpl",
    "<div class=\"scroller-wrapper full-screen\" ons-scrollable>\n" +
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
    "	<div ng-cloak class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "	<div class=\"behind full-screen\">\n" +
    "		<ng-include class=\"full-screen\" class=\"page\" ng-cloak src=\"pages.behind\">\n" +
    "		</ng-include>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"above full-screen\">		\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("templates/split_view.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/split_view.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "	<div class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "	<div class=\"secondary full-screen\">\n" +
    "		<ng-include ng-cloak src=\"pages.behind\" class=\"page\">\n" +
    "		</ng-include>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"main full-screen\">\n" +
    "		\n" +
    "	</div>\n" +
    "	\n" +
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
    "	<button class=\"topcoat-tab-bar__button full\" ng-click=\"setActive()\">\n" +
    "		<i ng-show=\"icon != undefined\" class=\"fa fa-2x fa-{{icon}} {{icon}}\"></i>\n" +
    "		<div class=\"onsen_tab-bar__label\" ng-class=\"{ big: icon === undefined }\">\n" +
    "			{{label}}\n" +
    "		</div>\n" +
    "	</button>\n" +
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
