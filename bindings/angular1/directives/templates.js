//HEAD 
(function(app) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("templates/sliding_menu.tpl","<div class=\"onsen-sliding-menu__menu ons-sliding-menu-inner\"></div>\n" +
    "<div class=\"onsen-sliding-menu__main ons-sliding-menu-inner\"></div>\n" +
    "")

$templateCache.put("templates/split_view.tpl","<div class=\"onsen-split-view__secondary full-screen ons-split-view-inner\"></div>\n" +
    "<div class=\"onsen-split-view__main full-screen ons-split-view-inner\"></div>\n" +
    "")
}]);
})();