'use strict';

function MyController($scope) {
	$scope.navigationItems = [{
		title: 'Talks',
		page: '/app/talks_list.html'
	}, {
		title: 'Detail',
		page: '/app/talk_detail.html'
	}];

	$scope.navigationItem = $scope.navigationItems[0];

	$scope.$on('showDetail', function(event, selectedTalk) {
		$scope.navigationItem = $scope.navigationItems[1];		
	});
}