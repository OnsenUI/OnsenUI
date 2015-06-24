(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/dialog.tpl',
    '<div class="dialog-mask"></div>\n' +
    '<div class="dialog {{ modifierTemplater(\'dialog--*\') }}"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/popover.tpl',
    '<div class="popover-mask"></div>\n' +
    '<div class="popover popover--{{ direction }} {{ modifierTemplater(\'popover--*\') }}">\n' +
    '  <div class="popover__content {{ modifierTemplater(\'popover__content--*\') }}"></div>\n' +
    '  <div class="popover__{{ arrowPosition }}-arrow"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/sliding_menu.tpl',
    '<div class="onsen-sliding-menu__menu ons-sliding-menu-inner"></div>\n' +
    '<div class="onsen-sliding-menu__main ons-sliding-menu-inner"></div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/split_view.tpl',
    '<div class="onsen-split-view__secondary full-screen ons-split-view-inner"></div>\n' +
    '<div class="onsen-split-view__main full-screen ons-split-view-inner"></div>\n' +
    '');
}]);
})();
