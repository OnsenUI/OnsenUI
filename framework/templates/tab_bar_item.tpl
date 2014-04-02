<label class="topcoat-tab-bar__item no-select {{tabbarModifierTemplater('topcoat-tab-bar--*__item')}} {{modifierTemplater('topcoat-tab-bar__item--*')}}">
  <input type="radio" name="tab-bar-{{tabbarId}}">
  <button class="topcoat-tab-bar__button full {{tabbarModifierTemplater('topcoat-tab-bar--*__button')}} {{modifierTemplater('topcoat-tab-bar__button--*')}}" ng-click="setActive()">
    <i ng-show="icon != undefined" class="fa fa-2x fa-{{tabIcon}} {{tabIcon}}"></i>
    <div class="onsen_tab-bar__label" ng-class="{ big: icon === undefined }">
      {{label}}
    </div>
  </button>
</label>
