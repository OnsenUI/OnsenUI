<label class="topcoat-tab-bar__item no-select">
	<input type="radio" name="tab-bar">
	<button class="topcoat-tab-bar__button full" ng-click="setActive()">
		<i ng-show="icon != undefined" class="fa fa-2x fa-{{icon}} {{icon}}"></i>
		<div class="onsen_tab-bar__label" ng-class="{ big: icon === undefined }">
			{{label}}
		</div>
	</button>
</label>
