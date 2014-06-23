<label class="radio-button {{modifierTemplater('radio-button--*')}}">
  {{leftLabel}}
  <input type="radio" name="{{name}}" ng-model="ngModel" value="{{value}}">
  <div class="radio-button__checkmark {{modifierTemplater('radio-button--*')}}"></div>
  {{rightLabel}}
</label>
