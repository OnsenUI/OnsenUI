'use strict';

function TalksController($scope, talkData) {
	$scope.talks = talkData.talks;

	$scope.showDetail = function(index) {		
		var selectedTalk = $scope.talks[index];
		$scope.$emit('showDetail', selectedTalk);		
		talkData.selectedTalk = selectedTalk;
	}
}