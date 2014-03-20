(function(){
	var myApp = angular.module('myApp', ['onsen']);

	myApp.controller('MyController', function($scope){
		$scope.isLoading = true;

		$scope.toggle = function(){
			$scope.isLoading = !$scope.isLoading;
		}
	});
})();
