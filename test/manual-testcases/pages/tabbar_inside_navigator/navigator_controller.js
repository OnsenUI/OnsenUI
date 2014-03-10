function NavigatorController($scope, $rootScope){
	$scope.title = {
		value: "Home"
	};

	$rootScope.$on('title:changed', function(event, newTitle){
		console.log('received title:changed', newTitle);		
		$scope.title.value = newTitle;
	});
}