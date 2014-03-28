<label class="topcoat-checkbox" class="{{modifierTemplater('topcoat-checkbox--*')}}">
  <input type="checkbox" ng-model="ngModel" ng-true-value="{{ngTrueValue || true}}" ng-false-value="{{ngFalseValue || false}}">
  <div class="topcoat-checkbox__checkmark {{modifierTemplater('topcoat-checkbox--*__checkmark')}}"></div>
  <span class="ons-checkbox-inner" ng-transclude>
  	
  </span>
</label>
