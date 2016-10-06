//HEAD 
(function(app) {
try { app = angular.module("templates-main"); }
catch(err) { app = angular.module("templates-main", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("templates/sliding_menu.tpl","<div class=\"onsen-sliding-menu__menu\"></div>\n" +
    "<div class=\"onsen-sliding-menu__main\"></div>\n" +
    "")

$templateCache.put("templates/split_view.tpl","<div class=\"onsen-split-view__secondary full-screen\"></div>\n" +
    "<div class=\"onsen-split-view__main full-screen\"></div>\n" +
    "")
}]);
})();