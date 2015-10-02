/**
 * @ngdoc directive
 * @id toolbar
 * @name ons-toolbar
 * @category toolbar
 * @modifier transparent
 *   [en]Transparent toolbar[/en]
 *   [ja]透明な背景を持つツールバーを表示します。[/ja]
 * @modifier android
 *   [en]Android style toolbar. Title is left-aligned.[/en]
 *   [ja]Androidライクなツールバーを表示します。タイトルが左に寄ります。[/ja]
 * @description
 *   [en]Toolbar component that can be used with navigation. Left, center and right container can be specified by class names.[/en]
 *   [ja]ナビゲーションで使用するツールバー用コンポーネントです。クラス名により、左、中央、右のコンテナを指定できます。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-bottom-toolbar
 *   [en]ons-bottom-toolbar component[/en]
 *   [ja]ons-bottom-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button
 *   [en]ons-toolbar-button component[/en]
 *   [ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="left"><ons-back-button>Back</ons-back-button></div>
 *     <div class="center">Title</div>
 *     <div class="right">Label</div>
 *   </ons-toolbar>
 * </ons-page>
 */

/**
 * @ngdoc attribute
 * @name var
 * @initonly
 * @extensionOf angular
 * @type {String}
 * @description
 *  [en]Variable name to refer this toolbar.[/en]
 *  [ja]このツールバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @initonly
 * @description
 *   [en]Display the toolbar as an inline element.[/en]
 *   [ja]ツールバーをインラインに置きます。スクロール領域内にそのまま表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @description
 *   [en]The appearance of the toolbar.[/en]
 *   [ja]ツールバーの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-style
 * @initonly
 * @description
 *   [en]
 *     By default the center element will be left-aligned on Android and center-aligned on iOS.
 *     Use this attribute to override this behavior so it's always displayed in the center.
 *   [/en]
 *   [ja]
 *     このコンポーネントは、Androidではタイトルを左寄せ、iOSでは中央配置します。
 *     この属性を使用すると、要素はAndroidとiOSともに中央配置となります。
 *   [/ja]
 */

(function() {
  'use strict';

  angular.module('onsen').directive('onsToolbar', function($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element) {
        CustomElements.upgrade(element[0]);
        return {
          pre: function(scope, element, attrs) {
            // TODO: Remove this dirty fix!
            if (element[0].nodeName === 'ons-toolbar') {
              CustomElements.upgrade(element[0]);
              GenericView.register(scope, element, attrs, {viewKey: 'ons-toolbar'});
              element[0]._ensureNodePosition();
            }
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  });

})();
