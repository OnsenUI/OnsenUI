import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import {
  OnsNavigator,
  Params
} from 'ngx-onsenui';

import { ToolbarButtonComponent } from './examples/toolbar-button';
import { ToastComponent } from './examples/toast';
import { TabbarComponent } from './examples/tabbar';
import { SwitchComponent } from './examples/switch';
import { SplitterComponent } from './examples/splitter';
import { SpeedDialComponent } from './examples/speed-dial';
import { SelectComponent } from './examples/select';
import { SegmentComponent } from './examples/segment';
import { SearchInputComponent } from './examples/search-input';
import { RippleComponent } from './examples/ripple';
import { RangeComponent } from './examples/range';
import { RadioComponent } from './examples/radio';
import { PullHookComponent } from './examples/pull-hook';
import { ProgressComponent } from './examples/progress';
import { PopoverComponent } from './examples/popover';
import { PlatformComponent } from './examples/platform';
import { NotificationComponent } from './examples/notification';
import { NavigatorComponent } from './examples/navigator';
import { ModalComponent } from './examples/modal';
import { ListComponent } from './examples/list';
import { LazyRepeatComponent } from './examples/lazy-repeat';
import { InputComponent } from './examples/input';
import { IfComponent } from './examples/if';
import { IconComponent } from './examples/icon';
import { GridComponent } from './examples/grid';
import { GestureDetectorComponent } from './examples/gesture-detector';
import { FabComponent } from './examples/fab';
import { DialogComponent } from './examples/dialog';
import { CheckboxComponent } from './examples/checkbox';
import { CarouselComponent } from './examples/carousel';
import { CardComponent } from './examples/card';
import { ButtonComponent } from './examples/button';
import { BottomToolbarComponent } from './examples/bottom-toolbar';
import { BackButtonComponent } from './examples/back-button';
import { AlertDialogComponent } from './examples/alert-dialog';
import { ActionSheetComponent } from './examples/action-sheet';

@Component({
  selector: 'ons-page',
  template: `
    <ons-list>
      <ons-list-item
        *ngFor="let example of examples"
        (click)="push(example.component)"
      >
        {{ example.name }}
      </ons-list-item>
    </ons-list>
  `
})
export class ExampleListComponent {

  examples = [
    { name: 'ActionSheet', component: ActionSheetComponent },
    { name: 'AlertDialog', component: AlertDialogComponent },
    { name: 'BackButton', component: BackButtonComponent },
    { name: 'BottomToolbar', component: BottomToolbarComponent },
    { name: 'Button', component: ButtonComponent },
    { name: 'Card', component: CardComponent },
    { name: 'Carousel', component: CarouselComponent },
    { name: 'Checkbox', component: CheckboxComponent },
    { name: 'Dialog', component: DialogComponent },
    { name: 'Fab', component: FabComponent },
    { name: 'GestureDetector', component: GestureDetectorComponent },
    { name: 'Grid', component: GridComponent },
    { name: 'Icon', component: IconComponent },
    { name: 'If', component: IfComponent },
    { name: 'Input', component: InputComponent },
    { name: 'LazyRepeat', component: LazyRepeatComponent },
    { name: 'List', component: ListComponent },
    { name: 'Modal', component: ModalComponent },
    { name: 'Navigator', component: NavigatorComponent },
    { name: 'Notification', component: NotificationComponent },
    { name: 'Platform', component: PlatformComponent },
    { name: 'Popover', component: PopoverComponent },
    { name: 'Progress', component: ProgressComponent },
    { name: 'PullHook', component: PullHookComponent },
    { name: 'Radio', component: RadioComponent },
    { name: 'Range', component: RangeComponent },
    { name: 'Ripple', component: RippleComponent },
    { name: 'SearchInput', component: SearchInputComponent },
    { name: 'Segment', component: SegmentComponent },
    { name: 'Select', component: SelectComponent },
    { name: 'SpeedDial', component: SpeedDialComponent },
    { name: 'Splitter', component: SplitterComponent },
    { name: 'Switch', component: SwitchComponent },
    { name: 'Tabbar', component: TabbarComponent },
    { name: 'Toast', component: ToastComponent },
    { name: 'ToolbarButton', component: ToolbarButtonComponent }
  ];

  constructor(private _navigator: OnsNavigator) {}

  push(page) {
    this._navigator.nativeElement.pushPage(ExampleViewComponent, { data: { page }});
  }
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <ons-back-button></ons-back-button>
    </ons-toolbar>
    <ng-container #container></ng-container>
  `
})
export class ExampleViewComponent {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private params: Params, private resolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    const factory = this.resolver.resolveComponentFactory(this.params.data.page);
    this.container.createComponent(factory);
  }
}

@Component({
  selector: 'app-root',
  template: `
    <ons-navigator [page]="page"></ons-navigator>
  `,
})
export class AppComponent {
  page = ExampleListComponent
}
