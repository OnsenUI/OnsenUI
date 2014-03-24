angular.module('templates-main', ['templates/bottom_toolbar.tpl', 'templates/button.tpl', 'templates/checkbox.tpl', 'templates/column.tpl', 'templates/icon.tpl', 'templates/if_orientation.tpl', 'templates/if_platform.tpl', 'templates/list.tpl', 'templates/list_item.tpl', 'templates/navigator.tpl', 'templates/navigator_toolbar.tpl', 'templates/page.tpl', 'templates/radio_button.tpl', 'templates/row.tpl', 'templates/scroller.tpl', 'templates/search_input.tpl', 'templates/select.tpl', 'templates/sliding_menu.tpl', 'templates/split_view.tpl', 'templates/tab_bar.tpl', 'templates/tab_bar_item.tpl', 'templates/text_area.tpl', 'templates/text_input.tpl']);

angular.module("templates/bottom_toolbar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bottom_toolbar.tpl",
    "<div class=\"onsen_bottom-toolbar topcoat-navigation-bar topcoat-navigation-bar--bottom {{modifierTemplater('topcoat-navigation-bar--*')}}\" ng-transclude></div>\n" +
    "");
}]);

angular.module("templates/button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/button.tpl",
    "<button class=\"{{item.animation}} topcoat-button--{{onsType}} effeckt-button topcoat-button no-select {{modifierTemplater('topcoat--button--*')}}\">\n" +
    "	<span class=\"label\" ng-transclude></span>\n" +
    "	<span class=\"spinner topcoat-button__spinner {{modifierTemplater('topcoat-button--*__spinner')}}\"></span>\n" +
    "</button>\n" +
    "");
}]);

angular.module("templates/checkbox.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/checkbox.tpl",
    "<label class=\"topcoat-checkbox\" class=\"{{modifierTemplater('topcoat-checkbox--*')}}\">\n" +
    "  <input type=\"checkbox\" ng-model=\"ngModel\" ng-true-value=\"{{ngTrueValue || true}}\" ng-false-value=\"{{ngFalseValue || false}}\">\n" +
    "  <div class=\"topcoat-checkbox__checkmark {{modifierTemplater('topcoat-checkbox--*__checkmark')}}\"></div>\n" +
    "  <span ng-transclude>\n" +
    "  	\n" +
    "  </span>\n" +
    "</label>\n" +
    "");
}]);

angular.module("templates/column.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/column.tpl",
    "<div class=\"col col-{{align}} col-{{size}} col-{{offset}}\"></div>");
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
    "<div class=\"scroller-wrapper full-screen page\" ons-scrollable>\n" +
    "	<div class=\"scroller\">\n" +
    "		<div class=\"topcoat-list {{modifierTemplater('topcoat-list--*')}}\">\n" +
    "			<ul class=\"topcoat-list__container {{modifierTemplater('topcoat-list--*__container')}}\" ng-transclude>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/list_item.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/list_item.tpl",
    "<li class=\"topcoat-list__item {{modifierTemplater('topcoat-list__item--*')}}\">\n" +
    "</li>\n" +
    "");
}]);

angular.module("templates/navigator.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navigator.tpl",
    "<div class=\"navigator-container\">\n" +
    "	<div ng-hide=\"hideToolbar\" class=\"topcoat-navigation-bar no-select navigator-toolbar relative {{modifierTemplater('topcoat-navigation-bar--*')}}\">\n" +
    "		<div class=\"navigator-toolbar__content relative {{modifierTemplater('topcoat-navigation-bar--*__content')}}\">\n" +
    "			<div class=\"onsen_navigator-item topcoat-navigation-bar__bg onsen_navigator__left-button-container transition hide {{modifierTemplater('topcoat-navigation-bar--*__bg')}}\">\n" +
    "				<span class=\"topcoat-icon-button--quiet left-section\">\n" +
    "					<i class=\"fa fa-angle-left fa-2x topcoat-navigation-bar__line-height {{modifierTemplater('topcoat-navigation-bar--*__line-height')}}\"></i>\n" +
    "				</span>\n" +
    "			</div>\n" +
    "			<div class=\"onsen_navigator__right-button onsen_navigator-item\">\n" +
    "				<span class=\"topcoat-icon-button--quiet right-section-icon\">\n" +
    "				</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"relative navigator-content topcoat-page__bg\">\n" +
    "	</div>    \n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/navigator_toolbar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navigator_toolbar.tpl",
    "<div class=\"onse_navigator-toolbar\"></div>");
}]);

angular.module("templates/page.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/page.tpl",
    "<div class=\"page topcoat-page {{modifierTemplater('topcoat-page--*')}}\" ng-transclude></div>\n" +
    "");
}]);

angular.module("templates/radio_button.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/radio_button.tpl",
    "<label class=\"topcoat-radio-button {{modifierTemplater('topcoat-radio-button--*')}}\">\n" +
    "	{{leftLabel}}\n" +
    "	<input type=\"radio\" name=\"{{name}}\" ng-model=\"ngModel\" value=\"{{value}}\">\n" +
    "	<div class=\"topcoat-radio-button__checkmark {{modifierTemplater('topcoat-radio-button--*')}}\"></div>\n" +
    "	{{rightLabel}}\n" +
    "</label>\n" +
    "");
}]);

angular.module("templates/row.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/row.tpl",
    "<div class=\"row row-{{align}}\"></div>");
}]);

angular.module("templates/scroller.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/scroller.tpl",
    "<div class=\"scroller-wrapper full-screen page\" ons-scrollable>\n" +
    "	<div class=\"scroller\" ng-transclude>\n" +
    "		\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/search_input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search_input.tpl",
    "<input type=\"search\" class=\"topcoat-search-input\">\n" +
    "");
}]);

angular.module("templates/select.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/select.tpl",
    "<select class=\"topcoat-text-input {{modifierTemplater('topcoat-text-input--*')}}\" ng-transclude>\n" +
    "</select>\n" +
    "");
}]);

angular.module("templates/sliding_menu.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/sliding_menu.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "	<div ng-cloak class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "	<div class=\"behind full-screen\">\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"above full-screen\">\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/split_view.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/split_view.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "	<div class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "	<div class=\"secondary full-screen\"></div>\n" +
    "\n" +
    "	<div class=\"main full-screen\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/tab_bar.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tab_bar.tpl",
    "<div style=\"margin-bottom: {{tabbarHeight}}\" class=\"tab-bar-content\"></div>\n" +
    "\n" +
    "<div ng-hide=\"hideTabs\" class=\"topcoat-tab-bar full footer {{modifierTemplater('topcoat-tab-bar--*')}}\" ng-transclude></div>\n" +
    "");
}]);

angular.module("templates/tab_bar_item.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tab_bar_item.tpl",
    "<label class=\"topcoat-tab-bar__item no-select {{tabbarModifierTemplater('topcoat-tab-bar--*__item')}} {{modifierTemplater('topcoat-tab-bar__item--*')}}\">\n" +
    "	<input type=\"radio\" name=\"tab-bar-{{tabbarId}}\">\n" +
    "	<button class=\"topcoat-tab-bar__button full {{tabbarModifierTemplater('topcoat-tab-bar--*__button')}} {{modifierTemplater('topcoat-tab-bar__button--*')}}\" ng-click=\"setActive()\">\n" +
    "		<i ng-show=\"icon != undefined\" class=\"fa fa-2x fa-{{tabIcon}} {{tabIcon}}\"></i>\n" +
    "		<div class=\"onsen_tab-bar__label\" ng-class=\"{ big: icon === undefined }\">\n" +
    "			{{label}}\n" +
    "		</div>\n" +
    "	</button>\n" +
    "</label>\n" +
    "");
}]);

angular.module("templates/text_area.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/text_area.tpl",
    "<textarea class=\"topcoat-textarea\"></textarea>\n" +
    "");
}]);

angular.module("templates/text_input.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/text_input.tpl",
    "<input class=\"topcoat-text-input\">");
}]);
