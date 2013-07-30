'use strict';

function SelectTalkNavigationController($scope) {
	var selectTalkNavigationItem = {
		title: 'Select Talk',
		page: 'talks_list.html'
	};

	var detailNavigationItem = {
		title: 'Detail',
		page: 'talk_detail.html'
	};

	// initial navigation item
	$scope.navigationItem = angular.copy(selectTalkNavigationItem);

	// transition to detail navigation item
	$scope.$on('showDetail', function(event, selectedTalk) {		
		$scope.navigationItem = angular.copy(detailNavigationItem);
	});
}