'use strict';

function TalksController($scope, talkData) {
	$scope.talks = talkData.talks;

	$scope.showDetail = function(index) {		
		var selectedTalk = $scope.talks[index];
		talkData.selectedTalk = selectedTalk;
		$scope.monaca.pushPage('talk_detail.html', 'Detail');
	}
}