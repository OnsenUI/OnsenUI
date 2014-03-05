console.log('page 1');
function Page1Controller($scope, $rootScope){
	console.log('broadcasting title changed');
	$rootScope.$broadcast('title:changed', 'Home');
	$scope.test = "hello";
}