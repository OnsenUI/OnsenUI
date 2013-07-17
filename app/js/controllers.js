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

	$scope.navigationItemIndex = 0;
	$scope.navigationItem = navigationItems[0];


	$scope.title = "Inital title from MyController";
	$scope.source = "/app/1.htm"
	$scope.$watch('navigationItemIndex', function(index){
		if(index){
			$scope.navigationItem = navigationItems[index];
		}
	});

	$scope.$on('change', function() {
		console.log('received change');
		if($scope.navigationItemIndex === 0){
			$scope.navigationItemIndex = 2;
		}else{
			$scope.navigationItemIndex = 0;
		}
	});
}

function ListController($scope){
	$scope.change = function(){
		console.log('emitting change');
		$scope.$emit('change');
	}
}

