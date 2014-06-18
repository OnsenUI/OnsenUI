'use strict';

angular.module('app').directive('patternIframe', function($rootScope, GeneratedCss) {

  var isComponentsCssLink = function(linkElement) {
      var href = linkElement.href;
      return href.match(/ios7|onsen-css-components/) || ('' + href).match(/^blob/);
  };

  // replace css link element for generated CSS
  var replaceCssUrl = function(element, url) {
    if (element[0].contentDocument) {

      var body = $(element[0].contentDocument.body).addClass('no-transition');

      setTimeout(function() {
        body.removeClass('no-transition');
      }, 300);

      $('link[rel=stylesheet]', element[0].contentDocument).filter(function() {
        return isComponentsCssLink(this);
      }).each(function() {
        this.href = url;
      });

    }
  };


  var injectExtraStyle = function(iframe) {
    var extraStyle = 
    '<style type="text/css">' +
    '.no-transition * {' +
      'transition: none !important;' +
      '-webkit-transition: none !important;' +
      '-o-transition: none !important;' +
      '-moz-transition: none !important;' +
    '} </style>';
    $('head', iframe[0].contentDocument).append($(extraStyle));
  };

  return function(scope, element, attrs) {
    element.load(function() {
      injectExtraStyle(element);

      if (GeneratedCss.css) {
        replaceCssUrl(element, GeneratedCss.getObjectURL());
      }

      setTimeout(function() {
        scope.$apply(attrs.patternOnLoad);
      }, 100);
    });

    $rootScope.$on('GeneratedCss:changed', function() {
      replaceCssUrl(element, GeneratedCss.getObjectURL());
    });
  };
});
