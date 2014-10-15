/**
 * @ngdoc directive
 * @id loading-placeholder 
 * @name ons-loading-placeholder
 * @description
 *    [en]Display a placeholder while the content is loading.[/en]
 *    [ja][/ja]
 * @param ons-loading-placeholder 
 *    [en]The url of the page to load.[/en]
 *    [ja][/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-loading-placeholder="page.html">
 *   Loading...
 * </div>
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsLoadingPlaceholder', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      link: function(scope, element, attrs) {
        $onsen.getPageHTMLAsync(attrs.onsLoadingPlaceholder).then(function(html) {
          element[0].innerHTML = html.trim(); 
        });
      }
    };
  });
})();

