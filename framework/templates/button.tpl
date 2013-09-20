<div class="button-demo-wrap">
	<button ng-class="'topcoat-button--{{type}}'" class="effeckt-button {{item.animation}} topcoat-button {{getLoadingClass()}}" ng-click="ngClick();" >
		<span class="label" ng-transclude></span>
		<span class="spinner"></span>
	</button>

</div>