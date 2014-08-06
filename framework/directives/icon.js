/**
 * @ngdoc directive
 * @id icon
 * @name ons-icon
 * @description
 *    [en]Displays an icon. Can be specified from Font Awesome lineups.[/en]
 *    [ja]アイコンを表示するコンポーネントです。Font Awesomeから選択できます。[/ja]
 * @param icon
 *    [en]The icon name. set the icon name without `fa-` prefix. eg. to use fa-home icon, set it to "home". See all icons: http://fontawesome.io/icons/.[/en]
 *    [ja]アイコン名を指定します。先頭の`fa-`の部分は取り除いてください。使用できるアイコンはこちら: http://fontawesome.io/icons/。[/ja]
 * @param size
 *    [en]The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in pixels.[/en]
 *    [ja]アイコンのサイズを指定します。値は、lg, 2x, 3x, 4x, 5xもしくはピクセル単位で指定できます。[/ja]
 * @param rotate
 *    [en]The degree to rotate the icon. Valid values are 90, 180, or 270.[/en]
 *    [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
 * @param flip
 *    [en]Flip the icon. Valid values are horizontal and vertical.[/en]
 *    [ja]アイコンを反転します。horizontalもしくはverticalを指定できます。[/ja]
 * @param fixed-width
 *    [en]When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are true, false. Default is true.[/en]
 *    [ja]リスト内で使う場合に、trueを指定すると縦に整列します。trueもしくはfalseを指定できます。デフォルトはtrueです。[/ja]
 * @param spin
 *    [en]Whether to spin the icon. Valid values are true and false.[/en]
 *    [ja]アイコンを回転するかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 * @codepen xAhvg
 * @guide UsingIcons [en]Using icons[/en][ja]アイコンを使う[/ja]
 */
(function(){
  'use strict';

  var module = angular.module('onsen');

  function cleanClassAttribute(element) {
    var classList = ('' + element.attr('class')).split(/ +/).filter(function(classString) {
      return classString !== 'fa' && classString.substring(0, 3) !== 'fa-';
    });

    element.attr('class', classList.join(' '));
  }

  function buildClassAndStyle(attrs) {
    var classList = [];
    var style = {};

    // size
    var size = '' + attrs.size;
    if (size.match(/^[1-5]x|lg$/)) {
      classList.push('fa-' + size);
    } else if (typeof attrs.size === 'string') {
      style['font-size'] = size;
    } else {
      classList.push('fa-lg');
    }

    // icon
    if (attrs.icon.indexOf('ion-') === 0) {
      classList.push(attrs.icon);
    } else if (attrs.icon.indexOf('fa-') === 0) {
      classList.push(attrs.icon);
      classList.push('fa');
    } else {
      classList.push('fa');
      classList.push('fa-' + attrs.icon);
    }
    
    // rotate
    if (attrs.rotate === '90' || attrs.rotate === '180' || attrs.rotate === '270') {

      classList.push('fa-rotate-' + attrs.rotate);
    }

    // flip
    if (attrs.flip === 'horizontal' || attrs.flip === 'vertical') {
      classList.push('fa-flip-' + attrs.flip);
    }

    // fixed-width
    if (attrs.fixedWidth !== 'false') {
      classList.push('fa-fw');
    }

    // spin
    if (attrs.spin === 'true') {
      classList.push('fa-spin');
    }

    return {
      'class': classList.join(' '),
      'style': style
    };
  }

  module.directive('onsIcon', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      link: function(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var update = function() {
          cleanClassAttribute(element);

          var builded = buildClassAndStyle(attrs);
          element.css(builded.style);
          element.addClass(builded['class']);
        };

        var builded = buildClassAndStyle(attrs);
        element.css(builded.style);
        element.addClass(builded['class']);

        attrs.$observe('icon', update);
        attrs.$observe('size', update);
        attrs.$observe('fixedWidth', update);
        attrs.$observe('rotate', update);
        attrs.$observe('flip', update);
        attrs.$observe('spin', update);

        $onsen.cleaner.onDestroy(scope, function() {
          $onsen.clearComponent({
            scope: scope,
            element: element,
            attrs: attrs
          });
          element = scope = attrs = null;
        });
      }
    };
  });
})();

