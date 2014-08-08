'use strict';

// directive for rendering component html & css in iframe element.
angular.module('app').directive('colorPickerPopup', function($window) {
  var target = null;
  var miniColorPicker = null;
  var colorInput = null;

  function initColorPicker(element, callback) {

    colorInput = $('input.color-picker-input', element).on('keyup change', function() {
      // input要素が変更された時にパースしてカラーピッカーに反映する
      var color = parseCSSColor($(this).val().trim().replace(/ /g, ''));

      if (color) {
        miniColorPicker.minicolors('value', toHexColorString.apply(null, color)).minicolors('opacity', color[3]);
      }
    });

    miniColorPicker = $('input.mini-color-picker', element).minicolors({
      animationSpeed: 0,
      control: 'hue',
      defaultValue: '#ffffff',
      inline: true,
      letterCase: 'lowercase',
      opacity: true,
      position: 'bottom left',
      changeDelay: 20,
      change: function(colorHex, opacity) {
          var needChangeTextInput = function() {
            var inputColor = parseCSSColor(colorInput.val());
            var pickerColorRGBAString = miniColorPicker.minicolors('rgbaString');
            var pickerColor = parseCSSColor(pickerColorRGBAString);

            if (!inputColor || !pickerColor) {
              return true;
            }

            for (var i = 0; i < inputColor.length; i++) {
              if (inputColor[i] !== pickerColor[i]) {
                return true;
              }
            }

            return false;
          };

          if (needChangeTextInput()) {
            if (opacity >= 1) {
              colorInput.val(colorHex.substring(0, 7));
            } else {
              colorInput.val($(this).minicolors('rgbaString'));
            }
          }

          var color = $(this).minicolors('rgbaString');

          callback(color, normalizeColor(color));

          if (target) {
            $(target).css('background-color', $(this).minicolors('rgbaString'));
          }
      },
      theme: 'default'
    });
  }

  function normalizeColor(colorString) {
    var color = parseCSSColor(colorString);

    return color[3] === 1 ?
      toHexColorString.apply(null, color) :
      toRgbaColorString.apply(null, color);
  }

  function pad(str) {
    str = '00' + str;
    return str.substring(str.length - 2, str.length);
  }

  function toHexColorString(red, green, blue) {
    return '#' + pad(red.toString(16)) + pad(green.toString(16)) + pad(blue.toString(16));
  }

  function toRgbaColorString(red, green, blue, alpha) {
    return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
  }

  return {
    restrict: 'E',

    scope: {
      target: '=',
      show: '=',
      onColorChanged: '&'
    },

    template:
      '<div class="color-picker-popup-mask" ng-click="show = false" ng-show="show"></div>' +
      '<div class="color-picker-popup" ng-show="show">' +
        '<img src="/images/close.png" class="close" ng-click="show = false">'+
        '<input type="text" name="color" class="color-picker-input" value="#ffffff">' +
        '<input type="text" class="mini-color-picker">' +
      '</div>',

    link: function(scope, element/* , attrs, controller */) {
      initColorPicker(element[0], function(color, normalizedColor){
        scope.onColorChanged({
          $color: normalizedColor
        });
      });

      scope.$watch('target', function(currentTarget) {
        target = currentTarget;
        if (target) {

          var windowHeight = $window.innerHeight;
          var position = target.getBoundingClientRect();

          if ((windowHeight - position.bottom) < $('.color-picker-popup', element[0]).height()) {
            $('.color-picker-popup', element[0]).css({left: position.left + position.width / 2, top: position.top}).addClass('flipped');
          } else {
            $('.color-picker-popup', element[0]).css({left: position.left + position.width / 2, top: position.bottom}).removeClass('flipped');
          }

          colorInput.val(normalizeColor($(target).css('background-color'))).change();
        }
      });
    }
  };

});
