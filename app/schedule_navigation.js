'use strict';

function Navigation1Controller($scope) {
	var navigationItems = [{
		title: 'Schedule',
		page: '/app/talk_slots.html'
	}, {
		title: 'Detail',
		page: '/app/talk_detail.html'
	}];

	$scope.navigationItem = angular.copy(navigationItems[0]);

	$scope.$on('showDetail', function(event, selectedTalk) {		
		$scope.navigationItem = angular.copy(navigationItems[1]);
	});
}