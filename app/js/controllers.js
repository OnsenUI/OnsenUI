'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

 function Ctrl3($scope) {
 	 $scope.title = 'Lorem Ipsum';
 	 $scope.source = 'original.html';
  	$scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
}

