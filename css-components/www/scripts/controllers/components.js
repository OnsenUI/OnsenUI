'use strict';

angular.module('app').controller('ComponentsController', function ($scope) {

  $scope.updateVarNamesHighlight = function() {
    var result = {};

    $scope.components.filter(function(component) {
      return component.checked;
    }).map(function(component) {
      return component.varNameDict;
    }).forEach(function(dict) {
      for (var name in dict) {
        result[name] = name;
      }
    });

    $scope.colorCustomizer.currentVarNameDict = result;
  };

  $scope.updateVarNamesHighlight = function() {
    var result = {};

    $scope.components.filter(function(component) {
      return component.checked;
    }).map(function(component) {
      return component.varNameDict;
    }).forEach(function(dict) {
      for (var name in dict) {
        result[name] = name;
      }
    });

    $scope.colorCustomizer.currentVarNameDict = result;
  };

});
