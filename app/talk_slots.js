'use strict';

function TalkSlotsController($scope, slotData) {
	$scope.slots = slotData.slots;

	$scope.selectSlot = function(index) {		
		var selectedSlot = $scope.slots[index];
		$scope.$emit('presentViewController', 'select_talk_navigation.html', selectedSlot);
		slotData.selectedSlot = selectedSlot;
	}
}