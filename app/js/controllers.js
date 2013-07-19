'use strict';

/* Controllers */

function MyController($scope) {
	var navigationItems = [{
		title: 'Talks',
		source: '/app/talks_list.html'
	}, {
		title: 'Detail',
		source: '/app/detail.html'
	}];

	$scope.navigationItem = navigationItems[0];

	$scope.$on('showDetail', function(event, selectedTalk) {
		$scope.navigationItem = navigationItems[1];		
	});
}

function TalksController($scope, talkData) {
	$scope.talks = talkData.talks;

	$scope.showDetail = function(index) {		
		var selectedTalk = $scope.talks[index];
		$scope.$emit('showDetail', selectedTalk);		
		talkData.selectedTalk = selectedTalk;
	}
}

function DetailController($scope, talkData) {	
	$scope.talk = talkData.selectedTalk;	
}