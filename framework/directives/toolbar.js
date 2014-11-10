/**
 * @ngdoc directive
 * @id toolbar
 * @name ons-toolbar
 * @description
 *  [en]Toolbar component that can be used with navigation. Left, center and right container can be specified by class names.[/en]
 *  [ja]ナビゲーションで使用するツールバー用コンポーネントです。クラス名により、左、中央、右のコンテナを指定できます。[/ja]
 * @param inline
 *  [en]Display the toolbar as an inline element.[/en]
 *  [ja]ツールバーをインラインに置きます。スクロール領域内にそのまま表示されます。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-bottom-toolbar [en]ons-bottom-toolbar component[/en][ja]ons-bottom-toolbarコンポーネント[/ja]
 * @seealso ons-back-button [en]ons-back-button component[/en][ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button [en]ons-toolbar-button component[/en][ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example 
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="left"><ons-back-button>Back</ons-back-button></div>
 *     <div class="center">Title</div>
 *     <div class="right">Label</div>
 *   </ons-toolbar>
 * </ons-page>
 */
(function() {
  'use strict';

  var module = angular.module('onsen');

  function ensureLeftContainer(element, modifierTemplater) {
    var container = element[0].querySelector('.left');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'left');
      container.innerHTML = '&nbsp;';
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__left')
      .addClass(modifierTemplater('navigation-bar--*__left'));

    return container;
  }

  function ensureCenterContainer(element, modifierTemplater) {
    var container = element[0].querySelector('.center');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'center');
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__title navigation-bar__center')
      .addClass(modifierTemplater('navigation-bar--*__center'));

    return container;
  }

  function ensureRightContainer(element, modifierTemplater) {
    var container = element[0].querySelector('.right');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'right');
      container.innerHTML = '&nbsp;';
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__right')
      .addClass(modifierTemplater('navigation-bar--*__right'));

    return container;
  }

  /**
   * @param {jqLite} element
   * @return {Boolean}
   */
  function hasCenterClassElementOnly(element) {
    var hasCenter = false;
    var hasOther = false;
    var child, children = element.contents();

    for (var i = 0; i < children.length; i++) {
      child = angular.element(children[i]);

      if (child.hasClass('center')) {
        hasCenter = true;
        continue;
      }

      if (child.hasClass('left') || child.hasClass('right')) {
        hasOther = true;
        continue;
      }

    }

    return hasCenter && !hasOther;
  }

  function ensureToolbarItemElements(element, modifierTemplater) {
    var center;
    if (hasCenterClassElementOnly(element)) {
      center = ensureCenterContainer(element, modifierTemplater);
      element.contents().remove();
      element.append(center);
    } else {
      center = ensureCenterContainer(element, modifierTemplater);
      var left = ensureLeftContainer(element, modifierTemplater);
      var right = ensureRightContainer(element, modifierTemplater);

      element.contents().remove();
      element.append(angular.element([left, center, right]));
    }
  }

  /**
   * Toolbar directive.
   */
  module.directive('onsToolbar', function($onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: false, 
      transclude: false,

      compile: function(element, attrs) {
        var shouldAppendAndroidModifier = ons.platform.isAndroid() && !element[0].hasAttribute('fixed-style');
        var modifierTemplater = $onsen.generateModifierTemplater(attrs, shouldAppendAndroidModifier ? ['android'] : []),
          inline = typeof attrs.inline !== 'undefined';

        element.addClass('navigation-bar');
        element.addClass(modifierTemplater('navigation-bar--*'));

        if (!inline) {
          element.css({
            'position': 'absolute',
            'z-index': '10000',
            'left': '0px',
            'right': '0px',
            'top': '0px'
          });
        }

        ensureToolbarItemElements(element, modifierTemplater);

        return {
          pre: function(scope, element, attrs) {
            var toolbar = new GenericView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, toolbar);
        
            $onsen.aliasStack.register('ons.toolbar', toolbar);

            scope.$on('$destroy', function() {
              toolbar._events = undefined;
              $onsen.removeModifierMethods(toolbar);
              element.data('ons-toolbar', undefined);
              $onsen.aliasStack.unregister('ons.toolbar', toolbar);
              element = null;
            });

            $onsen.addModifierMethods(toolbar, 'navigation-bar--*', element);
            angular.forEach(['left', 'center', 'right'], function(position) {
              var el = element[0].querySelector('.navigation-bar__' + position);
              if (el) {
                $onsen.addModifierMethods(toolbar, 'navigation-bar--*__' + position, angular.element(el));
              }
            });

            var pageView = element.inheritedData('ons-page');

            if (pageView && !inline) {
              pageView.registerToolbar(element);
            }

            element.data('ons-toolbar', toolbar);
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');  
          }
        };
      }
    };
  });

})();
