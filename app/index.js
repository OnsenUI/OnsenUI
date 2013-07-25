'use strict';

/* Controllers */

function MyController($scope) {
	var navigationItems = [{
		title: 'Talks',
		source: '/app/talks_list.html'
	}, {
		title: 'Detail',
		source: '/app/talk_detail.html'
	}];

	$scope.navigationItem = navigationItems[0];

	$scope.$on('showDetail', function(event, selectedTalk) {
		$scope.navigationItem = navigationItems[1];		
	});
}