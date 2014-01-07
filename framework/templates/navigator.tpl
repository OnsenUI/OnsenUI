<div class="navigator-container">	
	<div ng-hide="hideToolbar" class="topcoat-navigation-bar no-select navigator-toolbar">
	    <div class="topcoat-navigation-bar__item left quarter">
	        <span ng-click="leftButtonClicked();" class="topcoat-icon-button--quiet" ng-hide="leftButtonIcon === '' || leftButtonIcon === undefined" style="vertical-align: middle">
	        	<i class="icon-2x" ng-class="leftButtonIcon"></i>
	        </span>
	    </div> 
	    <div class="topcoat-navigation-bar__item center half">
	        <span class="topcoat-navigation-bar__title">{{navigationItem.title}}</span>        
	    </div> 
	    <div class="topcoat-navigation-bar__item right quarter">
	        <span ng-click="rightButtonClicked();" class="topcoat-icon-button--quiet" ng-hide="rightButtonIcon === '' || rightButtonIcon === undefined" style="vertical-align: middle">
	          <i class="icon-2x" ng-class="rightButtonIcon"></i>
	        </span>
	    </div>
	</div>	
	<div class="relative max navigator-content">
		<ng-include class="content" src="navigationItem.source" ng-animate="animation"></ng-include>
	</div>    
	
</div>