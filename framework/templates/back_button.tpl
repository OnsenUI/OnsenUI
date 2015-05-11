<span 
  class="toolbar-button--quiet {{modifierTemplater('toolbar-button--*')}}" 
  ng-click="$root.ons.findParentComponentUntil('ons-navigator', $event).popPage({cancelIfRunning: true})" 
  ng-show="showBackButton"
  style="height: 44px; line-height: 0; padding: 0 10px 0 0; position: relative;">
  
  <i 
    class="ion-ios-arrow-back ons-back-button__icon" 
    style="vertical-align: top; background-color: transparent; height: 44px; line-height: 44px; font-size: 36px; margin-left: 8px; margin-right: 2px; width: 16px; display: inline-block; padding-top: 1px;"></i>

  <span 
    style="vertical-align: top; display: inline-block; line-height: 44px; height: 44px;" 
    class="back-button__label"></span>
</span>
