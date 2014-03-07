function Page2Controller($scope, $rootScope){
	$rootScope.$broadcast('title:changed', 'Comments');
}