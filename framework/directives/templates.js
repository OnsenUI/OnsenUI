(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/back_button.tpl',
    '<span \n' +
    '  class="toolbar-button--quiet {{modifierTemplater(\'toolbar-button--*\')}}" \n' +
    '  ng-click="$root.ons.findParentComponentUntil(\'ons-navigator\', $event).popPage({cancelIfRunning: true})" \n' +
    '  ng-show="showBackButton"\n' +
    '  style="height: 44px; line-height: 0; padding: 0 10px 0 0; position: relative;">\n' +
    '  \n' +
    '  <i \n' +
    '    class="ion-ios-arrow-back ons-back-button__icon" \n' +
    '    style="vertical-align: top; background-color: transparent; height: 44px; line-height: 44px; font-size: 36px; margin-left: 8px; margin-right: 2px; width: 16px; display: inline-block; padding-top: 1px;"></i>\n' +
    '\n' +
    '  <span \n' +
    '    style="vertical-align: top; display: inline-block; line-height: 44px; height: 44px;" \n' +
    '    class="back-button__label"></span>\n' +
    '</span>\n' +
    '');
}]);
})();

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
