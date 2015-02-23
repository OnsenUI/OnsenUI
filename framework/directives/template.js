/**
 * @ngdoc directive
 * @id template
 * @name ons-template
 * @category util
 * @description
 *   [en]Define a separate HTML fragment and use as a template.[/en]
 *   [ja]テンプレートとして使用するためのHTMLフラグメントを定義します。この要素でHTMLを宣言すると、id属性に指定した名前をpageのURLとしてons-navigatorなどのコンポーネントから参照できます。[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-template id="foobar.html">
 *   ...
 * </ons-template>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTemplate', function($onsen, $templateCache) {
    return {
      restrict: 'E',
      transclude: false,
      priority: 1000,
      terminal: true,
      compile: function(element) {
        $templateCache.put(element.attr('id'), element.remove().html());
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  });
})();
