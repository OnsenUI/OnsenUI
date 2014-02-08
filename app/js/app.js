(function(){
	var myApp = angular.module('myApp', ['ngTouch', 'onsen.directives']);	

	myApp.controller('MyController', function($scope){
		$scope.isLoading = true;

		$scope.toggle = function(){
			$scope.isLoading = !$scope.isLoading;
		}
	});
})();
