'use strict';

angular.module('app').factory('ComponentDialog', function(Dialog, ClipboardClients) {
  var dialog = new Dialog();

  dialog.show = function(component) {
    initClipboardClients();

    if (this.onShow) {
      this.onShow();
    }

    dialog.component = component;
    dialog.html = component.html;
    dialog.css = component.css;
    dialog.name = component.name;

    window.htmlEditor.setValue(dialog.html);
    window.cssEditor.setValue(dialog.css);
    window.htmlEditor.refresh();
    window.cssEditor.refresh();

    setTimeout(function() {
      window.htmlEditor.refresh();
      window.cssEditor.refresh();
    }, 400);

    Dialog.prototype.show.apply(dialog, []);
    ga('send', 'event', 'dialog', 'componentDialog', component.name);
  };

  function initClipboardClients() {
    var htmlClipboardClient = new ZeroClipboard($('#html-copy'));
    var cssClipboardClient = new ZeroClipboard($('#css-copy'));

    htmlClipboardClient.on('dataRequested', function(client) {
      client.setText(window.htmlEditor.getValue());
    });
    htmlClipboardClient.on('complete', function() {
      alert('Copied to clipboard!' );
    });

    cssClipboardClient.on('dataRequested', function(client) {
      client.setText(window.cssEditor.getValue());
    });
    cssClipboardClient.on('complete', function() {
      alert('Copied to clipboard!');
    });

    ClipboardClients.push(htmlClipboardClient);
    ClipboardClients.push(cssClipboardClient);
  }

  return dialog;
});
