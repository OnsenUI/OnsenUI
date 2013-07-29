'use strict';

function SelectTalkNavigationController($scope) {
	var navigationItems = [{
		title: 'Select Talk',
		page: '/app/talks_list.html'
	}, {
		title: 'Detail',
		page: '/app/talk_detail.html'
	}];

	$scope.navigationItem = angular.copy(navigationItems[0]);

	$scope.$on('showDetail', function(event, selectedTalk) {		
		$scope.navigationItem = angular.copy(navigationItems[1]);
	});
}