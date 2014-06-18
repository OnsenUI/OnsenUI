'use strict';

angular.module('app').factory('ColorCustomizer', function() {
  function ColorCustomizer(options) {
    this.itemGroups = options.itemGroups ? options.itemGroups : [];
  }

  ColorCustomizer.prototype.setColors = function(colors){
    $.each(colors, function(name, value){
      this.setColor(name, value);
    }.bind(this));
  };

  ColorCustomizer.prototype.setColor = function(name, color) {
    for (var i = this.itemGroups.length - 1; i >= 0; i--) {
      var group = this.itemGroups[i];

      for (var j = group.items.length - 1; j >= 0; j--) {
        var variable = group.items[j];

        if(variable.name === name){
          variable.value = color;
          return;
        }
      }
    }

    console.log('no such color: ' + name);
  };

  return ColorCustomizer;
});
