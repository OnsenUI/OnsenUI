<label class="tab-bar__item no-select {{tabbarModifierTemplater('tab-bar--*__item')}} {{modifierTemplater('tab-bar__item--*')}}">
  <input type="radio" name="tab-bar-{{tabbarId}}" ng-click="setActive()">
  <button class="tab-bar__button {{tabbarModifierTemplater('tab-bar--*__button')}} {{modifierTemplater('tab-bar__button--*')}}" ng-click="setActive()">
    <i ng-show="icon != undefined" class="tab-bar__icon fa fa-2x fa-{{tabIcon}} {{tabIcon}}"></i>
    <div class="tab-bar__label">{{label}}</div>
  </button>
</label>
