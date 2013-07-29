'use strict';

function ScreenController($scope) {
	
	$scope.screenItem = {
		page: '/app/schedule_navigation.html'
	}

	$scope.$on('presentViewController', function(event, viewPage, selectedTalk) {
		$scope.screenItem.page = angular.copy(viewPage);
	});
	
}