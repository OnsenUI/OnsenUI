'use strict';

angular.module('app').factory('Colors2URL', function(){
  function colors2URL(colors) {
    var colorParam = $.param(colors);
    return window.location.origin + '?' + colorParam;
  }

  function colors2DownloadURL(colors) {
    var colorParam = $.param(colors);
    return window.location.origin + '/onsen-css-components.zip?' + colorParam;
  }

  return {
    toURL: colors2URL,
    toDownloadURL: colors2DownloadURL
  };
});
