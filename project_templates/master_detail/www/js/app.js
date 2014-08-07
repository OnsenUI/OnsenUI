(function(){
  'use strict';
  var module = angular.module('myApp', ['onsen']);

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
  })

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
    }
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = [
          { 
              title: 'Item 1 Title',
              icon: 'comments-o',
              description: 'Item 1 Description'
          },
          { 
              title: 'Another Item Title',
              icon: 'desktop',
              description: 'Item 2 Description'
          },
          { 
              title: 'Yet Another Item Title',
              icon: 'heart-o',
              description: 'Item 3 Description'
          }
      ]; 
      
      return data;
  });
})();

