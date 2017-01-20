import ons from './ons/ons';

import TemplateElement from './elements/ons-template';
import IfElement from './elements/ons-if';
import AlertDialogElement from './elements/ons-alert-dialog';
import BackButtonElement from './elements/ons-back-button';
import BottomToolbarElement from './elements/ons-bottom-toolbar';
import ButtonElement from './elements/ons-button';
import CarouselItemElement from './elements/ons-carousel-item';
import CarouselElement from './elements/ons-carousel';
import ColElement from './elements/ons-col';
import DialogElement from './elements/ons-dialog';
import FabElement from './elements/ons-fab';
import GestureDetectorElement from './elements/ons-gesture-detector';
import IconElement from './elements/ons-icon';
import LazyRepeatElement from './elements/ons-lazy-repeat';
import ListHeaderElement from './elements/ons-list-header';
import ListItemElement from './elements/ons-list-item';
import ListElement from './elements/ons-list';
import InputElement from './elements/ons-input';
import ModalElement from './elements/ons-modal';
import NavigatorElement from './elements/ons-navigator';
import PageElement from './elements/ons-page';
import PopoverElement from './elements/ons-popover';
import ProgressBarElement from './elements/ons-progress-bar';
import ProgressCircularElement from './elements/ons-progress-circular';
import PullHookElement from './elements/ons-pull-hook';
import RippleElement from './elements/ons-ripple';
import RowElement from './elements/ons-row';
import SelectElement from './elements/ons-select';
import SpeedDialItemElement from './elements/ons-speed-dial-item';
import SpeedDialElement from './elements/ons-speed-dial';
import SplitterContentElement from './elements/ons-splitter-content';
import SplitterMaskElement from './elements/ons-splitter-mask';
import SplitterSideElement from './elements/ons-splitter-side';
import SplitterElement from './elements/ons-splitter';
import SwitchElement from './elements/ons-switch';
import TabElement from './elements/ons-tab';
import TabbarElement from './elements/ons-tabbar';
import ToolbarButtonElement from './elements/ons-toolbar-button';
import ToolbarElement from './elements/ons-toolbar';
import RangeElement from './elements/ons-range';

ons.TemplateElement = TemplateElement;
ons.IfElement = IfElement;
ons.AlertDialogElement = AlertDialogElement;
ons.BackButtonElement = BackButtonElement;
ons.BottomToolbarElement = BottomToolbarElement;
ons.ButtonElement = ButtonElement;
ons.CarouselItemElement = CarouselItemElement;
ons.CarouselElement = CarouselElement;
ons.ColElement = ColElement;
ons.DialogElement = DialogElement;
ons.FabElement = FabElement;
ons.GestureDetectorElement = GestureDetectorElement;
ons.IconElement = IconElement;
ons.LazyRepeatElement = LazyRepeatElement;
ons.ListHeaderElement = ListHeaderElement;
ons.ListItemElement = ListItemElement;
ons.ListElement = ListElement;
ons.InputElement = InputElement;
ons.ModalElement = ModalElement;
ons.NavigatorElement = NavigatorElement;
ons.PageElement = PageElement;
ons.PopoverElement = PopoverElement;
ons.ProgressBarElement = ProgressBarElement;
ons.ProgressCircularElement = ProgressCircularElement;
ons.PullHookElement = PullHookElement;
ons.RippleElement = RippleElement;
ons.RowElement = RowElement;
ons.SelectElement = SelectElement;
ons.SpeedDialItemElement = SpeedDialItemElement;
ons.SpeedDialElement = SpeedDialElement;
ons.SplitterContentElement = SplitterContentElement;
ons.SplitterMaskElement = SplitterMaskElement;
ons.SplitterSideElement = SplitterSideElement;
ons.SplitterElement = SplitterElement;
ons.SwitchElement = SwitchElement;
ons.TabElement = TabElement;
ons.TabbarElement = TabbarElement;
ons.ToolbarButtonElement = ToolbarButtonElement;
ons.ToolbarElement = ToolbarElement;
ons.RangeElement = RangeElement;

// fastclick
window.addEventListener('load', () => {
    ons.fastClick = FastClick.attach(document.body);
}, false);

// ons._defaultDeviceBackButtonHandler
window.addEventListener('DOMContentLoaded', () => {
  ons._deviceBackButtonDispatcher.enable();
  ons._defaultDeviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(window.document.body, () => {
    navigator.app.exitApp();
  });
  document.body._gestureDetector = new ons.GestureDetector(document.body);
}, false);

// setup loading placeholder
ons.ready(function() {
  ons._setupLoadingPlaceHolders();
});

// viewport.js
new Viewport().setup();

export default ons;
