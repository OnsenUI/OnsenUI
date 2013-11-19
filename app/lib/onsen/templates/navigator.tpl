<div class="max">	
	<div ng-hide="hideToolbar" class="topcoat-navigation-bar">
	    <div class="topcoat-navigation-bar__item left quarter">
	        <span ng-click="leftButtonClicked();" class="topcoat-icon-button--quiet" style="vertical-align: middle">
	        	<i class="icon-2x" ng-class="leftButtonIcon"></i>
	        </span>
	    </div> 
	    <div class="topcoat-navigation-bar__item center half">
	        <span class="topcoat-navigation-bar__title">{{navigationItem.title}}</span>        
	    </div> 
	    <div class="topcoat-navigation-bar__item right quarter">
	        <span ng-click="rightButtonClicked();" class="topcoat-icon-button--quiet" style="vertical-align: middle">
	          <i class="icon-2x" ng-class="rightButtonIcon"></i>
	        </span>
	    </div>
	</div>	
	<div class="relative max debug">
		<ng-include class="content" src="navigationItem.source" ng-animate="animation"></ng-include>
	</div>    
	
</div>