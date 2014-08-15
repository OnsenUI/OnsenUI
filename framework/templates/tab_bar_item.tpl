<label class="tab-bar__item {{tabbarModifierTemplater('tab-bar--*__item')}} {{modifierTemplater('tab-bar__item--*')}}">
  <input type="radio" name="tab-bar-{{tabbarId}}" style="display: none">
  <button class="tab-bar__button {{tabbarModifierTemplater('tab-bar--*__button')}} {{modifierTemplater('tab-bar__button--*')}}" ng-click="tryToChange()">
    <div ng-if="icon != undefined" class="tab-bar__icon"><ons-icon icon="{{tabIcon}}" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon></div>
    <div ng-if="label" class="tab-bar__label">{{label}}</div>
  </button>
</label>
