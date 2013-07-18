'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

 function Ctrl3($scope) {
 	$scope.title = 'Lorem Ipsum'; 	 
  	$scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
}

function MyController($scope){
	var navigationItems = [
		{
			title: 'Item 1',
			source: '/app/1.htm'
		},
		{
			title: 'Item 2',
			source: '/app/2.htm'
		},
		{
			title: 'Detail',
			source: '/app/templates/detail.html'
		}
	];

	$scope.navigationItem = navigationItems[0];
	
	$scope.$on('change', function(event, index) {
		console.log('received change', index);
		$scope.navigationItem = navigationItems[index];
		console.log('navigationItem', $scope.navigationItem);
	});
}

function ListController($scope){
	$scope.change = function(index){
		console.log('emitting change', index);
		$scope.$emit('change', index);
	}
}

