<label class="checkbox" class="{{modifierTemplater('checkbox--*')}}">
  <input type="checkbox" ng-model="ngModel" ng-true-value="{{ngTrueValue || true}}" ng-false-value="{{ngFalseValue || false}}">
  <div class="checkbox__checkmark {{modifierTemplater('checkbox--*__checkmark')}}"></div>
  <span class="ons-checkbox-inner" ng-transclude>
  </span>
</label>
