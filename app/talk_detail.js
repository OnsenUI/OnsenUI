'use strict';

function DetailController($scope, talkData) {	
	console.log('inside detail controller');
	$scope.talk = talkData.selectedTalk;	
}