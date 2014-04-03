(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/bottom_toolbar.tpl",
    "<div class=\"onsen_bottom-toolbar topcoat-navigation-bar topcoat-navigation-bar--bottom ons-bottom-toolbar-inner {{modifierTemplater('topcoat-navigation-bar--*')}}\" ng-transclude></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/button.tpl",
    "<button class=\"{{item.animation}} topcoat-button--{{onsType}} effeckt-button topcoat-button no-select {{modifierTemplater('topcoat--button--*')}}\">\n" +
    "  <span class=\"label ons-button-inner\" ng-transclude></span>\n" +
    "  <span class=\"spinner topcoat-button__spinner {{modifierTemplater('topcoat-button--*__spinner')}}\"></span>\n" +
    "</button>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/checkbox.tpl",
    "<label class=\"topcoat-checkbox\" class=\"{{modifierTemplater('topcoat-checkbox--*')}}\">\n" +
    "  <input type=\"checkbox\" ng-model=\"ngModel\" ng-true-value=\"{{ngTrueValue || true}}\" ng-false-value=\"{{ngFalseValue || false}}\">\n" +
    "  <div class=\"topcoat-checkbox__checkmark {{modifierTemplater('topcoat-checkbox--*__checkmark')}}\"></div>\n" +
    "  <span class=\"ons-checkbox-inner\" ng-transclude>\n" +
    "  </span>\n" +
    "</label>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/column.tpl",
    "<div class=\"col col-{{align}} col-{{size}} col-{{offset}} ons-col-inner\"></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/icon.tpl",
    "<i class=\"fa fa-{{icon}} fa-{{size}} fa-{{spin}} fa-{{fixedWidth}} fa-rotate-{{rotate}} fa-flip-{{flip}}\"></i>");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/if_orientation.tpl",
    "<div ng-show=\"orientation == userOrientation\" class=\"ons-if-orientation-inner\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/if_platform.tpl",
    "<div class=\"ons-if-platform-inner\" ng-show=\"platform == userPlatform\" ng-transclude>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/list.tpl",
    "<div class=\"ons-scroller full-screen topcoat-page\" ons-scrollable>\n" +
    "  <div class=\"ons-scroller__content ons-scroller-inner\">\n" +
    "    <div class=\"topcoat-list {{modifierTemplater('topcoat-list--*')}}\">\n" +
    "      <ul class=\"topcoat-list__container {{modifierTemplater('topcoat-list--*__container')}} ons-list-inner\" ng-transclude>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/list_item.tpl",
    "<li class=\"topcoat-list__item {{modifierTemplater('topcoat-list__item--*')}} ons-list-item-inner\"></li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/navigator.tpl",
    "<div class=\"navigator-container\">\n" +
    "  <div ng-hide=\"hideToolbar\" class=\"topcoat-navigation-bar no-select navigator-toolbar relative {{modifierTemplater('topcoat-navigation-bar--*')}}\">\n" +
    "    <div class=\"navigator-toolbar__content relative {{modifierTemplater('topcoat-navigation-bar--*__content')}}\">\n" +
    "      <div class=\"onsen_navigator-item topcoat-navigation-bar__bg onsen_navigator__left-button-container transition hide {{modifierTemplater('topcoat-navigation-bar--*__bg')}}\">\n" +
    "        <span class=\"topcoat-icon-button--quiet left-section\">\n" +
    "          <i class=\"fa fa-angle-left fa-2x topcoat-navigation-bar__line-height {{modifierTemplater('topcoat-navigation-bar--*__line-height')}}\"></i>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"onsen_navigator__right-button onsen_navigator-item\">\n" +
    "        <span class=\"topcoat-icon-button--quiet right-section-icon\">\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"relative navigator-content topcoat-page__bg\">\n" +
    "  </div>    \n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/navigator_toolbar.tpl",
    "<div class=\"onse_navigator-toolbar\"></div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/page.tpl",
    "<div class=\"topcoat-page {{modifierTemplater('topcoat-page--*')}} ons-page-inner\" ng-transclude></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/radio_button.tpl",
    "<label class=\"topcoat-radio-button {{modifierTemplater('topcoat-radio-button--*')}}\">\n" +
    "  {{leftLabel}}\n" +
    "  <input type=\"radio\" name=\"{{name}}\" ng-model=\"ngModel\" value=\"{{value}}\">\n" +
    "  <div class=\"topcoat-radio-button__checkmark {{modifierTemplater('topcoat-radio-button--*')}}\"></div>\n" +
    "  {{rightLabel}}\n" +
    "</label>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/row.tpl",
    "<div class=\"row row-{{align}} ons-row-inner\"></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/screen.tpl",
    "<div class=\"ons-screen\" ng-transclude></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/scroller.tpl",
    "<div class=\"ons-scroller full-screen topcoat-page\" ons-scrollable>\n" +
    "  <div class=\"ons-scroller__content ons-scroller-inner\" ng-transclude>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/search_input.tpl",
    "<input type=\"search\" class=\"topcoat-search-input\">\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/sliding_menu.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "  <div ng-cloak class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "  <div class=\"behind full-screen ons-sliding-menu-inner\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"above full-screen ons-sliding-menu-inner\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/split_view.tpl",
    "<div class=\"sliding-menu full-screen\">\n" +
    "  <div class=\"onsen_sliding-menu-black-mask\"></div>\n" +
    "  <div class=\"secondary full-screen ons-split-view-inner\"></div>\n" +
    "\n" +
    "  <div class=\"main full-screen ons-split-view-inner\"></div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tab_bar.tpl",
    "<div style=\"margin-bottom: {{tabbarHeight}}\" class=\"tab-bar-content ons-tabbar-inner\"></div>\n" +
    "\n" +
    "<div ng-hide=\"hideTabs\" class=\"topcoat-tab-bar full footer {{modifierTemplater('topcoat-tab-bar--*')}} ons-tabbar-inner\" ng-transclude></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tab_bar_item.tpl",
    "<label class=\"topcoat-tab-bar__item no-select {{tabbarModifierTemplater('topcoat-tab-bar--*__item')}} {{modifierTemplater('topcoat-tab-bar__item--*')}}\">\n" +
    "  <input type=\"radio\" name=\"tab-bar-{{tabbarId}}\">\n" +
    "  <button class=\"topcoat-tab-bar__button full {{tabbarModifierTemplater('topcoat-tab-bar--*__button')}} {{modifierTemplater('topcoat-tab-bar__button--*')}}\" ng-click=\"setActive()\">\n" +
    "    <i ng-show=\"icon != undefined\" class=\"fa fa-2x fa-{{tabIcon}} {{tabIcon}}\"></i>\n" +
    "    <div class=\"onsen_tab-bar__label\" ng-class=\"{ big: icon === undefined }\">\n" +
    "      {{label}}\n" +
    "    </div>\n" +
    "  </button>\n" +
    "</label>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/text_area.tpl",
    "<textarea class=\"topcoat-textarea\"></textarea>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/text_input.tpl",
    "<input class=\"topcoat-text-input\">");
}]);
})();
