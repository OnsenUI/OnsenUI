'use strict';

angular.module('app').factory('Dialog', function(ClipboardClients) {
  function Dialog() {
  };

  Dialog.prototype = {
    isShown: false,
    show: function() {
      this.isShown = true;
    },
    hide: function() {
      this.isShown = false;
      ClipboardClients.forEach(function(client){
        client.destroy();
      });
    }
  };

  return Dialog;
});
