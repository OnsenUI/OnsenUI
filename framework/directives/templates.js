(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/back_button.tpl",
    "<span class=\"toolbar-button--quiet {{modifierTemplater('toolbar-button--*')}}\" ng-click=\"$root.ons.findParentComponentUntil('ons-navigator', $event).popPage()\" style=\"height: 44px; line-height: 0; padding: 0 10px 0 0; position: relative;\">\n" +
    "  <i class=\"ion-ios7-arrow-back ons-back-button__icon\" style=\"vertical-align: top; background-color: transparent; height: 44px; line-height: 44px; font-size: 36px; margin-left: 8px; margin-right: 2px; width: 16px; display: inline-block; padding-top: 1px;\"></i><span style=\"vertical-align: top; display: inline-block; line-height: 44px; height: 44px;\" class=\"back-button__label\"></span>\n" +
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
    "<span class=\"label ons-button-inner\"></span>\n" +
    "<span class=\"spinner button__spinner {{modifierTemplater('button--*__spinner')}}\"></span>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/dialog.tpl",
    "<div class=\"dialog-mask\"></div>\n" +
    "<div class=\"dialog\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/icon.tpl",
    "<i class=\"fa fa-{{icon}} fa-{{spin}} fa-{{fixedWidth}} fa-rotate-{{rotate}} fa-flip-{{flip}}\" ng-class=\"sizeClass\" ng-style=\"style\"></i>\n" +
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
  $templateCache.put("templates/sliding_menu.tpl",
    "<div class=\"onsen-sliding-menu__menu ons-sliding-menu-inner\"></div>\n" +
    "<div class=\"onsen-sliding-menu__main ons-sliding-menu-inner\"></div>\n" +
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
  $templateCache.put("templates/switch.tpl",
    "<label class=\"switch {{modifierTemplater('switch--*')}}\">\n" +
    "  <input type=\"checkbox\" class=\"switch__input {{modifierTemplater('switch--*__input')}}\" ng-model=\"model\">\n" +
    "  <div class=\"switch__toggle {{modifierTemplater('switch--*__toggle')}}\"></div>\n" +
    "</label>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tab.tpl",
    "<input type=\"radio\" name=\"tab-bar-{{tabbarId}}\" style=\"display: none\">\n" +
    "<button class=\"tab-bar__button tab-bar-inner {{tabbarModifierTemplater('tab-bar--*__button')}} {{modifierTemplater('tab-bar__button--*')}}\" ng-click=\"tryToChange()\">\n" +
    "</button>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/tab_bar.tpl",
    "<div class=\"ons-tab-bar__content tab-bar__content\"></div>\n" +
    "<div ng-hide=\"hideTabs\" class=\"tab-bar ons-tab-bar__footer {{modifierTemplater('tab-bar--*')}} ons-tabbar-inner\"></div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/toolbar_button.tpl",
    "<span class=\"toolbar-button {{modifierTemplater('toolbar-button--*')}} navigation-bar__line-height\" ng-transclude></span>\n" +
    "");
}]);
})();
