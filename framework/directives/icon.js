/**
 * @ngdoc directive
 * @id icon
 * @name ons-icon
 * @description
 * Wrapper for font-awesome icon.
 * @param icon The icon name. set the icon name without "fa-" prefix. eg. to use "fa-home" icon, set it to "home". See all icons: http://fontawesome.io/icons/.
 * @param size The sizes of the icon. Valid values are [lg/2x/3x/4x/5x] or css font-size value.
 * @param rotate The degree to rotate the icon. Valid values are [90/180/270]
 * @param flip Flip the icon. Valid values are [horizontal/vertical]
 * @param fixed-width When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are [true/false]. Default is true.
 * @param spin Whether to spin the icon. Valid values are [true/false]
 * @codepen xAhvg
 * @guide using-icons Using icons
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
    var classList = ['fa'];
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
    classList.push('fa-' + attrs.icon);
    
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
      link: function($scope, element, attrs) {

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
      }
    };
  });
})();

