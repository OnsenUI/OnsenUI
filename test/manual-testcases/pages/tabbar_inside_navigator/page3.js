function Page3Controller($scope, $rootScope){
	$rootScope.$broadcast('title:changed', 'Settings');
}