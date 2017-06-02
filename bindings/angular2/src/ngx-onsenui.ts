export * from '@angular/core';
export * from './directives/ons-navigator';
export * from './directives/ons-tabbar';
export * from './directives/ons-switch';
export * from './directives/ons-range';
export * from './directives/ons-select';
export * from './directives/ons-input';
export * from './directives/ons-pull-hook';
export * from './directives/ons-lazy-repeat';
export * from './directives/ons-splitter';

export * from './ons/notification';
export * from './ons/platform';
export * from './ons/alert-dialog-factory';
export * from './ons/popover-factory';
export * from './ons/dialog-factory';
export * from './ons/modal-factory';
export * from './ons/params';

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {OnsNavigator} from './directives/ons-navigator';
import {OnsTab} from './directives/ons-tabbar';
import {OnsSwitch} from './directives/ons-switch';
import {OnsRange} from './directives/ons-range';
import {OnsSelect} from './directives/ons-select';
import {OnsInput} from './directives/ons-input';
import {OnsPullHook} from './directives/ons-pull-hook';
import {OnsLazyRepeat} from './directives/ons-lazy-repeat';
import {OnsSplitterSide, OnsSplitterContent} from './directives/ons-splitter';

import {AlertDialogFactory} from './ons/alert-dialog-factory';
import {PopoverFactory} from './ons/popover-factory';
import {DialogFactory} from './ons/dialog-factory';
import {ModalFactory} from './ons/modal-factory';
import {ComponentLoader} from './ons/component-loader';

const directives = [
  OnsNavigator,
  OnsTab,
  OnsSwitch,
  OnsRange,
  OnsSelect,
  OnsInput,
  OnsPullHook,
  OnsLazyRepeat,
  OnsSplitterSide,
  OnsSplitterContent
];

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [directives],
  exports: [
    directives,
    BrowserModule
  ],
  providers: [
    AlertDialogFactory,
    PopoverFactory,
    DialogFactory,
    ModalFactory,
    ComponentLoader
  ]
})
export class OnsenModule { }

