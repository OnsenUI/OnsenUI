import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';

import {
  AppComponent,
  ExampleListComponent,
  ExampleViewComponent
} from './app.component';

import { ToolbarButtonModule } from './examples/toolbar-button';
import { ToastModule } from './examples/toast';
import { TabbarModule } from './examples/tabbar';
import { SwitchModule } from './examples/switch';
import { SplitterModule } from './examples/splitter';
import { SpeedDialModule } from './examples/speed-dial';
import { SelectModule } from './examples/select';
import { SegmentModule } from './examples/segment';
import { SearchInputModule } from './examples/search-input';
import { RippleModule } from './examples/ripple';
import { RangeModule } from './examples/range';
import { RadioModule } from './examples/radio';
import { PullHookModule } from './examples/pull-hook';
import { ProgressModule } from './examples/progress';
import { PopoverModule } from './examples/popover';
import { PlatformModule } from './examples/platform';
import { NotificationModule } from './examples/notification';
import { NavigatorModule } from './examples/navigator';
import { ModalModule } from './examples/modal';
import { ListModule } from './examples/list';
import { LazyRepeatModule } from './examples/lazy-repeat';
import { InputModule } from './examples/input';
import { IfModule } from './examples/if';
import { IconModule } from './examples/icon';
import { GridModule } from './examples/grid';
import { GestureDetectorModule } from './examples/gesture-detector';
import { FabModule } from './examples/fab';
import { DialogModule } from './examples/dialog';
import { CheckboxModule } from './examples/checkbox';
import { CarouselModule } from './examples/carousel';
import { CardModule } from './examples/card';
import { ButtonModule } from './examples/button';
import { BottomToolbarModule } from './examples/bottom-toolbar';
import { BackButtonModule } from './examples/back-button';
import { AlertDialogModule } from './examples/alert-dialog';
import { ActionSheetModule } from './examples/action-sheet';

@NgModule({
  declarations: [
    AppComponent,
    ExampleListComponent,
    ExampleViewComponent
  ],
  imports: [
    BrowserModule,
    ToolbarButtonModule,
    ToastModule,
    TabbarModule,
    SwitchModule,
    SplitterModule,
    SpeedDialModule,
    SelectModule,
    SegmentModule,
    SearchInputModule,
    RippleModule,
    RangeModule,
    RadioModule,
    PullHookModule,
    ProgressModule,
    PopoverModule,
    PlatformModule,
    NotificationModule,
    NavigatorModule,
    ModalModule,
    ListModule,
    LazyRepeatModule,
    InputModule,
    IfModule,
    IconModule,
    GridModule,
    GestureDetectorModule,
    FabModule,
    DialogModule,
    CheckboxModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    BottomToolbarModule,
    BackButtonModule,
    AlertDialogModule,
    ActionSheetModule,
    OnsenModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ExampleListComponent,
    ExampleViewComponent
  ]
})
export class AppModule { }
