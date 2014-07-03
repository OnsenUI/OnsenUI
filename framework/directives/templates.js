(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/back_button.tpl",
    "<span class=\"icon-button--quiet {{modifierTemplater('icon-button--quiet--*')}}\" ng-click=\"$root.ons.getDirectiveObject('ons-navigator', $event).popPage()\" style=\"height: 44px; line-height: 0; padding: 0; position: relative;\">\n" +
    "  <i class=\"fa fa-angle-left ons-back-button__icon\" style=\"vertical-align: top; line-height: 44px; font-size: 36px; padding-left: 8px; padding-right: 4px; height: 44px;\"></i><span style=\"vertical-align: top; display: inline-block; line-height: 44px; height: 44px;\" class=\"back-button__label\"></span>\n" +
    "</span>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/button.tpl",
    "<button class=\"{{item.animation}} button--{{onsType}} effeckt-button button no-select {{modifierTemplater('button--*')}}\">\n" +
    "  <span class=\"label ons-button-inner\" ng-transclude></span>\n" +
    "  <span class=\"spinner button__spinner {{modifierTemplater('button--*__spinner')}}\"></span>\n" +
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
    "<label class=\"checkbox\" class=\"{{modifierTemplater('checkbox--*')}}\">\n" +
    "  <input type=\"checkbox\" ng-model=\"ngModel\" ng-true-value=\"{{ngTrueValue || true}}\" ng-false-value=\"{{ngFalseValue || false}}\">\n" +
    "  <div class=\"checkbox__checkmark {{modifierTemplater('checkbox--*__checkmark')}}\"></div>\n" +
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
    "<div class=\"list {{modifierTemplater('list--*')}}\">\n" +
    "  <ul class=\"list__container {{modifierTemplater('list--*__container')}} ons-list-inner\">\n" +
    "  </ul>\n" +
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
    "<li class=\"list__item {{modifierTemplater('list__item--*')}} ons-list-item-inner\"></li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/radio_button.tpl",
    "<label class=\"radio-button {{modifierTemplater('radio-button--*')}}\">\n" +
    "  {{leftLabel}}\n" +
    "  <input type=\"radio\" name=\"{{name}}\" ng-model=\"ngModel\" value=\"{{value}}\">\n" +
    "  <div class=\"radio-button__checkmark {{modifierTemplater('radio-button--*')}}\"></div>\n" +
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
    "<div class=\"ons-screen\"></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/scroller.tpl",
    "<div class=\"ons-scroller__content ons-scroller-inner\" ng-transclude></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/search_input.tpl",
    "<input type=\"search\" class=\"search-input\">\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/sliding_menu.tpl",
    "<div class=\"onsen-sliding-menu__behind ons-sliding-menu-inner\"></div>\n" +
    "<div class=\"onsen-sliding-menu__above ons-sliding-menu-inner\"></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/split_view.tpl",
    "<div class=\"onsen-split-view__secondary full-screen ons-split-view-inner\"></div>\n" +
    "<div class=\"onsen-split-view__main full-screen ons-split-view-inner\"></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tab_bar.tpl",
    "<div style=\"margin-bottom: {{tabbarHeight}}\" class=\"ons-tab-bar__content\"></div>\n" +
    "<div ng-hide=\"hideTabs\" class=\"tab-bar ons-tab-bar__footer {{modifierTemplater('tab-bar--*')}} ons-tabbar-inner\" ng-transclude></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tab_bar_item.tpl",
    "<label class=\"tab-bar__item no-select {{tabbarModifierTemplater('tab-bar--*__item')}} {{modifierTemplater('tab-bar__item--*')}}\">\n" +
    "  <input type=\"radio\" name=\"tab-bar-{{tabbarId}}\" ng-click=\"setActive()\">\n" +
    "  <button class=\"tab-bar__button {{tabbarModifierTemplater('tab-bar--*__button')}} {{modifierTemplater('tab-bar__button--*')}}\" ng-click=\"setActive()\">\n" +
    "    <i ng-show=\"icon != undefined\" class=\"tab-bar__icon fa fa-2x fa-{{tabIcon}} {{tabIcon}}\"></i>\n" +
    "    <div class=\"tab-bar__label\">{{label}}</div>\n" +
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
    "<textarea class=\"textarea\"></textarea>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/text_input.tpl",
    "<input class=\"text-input\">\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/toolbar_button.tpl",
    "<span class=\"icon-button--quiet {{modifierTemplater('icon-button--quiet--*')}} navigation-bar__line-height\" ng-transclude></span>\n" +
    "");
}]);
})();
