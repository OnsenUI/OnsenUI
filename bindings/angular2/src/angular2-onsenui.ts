import './setup';
import * as browser from 'angular2/platform/browser'
import {Type} from 'angular2/core';

export * from 'angular2/core';
export * from './directives/ons-navigator';
export * from './directives/ons-carousel';
export * from './directives/ons-tabbar';
export * from './ons/notification';

export function bootstrap(type: Type, providers: Array<any> = []) {
  return browser.bootstrap(type, providers);
};
